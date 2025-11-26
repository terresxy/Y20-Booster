const ElectronStore = (() => {
  const imported = require('electron-store');
  if (typeof imported === 'function') {
    return imported;
  }
  if (imported && typeof imported.default === 'function') {
    return imported.default;
  }
  throw new Error('Não foi possível carregar electron-store.');
})();

const store = new ElectronStore({
  name: 'y20booster-config',
  defaults: {
    language: 'pt-BR',
    palette: 'royal',
    neonEnabled: true,
    termsAccepted: false,
    autoBackupOnStart: false, // Backup automático ao abrir painel (desativado por padrão)
    optimizations: {
      mouseAcceleration: false,
      driverAutoUpdate: false,
      globalNotifications: false,
      uwpBackgroundApps: false,
      mapsAutoUpdate: false,
      storeAutoUpdate: false,
      gameBar: false,
      indexing: false,
      sysMain: false,
      pauseWindowsUpdate: false
    }
  }
});

module.exports = store;

