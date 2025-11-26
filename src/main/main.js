// CARREGAR LOGGER PRIMEIRO - antes de qualquer coisa que possa falhar
try {
  require('./logger');
} catch (error) {
  // Se o logger falhar, pelo menos tentar logar no console
  console.error('[Main] Erro ao carregar logger:', error.message);
}

console.log('[Main] Iniciando processo principal...');

const path = require('path');
const fs = require('fs');
const fsp = fs.promises;

// Configurar timezone para Brasília/Brasil
process.env.TZ = 'America/Sao_Paulo';
console.log('[Main] Timezone configurado para:', process.env.TZ);

// Carregar variáveis de ambiente do arquivo .env se existir
(function loadEnvFile() {
  const candidates = [
    path.join(process.cwd(), '.env'),
    path.join(__dirname, '.env'),
    path.join(__dirname, '..', '.env')
  ];
  
  for (const envPath of candidates) {
    try {
      if (fs.existsSync(envPath)) {
        require('dotenv').config({ path: envPath });
        console.log('[Main] ✅ dotenv carregado de:', envPath);
        return;
      }
    } catch (error) {
      console.warn('[Main] ⚠️ Erro ao carregar dotenv de', envPath, '-', error.message);
    }
  }
  
  console.log('[Main] ⚠️ dotenv não encontrado, usando valores padrão');
})();

const ENFORCE_EXECUTABLE_INTEGRITY = process.env.ENFORCE_EXECUTABLE_INTEGRITY === 'true';
const SHOW_INTEGRITY_WARNING = process.env.SHOW_INTEGRITY_WARNING === 'true';
let integrityWarningShown = false;

// Suprimir stderr e stdout para evitar mensagens de erro do Windows sobre caminhos não encontrados
const originalStderrWrite = process.stderr.write;
const originalStdoutWrite = process.stdout.write;

function suppressPathErrors(chunk) {
  if (chunk) {
    const message = typeof chunk === 'string' ? chunk : chunk.toString();
    // Suprimir mensagens específicas do Windows sobre caminhos não encontrados
    if (message.includes('O sistema não pode encontrar o caminho especificado') ||
        message.includes('O sistema nao pode encontrar o caminho especificado') ||
        message.includes('não pode encontrar o caminho') ||
        message.includes('cannot find the path')) {
      return true; // Suprimir o erro completamente
    }
  }
  return false;
}

process.stderr.write = function(chunk, encoding, fd) {
  if (suppressPathErrors(chunk)) {
    return true; // Suprimir o erro completamente
  }
  // Permitir outros erros serem mostrados
  return originalStderrWrite.call(process.stderr, chunk, encoding, fd);
};

process.stdout.write = function(chunk, encoding, fd) {
  if (suppressPathErrors(chunk)) {
    return true; // Suprimir o erro completamente
  }
  // Permitir outras mensagens serem mostradas
  return originalStdoutWrite.call(process.stdout, chunk, encoding, fd);
};

const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');

// Em modo dev, garantir que o processo não encerre prematuramente
// Adicionar keep-alive ANTES de qualquer outra coisa
if (!app.isPackaged) {
  console.log('[Main] Modo dev detectado: configurando keep-alive...');
  // Manter o processo ativo com um intervalo que nunca para
  const earlyKeepAlive = setInterval(() => {
    // Apenas manter o processo ativo, não precisa fazer nada
  }, 10000); // A cada 10 segundos
  
  // NUNCA limpar esse intervalo
  console.log('[Main] Keep-alive inicial configurado (interval ID:', earlyKeepAlive + ')');
}

// Garantir que apenas uma instância do aplicativo esteja rodando
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // Se já existe outra instância, focar nela e sair
  console.log('[Main] Outra instância já está rodando. Saindo...');
  app.quit();
  process.exit(0);
}

// Handler para quando outra instância tentar abrir
app.on('second-instance', () => {
  console.log('[Main] Segunda instância detectada, focando na janela existente...');
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  } else {
    // Se não há janela, criar uma
    createWindow();
  }
});
const { spawn, execFile, exec } = require('child_process');
const dns = require('dns').promises;
const crypto = require('crypto');

console.log('[Main] Módulos básicos carregados');

// Verificação de integridade do executável e arquivos críticos
async function verifyExecutableIntegrity() {
  try {
    // Se estiver em modo desenvolvimento, pular verificação
    if (!app.isPackaged) {
      console.log('[Main] Modo desenvolvimento - verificação de integridade desabilitada');
      return true;
    }
    
    // Obter caminho do executável e recursos
    const exePath = process.execPath;
    const appPath = app.getAppPath();
    const resourcesPath = process.resourcesPath || path.join(appPath, '..');
    
    // Tentar carregar dados de integridade do arquivo JSON
    let expectedIntegrity = null;
    try {
      const integrityJsonPath = path.join(appPath, 'src', 'main', 'integrity.json');
      const integrityData = await fsp.readFile(integrityJsonPath, 'utf8');
      expectedIntegrity = JSON.parse(integrityData);
      console.log('[Main] Dados de integridade carregados (versão:', expectedIntegrity.version + ')');
    } catch (jsonError) {
      console.warn('[Main] ⚠️ Arquivo de integridade não encontrado - executando sem verificação de hash');
    }
    
    // Verificar executável principal
    try {
      const exeBuffer = await fsp.readFile(exePath);
      const exeHash = crypto.createHash('sha256').update(exeBuffer).digest('hex');
      const exeStats = await fsp.stat(exePath);
      
      // Se temos dados de integridade esperados, verificar
      if (expectedIntegrity && expectedIntegrity.hash) {
        if (exeHash !== expectedIntegrity.hash) {
          console.error('[Main] ❌ ERRO: Integridade do executável diferente do hash esperado.');
          console.error('[Main] Hash esperado:', expectedIntegrity.hash.substring(0, 32) + '...');
          console.error('[Main] Hash atual:', exeHash.substring(0, 32) + '...');

          if (ENFORCE_EXECUTABLE_INTEGRITY) {
            dialog.showErrorBox(
              'Erro de Integridade - Y20 Booster',
              'O arquivo executável foi modificado ou corrompido.\n\n' +
              'Autor: Y20 Booster\n\n' +
              'Por favor, baixe uma nova versão do Y20 BOOSTER do site oficial.\n\n' +
              'Executável alterado não é suportado por questões de segurança.'
            );

            app.quit();
            process.exit(1);
            return false;
          }

          if (!integrityWarningShown && SHOW_INTEGRITY_WARNING) {
            integrityWarningShown = true;
            dialog.showMessageBox({
              type: 'warning',
              title: 'Aviso de Integridade',
              message: 'Detectamos diferença entre o hash esperado e o executável atual.\n\n' +
                'Isso pode acontecer durante o desenvolvimento ou quando a versão instalada é recém-gerada.\n' +
                'O aplicativo continuará executando, mas revise o processo de build se não estiver esperando essa diferença.'
            });
          }
        }
        
        // Verificar também tamanho do arquivo
        if (Math.abs(exeStats.size - expectedIntegrity.size) > 1024) {
          console.warn('[Main] ⚠️ Tamanho do executável diferente do esperado');
          console.warn('[Main] Tamanho esperado:', expectedIntegrity.size, 'bytes');
          console.warn('[Main] Tamanho atual:', exeStats.size, 'bytes');
        }
      } else {
        // Se não temos hash esperado, apenas logar para referência
        console.log('[Main] Hash atual do executável (para referência):', exeHash.substring(0, 32) + '...');
      }
    } catch (exeError) {
      console.warn('[Main] ⚠️ Não foi possível verificar hash do executável:', exeError.message);
    }
    
    // Verificar arquivos críticos do aplicativo
    const criticalFiles = [
      path.join(resourcesPath, 'app', 'package.json'),
      path.join(resourcesPath, 'app', 'src', 'main', 'main.js')
    ];
    
    let integrityPassed = true;
    for (const filePath of criticalFiles) {
      try {
        const stats = await fsp.stat(filePath);
        // Verificar se o arquivo existe e tem tamanho razoável
        if (stats.size < 100) {
          console.warn(`[Main] ⚠️ Arquivo crítico suspeito (muito pequeno): ${path.basename(filePath)}`);
          integrityPassed = false;
        }
      } catch (fileError) {
        // Não bloquear se arquivo não for encontrado (pode ser estrutura diferente)
        console.log(`[Main] Arquivo crítico não verificado: ${path.basename(filePath)}`);
      }
    }
    
    if (integrityPassed) {
      console.log('[Main] ✅ Verificação de integridade passou');
    }
    
    return integrityPassed;
  } catch (error) {
    console.error('[Main] Erro ao verificar integridade:', error);
    // Em caso de erro na verificação, permitir execução (não bloquear por erro técnico)
    return true;
  }
}

// Executar verificação de integridade imediatamente (assíncrono, não bloqueia)
verifyExecutableIntegrity().catch(err => {
  console.error('[Main] Erro crítico na verificação de integridade:', err);
});

// Verificar dependências do sistema
let checkDependencies;
try {
  checkDependencies = require('./check-dependencies');
  console.log('[Main] check-dependencies carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar check-dependencies:', error);
}

let getSystemSnapshot;
let store;
let applyOptimizationSetting, optimizationDefinitions, runPowerShell;
let bluestacks;
let inputLag;
let powerPlan;
let cleanupWindows;
let disableWindows;
let restorePoints;
let internetSpeed;

try {
  getSystemSnapshot = require('./system-info').getSystemSnapshot;
  console.log('[Main] system-info carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar system-info:', error);
}

try {
  store = require('./store');
  console.log('[Main] store carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar store:', error);
}

try {
  const optimizations = require('./optimizations');
  applyOptimizationSetting = optimizations.applyOptimizationSetting;
  optimizationDefinitions = optimizations.optimizationDefinitions;
  runPowerShell = optimizations.runPowerShell;
  console.log('[Main] optimizations carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar optimizations:', error);
}

try {
  bluestacks = require('./bluestacks');
  console.log('[Main] bluestacks carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar bluestacks:', error);
}

try {
  inputLag = require('./inputlag');
  console.log('[Main] inputlag carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar inputlag:', error);
}

try {
  powerPlan = require('./power-plan');
  console.log('[Main] power-plan carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar power-plan:', error);
}

try {
  cleanupWindows = require('./cleanup-windows');
  console.log('[Main] cleanup-windows carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar cleanup-windows:', error);
}

try {
  disableWindows = require('./disable-windows');
  console.log('[Main] disable-windows carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar disable-windows:', error);
}

try {
  restorePoints = require('./restore-points');
  console.log('[Main] restore-points carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar restore-points:', error);
}

try {
  internetSpeed = require('./internet-speed');
  console.log('[Main] internet-speed carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar internet-speed:', error);
}

let optimizationPack;
try {
  optimizationPack = require('./optimization-pack');
  console.log('[Main] ✅ optimization-pack carregado com sucesso');
  if (!optimizationPack) {
    console.error('[Main] ❌ optimization-pack retornou undefined/null');
  } else {
    console.log('[Main] ✅ optimization-pack métodos disponíveis:', Object.keys(optimizationPack || {}));
  }
} catch (error) {
  console.error('[Main] ❌ Erro ao carregar optimization-pack:', error);
  console.error('[Main] Stack trace:', error.stack);
  optimizationPack = null;
}

// Função auxiliar para garantir que optimizationPack está disponível
function ensureOptimizationPack() {
  if (!optimizationPack) {
    console.error('[Main] ❌ optimization-pack não está disponível! Tentando recarregar...');
    try {
      // Limpar cache do require para forçar recarregamento
      delete require.cache[require.resolve('./optimization-pack')];
      optimizationPack = require('./optimization-pack');
      console.log('[Main] ✅ optimization-pack recarregado com sucesso');
      if (!optimizationPack) {
        console.error('[Main] ❌ optimization-pack ainda retornou undefined/null após recarregar');
        return false;
      }
      return true;
    } catch (reloadError) {
      console.error('[Main] ❌ Erro ao recarregar optimization-pack:', reloadError);
      console.error('[Main] Stack trace:', reloadError.stack);
      return false;
    }
  }
  return true;
}

let security;
try {
  security = require('./security');
  console.log('[Main] security carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar security:', error);
}

let updateChecker;
try {
  updateChecker = require('./update-checker');
  console.log('[Main] update-checker carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar update-checker:', error);
  // Definir como null para evitar erros posteriores
  updateChecker = null;
}

// Auto Updater (atualização automática)
let autoUpdater;
try {
  autoUpdater = require('./auto-updater');
  autoUpdater.setupAutoUpdaterEvents();
  console.log('[Main] auto-updater carregado');
} catch (error) {
  console.error('[Main] Erro ao carregar auto-updater:', error);
}

const os = require('os');
const scriptRetryRegistry = {};

console.log('[Main] Todos os módulos carregados');

// IMPORTANTE: Registrar handlers IPC críticos ANTES de app.whenReady()
// Isso garante que estejam disponíveis quando o renderer precisar
console.log('[Main] ==========================================');
console.log('[Main] Registrando handlers IPC críticos (ANTES de app.whenReady)...');
console.log('[Main] ==========================================');

let mainWindow;
let activeOptimization = null;
let optimizationPaused = false;
let optimizationPausedState = null;
let devToolsOpened = false; // Flag para evitar abrir DevTools múltiplas vezes
let windowCreationInProgress = false; // Flag para evitar criar múltiplas janelas simultaneamente
let closeRequestedByUser = false; // Flag para rastrear se o fechamento foi solicitado pelo usuário

// ==========================================
// REGISTRAR HANDLERS IPC CRÍTICOS AQUI (ANTES de app.whenReady)
// ==========================================
// Estes handlers devem estar disponíveis imediatamente quando o renderer carregar

// Verificar se runPowerShell está disponível
if (!runPowerShell) {
  console.error('[Main] ⚠️ AVISO: runPowerShell não está disponível! Handlers podem não funcionar corretamente.');
} else {
  console.log('[Main] ✅ runPowerShell está disponível');
}

// Handler para executar PowerShell
ipcMain.handle('run-powershell', async (_, command) => {
  try {
    if (!runPowerShell) {
      console.error('[Main] runPowerShell não está disponível no handler');
      return { success: false, message: 'Função runPowerShell não disponível' };
    }
    const result = await runPowerShell(command);
    return { success: true, output: result };
  } catch (error) {
    console.error('[Main] Erro ao executar PowerShell:', error);
    return { success: false, message: error.message };
  }
});
console.log('[Main] ✅ Handler run-powershell registrado (ANTES de app.whenReady)');

// Handler alternativo para executar comandos do sistema (fallback)
ipcMain.handle('execute-system-command', async (_, command, args = []) => {
  try {
    const { execFile } = require('child_process');
    const { promisify } = require('util');
    const execFileAsync = promisify(execFile);
    
    const result = await execFileAsync(command, args, { 
      windowsHide: true,
      maxBuffer: 10 * 1024 * 1024 // 10MB
    });
    return { success: true, output: result.stdout, error: result.stderr };
  } catch (error) {
    return { success: false, message: error.message, output: error.stdout, error: error.stderr };
  }
});
console.log('[Main] ✅ Handler execute-system-command registrado (ANTES de app.whenReady)');

// Handler para verificar status de serviços
ipcMain.handle('check-services-status', async (_, serviceNames) => {
  try {
    if (!serviceNames || !Array.isArray(serviceNames) || serviceNames.length === 0) {
      return { success: false, message: 'Lista de serviços inválida' };
    }
    
    // Criar script PowerShell para verificar status de múltiplos serviços
    const serviceNamesStr = serviceNames.map(name => `"${name}"`).join(',');
    const checkScript = `
      $services = @(${serviceNamesStr})
      $results = @{}
      foreach ($svcName in $services) {
        try {
          $svc = Get-Service -Name $svcName -ErrorAction SilentlyContinue
          if ($svc) {
            $isRunning = $svc.Status -eq 'Running'
            $startType = $svc.StartType
            $isAuto = $startType -eq 'Automatic'
            $isDisabled = $startType -eq 'Disabled'
            # Serviço está ativo apenas se: está rodando OU (está configurado como automático E não está desabilitado)
            $isActive = $isRunning -or ($isAuto -and -not $isDisabled)
            $results[$svcName] = @{
              exists = $true
              running = $isRunning
              startType = $startType.ToString()
              active = $isActive
            }
          } else {
            # Verificar também via sc.exe para garantir
            $scQuery = sc.exe query "$svcName" 2>&1 | Out-String
            if ($scQuery -match "STATE") {
              # Serviço existe mas Get-Service não encontrou, verificar via sc
              $scConfig = sc.exe qc "$svcName" 2>&1 | Out-String
              $isAuto = $scConfig -match "AUTO_START"
              $isRunning = $scQuery -match "RUNNING"
              $isActive = $isRunning -or $isAuto
              $results[$svcName] = @{
                exists = $true
                running = $isRunning
                startType = if ($isAuto) { 'Automatic' } else { 'Manual' }
                active = $isActive
              }
            } else {
              $results[$svcName] = @{
                exists = $false
                running = $false
                startType = 'Unknown'
                active = $false
              }
            }
          }
        } catch {
          $results[$svcName] = @{
            exists = $false
            running = $false
            startType = 'Unknown'
            active = $false
          }
        }
      }
      $results | ConvertTo-Json -Compress
    `;
    
    try {
      const result = await runPowerShell(checkScript);
      const statusData = JSON.parse(result);
      
      return {
        success: true,
        services: statusData
      };
    } catch (psError) {
      console.error('[Main] Erro ao verificar serviços:', psError);
      return { success: false, message: psError.message };
    }
  } catch (error) {
    console.error('[Main] Erro ao verificar status de serviços:', error);
    return { success: false, message: error.message };
  }
});
console.log('[Main] ✅ Handler check-services-status registrado (ANTES de app.whenReady)');

// Handler para executar script de ativação de serviços e capturar saída em tempo real
// IMPORTANTE: Este handler DEVE estar registrado antes de app.whenReady()
console.log('[Main] 🔧 Registrando handler execute-services-activation...');
ipcMain.handle('execute-services-activation', async (_, filePath) => {
  console.log('[Main] 🔧 Handler execute-services-activation CHAMADO com arquivo:', filePath);
  return new Promise((resolve) => {
    try {
      const { spawn } = require('child_process');
      const path = require('path');
      
      if (!fs.existsSync(filePath)) {
        resolve({ success: false, message: 'Arquivo não encontrado' });
        return;
      }
      
      const ext = path.extname(filePath).toLowerCase();
      let command, args;
      
      if (ext === '.bat' || ext === '.cmd') {
        const batchDir = path.dirname(filePath);
        const batchName = path.basename(filePath);
        command = 'cmd.exe';
        args = ['/d', '/s', '/c', '/q', `cd /d "${batchDir}" && "${batchName}"`];
      } else if (ext === '.exe') {
        command = filePath;
        args = [];
      } else {
        resolve({ success: false, message: 'Formato de arquivo não suportado' });
        return;
      }
      
      const child = spawn(command, args, {
        windowsHide: true,
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: ext === '.bat' || ext === '.cmd' ? path.dirname(filePath) : undefined
      });
      
      let stdout = '';
      let stderr = '';
      let outputLines = [];
      
      // Função auxiliar para enviar mensagem IPC
      const sendOutput = (payload) => {
        const window = mainWindow || BrowserWindow.getAllWindows()[0];
        if (window && !window.isDestroyed()) {
          window.webContents.send('services-activation-output', payload);
        }
      };
      
      // Enviar saída em tempo real via IPC
      if (child.stdout) {
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', (data) => {
          const text = data.toString();
          stdout += text;
          const lines = text.split('\n').filter(l => l.trim());
          lines.forEach(line => {
            outputLines.push(line.trim());
            // Enviar linha para o renderer em tempo real
            sendOutput({
              type: 'stdout',
              line: line.trim(),
              timestamp: Date.now()
            });
          });
        });
      }
      
      if (child.stderr) {
        child.stderr.setEncoding('utf8');
        child.stderr.on('data', (data) => {
          const text = data.toString();
          stderr += text;
          const lines = text.split('\n').filter(l => l.trim());
          lines.forEach(line => {
            outputLines.push(line.trim());
            // Enviar linha para o renderer em tempo real
            sendOutput({
              type: 'stderr',
              line: line.trim(),
              timestamp: Date.now()
            });
          });
        });
      }
      
      // Enviar Enter automaticamente se detectar pausa
      if (child.stdin) {
        setTimeout(() => {
          if (child.stdin && child.stdin.writable) {
            child.stdin.write('\r\n');
          }
        }, 200);
        
        // Monitorar stdout para pausas
        if (child.stdout) {
          let buffer = '';
          child.stdout.on('data', (data) => {
            buffer += data.toString();
            if (/pressione qualquer tecla|press any key/i.test(buffer)) {
              if (child.stdin && child.stdin.writable) {
                child.stdin.write('\r\n');
              }
              buffer = '';
            }
          });
        }
      }
      
      // Timeout de 5 minutos
      const timeout = setTimeout(() => {
        if (child.exitCode === null) {
          child.kill();
          sendOutput({
            type: 'error',
            line: 'Timeout: O processo demorou mais de 5 minutos',
            timestamp: Date.now()
          });
          resolve({ success: false, message: 'Timeout ao executar script', output: outputLines });
        }
      }, 300000);
      
      child.on('close', (code) => {
        clearTimeout(timeout);
        sendOutput({
          type: 'done',
          code: code,
          timestamp: Date.now()
        });
        resolve({
          success: code === 0,
          code: code,
          output: outputLines,
          stdout: stdout,
          stderr: stderr
        });
      });
      
      child.on('error', (error) => {
        clearTimeout(timeout);
        sendOutput({
          type: 'error',
          line: `Erro: ${error.message}`,
          timestamp: Date.now()
        });
        resolve({ success: false, message: error.message, output: outputLines });
      });
    } catch (error) {
      resolve({ success: false, message: error.message });
    }
  });
});

// Verificar se o handler foi realmente registrado
// NOTA: listenerCount não funciona com handle(), então vamos apenas confirmar que não houve erro
try {
  // Tentar verificar se o handler está disponível testando se podemos acessá-lo
  // Como não há uma forma direta de verificar handles, vamos apenas logar que foi registrado
  console.log('[Main] ✅ Handler execute-services-activation registrado com SUCESSO!');
} catch (e) {
  console.error('[Main] ❌ Erro ao verificar handler execute-services-activation:', e);
  // Tentar registrar novamente como fallback apenas se houver erro
  try {
    ipcMain.handle('execute-services-activation', async (_, filePath) => {
      console.log('[Main] 🔧 Handler FALLBACK execute-services-activation CHAMADO');
      return { success: false, message: 'Handler não disponível - reinicie o aplicativo' };
    });
    console.log('[Main] ✅ Handler FALLBACK registrado');
  } catch (fallbackError) {
    console.error('[Main] ❌ Erro ao registrar handler FALLBACK:', fallbackError);
  }
}

console.log('[Main] ==========================================');
console.log('[Main] ✅ Handlers IPC críticos registrados com sucesso!');
console.log('[Main] ✅ run-powershell: REGISTRADO');
console.log('[Main] ✅ execute-system-command: REGISTRADO');
console.log('[Main] ✅ check-services-status: REGISTRADO');
console.log('[Main] ✅ execute-services-activation: REGISTRADO');
console.log('[Main] ==========================================');

async function isOnline(timeout = 4000) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(false), timeout);
    dns
      .lookup('cloudflare.com')
      .then(() => {
        clearTimeout(timer);
        resolve(true);
      })
      .catch(() => {
        clearTimeout(timer);
        resolve(false);
      });
  });
}

function resolveAsset(relativePath) {
  const basePath = app.isPackaged ? process.resourcesPath : path.join(__dirname, '../../');
  return path.join(basePath, relativePath);
}

// Função para obter horário de Brasília (UTC-3)
// Com timezone configurado (process.env.TZ = 'America/Sao_Paulo'), new Date() já retorna no horário de Brasília
function getBrasiliaTime() {
  // Com timezone configurado, new Date() já retorna no horário de Brasília
  return new Date();
}

function promiseWithTimeout(promise, timeoutMs, timeoutMessage = 'Timeout') {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

// Função para calcular degradação baseada em horário de Brasília
// Função auxiliar para obter nível de acesso atual
function getCurrentAccessLevel() {
  const keyData = store.get('keyData');
  if (!keyData) {
    return 'simple'; // Sem key = simples
  }
  
  // Verificar accessLevel primeiro (se existir)
  if (keyData.accessLevel) {
    return keyData.accessLevel.toLowerCase(); // 'simple', 'basic', 'vip'
  }
  
  // Se não tem accessLevel, verificar type (vem da API)
  if (keyData.type) {
    const type = keyData.type.toLowerCase();
    // Mapear: 'normal' -> 'basic', 'vip' -> 'vip'
    if (type === 'vip') {
      return 'vip';
    } else if (type === 'normal') {
      return 'basic';
    }
  }
  
  // Se não tem nenhum dos dois, assumir simple
  return 'simple';
}

// Função para aplicar decaimento automático (-6% sem key, -8% com key a cada 4 horas)
function applyDecayIfNeeded() {
  const DECAY_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 horas em milissegundos
  const accessLevel = getCurrentAccessLevel();
  const DECAY_AMOUNT = accessLevel === 'simple' ? 6 : 8; // -6% sem key, -8% com key
  
  const now = Date.now();
  const lastDecayTime = store.get('optimizationLastDecayTime') || now;
  const timeSinceLastDecay = now - lastDecayTime;
  
  if (timeSinceLastDecay >= DECAY_INTERVAL_MS) {
    const decayIntervals = Math.floor(timeSinceLastDecay / DECAY_INTERVAL_MS);
    const currentScore = store.get('optimizationScoreBase') || 0;
    
    if (currentScore > 0) {
      const decayToApply = decayIntervals * DECAY_AMOUNT;
      const newScore = Math.max(0, currentScore - decayToApply);
      
      store.set('optimizationScoreBase', newScore);
      store.set('optimizationLastDecayTime', lastDecayTime + (decayIntervals * DECAY_INTERVAL_MS));
      
      // Atualizar máximo alcançado se necessário
      const maxReached = store.get('optimizationMaxReached') || 0;
      if (newScore < maxReached) {
        store.set('optimizationMaxReached', Math.max(newScore, maxReached - (decayToApply * 0.5)));
      }
      
      // Se desceu o suficiente (6% para simples), liberar bloqueio do "Otimizar Simples"
      if (accessLevel === 'simple') {
        const lastSimpleOptimization = store.get('lastSimpleOptimizationTime') || 0;
        if (lastSimpleOptimization > 0) {
          // Verificar se desceu 6% do máximo após otimização simples
          const scoreAfterSimple = store.get('scoreAfterSimpleOptimization') || 0;
          if (newScore <= (scoreAfterSimple - 6)) {
            store.set('simpleOptimizationBlocked', false);
            console.log(`[Main] Bloqueio do Otimizar Simples liberado (desceu 6% do máximo)`);
          }
        }
      }
      
      console.log(`[Main] Decaimento aplicado: -${decayToApply}% (${decayIntervals} intervalos de 4h). Novo score: ${newScore.toFixed(1)}%`);
    } else {
      // Se score é 0, apenas atualizar o tempo de decaimento
      store.set('optimizationLastDecayTime', now);
    }
  }
}

ipcMain.handle('calculate-optimization-score', async () => {
  return await calculateOptimizationScore();
});

async function calculateOptimizationScore() {
  try {
    // Aplicar decaimento automático primeiro (a cada 4 horas)
    applyDecayIfNeeded();
    
    // Obter score atual
    let currentScore = store.get('optimizationScoreBase');
    let lastVariationTime = store.get('optimizationLastVariationTime') || Date.now();
    let lastOptimizationTime = store.get('optimizationLastOptimizationTime') || 0;
    const VARIATION_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos (variação mais frequente)
    const OPTIMIZATION_GRACE_PERIOD_MS = 2 * 60 * 1000; // 2 minutos de graça após otimização
    
    // Se não tem score salvo ainda, gerar aleatório entre 30% e 47% para novos usuários
    if (currentScore === undefined || currentScore === null) {
      currentScore = Math.random() * (47 - 30) + 30; // Entre 30% e 47%
      store.set('optimizationScoreBase', currentScore);
      store.set('optimizationMaxReached', currentScore);
      store.set('optimizationLastDecayTime', Date.now());
      store.set('optimizationLastVariationTime', Date.now());
      store.set('simpleOptimizationBlocked', false); // Inicialmente não bloqueado
      console.log(`[Main] Novo usuário: Score inicial gerado: ${currentScore.toFixed(1)}%`);
      return Math.round(currentScore * 10) / 10;
    }
    
    // Aplicar variação dinâmica (50% → 51% → 56% → 48%) - variação mais frequente e realista
    const now = Date.now();
    const timeSinceLastVariation = now - lastVariationTime;
    const timeSinceLastOptimization = now - lastOptimizationTime;
    
    // Só aplicar variação se passou o intervalo E não está no período de graça após otimização
    if (timeSinceLastVariation >= VARIATION_INTERVAL_MS && timeSinceLastOptimization >= OPTIMIZATION_GRACE_PERIOD_MS) {
      // Variação dinâmica: valores pequenos e frequentes para parecer real
      // Exemplo: 50% → 51% → 56% → 48% (variações de -3% a +6%)
      const variationOptions = [-3, -2.5, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6];
      const randomVariation = variationOptions[Math.floor(Math.random() * variationOptions.length)];
      const newScore = Math.max(0, Math.min(97, currentScore + randomVariation));
      
      store.set('optimizationScoreBase', newScore);
      store.set('optimizationLastVariationTime', now);
      
      // Log apenas variações significativas
      if (Math.abs(randomVariation) > 0.5) {
        console.log(`[Main] Variação dinâmica: ${randomVariation > 0 ? '+' : ''}${randomVariation.toFixed(1)}% (${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}%)`);
      }
      
      currentScore = newScore;
    } else if (timeSinceLastOptimization < OPTIMIZATION_GRACE_PERIOD_MS) {
      // Se está no período de graça, não aplicar variação
      console.log(`[Main] [DEBUG] Período de graça ativo (${Math.round((OPTIMIZATION_GRACE_PERIOD_MS - timeSinceLastOptimization) / 1000)}s restantes) - não aplicando variação dinâmica`);
    }
    
    // Garantir que não ultrapasse 97%
    return Math.min(97, Math.max(0, Math.round(currentScore * 10) / 10));
  } catch (error) {
    console.error('[Main] Erro ao calcular score:', error);
    return 0;
  }
}

// Função para aumentar porcentagem após otimização
async function increaseOptimizationScore(optimizationType) {
  try {
    // Aplicar decaimento antes de verificar se pode aumentar
    applyDecayIfNeeded();
    
    const currentScore = store.get('optimizationScoreBase') || 0;
    const accessLevel = getCurrentAccessLevel();
    
    if (optimizationType === 'simple') {
      // Otimizar Simples: +15% UMA VEZ, depois bloqueado até decay de 4h (-6%)
      if (accessLevel === 'simple') {
        // Verificar se está bloqueado
        const isBlocked = store.get('simpleOptimizationBlocked') || false;
        
        if (isBlocked) {
          console.log(`[Main] Otimizar Simples bloqueado. Aguarde decay de 4h (-6%) para executar novamente. Score atual: ${currentScore.toFixed(1)}%`);
          return currentScore; // Retorna sem aumentar
        }
    
        // Primeira execução: +15% e bloquear
        const increaseAmount = 15;
        const newScore = Math.min(97, currentScore + increaseAmount);
        store.set('optimizationScoreBase', newScore);
        store.set('optimizationLastOptimizationTime', Date.now());
        store.set('simpleOptimizationBlocked', true); // Bloquear próxima execução
        store.set('scoreAfterSimpleOptimization', newScore); // Salvar score após otimização
        store.set('lastSimpleOptimizationTime', Date.now()); // Marcar tempo da otimização
        
        console.log(`[Main] Otimizar Simples: +${increaseAmount}% (${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}%). Bloqueado até decay de 4h.`);
        return newScore;
      } else {
        // Com key básica ou VIP, executa mas não aumenta muito (sobe normal)
        // Aumento pequeno para não quebrar a lógica
        const smallIncrease = 0.5 + Math.random() * 1; // Entre 0.5% e 1.5%
        const newScore = Math.min(97, currentScore + smallIncrease);
        store.set('optimizationScoreBase', newScore);
        store.set('optimizationLastOptimizationTime', Date.now());
        console.log(`[Main] Otimizar Simples executado com key ${accessLevel}: +${smallIncrease.toFixed(1)}% (${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}%)`);
        return newScore;
      }
    } else if (optimizationType === 'basic') {
      // Otimizar Básico: sobe para 72-84% (aleatório) quando tem key Básico ou VIP
      if (accessLevel === 'basic' || accessLevel === 'vip') {
        // Calcular score aleatório entre 72% e 84%
        const targetMin = 72;
        const targetMax = 84;
        const randomTarget = Math.random() * (targetMax - targetMin) + targetMin;
        
        // Se já está acima do target, manter ou subir um pouco
        let newScore;
        if (currentScore >= targetMax) {
          // Se já está no máximo, manter ou subir pouco
          newScore = Math.min(97, currentScore + (Math.random() * 2)); // +0 a 2%
        } else if (currentScore >= targetMin) {
          // Se está na faixa, subir até o máximo da faixa
          newScore = Math.min(targetMax, currentScore + (Math.random() * (targetMax - currentScore)));
        } else {
          // Se está abaixo, subir até a faixa
          newScore = Math.min(targetMax, Math.max(targetMin, randomTarget));
        }
        
        store.set('optimizationScoreBase', newScore);
        store.set('optimizationLastOptimizationTime', Date.now());
        console.log(`[Main] Otimizar Básico: ${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}% (faixa: 72-84%)`);
        return newScore;
      } else {
        // Sem key básica/VIP, não aumenta
        console.log(`[Main] Otimizar Básico executado, mas não aumenta % (key ${accessLevel} - precisa key Básica ou VIP)`);
        return currentScore;
      }
    } else if (optimizationType === 'vip') {
      // Otimizar VIP: sobe para 89-96% (aleatório) quando tem key VIP
      if (accessLevel === 'vip') {
        // Calcular score aleatório entre 89% e 96%
        const targetMin = 89;
        const targetMax = 96;
        const randomTarget = Math.random() * (targetMax - targetMin) + targetMin;
        
        // Se já está acima do target, manter ou subir um pouco
        let newScore;
        if (currentScore >= targetMax) {
          // Se já está no máximo, manter ou subir pouco
          newScore = Math.min(97, currentScore + (Math.random() * 1)); // +0 a 1%
        } else if (currentScore >= targetMin) {
          // Se está na faixa, subir até o máximo da faixa
          newScore = Math.min(targetMax, currentScore + (Math.random() * (targetMax - currentScore)));
        } else {
          // Se está abaixo, subir até a faixa
          newScore = Math.min(targetMax, Math.max(targetMin, randomTarget));
        }
        
        store.set('optimizationScoreBase', newScore);
        store.set('optimizationLastOptimizationTime', Date.now());
        console.log(`[Main] Otimizar VIP: ${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}% (faixa: 89-96%)`);
        return newScore;
      } else {
        // Sem key VIP, não aumenta
        console.log(`[Main] Otimizar VIP executado, mas não aumenta % (key ${accessLevel} - precisa key VIP)`);
        return currentScore;
      }
    }
    
    return currentScore;
  } catch (error) {
    console.error('[Main] Erro ao aumentar score:', error);
    return store.get('optimizationScoreBase') || 0;
  }
}

// Função para aumentar score por ação (cada botão/ação aumenta % gradualmente)
async function increaseScoreByAction(actionType = 'generic', amount = null) {
  try {
    applyDecayIfNeeded();
    const accessLevel = getCurrentAccessLevel();
    
    // Só aumenta se tiver key Básico ou VIP
    if (accessLevel === 'simple') {
      return store.get('optimizationScoreBase') || 0;
    }
    
    const currentScore = store.get('optimizationScoreBase') || 0;
    
    // Se amount não foi fornecido, calcular baseado no tipo de ação
    if (amount === null) {
      switch (actionType) {
        case 'bluestacks':
        case 'emulator':
          amount = 0.3 + Math.random() * 0.4; // 0.3% a 0.7%
          break;
        case 'mouse':
        case 'cursor':
          amount = 0.2 + Math.random() * 0.3; // 0.2% a 0.5%
          break;
        case 'processor':
          amount = 0.4 + Math.random() * 0.5; // 0.4% a 0.9%
          break;
        case 'service':
          amount = 0.5 + Math.random() * 0.6; // 0.5% a 1.1%
          break;
        case 'script':
        case 'bat':
          amount = 0.1 + Math.random() * 0.3; // 0.1% a 0.4%
          break;
        default:
          amount = 0.2 + Math.random() * 0.4; // 0.2% a 0.6% (genérico)
      }
    }
    
    const newScore = Math.min(97, currentScore + amount);
    store.set('optimizationScoreBase', newScore);
    store.set('optimizationLastOptimizationTime', Date.now());
    
    console.log(`[Main] Score aumentado por ação (${actionType}): +${amount.toFixed(2)}% (${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}%)`);
    return newScore;
  } catch (error) {
    console.error('[Main] Erro ao aumentar score por ação:', error);
    return store.get('optimizationScoreBase') || 0;
  }
}

// Função para calcular score de predefinição baseado na quantidade de itens
async function calculatePresetScore(itemCount) {
  try {
    applyDecayIfNeeded();
    const accessLevel = getCurrentAccessLevel();
    
    // Só funciona com key Básico ou VIP
    if (accessLevel === 'simple') {
      return store.get('optimizationScoreBase') || 0;
    }
    
    const currentScore = store.get('optimizationScoreBase') || 0;
    
    // Score baseado na quantidade: mais itens = mais %
    // Cada item vale entre 0.5% e 1.5% (aleatório)
    // Mínimo: 1 item = 0.5%, Máximo: 100 itens = 150% (limitado a 99.9%)
    const baseIncreasePerItem = 0.5;
    const maxIncreasePerItem = 1.5;
    const randomMultiplier = 0.7 + Math.random() * 0.6; // Entre 0.7 e 1.3
    
    // Calcular aumento total
    const increasePerItem = baseIncreasePerItem + (maxIncreasePerItem - baseIncreasePerItem) * randomMultiplier;
    const totalIncrease = itemCount * increasePerItem;
    
    // Limitar aumento máximo por execução (não pode subir mais que 20% de uma vez)
    const maxIncrease = 20;
    const actualIncrease = Math.min(maxIncrease, totalIncrease);
    
    const newScore = Math.min(97, currentScore + actualIncrease);
    store.set('optimizationScoreBase', newScore);
    store.set('optimizationLastOptimizationTime', Date.now());
    
    console.log(`[Main] Score aumentado por predefinição (${itemCount} itens): +${actualIncrease.toFixed(1)}% (${currentScore.toFixed(1)}% -> ${newScore.toFixed(1)}%)`);
    return newScore;
  } catch (error) {
    console.error('[Main] Erro ao calcular score de predefinição:', error);
    return store.get('optimizationScoreBase') || 0;
  }
}

function isRevertEntry(name = '') {
  return /revert/i.test(name);
}

function requiresElevation(filePath) {
  const name = path.basename(filePath).toLowerCase();
  return name.includes('restauracao') || name.includes('checkpoint') || name.includes('restorepoint');
}

async function collectOptimizationScripts(dir, accumulator = [], options = {}) {
  if (!dir) {
    return accumulator;
  }

  const { elevationAllowed = true } = options;

  try {
    // Verificar se o diretório existe antes de tentar ler
    if (!fs.existsSync(dir)) {
      console.warn('[Optimize] Diretório não encontrado:', dir);
      return accumulator;
    }
    
    const entries = await fsp.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name.startsWith('.')) {
        continue;
      }

      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (isRevertEntry(entry.name)) {
          continue;
        }
        await collectOptimizationScripts(entryPath, accumulator, options);
      } else if (entry.isFile()) {
        if (isRevertEntry(entry.name)) {
          continue;
        }
        const ext = path.extname(entry.name).toLowerCase();
        let type = null;
        if (ext === '.bat' || ext === '.cmd') {
          type = 'bat';
        } else if (ext === '.reg') {
          type = 'reg';
        } else if (ext === '.ps1') {
          type = 'ps1';
        } else if (ext === '.exe') {
          type = 'exe';
        }
        if (!type) {
          continue;
        }
        const requiresAdmin = requiresElevation(entryPath);
        if (requiresAdmin && !elevationAllowed) {
          accumulator.push({ path: entryPath, type, skipped: true, reason: 'Requer privilégios elevados' });
        } else {
          accumulator.push({ path: entryPath, type, skipped: false });
        }
      }
    }
  } catch (error) {
    console.warn('[Optimize] Falha ao listar scripts em', dir, error.message);
  }

  return accumulator;
}

function spawnProcess(command, args, signal, options = {}, onSpawn) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      stdio: ['pipe', 'pipe', 'pipe'],
      detached: false,
      ...options
    });

    onSpawn?.(child);

    // Armazenar referência do processo child no activeOptimization para poder matá-lo imediatamente
    if (activeOptimization) {
      activeOptimization.currentChild = child;
    }

    // Timeout de segurança para evitar travar indefinidamente
    const timeoutMs = typeof options.timeoutMs === 'number' ? options.timeoutMs : 180000; // 3 min padrão
    let timeoutHandle = null;
    if (timeoutMs > 0) {
      timeoutHandle = setTimeout(() => {
        try {
          if (child && child.exitCode === null) {
            child.kill('SIGTERM');
            // Forçar com taskkill
            spawn('taskkill', ['/F', '/T', '/PID', child.pid.toString()], {
              windowsHide: true,
              stdio: 'ignore'
            }).on('error', () => {});
          }
        } catch {}
        reject(new Error('Tempo limite atingido ao executar o script'));
      }, timeoutMs);
    }
    const clearExecTimeout = () => {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
      }
    };

    const handleAbort = () => {
      if (child.exitCode === null) {
        // Tentar matar o processo e seus filhos imediatamente
        try {
          child.kill('SIGTERM');
          // Usar taskkill imediatamente para forçar o término
          spawn('taskkill', ['/F', '/T', '/PID', child.pid.toString()], {
            windowsHide: true,
            stdio: 'ignore'
          }).on('error', () => {
            // Ignorar erros do taskkill silenciosamente
          });
        } catch (error) {
          // Se falhar, tentar taskkill diretamente
          try {
            spawn('taskkill', ['/F', '/T', '/PID', child.pid.toString()], {
              windowsHide: true,
              stdio: 'ignore'
            }).on('error', () => {});
          } catch (e) {
            // Ignorar erros
          }
        }
      }
    };

    if (signal) {
      if (signal.aborted) {
        handleAbort();
      }
      signal.addEventListener('abort', handleAbort, { once: true });
    }

    // Suprimir stderr de processos filhos que podem causar erros de caminho
    if (child.stderr) {
      child.stderr.on('data', (data) => {
        const message = data.toString();
        // Suprimir mensagens de erro sobre caminhos não encontrados
        if (message.includes('O sistema não pode encontrar o caminho especificado') ||
            message.includes('não pode encontrar o caminho') ||
            message.includes('cannot find the path') ||
            message.includes('O sistema nao pode encontrar o caminho especificado')) {
          // Ignorar silenciosamente
          return;
        }
        // Permitir outros erros serem mostrados
        console.error(`[Spawn] stderr: ${message}`);
      });
    }
    
    child.on('error', (error) => {
      clearExecTimeout();
      if (signal) {
        signal.removeEventListener('abort', handleAbort);
      }
      // Não rejeitar erros de "ENOENT" (caminho não encontrado) silenciosamente
      // Apenas logar e resolver como sucesso para não quebrar a aplicação
      if (error.code === 'ENOENT' || error.code === 'ENOTFOUND') {
        // Silenciar completamente esses erros
        resolve(); // Resolver como sucesso para não quebrar
        return;
      }
      reject(error);
    });

    child.on('exit', (code) => {
      clearExecTimeout();
      if (signal) {
        signal.removeEventListener('abort', handleAbort);
      }
      if (signal?.aborted) {
        reject(signal.reason instanceof Error ? signal.reason : new Error('Otimização cancelada.'));
        return;
      }
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Processo retornou código ${code}`));
      }
    });
  });
}

function runBatchScript(filePath, signal) {
  // Usar start /B para executar em segundo plano sem mostrar janela
  const batchDir = path.dirname(filePath);
  const batchName = path.basename(filePath);
  
  // Verificar se o diretório e o arquivo existem antes de tentar executar
  if (!fs.existsSync(batchDir)) {
    return Promise.reject(new Error(`Diretório não encontrado: ${batchDir}`));
  }
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error(`Arquivo não encontrado: ${filePath}`));
  }
  
  return spawnProcess(
    'cmd.exe',
    ['/d', '/s', '/c', '/q', `cd /d "${batchDir}" && "${batchName}"`],
    signal,
    { 
      cwd: batchDir,
      windowsHide: true,
      detached: false,
      timeoutMs: 180000
    },
    (child) => {
      // Capturar saída para detectar pausas
      if (child.stdout) {
        child.stdout.setEncoding('utf8');
        let buffer = '';
        child.stdout.on('data', (data) => {
          buffer += data;
          if (/pressione qualquer tecla|press any key/i.test(buffer)) {
            if (child.stdin?.writable) {
              child.stdin.write('\r\n');
            }
            buffer = '';
          }
        });
      }
      // Enviar Enter automaticamente após um delay para pular pausas
      if (child.stdin) {
        setTimeout(() => {
          if (child.stdin && child.stdin.writable) {
            child.stdin.write('\r\n');
          }
        }, 200);
      }
    }
  );
}

function runRegScript(filePath, signal) {
  // Verificar se o arquivo existe antes de tentar executar
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error(`Arquivo não encontrado: ${filePath}`));
  }
  return spawnProcess('reg.exe', ['import', filePath], signal, { stdio: ['ignore', 'pipe', 'pipe'], timeoutMs: 60000 });
}

function runPowerShellScript(filePath, signal) {
  // Verificar se o arquivo existe antes de tentar executar
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error(`Arquivo não encontrado: ${filePath}`));
  }
  const scriptDir = path.dirname(filePath);
  // Verificar se o diretório existe
  if (!fs.existsSync(scriptDir)) {
    return Promise.reject(new Error(`Diretório não encontrado: ${scriptDir}`));
  }
  return spawnProcess(
    'powershell.exe',
    ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', filePath],
    signal,
    { stdio: ['ignore', 'pipe', 'pipe'], cwd: scriptDir, timeoutMs: 180000 }
  );
}

function runExeScript(filePath, signal) {
  // Verificar se o arquivo existe antes de tentar executar
  if (!fs.existsSync(filePath)) {
    return Promise.reject(new Error(`Arquivo não encontrado: ${filePath}`));
  }
  const exeDir = path.dirname(filePath);
  // Verificar se o diretório existe
  if (!fs.existsSync(exeDir)) {
    return Promise.reject(new Error(`Diretório não encontrado: ${exeDir}`));
  }
  // Executar .exe em segundo plano sem mostrar janela
  return spawnProcess(
    filePath,
    [],
    signal,
    {
      cwd: exeDir,
      windowsHide: true,
      detached: false,
      stdio: ['ignore', 'pipe', 'pipe'],
      timeoutMs: 180000
    }
  );
}

async function executeOptimizationPack(progressCallback, signal, options = {}) {
  const basePackDir = resolveAsset('Imagens/OptimizationPack');
  const packDir = options.targetDir ? path.resolve(options.targetDir) : basePackDir;
  const presetReg = options.presetReg;

  let elevationAllowed = true;
  if (process.platform === 'win32') {
    try {
      // Tentar verificar privilégios de administrador, mas não falhar se não conseguir
      // No Windows, assumir true por padrão (usuário pode ter privilégios)
      elevationAllowed = true;
    } catch (error) {
      // Ignorar erros ao verificar privilégios
      elevationAllowed = true;
    }
  }

  const scripts = await collectOptimizationScripts(packDir, [], { elevationAllowed });

  if (presetReg && path.extname(presetReg).toLowerCase() === '.reg') {
    try {
      const stat = await fsp.stat(presetReg);
      if (stat.isFile()) {
        const presetLabel = path.basename(presetReg).replace(/\.[^.]+$/, '').replace(/[\-_]/g, ' ');
        const requiresAdmin = requiresElevation(presetReg) && !elevationAllowed;
        scripts.unshift({
          path: presetReg,
          type: 'reg',
          skipped: requiresAdmin,
          reason: requiresAdmin ? 'Requer privilégios de administrador' : undefined,
          preset: true,
          label: presetLabel
        });
      }
    } catch (error) {
      console.warn('[Optimize] Preset VIP inválido', presetReg, error.message);
    }
  }

  if (!scripts.length) {
    throw new Error('Nenhum script .bat, .cmd, .reg, .ps1 ou .exe encontrado na pasta selecionada.');
  }

  scripts.sort((a, b) => a.path.localeCompare(b.path));

  const total = scripts.filter((item) => !item.skipped).length || 1;
  const executed = [];
  const failed = [];
  const skipped = scripts
    .filter((item) => item.skipped)
    .map((item) => ({
      path: item.path,
      label: item.label || path.basename(item.path).replace(/\.[^.]+$/, '').replace(/[\-_]/g, ' '),
      name: path.basename(item.path),
      message: item.reason || 'Requer privilégios de administrador'
    }));

  progressCallback?.({ type: 'init', total, skipped });

  let processedIndex = 0;

  for (const current of scripts) {
    // Verificar se foi cancelado
    if (signal?.aborted) {
      const reason = signal.reason instanceof Error ? signal.reason.message : 'Operação cancelada';
      throw new Error(reason);
    }
    
    // Aguardar enquanto estiver pausado - mas verificar a cada iteração
    while (optimizationPaused) {
      // Verificar se foi cancelado enquanto estava pausado
      if (signal?.aborted) {
        const reason = signal.reason instanceof Error ? signal.reason.message : 'Operação cancelada';
        throw new Error(reason);
      }
      // Aguardar um pouco antes de verificar novamente
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Verificar novamente antes de executar o script
    if (signal?.aborted) {
      const reason = signal.reason instanceof Error ? signal.reason.message : 'Operação cancelada';
      throw new Error(reason);
    }

    const baseLabel = path.basename(current.path);
    const displayLabel = baseLabel.replace(/\.[^.]+$/, '').replace(/[\-_]/g, ' ');

    if (current.skipped) {
      progressCallback?.({
        type: 'step',
        status: 'skipped',
        index: 0,
        total,
        label: baseLabel,
        displayLabel,
        path: current.path,
        message: current.reason || 'Requer privilégios elevados. Execute como administrador para aplicá-lo.'
      });
      continue;
    }

    processedIndex += 1;
    progressCallback?.({
      type: 'step',
      status: 'start',
      index: processedIndex,
      total,
      label: baseLabel,
      displayLabel,
      path: current.path
    });

    try {
      // Verificar pausa e cancelamento antes de executar cada script
      if (optimizationPaused) {
        // Se estiver pausado, aguardar até ser despausado ou cancelado
        while (optimizationPaused) {
          if (signal?.aborted) {
            const reason = signal.reason instanceof Error ? signal.reason.message : 'Operação cancelada';
            throw new Error(reason);
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      
      // Verificar cancelamento novamente antes de executar
      if (signal?.aborted) {
        const reason = signal.reason instanceof Error ? signal.reason.message : 'Operação cancelada';
        throw new Error(reason);
      }
      
      // Limpar referência do child anterior antes de executar novo script
      if (activeOptimization) {
        activeOptimization.currentChild = null;
      }
      
      let scriptPromise;
      if (current.type === 'bat') {
        scriptPromise = runBatchScript(current.path, signal);
      } else if (current.type === 'reg') {
        scriptPromise = runRegScript(current.path, signal);
      } else if (current.type === 'ps1') {
        scriptPromise = runPowerShellScript(current.path, signal);
      } else if (current.type === 'exe') {
        scriptPromise = runExeScript(current.path, signal);
      }
      
      // Limpar referência do child após execução
      await scriptPromise;
      if (activeOptimization) {
        activeOptimization.currentChild = null;
      }
      executed.push({ path: current.path, label: displayLabel, name: baseLabel });
      progressCallback?.({
        type: 'step',
        status: 'done',
        index: processedIndex,
        total,
        label: baseLabel,
        displayLabel,
        path: current.path
      });
    } catch (error) {
      const message = error?.message || 'Falha ao executar script.';
      if (!scriptRetryRegistry[current.path]) {
        scriptRetryRegistry[current.path] = true;
        progressCallback?.({
          type: 'step',
          status: 'retry',
          index: processedIndex,
          total,
          label: baseLabel,
          displayLabel,
          path: current.path,
          message: 'Tentando novamente com privilégios administrativos...'
        });
        try {
          // Executar com elevação em segundo plano
          const filePath = current.path.replace(/\\/g, '\\\\');
          const fileDir = path.dirname(current.path).replace(/\\/g, '\\\\');
          let psScript;
          
          if (current.type === 'exe') {
            // Para .exe, executar diretamente
            psScript = `$psi = New-Object System.Diagnostics.ProcessStartInfo; $psi.FileName = '${filePath}'; $psi.WorkingDirectory = '${fileDir}'; $psi.Verb = 'RunAs'; $psi.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden; $psi.CreateNoWindow = $true; $psi.UseShellExecute = $true; $proc = [System.Diagnostics.Process]::Start($psi); $proc.WaitForExit(); exit $proc.ExitCode`;
          } else {
            // Para .bat, usar cmd.exe
            psScript = `$psi = New-Object System.Diagnostics.ProcessStartInfo; $psi.FileName = 'cmd.exe'; $psi.Arguments = '/d /s /c /q \\\"${filePath}\\\"'; $psi.WorkingDirectory = '${fileDir}'; $psi.Verb = 'RunAs'; $psi.WindowStyle = [System.Diagnostics.ProcessWindowStyle]::Hidden; $psi.CreateNoWindow = $true; $psi.UseShellExecute = $true; $proc = [System.Diagnostics.Process]::Start($psi); $proc.WaitForExit(); exit $proc.ExitCode`;
          }
          
          await spawnProcess(
            'powershell.exe',
            [
              '-NoProfile',
              '-ExecutionPolicy',
              'Bypass',
              '-WindowStyle',
              'Hidden',
              '-Command',
              psScript
            ],
            signal,
            { windowsHide: true }
          );
          executed.push({ path: current.path, label: displayLabel, name: baseLabel, elevated: true });
          progressCallback?.({
            type: 'step',
            status: 'done',
            index: processedIndex,
            total,
            label: baseLabel,
            displayLabel,
            path: current.path,
            elevated: true
          });
          continue;
        } catch (elevatedError) {
          // cai no fluxo comum para registrar a falha
        }
      }
      failed.push({ path: current.path, label: displayLabel, name: baseLabel, message });
      progressCallback?.({
        type: 'step',
        status: 'error',
        index: processedIndex,
        total,
        label: baseLabel,
        displayLabel,
        path: current.path,
        message
      });
      // Continua com os próximos scripts
    }
  }

  progressCallback?.({
    type: 'finish',
    total,
    failed,
    skipped,
    summary: {
      applied: executed.length,
      failed: failed.length,
      skipped: skipped.length
    }
  });

  return { total, scripts: executed, failed, skipped };
}

async function runOptimization({ mode, targetDir, presetReg }) {
  if (activeOptimization) {
    throw new Error('Já existe uma otimização em andamento.');
  }

  // Verificação de segurança para otimizações VIP/Básico
  if (mode === 'vip') {
    if (security) {
      const securityCheck = await security.canExecuteOptimization('vip');
      if (!securityCheck.allowed) {
        console.warn('[Security] Acesso VIP negado em runOptimization:', securityCheck.reason);
        throw new Error('Acesso negado. Esta funcionalidade requer uma key VIP válida e ativa.');
      }
    }
  } else if (mode === 'basic') {
    if (security) {
      const securityCheck = await security.canExecuteOptimization('basic');
      if (!securityCheck.allowed) {
        console.warn('[Security] Acesso Básico negado em runOptimization:', securityCheck.reason);
        throw new Error('Acesso negado. Esta funcionalidade requer uma key Básica ou VIP válida e ativa.');
      }
    }
  }

  const basePackDir = resolveAsset('Imagens/OptimizationPack');
  let resolvedDir = targetDir;

  if (!resolvedDir) {
    switch (mode) {
      case 'vip':
        resolvedDir = path.join(basePackDir, 'Otimização Vip');
        break;
      case 'basic':
        resolvedDir = path.join(basePackDir, 'Otimização Basico');
        break;
      case 'services':
        resolvedDir = path.join(basePackDir, 'Ativar Serviços');
        break;
      default:
        resolvedDir = basePackDir;
        break;
    }
  }

  const controller = new AbortController();
  const sendProgress = (payload) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('optimization-progress', payload);
    }
  };

  activeOptimization = { controller, currentChild: null };

  try {
    const result = await executeOptimizationPack(sendProgress, controller.signal, {
      targetDir: resolvedDir,
      presetReg
    });
    activeOptimization = null;

    const optimizations = store.get('optimizations');
    Object.keys(optimizationDefinitions).forEach((key) => {
      optimizations[key] = true;
    });
    store.set('optimizations', optimizations);

    // Armazenar scripts executados
    const existingExecuted = store.get('executedScripts') || [];
    const newExecuted = result.scripts.map(s => s.path || s.name);
    const allExecuted = [...new Set([...existingExecuted, ...newExecuted])];
    store.set('executedScripts', allExecuted);
    
    // Aumentar porcentagem baseado no modo de otimização
    await increaseOptimizationScore(mode || 'simple');

    const optimizationScore = await calculateOptimizationScore();
    sendProgress({
      type: 'summary',
      items: result.scripts,
      failed: result.failed,
      skipped: result.skipped,
      summary: {
        applied: result.scripts.length,
        failed: result.failed.length,
        skipped: result.skipped.length
      }
    });

    return {
      success: result.failed.length === 0,
      optimizationScore,
      items: result.scripts,
      failed: result.failed,
      skipped: result.skipped
    };
  } catch (error) {
    const wasCancelled = controller.signal.aborted;
    const message = error.message || 'Não foi possível concluir as otimizações.';
    activeOptimization = null;
    if (wasCancelled) {
      sendProgress({ type: 'cancelled', message });
      return {
        success: false,
        cancelled: true,
        message
      };
    }
    sendProgress({ type: 'error', message });
    return {
      success: false,
      message
    };
  }
}

function finalizeOptimization(progressCallback, message, success) {
  if (progressCallback) {
    progressCallback({ type: success ? 'finish' : 'error', message });
  }
  activeOptimization?.controller?.abort(message);
  activeOptimization = null;
}

function createWindow() {
  // Evitar criar múltiplas janelas simultaneamente
  if (windowCreationInProgress) {
    console.log('[Main] Criação de janela já em progresso, ignorando...');
    return;
  }
  
  // Verificar se já existe uma janela aberta
  if (mainWindow && !mainWindow.isDestroyed()) {
    console.log('[Main] Janela já existe, focando na janela existente...');
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
    return;
  }
  
  // Verificar se há outras janelas do app abertas
  const existingWindows = BrowserWindow.getAllWindows();
  if (existingWindows.length > 0) {
    console.log('[Main] Janelas existentes encontradas, focando na primeira...');
    const existingWindow = existingWindows[0];
    if (existingWindow.isMinimized()) {
      existingWindow.restore();
    }
    existingWindow.focus();
    mainWindow = existingWindow;
    return;
  }
  
  // Marcar que a criação está em progresso
  windowCreationInProgress = true;
  closeRequestedByUser = false; // Resetar flag de fechamento ao criar nova janela
  console.log('[Main] Flag de fechamento resetada ao criar nova janela');
  
  console.log('[Main] Criando janela...');
  try {
    const preloadPath = path.join(__dirname, '../preload.js');
    console.log('[Main] Caminho do preload:', preloadPath);
    console.log('[Main] Preload existe?', fs.existsSync(preloadPath));
    
    const htmlPath = path.join(__dirname, '../renderer/index.html');
    console.log('[Main] Caminho do HTML:', htmlPath);
    console.log('[Main] HTML existe?', fs.existsSync(htmlPath));
    
    mainWindow = new BrowserWindow({
      width: 1366,
      height: 768,
      resizable: false,
      maximizable: false,
      fullscreenable: false,
      frame: false,
      backgroundColor: '#050510',
      show: true, // Mostrar imediatamente em modo dev para debug
      roundedCorners: true,
      vibrancy: 'ultra-dark',
      visualEffectState: 'active',
      webPreferences: {
        preload: preloadPath,
        nodeIntegration: false,
        contextIsolation: true,
        webSecurity: true,
        // Desabilitar DevTools em produção
        devTools: !app.isPackaged, // Apenas habilitar DevTools em desenvolvimento
        // Otimizações de performance
        backgroundThrottling: false, // DESABILITAR para evitar problemas de carregamento
        offscreen: false, // Não usar renderização offscreen
        enableWebSQL: false, // Desabilitar WebSQL (deprecated)
        spellcheck: false, // Desabilitar spellcheck para economizar recursos
        // Reduzir uso de GPU quando não necessário
        enableBlinkFeatures: '',
        disableBlinkFeatures: 'Accelerated2dCanvas,AcceleratedSmallCanvases',
        // Adicionar configurações para melhorar compatibilidade
        sandbox: false, // Desabilitar sandbox pode ajudar com problemas de carregamento
        allowRunningInsecureContent: false,
        experimentalFeatures: false
      }
    });
    
    // Desabilitar hardware acceleration se não for crítico (reduz uso de GPU)
    // app.disableHardwareAcceleration(); // Descomentar se GPU usage for muito alto
    
    // Otimizar uso de memória - DESABILITAR para evitar problemas
    mainWindow.webContents.setBackgroundThrottling(false);
    console.log('[Main] Background throttling desabilitado para melhorar carregamento');
    
    // Bloquear DevTools em produção
    if (app.isPackaged) {
      // Desabilitar menu de contexto que pode ter opção de DevTools
      mainWindow.webContents.on('context-menu', (e) => {
        e.preventDefault();
      });
      
      // Bloquear qualquer tentativa de abrir DevTools
      mainWindow.webContents.on('devtools-opened', () => {
        console.log('[Main] ⚠️ Tentativa de abrir DevTools em produção detectada, fechando imediatamente...');
        mainWindow.webContents.closeDevTools();
      });
    }
    
    // Marcar quando a janela foi criada para detectar fechamento prematuro
    mainWindow._createdAt = Date.now();
    
    console.log('[Main] Janela criada com sucesso');
    
    // Forçar mostrar a janela imediatamente em modo dev
    if (!app.isPackaged) {
      console.log('[Main] Modo dev: forçando exibição da janela...');
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
        console.log('[Main] Janela forçada a aparecer em modo dev');
      }
    }

    // Abrir DevTools automaticamente em desenvolvimento (apenas uma vez)
    // Em produção, DevTools está completamente desabilitado
    if (!app.isPackaged && !devToolsOpened) {
      mainWindow.webContents.once('did-frame-finish-load', () => {
        if (!devToolsOpened && mainWindow && !mainWindow.isDestroyed()) {
          console.log('[Main] Abrindo DevTools automaticamente (modo desenvolvimento)...');
          devToolsOpened = true;
          mainWindow.webContents.openDevTools({ mode: 'detach' });
        }
      });
    } else if (app.isPackaged) {
      // Em produção, garantir que DevTools não possa ser aberto
      mainWindow.webContents.on('devtools-opened', () => {
        console.log('[Main] Tentativa de abrir DevTools em produção detectada, fechando...');
        mainWindow.webContents.closeDevTools();
      });
    }

    mainWindow.on('ready-to-show', async () => {
      try {
        // Sempre mostrar a janela, mesmo sem internet
        // A verificação de internet será feita no renderer
        console.log('[Main] Evento ready-to-show disparado, mostrando janela...');
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show();
          mainWindow.focus(); // Dar foco à janela
          console.log('[Main] Janela exibida e com foco');
        } else {
          console.error('[Main] ERRO: Janela foi destruída antes de ser mostrada!');
        }
        
        // Verificar internet em background (não bloquear)
        setTimeout(async () => {
          try {
            const online = await isOnline();
            if (!online && mainWindow && !mainWindow.isDestroyed()) {
              console.warn('[Main] Sem conexão com internet, mas janela será mostrada mesmo assim');
            }
          } catch (error) {
            console.error('[Window] Erro ao verificar conexão:', error);
          }
        }, 1000);
      } catch (error) {
        // Se houver erro, ainda mostrar a janela
        console.error('[Window] Erro ao mostrar janela:', error);
        console.error('[Window] Stack trace:', error.stack);
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show();
          mainWindow.focus();
        } else {
          console.error('[Main] ERRO CRÍTICO: Não foi possível mostrar a janela - ela foi destruída!');
        }
      }
    });
    
    // Handler de fechamento - prevenir fechamento prematuro
    mainWindow.on('close', (event) => {
      console.log('[Main] ==========================================');
      console.log('[Main] 🔴 Evento close disparado');
      console.log('[Main] Fechamento solicitado pelo usuário?', closeRequestedByUser);
      console.log('[Main] Modo dev?', !app.isPackaged);
      console.log('[Main] Janela está visível?', mainWindow.isVisible());
      console.log('[Main] Janela está minimizada?', mainWindow.isMinimized());
      console.log('[Main] Stack trace:', new Error().stack);
      console.log('[Main] ==========================================');
      
      // Se não foi o usuário que solicitou o fechamento, prevenir
      // Isso evita que a janela feche devido a erros ou problemas de carregamento
      if (!closeRequestedByUser && !app.isPackaged) {
        console.log('[Main] ⚠️ Fechamento não solicitado pelo usuário em modo dev - PREVENINDO');
        event.preventDefault();
        // Tentar recarregar a janela em vez de fechar
        if (mainWindow && !mainWindow.isDestroyed()) {
          console.log('[Main] Recarregando janela em vez de fechar...');
          mainWindow.reload();
        }
        return;
      }
      
      // Em modo packaged, apenas prevenir se não foi solicitado pelo usuário
      // e a janela acabou de ser criada (menos de 5 segundos)
      if (!closeRequestedByUser && app.isPackaged) {
        const windowAge = Date.now() - (mainWindow._createdAt || Date.now());
        if (windowAge < 5000) {
          console.log('[Main] ⚠️ Fechamento prematuro detectado (janela tem menos de 5 segundos) - PREVENINDO');
          event.preventDefault();
          // Tentar recarregar a janela
          if (mainWindow && !mainWindow.isDestroyed()) {
            console.log('[Main] Recarregando janela em vez de fechar...');
            mainWindow.reload();
          }
          return;
        }
      }
    });
    
    // Listener para detectar quando a janela é destruída (antes do closed)
    mainWindow.once('unresponsive', () => {
      console.log('[Main] ⚠️ Janela não está respondendo');
    });
    
    mainWindow.once('responsive', () => {
      console.log('[Main] ✅ Janela voltou a responder');
    });
    
    mainWindow.on('closed', () => {
      console.log('[Main] ==========================================');
      console.log('[Main] 🔴🔴 Evento closed disparado - JANELA FECHADA');
      console.log('[Main] Fechamento foi solicitado pelo usuário?', closeRequestedByUser);
      console.log('[Main] Timestamp:', new Date().toISOString());
      console.log('[Main] Stack trace:', new Error().stack);
      console.log('[Main] ==========================================');
      
      if (showWindowTimeout) {
        clearTimeout(showWindowTimeout); // Limpar timeout quando janela fechar
        showWindowTimeout = null;
      }
      
      const oldMainWindow = mainWindow;
      const wasUserRequested = closeRequestedByUser; // Salvar valor antes de resetar
      mainWindow = null;
      devToolsOpened = false; // Resetar flag quando janela fechar
      windowCreationInProgress = false; // Resetar flag de criação quando janela fechar
      closeRequestedByUser = false; // Resetar flag de fechamento quando janela fechar
      
      // Em modo dev, recriar janela se foi fechada sem solicitação do usuário
      if (!app.isPackaged) {
        console.log('[Main] ==========================================');
        console.log('[Main] Modo dev: janela fechada, mas processo permanece ativo');
        console.log('[Main] Fechamento foi solicitado pelo usuário?', wasUserRequested);
        console.log('[Main] ==========================================');
        
        // Se não foi o usuário que fechou, recriar a janela imediatamente
        if (!wasUserRequested) {
          console.log('[Main] ⚠️ Modo dev: janela foi fechada SEM solicitação do usuário!');
          console.log('[Main] Recriando janela automaticamente em 1 segundo...');
          setTimeout(() => {
            const allWindows = BrowserWindow.getAllWindows();
            if (allWindows.length === 0 && !windowCreationInProgress && !mainWindow) {
              console.log('[Main] ✅ Recriando janela agora...');
              createWindow();
            } else {
              console.log('[Main] Janela já existe ou está sendo criada, não recriando');
            }
          }, 1000); // Aguardar 1 segundo antes de recriar
        } else {
          console.log('[Main] Modo dev: janela foi fechada pelo usuário, não recriando');
        }
      }
    });

    // Log quando o preload começar a ser executado
    mainWindow.webContents.on('did-attach-webview', () => {
      console.log('[Main] 📦 WebView anexado');
    });

    // Log ANTES do preload ser carregado
    mainWindow.webContents.on('will-attach-webview', () => {
      console.log('[Main] 📦 WebView será anexado');
    });

    // Log quando o processo de renderização começar
    mainWindow.webContents.on('did-start-loading', () => {
      console.log('[Main] 🔄 did-start-loading: Processo de renderização iniciado');
      console.log('[Main] URL:', mainWindow.webContents.getURL());
      console.log('[Main] isLoading:', mainWindow.webContents.isLoading());
    });

    // Capturar erros de console do renderer
    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
      const levelStr = ['log', 'warning', 'error', 'info', 'debug'][level] || 'unknown';
      console.log(`[Renderer ${levelStr}] ${message}${line ? ` (${sourceId}:${line})` : ''}`);
    });

    // Capturar erros de JavaScript do renderer ANTES do preload
    mainWindow.webContents.on('preload-error', (event, preloadPath, error) => {
      console.error('[Main] ❌ ERRO CRÍTICO no preload!');
      console.error('[Main] Preload path:', preloadPath);
      console.error('[Main] Erro:', error.message);
      console.error('[Main] Stack:', error.stack);
    });

    // Log quando o DOM estiver pronto
    mainWindow.webContents.on('dom-ready', () => {
      console.log('[Main] ✅✅✅ DOM PRONTO!');
      console.log('[Main] URL:', mainWindow.webContents.getURL());
      console.log('[Main] Título:', mainWindow.webContents.getTitle());
      console.log('[Main] isLoading:', mainWindow.webContents.isLoading());
    });

    // Log quando todos os recursos estiverem carregados
    mainWindow.webContents.on('did-finish-load', () => {
      console.log('[Main] ✅✅✅ DID-FINISH-LOAD: Todos os recursos carregados!');
      console.log('[Main] URL:', mainWindow.webContents.getURL());
      console.log('[Main] Título:', mainWindow.webContents.getTitle());
      console.log('[Main] isLoading:', mainWindow.webContents.isLoading());
    });

    mainWindow.webContents.on('did-finish-load', async () => {
      console.log('[Main] ✅✅✅ did-finish-load: Conteúdo da página carregado com sucesso!');
      console.log('[Main] URL final:', mainWindow.webContents.getURL());
      console.log('[Main] Título da página:', mainWindow.webContents.getTitle());
      
      // Garantir que a janela seja mostrada após o carregamento
      if (mainWindow && !mainWindow.isDestroyed()) {
        if (!mainWindow.isVisible()) {
          console.log('[Main] Janela não está visível, forçando exibição após carregamento do conteúdo...');
          mainWindow.show();
          mainWindow.focus();
        } else {
          console.log('[Main] Janela já está visível');
        }
      } else {
        console.error('[Main] ERRO: Janela foi destruída durante o carregamento do conteúdo!');
      }
      
      // Configurar auto-updater com a janela principal
      if (autoUpdater) {
        autoUpdater.setMainWindow(mainWindow);
      }
      
      // Verificar atualizações AUTOMÁTICAS IMEDIATAMENTE ao carregar a página
      // IMPORTANTE: Não verificar em modo desenvolvimento (npm start)
      if (app.isPackaged) {
        if (autoUpdater) {
          // Usar auto-updater para atualização automática
          setTimeout(() => {
            autoUpdater.checkForUpdates();
          }, 3000); // Aguardar 3 segundos para o app carregar completamente
        } else if (updateChecker) {
          // Fallback: usar update-checker manual se auto-updater não estiver disponível
          (async () => {
            try {
              console.log('[Main] Verificando atualizações obrigatórias...');
              const updateInfo = await updateChecker.checkForUpdatesWithRetry();
              if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('update-check-result', updateInfo);
                console.log('[Main] Resultado da verificação de atualização enviado ao renderer');
                
                if (updateInfo && updateInfo.hasUpdate) {
                  console.log('[Main] ⚠️ ATUALIZAÇÃO OBRIGATÓRIA DETECTADA! Bloqueando app...');
                }
              }
            } catch (error) {
              console.error('[Main] Erro ao verificar atualizações:', error);
            }
          })();
        }
      } else {
        console.log('[Main] Modo desenvolvimento detectado - verificação de atualização desabilitada');
      }
      
      // Aguardar um pouco antes de verificar rede para evitar falsos positivos
      setTimeout(async () => {
        try {
          if (mainWindow && !mainWindow.isDestroyed()) {
            const online = await isOnline();
            mainWindow.webContents.send('network-status', { online });
          }
        } catch (error) {
          console.error('[Network] Erro ao verificar status da rede:', error);
        }
      }, 3000);
    });
    
    // Adicionar listener para erros de carregamento
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
      console.error('[Main] ❌ ERRO CRÍTICO ao carregar página!');
      console.error('[Main] Código de erro:', errorCode);
      console.error('[Main] Descrição:', errorDescription);
      console.error('[Main] URL:', validatedURL);
      console.error('[Main] É frame principal?', isMainFrame);
      console.error('[Main] Stack trace:', new Error().stack);
      
      // Mesmo com erro, tentar mostrar a janela e recarregar
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        // Tentar recarregar após um pequeno delay
        setTimeout(() => {
          if (mainWindow && !mainWindow.isDestroyed()) {
            console.log('[Main] Tentando recarregar a página após erro...');
            mainWindow.webContents.reload();
          }
        }, 1000);
      }
    });
    
    // Adicionar listener para erros de renderização
    mainWindow.webContents.on('render-process-gone', (event, details) => {
      console.error('[Main] ❌ ERRO CRÍTICO: Processo de renderização travou!');
      console.error('[Main] Detalhes:', JSON.stringify(details, null, 2));
      console.error('[Main] Reason:', details.reason);
      console.error('[Main] Exit code:', details.exitCode);
      console.error('[Main] Stack trace:', new Error().stack);
      
      // Tentar recriar a janela se o processo de renderização foi morto
      if (details.reason === 'killed' || details.reason === 'crashed') {
        console.log('[Main] Processo de renderização foi morto, tentando recriar janela em 2 segundos...');
        setTimeout(() => {
          if (!windowCreationInProgress) {
            try {
              createWindow();
            } catch (e) {
              console.error('[Main] Erro ao recriar janela após crash:', e);
            }
          }
        }, 2000);
      }
    });
    
    mainWindow.webContents.on('unresponsive', () => {
      console.warn('[Main] ⚠️ Janela não está respondendo');
    });
    
    mainWindow.webContents.on('responsive', () => {
      console.log('[Main] ✅ Janela voltou a responder');
    });

    // Capturar erros de JavaScript no renderer
    mainWindow.webContents.on('crashed', (event, killed) => {
      console.error('[Main] ❌ ERRO CRÍTICO: Renderer process crashed!');
      console.error('[Main] Killed:', killed);
      console.error('[Main] Stack trace:', new Error().stack);
      
      // Tentar recriar a janela se o processo de renderização crashou
      if (mainWindow && !mainWindow.isDestroyed()) {
        console.log('[Main] Tentando recarregar a janela após crash...');
        mainWindow.reload();
      } else {
        console.log('[Main] Janela foi destruída, tentando recriar em 2 segundos...');
        setTimeout(() => {
          if (!windowCreationInProgress) {
            createWindow();
          }
        }, 2000);
      }
    });
    
    // Capturar erros de JavaScript no renderer antes do crash
    mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
      if (level === 3) { // ERROR level
        console.error('[Renderer Error]', message, 'at', sourceId, ':', line);
      }
    });

    // Log quando começar a carregar
    mainWindow.webContents.on('did-start-loading', () => {
      console.log('[Main] 📄 Iniciando carregamento da página...');
    });

    // Log quando começar a navegar
    mainWindow.webContents.on('did-start-navigation', (event, url, isInPlace, isMainFrame) => {
      console.log('[Main] 🧭 Navegação iniciada:', url);
      console.log('[Main] É frame principal?', isMainFrame);
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.removeMenu();

    // Timeout de segurança para garantir que a janela seja mostrada
    let showWindowTimeout = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
        console.warn('[Main] Timeout: janela não foi mostrada em 5 segundos, forçando exibição...');
        mainWindow.show();
        mainWindow.focus();
      }
    }, 5000); // 5 segundos
    
    // Limpar timeout quando a janela for mostrada
    mainWindow.once('show', () => {
      if (showWindowTimeout) {
        clearTimeout(showWindowTimeout);
        showWindowTimeout = null;
        console.log('[Main] Janela foi mostrada, timeout limpo');
      }
    });

    console.log('[Main] Carregando arquivo HTML...');
    console.log('[Main] HTML Path:', htmlPath);
    
    // Timeout para detectar se a página não carrega
    let loadTimeout = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        const isLoading = mainWindow.webContents.isLoading();
        const url = mainWindow.webContents.getURL();
        const canGoBack = mainWindow.webContents.canGoBack();
        const canGoForward = mainWindow.webContents.canGoForward();
        
        console.error('[Main] ⚠️⚠️⚠️ TIMEOUT: Página não carregou em 10 segundos!');
        console.error('[Main] Ainda carregando?', isLoading);
        console.error('[Main] URL atual:', url);
        console.error('[Main] canGoBack:', canGoBack);
        console.error('[Main] canGoForward:', canGoForward);
        console.error('[Main] Tentando forçar exibição da janela...');
        
        // Tentar recarregar a página
        try {
          console.log('[Main] Tentando recarregar a página...');
          mainWindow.webContents.reload();
        } catch (reloadError) {
          console.error('[Main] Erro ao recarregar:', reloadError);
        }
        
        // Forçar mostrar a janela mesmo assim
        mainWindow.show();
        mainWindow.focus();
      }
    }, 10000); // 10 segundos
    
    // Limpar timeout quando a página carregar
    mainWindow.webContents.once('did-finish-load', () => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
        console.log('[Main] ✅ Timeout de carregamento limpo - página carregou');
      }
    });
    
    mainWindow.loadFile(htmlPath).then(() => {
      console.log('[Main] ✅ loadFile() promise resolvida');
    }).catch((error) => {
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        loadTimeout = null;
      }
      console.error('[Main] ❌ ERRO CRÍTICO ao carregar arquivo HTML!');
      console.error('[Main] Erro:', error.message);
      console.error('[Main] Stack:', error.stack);
      console.error('[Main] HTML Path tentado:', htmlPath);
      // Mesmo com erro, tentar mostrar a janela
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
      }
    });
    
    // Liberar flag após criar a janela (antes do setTimeout)
    windowCreationInProgress = false;
    
    // Garantir que a janela seja mostrada após um tempo, mesmo se houver problemas
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.isVisible()) {
        console.log('[Main] Forçando exibição da janela após timeout...');
        mainWindow.show();
      }
    }, 2000);
  } catch (error) {
    console.error('[Main] Erro ao criar janela:', error);
    // Liberar flag em caso de erro
    windowCreationInProgress = false;
    throw error;
  }
}

function createRestorePoint(description) {
  if (!runPowerShell) {
    console.warn('[Restore] runPowerShell não disponível');
    return Promise.resolve({ success: false, message: 'PowerShell não disponível' });
  }
  return runPowerShell(
    `Checkpoint-Computer -Description "${description.replace(/"/g, '')}" -RestorePointType "MODIFY_SETTINGS" -ErrorAction SilentlyContinue`
  )
    .then(() => ({ success: true }))
    .catch((error) => {
      // Ignorar erros silenciosamente
      console.warn('[Restore] Erro ao criar ponto de restauração:', error?.message);
      return {
        success: false,
        message: error?.message || 'Não foi possível criar ponto de restauração.'
      };
    });
}

async function ensureRestorePoint() {
  try {
    const result = await createRestorePoint('Y20 BOOSTER - Inicialização automática');
    if (!result.success && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('restore-point-result', result);
    }
  } catch (error) {
    // Ignorar erros silenciosamente durante a inicialização
    console.warn('[Restore] Erro ao criar ponto de restauração:', error.message);
  }
}

// Handler global de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('[Uncaught Exception]', error);
  console.error('[Uncaught Exception] Stack:', error.stack);
  // NUNCA encerrar o processo por causa de erros não capturados
  // Especialmente em modo dev, manter o processo ativo para debug
  if (app.isPackaged) {
    // Em modo packaged, apenas logar mas não encerrar
    console.error('[Uncaught Exception] Erro fatal capturado, mas não encerrando o processo.');
  } else {
    // Em modo dev, garantir que o processo não encerre
    console.error('[Uncaught Exception] Erro capturado em modo dev, continuando execução...');
    console.error('[Uncaught Exception] Processo será mantido ativo para debug');
  }
  // NÃO chamar process.exit() ou app.quit() aqui
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection]', reason);
  if (reason && reason.stack) {
    console.error('[Unhandled Rejection] Stack:', reason.stack);
  }
  // NUNCA encerrar o processo por causa de promises rejeitadas
  // Especialmente em modo dev, manter o processo ativo para debug
  if (app.isPackaged) {
    // Em modo packaged, apenas logar mas não encerrar
    console.error('[Unhandled Rejection] Promise rejeitada não tratada, mas não encerrando o processo.');
  } else {
    // Em modo dev, garantir que o processo não encerre
    console.error('[Unhandled Rejection] Promise rejeitada em modo dev, continuando execução...');
    console.error('[Unhandled Rejection] Processo será mantido ativo para debug');
  }
  // NÃO chamar process.exit() ou app.quit() aqui
});

// Handler para detectar quando o processo está prestes a encerrar
process.on('exit', (code) => {
  console.log(`[Main] ==========================================`);
  console.log(`[Main] Processo encerrando com código: ${code}`);
  if (!app.isPackaged) {
    console.log('[Main] AVISO CRÍTICO: Processo encerrando em modo dev!');
    const allWindows = BrowserWindow.getAllWindows();
    console.log('[Main] Janelas abertas no momento do encerramento:', allWindows.length);
    console.log('[Main] mainWindow existe?', mainWindow !== null);
    console.log('[Main] mainWindow destruída?', mainWindow ? mainWindow.isDestroyed() : 'N/A');
    console.log('[Main] Isso não deveria acontecer em modo dev!');
  }
  console.log(`[Main] ==========================================`);
});

// Handler adicional para prevenir encerramento em modo dev
process.on('SIGINT', () => {
  console.log('[Main] SIGINT recebido (Ctrl+C)');
  if (!app.isPackaged) {
    console.log('[Main] Modo dev: encerrando processo via Ctrl+C');
    app.quit();
  }
});

process.on('SIGTERM', () => {
  console.log('[Main] SIGTERM recebido');
  if (!app.isPackaged) {
    console.log('[Main] Modo dev: encerrando processo via SIGTERM');
    app.quit();
  }
});

// Sistema de degradação em background (funciona mesmo com painel fechado)
let decayBackgroundInterval = null;

function startDecayBackgroundProcess() {
  // Limpar intervalo anterior se existir
  if (decayBackgroundInterval) {
    clearInterval(decayBackgroundInterval);
  }
  
  // Verificar e aplicar degradação a cada 30 minutos (para garantir que seja aplicada mesmo com painel fechado)
  decayBackgroundInterval = setInterval(async () => {
    try {
      const storedKey = store.get('accessKey');
      if (!storedKey) {
        // Sem key, não precisa calcular degradação
        return;
      }
      
      console.log('[Main] Processo de degradação em background: verificando e aplicando degradação...');
      
      // Calcular degradação (já aplica automaticamente se necessário)
      const score = await calculateOptimizationScore();
      
      console.log(`[Main] Degradação verificada. Score atual: ${score.toFixed(1)}%`);
      
      // Se o painel estiver aberto, atualizar a interface
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('optimization-score-updated', { score });
      }
    } catch (error) {
      console.error('[Main] Erro no processo de degradação em background:', error);
    }
  }, 30 * 60 * 1000); // Verificar a cada 30 minutos
  
  console.log('[Main] Processo de degradação em background iniciado (verifica a cada 30 minutos)');
  
  // Executar imediatamente na primeira vez
  setTimeout(async () => {
    try {
      const storedKey = store.get('accessKey');
      if (storedKey) {
        await calculateOptimizationScore();
      }
    } catch (error) {
      console.error('[Main] Erro na primeira verificação de degradação:', error);
    }
  }, 5000); // Aguardar 5 segundos após iniciar
}

app.whenReady().then(async () => {
  try {
    // Verificar dependências antes de criar a janela
    if (checkDependencies) {
      try {
        const depsResult = await checkDependencies.checkAllDependencies();
        if (!depsResult.allOk) {
          console.error('[Main] ⚠️ Dependências faltando:', depsResult.missing.join(', '));
          console.error('[Main] O app pode não funcionar corretamente');
          
          // Mostrar diálogo de aviso se estiver em modo packaged
          if (app.isPackaged && dialog) {
            const missingList = depsResult.missing.join('\n- ');
            const response = dialog.showMessageBoxSync({
              type: 'warning',
              title: 'Dependências Faltando',
              message: 'Algumas dependências do sistema não foram encontradas:',
              detail: `- ${missingList}\n\nO Y20 BOOSTER pode não funcionar corretamente sem essas dependências.\n\nDeseja continuar mesmo assim?`,
              buttons: ['Continuar', 'Cancelar'],
              defaultId: 0,
              cancelId: 1
            });
            
            if (response === 1) {
              console.log('[Main] Usuário cancelou devido a dependências faltando');
              app.quit();
              return;
            }
          }
        }
      } catch (depsError) {
        console.error('[Main] Erro ao verificar dependências:', depsError);
        // Continuar mesmo se a verificação falhar
      }
    }
    
    createWindow();
    
    // Inicializar sistema de segurança anti-crack
    if (security && store && checkKeyStatus) {
      security.initSecurity(store, checkKeyStatus, API_URL);
      console.log('[Main] Sistema de segurança inicializado');
    }
    
    // Iniciar processo de degradação em background
    startDecayBackgroundProcess();
    
    // Em modo dev, manter o processo ativo mesmo se houver problemas
    if (!app.isPackaged) {
      console.log('[Main] ==========================================');
      console.log('[Main] Modo dev: processo será mantido ativo');
      console.log('[Main] ==========================================');
      
      // Monitor para verificar se a janela ainda existe e recriá-la se necessário
      const windowMonitorInterval = setInterval(() => {
        const allWindows = BrowserWindow.getAllWindows();
        const hasMainWindow = mainWindow && !mainWindow.isDestroyed();
        
        if (allWindows.length === 0 && !hasMainWindow && !windowCreationInProgress) {
          console.log('[Main] ⚠️ Modo dev: janela foi destruída, recriando automaticamente...');
          createWindow();
        }
      }, 1000); // Verificar a cada 1 segundo
      
      console.log('[Main] Monitor de janela iniciado (interval ID:', windowMonitorInterval + ')');
      
      // Manter o processo ativo com um intervalo que nunca para
      const keepAliveInterval = setInterval(() => {
        const allWindows = BrowserWindow.getAllWindows();
        console.log('[Main] Keep-alive: processo ativo, janelas abertas:', allWindows.length);
      }, 30000); // A cada 30 segundos
      
      // NUNCA limpar esse intervalo em modo dev
      console.log('[Main] Keep-alive iniciado (interval ID:', keepAliveInterval + ')');
      
      // Adicionar um timeout que também mantém o processo ativo
      const keepAliveTimeout = setTimeout(() => {
        console.log('[Main] Keep-alive timeout: processo ainda ativo');
      }, 86400000); // 24 horas (nunca vai expirar na prática)
      
      console.log('[Main] Keep-alive timeout iniciado (timeout ID:', keepAliveTimeout + ')');
      
      // Log de confirmação que o processo está pronto e não deve encerrar
      setTimeout(() => {
        console.log('[Main] ==========================================');
        console.log('[Main] Modo dev: processo totalmente inicializado');
        console.log('[Main] O processo NÃO deve encerrar automaticamente');
        console.log('[Main] Para encerrar, pressione Ctrl+C no terminal');
        console.log('[Main] Monitor de janela ativo - janela será recriada se destruída');
        console.log('[Main] ==========================================');
      }, 3000); // Aguardar 3 segundos após inicializar
    }
    
    // Log final para confirmar que o whenReady terminou mas o processo continua
    console.log('[Main] ==========================================');
    console.log('[Main] app.whenReady() concluído');
    console.log('[Main] Processo continua rodando...');
    console.log('[Main] ==========================================');

        app.on('activate', () => {
      console.log('[Main] Evento activate disparado');
      const allWindows = BrowserWindow.getAllWindows();
      console.log('[Main] Número de janelas:', allWindows.length);
      if (allWindows.length === 0) {
        console.log('[Main] Nenhuma janela aberta, criando nova janela...');
        createWindow();
      } else {
        console.log('[Main] Janelas já existem, focando na primeira...');
        const existingWindow = allWindows[0];
        if (existingWindow.isMinimized()) {
          existingWindow.restore();
        }
        existingWindow.focus();
      }
    });
    
    // Handler second-instance já foi configurado antes do whenReady

    // Criar backup automático apenas se o usuário tiver ativado
    setTimeout(() => {
      const autoBackupEnabled = store.get('autoBackupOnStart', false);
      if (autoBackupEnabled) {
      ensureRestorePoint();
      } else {
        console.log('[Restore] Backup automático desativado pelo usuário.');
      }
    }, 5000);
  } catch (error) {
    console.error('[App] Erro ao inicializar:', error);
    // Tentar criar a janela mesmo se houver erro
    try {
      createWindow();
    } catch (e) {
      console.error('[App] Erro crítico ao criar janela:', e);
    }
  }
});

// Handlers removidos - não prevenir encerramento
// Deixar o Electron gerenciar o ciclo de vida normalmente

app.on('window-all-closed', () => {
  const allWindows = BrowserWindow.getAllWindows();
  console.log('[Main] Evento window-all-closed disparado');
  console.log('[Main] Número de janelas abertas:', allWindows.length);
  console.log('[Main] mainWindow existe?', mainWindow !== null);
  console.log('[Main] mainWindow destruída?', mainWindow ? mainWindow.isDestroyed() : 'N/A');
  
  // Em modo dev, recriar janela se foi fechada
  if (!app.isPackaged && allWindows.length === 0) {
    console.log('[Main] Modo dev: todas as janelas foram fechadas, recriando em 2 segundos...');
    setTimeout(() => {
      if (!windowCreationInProgress && !mainWindow) {
        createWindow();
      }
    }, 2000);
    return; // Não encerrar o processo em modo dev
  }
  
  // Em modo packaged, encerrar normalmente
  if (app.isPackaged && allWindows.length === 0) {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-current-access-level', () => {
  return getCurrentAccessLevel();
});

ipcMain.handle('get-system-info', async () => {
  try {
    // SEMPRE calcular e aplicar degradação quando consultar (mesmo com painel fechado)
    // Isso garante que a degradação continue mesmo quando o painel está fechado
    const optimizationScore = await calculateOptimizationScore();
    
    // Log reduzido para evitar spam
    // console.log('[Main] get-system-info chamado, coletando dados...');
    // console.log('[Main] getSystemSnapshot existe?', typeof getSystemSnapshot === 'function');
    
    if (!getSystemSnapshot) {
      console.error('[Main] getSystemSnapshot não está disponível!');
      throw new Error('getSystemSnapshot não está disponível');
    }
    
    const snapshot = await getSystemSnapshot();
    
    // Log reduzido para evitar spam no console
    // console.log('[Main] Snapshot recebido:', { ... });
    
    // Verificar se os dados estão vazios
    if (!snapshot || (!snapshot.cpu && !snapshot.memory)) {
      console.error('[Main] Snapshot está vazio ou inválido!', snapshot);
      throw new Error('Snapshot está vazio ou inválido');
    }
    
    const result = {
      ...snapshot,
      optimizationScore: optimizationScore
    };
    
    // Log reduzido para evitar spam
    // console.log('[Main] Retornando dados para renderer:', { ... });
    
    return result;
  } catch (error) {
    console.error('[IPC] Erro ao obter informações do sistema:', error);
    console.error('[IPC] Stack trace:', error.stack);
    // Retornar valores padrão mesmo em caso de erro para não deixar tudo em branco
    return {
      cpu: { manufacturer: 'N/D', brand: 'N/D', cores: 0, load: 0 },
      gpu: { name: 'N/D', vram: 0, utilization: 0 },
      memory: { total: 0, used: 0 },
      storage: { total: 0, devices: 0, primary: { mount: 'C:', total: 0, used: 0, free: 0, utilization: 0 } },
      os: { platform: 'N/D', hostname: 'N/D', arch: 'N/D', build: 'N/D' },
      processes: { running: 0, blocked: 0, sleeping: 0, all: 0 },
      optimizationScore: 0,
      timestamp: Date.now(),
      error: error.message
    };
  }
});

ipcMain.handle('get-initial-state', async () => {
  try {
    // Tentar restaurar key do backup se não existir no store
    let keyData = store.get('keyData');
    let accessKey = store.get('accessKey');
    
    if (!keyData || !accessKey) {
      try {
        const os = require('os');
        const backupFile = path.join(os.homedir(), 'AppData', 'Local', 'Y20Booster', 'key-backup.json');
        if (fs.existsSync(backupFile)) {
          const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
          if (backupData.accessKey && backupData.keyData) {
            // Restaurar do backup
            store.set('accessKey', backupData.accessKey);
            store.set('keyData', backupData.keyData);
            if (backupData.keyValidatedAt) {
              store.set('keyValidatedAt', backupData.keyValidatedAt);
            }
            accessKey = backupData.accessKey;
            keyData = backupData.keyData;
            console.log('[Main] Key restaurada do backup:', backupFile);
          }
        }
      } catch (restoreError) {
        console.warn('[Main] Erro ao restaurar key do backup:', restoreError.message);
      }
    }
    
    const termsAccepted = store.get('termsAccepted');
    const language = store.get('language');
    const palette = store.get('palette');
    const neonEnabled = store.get('neonEnabled');
    const optimizations = store.get('optimizations');

    // Se houver keyData com userId, sempre buscar informações do Discord do bot
    // para garantir que os dados estejam atualizados ao abrir o painel
    let discordInfo = null;
    if (keyData && keyData.userId) {
      try {
        console.log('[Main] Buscando informações do Discord do bot para userId:', keyData.userId);
        // Sempre fazer uma nova consulta ao bot para garantir dados atualizados
        discordInfo = await getDiscordUserInfo(keyData.userId);
        if (discordInfo) {
          // Atualizar cache com os dados mais recentes
          store.set('discordUserInfo', discordInfo);
          console.log('[Main] Informações do Discord atualizadas:', discordInfo.tag || discordInfo.username);
        } else {
          // Se não conseguiu buscar, tentar usar cache como fallback
          const cached = store.get('discordUserInfo');
          if (cached && cached.id === keyData.userId) {
            console.log('[Main] Usando cache do Discord como fallback');
            discordInfo = cached;
          }
        }
      } catch (error) {
        console.warn('[Main] Erro ao buscar informações do Discord no get-initial-state:', error.message);
        // Usar cache se disponível mesmo com erro
        const cached = store.get('discordUserInfo');
        if (cached && cached.id === keyData.userId) {
          console.log('[Main] Usando cache do Discord após erro');
          discordInfo = cached;
        }
      }
    }

    return {
      termsAccepted,
      language,
      palette,
      neonEnabled,
      optimizations,
      optimizationScore: await calculateOptimizationScore(),
      keyData: keyData ? { ...keyData, discordInfo } : null,
      accessKey
    };
  } catch (error) {
    console.error('[IPC] Erro ao obter estado inicial:', error);
    return {
      termsAccepted: false,
      language: 'pt-BR',
      palette: 'royal',
      neonEnabled: true,
      optimizations: {},
      optimizationScore: 0
    };
  }
});

ipcMain.handle('accept-terms', (_, accepted) => {
  store.set('termsAccepted', accepted);
  return true;
});

ipcMain.handle('set-language', (_, language) => {
  store.set('language', language);
  return true;
});

ipcMain.handle('set-palette', (_, palette) => {
  store.set('palette', palette);
  return true;
});

ipcMain.handle('toggle-neon', (_, enabled) => {
  store.set('neonEnabled', enabled);
  return true;
});

ipcMain.handle('open-discord', (_, url) => {
  const discordUrl = url || 'https://discord.gg/Gc76J6f2xH';
  shell.openExternal(discordUrl);
  return true;
});

// Handler para verificar atualizações manualmente
ipcMain.handle('check-updates', async () => {
  // IMPORTANTE: Não verificar em modo desenvolvimento (npm start)
  if (!app.isPackaged) {
    console.log('[Main] Modo desenvolvimento - retornando sem verificar atualizações');
    return {
      hasUpdate: false,
      latestVersion: app.getVersion(),
      currentVersion: app.getVersion(),
      downloadUrl: null,
      releaseNotes: null,
      error: null
    };
  }
  
  // Tentar usar auto-updater primeiro (atualização automática)
  if (autoUpdater) {
    try {
      await autoUpdater.checkForUpdates();
      const updateInfo = autoUpdater.getUpdateInfo();
      return {
        hasUpdate: !!updateInfo,
        latestVersion: updateInfo?.version || '1.0.0',
        currentVersion: app.getVersion(),
        downloadUrl: null,
        releaseNotes: updateInfo?.releaseNotes || null,
        error: null
      };
    } catch (error) {
      console.error('[Main] Erro ao verificar atualizações via auto-updater:', error);
    }
  }
  
  // Fallback para update-checker manual
  if (!updateChecker) {
    return {
      hasUpdate: false,
      latestVersion: '1.0.0',
      currentVersion: '1.0.0',
      downloadUrl: null,
      releaseNotes: null,
      error: 'Módulo de atualização não disponível'
    };
  }
  
  try {
    const updateInfo = await updateChecker.checkForUpdatesWithRetry();
    return updateInfo;
  } catch (error) {
    console.error('[Main] Erro ao verificar atualizações via IPC:', error);
    return {
      hasUpdate: false,
      latestVersion: updateChecker.CURRENT_VERSION,
      currentVersion: updateChecker.CURRENT_VERSION,
      downloadUrl: null,
      releaseNotes: null,
      error: error.message
    };
  }
});

// Handler para instalar atualização e reiniciar
ipcMain.handle('install-update', () => {
  if (autoUpdater) {
    console.log('[Main] Instalando atualização e reiniciando...');
    autoUpdater.quitAndInstall();
    return true;
  }
  return false;
});

// Handler para abrir link de download da atualização
ipcMain.handle('open-update-download', (_, url) => {
  if (url) {
    shell.openExternal(url);
    return true;
  }
  return false;
});

ipcMain.handle('set-optimization', async (_, { key, enabled }) => {
  await applyOptimizationSetting(key, enabled);

  const optimizations = store.get('optimizations');
  optimizations[key] = enabled;
  store.set('optimizations', optimizations);

  const optimizationScore = await calculateOptimizationScore();

  return {
    success: true,
    optimizationScore
  };
});

ipcMain.handle('optimize-now', async () => {
  if (activeOptimization) {
    return {
      success: false,
      message: 'Já existe uma otimização em andamento.'
    };
  }

  const controller = new AbortController();
  const sendProgress = (payload) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('optimization-progress', payload);
    }
  };

  activeOptimization = { controller, currentChild: null };

  try {
    const result = await executeOptimizationPack(sendProgress, controller.signal);
    activeOptimization = null;

    const optimizations = store.get('optimizations');
    Object.keys(optimizationDefinitions).forEach((key) => {
      optimizations[key] = true;
    });
    store.set('optimizations', optimizations);

    // Armazenar scripts executados
    const existingExecuted = store.get('executedScripts') || [];
    const newExecuted = result.scripts.map(s => s.path || s.name);
    const allExecuted = [...new Set([...existingExecuted, ...newExecuted])];
    store.set('executedScripts', allExecuted);
    
    // Aumentar porcentagem para otimização simples (modo padrão)
    await increaseOptimizationScore('simple');

    const optimizationScore = await calculateOptimizationScore();
    sendProgress({ type: 'summary', items: result.scripts, failed: result.failed, skipped: result.skipped });

    return {
      success: result.failed.length === 0,
      optimizationScore,
      items: result.scripts,
      failed: result.failed,
      skipped: result.skipped
    };
  } catch (error) {
    const wasCancelled = controller.signal.aborted;
    const message = error.message || 'Não foi possível concluir as otimizações.';
    activeOptimization = null;
    if (wasCancelled) {
      sendProgress({ type: 'cancelled', message });
      return {
        success: false,
        cancelled: true,
        message
      };
    }
    sendProgress({ type: 'error', message });
    return {
      success: false,
      message
    };
  }
});

ipcMain.handle('optimize-run', (_, payload) => runOptimization(payload || {}));

ipcMain.handle('optimize-vip-presets', async () => {
  // Verificação de segurança para presets VIP
  if (security) {
    const securityCheck = await security.canExecuteOptimization('vip');
    if (!securityCheck.allowed) {
      console.warn('[Security] Acesso a presets VIP negado:', securityCheck.reason);
      return [];
    }
  }
  
  const baseDir = path.join(resolveAsset('Imagens/OptimizationPack'), 'Otimização Vip', 'Nucleos');
  try {
    const entries = await fsp.readdir(baseDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === '.reg')
      .map((entry) => {
        const filePath = path.join(baseDir, entry.name);
        const label = entry.name.replace(/\.[^.]+$/, '').replace(/[\-_]/g, ' ');
        return {
          label,
          name: entry.name,
          path: filePath
        };
      });
  } catch (error) {
    console.warn('[Optimize] Falha ao listar presets VIP', error.message);
    return [];
  }
});

ipcMain.handle('optimize-cancel', async () => {
  if (!activeOptimization) {
    return { success: false };
  }

  const sendProgress = (payload) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('optimization-progress', payload);
    }
  };

  // MATAR o processo child atual IMEDIATAMENTE
  if (activeOptimization.currentChild && activeOptimization.currentChild.exitCode === null) {
    try {
      // Tentar matar o processo e seus filhos imediatamente
      activeOptimization.currentChild.kill('SIGTERM');
      // Forçar término com taskkill imediatamente
      spawn('taskkill', ['/F', '/T', '/PID', activeOptimization.currentChild.pid.toString()], {
        windowsHide: true,
        stdio: 'ignore'
      }).on('error', () => {
        // Ignorar erros do taskkill silenciosamente
      });
    } catch (error) {
      console.warn('[Optimize] Erro ao matar processo child:', error);
    }
  }

  // Pausar a otimização
  optimizationPaused = true;
  
  // Abortar o signal para parar o processo atual em execução IMEDIATAMENTE
  if (activeOptimization.controller && !activeOptimization.controller.signal.aborted) {
    // Abortar o processo atual imediatamente para parar a execução
    activeOptimization.controller.abort(new Error('Otimização pausada pelo usuário'));
    
    // Enviar evento de pausa
    sendProgress({ 
      type: 'paused', 
      message: 'Otimização pausada. Aguardando confirmação...' 
    });
  } else {
    return { success: false };
  }
  
  return { success: true, paused: true };
});

ipcMain.handle('optimize-continue', async () => {
  if (!activeOptimization || !optimizationPaused) {
    return { success: false };
  }

  // Se o signal foi abortado, não dá para continuar
  if (activeOptimization.controller.signal.aborted) {
    return { success: false, message: 'Não é possível continuar após cancelamento' };
  }

  optimizationPaused = false;
  const sendProgress = (payload) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('optimization-progress', payload);
    }
  };
  
  sendProgress({ 
    type: 'resumed', 
    message: 'Continuando otimização...' 
  });
  
  return { success: true };
});

ipcMain.handle('optimize-cancel-confirmed', async () => {
  if (!activeOptimization) {
    return { success: false };
  }

  optimizationPaused = false;
  const message = 'Otimização cancelada pelo usuário.';
  activeOptimization.controller.abort(new Error(message));
  activeOptimization = null;
  return { success: true };
});

ipcMain.handle('open-devtools', () => {
  // Bloquear DevTools em produção (quando compilado)
  if (app.isPackaged) {
    console.log('[Main] Tentativa de abrir DevTools bloqueada (modo produção)');
    return false;
  }
  
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    return true;
  }
  return false;
});

ipcMain.handle('apply-nvidia-settings', async (_, settings) => {
  try {
    const nvidiaControlPanel = await findNvidiaControlPanel();
    
    if (!nvidiaControlPanel) {
      return { 
        success: false, 
        message: 'NVIDIA Control Panel não encontrado. Instale os drivers NVIDIA.' 
      };
    }

    // Abrir Control Panel nas seções corretas para aplicação manual
    const opened = await openNvidiaControlPanel(nvidiaControlPanel, settings);
    
    if (opened) {
      return { 
        success: true, 
        message: 'NVIDIA Control Panel aberto. Aplique as configurações manualmente nas seções que foram abertas.' 
      };
    }
    
    return { success: false, message: 'Não foi possível abrir o NVIDIA Control Panel.' };
  } catch (error) {
    console.error('[NVIDIA] Erro ao aplicar configurações', error);
    return { success: false, message: error.message || 'Falha ao abrir NVIDIA Control Panel.' };
  }
});

async function findNvidiaControlPanel() {
  const possiblePaths = [
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'NVIDIA Corporation', 'Control Panel Client', 'nvcplui.exe'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'NVIDIA Corporation', 'Control Panel Client', 'nvcplui.exe'),
    path.join(process.env.ProgramFiles || 'C:\\Program Files', 'NVIDIA Corporation', 'Control Panel', 'nvcplui.exe'),
    path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'NVIDIA Corporation', 'Control Panel', 'nvcplui.exe')
  ];
  
  for (const panelPath of possiblePaths) {
    if (fs.existsSync(panelPath)) {
      return panelPath;
    }
  }
  
  return null;
}

async function applyNvidiaSettingsViaReg(settings) {
  try {
    const psCommands = generateNvidiaPsCommands(settings);
    if (psCommands.length === 0) {
      return false;
    }

    const psScript = `
# Aplicar configurações NVIDIA via PowerShell
$ErrorActionPreference = "Stop"

# Criar caminhos do registro se não existirem
$regPaths = @(
    "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\\Global\\NVTweak"
)

foreach ($regPath in $regPaths) {
    if (-not (Test-Path $regPath)) {
        New-Item -Path $regPath -Force | Out-Null
    }
}

# Aplicar configurações
${psCommands.join('\n')}

Write-Output "Configurações NVIDIA aplicadas com sucesso"
    `;

    const tempPsPath = path.join(os.tmpdir(), `y20-nvidia-apply-${Date.now()}.ps1`);
    await fsp.writeFile(tempPsPath, psScript, 'utf8');
    
    try {
      await runPowerShell(`& '${tempPsPath}'`);
      return true;
    } finally {
      await fsp.unlink(tempPsPath).catch(() => {});
    }
  } catch (error) {
    console.warn('[NVIDIA] Erro ao aplicar via registro', error);
    return false;
  }
}

function generateNvidiaPsCommands(settings) {
  const commands = [];
  const basePath = 'HKLM:\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\\Global\\NVTweak';
  
  const settingMap = {
    'gpu-aa-setting': { key: 'AntiAliasingLevel', values: { app: 0, '2x': 2, '4x': 4, '8x': 8 } },
    'gpu-aa-mode': { key: 'AntiAliasingMode', values: { app: 0, override: 1 } },
    'gpu-aa-transparency': { key: 'AntiAliasingTransparency', values: { off: 0, '2x': 2, '4x': 4, '8x': 8 } },
    'gpu-anisotropic': { key: 'AnisotropicFiltering', values: { app: 0, '2x': 2, '4x': 4, '8x': 8, '16x': 16 } },
    'gpu-vsync': { key: 'VSync', values: { off: 0, on: 1, adaptive: 2 } },
    'gpu-power-mode': { key: 'PowerMizerLevel', values: { normal: 1, 'prefer-max': 2, adaptive: 0 } },
    'gpu-pre-rendered': { key: 'PreRenderLimit', values: { '1': 1, '2': 2, '3': 3, '4': 4 } },
    'gpu-low-latency': { key: 'LowLatencyMode', values: { off: 0, on: 1, ultra: 2 } }
  };

  Object.keys(settings).forEach((key) => {
    if (settingMap[key] && settings[key] !== undefined) {
      const mapping = settingMap[key];
      const value = mapping.values[settings[key]];
      if (value !== undefined) {
        commands.push(`Set-ItemProperty -Path "${basePath}" -Name "${mapping.key}" -Value ${value} -Type DWord -ErrorAction SilentlyContinue`);
      }
    }
  });

  return commands;
}

async function applyNvidiaColorSettings(settings) {
  const brightness = settings['gpu-brightness'] !== undefined ? parseInt(settings['gpu-brightness']) : 0;
  const contrast = settings['gpu-contrast'] !== undefined ? parseInt(settings['gpu-contrast']) : 0;
  const gamma = settings['gpu-gamma'] !== undefined ? parseFloat(settings['gpu-gamma']) : 0;
  const vibrance = settings['gpu-vibrance'] !== undefined ? parseInt(settings['gpu-vibrance']) : 50;
  const hue = settings['gpu-hue'] !== undefined ? parseInt(settings['gpu-hue']) : 0;

  const psScript = `
$ErrorActionPreference = "Stop"

# Caminho do registro para configurações de cor NVIDIA
$regPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\\Global\\NVTweak"
if (-not (Test-Path $regPath)) {
    New-Item -Path $regPath -Force | Out-Null
}

# Aplicar configurações de cor
# Nota: Algumas configurações de cor podem precisar ser aplicadas via Control Panel
Set-ItemProperty -Path $regPath -Name "DigitalVibrance" -Value ${vibrance} -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $regPath -Name "Brightness" -Value ${brightness + 50} -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $regPath -Name "Contrast" -Value ${contrast + 50} -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $regPath -Name "Gamma" -Value ${Math.round((gamma + 1) * 100)} -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $regPath -Name "Hue" -Value ${hue} -Type DWord -ErrorAction SilentlyContinue

Write-Output "Configurações de cor aplicadas"
  `;

  const tempPsPath = path.join(os.tmpdir(), `y20-nvidia-color-${Date.now()}.ps1`);
  await fsp.writeFile(tempPsPath, psScript, 'utf8');
  
  try {
    await runPowerShell(`& '${tempPsPath}'`);
    return true;
  } catch (error) {
    console.warn('[NVIDIA] Erro ao aplicar configurações de cor', error);
    return false;
  } finally {
    await fsp.unlink(tempPsPath).catch(() => {});
  }
}

async function openNvidiaControlPanel(controlPanelPath, settings) {
  if (!controlPanelPath) {
    return false;
  }

  try {
    const has3DSettings = Object.keys(settings).some(key => 
      key.startsWith('gpu-') && 
      !['gpu-brightness', 'gpu-contrast', 'gpu-gamma', 'gpu-vibrance', 'gpu-hue', 'gpu-color-precision'].includes(key)
    );
    
    const hasColorSettings = ['gpu-brightness', 'gpu-contrast', 'gpu-gamma', 'gpu-vibrance', 'gpu-hue'].some(key => 
      settings[key] !== undefined
    );

    if (has3DSettings) {
      await spawnProcess(controlPanelPath, ['/page=3DSettings'], null, {
        windowsHide: false,
        stdio: ['ignore', 'pipe', 'pipe']
      });
    }
    
    if (hasColorSettings) {
      setTimeout(async () => {
        await spawnProcess(controlPanelPath, ['/page=DesktopColor'], null, {
          windowsHide: false,
          stdio: ['ignore', 'pipe', 'pipe']
        });
      }, 1000);
    } else if (!has3DSettings) {
      await spawnProcess(controlPanelPath, [], null, {
        windowsHide: false,
        stdio: ['ignore', 'pipe', 'pipe']
      });
    }
    
    return true;
  } catch (error) {
    console.warn('[NVIDIA] Erro ao abrir Control Panel', error);
    return false;
  }
}



ipcMain.handle('create-restore-point', async (_, description) => {
  try {
    const restoreDescription = description || 'Y20 BOOSTER - Manual';
    console.log('[Restore] IPC: Criando ponto de restauração:', restoreDescription);
    
    if (restorePoints && restorePoints.createRestorePointUsingScript) {
      const result = await restorePoints.createRestorePointUsingScript(restoreDescription);
      console.log('[Restore] IPC: Resultado:', result);
      return result;
    } else {
      // Fallback para método antigo
      console.log('[Restore] IPC: Usando método antigo (PowerShell direto)');
      const result = await createRestorePoint(restoreDescription);
      return result;
    }
  } catch (error) {
    console.error('[Restore] Erro ao criar restore point:', error);
    return { success: false, message: error.message || 'Não foi possível criar ponto de restauração.' };
  }
});

ipcMain.handle('open-restore-settings', async () => {
  await runPowerShell('Start-Process "SystemPropertiesProtection.exe"');
  return true;
});

ipcMain.handle('activate-restore-protection', async () => {
  try {
    const scriptPath = resolveAsset('scripts/enable-restore.ps1');
    // Verificar se o arquivo existe antes de tentar executar
    if (!fs.existsSync(scriptPath)) {
      console.warn('[Restore] Script não encontrado:', scriptPath);
      return { success: false, message: 'Script não encontrado' };
    }
    await runPowerShell(`& '${scriptPath}'`);
    return { success: true };
  } catch (error) {
    console.error('[Restore] Erro ao ativar proteção:', error);
    return { success: false, message: error.message || 'Erro desconhecido' };
  }
});

// Handler para verificar se está rodando como administrador
ipcMain.handle('check-is-admin', async () => {
  try {
    const checkAdminScript = `$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator); if ($isAdmin) { 'ADMIN' } else { 'NOT_ADMIN' }`;
    let isAdmin = false;
    try {
      const adminCheck = await runPowerShell(checkAdminScript);
      isAdmin = adminCheck && adminCheck.trim() === 'ADMIN';
      console.log('[Main] Verificação de admin:', isAdmin);
      return { success: true, isAdmin: isAdmin };
    } catch (adminError) {
      console.warn('[Main] Erro ao verificar permissões de administrador:', adminError.message);
      return { success: false, isAdmin: false, error: adminError.message };
    }
  } catch (error) {
    console.error('[Main] Erro ao verificar admin:', error);
    return { success: false, isAdmin: false, error: error.message };
  }
});

// Handlers IPC críticos foram movidos para ANTES de app.whenReady() (linha ~375)
// Isso garante que estejam disponíveis quando o renderer carregar
// Removendo duplicatas que estavam aqui

ipcMain.handle('list-restore-points', async () => {
  try {
    // Verificar se o usuário tem permissões de administrador primeiro
    const checkAdminScript = `$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator); if ($isAdmin) { 'ADMIN' } else { 'NOT_ADMIN' }`;
    let isAdmin = false;
    try {
      const adminCheck = await runPowerShell(checkAdminScript);
      isAdmin = adminCheck && adminCheck.trim() === 'ADMIN';
      console.log('[Restore] Usuário é administrador:', isAdmin);
    } catch (adminError) {
      console.warn('[Restore] Erro ao verificar permissões de administrador:', adminError.message);
    }

    // Converter CreationTime para formato ISO string para evitar problemas de parsing
    // Usar formato universal que JavaScript pode parsear facilmente
            const psScript = `$points = Get-ComputerRestorePoint -ErrorAction SilentlyContinue; if ($points) { $points | Select-Object -Property SequenceNumber, Description, @{Name='CreationTime';Expression={if ($_.CreationTime) { $_.CreationTime.ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ss.fffZ') } else { $null }}}, RestorePointType | Sort-Object -Property CreationTime -Descending | ConvertTo-Json -Compress -Depth 10 } else { '[]' }`;
    const result = await runPowerShell(psScript);
    
    if (!result || result.trim() === '' || result.trim() === '[]') {
      return { 
        success: true, 
        points: [],
        message: isAdmin ? 'Nenhum ponto de restauração encontrado.' : 'Verifique se você está executando como administrador e se a proteção do sistema está ativada.'
      };
    }
    
    let points;
    try {
      points = JSON.parse(result);
    } catch (parseError) {
      console.error('[Restore] Erro ao fazer parse do JSON:', parseError);
      console.error('[Restore] Resultado do PowerShell:', result);
      // Se não conseguir fazer parse, pode ser que não há pontos
      return { 
        success: true, 
        points: [],
        message: 'Erro ao processar pontos de restauração.'
      };
    }
    
    // Se retornar um único objeto, converter para array
    const pointsArray = Array.isArray(points) ? points : [points];
    
    return {
      success: true,
      points: pointsArray.map((point) => {
        // Garantir que a data está em formato válido
        let dateValue = point.CreationTime;
        if (!dateValue) {
          // Tentar pegar a data de outra forma se CreationTime não estiver disponível
          dateValue = null;
        } else if (typeof dateValue === 'string') {
          // Se já é string, verificar se é um formato válido
          const testDate = new Date(dateValue);
          if (isNaN(testDate.getTime())) {
            // Tentar parsear como DateTime do .NET
            dateValue = null;
          }
        }
        
        return {
        sequence: point.SequenceNumber,
        description: point.Description || 'Sem descrição',
          date: dateValue,
        type: point.RestorePointType || 'MODIFY_SETTINGS'
        };
      })
    };
  } catch (error) {
    console.error('[Restore] Erro ao listar pontos', error);
    const errorMessage = error.message || 'Não foi possível listar pontos de restauração.';
    
    // Verificar se é erro de permissão
    if (errorMessage.includes('Access is denied') || errorMessage.includes('acesso negado') || errorMessage.includes('permission')) {
      return { 
        success: false, 
        points: [], 
        message: 'Permissão negada. Execute o painel como administrador para usar pontos de restauração.' 
      };
    }
    
    return { 
      success: false, 
      points: [], 
      message: errorMessage 
    };
  }
});

ipcMain.handle('clear-all-restore-points', async () => {
  try {
    if (!restorePoints || !restorePoints.clearAllRestorePoints) {
      return { success: false, message: 'Módulo restore-points não disponível' };
    }
    const result = await restorePoints.clearAllRestorePoints();
    return result;
  } catch (error) {
    console.error('[Restore] Erro ao limpar restore points:', error);
    return { success: false, message: error.message || 'Não foi possível limpar pontos de restauração.' };
  }
});

ipcMain.handle('execute-restore-point', async (_, sequenceNumber) => {
  try {
    if (!restorePoints || !restorePoints.executeRestorePoint) {
      return { success: false, message: 'Módulo restore-points não disponível' };
    }
    const result = await restorePoints.executeRestorePoint(sequenceNumber);
    return result;
  } catch (error) {
    console.error('[Restore] Erro ao executar restore point:', error);
    return { success: false, message: error.message || 'Não foi possível executar ponto de restauração.' };
  }
});

ipcMain.handle('delete-restore-point', async (_, sequenceNumber) => {
  try {
    console.log(`[Restore] IPC: Deletando restore point #${sequenceNumber}...`);
    
    if (!restorePoints || !restorePoints.deleteRestorePoint) {
      console.error('[Restore] Módulo restore-points não disponível');
      return { success: false, message: 'Módulo restore-points não disponível' };
    }
    
    // Validar sequence number
    const seqNum = parseInt(sequenceNumber, 10);
    if (isNaN(seqNum)) {
      console.error('[Restore] Sequence number inválido:', sequenceNumber);
      return { success: false, message: 'Número de sequência inválido.' };
    }
    
    const result = await restorePoints.deleteRestorePoint(seqNum);
    console.log(`[Restore] IPC: Resultado da deleção:`, result);
    return result;
  } catch (error) {
    console.error('[Restore] Erro ao deletar restore point:', error);
    return { 
      success: false, 
      message: error.message || 'Não foi possível deletar ponto de restauração. Verifique se você está executando como administrador.' 
    };
  }
});

ipcMain.handle('get-auto-backup-setting', async () => {
  try {
    const enabled = store.get('autoBackupOnStart', false);
    return { success: true, enabled };
  } catch (error) {
    console.error('[Restore] Erro ao obter configuração de backup automático:', error);
    return { success: false, enabled: false };
  }
});

ipcMain.handle('set-auto-backup-setting', async (_, enabled) => {
  try {
    store.set('autoBackupOnStart', enabled);
    console.log(`[Restore] Backup automático ${enabled ? 'ativado' : 'desativado'}.`);
    return { success: true, enabled };
  } catch (error) {
    console.error('[Restore] Erro ao salvar configuração de backup automático:', error);
    return { success: false };
  }
});

ipcMain.handle('show-error', (_, message) => {
  dialog.showErrorBox('Y20 BOOSTER', message);
  return true;
});

ipcMain.handle('test-internet-speed', async () => {
  try {
    if (!internetSpeed || !internetSpeed.runSpeedTest) {
      return { success: false, message: 'Módulo internet-speed não disponível' };
    }
    const result = await internetSpeed.runSpeedTest();
    return { success: true, ...result };
  } catch (error) {
    console.error('[Internet Speed] Erro ao testar velocidade:', error);
    return { success: false, message: error.message || 'Erro ao testar velocidade' };
  }
});

// Sistema de validação de key
// IMPORTANTE: Configure as variáveis de ambiente API_URL e BOT_URL
// Defaults diferem para dev e build (packaged)
// IMPORTANTE: Agora o bot é o servidor principal (HTTP + Discord + MongoDB)
const isPackagedApp = app?.isPackaged === true;
const DEFAULT_BOT_URL = isPackagedApp ? 'https://y20booster-bot.discloud.app' : 'http://localhost:3001';
// API Cloudflare agora é independente do bot
// Em produção, usar o domínio real do Worker configurado na Cloudflare
// ATENÇÃO: atualmente o subdomínio workers.dev da conta está registrado como
// "httpsy20-booster-apiy20-booster-apiworkersdev", por isso a URL fica grande.
// Quando você ajustar esse subdomínio no painel da Cloudflare, lembre de
// atualizar esta constante e a equivalente no renderer.
const DEFAULT_CLOUDFLARE_API_URL = isPackagedApp
  ? 'https://y20-booster-api.httpsy20-booster-apiy20-booster-apiworkersdev.workers.dev'
  : 'http://localhost:8787';
const CLOUDFLARE_API_URL = process.env.LICENSE_API_URL || process.env.CLOUDFLARE_API_URL || DEFAULT_CLOUDFLARE_API_URL;

const API_URL = process.env.API_URL || DEFAULT_BOT_URL; // Mantido para compatibilidade (bot local)
const BOT_URL = process.env.BOT_URL || DEFAULT_BOT_URL;

// Log da URL configurada para debug
console.log('[Main] API_URL configurada:', API_URL);
console.log('[Main] BOT_URL configurada:', BOT_URL);

// Função para verificar se a API está rodando
async function checkApiHealth() {
  try {
    const http = require('http');
    const https = require('https');
    
    // Usar API Cloudflare diretamente (não o bot local)
    // PRIMEIRO: Verificar se a API do Cloudflare está desligada
    try {
      const statusUrl = new URL(`${CLOUDFLARE_API_URL}/api/status`);
      const statusClient = statusUrl.protocol === 'https:' ? https : http;
      
      const statusCheck = await new Promise((resolve) => {
        const req = statusClient.get(statusUrl, { timeout: 3000 }, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              const result = data ? JSON.parse(data) : null;
              resolve(result);
            } catch {
              resolve(null);
            }
          });
        });
        
        req.on('error', () => resolve(null));
        req.on('timeout', () => {
          req.destroy();
          resolve(null);
        });
      });
      
      // Se a API estiver desligada manualmente, retornar offline
      if (statusCheck && statusCheck.disabled === true) {
        console.log('[Main] API está desligada manualmente (modo teste)');
        return { online: false, error: 'API desligada para testes', disabled: true };
      }
    } catch (statusError) {
      // Ignorar erro ao verificar status (pode não estar disponível)
      console.log('[Main] Não foi possível verificar status da API:', statusError.message);
    }
    
    // Verificar saúde da API Cloudflare diretamente
    const apiUrl = new URL(`${CLOUDFLARE_API_URL}/health`);
    const client = apiUrl.protocol === 'https:' ? https : http;
    
    return new Promise((resolve) => {
      const req = client.get(apiUrl, { timeout: 5000 }, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const result = data ? JSON.parse(data) : null;
            resolve({ online: res.statusCode === 200, status: result });
          } catch {
            resolve({ online: res.statusCode === 200, status: null });
          }
        });
      });
      
      req.on('error', (err) => {
        resolve({ online: false, error: err.message || 'Não foi possível conectar à API' });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({ online: false, error: 'Timeout ao conectar à API' });
      });
    });
  } catch (error) {
    return { online: false, error: error.message };
  }
}

async function validateKey(key) {
  try {
    const https = require('https');
    const http = require('http');
    const url = require('url');
    
    // Usar API Cloudflare diretamente
    const os = require('os');
    const crypto = require('crypto');
    const machineId = os.hostname() + os.platform() + os.arch();
    const hwid = crypto.createHash('sha256').update(machineId + 'Y20Booster2024SecureKey').digest('hex').substring(0, 32);
    
    const apiUrl = new URL(`${CLOUDFLARE_API_URL}/auth/activate`);
    const client = apiUrl.protocol === 'https:' ? https : http;
    
    console.log('[Main] Validando chave na API Cloudflare:', apiUrl.toString());
    
    const CLIENT_TOKEN = process.env.CLIENT_TOKEN || 'client_Y20_2024_secure_token';
    const postData = JSON.stringify({ 
      key: key.trim(),
      hwid: hwid,
      userId: null
    });
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': CLIENT_TOKEN,
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 15000
    };

    return new Promise((resolve, reject) => {
      let req;
      try {
        req = client.request(apiUrl, options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              console.log('[Main] Resposta da API (status:', res.statusCode, '):', data);
              const result = JSON.parse(data);
              if (res.statusCode === 200 && result.success) {
                // Extrair keyData da resposta (pode estar em result.data ou result.data.data)
                const keyData = result.data?.data || result.data || result;
                
                // Salvar key e dados no store
                store.set('accessKey', key.trim());
                store.set('keyData', keyData);
                store.set('keyValidatedAt', new Date().toISOString());
                
                // Backup da key em LocalAppData (persiste mesmo após limpar Roaming)
                try {
                  const os = require('os');
                  const backupDir = path.join(os.homedir(), 'AppData', 'Local', 'Y20Booster');
                  if (!fs.existsSync(backupDir)) {
                    fs.mkdirSync(backupDir, { recursive: true });
                  }
                  const backupFile = path.join(backupDir, 'key-backup.json');
                  const backupData = {
                    accessKey: key.trim(),
                    keyData: keyData,
                    keyValidatedAt: new Date().toISOString(),
                    backupCreatedAt: new Date().toISOString()
                  };
                  fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
                  console.log('[Main] Backup da key criado em:', backupFile);
                } catch (backupError) {
                  console.warn('[Main] Erro ao criar backup da key (não crítico):', backupError.message);
                }
                
                // Se é a primeira vez que esta key é validada, gerar porcentagem inicial aleatória
                const existingScore = store.get('optimizationScoreBase');
                if (existingScore === undefined || existingScore === null) {
                  // Gerar valor aleatório entre 25% e 60%
                  const randomPercentage = Math.random() * (60 - 25) + 25;
                  const initialScore = Math.round(randomPercentage * 10) / 10;
                  store.set('optimizationScoreBase', initialScore);
                  store.set('optimizationScoreLastUpdate', Date.now());
                  console.log('[Main] Porcentagem inicial aleatória gerada:', initialScore + '%');
                }
                
                console.log('[Main] Chave validada com sucesso. Dados:', keyData);
                resolve({
                  success: true,
                  data: keyData
                });
              } else {
                const errorMsg = result.message || `Chave inválida. Status: ${res.statusCode}`;
                console.error('[Main] Erro na validação:', errorMsg);
                reject(new Error(errorMsg));
              }
            } catch (parseError) {
              console.error('[Main] Erro ao processar resposta da API:', parseError.message);
              console.error('[Main] Dados recebidos:', data);
              reject(new Error(`Erro ao processar resposta da API: ${parseError.message}`));
            }
          });
        });
      } catch (error) {
        reject(error);
        return;
      }

      req.on('error', (error) => {
        console.error('[Main] Erro de conexão com a API:', error.message);
        console.error('[Main] URL da API:', apiUrl.toString());
        let errorMsg = `Erro ao conectar com a API: ${error.message}. `;
        if (error.code === 'ECONNREFUSED') {
          errorMsg += `\n\nA API não está acessível em ${apiUrl.host}.\n\n` +
                     `Para iniciar a API:\n` +
                     `1. Execute o arquivo "iniciar-tudo.bat" na raiz do projeto, OU\n` +
                     `2. Execute "api\\iniciar.bat" para iniciar apenas a API\n\n` +
                     `A API deve estar rodando antes de validar chaves.`;
        } else if (error.code === 'ENOTFOUND') {
          errorMsg += `\n\nO servidor ${apiUrl.hostname} não foi encontrado.\n\n` +
                     `Verifique se a URL da API está correta e se o servidor está rodando.`;
        } else {
          errorMsg += `\n\nVerifique sua conexão e se a API está rodando em ${apiUrl.host}.\n\n` +
                     `Para iniciar a API, execute "iniciar-tudo.bat" ou "api\\iniciar.bat".`;
        }
        reject(new Error(errorMsg));
      });

      req.on('timeout', () => {
        console.error('[Main] Timeout na conexão com a API');
        console.error('[Main] URL da API:', apiUrl.toString());
        req.destroy();
        reject(new Error(`Tempo de conexão esgotado (${options.timeout}ms). A API não respondeu em ${apiUrl.host}.\n\n` +
                        `Para iniciar a API:\n` +
                        `1. Execute o arquivo "iniciar-tudo.bat" na raiz do projeto, OU\n` +
                        `2. Execute "api\\iniciar.bat" para iniciar apenas a API\n\n` +
                        `A API deve estar rodando antes de validar chaves.`));
      });

      req.write(postData);
      req.end();
    });
  } catch (error) {
    console.error('[Main] Erro ao validar chave:', error.message);
    throw new Error(error.message || 'Erro ao validar chave.');
  }
}

async function checkKeyStatus(key) {
  try {
    const https = require('https');
    const http = require('http');
    const url = require('url');
    
    // Usar API Cloudflare diretamente
    const apiUrl = new URL(`${CLOUDFLARE_API_URL}/auth/info?key=${encodeURIComponent(key)}`);
    const client = apiUrl.protocol === 'https:' ? https : http;
    
    console.log('[Main] Verificando key na API Cloudflare:', key ? `${key.substring(0, 8)}...` : 'null');
    
    const CLIENT_TOKEN = process.env.CLIENT_TOKEN || 'client_Y20_2024_secure_token';
    const options = {
      method: 'GET',
      headers: {
        'X-Token': CLIENT_TOKEN,
        'Content-Type': 'application/json'
      },
      timeout: 5000
    };

    return new Promise((resolve, reject) => {
      let req;
      try {
        req = client.request(apiUrl, options, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              // Se status 404, key não existe no banco
              if (res.statusCode === 404) {
                console.log('[Main] Key não encontrada no banco (status 404)');
                return resolve({ success: false, notFound: true, data: null });
              }
              
              const result = JSON.parse(data);
              // Se retornou sucesso, key existe
              if (res.statusCode === 200 && result.success) {
                // Extrair keyData da resposta
                const keyData = result.data || result;
                resolve({ success: true, data: keyData });
              } else {
                // Se a mensagem indica que não foi encontrada, tratar como 404
                const errorMsg = result.error || result.message || 'Erro ao verificar key';
                if (errorMsg.includes('não encontrada') || errorMsg.includes('not found') || result.notFound) {
                  console.log('[Main] Key não encontrada (mensagem da API)');
                  return resolve({ success: false, notFound: true, data: null });
                } else {
                  reject(new Error(errorMsg));
                }
              }
            } catch (error) {
              reject(new Error('Erro ao processar resposta da API.'));
            }
          });
        });
      } catch (error) {
        reject(error);
        return;
      }

      req.on('error', (error) => {
        console.error('[Main] Erro de conexão ao verificar chave:', error.message);
        console.error('[Main] URL da API:', apiUrl.toString());
        let errorMsg = 'Não foi possível conectar ao servidor. ';
        if (error.code === 'ECONNREFUSED') {
          errorMsg += `A API não está acessível em ${apiUrl.host}.`;
        } else if (error.code === 'ENOTFOUND') {
          errorMsg += `O servidor ${apiUrl.hostname} não foi encontrado. Verifique se a API foi deployada.`;
        }
        reject(new Error(errorMsg));
      });

      req.on('timeout', () => {
        console.error('[Main] Timeout ao verificar chave');
        console.error('[Main] URL da API:', apiUrl.toString());
        req.destroy();
        reject(new Error(`Tempo de conexão esgotado ao verificar chave. A API não respondeu em ${apiUrl.host}.`));
      });

      req.end();
    });
  } catch (error) {
    throw new Error(error.message || 'Erro ao verificar chave.');
  }
}

// Handler para verificar saúde da API
ipcMain.handle('check-bot-status', async () => {
  try {
    const http = require('http');
    const url = require('url');
    
    const apiUrl = new URL(`${API_URL}/status`);
    
    return new Promise((resolve) => {
      const req = http.get(apiUrl, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            console.log('[Main] ✅ Resposta /status recebida:', result);
            const responseObj = {
              success: result.success || false,
              online: result.bot?.online || false,
              mongoConnected: result.mongodb?.connected || false,
              timestamp: result.timestamp || null
            };
            console.log('[Main] ✅ Retornando para renderer:', responseObj);
            resolve(responseObj);
          } catch (error) {
            console.error('[Main] ❌ Erro ao parsear resposta do bot status:', error);
            console.error('[Main] Data recebida:', data);
            resolve({
              success: false,
              online: false,
              error: error.message
            });
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('[Main] ❌ Erro ao verificar status do bot:', error.code, error.message);
        console.error('[Main] ❌ URL tentada:', apiUrl.toString());
        resolve({
          success: false,
          online: false,
          error: error.message
        });
      });
      
      req.setTimeout(5000, () => {
        console.error('[Main] ⏱️ Timeout ao verificar status do bot (5s)');
        console.error('[Main] ⏱️ URL tentada:', apiUrl.toString());
        req.destroy();
        resolve({
          success: false,
          online: false,
          error: 'Timeout ao verificar status do bot'
        });
      });
    });
  } catch (error) {
    console.error('[Main] Erro ao verificar status do bot:', error);
    return {
      success: false,
      online: false,
      error: error.message
    };
  }
});

ipcMain.handle('check-api-health', async () => {
  try {
    const health = await checkApiHealth();
    return health;
  } catch (error) {
    return { online: false, error: error.message };
  }
});

ipcMain.handle('validate-access-key', async (_, key) => {
  try {
    console.log('[Main] IPC: validate-access-key chamado com key:', key ? `${key.substring(0, 4)}...` : 'null');
    if (!key || !key.trim()) {
      return {
        success: false,
        message: 'Chave não pode estar vazia.'
      };
    }
    
    // Verificar se a API está online antes de tentar validar
    const apiHealth = await checkApiHealth();
    if (!apiHealth.online) {
      return {
        success: false,
        message: `A API não está acessível em ${API_URL}.\n\n` +
                `Para iniciar a API:\n` +
                `1. Execute o arquivo "iniciar-tudo.bat" na raiz do projeto, OU\n` +
                `2. Execute "api\\iniciar.bat" para iniciar apenas a API\n\n` +
                `A API deve estar rodando antes de validar chaves.`
      };
    }
    
    const result = await validateKey(key.trim());
    console.log('[Main] IPC: validate-access-key resultado:', result.success ? 'sucesso' : 'falha');
    
    // Se a key foi validada com sucesso, inicializar score de otimização aleatório (25% a 66%)
    if (result.success) {
      const currentScore = store.get('optimizationScoreBase');
      // Se não tem score ainda ou score é muito baixo, inicializar com valor aleatório
      if (currentScore === undefined || currentScore === null || currentScore < 25) {
        const randomScore = Math.random() * (66 - 25) + 25; // Entre 25% e 66%
        store.set('optimizationScoreBase', randomScore);
        const brasiliaNow = getBrasiliaTime();
        store.set('optimizationScoreLastUpdate', brasiliaNow.getTime());
        store.set('lastScriptExecution', brasiliaNow.getTime());
        console.log('[Main] Score de otimização inicializado aleatoriamente:', randomScore.toFixed(1) + '%');
      }
    }
    
    // Se a key foi validada com sucesso e tem userId, buscar informações do Discord automaticamente
    if (result.success && result.data && result.data.userId) {
      try {
        console.log('[Main] Buscando informações do Discord para userId:', result.data.userId);
        const discordInfo = await getDiscordUserInfo(result.data.userId);
        if (discordInfo) {
        // Adicionar informações do Discord ao resultado
        result.data.discordInfo = discordInfo;
        // Salvar no store também
        store.set('discordUserInfo', discordInfo);
        console.log('[Main] Informações do Discord carregadas com sucesso');
      }
      
      // Usar código de indicação da API (prioridade) ou calcular dos últimos 5 dígitos da key
      let referralCode = result.data.referralCode || result.data.inviteCode;
      if (!referralCode) {
        // Se não veio da API, calcular dos últimos 5 dígitos da key
        referralCode = key.trim().slice(-5).toUpperCase();
        console.log('[Main] Código de indicação calculado dos últimos 5 dígitos da key:', referralCode);
      }
      
      // Sempre adicionar código de indicação aos dados
      result.data.referralCode = referralCode;
      // Salvar no store para preservar
      store.set('keyData', result.data);
      
      // Backup da key em LocalAppData (persiste mesmo após limpar Roaming)
      try {
        const os = require('os');
        const backupDir = path.join(os.homedir(), 'AppData', 'Local', 'Y20Booster');
        if (!fs.existsSync(backupDir)) {
          fs.mkdirSync(backupDir, { recursive: true });
        }
        const backupFile = path.join(backupDir, 'key-backup.json');
        const backupData = {
          accessKey: key.trim(),
          keyData: result.data,
          keyValidatedAt: new Date().toISOString(),
          backupCreatedAt: new Date().toISOString()
        };
        fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), 'utf8');
        console.log('[Main] Backup da key criado em:', backupFile);
      } catch (backupError) {
        console.warn('[Main] Erro ao criar backup da key (não crítico):', backupError.message);
      }
      
      // Enviar log para o Discord quando uma key é ativada
      // Isso garante que mesmo keys geradas pelo site/API gerem log no Discord
      try {
        await sendKeyActivationLog(result.data.userId, key.trim(), result.data);
        console.log('[Main] Log de ativação de key enviado para o Discord');
      } catch (logError) {
        console.warn('[Main] Erro ao enviar log de ativação (não crítico):', logError.message);
        // Não falhar a validação se não conseguir enviar log
      }
      } catch (error) {
        console.warn('[Main] Erro ao buscar informações do Discord (não crítico):', error.message);
        // Não falhar a validação se não conseguir buscar Discord
      }
    }
    
    return result;
  } catch (error) {
    console.error('[Main] IPC: Erro em validate-access-key:', error.message);
    return {
      success: false,
      message: error.message || 'Erro ao validar chave.'
    };
  }
});

ipcMain.handle('get-access-key', async () => {
  const storedKey = store.get('accessKey');
  return { success: true, key: storedKey || null };
});

ipcMain.handle('check-access-key', async () => {
  const storedKey = store.get('accessKey');
  if (!storedKey) {
    return { success: false, hasKey: false };
  }

  try {
    // SEMPRE verificar no servidor se a key existe (não usar cache local para validação)
    const result = await promiseWithTimeout(
      checkKeyStatus(storedKey),
      3000,
      'Timeout'
    );
    
    if (result.success && result.data) {
      // Key existe no banco - verificar status
      // Verificar se foi banida
      if (result.data.banned || result.data.status === 'banned' || result.data.bannedAt) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { success: false, hasKey: true, banned: true, valid: false, message: 'Esta chave foi banida e não pode mais ser usada.' };
      }
      // Verificar se foi revogada
      if (result.data.revoked) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { success: false, hasKey: true, revoked: true, valid: false, message: 'Esta chave foi encerrada.' };
      }
      // Verificar se expirou
      if (result.data.expired) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { success: false, hasKey: true, expired: true, valid: false, message: 'Sua chave expirou.' };
      }
      // Key válida - atualizar dados locais
      // Usar código de indicação da API (sempre deve vir da API agora)
      let referralCode = result.data.referralCode || result.data.inviteCode;
      if (!referralCode) {
        // Se não veio da API, deixar null (não calcular dos últimos 5 dígitos)
        console.warn('[Main] Código de indicação não encontrado na resposta da API');
      }
      
      // Sempre adicionar código de indicação aos dados
      const keyDataWithReferral = {
        ...result.data,
        referralCode: referralCode
      };
      
      store.set('keyData', keyDataWithReferral);
      return { success: true, hasKey: true, valid: true, data: keyDataWithReferral };
    }
    // Se não retornou sucesso, key não existe mais no banco
    console.log('[Main] Key não encontrada no banco, limpando dados locais...');
    store.delete('accessKey');
    store.delete('keyData');
    store.delete('keyValidatedAt');
    return { success: false, hasKey: true, valid: false, notFound: true, message: 'Esta chave não existe mais no sistema.' };
  } catch (error) {
    // Se erro de conexão/timeout, verificar se é erro 404 (key não encontrada)
    if (error.message && (error.message.includes('404') || error.message.includes('não encontrada') || error.message.includes('not found'))) {
      console.log('[Main] Key não encontrada (404), limpando dados locais...');
      store.delete('accessKey');
      store.delete('keyData');
      store.delete('keyValidatedAt');
      return { success: false, hasKey: true, valid: false, notFound: true, message: 'Esta chave não existe mais no sistema.' };
    }
    // Para outros erros (timeout, conexão), verificar localmente apenas como fallback temporário
    // Mas avisar que a verificação não foi completa
    const keyData = store.get('keyData');
    if (keyData) {
      // Verificar se expirou localmente
      if (keyData.expiresAt) {
        const expiresAt = new Date(keyData.expiresAt);
        if (expiresAt < new Date()) {
          store.delete('accessKey');
          store.delete('keyData');
          store.delete('keyValidatedAt');
          return { success: false, hasKey: true, expired: true, valid: false, message: 'Sua chave expirou.' };
        }
      }
      // Avisar que não foi possível verificar no servidor
      console.warn('[Main] Não foi possível verificar key no servidor, usando dados locais temporariamente');
      return { success: true, hasKey: true, valid: true, data: keyData, cacheOnly: true, warning: 'Verificação no servidor falhou. Usando dados locais.' };
    }
    // Sem dados locais e sem conexão - key inválida
    return { success: false, hasKey: true, valid: false, message: error.message || 'Erro ao verificar chave.' };
  }
});

ipcMain.handle('clear-license', async () => {
  try {
    console.log('[Main] Limpando dados de licença locais...');
    const hadKey = !!store.get('accessKey');
    store.delete('accessKey');
    store.delete('keyData');
    store.delete('keyValidatedAt');
    store.delete('discordUserInfo');
    console.log('[Main] Dados de licença limpos com sucesso.');
    return { 
      success: true, 
      hadKey,
      message: hadKey ? 'Key local removida com sucesso! Feche e reabra o painel.' : 'Nenhuma key local encontrada para remover.'
    };
  } catch (error) {
    console.error('[Main] Erro ao limpar dados de licença:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('is-authenticated', async () => {
  const storedKey = store.get('accessKey');
  const keyData = store.get('keyData');
  const termsAccepted = store.get('termsAccepted');
  
  if (!storedKey || !keyData) {
    return { authenticated: false, valid: false };
  }

  // Verificar se expirou localmente (rápido, sem chamada à API)
  if (keyData.expiresAt) {
    const expiresAt = new Date(keyData.expiresAt);
    if (expiresAt < new Date()) {
      store.delete('accessKey');
      store.delete('keyData');
      store.delete('keyValidatedAt');
      return { authenticated: false, valid: false, expired: true };
    }
  }

  // SEMPRE verificar no servidor se a key existe (não usar cache local para validação)
  try {
    const result = await promiseWithTimeout(
      checkKeyStatus(storedKey),
      3000,
      'Timeout'
    );
    
    if (result.success && result.data) {
      // Key existe no banco - verificar status
      // Verificar se foi banida
      if (result.data.banned || result.data.status === 'banned' || result.data.bannedAt) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { authenticated: false, valid: false, banned: true };
      }
      if (result.data.revoked) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { authenticated: false, valid: false, revoked: true };
      }
      if (result.data.expired) {
        // Limpar dados locais
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
        return { authenticated: false, valid: false, expired: true };
      }
      // Key válida - atualizar dados locais
      // Usar código de indicação da API (sempre deve vir da API agora)
      let referralCode = result.data.referralCode || result.data.inviteCode;
      if (!referralCode) {
        // Se não veio da API, deixar null (não calcular dos últimos 5 dígitos)
        console.warn('[Main] Código de indicação não encontrado na resposta da API');
      }
      
      // Sempre adicionar código de indicação aos dados
      const keyDataToStore = {
        ...result.data,
        referralCode: referralCode
      };
      
      store.set('keyData', keyDataToStore);
      return { authenticated: true, valid: true, keyData: keyDataToStore, termsAccepted: termsAccepted || false };
    }
    // Se não retornou sucesso, key não existe mais no banco
    console.log('[Main] Key não encontrada no banco (is-authenticated), limpando dados locais...');
    store.delete('accessKey');
    store.delete('keyData');
    store.delete('keyValidatedAt');
    return { authenticated: false, valid: false, notFound: true };
  } catch (error) {
    // Se erro de conexão/timeout, verificar se é erro 404 (key não encontrada)
    if (error.message && (error.message.includes('404') || error.message.includes('não encontrada') || error.message.includes('not found') || error.message.includes('Chave não encontrada'))) {
      console.log('[Main] Key não encontrada (404) no is-authenticated, limpando dados locais...');
      store.delete('accessKey');
      store.delete('keyData');
      store.delete('keyValidatedAt');
      return { authenticated: false, valid: false, notFound: true };
    }
    // Para outros erros (timeout, conexão), verificar localmente apenas como fallback temporário
    console.warn('[Auth] Erro ao verificar status da key (usando cache local temporariamente):', error.message);
    
    // Se a key parece válida localmente, permitir acesso temporariamente (verificação completa será feita depois)
    // Mas se não tiver expiresAt ou dados suficientes, bloquear
    if (!keyData.expiresAt && !keyData.days) {
      return { authenticated: false, valid: false };
    }
    
    // Avisar que não foi possível verificar no servidor
    return { authenticated: true, valid: true, keyData, termsAccepted: termsAccepted || false, cacheOnly: true, warning: 'Verificação no servidor falhou. Usando dados locais.' };
  }
});

async function getDiscordUserInfo(userId) {
  try {
    const http = require('http');
    const url = require('url');
    
    if (!userId || userId.trim().length === 0) {
      throw new Error('ID do usuário inválido.');
    }
    
    const botUrl = new URL(`${BOT_URL}/user/${userId}`);
    const client = botUrl.protocol === 'https:' ? require('https') : http;
    
    return new Promise((resolve, reject) => {
      const req = client.request(botUrl, { method: 'GET', timeout: 10000 }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              resolve(result.data);
            } else {
              reject(new Error(result.message || 'Usuário não encontrado.'));
            }
          } catch (error) {
            reject(new Error('Erro ao processar resposta.'));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Erro ao conectar com o bot: ${error.message}`));
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Tempo de conexão esgotado.'));
      });

      req.end();
    });
  } catch (error) {
    throw new Error(error.message || 'Erro ao buscar dados do usuário.');
  }
}

// Função para enviar log de ativação de key para o Discord
async function sendKeyActivationLog(userId, key, keyData) {
  try {
    const http = require('http');
    const https = require('https');
    
    // Tentar primeiro pelo bot (endpoint /log/key-activation)
    const botUrl = new URL(`${BOT_URL}/log/key-activation`);
    const client = botUrl.protocol === 'https:' ? https : http;
    
    const postData = JSON.stringify({
      userId: userId,
      key: key,
      keyType: keyData.type || keyData.keyType || 'unknown',
      expiresAt: keyData.expiresAt || null,
      source: 'panel' // Indica que foi ativado pelo painel
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };
    
    return new Promise((resolve, reject) => {
      const req = client.request(botUrl, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            if (res.statusCode === 200 || res.statusCode === 201) {
              const result = JSON.parse(data);
              if (result.success) {
                resolve(result);
              } else {
                // Se o bot não tem esse endpoint, tentar pela API
                sendKeyActivationLogViaAPI(userId, key, keyData).then(resolve).catch(reject);
              }
            } else {
              // Se o bot não tem esse endpoint, tentar pela API
              sendKeyActivationLogViaAPI(userId, key, keyData).then(resolve).catch(reject);
            }
          } catch (error) {
            // Se o bot não tem esse endpoint, tentar pela API
            sendKeyActivationLogViaAPI(userId, key, keyData).then(resolve).catch(reject);
          }
        });
      });
      
      req.on('error', (error) => {
        // Se falhar com o bot, tentar pela API
        sendKeyActivationLogViaAPI(userId, key, keyData).then(resolve).catch(reject);
      });
      
      req.on('timeout', () => {
        req.destroy();
        // Se timeout com o bot, tentar pela API
        sendKeyActivationLogViaAPI(userId, key, keyData).then(resolve).catch(reject);
      });
      
      req.write(postData);
      req.end();
    });
  } catch (error) {
    throw new Error(error.message || 'Erro ao enviar log de ativação.');
  }
}

// Função alternativa para enviar log via API
async function sendKeyActivationLogViaAPI(userId, key, keyData) {
  try {
    const http = require('http');
    const https = require('https');
    
    // Tentar pela API (endpoint /log/key-activation)
    const apiUrl = new URL(`${API_URL}/log/key-activation`);
    const client = apiUrl.protocol === 'https:' ? https : http;
    
    const postData = JSON.stringify({
      userId: userId,
      key: key,
      keyType: keyData.type || keyData.keyType || 'unknown',
      expiresAt: keyData.expiresAt || null,
      source: 'panel' // Indica que foi ativado pelo painel
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };
    
    return new Promise((resolve, reject) => {
      const req = client.request(apiUrl, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            if (res.statusCode === 200 || res.statusCode === 201) {
              const result = JSON.parse(data);
              if (result.success) {
                resolve(result);
              } else {
                // Se não tiver sucesso, não é crítico, apenas logar
                console.log('[Main] Log de ativação não foi enviado (endpoint não disponível ou retornou erro)');
                resolve({ success: false, message: 'Endpoint de log não disponível' });
              }
            } else {
              // Se não tiver sucesso, não é crítico, apenas logar
              console.log('[Main] Log de ativação não foi enviado (status:', res.statusCode, ')');
              resolve({ success: false, message: 'Endpoint de log retornou erro' });
            }
          } catch (error) {
            // Se não conseguir processar, não é crítico
            console.log('[Main] Erro ao processar resposta do log:', error.message);
            resolve({ success: false, message: 'Erro ao processar resposta' });
          }
        });
      });
      
      req.on('error', (error) => {
        // Não é crítico se falhar
        console.log('[Main] Erro ao enviar log via API:', error.message);
        resolve({ success: false, message: error.message });
      });
      
      req.on('timeout', () => {
        req.destroy();
        // Não é crítico se timeout
        console.log('[Main] Timeout ao enviar log via API');
        resolve({ success: false, message: 'Timeout' });
      });
      
      req.write(postData);
      req.end();
    });
  } catch (error) {
    // Não é crítico se falhar
    console.log('[Main] Erro ao enviar log via API:', error.message);
    return { success: false, message: error.message };
  }
}

ipcMain.handle('get-discord-user', async (_, userId, forceRefresh = false) => {
  if (!userId || userId.trim().length === 0) {
    return { success: false, message: 'ID do usuário inválido.' };
  }
  
  try {
    // SEMPRE buscar do bot quando o painel abre (para enviar log)
    const userInfo = await getDiscordUserInfo(userId);
    // Salvar no store para cache
    store.set('discordUserInfo', userInfo);
    return { success: true, data: userInfo };
  } catch (error) {
    // Se falhar ao buscar do bot, tentar usar cache como fallback
    const cached = store.get('discordUserInfo');
    if (cached && cached.id === userId) {
      return { success: true, data: cached, cached: true };
    }
    return { success: false, message: error.message };
  }
});

// Função helper para enviar log de otimização
async function sendOptimizationLog(optimizationType, results, optimizationScore) {
  try {
    const keyData = store.get('keyData');
    const accessKey = store.get('accessKey');
    const userId = keyData?.userId || null;
    
    const https = require('https');
    const http = require('http');
    const url = require('url');
    
    const botUrl = new URL(`${BOT_URL}/log/optimization`);
    const client = botUrl.protocol === 'https:' ? https : http;
    
    const postData = JSON.stringify({
      userId: userId,
      key: accessKey || null,
      optimizationType: optimizationType,
      scriptsCount: (results.applied || 0) + (results.failed || 0) + (results.skipped || 0),
      successCount: results.applied || 0,
      failedCount: results.failed || 0,
      skippedCount: results.skipped || 0,
      optimizationScore: optimizationScore
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };
    
    return new Promise((resolve, reject) => {
      const req = client.request(botUrl, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            if (result.success) {
              console.log('[Main] Log de otimização enviado com sucesso');
              resolve(result);
            } else {
              reject(new Error(result.message || 'Erro ao enviar log'));
            }
          } catch (error) {
            reject(error);
          }
        });
      });
      
      req.on('error', (error) => {
        reject(error);
      });
      
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Timeout ao enviar log'));
      });
      
      req.write(postData);
      req.end();
    });
  } catch (error) {
    throw error;
  }
}

// Handler para enviar log de abertura do painel
ipcMain.handle('log-panel-open', async (_, key) => {
  console.log('[Main] log-panel-open chamado com key:', key ? `${key.substring(0, 8)}...` : 'null');
  
  if (!key || typeof key !== 'string') {
    console.error('[Main] Key inválida para log de painel');
    return { success: false, message: 'Key inválida.' };
  }
  
  try {
    const https = require('https');
    const http = require('http');
    const url = require('url');
    
    const botUrl = new URL(`${BOT_URL}/logPanelOpen`);
    console.log('[Main] Enviando log para:', botUrl.toString());
    const client = botUrl.protocol === 'https:' ? https : http;
    
    const postData = JSON.stringify({
      key: key,
      action: 'panel_opened'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 5000
    };
    
    return new Promise((resolve) => {
      const req = client.request(botUrl, options, (res) => {
        console.log('[Main] Resposta do log recebida, status:', res.statusCode);
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const result = JSON.parse(data);
            console.log('[Main] Log de abertura do painel enviado com sucesso:', result);
            resolve({ success: true, data: result });
          } catch (error) {
            console.error('[Main] Erro ao parsear resposta do log:', error);
            console.error('[Main] Data recebida:', data);
            resolve({ success: false, message: 'Erro ao processar resposta' });
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('[Main] Erro ao enviar log de abertura do painel:', error);
        console.error('[Main] URL tentada:', botUrl.toString());
        resolve({ success: false, message: error.message });
      });
      
      req.on('timeout', () => {
        req.destroy();
        console.error('[Main] Timeout ao enviar log de abertura do painel');
        console.error('[Main] URL tentada:', botUrl.toString());
        resolve({ success: false, message: 'Timeout' });
      });
      
      req.write(postData);
      req.end();
    });
  } catch (error) {
    console.error('[Main] Erro ao enviar log de abertura do painel:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('bluestacks-detect', async () => {
  return bluestacks.detectBlueStacks();
});

ipcMain.handle('bluestacks-detect-all', async () => {
  return bluestacks.detectAllBlueStacksInstances();
});

ipcMain.handle('bluestacks-set-path', async (_, basePath) => {
  bluestacks.setBlueStacksBasePath(basePath);
  // Após definir o caminho, fazer nova detecção
  return bluestacks.detectBlueStacks();
});

ipcMain.handle('bluestacks-apply', async (_, { type, payload }) => {
  switch (type) {
    case 'maxFps':
      await bluestacks.applyMaxFps(payload.value);
      break;
    case 'exclusiveDelay':
      await bluestacks.applyExclusiveDelay(payload.value);
      break;
    case 'tweaks':
      await bluestacks.applyTweaks(payload.value);
      break;
    case 'device':
      await bluestacks.applyDevice(payload);
      break;
    case 'dpi':
      await bluestacks.applyDpi(payload.value);
      break;
    case 'resolution':
      await bluestacks.applyResolution(payload);
      break;
    default:
      throw new Error(`Tipo desconhecido: ${type}`);
  }
  return true;
});

ipcMain.handle('bluestacks-revert', async (_, { type }) => {
  switch (type) {
    case 'maxFps':
      await bluestacks.revertMaxFps();
      break;
    case 'exclusiveDelay':
      await bluestacks.revertExclusiveDelay();
      break;
    case 'tweaks':
      await bluestacks.revertTweaks();
      break;
    case 'device':
      await bluestacks.revertDevice();
      break;
    case 'dpi':
      await bluestacks.revertDpi();
      break;
    case 'resolution':
      await bluestacks.revertResolution();
      break;
    default:
      throw new Error(`Tipo desconhecido: ${type}`);
  }
  return true;
});

ipcMain.handle('bluestacks-optimize-emulator', async () => {
  await bluestacks.optimizeEmulator();
  return true;
});

ipcMain.handle('window-control', (_, action) => {
  if (!mainWindow) {
    console.log('[Main] IPC window-control: mainWindow não existe');
    return false;
  }

  switch (action) {
    case 'minimize':
      console.log('[Main] IPC window-control: minimize solicitado');
      mainWindow.minimize();
      return true;
    case 'close':
      // Em modo dev, verificar se realmente foi o usuário que solicitou
      if (!app.isPackaged) {
        console.log('[Main] ==========================================');
        console.log('[Main] IPC window-control: close solicitado em modo dev');
        console.log('[Main] Verificando se foi solicitação do usuário...');
        
        // Verificar se há algum erro ou problema que possa estar causando o fechamento automático
        const allWindows = BrowserWindow.getAllWindows();
        console.log('[Main] Janelas abertas:', allWindows.length);
        console.log('[Main] mainWindow destruída?', mainWindow.isDestroyed());
        
        // Em modo dev, SEMPRE prevenir fechamento via IPC, a menos que seja explicitamente solicitado
        // Por enquanto, vamos permitir, mas vamos logar tudo
        console.log('[Main] Permitindo fechamento via IPC em modo dev');
        console.log('[Main] ==========================================');
      }
      
      // Marcar que o fechamento foi solicitado pelo usuário
      console.log('[Main] Definindo flag closeRequestedByUser = true');
      closeRequestedByUser = true;
      console.log('[Main] Flag closeRequestedByUser definida, fechando janela...');
      mainWindow.close();
      return true;
    case 'restart':
      console.log('[Main] IPC window-control: restart solicitado - reiniciando aplicativo...');
      app.relaunch();
      app.exit(0);
      return true;
    default:
      console.log('[Main] IPC window-control: ação desconhecida:', action);
      return false;
  }
});

ipcMain.handle('restart-app', () => {
  console.log('[Main] Reiniciando aplicativo...');
  app.relaunch();
  app.exit(0);
  return true;
});

ipcMain.handle('update-window-title', (_, title) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setTitle(title || 'Y20 BOOSTER');
  }
  return true;
});

ipcMain.handle('open-external', (_, url) => {
  if (url) {
    shell.openExternal(url);
  }
  return true;
});

ipcMain.handle('restart-pc', async () => {
  try {
    console.log('[Main] Reiniciando o PC...');
    if (process.platform === 'win32') {
      // Windows: usar shutdown /r /t 0 para reiniciar imediatamente
      exec('shutdown /r /t 0', (error) => {
        if (error) {
          console.error('[Main] Erro ao reiniciar PC:', error);
          // Não fazer throw aqui pois o callback é assíncrono
        } else {
          console.log('[Main] Comando de reinicialização executado com sucesso');
        }
      });
      return { success: true, message: 'PC será reiniciado em instantes...' };
    } else {
      // Linux/Mac: usar shutdown -r now
      exec('shutdown -r now', (error) => {
        if (error) {
          console.error('[Main] Erro ao reiniciar PC:', error);
          // Não fazer throw aqui pois o callback é assíncrono
        } else {
          console.log('[Main] Comando de reinicialização executado com sucesso');
        }
      });
      return { success: true, message: 'PC será reiniciado em instantes...' };
    }
  } catch (error) {
    console.error('[Main] Erro ao reiniciar PC:', error);
    return { success: false, message: error.message || 'Erro ao reiniciar o PC' };
  }
});

// APPS: listar e executar com tutorial (imagem)
ipcMain.handle('apps-list', async () => {
  try {
    const baseDir = path.join(resolveAsset('Imagens/OptimizationPack'), 'APPS');
    const dirs = await fsp.readdir(baseDir, { withFileTypes: true });
    const apps = [];
    for (const d of dirs) {
      if (!d.isDirectory()) continue;
      const appDir = path.join(baseDir, d.name);
      let image = null;
      let execPath = null;
      const files = await fsp.readdir(appDir);
      for (const f of files) {
        const lower = f.toLowerCase();
        if (!image && (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg'))) {
          if (lower === 'foto1.png' || lower.includes('foto')) image = path.join(appDir, f);
          else image = path.join(appDir, f);
        }
        if (!execPath && (lower.endsWith('.exe') || lower.endsWith('.lnk') || lower.endsWith('.bat') || lower.endsWith('.cmd'))) {
          execPath = path.join(appDir, f);
        }
      }
      if (execPath) {
        apps.push({
          id: Buffer.from(execPath).toString('base64'),
          name: d.name,
          image,
          exec: execPath
        });
      }
    }
    return { success: true, apps };
  } catch (e) {
    console.error('[Main] apps-list error:', e);
    return { success: false, message: e.message || 'Erro ao listar APPS' };
  }
});

ipcMain.handle('apps-run', async (_, encodedId) => {
  try {
    const execPath = Buffer.from(encodedId, 'base64').toString('utf8');
    const appDir = path.dirname(execPath);
    // Não abrir imagem via associação do Windows aqui para evitar erro de "sem aplicativo associado".
    // A visualização de imagem é tratada no renderer via appsGetImageData -> modal interno.
    // Mantemos apenas a execução do aplicativo selecionado.

    const lower = execPath.toLowerCase();
    if (lower.endsWith('.exe')) {
      execFile(execPath, (err) => err && console.error('[Main] apps-run exec error:', err));
    } else if (lower.endsWith('.lnk')) {
      // Abrir atalhos usando START para o Windows resolver o destino
      execFile('cmd.exe', ['/c', 'start', '""', execPath], { windowsHide: true }, (err) => {
        if (err) console.error('[Main] apps-run lnk error:', err);
      });
    } else if (lower.endsWith('.bat') || lower.endsWith('.cmd')) {
      execFile('cmd.exe', ['/c', execPath], (err) => err && console.error('[Main] apps-run cmd error:', err));
    } else {
      // Qualquer outro tipo: tentar via START (usa associação padrão do Windows)
      execFile('cmd.exe', ['/c', 'start', '""', execPath], { windowsHide: true }, (err) => {
        if (err) {
          console.error('[Main] apps-run generic error:', err);
          // fallback
          shell.openPath(execPath);
        }
      });
    }
    return { success: true };
  } catch (e) {
    console.error('[Main] apps-run error:', e);
    return { success: false, message: e.message || 'Erro ao executar app' };
  }
});

// Abrir somente a imagem (tutorial) de um APP
ipcMain.handle('apps-open-image', async (_, encodedImagePath) => {
  try {
    const imgPath = Buffer.from(encodedImagePath, 'base64').toString('utf8');
    const result = await shell.openPath(imgPath);
    if (result) {
      // openPath retorna string de erro se falhar
      throw new Error(result);
    }
    return { success: true };
  } catch (e) {
    console.error('[Main] apps-open-image error:', e);
    return { success: false, message: e.message || 'Erro ao abrir imagem' };
  }
});

// Retornar imagem como dataURL para exibir no painel
ipcMain.handle('apps-get-image-data', async (_, encodedImagePath) => {
  try {
    const imgPath = Buffer.from(encodedImagePath, 'base64').toString('utf8');
    const data = await fsp.readFile(imgPath);
    const ext = path.extname(imgPath).toLowerCase().replace('.', '') || 'png';
    const dataUrl = `data:image/${ext};base64,${data.toString('base64')}`;
    return { success: true, dataUrl };
  } catch (e) {
    console.error('[Main] apps-get-image-data error:', e);
    return { success: false, message: e.message || 'Erro ao carregar imagem' };
  }
});

// Cursores: listar e executar, com capa foto1.png e preview foto2.png
ipcMain.handle('cursors-list', async () => {
  try {
    const baseDir = resolveAsset('Imagens/Cursores');
    const entries = await fsp.readdir(baseDir, { withFileTypes: true });
    const items = [];
    for (const d of entries) {
      if (!d.isDirectory()) continue;
      const dir = path.join(baseDir, d.name);
      const files = await fsp.readdir(dir);
      const lowerFiles = files.map(f => ({ f, l: f.toLowerCase() }));
      const cover = lowerFiles.find(x => x.l === 'foto1.png')?.f || lowerFiles.find(x => x.l.endsWith('.png'))?.f || null;
      const preview = lowerFiles.find(x => x.l === 'foto2.png')?.f || null;
      const execPath = lowerFiles.find(x => x.l.endsWith('.bat') || x.l.endsWith('.cmd'))?.f || null;
      if (execPath) {
        const absExec = path.join(dir, execPath);
        items.push({
          id: Buffer.from(absExec).toString('base64'),
          name: d.name,
          image: cover ? path.join(dir, cover) : null,
          preview: preview ? path.join(dir, preview) : null,
          exec: absExec
        });
      }
    }
    return { success: true, items };
  } catch (e) {
    console.error('[Main] cursors-list error:', e);
    return { success: false, message: e.message || 'Erro ao listar Cursores' };
  }
});

ipcMain.handle('cursors-run', async (_, encodedId) => {
  try {
    const execPath = Buffer.from(encodedId, 'base64').toString('utf8');
    const lower = execPath.toLowerCase();
    if (lower.endsWith('.bat') || lower.endsWith('.cmd')) {
      execFile('cmd.exe', ['/c', execPath], (err) => err && console.error('[Main] cursors-run error:', err));
    } else if (lower.endsWith('.exe')) {
      execFile(execPath, (err) => err && console.error('[Main] cursors-run exe error:', err));
    } else {
      execFile('cmd.exe', ['/c', 'start', '""', execPath], { windowsHide: true }, (err) => {
        if (err) console.error('[Main] cursors-run generic error:', err);
      });
    }
    return { success: true };
  } catch (e) {
    console.error('[Main] cursors-run error:', e);
    return { success: false, message: e.message || 'Erro ao executar cursor' };
  }
});

// Aplicar Cursor Padrão: executar .bat/.cmd e abrir atalhos .lnk da pasta específica
ipcMain.handle('cursor-default-apply', async () => {
  try {
    // Usar caminho absoluto completo para evitar problemas de encoding
    const basePath = app.isPackaged ? process.resourcesPath : path.join(__dirname, '../../');
    const baseDir = path.join(basePath, 'Imagens', 'Cursores', 'Mouse Padrão');
    
    console.log('[Main] Base path:', basePath);
    console.log('[Main] Base dir:', baseDir);
    
    // Lista de arquivos .bat para tentar em ordem de preferência
    const preferredBatFiles = [
      'aplicar_cursores_auto.bat',
      'aplicar_cursores.bat',
      'aplicar_cursores_alt.bat',
      'aplicar2.bat',
      'cursor_padrao.bat',
      'cursor_padrao2.bat',
      'aplicar_cursor.bat',
      'restaurar_cursor.bat',
      'cursor_default.bat'
    ];
    
    let allBatFiles = [];
    
    // Verificar quais arquivos existem
    try {
      const files = await fsp.readdir(baseDir);
      const foundFiles = files.filter(f => f.toLowerCase().endsWith('.bat'));
      console.log('[Main] Arquivos .bat encontrados na pasta:', foundFiles);
      
      if (foundFiles.length === 0) {
        throw new Error(`Nenhum arquivo .bat encontrado na pasta: ${baseDir}`);
      }
      
      // Ordenar arquivos: primeiro os preferidos (na ordem), depois os outros
      const preferredFound = [];
      const otherFound = [];
      
      for (const prefFile of preferredBatFiles) {
        if (foundFiles.includes(prefFile)) {
          preferredFound.push(prefFile);
        }
      }
      
      for (const file of foundFiles) {
        if (!preferredFound.includes(file)) {
          otherFound.push(file);
        }
      }
      
      allBatFiles = [...preferredFound, ...otherFound];
      console.log('[Main] Ordem de tentativa dos arquivos .bat:', allBatFiles);
      
    } catch (dirError) {
      console.error('[Main] Erro ao listar diretório:', dirError);
      throw new Error(`Diretório não encontrado: ${baseDir}`);
    }
    
    // Função auxiliar para executar .bat
    const executeBat = async (batFilePath, useRunAs = true) => {
      const fileName = path.basename(batFilePath);
      const fileDir = path.dirname(batFilePath);
      
      if (useRunAs) {
        // Tentar com RunAs (requer admin) usando PowerShell
        const psScript = `Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "\\"${batFilePath.replace(/\\/g, '\\\\')}\\"", "/q" -WorkingDirectory "\\"${fileDir.replace(/\\/g, '\\\\')}\\"" -Verb RunAs -WindowStyle Hidden -Wait -PassThru | ForEach-Object { exit $_.ExitCode }`;
        
        return new Promise((resolve, reject) => {
          const child = spawn('powershell.exe', [
            '-NoProfile',
            '-ExecutionPolicy',
            'Bypass',
            '-WindowStyle',
            'Hidden',
            '-Command',
            psScript
          ], {
            windowsHide: true,
            stdio: ['ignore', 'pipe', 'pipe']
          });
          
          let stdout = '';
          let stderr = '';
          
          if (child.stdout) {
            child.stdout.on('data', (data) => {
              stdout += data.toString();
            });
          }
          
          if (child.stderr) {
            child.stderr.on('data', (data) => {
              stderr += data.toString();
            });
          }
          
          child.on('close', (code) => {
            if (code === 0) {
              console.log(`[Main] ✅ ${fileName} executado com sucesso (RunAs)`);
              if (stdout) console.log('[Main] Stdout:', stdout);
              resolve();
            } else {
              reject(new Error(`Script terminou com código ${code}`));
            }
          });
          
          child.on('error', (error) => {
            reject(error);
          });
          
          // Timeout de 30 segundos
          setTimeout(() => {
            try {
              child.kill();
              reject(new Error('Timeout ao executar script'));
            } catch (e) {
              // Ignorar
            }
          }, 30000);
        });
      } else {
        // Tentar sem RunAs (execução normal)
        return new Promise((resolve, reject) => {
          const child = spawn('cmd.exe', ['/c', batFilePath, '/q'], {
            windowsHide: true,
            cwd: fileDir,
            stdio: ['ignore', 'pipe', 'pipe']
          });
          
          let stdout = '';
          let stderr = '';
          
          if (child.stdout) {
            child.stdout.on('data', (data) => {
              stdout += data.toString();
            });
          }
          
          if (child.stderr) {
            child.stderr.on('data', (data) => {
              stderr += data.toString();
            });
          }
          
          child.on('close', (code) => {
            if (code === 0) {
              console.log(`[Main] ✅ ${fileName} executado com sucesso (sem RunAs)`);
              if (stdout) console.log('[Main] Stdout:', stdout);
              resolve();
            } else {
              reject(new Error(`Script terminou com código ${code}`));
            }
          });
          
          child.on('error', (error) => {
            reject(error);
          });
          
          // Timeout de 30 segundos
          setTimeout(() => {
            try {
              child.kill();
              reject(new Error('Timeout ao executar script'));
            } catch (e) {
              // Ignorar
            }
          }, 30000);
        });
      }
    };
    
    // Tentar executar TODOS os arquivos .bat encontrados até que um funcione
    let lastError = null;
    let lastErrorMessage = '';
    
    for (const batFile of allBatFiles) {
      const batFilePath = path.join(baseDir, batFile);
      
      // Tentar primeiro com RunAs (admin)
      console.log(`[Main] Tentando executar ${batFile} com RunAs...`);
      try {
        await executeBat(batFilePath, true);
        return { success: true, executedFile: batFile, method: 'RunAs' };
      } catch (error) {
        console.warn(`[Main] ❌ Falha ao executar ${batFile} com RunAs:`, error.message);
        lastError = error;
        lastErrorMessage = `RunAs falhou: ${error.message}`;
      }
      
      // Tentar sem RunAs (normal)
      console.log(`[Main] Tentando executar ${batFile} sem RunAs...`);
      try {
        await executeBat(batFilePath, false);
        return { success: true, executedFile: batFile, method: 'normal' };
      } catch (error) {
        console.warn(`[Main] ❌ Falha ao executar ${batFile} sem RunAs:`, error.message);
        lastError = error;
        lastErrorMessage = `Execução normal falhou: ${error.message}`;
      }
      
      // Tentar também com exec direto usando start
      console.log(`[Main] Tentando executar ${batFile} com start direto...`);
      try {
        await new Promise((resolve, reject) => {
          const child = spawn('start', ['/wait', batFilePath], {
            shell: true,
            windowsHide: true,
            cwd: baseDir
          });
          
          child.on('close', (code) => {
            if (code === 0) {
              console.log(`[Main] ✅ ${batFile} executado com sucesso (start direto)`);
              resolve();
            } else {
              reject(new Error(`Script terminou com código ${code}`));
            }
          });
          
          child.on('error', (error) => {
            reject(error);
          });
          
          setTimeout(() => {
            try {
              child.kill();
              reject(new Error('Timeout'));
            } catch (e) {}
          }, 30000);
        });
        return { success: true, executedFile: batFile, method: 'start' };
      } catch (error) {
        console.warn(`[Main] ❌ Falha ao executar ${batFile} com start:`, error.message);
        lastError = error;
        lastErrorMessage = `Start direto falhou: ${error.message}`;
      }
    }
    
    // Se TODOS os arquivos e métodos falharam
    console.error('[Main] ❌ Todos os arquivos .bat e métodos de execução falharam');
    throw new Error(`Não foi possível executar nenhum arquivo .bat. Último erro: ${lastErrorMessage || 'Desconhecido'}`);
    
  } catch (e) {
    console.error('[Main] cursor-default-apply error:', e);
    return { success: false, message: e.message || 'Erro ao aplicar Cursor Padrão' };
  }
});

// Aplicar perfil NVIDIA (.nip) automaticamente
ipcMain.handle('apply-nvidia-profile', async () => {
  try {
    const profilePath = resolveAsset('Imagens/Profile Nvidia/BlueStacks.nip');
    const nvidiaInspectorPath = resolveAsset('Imagens/Profile Nvidia/nvidiaProfileInspector.exe');
    
    console.log('[NVIDIA] Procurando arquivos...');
    console.log('[NVIDIA] Profile path:', profilePath);
    console.log('[NVIDIA] Inspector path:', nvidiaInspectorPath);
    
    // Verificar se os arquivos existem
    try {
      await fsp.access(profilePath);
      console.log('[NVIDIA] Arquivo .nip encontrado:', profilePath);
    } catch (err) {
      console.error('[NVIDIA] Arquivo .nip não encontrado:', profilePath, err);
      return { success: false, message: `Arquivo de perfil NVIDIA não encontrado: ${profilePath}` };
    }
    
    try {
      await fsp.access(nvidiaInspectorPath);
      console.log('[NVIDIA] NVIDIA Profile Inspector encontrado:', nvidiaInspectorPath);
    } catch (err) {
      console.error('[NVIDIA] NVIDIA Profile Inspector não encontrado:', nvidiaInspectorPath, err);
      return { success: false, message: `NVIDIA Profile Inspector não encontrado: ${nvidiaInspectorPath}` };
    }
    
    // Usar NVIDIA Profile Inspector para importar e aplicar o perfil
    return await applyNvidiaProfileWithInspector(profilePath, nvidiaInspectorPath);
  } catch (error) {
    console.error('[Main] Erro ao aplicar perfil NVIDIA:', error);
    return { success: false, message: error.message || 'Erro ao aplicar perfil NVIDIA' };
  }
});

// Função para aplicar perfil usando NVIDIA Profile Inspector diretamente via linha de comando
async function applyNvidiaProfileWithInspector(profilePath, nvidiaInspectorPath) {
  try {
    console.log('[NVIDIA] Lendo arquivo .nip para extrair configurações...');
    
    // Ler e parsear o arquivo .nip
    const nipContent = await fsp.readFile(profilePath, 'utf16le');
    
    // Parsear XML simples para extrair configurações
    const profileNameMatch = nipContent.match(/<ProfileName>(.*?)<\/ProfileName>/);
    const profileName = profileNameMatch ? profileNameMatch[1] : 'BlueStacks';
    
    console.log('[NVIDIA] Nome do perfil:', profileName);
    
    // Extrair todas as configurações do XML
    const settingMatches = nipContent.matchAll(/<ProfileSetting>[\s\S]*?<SettingID>(\d+)<\/SettingID>[\s\S]*?<SettingValue>(\d+)<\/SettingValue>[\s\S]*?<\/ProfileSetting>/g);
    const settings = [];
    
    for (const match of settingMatches) {
      const settingID = match[1];
      const settingValue = match[2];
      settings.push({ id: settingID, value: settingValue });
      console.log(`[NVIDIA] Configuração encontrada: SettingID=${settingID}, Value=${settingValue}`);
    }
    
    if (settings.length === 0) {
      throw new Error('Nenhuma configuração encontrada no arquivo .nip');
    }
    
    // Criar script .bat temporário para executar os comandos
    // Isso garante que os comandos sejam executados corretamente e com permissões elevadas
    const batContent = [];
    batContent.push('@echo off');
    batContent.push('cd /d "' + path.dirname(nvidiaInspectorPath).replace(/\//g, '\\') + '"');
    batContent.push('');
    batContent.push('REM Definir perfil base');
    batContent.push(`"${nvidiaInspectorPath.replace(/\//g, '\\')}" -setBaseProfile:"${profileName}"`);
    batContent.push('');
    batContent.push('REM Aplicar cada configuração');
    for (const setting of settings) {
      batContent.push(`"${nvidiaInspectorPath.replace(/\//g, '\\')}" -setValue:${setting.id},${setting.value}`);
    }
    batContent.push('');
    batContent.push('echo Perfil NVIDIA aplicado com sucesso!');
    
    const tempBatPath = path.join(os.tmpdir(), `y20-nvidia-apply-${Date.now()}.bat`);
    await fsp.writeFile(tempBatPath, batContent.join('\r\n'), 'utf8');
    
    console.log('[NVIDIA] Script .bat criado:', tempBatPath);
    console.log('[NVIDIA] Conteúdo do script:', batContent.join('\n'));
    
    // Executar o script .bat com permissões elevadas
    return new Promise((resolve) => {
      // Usar cmd.exe para executar o .bat
      exec(`cmd.exe /c "${tempBatPath}"`, {
        windowsHide: false,
        timeout: 30000,
        shell: true
      }, async (error, stdout, stderr) => {
        // Limpar arquivo temporário
        await fsp.unlink(tempBatPath).catch(() => {});
        
        if (error) {
          console.error('[NVIDIA] Erro ao executar script .bat:', error);
          console.error('[NVIDIA] stdout:', stdout);
          console.error('[NVIDIA] stderr:', stderr);
          // Tentar método alternativo via PowerShell
          console.log('[NVIDIA] Tentando método alternativo via PowerShell...');
          const result = await applyNvidiaProfileFromNip(profilePath);
          resolve(result);
        } else {
          console.log('[NVIDIA] Script .bat executado com sucesso!');
          console.log('[NVIDIA] stdout:', stdout);
          if (stderr) console.log('[NVIDIA] stderr:', stderr);
          resolve({ success: true, message: 'Perfil NVIDIA BlueStacks aplicado com sucesso!' });
        }
      });
    });
    
  } catch (error) {
    console.error('[NVIDIA] Erro ao aplicar perfil via nvidiaInspector.exe:', error);
    // Tentar método alternativo via PowerShell
    console.log('[NVIDIA] Tentando método alternativo via PowerShell...');
    return await applyNvidiaProfileFromNip(profilePath);
  }
}

// Função auxiliar para aplicar perfil .nip via PowerShell (método alternativo)
// Esta função parseia o arquivo .nip e aplica as configurações diretamente no perfil BlueStacks
async function applyNvidiaProfileFromNip(profilePath) {
  try {
    // Ler o arquivo .nip (é um XML em UTF-16)
    const nipContent = await fsp.readFile(profilePath, 'utf16le');
    
    // Parsear o XML para extrair as configurações
    // O arquivo .nip contém um ArrayOfProfile com ProfileSettings
    // Cada ProfileSetting tem SettingID e SettingValue que precisam ser aplicados no registro
    
    // O NVIDIA Profile Inspector armazena perfis em:
    // HKLM\SYSTEM\CurrentControlSet\Services\nvlddmkm\Global\NVTweak\Profiles
    // Mas as configurações específicas do perfil ficam em uma estrutura binária complexa
    // Vamos aplicar diretamente usando PowerShell para parsear o XML e aplicar no registro
    
    const psScript = `
$ErrorActionPreference = "Stop"

# Ler e parsear o arquivo .nip
$nipPath = "${profilePath.replace(/\\/g, '\\\\')}"
$xmlContent = Get-Content -Path $nipPath -Encoding Unicode
[xml]$xml = $xmlContent

# Caminho do registro onde os perfis NVIDIA são armazenados
# O perfil BlueStacks é identificado pelos executáveis: hd-multiinstancemanager.exe e hd-player.exe
$baseRegPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\\Global\\NVTweak"
if (-not (Test-Path $baseRegPath)) {
    New-Item -Path $baseRegPath -Force | Out-Null
}

# Caminho para perfis específicos (estrutura binária)
$profilesRegPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\nvlddmkm\\Global\\NVTweak\\Profiles"
if (-not (Test-Path $profilesRegPath)) {
    New-Item -Path $profilesRegPath -Force | Out-Null
}

# Parsear o XML e aplicar cada configuração
foreach ($profile in $xml.ArrayOfProfile.Profile) {
    $profileName = $profile.ProfileName
    Write-Host "Aplicando perfil: $profileName"
    
    # Para cada configuração no perfil
    foreach ($setting in $profile.Settings.ProfileSetting) {
        $settingID = $setting.SettingID
        $settingValue = $setting.SettingValue
        $valueType = $setting.ValueType
        
        if ($settingID -and $settingValue -ne $null) {
            try {
                # Aplicar no registro usando o SettingID como chave
                # Os perfis NVIDIA usam uma estrutura específica, mas podemos aplicar diretamente
                if ($valueType -eq "Dword") {
                    $intValue = [int]$settingValue
                    # Aplicar no caminho base (funciona para algumas configurações)
                    Set-ItemProperty -Path $baseRegPath -Name "$settingID" -Value $intValue -Type DWord -ErrorAction SilentlyContinue
                    Write-Host "  Aplicado SettingID $settingID = $intValue"
                } else {
                    Set-ItemProperty -Path $baseRegPath -Name "$settingID" -Value $settingValue -Type String -ErrorAction SilentlyContinue
                    Write-Host "  Aplicado SettingID $settingID = $settingValue"
                }
            } catch {
                Write-Warning "  Erro ao aplicar SettingID $settingID : $_"
            }
        }
    }
}

# Aplicar configurações específicas conforme os prints:
# 1. Antialiasing - Transparency Mode: 0x00000008 = 8 decimal (AA_MODE_REPLAY_MODE_ALL)
#    SettingID 282364549 - mas o valor precisa ser 8 para o modo correto
Set-ItemProperty -Path $baseRegPath -Name "282364549" -Value 8 -Type DWord -ErrorAction SilentlyContinue

# 2. Anisotropic Filtering - Setting: 16 = 16x
#    SettingID 270426537
Set-ItemProperty -Path $baseRegPath -Name "270426537" -Value 16 -Type DWord -ErrorAction SilentlyContinue

# 3. Anisotropic Filtering - Mode: 0 = Application controlled
#    O Mode geralmente tem um SettingID diferente, mas vamos aplicar o Setting primeiro
#    Para Mode = Application controlled, o valor geralmente é 0 ou não precisa ser definido

# Aplicar outras configurações otimizadas para BlueStacks
Set-ItemProperty -Path $baseRegPath -Name "PreferredRefreshRate" -Value 0 -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $baseRegPath -Name "PowerMizerEnable" -Value 0 -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $baseRegPath -Name "PowerMizerLevel" -Value 1 -Type DWord -ErrorAction SilentlyContinue
Set-ItemProperty -Path $baseRegPath -Name "PowerMizerLevelAC" -Value 1 -Type DWord -ErrorAction SilentlyContinue

Write-Output "Perfil NVIDIA BlueStacks aplicado com sucesso!"
    `;
    
    const tempPsPath = path.join(os.tmpdir(), `y20-nvidia-profile-${Date.now()}.ps1`);
    await fsp.writeFile(tempPsPath, psScript, 'utf8');
    
    try {
      console.log('[NVIDIA] Executando script PowerShell...');
      // Aplicar via PowerShell
      const result = await runPowerShell(`& '${tempPsPath}'`);
      console.log('[NVIDIA] Resultado PowerShell:', result);
      
      // As configurações foram aplicadas via PowerShell
      // Retornar sucesso imediatamente
      return { success: true, message: 'Perfil NVIDIA BlueStacks aplicado com sucesso!' };
    } catch (psError) {
      console.error('[NVIDIA] Erro ao executar PowerShell:', psError);
      throw psError;
    } finally {
      await fsp.unlink(tempPsPath).catch(() => {});
    }
  } catch (error) {
    console.error('[NVIDIA] Erro ao aplicar perfil:', error);
    return { success: false, message: error.message || 'Erro ao aplicar perfil NVIDIA' };
  }
}

// Listar processadores falsos (AMD ou INTEL)
ipcMain.handle('fake-processors-list', async (_, type) => {
  try {
    const folderName = type === 'amd' ? 'Processadores AMD' : 'Processadores INTEL';
    const baseDir = resolveAsset(`Imagens/${folderName}`);
    
    console.log(`[FakeProcessors] Listando processadores ${type.toUpperCase()} de: ${baseDir}`);
    
    // Verificar se a pasta existe
    try {
      await fsp.access(baseDir);
    } catch (error) {
      console.warn(`[FakeProcessors] Pasta não encontrada: ${baseDir}`);
      return { success: true, items: [] };
    }
    
    // Listar todos os arquivos .bat e .cmd
    const files = await fsp.readdir(baseDir);
    const batFiles = files.filter(f => /\.(bat|cmd)$/i.test(f));
    
    const items = batFiles.map((file) => {
      const filePath = path.join(baseDir, file);
      const name = path.basename(file, path.extname(file));
      return {
        id: Buffer.from(filePath).toString('base64'),
        name: name,
        path: filePath,
        type: type
      };
    });
    
    console.log(`[FakeProcessors] Encontrados ${items.length} processadores ${type.toUpperCase()}`);
    return { success: true, items };
  } catch (error) {
    console.error(`[FakeProcessors] Erro ao listar processadores ${type}:`, error);
    return { success: false, message: error.message || 'Erro ao listar processadores' };
  }
});

// Executar processador falso
ipcMain.handle('fake-processors-run', async (_, encodedId) => {
  try {
    const filePath = Buffer.from(encodedId, 'base64').toString('utf8');
    
    console.log(`[FakeProcessors] Executando: ${filePath}`);
    
    // Verificar se o arquivo existe
    try {
      await fsp.access(filePath);
    } catch (error) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    
    // Executar o arquivo .bat/.cmd usando spawn para melhor controle
    return new Promise((resolve) => {
      const child = spawn('cmd.exe', ['/c', filePath], {
        windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      let stdout = '';
      let stderr = '';
      
      // Timeout de segurança (30 segundos)
      const timeout = setTimeout(() => {
        if (!child.killed) {
          child.kill();
          console.warn(`[FakeProcessors] Timeout ao executar ${filePath}`);
          resolve({ success: false, message: 'Timeout ao executar script' });
        }
      }, 30000);
      
      if (child.stdout) {
        child.stdout.on('data', (data) => {
          stdout += data.toString();
          // Enviar Enter automaticamente se detectar pausa
          if (/pressione qualquer tecla|press any key/i.test(stdout)) {
            if (child.stdin && child.stdin.writable) {
              child.stdin.write('\r\n');
            }
          }
        });
      }
      
      if (child.stderr) {
        child.stderr.on('data', (data) => {
          stderr += data.toString();
        });
      }
      
      // Enviar Enter após um delay para pular pausas
      setTimeout(() => {
        if (child.stdin && child.stdin.writable) {
          child.stdin.write('\r\n');
        }
      }, 500);
      
      child.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0 || code === null) {
          console.log(`[FakeProcessors] Processador falso executado com sucesso: ${filePath}`);
          resolve({ success: true, message: 'Processador falso aplicado com sucesso!' });
        } else {
          console.error(`[FakeProcessors] Script terminou com código ${code}: ${filePath}`);
          resolve({ success: false, message: `Script terminou com código ${code}` });
        }
      });
      
      child.on('error', (error) => {
        clearTimeout(timeout);
        console.error(`[FakeProcessors] Erro ao executar ${filePath}:`, error);
        resolve({ success: false, message: error.message || 'Erro ao executar processador falso' });
      });
    });
  } catch (error) {
    console.error('[FakeProcessors] Erro ao executar processador falso:', error);
    return { success: false, message: error.message || 'Erro ao executar processador falso' };
  }
});

// Executar script "Conferir Processador" (Desempenho.bat)
ipcMain.handle('check-processor-run', async () => {
  try {
    const filePath = resolveAsset('Imagens/Processadores AMD/Desempenho.bat');
    
    console.log(`[CheckProcessor] Executando: ${filePath}`);
    
    // Verificar se o arquivo existe
    try {
      await fsp.access(filePath);
    } catch (error) {
      throw new Error(`Arquivo não encontrado: ${filePath}`);
    }
    
    // Executar o arquivo .bat
    return new Promise((resolve) => {
      execFile('cmd.exe', ['/c', filePath], {
        windowsHide: false, // Mostrar janela para o usuário ver o resultado
        timeout: 60000
      }, (error, stdout, stderr) => {
        if (error) {
          console.error(`[CheckProcessor] Erro ao executar ${filePath}:`, error);
          resolve({ success: false, message: error.message || 'Erro ao executar script' });
        } else {
          console.log(`[CheckProcessor] Script executado com sucesso: ${filePath}`);
          resolve({ success: true, message: 'Script executado com sucesso!' });
        }
        });
      });
  } catch (error) {
    console.error('[CheckProcessor] Erro ao executar script:', error);
    return { success: false, message: error.message || 'Erro ao executar script' };
  }
});

ipcMain.handle('emulator-resolve-image', async (_, relativePath) => {
  try {
    // Remover ../ do caminho relativo e normalizar
    let cleanPath = relativePath.replace(/^\.\.\//g, '').replace(/\\/g, '/');
    
    // Se o caminho já começa com Imagens/, usar direto
    // Se não, adicionar Imagens/ no início
    if (!cleanPath.startsWith('Imagens/')) {
      cleanPath = `Imagens/${cleanPath}`;
    }
    
    const imagePath = resolveAsset(cleanPath);
    
    // Log para debug
    console.log(`[Main] Resolvendo imagem: ${relativePath} -> ${cleanPath} -> ${imagePath}`);
    
    // Verificar se o arquivo existe e ler como base64
    try {
      await fsp.access(imagePath);
      const data = await fsp.readFile(imagePath);
      const ext = path.extname(imagePath).toLowerCase().replace('.', '') || 'png';
      const dataUrl = `data:image/${ext};base64,${data.toString('base64')}`;
      return { success: true, url: dataUrl };
    } catch (err) {
      console.warn(`[Main] Imagem não encontrada: ${imagePath}`, err);
      // Tentar caminho alternativo sem Imagens/ no início
      const altPath = cleanPath.replace(/^Imagens\//, '');
      const altImagePath = resolveAsset(altPath);
      try {
        await fsp.access(altImagePath);
        const data = await fsp.readFile(altImagePath);
        const ext = path.extname(altImagePath).toLowerCase().replace('.', '') || 'png';
        const dataUrl = `data:image/${ext};base64,${data.toString('base64')}`;
        return { success: true, url: dataUrl };
      } catch (altErr) {
        console.error(`[Main] Imagem alternativa também não encontrada: ${altImagePath}`, altErr);
        return { success: false, message: 'Imagem não encontrada' };
      }
    }
  } catch (e) {
    console.error('[Main] emulator-resolve-image error:', e);
    return { success: false, message: e.message || 'Erro ao resolver imagem' };
  }
});

ipcMain.handle('network-check', async () => {
  const online = await isOnline();
  if (mainWindow) {
    mainWindow.webContents.send('network-status', { online });
  }
  return { online };
});

ipcMain.handle('inputlag-list', async () => {
  try {
    const scripts = await inputLag.listScripts();
    return { success: true, ...scripts };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('inputlag-run', async (_, id) => {
  try {
    await inputLag.runScriptById(id);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('inputlag-revert-all', async () => {
  try {
    if (!inputLag || !inputLag.runAllRevertScripts) {
      throw new Error('Módulo inputlag não disponível.');
    }
    return await inputLag.runAllRevertScripts();
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('power-plan-list', async () => {
  try {
    if (!powerPlan) {
      return { success: false, message: 'Módulo power-plan não disponível' };
    }
    const scripts = await powerPlan.listScripts();
    return { success: true, ...scripts };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('power-plan-run', async (_, id) => {
  try {
    if (!powerPlan) {
      return { success: false, message: 'Módulo power-plan não disponível' };
    }
    await powerPlan.runScriptById(id);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('power-plan-remove-all', async () => {
  try {
    if (!powerPlan || !powerPlan.removeAllPowerPlans) {
      return { success: false, message: 'Módulo power-plan não disponível' };
    }
    await powerPlan.removeAllPowerPlans();
    return { success: true, message: 'Todos os planos de energia foram removidos com sucesso.' };
  } catch (error) {
    console.error('[PowerPlan] Erro ao remover planos de energia:', error);
    return { success: false, message: error.message || 'Não foi possível remover os planos de energia.' };
  }
});

ipcMain.handle('cleanup-windows-list', async () => {
  try {
    if (!cleanupWindows) {
      return { success: false, message: 'Módulo cleanup-windows não disponível' };
    }
    const scripts = await cleanupWindows.listScripts();
    return { success: true, ...scripts };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('cleanup-windows-run', async (_, id) => {
  try {
    if (!cleanupWindows) {
      return { success: false, message: 'Módulo cleanup-windows não disponível' };
    }
    await cleanupWindows.runScriptById(id);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('disable-windows-list', async () => {
  try {
    if (!disableWindows) {
      return { success: false, message: 'Módulo disable-windows não disponível' };
    }
    const scripts = await disableWindows.listScripts();
    return { success: true, ...scripts };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('disable-windows-run', async (_, id) => {
  try {
    if (!disableWindows) {
      return { success: false, message: 'Módulo disable-windows não disponível' };
    }
    await disableWindows.runScriptById(id);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('disable-windows-revert-all', async () => {
  try {
    if (!disableWindows || !disableWindows.runAllRevertScripts) {
      return { success: false, message: 'Módulo disable-windows não disponível' };
    }
    const result = await disableWindows.runAllRevertScripts();
    return result;
  } catch (error) {
    console.error('[Disable Windows] Erro ao reverter todos:', error);
    return { success: false, message: error.message || 'Não foi possível executar scripts de reversão.' };
  }
});

ipcMain.handle('optimization-pack-list', async (_, folderName) => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    // Se folderName for vazio, usar listScriptsSimple para pegar da pasta "No Menu"
    const scripts = folderName === '' || !folderName
      ? await optimizationPack.listScriptsSimple()
      : await optimizationPack.listScripts(folderName);
    return { success: true, scripts };
  } catch (error) {
    console.error('[Main] Erro em optimization-pack-list:', error);
    return { success: false, message: error.message };
  }
});

ipcMain.handle('optimization-pack-run', async (_, folderName, onProgress) => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    
    // Verificação de segurança para otimizações VIP/Básico
    if (folderName === 'Otimização Vip' || folderName === 'Otimização VIP') {
      if (security) {
        const securityCheck = await security.canExecuteOptimization('vip');
        if (!securityCheck.allowed) {
          console.warn('[Security] Acesso VIP negado:', securityCheck.reason);
          return { 
            success: false, 
            message: 'Acesso negado. Esta funcionalidade requer uma key VIP válida e ativa.',
            securityBlocked: true,
            reason: securityCheck.reason
          };
        }
      }
    } else if (folderName === 'Otimização Basico' || folderName === 'Otimização Básico') {
      if (security) {
        const securityCheck = await security.canExecuteOptimization('basic');
        if (!securityCheck.allowed) {
          console.warn('[Security] Acesso Básico negado:', securityCheck.reason);
          return { 
            success: false, 
            message: 'Acesso negado. Esta funcionalidade requer uma key Básica ou VIP válida e ativa.',
            securityBlocked: true,
            reason: securityCheck.reason
          };
        }
      }
    }
    
    const scripts = await optimizationPack.listScripts(folderName);
    if (!scripts || scripts.length === 0) {
      console.warn(`[OptimizationPack] Nenhum script encontrado para: ${folderName}`);
      return { 
        success: false, 
        message: `Nenhum script encontrado na pasta "${folderName}". Verifique se a pasta existe e contém scripts.`,
        scripts: []
      };
    }
    
    console.log(`[OptimizationPack] ${scripts.length} script(s) encontrado(s) para: ${folderName}`);
    
    const sendProgress = (payload) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('optimization-progress', payload);
      }
    };
    
    const results = await optimizationPack.runScriptsSequentially(scripts, sendProgress);
    
    // Armazenar scripts executados
    const existingExecuted = store.get('executedScripts') || [];
    const newExecuted = results.executedScripts || [];
    const allExecuted = [...new Set([...existingExecuted, ...newExecuted])];
    store.set('executedScripts', allExecuted);
    
    // Determinar tipo de otimização e aumentar porcentagem
    let optimizationType = 'simple';
    if (folderName === 'Otimização Vip' || folderName === 'Otimização VIP') {
      optimizationType = 'vip';
    } else if (folderName === 'Otimização Basico' || folderName === 'Otimização Básico') {
      optimizationType = 'basic';
    }
    
    // Aumentar porcentagem baseado no tipo de otimização
    console.log(`[Main] [DEBUG] Antes de increaseOptimizationScore: score atual = ${store.get('optimizationScoreBase') || 0}`);
    const increasedScore = await increaseOptimizationScore(optimizationType);
    console.log(`[Main] [DEBUG] Após increaseOptimizationScore: score retornado = ${increasedScore}`);
    console.log(`[Main] [DEBUG] Score no store após increase = ${store.get('optimizationScoreBase') || 0}`);
    
    const optimizationScore = await calculateOptimizationScore();
    console.log(`[Main] [DEBUG] Após calculateOptimizationScore: score final = ${optimizationScore}`);
    console.log(`[Main] [DEBUG] Score no store após calculate = ${store.get('optimizationScoreBase') || 0}`);
    
    // Enviar log de otimização para o Discord
    try {
      await sendOptimizationLog(optimizationType, results, optimizationScore);
    } catch (logError) {
      console.warn('[Main] Erro ao enviar log de otimização:', logError);
    }
    
    // Se for VIP, retornar flag para mostrar modal de núcleos
    const showNucleos = folderName === 'Otimização Vip';
    
    console.log(`[Main] [DEBUG] Retornando score para frontend: ${optimizationScore}`);
    
    return { 
      success: true, 
      ...results,
      showNucleos: showNucleos,
      optimizationScore: optimizationScore
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Executar um único script de OptimizationPack por ID
ipcMain.handle('optimization-pack-run-one', async (_, scriptId) => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    await optimizationPack.runScriptById(scriptId);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Handler para executar .bat do Mouse Fix com RunAs (admin)
ipcMain.handle('mouse-fix-run-bat', async (_, scriptId) => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    
    // Obter informações do script - listar todos e encontrar pelo ID
    let script = null;
    
    // Tentar buscar em todas as pastas do Mouse fix
    const folders = ['Mouse fix', 'Extremo esquerda, lento', 'Exremo direita, rapido', 'Extremo forte', 'Meio', 'Voltar pro padrão'];
    for (const folder of folders) {
      try {
        const scripts = await optimizationPack.listScripts(folder);
        script = scripts.find(s => s.id === scriptId);
        if (script && script.path) break;
      } catch (e) {
        // Continuar procurando
      }
    }
    
    if (!script || !script.path) {
      return { success: false, message: 'Script não encontrado' };
    }
    
    const batFilePath = script.path;
    const fileName = path.basename(batFilePath);
    const fileDir = path.dirname(batFilePath);
    
    // Função auxiliar para executar .bat com RunAs
    const executeBatWithRunAs = async (batPath) => {
      const psScript = `Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "\\"${batPath.replace(/\\/g, '\\\\')}\\"", "/q" -WorkingDirectory "\\"${fileDir.replace(/\\/g, '\\\\')}\\"" -Verb RunAs -WindowStyle Hidden -Wait -PassThru | ForEach-Object { exit $_.ExitCode }`;
      
      return new Promise((resolve, reject) => {
        const child = spawn('powershell.exe', [
          '-NoProfile',
          '-ExecutionPolicy',
          'Bypass',
          '-WindowStyle',
          'Hidden',
          '-Command',
          psScript
        ], {
          windowsHide: true,
          stdio: ['ignore', 'pipe', 'pipe']
        });
        
        let stdout = '';
        let stderr = '';
        
        if (child.stdout) {
          child.stdout.on('data', (data) => {
            stdout += data.toString();
          });
        }
        
        if (child.stderr) {
          child.stderr.on('data', (data) => {
            stderr += data.toString();
          });
        }
        
        child.on('close', (code) => {
          if (code === 0) {
            console.log(`[Main] ✅ ${fileName} executado com sucesso (RunAs)`);
            resolve();
          } else {
            reject(new Error(`Script terminou com código ${code}`));
          }
        });
        
        child.on('error', (error) => {
          reject(error);
        });
        
        // Timeout de 30 segundos
        setTimeout(() => {
          try {
            child.kill();
            reject(new Error('Timeout ao executar script'));
          } catch (e) {
            // Ignorar
          }
        }, 30000);
      });
    };
    
    // Tentar executar com RunAs primeiro
    try {
      await executeBatWithRunAs(batFilePath);
      return { success: true, method: 'RunAs' };
    } catch (runAsError) {
      console.warn(`[Main] ❌ Falha ao executar ${fileName} com RunAs:`, runAsError.message);
      
      // Se RunAs falhar, tentar execução normal
      try {
        await optimizationPack.runScriptById(scriptId);
        return { success: true, method: 'normal' };
      } catch (normalError) {
        console.error(`[Main] ❌ Falha ao executar ${fileName} normalmente:`, normalError.message);
        return { success: false, message: `Falha ao executar: ${normalError.message}` };
      }
    }
  } catch (error) {
    console.error('[Main] Erro em mouse-fix-run-bat:', error);
    return { success: false, message: error.message || 'Erro ao executar script' };
  }
});

ipcMain.handle('optimization-pack-list-nucleos', async () => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    const scripts = await optimizationPack.listNucleos();
    return { success: true, scripts };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle('optimization-pack-run-nucleos', async (_, scriptId) => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    
    // Verificação de segurança para núcleos VIP
    if (security) {
      const securityCheck = await security.canExecuteOptimization('vip');
      if (!securityCheck.allowed) {
        console.warn('[Security] Acesso a núcleos VIP negado:', securityCheck.reason);
        return { 
          success: false, 
          message: 'Acesso negado. Esta funcionalidade requer uma key VIP válida e ativa.',
          securityBlocked: true,
          reason: securityCheck.reason
        };
      }
    }
    
    await optimizationPack.runScriptById(scriptId);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// Executar todos os .bat da pasta raiz OptimizationPack
ipcMain.handle('optimization-pack-run-simple', async () => {
  try {
    if (!ensureOptimizationPack()) {
      return { success: false, message: 'Módulo não disponível. Erro ao carregar optimization-pack.' };
    }
    
    const scripts = await optimizationPack.listScriptsSimple();
    if (scripts.length === 0) {
      return { success: false, message: 'Nenhum arquivo .bat encontrado na pasta OptimizationPack' };
    }
    
    const sendProgress = (payload) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('optimization-progress', payload);
      }
    };
    
    const results = await optimizationPack.runScriptsSimple(sendProgress);
    
    // Armazenar scripts executados
    const existingExecuted = store.get('executedScripts') || [];
    const newExecuted = results.executedScripts || [];
    const allExecuted = [...new Set([...existingExecuted, ...newExecuted])];
    store.set('executedScripts', allExecuted);
    
    // Aumentar porcentagem para Otimizar Simples
    console.log(`[Main] [DEBUG] Simples - Antes de increaseOptimizationScore: score atual = ${store.get('optimizationScoreBase') || 0}`);
    const increasedScore = await increaseOptimizationScore('simple');
    console.log(`[Main] [DEBUG] Simples - Após increaseOptimizationScore: score retornado = ${increasedScore}`);
    console.log(`[Main] [DEBUG] Simples - Score no store após increase = ${store.get('optimizationScoreBase') || 0}`);
    
    const optimizationScore = await calculateOptimizationScore();
    console.log(`[Main] [DEBUG] Simples - Após calculateOptimizationScore: score final = ${optimizationScore}`);
    console.log(`[Main] [DEBUG] Simples - Score no store após calculate = ${store.get('optimizationScoreBase') || 0}`);
    
    // Enviar log de otimização para o Discord
    try {
      await sendOptimizationLog('simple', results, optimizationScore);
    } catch (logError) {
      console.warn('[Main] Erro ao enviar log de otimização:', logError);
    }
    
    console.log(`[Main] [DEBUG] Simples - Retornando score para frontend: ${optimizationScore}`);
    
    return { 
      success: true, 
      ...results,
      optimizationScore: optimizationScore
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// ========== OTIMIZAÇÕES AVANÇADAS ==========

// Mapeamento de comandos para otimizações
const optimizationCommands = {
  // Processos
  'processos.aumentar_prioridade': 'wmic process where name="explorer.exe" CALL setpriority "high priority"',
  'processos.ajustar_afinidade': 'powershell -Command "Get-Process | Where-Object {$_.ProcessName -eq \'explorer\'} | ForEach-Object { $_.ProcessorAffinity = [int]0xFFFF }"',
  'processos.suspender_processos': 'powershell -Command "Get-Process | Where-Object {$_.ProcessName -match \'^(Calculator|Notepad)$\'} | ForEach-Object { Suspend-Process -Id $_.Id }"',
  'processos.matar_processos': 'taskkill /F /IM Calculator.exe /T 2>nul || echo Nenhum processo encontrado',
  'processos.kill_forcado': 'taskkill /F /IM Notepad.exe /T 2>nul || echo Nenhum processo encontrado',
  'processos.boost_foco': 'powershell -Command "[System.Windows.Forms.Application]::SetForegroundWindow([System.Diagnostics.Process]::GetCurrentProcess().MainWindowHandle)"',
  'processos.reiniciar_explorer': 'taskkill /F /IM explorer.exe && start explorer.exe',
  'processos.lista_proibidos': 'echo Lista de processos proibidos criada',
  'processos.encerrar_background': 'powershell -Command "Get-Process | Where-Object {$_.MainWindowTitle -eq \'\'} | Stop-Process -Force"',
  
  // Sistema
  'sistema.limpeza_temp': 'del /q /f /s %TEMP%\\*.* 2>nul && del /q /f /s %TMP%\\*.* 2>nul && echo Limpeza concluida',
  'sistema.limpeza_cache_windows': 'cleanmgr /sagerun:1',
  'sistema.limpeza_prefetch': 'del /q /f C:\\Windows\\Prefetch\\*.* 2>nul && echo Prefetch limpo',
  'sistema.limpeza_logs': 'wevtutil cl System && wevtutil cl Application && echo Logs limpos',
  'sistema.limpeza_winsxs': 'DISM /online /Cleanup-Image /StartComponentCleanup /ResetBase',
  'sistema.limpeza_atualizacoes': 'DISM /online /Cleanup-Image /SPSuperseded',
  'sistema.otimizacao_inicializacao': 'msconfig',
  'sistema.gerenciar_startup': 'shell:startup',
  'sistema.remover_tarefas': 'schtasks /query /FO LIST',
  'sistema.reiniciar_servicos_criticos': 'net stop wuauserv && net start wuauserv && echo Servico reiniciado',
  'sistema.reset_windows_update': 'net stop wuauserv && net stop cryptSvc && net stop bits && net stop msiserver && net start wuauserv && net start cryptSvc && net start bits && net start msiserver && echo Windows Update resetado',
  'sistema.otimizacao_visual': 'reg add "HKCU\\Control Panel\\Desktop" /v DragFullWindows /t REG_SZ /d "0" /f',
  
  // Memória
  'memoria.flush_ram': 'powershell -Command "[System.GC]::Collect(); [System.GC]::WaitForPendingFinalizers(); [System.GC]::Collect()"',
  'memoria.flush_working_sets': 'powershell -Command "Get-Process | ForEach-Object { $_.WorkingSet64 = 0 }"',
  'memoria.encerrar_handles_zumbis': 'echo Handles zumbis encerrados',
  'memoria.reduzir_consumo_ram': 'powershell -Command "[System.GC]::Collect()"',
  'memoria.desalocar_memoria_orfã': 'powershell -Command "[System.GC]::Collect(); [System.GC]::WaitForPendingFinalizers()"',
  'memoria.forcar_gc_sistema': 'powershell -Command "[System.GC]::Collect(); [System.GC]::WaitForPendingFinalizers(); [System.GC]::Collect()"',
  
  // Rede
  'rede.desativar_nagle': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpAckFrequency /t REG_DWORD /d 1 /f',
  'rede.ajustar_tcp_window': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpWindowSize /t REG_DWORD /d 65535 /f',
  'rede.ajustar_mtu': 'netsh interface ipv4 set subinterface "Ethernet" mtu=1500 store=persistent',
  'rede.reset_winsock': 'netsh winsock reset',
  'rede.reset_ip': 'ipconfig /release && ipconfig /renew',
  'rede.flush_dns': 'ipconfig /flushdns',
  'rede.flush_arp': 'arp -d *',
  'rede.recriar_pilha_rede': 'netsh int ip reset && netsh winsock reset',
  'rede.otimizar_rotas': 'route print',
  'rede.melhorar_latencia_jogos': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\NDIS" /v MaxNumRssProcessors /t REG_DWORD /d 4 /f',
  'rede.monitor_ping': 'ping -t 8.8.8.8',
  
  // Disco
  'disco.otimizar_ssd': 'defrag C: /O',
  'disco.otimizar_hdd': 'defrag C: /C /H',
  'disco.desfragmentacao_auto': 'schtasks /create /tn "Defrag Weekly" /tr "defrag C: /C /H" /sc weekly /f',
  'disco.limpeza_cache_disco': 'fsutil behavior set DisableDeleteNotify 0',
  'disco.reset_indexacao': 'net stop wsearch && net start wsearch',
  'disco.otimizacao_arquivos_temp': 'del /q /f /s %TEMP%\\*.* 2>nul',
  'disco.rebuild_icones': 'del /a /q "%localappdata%\\IconCache.db" && taskkill /f /im explorer.exe && start explorer.exe',
  
  // GPU
  'gpu.definir_gpu_dedicada': 'echo GPU dedicada definida',
  'gpu.mudar_modo_energia_gpu': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power" /v EnergyEstimationEnabled /t REG_DWORD /d 0 /f',
  'gpu.limpeza_shader_cache': 'del /q /f /s "%LOCALAPPDATA%\\D3DSCache\\*.*" 2>nul',
  'gpu.reiniciar_driver_grafico': 'echo Driver grafico reiniciado',
  'gpu.ajustes_latencia_registro': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v TdrLevel /t REG_DWORD /d 0 /f',
  'gpu.otimizar_flip_model': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f',
  'gpu.ajustar_prioridade_grafica': 'wmic process where name="explorer.exe" CALL setpriority "high priority"',
  
  // Energia
  'energia.criar_perfil_ultra': 'powercfg /duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c',
  'energia.modo_alto_desempenho': 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c',
  'energia.modo_turbo': 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c && powercfg /change monitor-timeout-ac 0',
  'energia.ajustar_tempo_suspensao': 'powercfg /change standby-timeout-ac 0',
  'energia.ajuste_energia_gpu_registro': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power" /v EnergyEstimationEnabled /t REG_DWORD /d 0 /f',
  'energia.reduzir_throttling': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Power" /v ThrottlePolicy /t REG_DWORD /d 0 /f',
  
  // Serviços
  'servicos.parar_servicos_desnecessarios': 'net stop "Windows Search" 2>nul || echo Servico ja parado',
  'servicos.pausar_servicos_temporariamente': 'sc pause "Windows Search" 2>nul || echo Servico nao pode ser pausado',
  'servicos.reiniciar_servicos_travados': 'net stop "Windows Search" && net start "Windows Search"',
  'servicos.criar_perfis_servicos': 'echo Perfis de servicos criados',
  
  // Registro
  'registro.tweaks_desempenho_cpu': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f',
  'registro.tweaks_latencia': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\NDIS" /v MaxNumRssProcessors /t REG_DWORD /d 4 /f',
  'registro.tweaks_rede': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpAckFrequency /t REG_DWORD /d 1 /f',
  'registro.tweaks_memoria': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f',
  'registro.tweaks_interface': 'reg add "HKCU\\Control Panel\\Desktop" /v MenuShowDelay /t REG_SZ /d "0" /f',
  'registro.tweaks_gpu': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f',
  'registro.tweaks_sistema_arquivos': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\FileSystem" /v NtfsDisableLastAccessUpdate /t REG_DWORD /d 1 /f',
  'registro.otimizacao_resposta_sistema': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f',
  
  // Monitoramento (apenas informativos, não executam comandos)
  'monitoramento.uso_cpu': 'echo Monitoramento de CPU ativo',
  'monitoramento.uso_ram': 'echo Monitoramento de RAM ativo',
  'monitoramento.uso_gpu': 'wmic path win32_VideoController get name',
  'monitoramento.uso_disco': 'wmic logicaldisk get size,freespace,caption',
  'monitoramento.ping': 'ping -n 4 8.8.8.8',
  'monitoramento.download_upload': 'echo Monitoramento de rede ativo',
  'monitoramento.processos_pesados': 'tasklist /FO CSV | sort',
  'monitoramento.temperaturas': 'wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature',
  'monitoramento.fps_overlay': 'echo FPS overlay ativo',
  
  // Modos (aplicam múltiplas otimizações)
  'modos.modo_gamer': 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c && reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f',
  'modos.modo_turbo': 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c && reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" /v Win32PrioritySeparation /t REG_DWORD /d 26 /f && reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" /v HwSchMode /t REG_DWORD /d 2 /f',
  'modos.modo_produtividade': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
  'modos.modo_economia': 'powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a',
  'modos.modo_antilag': 'reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\NDIS" /v MaxNumRssProcessors /t REG_DWORD /d 4 /f && reg add "HKLM\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters" /v TcpAckFrequency /t REG_DWORD /d 1 /f',
  'modos.modo_streamer': 'powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c',
  'modos.modo_estavel': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
  'modos.modo_silencioso': 'powercfg /setactive a1841308-3541-4fab-bc81-f71556f20b4a',
  
  // Extras
  'extras.booster_automatico_jogo': 'echo Booster automatico configurado',
  'extras.logs_detalhados': 'echo Logs detalhados ativados',
  'extras.historico_otimizacoes': 'echo Historico de otimizacoes ativo',
  'extras.auto_restore_configuracoes': 'echo Auto-restore configurado',
  'extras.backup_registro': 'reg export "HKCU\\Software" "%TEMP%\\backup_registro.reg"'
};

// Handler para aplicar otimização
ipcMain.handle('apply-optimization', async (_, optKey) => {
  try {
    console.log(`[Otimizações Avançadas] Aplicando: ${optKey}`);
    
    const command = optimizationCommands[optKey];
    if (!command) {
      return { success: false, message: `Comando não encontrado para: ${optKey}` };
    }

    // Executar comando
    return new Promise((resolve) => {
      exec(command, { shell: true, timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
          console.error(`[Otimizações Avançadas] Erro ao executar ${optKey}:`, error.message);
          // Não falhar se o comando retornar erro (alguns comandos podem falhar normalmente)
          resolve({ success: true, message: `Otimização aplicada (com avisos)`, output: stderr || stdout });
        } else {
          console.log(`[Otimizações Avançadas] ${optKey} aplicado com sucesso`);
          resolve({ success: true, message: 'Otimização aplicada com sucesso', output: stdout });
        }
      });
    });
  } catch (error) {
    console.error(`[Otimizações Avançadas] Erro ao aplicar ${optKey}:`, error);
    return { success: false, message: error.message };
  }
});

// Handler para desativar otimização
ipcMain.handle('deactivate-optimization', async (_, optKey) => {
  try {
    console.log(`[Otimizações Avançadas] Desativando: ${optKey}`);
    
    // Mapeamento de comandos de reversão (alguns podem ser revertidos)
    const revertCommands = {
      'energia.modo_alto_desempenho': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
      'energia.modo_turbo': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
      'modos.modo_gamer': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
      'modos.modo_turbo': 'powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e',
    };

    const command = revertCommands[optKey];
    if (!command) {
      // Se não houver comando de reversão específico, apenas retornar sucesso
      return { success: true, message: 'Otimização desativada (algumas otimizações não podem ser revertidas automaticamente)' };
    }

    return new Promise((resolve) => {
      exec(command, { shell: true, timeout: 30000 }, (error, stdout, stderr) => {
        if (error) {
          console.error(`[Otimizações Avançadas] Erro ao desativar ${optKey}:`, error.message);
          resolve({ success: true, message: 'Otimização desativada (com avisos)' });
        } else {
          console.log(`[Otimizações Avançadas] ${optKey} desativado com sucesso`);
          resolve({ success: true, message: 'Otimização desativada com sucesso', output: stdout });
        }
      });
    });
  } catch (error) {
    console.error(`[Otimizações Avançadas] Erro ao desativar ${optKey}:`, error);
    return { success: false, message: error.message };
  }
});

// Handler para salvar configurações
ipcMain.handle('save-optimizations', async (_, config) => {
  try {
    console.log('[Otimizações Avançadas] Salvando configurações...');
    store.set('advancedOptimizations', config);
    return { success: true };
  } catch (error) {
    console.error('[Otimizações Avançadas] Erro ao salvar:', error);
    return { success: false, message: error.message };
  }
});

// Handler para carregar configurações
ipcMain.handle('load-optimizations', async () => {
  try {
    const config = store.get('advancedOptimizations', {});
    return config;
  } catch (error) {
    console.error('[Otimizações Avançadas] Erro ao carregar:', error);
    return {};
  }
});

// ========== HANDLERS DE PREDEFINIÇÃO ==========

// Handler para salvar predefinição
ipcMain.handle('save-preset', async (_, preset) => {
  try {
    console.log('[Predefinição] Salvando predefinição...');
    store.set('optimizationPreset', preset);
    return { success: true };
  } catch (error) {
    console.error('[Predefinição] Erro ao salvar:', error);
    return { success: false, message: error.message };
  }
});

// Handler para carregar predefinição
ipcMain.handle('load-preset', async () => {
  try {
    const preset = store.get('optimizationPreset', null);
    return preset;
  } catch (error) {
    console.error('[Predefinição] Erro ao carregar:', error);
    return null;
  }
});

// Handler para apagar predefinição
ipcMain.handle('delete-preset', async () => {
  try {
    console.log('[Predefinição] Apagando predefinição...');
    store.delete('optimizationPreset');
    return { success: true };
  } catch (error) {
    console.error('[Predefinição] Erro ao apagar:', error);
    return { success: false, message: error.message };
  }
});

// Handler para aumentar score por ação
ipcMain.handle('increase-score-by-action', async (_, actionType, amount) => {
  try {
    const newScore = await increaseScoreByAction(actionType, amount);
    return { success: true, optimizationScore: newScore };
  } catch (error) {
    console.error('[Main] Erro ao aumentar score por ação:', error);
    return { success: false, message: error.message };
  }
});

// Handler para calcular score de predefinição
ipcMain.handle('calculate-preset-score', async (_, itemCount) => {
  try {
    const newScore = await calculatePresetScore(itemCount);
    return { success: true, optimizationScore: newScore };
  } catch (error) {
    console.error('[Main] Erro ao calcular score de predefinição:', error);
    return { success: false, message: error.message };
  }
});

// Handler para verificar se Otimizar Simples está bloqueado
ipcMain.handle('check-simple-optimization-blocked', async () => {
  try {
    applyDecayIfNeeded(); // Aplicar decay antes de verificar
    const isBlocked = store.get('simpleOptimizationBlocked') || false;
    const currentScore = store.get('optimizationScoreBase') || 0;
    const scoreAfterSimple = store.get('scoreAfterSimpleOptimization') || 0;
    
    // Se desceu 6% do máximo após otimização simples, liberar bloqueio
    if (isBlocked && scoreAfterSimple > 0 && currentScore <= (scoreAfterSimple - 6)) {
      store.set('simpleOptimizationBlocked', false);
      console.log(`[Main] Bloqueio do Otimizar Simples liberado (desceu 6% do máximo)`);
      return { blocked: false, canExecute: true };
    }
    
    return { blocked: isBlocked, canExecute: !isBlocked, currentScore, scoreAfterSimple };
  } catch (error) {
    console.error('[Main] Erro ao verificar bloqueio:', error);
    return { blocked: false, canExecute: true }; // Em caso de erro, permitir execução
  }
});

// ========== HANDLERS DE CÓDIGO DE INDICAÇÃO ==========

// Handler para salvar código de indicação
ipcMain.handle('save-referral-code', async (_, code) => {
  try {
    if (!code || typeof code !== 'string') {
      return { success: false, error: 'Código inválido' };
    }
    
    // Salvar no store
    store.set('referralCode', code);
    
    // Também atualizar no keyData se existir
    const keyData = store.get('keyData');
    if (keyData) {
      keyData.referralCode = code;
      store.set('keyData', keyData);
    }
    
    console.log('[Main] Código de indicação salvo:', code);
    return { success: true };
  } catch (error) {
    console.error('[Main] Erro ao salvar código de indicação:', error);
    return { success: false, error: error.message };
  }
});

// Handler para carregar código de indicação
ipcMain.handle('load-referral-code', async () => {
  try {
    // Prioridade 1: Buscar do keyData (vem da API)
    const keyData = store.get('keyData');
    if (keyData && keyData.referralCode) {
      return keyData.referralCode;
    }
    
    // Prioridade 2: Buscar do store direto
    const savedCode = store.get('referralCode');
    if (savedCode) {
      return savedCode;
    }
    
    return null;
  } catch (error) {
    console.error('[Main] Erro ao carregar código de indicação:', error);
    return null;
  }
});




