const { app } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fssync = require('fs');
const { spawn } = require('child_process');

const BASE_RELATIVE_PATH = ['Imagens', 'OptimizationPack', 'Tirar Delay'];
const REVERTER_FOLDER = 'Reverter';

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

  const applyFiles = await collectEntries(baseDir);
  const revertDir = path.join(baseDir, REVERTER_FOLDER);
  let revertFiles = [];
  try {
    revertFiles = await collectEntries(revertDir);
  } catch (_) {
    revertFiles = [];
  }

  return {
    apply: applyFiles,
    revert: revertFiles
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
    if (ext !== '.bat' && ext !== '.reg') continue;

    entries.push({
      id: Buffer.from(filePath).toString('base64'),
      name: name.replace(ext, ''),
      type: ext === '.bat' ? 'BAT' : 'REG',
      path: filePath
    });
  }
  return entries;
}

async function runScriptById(encodedId) {
  const buffer = Buffer.from(encodedId, 'base64');
  const filePath = buffer.toString('utf8');
  const baseDir = resolveBaseDir();
  const revertDir = path.join(baseDir, REVERTER_FOLDER);
  
  // Permitir execução de scripts da pasta principal ou da pasta Reverter
  if (!filePath.startsWith(baseDir) && !filePath.startsWith(revertDir)) {
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
  } else {
    throw new Error('Formato não suportado.');
  }
}

async function runAllRevertScripts() {
  const baseDir = resolveBaseDir();
  const revertDir = path.join(baseDir, REVERTER_FOLDER);
  
  try {
    await fs.access(revertDir);
  } catch (error) {
    throw new Error('Pasta de reversão não encontrada.');
  }

  const revertFiles = await collectEntries(revertDir);
  if (revertFiles.length === 0) {
    throw new Error('Nenhum script de reversão encontrado.');
  }

  const results = [];
  for (const entry of revertFiles) {
    try {
      await runScriptById(entry.id);
      results.push({ success: true, name: entry.name });
    } catch (error) {
      results.push({ success: false, name: entry.name, error: error.message });
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  return {
    success: failed === 0,
    executed: revertFiles.length,
    successful,
    failed,
    results
  };
}

async function prepareExecutable(sourcePath) {
  if (!app.isPackaged) {
    return sourcePath;
  }
  const tempDir = path.join(app.getPath('temp'), 'y20-inputlag');
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
        console.error(`[InputLag] executeProcess: Timeout de ${timeoutMs}ms atingido para ${command}. Encerrando processo...`);
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
          console.error(`[InputLag] executeProcess: Erro ao encerrar processo:`, error);
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
  runScriptById,
  runAllRevertScripts
};

