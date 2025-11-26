const { app } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fssync = require('fs');
const { spawn } = require('child_process');

function resolveBaseDir(folderName) {
  // Mapear nomes de pastas para os nomes exatos nas pastas
  const folderMap = {
    'Ativar Serviços': 'Ativar Serviços',
    'Otimização Basico': 'Otimização Basico',
    'Otimização Vip': 'Otimização Vip'
  };
  
  const actualFolderName = folderMap[folderName] || folderName;
  const base = app.isPackaged ? process.resourcesPath : app.getAppPath();
  return path.join(base, 'Imagens', 'OptimizationPack', actualFolderName);
}

async function collectScripts(dirPath) {
  const scripts = [];
  
  if (!fssync.existsSync(dirPath)) {
    return scripts;
  }
  
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Recursivamente coletar scripts de subpastas
        const subDir = path.join(dirPath, entry.name);
        const subScripts = await collectScripts(subDir);
        scripts.push(...subScripts);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.bat' || ext === '.reg' || ext === '.ps1' || ext === '.exe' || ext === '.cmd') {
          const filePath = path.join(dirPath, entry.name);
          scripts.push({
            id: Buffer.from(filePath).toString('base64'),
            name: entry.name.replace(ext, ''),
            type: ext.substring(1).toUpperCase(),
            path: filePath
          });
        }
      }
    }
  } catch (error) {
    console.error('[OptimizationPack] Erro ao coletar scripts:', error);
  }
  
  return scripts;
}

async function listScripts(folderName) {
  const baseDir = resolveBaseDir(folderName);
  
  try {
    await fs.access(baseDir);
  } catch (error) {
    throw new Error(`Pasta "${folderName}" não encontrada.`);
  }
  
  const scripts = await collectScripts(baseDir);
  return scripts;
}

async function listNucleos() {
  const baseDir = resolveBaseDir('Otimização Vip');
  const nucleosDir = path.join(baseDir, 'Nucleos');
  
  try {
    await fs.access(nucleosDir);
  } catch (error) {
    throw new Error('Pasta "Nucleos" não encontrada.');
  }
  
  // Coletar apenas scripts da pasta Nucleos (sem recursão)
  const scripts = [];
  if (!fssync.existsSync(nucleosDir)) {
    return scripts;
  }
  
  try {
    const entries = await fs.readdir(nucleosDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.bat' || ext === '.reg' || ext === '.ps1' || ext === '.exe' || ext === '.cmd') {
          const filePath = path.join(nucleosDir, entry.name);
          scripts.push({
            id: Buffer.from(filePath).toString('base64'),
            name: entry.name.replace(ext, ''),
            type: ext.substring(1).toUpperCase(),
            path: filePath
          });
        }
      }
    }
  } catch (error) {
    console.error('[OptimizationPack] Erro ao coletar scripts de núcleos:', error);
  }
  
  return scripts;
}

async function listScriptsSimple() {
  // Listar apenas .bat da pasta OptimizationPack\No Menu
  const base = app.isPackaged ? process.resourcesPath : app.getAppPath();
  const baseDir = path.join(base, 'Imagens', 'OptimizationPack', 'No Menu');
  
  try {
    await fs.access(baseDir);
  } catch (error) {
    throw new Error('Pasta "No Menu" não encontrada em OptimizationPack.');
  }
  
  const scripts = [];
  if (!fssync.existsSync(baseDir)) {
    return scripts;
  }
  
  try {
    const entries = await fs.readdir(baseDir, { withFileTypes: true });
    
    for (const entry of entries) {
      // Apenas arquivos, não pastas
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        // Apenas arquivos .bat
        if (ext === '.bat') {
          const filePath = path.join(baseDir, entry.name);
          scripts.push({
            id: Buffer.from(filePath).toString('base64'),
            name: entry.name.replace(ext, ''),
            type: 'BAT',
            path: filePath
          });
        }
      }
    }
  } catch (error) {
    console.error('[OptimizationPack] Erro ao coletar scripts simples:', error);
  }
  
  return scripts;
}

async function runScriptsSimple(onProgress) {
  const scripts = await listScriptsSimple();
  if (scripts.length === 0) {
    throw new Error('Nenhum arquivo .bat encontrado na pasta OptimizationPack\\No Menu.');
  }
  return await runScriptsSequentially(scripts, onProgress);
}

async function runScriptById(encodedId) {
  const buffer = Buffer.from(encodedId, 'base64');
  const filePath = buffer.toString('utf8');
  
  const baseDir = app.isPackaged ? process.resourcesPath : app.getAppPath();
  const expectedBase = path.join(baseDir, 'Imagens', 'OptimizationPack');
  
  if (!filePath.startsWith(expectedBase)) {
    throw new Error('Caminho inválido.');
  }
  
  if (!fssync.existsSync(filePath)) {
    throw new Error('Arquivo não encontrado.');
  }
  
  const preparedPath = await prepareExecutable(filePath);
  const ext = path.extname(preparedPath).toLowerCase();
  
  try {
    if (ext === '.bat' || ext === '.cmd') {
      await executeProcess('cmd.exe', ['/c', preparedPath]);
    } else if (ext === '.reg') {
      await executeProcess('regedit.exe', ['/s', preparedPath]);
    } else if (ext === '.ps1') {
      // PowerShell pode precisar de privilégios elevados para alguns comandos
      await executeProcess('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-NoProfile', '-File', preparedPath]);
    } else if (ext === '.exe') {
      await executeProcess(preparedPath, []);
    } else {
      throw new Error('Formato não suportado.');
    }
  } catch (error) {
    // Re-lançar o erro com mais contexto
    const scriptName = path.basename(filePath);
    const originalMessage = error.message || 'Erro desconhecido';
    
    // Se já é uma mensagem de privilégios, manter
    if (originalMessage.includes('privilegios') || originalMessage.includes('administrador')) {
      throw error;
    }
    
    // Adicionar nome do script à mensagem de erro
    throw new Error(`${originalMessage} (Script: ${scriptName})`);
  }
}

async function runScriptsSequentially(scripts, onProgress) {
  let completed = 0;
  const total = scripts.length;
  const results = { 
    applied: 0, 
    failed: 0, 
    skipped: 0,
    errors: [],
    requiresAdmin: [],
    executedScripts: [] // Lista de scripts executados com sucesso
  };
  
  console.log(`[OptimizationPack] Iniciando execução sequencial de ${total} scripts`);
  
  for (const script of scripts) {
    const currentIndex = completed + 1;
    const percent = Math.round((currentIndex / total) * 100);
    
    console.log(`[OptimizationPack] Executando script ${currentIndex}/${total}: ${script.name}`);
    
    // IMPORTANTE: Garantir que apenas um script está sendo executado por vez
    // Notificar início da execução ANTES de executar
    if (onProgress) {
      onProgress({
        type: 'executing',
        current: currentIndex,
        total: total,
        script: script.name,
        scriptPath: script.path,
        percent: percent,
        status: 'Executando...'
      });
    }
    
    // Aguardar um pequeno delay para garantir que o evento de progresso foi processado
    await new Promise(resolve => setTimeout(resolve, 50));
    
    try {
      // IMPORTANTE: Usar await para garantir que o script termine completamente antes de continuar
      console.log(`[OptimizationPack] Aguardando execução de: ${script.name}`);
      await runScriptById(script.id);
      console.log(`[OptimizationPack] Script concluído: ${script.name}`);
      
      // Aguardar um pequeno delay para garantir que o processo terminou completamente
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Notificar sucesso APÓS o script terminar
      if (onProgress) {
        onProgress({
          type: 'success',
          current: currentIndex,
          total: total,
          script: script.name,
          percent: percent,
          status: 'Pronto!'
        });
      }
      
      results.applied++;
      results.executedScripts.push(script.path || script.name);
      
      // Pequeno delay entre scripts para garantir que a interface seja atualizada
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      const errorMessage = error.message || 'Erro desconhecido';
      console.error(`[OptimizationPack] Erro ao executar ${script.name}:`, errorMessage);
      
      // Verificar se é erro de timeout
      const isTimeoutError = errorMessage.includes('Tempo limite') || 
                            errorMessage.includes('timeout') ||
                            errorMessage.includes('Timeout') ||
                            errorMessage.includes('tempo limite');
      
      // Verificar se é erro de privilégios
      const isAdminError = errorMessage.includes('privilegios') || 
                          errorMessage.includes('admin') || 
                          errorMessage.includes('administrador') ||
                          errorMessage.includes('elevated') ||
                          errorMessage.includes('elevação') ||
                          errorMessage.includes('acesso negado') ||
                          errorMessage.includes('access denied') ||
                          errorMessage.includes('permission denied') ||
                          errorMessage.includes('permissão negada');
      
      // Verificar se pode ser erro de privilégios (código 1 com mensagem genérica)
      const mightNeedAdmin = errorMessage.includes('Script falhou na execução') ||
                            (errorMessage.includes('código 1') && !errorMessage.includes('Erro ao executar script'));
      
      if (isTimeoutError) {
        // Erro de timeout - marcar como falha mas continuar com próximo script
        results.failed++;
        results.errors.push({
          name: script.name,
          path: script.path,
          error: `Timeout: Script travou por mais de 3 minutos e foi encerrado automaticamente. Pulando para o próximo...`
        });
        
        // Notificar erro de timeout
        if (onProgress) {
          onProgress({
            type: 'error',
            current: completed + 1,
            total: total,
            script: script.name,
            percent: percent,
            status: 'Erro',
            message: `⏱️ Timeout: Script travou após 3 minutos. Pulando para o próximo...`
          });
        }
        
        console.warn(`[OptimizationPack] Script ${script.name} travou após 3 minutos. Pulando para o próximo script...`);
      } else if (isAdminError) {
        // Definitivamente precisa de admin
        results.requiresAdmin.push({
          name: script.name,
          path: script.path
        });
        results.skipped++;
        
        // Notificar que precisa admin mas continua
        if (onProgress) {
          onProgress({
            type: 'admin_required',
            current: completed + 1,
            total: total,
            script: script.name,
            percent: percent,
            status: 'Pronto!',
            message: 'Requer administrador'
          });
        }
      } else if (mightNeedAdmin) {
        // Possivelmente precisa de admin (código 1 genérico)
        // Marcar como erro mas avisar que pode precisar de admin
        results.failed++;
        results.errors.push({
          name: script.name,
          path: script.path,
          error: errorMessage
        });
        
        // Notificar erro com aviso sobre admin
        if (onProgress) {
          onProgress({
            type: 'error',
            current: completed + 1,
            total: total,
            script: script.name,
            percent: percent,
            status: 'Erro',
            message: `${errorMessage}. Pode ser necessário executar como administrador.`
          });
        }
      } else {
        // Erro claro, não relacionado a privilégios
        results.failed++;
        results.errors.push({
          name: script.name,
          path: script.path,
          error: errorMessage
        });
        
        // Notificar erro
        if (onProgress) {
          onProgress({
            type: 'error',
            current: completed + 1,
            total: total,
            script: script.name,
            percent: percent,
            status: 'Erro',
            message: errorMessage
          });
        }
      }
    }
    
    completed++;
  }
  
  // Notificar conclusão
  if (onProgress) {
    onProgress({
      type: 'completed',
      total: total,
      percent: 100,
      results: results
    });
  }
  
  return results;
}

async function prepareExecutable(sourcePath) {
  if (!app.isPackaged) {
    return sourcePath;
  }
  const tempDir = path.join(app.getPath('temp'), 'y20-optimization');
  await fs.mkdir(tempDir, { recursive: true });
  const destination = path.join(tempDir, path.basename(sourcePath));
  await fs.copyFile(sourcePath, destination);
  return destination;
}

function executeProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`[OptimizationPack] executeProcess: Iniciando ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, { 
      windowsHide: true, 
      stdio: ['ignore', 'pipe', 'pipe'], // Capturar stdout e stderr
      shell: false,
      detached: false // IMPORTANTE: não detachar para garantir que aguardamos o término
    });
    
    let stdoutData = '';
    let stderrData = '';
    let processExited = false;
    
    // Timeout de 3 minutos (180000ms) para evitar travamentos
    const timeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 180000; // 3 minutos padrão
    let timeoutHandle = null;
    
    if (timeoutMs > 0) {
      timeoutHandle = setTimeout(() => {
        if (!processExited && child && child.exitCode === null) {
          processExited = true;
          console.error(`[OptimizationPack] executeProcess: Timeout de ${timeoutMs}ms (3 minutos) atingido para ${command}. Encerrando processo e pulando para o próximo...`);
          
          try {
            // Tentar encerrar o processo graciosamente primeiro
            child.kill('SIGTERM');
            
            // Aguardar um pouco antes de forçar
            setTimeout(() => {
              try {
                if (child && child.exitCode === null) {
                  // Forçar encerramento com taskkill no Windows
                  const taskkill = spawn('taskkill', ['/F', '/T', '/PID', child.pid.toString()], {
                    windowsHide: true,
                    stdio: 'ignore'
                  });
                  taskkill.on('error', () => {
                    // Ignorar erros do taskkill
                  });
                  taskkill.on('exit', () => {
                    console.log(`[OptimizationPack] executeProcess: Processo ${child.pid} forçado a encerrar via taskkill`);
                  });
                }
              } catch (error) {
                console.error(`[OptimizationPack] executeProcess: Erro ao forçar encerramento:`, error);
              }
            }, 1000);
          } catch (error) {
            console.error(`[OptimizationPack] executeProcess: Erro ao tentar encerrar processo:`, error);
          }
          
          // Rejeitar com erro de timeout - isso fará o script ser pulado e continuar com o próximo
          reject(new Error(`Tempo limite de 3 minutos atingido. Script travou e foi pulado automaticamente.`));
        }
      }, timeoutMs);
    }
    
    const clearExecTimeout = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
    };
    
    // Capturar stdout e stderr
    if (child.stdout) {
      child.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });
      child.stdout.on('end', () => {
        console.log(`[OptimizationPack] executeProcess: stdout finalizado para ${command}`);
      });
    }
    
    if (child.stderr) {
      child.stderr.on('data', (data) => {
        stderrData += data.toString();
      });
      child.stderr.on('end', () => {
        console.log(`[OptimizationPack] executeProcess: stderr finalizado para ${command}`);
      });
    }
    
    child.on('error', (error) => {
      if (processExited) return; // Ignorar erros após o processo ter terminado
      processExited = true;
      clearExecTimeout();
      
      const errorMsg = error.message || '';
      const errorCode = error.code || '';
      
      console.error(`[OptimizationPack] executeProcess: Erro ao executar ${command}:`, errorMsg);
      
      // Verificar se é erro de privilégios
      if (errorMsg.includes('access denied') || 
          errorMsg.includes('privilegios') || 
          errorMsg.includes('admin') ||
          errorMsg.includes('permission denied') ||
          errorCode === 'EACCES' ||
          errorCode === 'EPERM') {
        reject(new Error('Este script requer privilégios de administrador'));
      } else {
        reject(error);
      }
    });
    
    child.on('exit', (code, signal) => {
      if (processExited) return; // Evitar processar exit múltiplas vezes
      processExited = true;
      clearExecTimeout(); // Limpar timeout já que o processo terminou
      
      console.log(`[OptimizationPack] executeProcess: Processo ${command} terminou com código ${code}, signal ${signal}`);
      
      // IMPORTANTE: Aguardar um pequeno delay para garantir que todos os streams foram fechados
      setTimeout(() => {
        if (code === 0) {
          console.log(`[OptimizationPack] executeProcess: ${command} concluído com sucesso`);
          resolve(true);
        } else {
          // Combinar stdout e stderr para análise
          const allOutput = (stdoutData + ' ' + stderrData).toLowerCase();
          
          // Verificar se é erro de privilégios
          const isAccessDenied = allOutput.includes('access denied') || 
                                allOutput.includes('acesso negado') ||
                                allOutput.includes('privilegios') || 
                                allOutput.includes('privileges') ||
                                allOutput.includes('admin') ||
                                allOutput.includes('administrador') ||
                                allOutput.includes('permission denied') ||
                                allOutput.includes('permissão negada') ||
                                allOutput.includes('elevated') ||
                                allOutput.includes('elevação') ||
                                code === 5 || // ERROR_ACCESS_DENIED no Windows
                                code === 740; // ERROR_ELEVATION_REQUIRED
          
          if (isAccessDenied) {
            console.error(`[OptimizationPack] executeProcess: ${command} requer privilégios de administrador`);
            reject(new Error('Este script requer privilégios de administrador'));
          } else {
            // Para outros códigos de erro, verificar a mensagem de saída
            // Se houver saída útil, incluir na mensagem
            const errorMessage = stderrData.trim() || stdoutData.trim();
            if (errorMessage && errorMessage.length < 200) {
              console.error(`[OptimizationPack] executeProcess: ${command} falhou com código ${code}: ${errorMessage}`);
              reject(new Error(`Erro ao executar script (código ${code}): ${errorMessage}`));
            } else {
              // Código 1 geralmente significa erro genérico, pode ser vários motivos
              if (code === 1) {
                console.error(`[OptimizationPack] executeProcess: ${command} falhou com código 1 (erro genérico)`);
                reject(new Error(`Script falhou na execução. Pode ser necessário executar como administrador ou verificar se o script está correto.`));
              } else {
                console.error(`[OptimizationPack] executeProcess: ${command} falhou com código ${code}`);
                reject(new Error(`Processo retornou código ${code}`));
              }
            }
          }
        }
      }, 100); // Delay de 100ms para garantir que todos os streams foram fechados
    });
  });
}

module.exports = {
  listScripts,
  listNucleos,
  listScriptsSimple,
  runScriptById,
  runScriptsSequentially,
  runScriptsSimple
};

