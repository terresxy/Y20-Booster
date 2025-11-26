const { autoUpdater } = require('electron-updater');
const { app, dialog } = require('electron');

// Configuração do autoUpdater
autoUpdater.autoDownload = true; // Baixar automaticamente
autoUpdater.autoInstallOnAppQuit = true; // Instalar ao fechar o app
autoUpdater.allowPrerelease = false; // Não permitir versões pré-release

// Configurar para usar GitHub
autoUpdater.setFeedURL({
  provider: 'github',
  owner: process.env.GITHUB_REPO_OWNER || 'terresxy',
  repo: process.env.GITHUB_REPO_NAME || 'Y20-Booster'
});

// Logs detalhados
autoUpdater.logger = {
  info: (message) => console.log('[AutoUpdater]', message),
  warn: (message) => console.warn('[AutoUpdater]', message),
  error: (message) => console.error('[AutoUpdater]', message),
  debug: (message) => console.log('[AutoUpdater DEBUG]', message)
};

let mainWindow = null;
let updateInfo = null;
let isChecking = false;

/**
 * Configurar a janela principal para receber eventos
 */
function setMainWindow(window) {
  mainWindow = window;
}

/**
 * Verificar atualizações
 */
async function checkForUpdates() {
  if (isChecking) {
    console.log('[AutoUpdater] Verificação já em andamento...');
    return;
  }

  try {
    isChecking = true;
    console.log('[AutoUpdater] Verificando atualizações...');
    
    // Só verificar se o app estiver empacotado (não em desenvolvimento)
    if (!app.isPackaged) {
      console.log('[AutoUpdater] App em modo desenvolvimento, pulando verificação');
      isChecking = false;
      return;
    }

    const result = await autoUpdater.checkForUpdates();
    console.log('[AutoUpdater] Resultado da verificação:', result);
    
    if (result && result.updateInfo) {
      updateInfo = result.updateInfo;
    }
    
    isChecking = false;
  } catch (error) {
    console.error('[AutoUpdater] Erro ao verificar atualizações:', error);
    isChecking = false;
    
    // Enviar erro para o renderer
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-error', {
        message: error.message
      });
    }
  }
}

/**
 * Configurar eventos do autoUpdater
 */
function setupAutoUpdaterEvents() {
  // Quando encontrar atualização disponível
  autoUpdater.on('update-available', (info) => {
    console.log('[AutoUpdater] ✅ Atualização disponível:', info.version);
    updateInfo = info;
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-available', {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes || 'Sem notas de versão disponíveis.'
      });
    }
  });

  // Quando não houver atualização
  autoUpdater.on('update-not-available', (info) => {
    console.log('[AutoUpdater] ✅ Você está usando a versão mais recente');
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-not-available', {
        version: info.version
      });
    }
  });

  // Progresso do download
  autoUpdater.on('download-progress', (progressObj) => {
    const percent = Math.round(progressObj.percent);
    const transferred = (progressObj.transferred / 1024 / 1024).toFixed(2);
    const total = (progressObj.total / 1024 / 1024).toFixed(2);
    
    console.log(`[AutoUpdater] Download: ${percent}% (${transferred} MB / ${total} MB)`);
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-progress', {
        percent,
        transferred,
        total,
        bytesPerSecond: progressObj.bytesPerSecond
      });
    }
  });

  // Download concluído
  autoUpdater.on('update-downloaded', (info) => {
    console.log('[AutoUpdater] ✅ Download concluído! Versão:', info.version);
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-downloaded', {
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes || 'Sem notas de versão disponíveis.'
      });
    }
  });

  // Erro durante atualização
  autoUpdater.on('error', (error) => {
    console.error('[AutoUpdater] ❌ Erro:', error);
    
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auto-update-error', {
        message: error.message || 'Erro desconhecido ao atualizar'
      });
    }
  });
}

/**
 * Instalar atualização e reiniciar
 */
function quitAndInstall() {
  console.log('[AutoUpdater] Reiniciando para instalar atualização...');
  autoUpdater.quitAndInstall(false, true); // false = não é silencioso, true = é antes do quit
}

module.exports = {
  setMainWindow,
  checkForUpdates,
  setupAutoUpdaterEvents,
  quitAndInstall,
  getUpdateInfo: () => updateInfo
};








