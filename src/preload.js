// Log de inicialização do preload
console.log('[Preload] Iniciando preload script...');

try {
  const { contextBridge, ipcRenderer } = require('electron');
  
  console.log('[Preload] Electron modules carregados com sucesso');

  contextBridge.exposeInMainWorld('y20', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  getInitialState: () => ipcRenderer.invoke('get-initial-state'),
  acceptTerms: (accepted) => ipcRenderer.invoke('accept-terms', accepted),
  setLanguage: (language) => ipcRenderer.invoke('set-language', language),
  setPalette: (palette) => ipcRenderer.invoke('set-palette', palette),
  toggleNeon: (enabled) => ipcRenderer.invoke('toggle-neon', enabled),
  openDiscord: (url) => ipcRenderer.invoke('open-discord', url),
  setOptimization: (key, enabled) => ipcRenderer.invoke('set-optimization', { key, enabled }),
  optimizeRun: (payload) => ipcRenderer.invoke('optimize-run', payload),
  optimizeCancel: () => ipcRenderer.invoke('optimize-cancel'),
  optimizeContinue: () => ipcRenderer.invoke('optimize-continue'),
  optimizeCancelConfirmed: () => ipcRenderer.invoke('optimize-cancel-confirmed'),
  optimizeVipPresets: () => ipcRenderer.invoke('optimize-vip-presets'),
  openDevTools: () => ipcRenderer.invoke('open-devtools'),
  onOptimizationProgress: (callback) => {
    // Manter lista de callbacks para suportar múltiplos listeners
    if (!window._optimizationProgressCallbacks) {
      window._optimizationProgressCallbacks = [];
      // Registrar listener único que chama todos os callbacks
      ipcRenderer.removeAllListeners('optimization-progress');
      ipcRenderer.on('optimization-progress', (_, payload) => {
        // Chamar todos os callbacks registrados
        if (window._optimizationProgressCallbacks) {
          window._optimizationProgressCallbacks.forEach(cb => {
            try {
              cb(payload);
            } catch (error) {
              console.error('[Preload] Erro ao chamar callback de progresso:', error);
            }
          });
        }
      });
    }
    // Adicionar novo callback à lista
    if (callback && typeof callback === 'function') {
      window._optimizationProgressCallbacks.push(callback);
    }
    // Retornar função para remover o callback
    return () => {
      if (window._optimizationProgressCallbacks) {
        const index = window._optimizationProgressCallbacks.indexOf(callback);
        if (index > -1) {
          window._optimizationProgressCallbacks.splice(index, 1);
        }
      }
    };
  },
  createRestorePoint: (description) => ipcRenderer.invoke('create-restore-point', description),
  openRestoreSettings: () => ipcRenderer.invoke('open-restore-settings'),
  activateRestoreProtection: () => ipcRenderer.invoke('activate-restore-protection'),
  listRestorePoints: () => ipcRenderer.invoke('list-restore-points'),
  clearAllRestorePoints: () => ipcRenderer.invoke('clear-all-restore-points'),
  executeRestorePoint: (sequenceNumber) => ipcRenderer.invoke('execute-restore-point', sequenceNumber),
  deleteRestorePoint: (sequenceNumber) => ipcRenderer.invoke('delete-restore-point', sequenceNumber),
  getAutoBackupSetting: () => ipcRenderer.invoke('get-auto-backup-setting'),
  setAutoBackupSetting: (enabled) => ipcRenderer.invoke('set-auto-backup-setting', enabled),
  testInternetSpeed: () => ipcRenderer.invoke('test-internet-speed'),
  bluestacksDetect: () => ipcRenderer.invoke('bluestacks-detect'),
  bluestacksDetectAll: () => ipcRenderer.invoke('bluestacks-detect-all'),
  bluestacksSetPath: (basePath) => ipcRenderer.invoke('bluestacks-set-path', basePath),
  bluestacksApply: (type, payload) => ipcRenderer.invoke('bluestacks-apply', { type, payload }),
  bluestacksRevert: (type) => ipcRenderer.invoke('bluestacks-revert', { type }),
  bluestacksOptimizeEmulator: () => ipcRenderer.invoke('bluestacks-optimize-emulator'),
  windowControl: (action) => ipcRenderer.invoke('window-control', action),
  restartApp: () => ipcRenderer.invoke('restart-app'),
  onRestorePointResult: (callback) => {
    ipcRenderer.removeAllListeners('restore-point-result');
    ipcRenderer.on('restore-point-result', (_, payload) => callback(payload));
  },
  onNetworkStatus: (callback) => {
    ipcRenderer.removeAllListeners('network-status');
    ipcRenderer.on('network-status', (_, payload) => callback(payload));
  },
  checkNetwork: () => ipcRenderer.invoke('network-check'),
  showError: (message) => ipcRenderer.invoke('show-error', message),
  inputLagList: () => ipcRenderer.invoke('inputlag-list'),
  inputLagRun: (id) => ipcRenderer.invoke('inputlag-run', id),
  inputLagRevertAll: () => ipcRenderer.invoke('inputlag-revert-all'),
  powerPlanList: () => ipcRenderer.invoke('power-plan-list'),
  powerPlanRun: (id) => ipcRenderer.invoke('power-plan-run', id),
  powerPlanRemoveAll: () => ipcRenderer.invoke('power-plan-remove-all'),
  cleanupWindowsList: () => ipcRenderer.invoke('cleanup-windows-list'),
  cleanupWindowsRun: (id) => ipcRenderer.invoke('cleanup-windows-run', id),
  disableWindowsList: () => ipcRenderer.invoke('disable-windows-list'),
  disableWindowsRun: (id) => ipcRenderer.invoke('disable-windows-run', id),
  disableWindowsRevertAll: () => ipcRenderer.invoke('disable-windows-revert-all'),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  applyNvidiaSettings: (settings) => ipcRenderer.invoke('apply-nvidia-settings', settings),
  runOptimization: (payload) => ipcRenderer.invoke('optimize-run', payload),
  validateAccessKey: (key) => ipcRenderer.invoke('validate-access-key', key),
  checkAccessKey: () => ipcRenderer.invoke('check-access-key'),
  getAccessKey: () => ipcRenderer.invoke('get-access-key'),
  getCurrentAccessLevel: () => ipcRenderer.invoke('get-current-access-level'),
  checkApiHealth: () => ipcRenderer.invoke('check-api-health'),
  checkBotStatus: () => ipcRenderer.invoke('check-bot-status'),
  isAuthenticated: () => ipcRenderer.invoke('is-authenticated'),
  getDiscordUser: (userId, forceRefresh = true) => ipcRenderer.invoke('get-discord-user', userId, forceRefresh),
  logPanelOpen: (key) => ipcRenderer.invoke('log-panel-open', key),
  optimizationPackList: (folderName) => ipcRenderer.invoke('optimization-pack-list', folderName),
  optimizationPackRun: (folderName) => ipcRenderer.invoke('optimization-pack-run', folderName),
  optimizationPackRunSimple: () => ipcRenderer.invoke('optimization-pack-run-simple'),
  optimizationPackListNucleos: () => ipcRenderer.invoke('optimization-pack-list-nucleos'),
  optimizationPackRunNucleos: (scriptId) => ipcRenderer.invoke('optimization-pack-run-nucleos', scriptId),
  optimizationPackRunOne: (scriptId) => ipcRenderer.invoke('optimization-pack-run-one', scriptId),
  mouseFixRunBat: (scriptId) => ipcRenderer.invoke('mouse-fix-run-bat', scriptId),
  updateWindowTitle: (title) => ipcRenderer.invoke('update-window-title', title),
  restartPC: () => ipcRenderer.invoke('restart-pc'),
  appsList: () => ipcRenderer.invoke('apps-list'),
  appsRun: (id) => ipcRenderer.invoke('apps-run', id),
  appsOpenImage: (encodedImagePath) => ipcRenderer.invoke('apps-open-image', encodedImagePath),
  appsGetImageData: (encodedImagePath) => ipcRenderer.invoke('apps-get-image-data', encodedImagePath),
  emulatorResolveImage: (relativePath) => ipcRenderer.invoke('emulator-resolve-image', relativePath),
  applyNvidiaProfile: () => ipcRenderer.invoke('apply-nvidia-profile'),
  fakeProcessorsList: (type) => ipcRenderer.invoke('fake-processors-list', type),
  fakeProcessorsRun: (id) => ipcRenderer.invoke('fake-processors-run', id),
  checkProcessorRun: () => ipcRenderer.invoke('check-processor-run'),
  cursorsList: () => ipcRenderer.invoke('cursors-list'),
  cursorsRun: (id) => ipcRenderer.invoke('cursors-run', id),
  cursorDefaultApply: () => ipcRenderer.invoke('cursor-default-apply'),
  // Otimizações Avançadas
  applyOptimization: (optKey) => ipcRenderer.invoke('apply-optimization', optKey),
  deactivateOptimization: (optKey) => ipcRenderer.invoke('deactivate-optimization', optKey),
  saveOptimizations: (config) => ipcRenderer.invoke('save-optimizations', config),
  loadOptimizations: () => ipcRenderer.invoke('load-optimizations'),
  // Predefinições
  savePreset: (preset) => ipcRenderer.invoke('save-preset', preset),
  loadPreset: () => ipcRenderer.invoke('load-preset'),
  deletePreset: () => ipcRenderer.invoke('delete-preset'),
  // Código de Indicação
  saveReferralCode: (code) => ipcRenderer.invoke('save-referral-code', code),
  loadReferralCode: () => ipcRenderer.invoke('load-referral-code'),
  // Verificação de Atualizações
  checkUpdates: () => ipcRenderer.invoke('check-updates'),
  openUpdateDownload: (url) => ipcRenderer.invoke('open-update-download', url),
  installUpdate: () => ipcRenderer.invoke('install-update'),
  onUpdateCheckResult: (callback) => {
    ipcRenderer.removeAllListeners('update-check-result');
    ipcRenderer.on('update-check-result', (_, payload) => callback(payload));
  },
  // Auto-Updater (atualização automática)
  onAutoUpdateAvailable: (callback) => {
    ipcRenderer.removeAllListeners('auto-update-available');
    ipcRenderer.on('auto-update-available', (_, payload) => callback(payload));
  },
  onAutoUpdateNotAvailable: (callback) => {
    ipcRenderer.removeAllListeners('auto-update-not-available');
    ipcRenderer.on('auto-update-not-available', (_, payload) => callback(payload));
  },
  onAutoUpdateProgress: (callback) => {
    ipcRenderer.removeAllListeners('auto-update-progress');
    ipcRenderer.on('auto-update-progress', (_, payload) => callback(payload));
  },
  onAutoUpdateDownloaded: (callback) => {
    ipcRenderer.removeAllListeners('auto-update-downloaded');
    ipcRenderer.on('auto-update-downloaded', (_, payload) => callback(payload));
  },
  onAutoUpdateError: (callback) => {
    ipcRenderer.removeAllListeners('auto-update-error');
    ipcRenderer.on('auto-update-error', (_, payload) => callback(payload));
  },
  // Obter versão do app
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  // Limpar licença local
  clearLicense: () => ipcRenderer.invoke('clear-license'),
  // Calcular score de otimização
  calculateOptimizationScore: () => ipcRenderer.invoke('calculate-optimization-score'),
  // Aumentar score por ação
  increaseScoreByAction: (actionType, amount) => ipcRenderer.invoke('increase-score-by-action', actionType, amount),
  // Calcular score de predefinição
  calculatePresetScore: (itemCount) => ipcRenderer.invoke('calculate-preset-score', itemCount),
  // Verificar se Otimizar Simples está bloqueado
  checkSimpleOptimizationBlocked: () => ipcRenderer.invoke('check-simple-optimization-blocked'),
  // Verificar se está rodando como administrador
  checkIsAdmin: () => ipcRenderer.invoke('check-is-admin'),
  // Verificar status de serviços do Windows
  checkServicesStatus: (serviceNames) => ipcRenderer.invoke('check-services-status', serviceNames),
  // Executar PowerShell
  runPowerShell: async (command) => {
    try {
      const result = await ipcRenderer.invoke('run-powershell', command);
      if (result && result.success) {
        return result.output;
      } else {
        throw new Error(result?.message || 'Erro ao executar PowerShell');
      }
    } catch (error) {
      // Fallback: tentar usar execute-system-command
      if (error.message && error.message.includes('No handler registered')) {
        try {
          const psArgs = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', command];
          const fallbackResult = await ipcRenderer.invoke('execute-system-command', 'powershell.exe', psArgs);
          if (fallbackResult && fallbackResult.success) {
            return fallbackResult.output || '';
          }
          throw new Error(fallbackResult?.message || 'Erro ao executar PowerShell');
        } catch (fallbackError) {
          throw error; // Re-throw o erro original
        }
      }
      throw error;
    }
  },
  // Executar comando do sistema (fallback)
  executeSystemCommand: (command, args) => ipcRenderer.invoke('execute-system-command', command, args),
  // Executar script de ativação de serviços
  executeServicesActivation: (filePath) => ipcRenderer.invoke('execute-services-activation', filePath),
  // Ouvir saída em tempo real do script de ativação
  onServicesActivationOutput: (callback) => {
    ipcRenderer.removeAllListeners('services-activation-output');
    ipcRenderer.on('services-activation-output', (_, payload) => callback(payload));
  }
});

  console.log('[Preload] ✅ contextBridge configurado com sucesso');
} catch (error) {
  console.error('[Preload] ❌ ERRO CRÍTICO ao inicializar preload!');
  console.error('[Preload] Erro:', error.message);
  console.error('[Preload] Stack:', error.stack);
  // Tentar expor uma API mínima mesmo com erro
  try {
    const { contextBridge } = require('electron');
    contextBridge.exposeInMainWorld('y20', {
      error: 'Preload initialization failed',
      errorMessage: error.message
    });
  } catch (fallbackError) {
    console.error('[Preload] ❌ Erro ao criar fallback:', fallbackError);
  }
}

