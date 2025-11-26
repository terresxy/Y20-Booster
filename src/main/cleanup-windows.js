const { app } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fssync = require('fs');
const { spawn } = require('child_process');

const BASE_RELATIVE_PATH = ['Imagens', 'OptimizationPack', 'Limpeza em bat'];

function resolveBaseDir() {
  const base = app.isPackaged ? process.resourcesPath : app.getAppPath();
  return path.join(base, ...BASE_RELATIVE_PATH);
}

async function listScripts() {
  const baseDir = resolveBaseDir();
  try {
    await fs.access(baseDir);
  } catch (error) {
    throw new Error('Pasta de scripts não encontrada.');
  }

  const files = await collectEntries(baseDir);

  return {
    apply: files,
    revert: []
  };
}

async function collectEntries(dirPath) {
  const entries = [];
  let listing = [];
  try {
    listing = await fs.readdir(dirPath);
  } catch (error) {
    return entries;
  }

  for (const name of listing) {
    const filePath = path.join(dirPath, name);
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) continue;
    const ext = path.extname(name).toLowerCase();
    if (ext !== '.bat' && ext !== '.reg' && ext !== '.ps1') continue;

    entries.push({
      id: Buffer.from(filePath).toString('base64'),
      name: name.replace(ext, ''),
      type: ext === '.bat' ? 'BAT' : ext === '.reg' ? 'REG' : 'PS1',
      path: filePath
    });
  }
  return entries;
}

async function runScriptById(encodedId) {
  const buffer = Buffer.from(encodedId, 'base64');
  const filePath = buffer.toString('utf8');
  const baseDir = resolveBaseDir();
  if (!filePath.startsWith(baseDir)) {
    throw new Error('Caminho inválido.');
  }

  if (!fssync.existsSync(filePath)) {
    throw new Error('Arquivo não encontrado.');
  }

  const preparedPath = await prepareExecutable(filePath);
  const ext = path.extname(preparedPath).toLowerCase();

  if (ext === '.bat') {
    await executeProcess('cmd.exe', ['/c', preparedPath]);
  } else if (ext === '.reg') {
    await executeProcess('regedit.exe', ['/s', preparedPath]);
  } else if (ext === '.ps1') {
    await executeProcess('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', preparedPath]);
  } else {
    throw new Error('Formato não suportado.');
  }
}

async function prepareExecutable(sourcePath) {
  if (!app.isPackaged) {
    return sourcePath;
  }
  const tempDir = path.join(app.getPath('temp'), 'y20-cleanup-windows');
  await fs.mkdir(tempDir, { recursive: true });
  const destination = path.join(tempDir, path.basename(sourcePath));
  await fs.copyFile(sourcePath, destination);
  return destination;
}

function executeProcess(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true, stdio: 'ignore' });
    
    // Timeout de 3 minutos (180000ms) para evitar travamentos
    const timeoutMs = 180000;
    let timeoutHandle = setTimeout(() => {
      if (child && child.exitCode === null) {
        console.error(`[CleanupWindows] executeProcess: Timeout de ${timeoutMs}ms atingido para ${command}. Encerrando processo...`);
        try {
          child.kill('SIGTERM');
          setTimeout(() => {
            if (child && child.exitCode === null) {
              spawn('taskkill', ['/F', '/T', '/PID', child.pid.toString()], {
                windowsHide: true,
                stdio: 'ignore'
              }).on('error', () => {});
            }
          }, 1000);
        } catch (error) {
          console.error(`[CleanupWindows] executeProcess: Erro ao encerrar processo:`, error);
        }
        reject(new Error(`Tempo limite de ${Math.round(timeoutMs / 1000)} segundos atingido ao executar o script. O processo foi encerrado.`));
      }
    }, timeoutMs);
    
    child.on('error', (error) => {
      clearTimeout(timeoutHandle);
      reject(error);
    });
    
    child.on('exit', (code) => {
      clearTimeout(timeoutHandle);
      if (code === 0) {
        resolve(true);
      } else {
        reject(new Error(`Processo retornou código ${code}`));
      }
    });
  });
}

module.exports = {
  listScripts,
  runScriptById
};





