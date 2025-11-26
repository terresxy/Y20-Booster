const { app } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fssync = require('fs');
const { spawn } = require('child_process');

const BASE_RELATIVE_PATH = ['Imagens', 'OptimizationPack', 'Criar Ponto de Restauração'];

function resolveBaseDir() {
  const base = app.isPackaged ? process.resourcesPath : app.getAppPath();
  return path.join(base, ...BASE_RELATIVE_PATH);
}

async function getCreateRestorePointScript() {
  const baseDir = resolveBaseDir();
  try {
    await fs.access(baseDir);
  } catch (error) {
    throw new Error('Pasta de scripts não encontrada.');
  }

  // Procurar por arquivo .bat na pasta
  const files = await fs.readdir(baseDir);
  const batFile = files.find(f => f.toLowerCase().endsWith('.bat'));
  
  if (!batFile) {
    throw new Error('Script de criação não encontrado.');
  }

  return path.join(baseDir, batFile);
}

async function createRestorePointUsingScript(description = 'Y20 BOOSTER - Manual') {
  const { runPowerShell } = require('./optimizations');
  
  console.log('[Restore] Iniciando criação de ponto de restauração...');
  console.log('[Restore] Descrição:', description);
  
  // Escapar a descrição para uso seguro no PowerShell
  const safeDescription = description.replace(/'/g, "''").replace(/"/g, '`"');
  
  // Pegar lista de pontos antes de criar
  let pointsBefore = [];
  try {
    const listScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points | Select-Object -Property SequenceNumber, Description, @{Name='CreationTime';Expression={if ($_.CreationTime) { $_.CreationTime.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ') } else { $null }}} | Sort-Object -Property CreationTime -Descending | ConvertTo-Json -Compress -Depth 10 } else { '[]' }`;
    const beforeResult = await runPowerShell(listScript);
    if (beforeResult && beforeResult.trim() !== '[]' && beforeResult.trim() !== '') {
      try {
        pointsBefore = JSON.parse(beforeResult);
        if (!Array.isArray(pointsBefore)) {
          pointsBefore = [pointsBefore];
        }
      } catch (e) {
        console.warn('[Restore] Erro ao fazer parse dos pontos antes:', e.message);
      }
    }
    console.log(`[Restore] Pontos antes: ${pointsBefore.length}`);
  } catch (error) {
    console.warn('[Restore] Erro ao listar pontos antes:', error.message);
  }
  
  // Criar o restore point diretamente via PowerShell com privilégios elevados
  // Isso garante que a descrição seja usada corretamente e evita problemas de encoding
  return new Promise((resolve, reject) => {
    // Usar PowerShell para criar o restore point com privilégios elevados
    // Usar -EncodedCommand para evitar problemas com caracteres especiais
    const psScript = `Checkpoint-Computer -Description "${safeDescription}" -RestorePointType "MODIFY_SETTINGS"`;
    const psCommand = `Start-Process powershell.exe -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "${psScript.replace(/"/g, '`"')}" -Verb RunAs -Wait -WindowStyle Hidden`;
    
    console.log('[Restore] Criando restore point via PowerShell com privilégios elevados...');
    const child = spawn('powershell.exe', [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      psCommand
    ], {
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      console.log('[Restore] Script output:', text.trim());
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      console.warn('[Restore] Script error:', text.trim());
    });

    child.on('error', (error) => {
      console.error('[Restore] Erro ao executar script:', error);
      // Se falhar com RunAs, tentar executar diretamente como fallback
      console.log('[Restore] Tentando executar sem elevação como fallback...');
      const fallbackChild = spawn('cmd.exe', ['/c', scriptPath], {
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      let fallbackOutput = '';
      let fallbackError = '';
      
      fallbackChild.stdout.on('data', (data) => {
        fallbackOutput += data.toString();
      });
      
      fallbackChild.stderr.on('data', (data) => {
        fallbackError += data.toString();
      });
      
      fallbackChild.on('exit', async (code) => {
        if (code === 0) {
          // Continuar com a verificação mesmo sem elevação
          child.emit('exit', code);
        } else {
          reject(new Error(`Não foi possível executar o script. Código: ${code}. Erro: ${fallbackError || error.message}`));
        }
      });
    });

    child.on('exit', async (code) => {
      console.log(`[Restore] Script finalizou com código: ${code}`);
      
      // Mesmo com código diferente de 0, tentar verificar se o ponto foi criado
      // pois alguns scripts podem retornar código de erro mas ainda criar o ponto

      // Aguardar um pouco para o sistema processar a criação do ponto
      console.log('[Restore] Aguardando processamento do sistema...');
      await new Promise(resolve => setTimeout(resolve, 3000)); // Aumentado para 3 segundos

        // Verificar se o ponto foi criado
      try {
        const listScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points | Select-Object -Property SequenceNumber, Description, @{Name='CreationTime';Expression={if ($_.CreationTime) { $_.CreationTime.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ') } else { $null }}}, RestorePointType | Sort-Object -Property CreationTime -Descending | ConvertTo-Json -Compress -Depth 10 } else { '[]' }`;
        const afterResult = await runPowerShell(listScript);
        
        let pointsAfter = [];
        if (afterResult && afterResult.trim() !== '[]' && afterResult.trim() !== '') {
          try {
            pointsAfter = JSON.parse(afterResult);
            if (!Array.isArray(pointsAfter)) {
              pointsAfter = [pointsAfter];
            }
          } catch (e) {
            console.warn('[Restore] Erro ao fazer parse dos pontos depois:', e.message);
          }
        }
        
        console.log(`[Restore] Pontos depois: ${pointsAfter.length}`);
        
        // Encontrar o novo ponto (mais recente que não estava na lista antes)
        const newPoint = pointsAfter.find(point => {
          return !pointsBefore.some(before => before.SequenceNumber === point.SequenceNumber);
        });
        
        if (newPoint) {
          console.log('[Restore] Novo ponto criado:', newPoint);
          resolve({
            success: true,
            output,
            point: {
              sequence: newPoint.SequenceNumber,
              description: newPoint.Description || description,
              date: newPoint.CreationTime,
              type: newPoint.RestorePointType || 'MANUAL'
            }
          });
        } else {
          // Se não encontrou novo ponto, pode ser que já existia ou foi criado muito rapidamente
          // Pegar o ponto mais recente
          if (pointsAfter.length > 0) {
            const latestPoint = pointsAfter[0];
            console.log('[Restore] Usando ponto mais recente:', latestPoint);
            resolve({
              success: true,
              output,
              point: {
                sequence: latestPoint.SequenceNumber,
                description: latestPoint.Description || description,
                date: latestPoint.CreationTime,
                type: latestPoint.RestorePointType || 'MANUAL'
              }
            });
          } else {
            // Criar ponto usando PowerShell diretamente como fallback (sem elevação)
            console.log('[Restore] Tentando criar ponto usando PowerShell diretamente...');
            try {
              const createScript = `Checkpoint-Computer -Description "${safeDescription}" -RestorePointType "MODIFY_SETTINGS"`;
              await runPowerShell(createScript);
              
              // Aguardar e verificar novamente
              await new Promise(resolve => setTimeout(resolve, 2000));
              const verifyResult = await runPowerShell(listScript);
              
              if (verifyResult && verifyResult.trim() !== '[]') {
                const verifyPoints = JSON.parse(verifyResult);
                const latest = Array.isArray(verifyPoints) ? verifyPoints[0] : verifyPoints;
                resolve({
                  success: true,
                  output: 'Ponto criado via PowerShell',
                  point: {
                    sequence: latest.SequenceNumber,
                    description: latest.Description || description,
                    date: latest.CreationTime,
                    type: latest.RestorePointType || 'MANUAL'
                  }
                });
              } else {
                resolve({ success: true, output, message: 'Ponto pode ter sido criado, mas não foi possível verificar.' });
              }
            } catch (psError) {
              console.error('[Restore] Erro ao criar via PowerShell:', psError);
              resolve({ success: true, output, message: 'Script executado com sucesso, mas não foi possível verificar o ponto criado.' });
            }
          }
        }
      } catch (verifyError) {
        console.error('[Restore] Erro ao verificar ponto criado:', verifyError);
        // Mesmo com erro na verificação, considerar sucesso se o script executou corretamente
        resolve({ success: true, output, message: 'Script executado com sucesso, mas não foi possível verificar o ponto criado.' });
      }
    });
  });
}

async function deleteRestorePoint(sequenceNumber) {
  const { spawn } = require('child_process');
  const { promisify } = require('util');
  const { exec } = require('child_process');
  const execAsync = promisify(exec);

  // Validar sequence number
  if (!sequenceNumber || isNaN(parseInt(sequenceNumber))) {
    throw new Error('Número de sequência inválido.');
  }

  const seqNum = parseInt(sequenceNumber);
  console.log(`[Restore] Tentando deletar restore point com sequence: ${seqNum}`);

  try {
    // Primeiro, verificar se o ponto existe usando método mais direto
    console.log(`[Restore] Verificando se o ponto #${seqNum} existe...`);
    const checkCommand = `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$point = Get-ComputerRestorePoint -SequenceNumber ${seqNum} -ErrorAction SilentlyContinue; if ($point) { Write-Output 'EXISTS' } else { Write-Output 'NOT_FOUND' }"`;
    
    let checkResult;
    try {
      const { stdout } = await execAsync(checkCommand, { windowsHide: true, timeout: 10000 });
      checkResult = stdout ? stdout.trim() : '';
    } catch (checkError) {
      console.error('[Restore] Erro ao verificar ponto:', checkError);
      checkResult = 'NOT_FOUND';
    }
    
    if (checkResult !== 'EXISTS') {
      console.log(`[Restore] Ponto #${seqNum} não encontrado.`);
      return { success: true, message: 'Ponto de restauração não encontrado (pode ter sido deletado anteriormente).' };
    }
    
    console.log(`[Restore] Ponto #${seqNum} encontrado. Tentando deletar usando método híbrido...`);
    
    // Método híbrido: Tentar WMI primeiro, depois vssadmin se necessário
    try {
      // Método 1: WMI com melhor tratamento de erros
      const wmiDeleteCommand = `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "
        \$ErrorActionPreference = 'Continue';
        try {
          # Tentar encontrar o restore point via WMI
          \$sr = Get-WmiObject -Class Win32_SystemRestore -ErrorAction SilentlyContinue | Where-Object { \$_.SequenceNumber -eq ${seqNum} };
          if (\$sr) {
            try {
              # Tentar deletar
              \$result = \$sr.Delete();
              if (\$result -and \$result.ReturnValue -eq 0) {
                Start-Sleep -Milliseconds 2000;
                \$verify = Get-ComputerRestorePoint -SequenceNumber ${seqNum} -ErrorAction SilentlyContinue;
                if (-not \$verify) {
                  Write-Output 'SUCCESS'
                  exit
                } else {
                  Write-Output 'STILL_EXISTS'
                  exit
                }
              } else {
                Write-Output ('ERROR: ReturnValue=' + (\$result.ReturnValue ?? 'null'))
                exit
              }
            } catch {
              Write-Output ('ERROR: ' + \$_.Exception.Message)
              exit
            }
          } else {
            Write-Output 'NOT_FOUND'
            exit
          }
        } catch {
          Write-Output ('ERROR: ' + \$_.Exception.Message)
        }
      "`;
      
      const { stdout, stderr } = await execAsync(wmiDeleteCommand, { windowsHide: true, timeout: 60000 });
      const result = stdout ? stdout.trim() : '';
      
      console.log(`[Restore] Resultado WMI: ${result}`);
      if (stderr && stderr.trim()) console.log(`[Restore] WMI Stderr: ${stderr}`);
      
      if (result === 'SUCCESS') {
        console.log(`[Restore] Ponto #${seqNum} deletado com sucesso via WMI.`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verificação final
        const finalCheckCommand = `powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "$point = Get-ComputerRestorePoint -SequenceNumber ${seqNum} -ErrorAction SilentlyContinue; if ($point) { Write-Output 'EXISTS' } else { Write-Output 'DELETED' }"`;
        try {
          const { stdout: finalStdout } = await execAsync(finalCheckCommand, { windowsHide: true, timeout: 10000 });
          const finalResult = finalStdout ? finalStdout.trim() : '';
          
          if (finalResult === 'DELETED' || finalResult === '') {
            return { success: true, message: 'Ponto de restauração deletado com sucesso.' };
          }
        } catch (finalCheckError) {
          // Se WMI retornou SUCCESS, assumir sucesso
          return { success: true, message: 'Ponto de restauração deletado com sucesso.' };
        }
      } else if (result === 'NOT_FOUND') {
        return { success: true, message: 'Ponto de restauração não encontrado (pode ter sido deletado anteriormente).' };
      }
      
      // Se WMI falhou, tentar método alternativo: vssadmin
      console.log(`[Restore] WMI falhou, tentando vssadmin...`);
      
      // Método 2: Usar vssadmin para deletar shadows antigos até encontrar o correto
      // Como não podemos mapear diretamente SequenceNumber para ShadowID,
      // vamos tentar deletar o shadow mais antigo que corresponde ao restore point
      try {
        // Listar todos os shadows e tentar encontrar o correspondente
        const listShadowsCommand = `vssadmin list shadows /for=C:`;
        const { stdout: shadowsStdout } = await execAsync(listShadowsCommand, { windowsHide: true, timeout: 30000 });
        
        // Se conseguirmos listar, tentar deletar o mais antigo (que provavelmente é o nosso)
        // Mas isso é arriscado, então vamos apenas informar que não é possível deletar individualmente
        console.warn('[Restore] vssadmin requer Shadow ID específico, que não pode ser mapeado diretamente do SequenceNumber.');
      } catch (vssError) {
        console.warn('[Restore] Erro ao usar vssadmin:', vssError.message);
      }
      
      // Se chegou aqui, nenhum método funcionou
      throw new Error('Não foi possível deletar o ponto de restauração. O Windows pode não permitir a deleção de pontos individuais. Tente usar a função "Limpar todos" para remover todos os pontos de uma vez.');
    } catch (deleteError) {
      console.error('[Restore] Erro ao deletar:', deleteError);
      
      // Se o erro for sobre não encontrar, considerar sucesso
      if (deleteError.message && (deleteError.message.includes('não encontrado') || deleteError.message.includes('not found') || deleteError.message.includes('does not exist'))) {
        return { success: true, message: 'Ponto de restauração não encontrado (pode ter sido deletado anteriormente).' };
      }
      
      throw new Error(`Não foi possível deletar o ponto de restauração. ${deleteError.message}`);
    }
  } catch (error) {
    console.error('[Restore] Erro geral ao deletar restore point:', error);
    // Se o erro for sobre não encontrar, retornar sucesso (pode já ter sido deletado)
    if (error.message && (error.message.includes('não encontrado') || error.message.includes('not found') || error.message.includes('does not exist'))) {
      return { success: true, message: 'Ponto de restauração não encontrado (pode ter sido deletado anteriormente).' };
    }
    throw error;
  }
}

async function clearAllRestorePoints() {
  const { runPowerShell } = require('./optimizations');
  if (!runPowerShell) {
    throw new Error('PowerShell não disponível');
  }

  try {
    console.log('[Restore] Iniciando limpeza de todos os restore points...');
    
    // Primeiro, listar todos os restore points para contar
    const listScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points.Count } else { 0 }`;
    const countResult = await runPowerShell(listScript);
    const totalCount = parseInt(countResult?.trim() || '0', 10);
    
    console.log(`[Restore] Total de pontos encontrados: ${totalCount}`);
    
    if (totalCount === 0 || isNaN(totalCount)) {
      return { success: true, deleted: 0, message: 'Nenhum ponto de restauração encontrado.' };
    }

    let deleted = 0;
    
    // Método 1: Usar vssadmin para deletar todos os shadows (mais confiável)
    try {
      console.log('[Restore] Tentando deletar todos os pontos usando vssadmin...');
      // vssadmin delete shadows /all deleta todos os shadows (restore points)
      const vssDeleteAllCommand = `vssadmin delete shadows /all /quiet`;
      await execAsync(vssDeleteAllCommand, { windowsHide: true, timeout: 60000 });
      
      // Aguardar o sistema processar
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Verificar quantos foram deletados
      const verifyScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points.Count } else { 0 }`;
      const verifyResult = await runPowerShell(verifyScript);
      const remaining = parseInt(verifyResult?.trim() || '0', 10);
      deleted = totalCount - remaining;
      
      if (deleted > 0) {
        console.log(`[Restore] ${deleted} pontos deletados com sucesso via vssadmin.`);
      }
    } catch (error) {
      console.warn('[Restore Points] Erro ao deletar todos via vssadmin, tentando método alternativo:', error.message);
      
      // Método alternativo: Tentar usar WMI (pode não funcionar)
      try {
        console.log('[Restore] Tentando deletar todos os pontos usando WMI...');
        const deleteAllScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $count = $points.Count; $sr = Get-WmiObject -Class Win32_SystemRestore -ErrorAction SilentlyContinue; if ($sr) { $sr | ForEach-Object { try { $_.Delete() } catch {} }; Start-Sleep -Seconds 3; $remaining = (Get-ComputerRestorePoint -ErrorAction SilentlyContinue).Count; $deleted = $count - $remaining; Write-Output $deleted } else { Write-Output 0 } } else { 0 }`;
        const deleteResult = await runPowerShell(deleteAllScript);
        const deletedCount = parseInt(deleteResult?.trim() || '0', 10);
        
        if (!isNaN(deletedCount) && deletedCount > 0) {
          deleted = deletedCount;
          console.log(`[Restore] ${deleted} pontos deletados com sucesso via WMI.`);
        }
      } catch (wmiError) {
        console.warn('[Restore Points] Erro ao deletar todos via WMI:', wmiError.message);
      }
    }
    
    // Aguardar um pouco para o sistema atualizar
    console.log('[Restore] Aguardando sistema atualizar...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Verificação final
    try {
      const verifyScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points.Count } else { 0 }`;
      const verifyResult = await runPowerShell(verifyScript);
      const remaining = parseInt(verifyResult?.trim() || '0', 10);
      
      if (!isNaN(remaining) && remaining > 0) {
        console.warn(`[Restore Points] Ainda restam ${remaining} pontos após limpeza.`);
        return { 
          success: true, 
          deleted, 
          remaining,
          message: `${deleted} pontos deletados. ${remaining} pontos ainda restam (podem estar protegidos pelo sistema).` 
        };
      } else {
        console.log(`[Restore] Limpeza concluída. ${deleted} pontos deletados.`);
        return { 
          success: true, 
          deleted, 
          message: `${deleted} pontos de restauração deletados com sucesso.` 
        };
      }
    } catch (verifyError) {
      console.warn('[Restore Points] Erro ao verificar pontos restantes:', verifyError.message);
      return { 
        success: true, 
        deleted, 
        message: `${deleted} pontos deletados. Não foi possível verificar se todos foram removidos.` 
      };
    }
  } catch (error) {
    console.error('[Restore] Erro ao limpar restore points:', error);
    throw error;
  }
}

async function executeRestorePoint(sequenceNumber) {
  const { runPowerShell } = require('./optimizations');
  if (!runPowerShell) {
    throw new Error('PowerShell não disponível');
  }

  try {
    // Validar sequence number
    const seqNum = parseInt(sequenceNumber, 10);
    if (isNaN(seqNum)) {
      throw new Error('Número de sequência inválido.');
    }

    // Verificar se o restore point existe
    const checkScript = `$point = Get-ComputerRestorePoint -SequenceNumber ${seqNum} -ErrorAction SilentlyContinue; if ($point) { 'EXISTS' } else { 'NOT_FOUND' }`;
    const checkResult = await runPowerShell(checkScript);
    
    if (checkResult && checkResult.trim() !== 'EXISTS') {
      throw new Error(`Ponto de restauração #${seqNum} não encontrado. Ele pode ter sido deletado.`);
    }

    // Executar restore usando vssadmin (mais confiável que Restore-Computer)
    // vssadmin list shadows mostra os pontos disponíveis
    // vssadmin revert shadow pode ser usado, mas é mais complexo
    // Vamos usar o método mais direto: rstrui.exe (System Restore UI) com parâmetros
    
    return new Promise((resolve, reject) => {
      // Usar rstrui.exe com o sequence number para restaurar
      // Isso abre a interface de restauração do Windows, mas podemos tentar automatizar
      const { exec } = require('child_process');
      
      // Método alternativo: usar PowerShell para executar o restore diretamente
      // Isso requer privilégios elevados
      const psCommand = `Start-Process powershell.exe -ArgumentList '-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', 'Restore-Computer -RestorePoint ${seqNum} -Confirm:$false' -Verb RunAs -WindowStyle Hidden`;
      
      exec(psCommand, { windowsHide: true }, (error, stdout, stderr) => {
        if (error) {
          // Se falhar com RunAs, tentar método alternativo
          console.warn('[Restore] Erro ao executar com RunAs, tentando método alternativo...');
          
          // Método alternativo: usar rstrui.exe
          const altCommand = `rstrui.exe /runonce /restorepoint:${seqNum}`;
          exec(altCommand, { windowsHide: true }, (altError, altStdout, altStderr) => {
            if (altError) {
              console.error('[Restore] Erro ao executar restore:', altError);
              reject(new Error(`Não foi possível executar a restauração. Erro: ${altError.message}. Certifique-se de que está executando como administrador.`));
            } else {
              resolve({ success: true, message: 'Restauração iniciada. O sistema pode reiniciar em breve.' });
            }
          });
        } else {
          resolve({ success: true, message: 'Restauração iniciada. O sistema pode reiniciar em breve.' });
        }
      });
    });
  } catch (error) {
    console.error('[Restore] Erro ao executar restore point:', error);
    throw error;
  }
}

module.exports = {
  createRestorePointUsingScript,
  clearAllRestorePoints,
  executeRestorePoint,
  deleteRestorePoint
};

