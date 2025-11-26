// Log de inicialização do renderer
console.log('[Renderer] ==========================================');
console.log('[Renderer] ✅ Renderer script iniciado!');
console.log('[Renderer] Timestamp:', new Date().toISOString());
console.log('[Renderer] ==========================================');

const translations = {
  'pt-BR': {
    general: 'Geral',
    optimization: 'Otimização',
    configEmu: 'Config/Emu',
    backup: 'Backup',
    optimizationLevel: 'Otimização',
    palette: 'Paleta de cores',
    neon: 'Neon',
    vip: 'Seja VIP',
    sysOverview: 'Visão geral do sistema',
    status: 'Status',
    health: 'Saúde do sistema',
    healthHint: 'Use o botão otimizar para aplicar o melhor conjunto de ajustes.',
    optimizeAction: 'Otimizar agora',
    cpu: 'CPU',
    gpu: 'GPU',
    memory: 'Memória',
    storage: 'Armazenamento',
    processes: 'Processos',
    basicSettings: 'Configurações básicas',
    configTitle: 'Tweaks e ajustes',
    emuSync: 'Sincronização de Emulador',
    emuSyncHint: 'Aplica limites de FPS e prioridade de CPU para emuladores Android/Console.',
    configure: 'Configurar',
    gameMode: 'Modo Jogo Inteligente',
    gameModeHint: 'Alterna para perfil de energia agressivo enquanto jogos estiverem ativos.',
    services: 'Serviços críticos',
    servicesHint: 'Veja quais serviços serão pausados durante sessões de alto desempenho.',
    view: 'Ver lista',
    profiles: 'Perfis personalizados',
    profilesHint: 'Crie presets para jogos específicos e alterne com um clique.',
    create: 'Criar',
    restorePoints: 'Pontos de restauração',
    restoreHint: 'Crie pontos de restauração sempre que aplicar ajustes importantes. Isso garante reversão rápida.',
    createRestore: 'Criar ponto agora',
    openRestore: 'Abrir configurações',
    protection: 'Proteção do sistema',
    protectionHint: 'Ative a proteção automática para permitir que o Windows crie pontos antes de alterações de sistema.',
    activateProtection: 'Ativar proteção'
  },
  'pt-PT': {
    general: 'Geral',
    optimization: 'Otimização',
    configEmu: 'Config/Emu',
    backup: 'Cópias de segurança',
    optimizationLevel: 'Otimização',
    palette: 'Paleta de cores',
    neon: 'Neon',
    vip: 'Torne-se VIP',
    sysOverview: 'Visão geral do sistema',
    status: 'Estado',
    health: 'Saúde do sistema',
    healthHint: 'Use o botão otimizar para aplicar o melhor conjunto de ajustes.',
    optimizeAction: 'Otimizar agora',
    cpu: 'CPU',
    gpu: 'GPU',
    memory: 'Memória',
    storage: 'Armazenamento',
    processes: 'Processos',
    basicSettings: 'Configurações básicas',
    configTitle: 'Tweaks e ajustes',
    emuSync: 'Sincronização de Emulador',
    emuSyncHint: 'Aplica limites de FPS e prioridade de CPU para emuladores Android/Console.',
    configure: 'Configurar',
    gameMode: 'Modo Jogo Inteligente',
    gameModeHint: 'Alterna para perfil de energia agressivo enquanto jogos estiverem ativos.',
    services: 'Serviços críticos',
    servicesHint: 'Veja quais serviços serão pausados durante sessões de alto desempenho.',
    view: 'Ver lista',
    profiles: 'Perfis personalizados',
    profilesHint: 'Crie presets para jogos específicos e alterne com um clique.',
    create: 'Criar',
    restorePoints: 'Pontos de restauro',
    restoreHint: 'Crie um ponto de restauro sempre que aplicar ajustes importantes.',
    createRestore: 'Criar ponto agora',
    openRestore: 'Abrir definições',
    protection: 'Proteção do sistema',
    protectionHint: 'Ative a proteção automática para que o Windows crie pontos antes de alterações.',
    activateProtection: 'Ativar proteção'
  },
  'en-US': {
    general: 'Home',
    optimization: 'Optimization',
    configEmu: 'Config/Emu',
    backup: 'Backup',
    optimizationLevel: 'Optimization',
    palette: 'Color palette',
    neon: 'Neon',
    vip: 'Become VIP',
    sysOverview: 'System overview',
    status: 'Status',
    health: 'System health',
    healthHint: 'Use the optimize button to apply the recommended tweaks set.',
    optimizeAction: 'Optimize now',
    cpu: 'CPU',
    gpu: 'GPU',
    memory: 'Memory',
    storage: 'Storage',
    processes: 'Processes',
    basicSettings: 'Basic settings',
    configTitle: 'Tweaks & adjustments',
    emuSync: 'Emulator sync',
    emuSyncHint: 'Applies FPS limits and CPU priority for Android/Console emulators.',
    configure: 'Configure',
    gameMode: 'Smart Game Mode',
    gameModeHint: 'Switches to aggressive power profile while games are running.',
    services: 'Critical services',
    servicesHint: 'See which services are paused during high performance sessions.',
    view: 'View list',
    profiles: 'Custom profiles',
    profilesHint: 'Create presets for specific games and switch with one click.',
    create: 'Create',
    restorePoints: 'Restore points',
    restoreHint: 'Create restore points whenever you apply important adjustments to ensure rollback.',
    createRestore: 'Create restore point',
    openRestore: 'Open settings',
    protection: 'System protection',
    protectionHint: 'Enable automatic protection so Windows creates points before system changes.',
    activateProtection: 'Enable protection'
  },
  'ar-SA': {
    general: 'عام',
    optimization: 'تحسين',
    configEmu: 'الإعداد/المحاكي',
    backup: 'نسخ احتياطي',
    optimizationLevel: 'التحسين',
    palette: 'لوحة الألوان',
    neon: 'نيون',
    vip: 'كن VIP',
    sysOverview: 'نظرة عامة على النظام',
    status: 'الحالة',
    health: 'صحة النظام',
    healthHint: 'استخدم زر التحسين لتطبيق أفضل مجموعة من الإعدادات.',
    optimizeAction: 'حسّن الآن',
    cpu: 'المعالج',
    gpu: 'البطاقة الرسومية',
    memory: 'الذاكرة',
    storage: 'التخزين',
    processes: 'العمليات',
    basicSettings: 'الإعدادات الأساسية',
    configTitle: 'التعديلات والضبط',
    emuSync: 'مزامنة المحاكي',
    emuSyncHint: 'يطبق حدود الإطارات وأولوية المعالج لمحاكيات Android/Console.',
    configure: 'إعداد',
    gameMode: 'وضع اللعب الذكي',
    gameModeHint: 'يبدل إلى ملف طاقة قوي أثناء تشغيل الألعاب.',
    services: 'الخدمات الحرجة',
    servicesHint: 'شاهد الخدمات التي ستتوقف أثناء جلسات الأداء العالي.',
    view: 'عرض القائمة',
    profiles: 'ملفات مخصصة',
    profilesHint: 'أنشئ إعدادات مسبقة لألعاب معينة وبدّل بضغطة واحدة.',
    create: 'إنشاء',
    restorePoints: 'نقاط الاستعادة',
    restoreHint: 'أنشئ نقاط استعادة عند تطبيق تغييرات مهمة لضمان الرجوع بسهولة.',
    createRestore: 'إنشاء نقطة الآن',
    openRestore: 'فتح الإعدادات',
    protection: 'حماية النظام',
    protectionHint: 'فعّل الحماية التلقائية حتى ينشئ Windows نقاطاً قبل تغييرات النظام.',
    activateProtection: 'تفعيل الحماية'
  }
};

const optimizationItems = [
  {
    key: 'mouseAcceleration',
    title: 'Aceleração do mouse',
    description: 'Desativa aceleração para maior precisão em jogos.',
    icon: '🖱️'
  },
  {
    key: 'driverAutoUpdate',
    title: 'Atualização automática de drivers',
    description: 'Controla downloads automáticos para evitar uso desnecessário de banda.',
    icon: '🧩'
  },
  {
    key: 'globalNotifications',
    title: 'Notificações globais',
    description: 'Desliga pop-ups do sistema durante sessões de jogo.',
    icon: '🔔'
  },
  {
    key: 'uwpBackgroundApps',
    title: 'Apps UWP em segundo plano',
    description: 'Impede aplicativos da Microsoft Store de rodar escondidos.',
    icon: '🌓'
  },
  {
    key: 'mapsAutoUpdate',
    title: 'Atualização de mapas',
    description: 'Bloqueia downloads automáticos dos mapas offline.',
    icon: '🗺️'
  },
  {
    key: 'storeAutoUpdate',
    title: 'Atualização de apps da loja',
    description: 'Controla updates da Microsoft Store para evitar uso de recursos.',
    icon: '🏬'
  },
  {
    key: 'gameBar',
    title: 'Game Bar',
    description: 'Desativa Game Bar e Game DVR para reduzir overlays em jogos.',
    icon: '🎮'
  },
  {
    key: 'indexing',
    title: 'Indexação',
    description: 'Pausa o serviço de indexação para liberar I/O em discos.',
    icon: '🗂️'
  },
  {
    key: 'sysMain',
    title: 'SysMain (Prefetch)',
    description: 'Desativa o serviço SysMain para evitar consumo extra de RAM.',
    icon: '🚀'
  },
  {
    key: 'pauseWindowsUpdate',
    title: 'Atualizações do Windows',
    description: 'Pausa o Windows Update enquanto o modo de desempenho estiver ativo.',
    icon: '🛡️'
  }
];

const windowsOptimizeItems = [
  { key: 'activityFeed', title: 'Feed de atividade', description: 'Desativar Feed de atividade', icon: '📰' },
  { key: 'bluetooth', title: 'Bluetooth', description: 'Desativar Bluetooth do Windows', icon: '📶' },
  { key: 'cortana', title: 'Cortana', description: 'Desativar Cortana do Windows', icon: '🎤' },
  { key: 'reduceProcesses', title: 'Reduzir Processos', description: 'Otimizar execução de processos', icon: '⚡' },
  { key: 'networkTraffic', title: 'Tráfego de Rede', description: 'Monitoramento de Dados da Rede', icon: '🌐' },
  { key: 'logsEvents', title: 'Logs e Eventos', description: 'Coletor de Eventos do Windows', icon: '📋' },
  { key: 'smartScreen', title: 'Smart Screen', description: 'Verifica arquivos baixados', icon: '🛡️' },
  { key: 'backgroundApps', title: 'Segundo Plano', description: 'Aplicativos em segundo plano', icon: '🌓' },
  { key: 'biometricService', title: 'Serviço Biométrico', description: 'Impressões digitais e facial', icon: '👤' },
  { key: 'sync', title: 'Sincronização', description: 'Sincroniza preferências e dados', icon: '🔄' },
  { key: 'windowsUpdate', title: 'Windows Update', description: 'Atualizações Automáticas', icon: '⬆️' },
  { key: 'xboxWindows', title: 'Xbox Windows', description: 'Funcionalidades do Xbox', icon: '🎮' },
  { key: 'windowsApps', title: 'Windows Apps', description: 'Apps do windows desnecessários', icon: '📱' },
  { key: 'visualEffects', title: 'Efeitos Visuais', description: '- Equilíbrio visual e desempenho', icon: '✨' },
  { key: 'fileIndexing', title: 'Indexação Arquivos', description: 'Reduzir atividade secundária.', icon: '🗂️' },
  { key: 'compatibility', title: 'Compatibilidade', description: 'Compatibilidade de aplicativos', icon: '🔧' },
  { key: 'networkThrottling', title: 'Network Throttling', description: 'Limitação de largura de banda', icon: '📊' },
  { key: 'windowsInk', title: 'Windows Ink', description: 'Interatividade com canetas', icon: '✏️' },
  { key: 'hibernation', title: 'Hibernação', description: 'Suspensão do Windows', icon: '💤' },
  { key: 'powerThrottling', title: 'Power Throttling', description: 'Melhorar a eficiência energética', icon: '🔋' },
  { key: 'telemetry', title: 'Telemetria', description: 'Coleta de dados e informações', icon: '📊' },
  { key: 'windowsInsider', title: 'Windows Insider', description: 'Versões de testes do windows.', icon: '🧪' },
  { key: 'snapAssist', title: 'Snap Assist', description: '-Organização automática de janelas.', icon: '📐' },
  { key: 'mediaPlayerSharing', title: 'Media Player Sharing', description: 'Compartilhamento de mídia', icon: '🎵', warning: true },
  { key: 'dataCollection', title: 'Coleta de Dados', description: 'Relatório de Erros do Windows', icon: '📈', warning: true },
  { key: 'spooler', title: 'Spooler', description: 'Gerencia as filas de impressão', icon: '🖨️' },
  { key: 'widgets', title: 'Widgets', description: 'Widgets da barra de tarefas', icon: '🧩' },
  { key: 'quickAccess', title: 'Acesso Rápido', description: 'Arquivos e pastas recentes.', icon: '⚡' },
  { key: 'cloudClipboard', title: 'Cloud Clipboard', description: 'Área de Transferência na Nuvem', icon: '📋' },
  { key: 'remoteAccess', title: 'Acesso Remoto', description: 'Gerenciamento remoto', icon: '🔗' },
  { key: 'unusedServices', title: 'Serviços Inutilizados', description: 'Desativar serviços desnecessários', icon: '🗑️' },
  { key: 'superfetch', title: 'Superfetch', description: '- Pré-carregamento de aplicativos', icon: '🚀' }
];

const emulatorGroups = [
  {
    title: 'EMULADORES | MSI 5/BLUESTACKS 5',
    items: [
      { title: 'MSI 5 | VERSÃO 5.9', image: '../../Imagens/Emuladores/foto1.png', url: 'https://4br.me/pJYmqkEpd5', vipUrl: 'https://www.mediafire.com/file/qm8fb4reph2qh21/MSI_5_%285.9.300%29.rar/file' },
      { title: 'MSI 5 | VERSÃO 5.11', image: '../../Imagens/Emuladores/foto2.png', url: 'https://4br.me/megRKe', vipUrl: 'https://www.mediafire.com/file/04ctxq005l7b3tw/MSI_5_%285.11.100%29.rar/file' },
      { title: 'MSI 5 | VERSÃO 5.12', image: '../../Imagens/Emuladores/foto3.png', url: 'https://4br.me/rhTrwvL9', vipUrl: 'https://www.mediafire.com/file/a03p5lc1uoilbbb/MSI_5_%285.12.120%29.rar/file' },
      { title: 'MSI 5 | VERSÃO 5.21', image: '../../Imagens/Emuladores/foto4.png', url: 'https://4br.me/rhTrwvL9', vipUrl: 'https://www.mediafire.com/file/89ooxs77zcte2yg/MSI_5_%285.21.151%29.rar/file' },
      { title: 'BLUE 5 | VERSÃO 5.21', image: '../../Imagens/Emuladores/foto5.png', url: 'https://4br.me/Lpx1', vipUrl: 'https://www.mediafire.com/file/qua1ogyx7aucc3j/BLUE+5+(5.21).rar/file' }
    ]
  },
  {
    title: 'EMULADORES | MSI 4/BLUESTACKS 4',
    items: [
      { title: 'MSI 4 | VERSÃO 5318', image: '../../Imagens/Emuladores/foto6.png', url: 'https://4br.me/WP0bmwVN', vipUrl: 'https://www.mediafire.com/file/ins5mwyzbq656nq/MSI+4+(2.40.5318).rar/file' },
      { title: 'MSI 4 | VERSÃO 6305', image: '../../Imagens/Emuladores/foto7.png', url: 'https://4br.me/2cZreOPyqr', vipUrl: 'https://www.mediafire.com/file/bh07vb04olbn8il/MSI_4_6305.rar/file' },
      { title: 'BLUE 4 | VERSÃO 1002', image: '../../Imagens/Emuladores/foto8.png', url: 'https://4br.me/lYkxd4l9', vipUrl: 'https://www.mediafire.com/file/3hn35pk01agcrqq/BLUESTACKS+4+(1002).rar/file' },
      { title: 'BLUE 4 | VERSÃO 1075', image: '../../Imagens/Emuladores/foto9.png', url: 'https://4br.me/PcPhG', vipUrl: 'https://www.mediafire.com/file/jzovu0eaoqqvtj4/BLUE+4+(1075).rar/file' }
    ]
  },
  {
    title: 'EMULADORES MODIFICADOS',
    items: [
      { title: 'BLUE ULTRA EGO', image: '../../Imagens/Emuladores/foto10.png', url: 'https://4br.me/DciOR5Mgy7', vipUrl: 'https://www.mediafire.com/file/m4al2hpc2p8uacr/BLUE_Ultra_Ego.rar/file' },
      { title: 'BLUE ULTRA GOD', image: '../../Imagens/Emuladores/foto11.png', url: 'https://4br.me/YSkE8nsw6', vipUrl: 'https://www.mediafire.com/file/ch61ern18rx6dhr/BLUE_ULTRA_GOD.rar/file' },
      { title: 'BLUE ULTRA GOD ANTICRASH', image: '../../Imagens/Emuladores/foto12.png', url: 'https://4br.me/jLR2SbPnk', vipUrl: 'https://www.mediafire.com/file/fqm974b0vyn8f3b/BLUE_ULTRA_GOD_ANTI_CASH.rar/file' },
      { title: 'BLUE E4VX 1002', image: '../../Imagens/Emuladores/foto13.png', url: 'https://4br.me/sdOwWTn', vipUrl: 'https://www.mediafire.com/file/zk4gd5huglk726l/BLUE-e4vx.4.240.30.1002.7z/file' },
      { title: 'MSI E4VX 6305', image: '../../Imagens/Emuladores/foto14.png', url: 'https://4br.me/1sdPruVgy', vipUrl: 'https://www.mediafire.com/file/6xxh3lq2wwtz3kn/MSI-e4vx.4.240.15.6305.7z/file' },
      { title: 'BLUE SUPERCLEAN', image: '../../Imagens/Emuladores/foto15.png', url: 'https://4br.me/XmhmB1', vipUrl: 'https://www.mediafire.com/file/ijftt33zdpni27t/BLUE+SUPERCLEAN.rar/file' },
      { title: 'BLUE ALLIANCE', image: '../../Imagens/Emuladores/foto16.png', url: 'https://4br.me/pq4w1UC', vipUrl: 'https://www.mediafire.com/file/3gwajp9v7xdvyer/AllianceLite.rar/file' },
      { title: 'MSI VIPER', image: '../../Imagens/Emuladores/foto17.png', url: 'https://4br.me/lKKy97Z5n', vipUrl: 'https://www.mediafire.com/file/k4yb6m11kjqy3fp/MSI+ViperX.rar/file' }
    ]
  }
];

let navButtons = Array.from(document.querySelectorAll('.nav-item'));
let sections = Array.from(document.querySelectorAll('.panel-section'));
// Gauge removido
const sidebarScore = document.getElementById('sidebar-score');
const toastElement = document.getElementById('toast');

const languageButton = document.getElementById('language-button');
const languageMenu = document.getElementById('language-menu');
const currentLanguageLabel = document.getElementById('current-language');
const paletteButton = document.getElementById('palette-button');
const paletteMenu = document.getElementById('palette-menu');
// Inicializar botão Neon
// Função removida - botão Neon foi removido da UI
function initializeNeonToggle() {
  // Botão Neon removido, função mantida apenas para compatibilidade
  return;
}

function updateNeonEffects() {
  // Forçar atualização de estilos neon
  const style = document.createElement('style');
  style.textContent = `
    body[data-neon="on"] * {
      transition: border-color 0.3s ease, box-shadow 0.3s ease, text-shadow 0.3s ease !important;
    }
  `;
  document.head.appendChild(style);
  
  // Forçar repaint
  void document.body.offsetHeight;
  
  setTimeout(() => {
    style.remove();
  }, 350);
}

const termsModal = document.getElementById('terms-modal');
const termsAccept = document.getElementById('terms-accept');
const termsDecline = document.getElementById('terms-decline');

const createRestorePointBtn = document.getElementById('create-restore-point');
const openRestoreSettingsBtn = document.getElementById('open-restore-settings');
const clearAllRestorePointsBtn = document.getElementById('clear-all-restore-points');
const toggleAutoBackupBtn = document.getElementById('toggle-auto-backup');
const autoBackupIcon = document.getElementById('auto-backup-icon');
const autoBackupText = document.getElementById('auto-backup-text');
const discordButton = document.getElementById('discord-button');
const vipButton = document.getElementById('vip-button');
const minimizeButton = document.getElementById('minimize-window');
const closeButton = document.getElementById('close-window');
const sidebarElement = document.querySelector('.sidebar');
const bsVerifyButton = document.getElementById('bs-verify-button');
const bsStatusLabel = document.getElementById('bs-status-label');
const bsBlocks = Array.from(document.querySelectorAll('.config-block[data-require]'));
const bsControls = Array.from(document.querySelectorAll('[data-bs-control]'));
// Desabilitar controles do emulador até verificar pasta
if (bsBlocks && bsBlocks.length) {
  try {
    updateBlueStacksAvailability(null);
  } catch {}
}
const bsFpsInput = document.getElementById('bs-fps-input');
const bsFpsApply = document.getElementById('bs-fps-apply');
const bsFpsRevert = document.getElementById('bs-fps-revert');
const bsDelayInput = document.getElementById('bs-delay-input');
const bsDelayApply = document.getElementById('bs-delay-apply');
const bsDelayRevert = document.getElementById('bs-delay-revert');
const bsTweaksInput = document.getElementById('bs-tweaks-input');
const bsTweaksApply = document.getElementById('bs-tweaks-apply');
const bsTweaksRevert = document.getElementById('bs-tweaks-revert');
const bsDeviceBrandInput = document.getElementById('bs-device-brand');
const bsDeviceManufacturerInput = document.getElementById('bs-device-manufacturer');
const bsDeviceModelInput = document.getElementById('bs-device-model');
const bsDeviceApply = document.getElementById('bs-device-apply');
const bsDeviceRevert = document.getElementById('bs-device-revert');
const bsDpiInput = document.getElementById('bs-dpi-input');
const bsDpiApply = document.getElementById('bs-dpi-apply');
const bsDpiRevert = document.getElementById('bs-dpi-revert');
// Mouse Fixo
const mouseFixoApply = document.getElementById('mouse-fixo-apply');
const mouseFixoRevert = document.getElementById('mouse-fixo-revert');
const bsWidthInput = document.getElementById('bs-width-input');
const bsHeightInput = document.getElementById('bs-height-input');
const bsResApply = document.getElementById('bs-res-apply');
const bsResRevert = document.getElementById('bs-res-revert');
const bsOptimizeEmulator = document.getElementById('bs-optimize-emulator');
// Selecionar apenas botões de toggle dentro do painel do emulador para evitar conflitos
const presetToggleButtons = document.querySelectorAll('#panel-emulator [data-toggle]');
const heroMachineName = document.getElementById('hero-machine-name');
const heroOsLabel = document.getElementById('hero-os');
const heroCpuTag = document.getElementById('hero-cpu-tag');
const heroGpuTag = document.getElementById('hero-gpu-tag');
const heroRamTag = document.getElementById('hero-ram-tag');
const summaryCpuUsage = document.getElementById('summary-cpu-usage');
const summaryCpuName = document.getElementById('summary-cpu-name');
const summaryCpuCores = document.getElementById('summary-cpu-cores');
const summaryGpuUsage = document.getElementById('summary-gpu-usage');
const summaryGpuName = document.getElementById('summary-gpu-name');
const summaryGpuVram = document.getElementById('summary-gpu-vram');
const summaryMemoryUsage = document.getElementById('summary-memory-usage');
const summaryMemoryProgress = document.getElementById('summary-memory-progress');
const summaryMemoryFree = document.getElementById('summary-memory-free');
const summaryStorageUsage = document.getElementById('summary-storage-usage');
const summaryStorageProgress = document.getElementById('summary-storage-progress');
const summaryStorageUsed = document.getElementById('summary-storage-used');
const summaryStorageFree = document.getElementById('summary-storage-free');
const summaryStorageMount = document.getElementById('summary-storage-mount');
const summaryStorageDevices = document.getElementById('summary-storage-devices');
const summaryProcessRunning = document.getElementById('summary-process-running');
const summaryProcessTotal = document.getElementById('summary-process-total');
const summaryProcessMeta = document.getElementById('summary-process-meta');
const summaryOsLabel = document.getElementById('summary-os-label');
const internetSpeedStatus = document.getElementById('internet-speed-status');
const internetDownload = document.getElementById('internet-download');
const internetUpload = document.getElementById('internet-upload');
const internetPing = document.getElementById('internet-ping');
const internetSpeedTestBtn = document.getElementById('internet-speed-test-btn');
const optimizationGauge = document.getElementById('optimization-gauge');
const gaugeValue = document.getElementById('gauge-value');
const gaugeStatusLabel = document.getElementById('gauge-status-label');
const activateServicesButton = document.getElementById('activate-services');
let optimizeSimpleButton = document.getElementById('optimize-simple');
const subscribersCta = document.getElementById('subscribers-cta');
const optimizeOverlay = document.getElementById('optimize-overlay');
const optimizeProgressBar = document.getElementById('optimize-progress-bar');
const optimizeProgressPercent = document.getElementById('optimize-progress-percent');
const optimizeCounts = document.getElementById('optimize-counts');
const optimizeTitle = document.getElementById('optimize-title');
const optimizeSubtitle = document.getElementById('optimize-subtitle');
const optimizeResults = document.getElementById('optimize-results');
const optimizeLog = document.getElementById('optimize-log');
const optimizeTips = document.getElementById('optimize-tips');
const optimizeRetryAdmin = document.getElementById('optimize-retry-admin');
let optimizeCancelButton = document.getElementById('optimize-cancel');
const optimizeCloseButton = document.getElementById('optimize-close');
const optimizeSummary = document.getElementById('optimize-summary');
const optimizeSummaryStats = document.getElementById('optimize-summary-stats');
const optimizeRestartPcButton = document.getElementById('optimize-restart-pc');
const optimizeContinueButton = document.getElementById('optimize-continue');
const cancelConfirmModal = document.getElementById('cancel-confirm-modal');
const cancelConfirmExecuted = document.getElementById('cancel-confirm-executed');
const cancelConfirmCancelBtn = document.getElementById('cancel-confirm-cancel');
const cancelConfirmContinueBtn = document.getElementById('cancel-confirm-continue');
const openDevToolsButton = document.getElementById('open-devtools');
const toggleLogsPanelButton = document.getElementById('toggle-logs-panel');
let logsPanel = document.getElementById('logs-panel');
let logsContent = document.getElementById('logs-content');
let clearLogsButton = document.getElementById('clear-logs');
let closeLogsPanelButton = document.getElementById('close-logs-panel');

// Tooltip bubble global (para todos os elementos .tooltip-icon)
let activeTooltipBubble = null;

function showTooltipBubble(target, text) {
  if (!text) return;

  // Remover tooltip anterior
  if (activeTooltipBubble && activeTooltipBubble.parentNode) {
    activeTooltipBubble.parentNode.removeChild(activeTooltipBubble);
  }

  const bubble = document.createElement('div');
  bubble.className = 'tooltip-bubble';
  // Usar innerHTML para suportar quebras de linha, mas escapar HTML para segurança
  const lines = text.split('\n');
  bubble.innerHTML = lines.map(line => line.trim() ? line : '<br>').join('<br>');
  document.body.appendChild(bubble);

  const rect = target.getBoundingClientRect();
  const padding = 8;
  let top = rect.top - bubble.offsetHeight - padding;
  let left = rect.left;

  if (top < 8) {
    top = rect.bottom + padding;
    bubble.style.transformOrigin = 'top left';
  }

  if (left + bubble.offsetWidth > window.innerWidth - 8) {
    left = window.innerWidth - bubble.offsetWidth - 8;
  }

  bubble.style.top = `${top}px`;
  bubble.style.left = `${left}px`;

  activeTooltipBubble = bubble;
}

function hideTooltipBubble() {
  if (activeTooltipBubble && activeTooltipBubble.parentNode) {
    activeTooltipBubble.parentNode.removeChild(activeTooltipBubble);
  }
  activeTooltipBubble = null;
}

// Tooltip bubble com imagem
let activeTooltipImageBubble = null;

function showTooltipImageBubble(target, imagePath) {
  if (!imagePath) return;

  // Remover tooltip anterior
  if (activeTooltipImageBubble && activeTooltipImageBubble.parentNode) {
    activeTooltipImageBubble.parentNode.removeChild(activeTooltipImageBubble);
  }

  const bubble = document.createElement('div');
  bubble.className = 'tooltip-bubble-image';
  
  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = 'Ajuda';
  img.style.maxWidth = '500px';
  img.style.maxHeight = '400px';
  
  img.onerror = () => {
    bubble.textContent = 'Imagem não encontrada';
    positionTooltipBubble(bubble, target);
  };
  
  img.onload = () => {
    positionTooltipBubble(bubble, target);
  };
  
  bubble.appendChild(img);
  document.body.appendChild(bubble);
  
  // Posicionar imediatamente (será ajustado quando a imagem carregar)
  positionTooltipBubble(bubble, target);

  activeTooltipImageBubble = bubble;
}

function positionTooltipBubble(bubble, target) {
  const rect = target.getBoundingClientRect();
  const padding = 8;
  let top = rect.top - bubble.offsetHeight - padding;
  let left = rect.left;

  if (top < 8) {
    top = rect.bottom + padding;
    bubble.style.transformOrigin = 'top left';
  }

  if (left + bubble.offsetWidth > window.innerWidth - 8) {
    left = window.innerWidth - bubble.offsetWidth - 8;
  }

  bubble.style.top = `${top}px`;
  bubble.style.left = `${left}px`;
}

function hideTooltipImageBubble() {
  if (activeTooltipImageBubble && activeTooltipImageBubble.parentNode) {
    activeTooltipImageBubble.parentNode.removeChild(activeTooltipImageBubble);
  }
  activeTooltipImageBubble = null;
}

// Função para inicializar tooltips com imagem
function initializeImageTooltips() {
  try {
    const tooltipImageIcons = document.querySelectorAll('.tooltip-icon-red[data-tooltip-image]');
    console.log('[UI] Tooltips com imagem encontrados:', tooltipImageIcons.length);
    
    tooltipImageIcons.forEach((icon) => {
      const imagePath = icon.getAttribute('data-tooltip-image');
      if (!imagePath) {
        console.warn('[UI] Tooltip sem caminho de imagem');
        return;
      }

      // Remover listeners anteriores se existirem (evitar duplicação)
      const newIcon = icon.cloneNode(true);
      if (icon.parentNode) {
        icon.parentNode.replaceChild(newIcon, icon);
      }

      newIcon.addEventListener('mouseenter', async () => {
        try {
          console.log('[UI] Mostrando tooltip com imagem:', imagePath);
          // Resolver caminho da imagem usando a função do sistema
          let fullImagePath = imagePath;
          if (window.y20 && window.y20.emulatorResolveImage && !imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
            try {
              const resolved = await window.y20.emulatorResolveImage(imagePath);
              if (resolved && resolved.success && resolved.path) {
                fullImagePath = resolved.path;
              } else if (resolved && resolved.success && resolved.url) {
                fullImagePath = resolved.url;
              } else {
                // Fallback: usar caminho relativo
                fullImagePath = `../../${imagePath}`;
              }
            } catch (error) {
              console.warn('[UI] Erro ao resolver imagem:', error);
              // Fallback: usar caminho relativo
              fullImagePath = `../../${imagePath}`;
            }
          } else if (!imagePath.startsWith('http') && !imagePath.startsWith('data:')) {
            // Fallback: usar caminho relativo
            fullImagePath = `../../${imagePath}`;
          }
          console.log('[UI] Caminho final da imagem:', fullImagePath);
          showTooltipImageBubble(newIcon, fullImagePath);
        } catch (error) {
          console.warn('[UI] Erro ao carregar imagem do tooltip:', error);
        }
      });

      newIcon.addEventListener('mouseleave', () => {
        hideTooltipImageBubble();
      });

      newIcon.addEventListener('blur', () => {
        hideTooltipImageBubble();
      });
    });
  } catch (error) {
    console.warn('[UI] Erro ao inicializar tooltips com imagem:', error);
  }
}

// Sistema de captura de logs
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;

function addLogEntry(message, type = 'log') {
  // Garantir que os elementos estejam inicializados
  if (!logsContent) {
    const panel = document.getElementById('logs-panel');
    if (panel) {
      const content = panel.querySelector('#logs-content') || panel.querySelector('.logs-panel-content');
      if (content) {
        logsContent = content;
      }
    }
  }
  
  if (!logsContent) {
    // Se ainda não existe, criar o painel dinamicamente
    createLogsPanel();
    logsContent = document.getElementById('logs-content');
  }
  
  if (!logsContent) {
    console.error('Não foi possível criar o painel de logs');
    return;
  }
  
  const logEntry = document.createElement('div');
  logEntry.className = `log-entry ${type}`;
  
  const timestamp = new Date().toLocaleTimeString('pt-BR');
  const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : type === 'info' ? 'ℹ️' : '📝';
  logEntry.textContent = `[${timestamp}] ${prefix} ${message}`;
  
  logsContent.appendChild(logEntry);
  
  // Auto-scroll para o final
  logsContent.scrollTop = logsContent.scrollHeight;
  
  // Limitar a 200 entradas para não sobrecarregar (reduzido de 500)
  while (logsContent.children.length > 200) {
    logsContent.removeChild(logsContent.firstChild);
  }
}

function createLogsPanel() {
  // Usar painel existente no HTML se existir
  let panel = document.getElementById('logs-panel');
  
  if (!panel) {
    // Criar painel de logs se não existir
    panel = document.createElement('div');
    panel.id = 'logs-panel';
    panel.className = 'logs-panel';
    panel.innerHTML = `
      <div class="logs-panel-header">
        <h3>📋 Logs do Sistema</h3>
        <div class="logs-panel-actions">
          <button class="ghost mini" id="clear-logs">Limpar</button>
          <button class="ghost mini" id="close-logs-panel">✕</button>
        </div>
      </div>
      <div class="logs-panel-content" id="logs-content">
        <div class="log-entry">Sistema iniciado...</div>
      </div>
    `;
    document.body.appendChild(panel);
  }
  
  // Atualizar referências globais
  logsPanel = panel;
  logsContent = document.getElementById('logs-content');
  clearLogsButton = document.getElementById('clear-logs');
  closeLogsPanelButton = document.getElementById('close-logs-panel');

  // Inicializar tooltips personalizados para todos os ícones de ajuda
  try {
    const tooltipIcons = document.querySelectorAll('.tooltip-icon');
    tooltipIcons.forEach((icon) => {
      const title = icon.getAttribute('title') || icon.getAttribute('data-tooltip');
      if (!title) return;

      // Guardar o texto em data-tooltip e remover title para não usar tooltip padrão
      icon.setAttribute('data-tooltip', title);
      icon.removeAttribute('title');

      icon.addEventListener('mouseenter', () => {
        const text = icon.getAttribute('data-tooltip');
        showTooltipBubble(icon, text);
      });

      icon.addEventListener('mouseleave', () => {
        hideTooltipBubble();
      });

      icon.addEventListener('blur', () => {
        hideTooltipBubble();
      });
    });

    // Inicializar tooltips com imagem (ícones vermelhos)
    initializeImageTooltips();
  } catch (tooltipError) {
    console.warn('[UI] Erro ao inicializar tooltips personalizados:', tooltipError);
  }

  return panel;
}

// NÃO interceptar console.log/warn/info - apenas usar addLogEntry() manualmente para ações do usuário
// Os console.log originais continuam funcionando normalmente no DevTools

// Inicializar painel de logs (sem adicionar logs automáticos - apenas quando ações forem executadas)
setTimeout(() => {
  try {
    initializeLogsPanel();
    // Limpar logs antigos ao iniciar o painel
    if (logsContent) {
      logsContent.innerHTML = '';
    }
    // Não adicionar log inicial aqui - será adicionado quando o app abrir
    // Não abrir painel automaticamente - usuário pode abrir com Ctrl+Shift+L
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Erro ao inicializar painel de logs:', errorMsg, errorStack || error);
    // Tentar adicionar ao painel se possível
    try {
      addLogEntry(`Erro ao inicializar painel: ${errorMsg}`, 'error');
    } catch (e) {
      // Se não conseguir adicionar ao painel, pelo menos logar no console
      originalConsoleError.call(console, 'Erro crítico ao inicializar logs:', e);
    }
  }
}, 500);

let optimizeBasicButton = null;
let optimizeVipButton = null;
let vipModal = null;
let vipOptionsContainer = null;
let vipConfirmButton = null;
let vipCancelButton = null;
let vipPresetOptions = [];
let optimizationControlsInitialized = false;
let vipOnConfirm = null;
const configCatalogButtons = document.querySelectorAll('.config-catalog button[data-view]');
const configPanels = Array.from(document.querySelectorAll('.config-panel'));
let activeConfigPanel = 'panel-emulator';
let activeOptimizationPanel = 'panel-basic-settings';
const offlineOverlay = document.getElementById('offline-overlay');
const offlineRetryButton = document.getElementById('offline-retry');
const vipOfflineBlock = document.getElementById('vip-offline-block');
const vipOfflineRetryButton = document.getElementById('vip-offline-retry');
let apiOfflineRetryBtn = null; // Banner API offline - botão retry
const mouseFixState = {
  loading: false,
  loaded: false,
  apply: [],
  executed: new Set()
};

const inputLagState = {
  loading: false,
  loaded: false,
  apply: [],
  revert: [],
  executed: new Set() // Armazenar IDs dos scripts já executados nesta sessão
};

const powerPlanState = {
  loading: false,
  loaded: false,
  apply: [],
  executed: new Set() // Armazenar IDs dos scripts já executados nesta sessão
};

const importantScriptsState = {
  loading: false,
  loaded: false,
  items: []
};

// Estados para scripts das pastas de otimização
const optimizationSimpleState = {
  loading: false,
  loaded: false,
  items: []
};

const optimizationBasicState = {
  loading: false,
  loaded: false,
  items: []
};

const optimizationVipState = {
  loading: false,
  loaded: false,
  items: []
};
// Função para gerar descrições amigáveis baseadas no nome do script
function getScriptDescription(entry) {
  const name = entry.name.toLowerCase();
  
  // Mapeamento de palavras-chave para descrições amigáveis
  const descriptions = {
    // Power Plan
    'dynamic': 'Otimiza energia para melhor desempenho dinâmico',
    'boost': 'Aumenta desempenho e velocidade do sistema',
    'performance': 'Máximo desempenho e velocidade',
    'powerx': 'Configuração personalizada de energia',
    'ultra': 'Desempenho extremo e otimizado',
    'game': 'Modo otimizado para jogos',
    'turbo': 'Desempenho turbo ativado',
    'revision': 'Revisão extrema de configurações',
    'extreme': 'Configurações extremas de desempenho',
    
    // Cleanup
    'limpeza': 'Limpeza e otimização do sistema',
    'cleanup': 'Limpeza de arquivos temporários',
    'temp': 'Remoção de arquivos temporários',
    'cache': 'Limpeza de cache do sistema',
    'disco': 'Otimização de disco',
    'registro': 'Limpeza do registro',
    'logs': 'Remoção de logs do sistema',
    
    // Disable Windows
    'desativar': 'Desativa recursos do Windows',
    'disable': 'Desativa recursos específicos',
    'desabilitar': 'Desabilita funcionalidades',
    'telemetria': 'Desativa coleta de dados',
    'update': 'Desativa atualizações automáticas',
    'cortana': 'Desativa assistente Cortana',
    'defender': 'Desativa Windows Defender',
    
    // Input Lag
    'delay': 'Remove delay e latência',
    'input': 'Otimiza entrada de dados',
    'mouse': 'Otimiza mouse e precisão',
    'keyboard': 'Otimiza teclado',
    'latency': 'Reduz latência do sistema',
  };
  
  // Procurar palavras-chave no nome
  for (const [keyword, description] of Object.entries(descriptions)) {
    if (name.includes(keyword)) {
      return description;
    }
  }
  
  // Se não encontrou, retornar descrição genérica baseada no tipo
  const genericDescriptions = {
    'bat': 'Script de otimização do sistema',
    'reg': 'Modificação de registro do Windows',
    'ps1': 'Script PowerShell de configuração'
  };
  
  return genericDescriptions[entry.type?.toLowerCase()] || 'Script de otimização';
}

const cleanupWindowsState = {
  loading: false,
  loaded: false,
  apply: [],
  executed: new Set() // Armazenar IDs dos scripts já executados nesta sessão
};

const disableWindowsState = {
  loading: false,
  loaded: false,
  apply: [],
  revert: [],
  executed: new Set(), // Armazenar IDs dos scripts já executados nesta sessão
  executedNames: new Map() // Mapear IDs executados para nomes (para reverter)
};

const boosterRobustaState = {
  loading: false,
  loaded: false,
  items: [],
  executed: new Set() // Armazenar IDs dos scripts já executados nesta sessão
};

// Funções de input lag serão definidas mais abaixo (linha ~1590)

// Sistema de Login - Declarar variáveis no topo para evitar erros de inicialização
let loginOverlay = null;
let appShell = null;
let keyInput = null;
let loginButton = null;
let loginStatus = null;
let loginStatusMessage = null;
let keyValidationInterval = null;
let systemInfoInterval = null;
let userAccessUpdateInterval = null;
let isRefreshingSystemInfo = false; // Flag para evitar chamadas concorrentes

let currentLanguage = 'pt-BR';
let isNeonEnabled = true;
let currentPalette = 'royal';
let currentOptimizations = {};
const blueStacksState = {
  detected: false,
  status: null,
  currentValues: {},
  basePath: null,
  verified: false // Estado de verificação da pasta
};

let optimizationOverlayVisible = false;
let optimizationTotalSteps = 0;
let optimizationCancelled = false;
let optimizationFinished = false;
let optimizationSummary = { applied: 0, failed: 0, skipped: 0 };
let optimizationEntries = [];
let lastOptimizationContext = { type: null, folderName: null };

// URL da API Cloudflare (para otimizações e licenças)
// IMPORTANTE: Configure a URL correta da sua API Cloudflare aqui
// Exemplo: 'https://y20-booster-api.seu-usuario.workers.dev'
// Produção: domínio real do Worker na Cloudflare
// ATUALMENTE: o subdomínio workers.dev da conta está como
// "httpsy20-booster-apiy20-booster-apiworkersdev", então a URL fica:
// https://y20-booster-api.httpsy20-booster-apiy20-booster-apiworkersdev.workers.dev
// Se você trocar o subdomínio no painel da Cloudflare, mude essa constante também.
const CLOUDFLARE_API_URL = 'https://y20-booster-api.httpsy20-booster-apiy20-booster-apiworkersdev.workers.dev';
const CLOUDFLARE_CLIENT_TOKEN = 'client_Y20_2024_secure_token';

/**
 * Função helper para fazer requisições à API Cloudflare
 */
async function cloudflareApiRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      headers: {
        'X-Token': CLOUDFLARE_CLIENT_TOKEN,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(`${CLOUDFLARE_API_URL}${endpoint}`, config);
    const result = await response.json();
    
    if (response.ok && result.success !== false) {
      return { success: true, data: result };
    } else {
      return { success: false, error: result.message || 'Erro na requisição', status: response.status };
    }
  } catch (error) {
    console.error(`[Cloudflare API] Erro na requisição ${method} ${endpoint}:`, error.message);
    return { success: false, error: error.message };
  }
}

function cacheOptimizationElements() {
  // optimizeBasicButton e optimizeVipButton já declarados como let
  if (!optimizeBasicButton) optimizeBasicButton = document.getElementById('optimize-basic');
  if (!optimizeVipButton) optimizeVipButton = document.getElementById('optimize-vip');
  if (!optimizeSimpleButton) optimizeSimpleButton = document.getElementById('optimize-simple');
  vipModal = document.getElementById('vip-modal');
  vipOptionsContainer = document.getElementById('vip-options');
  vipConfirmButton = document.getElementById('vip-confirm');
  vipCancelButton = document.getElementById('vip-cancel');
}


function updateOptimizeCounts() {
  if (!optimizeCounts) return;
  const parts = [];
  const { applied, failed, skipped } = optimizationSummary;
  if (applied) {
    parts.push(`${applied} aplicado${applied > 1 ? 's' : ''}`);
  }
  if (failed) {
    parts.push(`${failed} ${failed > 1 ? 'falharam' : 'falhou'}`);
  }
  if (skipped) {
    parts.push(`${skipped} sem admin${skipped > 1 ? '' : ''}`);
  }
  optimizeCounts.textContent = parts.length ? parts.join(' • ') : '';
}

const optimizationStatusText = {
  pending: 'Aguardando...',
  running: 'Executando...',
  done: 'Pronto!',
  error: 'Falhou!',
  skipped: 'Ignorado'
};

const optimizationStatusSuffix = {
  pending: '⏳',
  running: '⏳',
  done: '✓',
  error: '⚠️',
  skipped: 'ℹ️'
};

function renderOptimizationEntries() {
  if (!optimizeResults) {
    return;
  }
  optimizeResults.innerHTML = '';
  const fragment = document.createDocumentFragment();
  optimizationEntries.forEach((entry) => {
    const li = document.createElement('li');
    li.className = `optimize-log-entry ${entry.status}`;
    const labelSpan = document.createElement('span');
    labelSpan.className = 'label';
    labelSpan.textContent = entry.label || entry.path || 'Script';
    const statusSpan = document.createElement('span');
    statusSpan.className = 'status';
    const statusText = optimizationStatusText[entry.status] || '';
    const suffix = optimizationStatusSuffix[entry.status] || '';
    statusSpan.textContent = suffix ? `${statusText} ${suffix}` : statusText;
    li.appendChild(labelSpan);
    li.appendChild(statusSpan);
    if (entry.message) {
      const messageSpan = document.createElement('span');
      messageSpan.className = 'message';
      messageSpan.textContent = entry.message;
      li.appendChild(messageSpan);
    }
    fragment.appendChild(li);
  });
  optimizeResults.appendChild(fragment);
}

function resetOptimizationEntries() {
  optimizationEntries.length = 0;
  renderOptimizationEntries();
}

function setOptimizationEntry(path, label, status = 'pending', message) {
  if (!path) {
    return;
  }
  let entry = optimizationEntries.find((item) => item.path === path);
  if (!entry) {
    entry = { path, label: label || path, status: 'pending', message: '' };
    optimizationEntries.push(entry);
  }
  if (label) {
    entry.label = label;
  }
  if (status) {
    entry.status = status;
  }
  if (message) {
    entry.message = message;
  }
  renderOptimizationEntries();
}

function showOptimizeOverlay(optimizationType = null) {
  if (!optimizeOverlay) return;
  optimizationOverlayVisible = true;
  optimizationTotalSteps = 0;
  optimizationCancelled = false;
  optimizationFinished = false;
  optimizationSummary = { applied: 0, failed: 0, skipped: 0 };
  updateOptimizeCounts();
  resetOptimizationEntries();
  optimizeOverlay.hidden = false;
  optimizeOverlay.classList.remove('error', 'cancelled');
  optimizeOverlay.classList.add('show');
  if (optimizeProgressBar) optimizeProgressBar.style.width = '0%';
  if (optimizeProgressPercent) optimizeProgressPercent.textContent = '0%';
  
  // Definir título baseado no tipo de otimização
  let titleText = 'Aplicando otimização';
  if (optimizationType === 'simple' || optimizationType === 'Simples') {
    titleText = 'Otimizando Simples';
  } else if (optimizationType === 'basic' || optimizationType === 'Básico' || optimizationType === 'Basico') {
    titleText = 'Otimizando Básico';
  } else if (optimizationType === 'vip' || optimizationType === 'VIP') {
    titleText = 'Otimizando VIP';
  }
  
  if (optimizeTitle) optimizeTitle.textContent = titleText;
  if (optimizeSubtitle) optimizeSubtitle.textContent = 'Aguarde, a otimização está em andamento...';
  if (optimizeTips) optimizeTips.hidden = true;
  if (optimizeSummary) optimizeSummary.hidden = true;
  if (optimizeLog) optimizeLog.hidden = false;
  if (optimizeResults) optimizeResults.innerHTML = '';
  
  // Garantir que o botão de cancelar sempre esteja liberado e funcional
  const cancelBtn = document.getElementById('optimize-cancel');
  if (cancelBtn) {
    cancelBtn.hidden = false;
    cancelBtn.disabled = false;
    cancelBtn.style.opacity = '1';
    cancelBtn.style.cursor = 'pointer';
    cancelBtn.removeAttribute('data-blocked');
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.title = '';
  }
  if (optimizeCancelButton) {
    optimizeCancelButton.hidden = false;
    optimizeCancelButton.disabled = false;
    optimizeCancelButton.style.opacity = '1';
    optimizeCancelButton.style.cursor = 'pointer';
    optimizeCancelButton.removeAttribute('data-blocked');
    optimizeCancelButton.textContent = 'Cancelar';
    optimizeCancelButton.title = '';
  }
  if (optimizeCloseButton) optimizeCloseButton.hidden = true;
}

function updateOptimizeOverlay(percent, message) {
  if (!optimizeOverlay) return;
  if (typeof percent === 'number') {
    const safePercent = Math.max(0, Math.min(100, percent));
    if (optimizeProgressBar) optimizeProgressBar.style.width = `${safePercent}%`;
    if (optimizeProgressPercent) optimizeProgressPercent.textContent = `${safePercent}%`;
  }
  if (message && optimizeSubtitle) {
    optimizeSubtitle.textContent = message;
  }
}

function hideOptimizeOverlay(delay = 0) {
  if (!optimizeOverlay) return;
  const executeHide = () => {
    optimizationOverlayVisible = false;
    optimizeOverlay.classList.remove('show');
    optimizeOverlay.hidden = true;
  };
  if (delay > 0) {
    setTimeout(executeHide, delay);
  } else {
    executeHide();
  }
}

function showToast(message, type = 'info') {
  toastElement.textContent = message;
  toastElement.classList.remove('show');
  toastElement.dataset.type = type;
  toastElement.hidden = false;
  requestAnimationFrame(() => {
    toastElement.classList.add('show');
  });
  setTimeout(() => {
    toastElement.classList.remove('show');
    setTimeout(() => {
      toastElement.hidden = true;
    }, 300);
  }, 3500);
}

function updateBlueStacksAvailability(result) {
  if (!bsBlocks.length) {
    return;
  }
  
  // Se result for null, desabilitar todos os controles (ainda não foi verificado)
  if (!result) {
    bsBlocks.forEach((block) => {
      block.classList.add('disabled');
      block.querySelectorAll('[data-bs-control]').forEach((control) => {
        control.disabled = true;
      });
    });
    return;
  }
  
  const hasConfig = !!(result && result.status && result.status.config);
  const hasMapper = !!(result && result.status && (result.status.delayPrimary || result.status.delaySecondary));

  bsBlocks.forEach((block) => {
    const requirement = block.dataset.require;
    const available = requirement === 'mapper' ? hasMapper : hasConfig;
    block.classList.toggle('disabled', !available);
    block.querySelectorAll('[data-bs-control]').forEach((control) => {
      control.disabled = !available;
    });
  });
}

function updateBlueStacksFields(values = {}) {
  if (bsFpsInput && values.maxFps != null) bsFpsInput.value = values.maxFps;
  if (bsDeviceBrandInput && values.deviceBrand != null) bsDeviceBrandInput.value = values.deviceBrand;
  if (bsDeviceManufacturerInput && values.deviceManufacturer != null) bsDeviceManufacturerInput.value = values.deviceManufacturer;
  if (bsDeviceModelInput && values.deviceModel != null) bsDeviceModelInput.value = values.deviceModel;
  if (bsDpiInput && values.dpi != null) bsDpiInput.value = values.dpi;
  if (bsWidthInput && values.fbWidth != null) bsWidthInput.value = values.fbWidth;
  if (bsHeightInput && values.fbHeight != null) bsHeightInput.value = values.fbHeight;
  if (bsTweaksInput && values.tweaks != null) bsTweaksInput.value = values.tweaks;
  if (bsDelayInput && values.exclusiveDelay != null) bsDelayInput.value = values.exclusiveDelay;
}

// Função para mostrar modal de aviso genérico
function showBlueStacksWarningModal(message, onConfirm, applyButton = null) {
  const modal = document.getElementById('bluestacks-warning-modal');
  const messageEl = document.getElementById('bluestacks-warning-message');
  const okButton = document.getElementById('bluestacks-warning-ok');
  
  if (!modal || !messageEl || !okButton) return;
  
  messageEl.innerHTML = message;
  
  // Remover listeners anteriores
  const newOkButton = okButton.cloneNode(true);
  okButton.parentNode.replaceChild(newOkButton, okButton);
  
  newOkButton.addEventListener('click', async () => {
    modal.hidden = true;
    
    // Se houver um botão de aplicar, mostrar animação nele
    if (applyButton) {
      const originalHTML = applyButton.innerHTML;
      const originalStyles = {
        background: applyButton.style.background,
        boxShadow: applyButton.style.boxShadow,
        transform: applyButton.style.transform,
        cursor: applyButton.style.cursor
      };
      
      // Aplicar animação de "aplicando"
      applyButton.disabled = true;
      applyButton.style.position = 'relative';
      applyButton.style.overflow = 'hidden';
      applyButton.style.background = 'linear-gradient(135deg, rgba(112, 88, 255, 1), rgba(88, 68, 220, 1))';
      applyButton.style.cursor = 'wait';
      applyButton.style.boxShadow = '0 0 25px rgba(112, 88, 255, 0.8), 0 4px 20px rgba(112, 88, 255, 0.5)';
      applyButton.style.transition = 'all 0.4s ease';
      applyButton.style.transform = 'scale(0.98)';
      
      applyButton.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 10px; position: relative; z-index: 10;"><span style="display: inline-block; animation: script-spin 0.8s linear infinite; font-size: 16px;">⚙️</span><span style="font-weight: 600;">Aplicando...</span></span>';
      
      // Overlay de brilho animado
      const loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'script-executing-overlay';
      loadingOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent 0%, 
          rgba(255, 255, 255, 0.6) 30%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(255, 255, 255, 0.6) 70%,
          transparent 100%);
        animation: script-loading-shimmer 3s ease-in-out infinite;
        pointer-events: none;
        z-index: 1;
      `;
      applyButton.appendChild(loadingOverlay);
      
      // Adicionar animações CSS se não existirem
      if (!document.getElementById('script-executing-animations')) {
        const style = document.createElement('style');
        style.id = 'script-executing-animations';
        style.textContent = `
          @keyframes script-loading-shimmer {
            0% { 
              left: -100%;
              opacity: 0;
            }
            20% {
              opacity: 0.8;
            }
            50% {
              opacity: 1;
            }
            80% {
              opacity: 0.8;
            }
            100% { 
              left: 100%;
              opacity: 0;
            }
          }
          @keyframes script-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }
      
      // Forçar reflow para garantir que a animação comece
      void applyButton.offsetHeight;
      
      // Aguardar um pouco para garantir que a animação seja visível
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Executar a função de confirmação
      try {
        if (onConfirm && typeof onConfirm === 'function') {
          await onConfirm();
        }
        
        // Aguardar um pouco mais para garantir que a animação seja visível
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remover overlay
        if (loadingOverlay && loadingOverlay.parentNode) {
          loadingOverlay.remove();
        }
        
        // Restaurar estilos originais com transição suave
        applyButton.style.transition = 'all 0.4s ease';
        applyButton.style.background = '';
        applyButton.style.boxShadow = '';
        applyButton.style.transform = '';
        applyButton.removeAttribute('data-executing');
        
        // Aguardar transição antes de continuar
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Restaurar texto original
        applyButton.innerHTML = originalHTML;
        applyButton.disabled = false;
        applyButton.style.cursor = '';
      } catch (error) {
        // Em caso de erro, remover overlay e restaurar
        if (loadingOverlay && loadingOverlay.parentNode) {
          loadingOverlay.remove();
        }
        applyButton.style.background = '';
        applyButton.style.boxShadow = '';
        applyButton.style.transform = '';
        applyButton.style.cursor = '';
        applyButton.innerHTML = originalHTML;
        applyButton.disabled = false;
        throw error;
      }
    } else {
      // Se não houver botão, apenas executar
      if (onConfirm && typeof onConfirm === 'function') {
        onConfirm();
      }
    }
  });
  
  modal.hidden = false;
}

// Função para mostrar modal de seleção de emulador
function showBlueStacksSelectorModal(instances) {
  const modal = document.getElementById('bluestacks-selector-modal');
  const listContainer = document.getElementById('bluestacks-instances-list');
  const cancelButton = document.getElementById('bluestacks-selector-cancel');
  
  if (!modal || !listContainer) return;
  
  // Limpar lista anterior
  listContainer.innerHTML = '';
  
  // Criar cards para cada instância
  instances.forEach((instance) => {
    const card = document.createElement('div');
    card.className = 'bluestacks-instance-card';
    card.style.cssText = `
      padding: 16px;
      background: rgba(112, 88, 255, 0.1);
      border: 2px solid rgba(112, 88, 255, 0.3);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    `;
    
    const statusIcons = [];
    if (instance.hasConfig) statusIcons.push('✅ Config');
    if (instance.hasDelayPrimary) statusIcons.push('✅ InputMapper');
    if (instance.hasDelaySecondary) statusIcons.push('✅ UserFiles');
    
    card.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div>
          <h3 style="margin: 0 0 8px 0; color: var(--accent); font-size: 16px;">${instance.displayName}</h3>
          <p style="margin: 0; font-size: 12px; color: var(--text-muted);">${instance.basePath}</p>
          <div style="margin-top: 8px; display: flex; gap: 8px; flex-wrap: wrap;">
            ${statusIcons.map(icon => `<span style="font-size: 11px;">${icon}</span>`).join('')}
          </div>
        </div>
        <div style="font-size: 24px;">→</div>
      </div>
    `;
    
    card.addEventListener('click', async () => {
      try {
        modal.hidden = true;
        bsVerifyButton.disabled = true;
        bsStatusLabel.textContent = 'Configurando emulador selecionado...';
        
        // Definir o caminho selecionado
        const result = await window.y20.bluestacksSetPath(instance.basePath);
        
        if (result && result.found) {
          // Fazer nova verificação com o caminho selecionado
          await verifyBlueStacks(true);
        } else {
          showToast('Erro ao configurar emulador selecionado.', 'error');
          bsVerifyButton.disabled = false;
        }
      } catch (error) {
        console.error('[BlueStacks] Erro ao selecionar emulador:', error);
        showToast(error.message || 'Erro ao selecionar emulador.', 'error');
        bsVerifyButton.disabled = false;
      }
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.background = 'rgba(112, 88, 255, 0.2)';
      card.style.borderColor = 'rgba(112, 88, 255, 0.6)';
      card.style.transform = 'translateX(4px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.background = 'rgba(112, 88, 255, 0.1)';
      card.style.borderColor = 'rgba(112, 88, 255, 0.3)';
      card.style.transform = 'translateX(0)';
    });
    
    listContainer.appendChild(card);
  });
  
  // Event listener para cancelar
  if (cancelButton) {
    cancelButton.onclick = () => {
      modal.hidden = true;
      bsVerifyButton.disabled = false;
      bsStatusLabel.textContent = 'Seleção cancelada.';
      bsStatusLabel.classList.add('warn');
    };
  }
  
  modal.hidden = false;
}

async function verifyBlueStacks(showToastMessage = true, forceFullCheck = false) {
  if (!bsVerifyButton || !bsStatusLabel) return;
  
  let overlay = null;
  const originalHTML = bsVerifyButton.innerHTML;
  
  try {
    bsVerifyButton.disabled = true;
    
    // Adicionar animação de execução
    bsVerifyButton.style.position = 'relative';
    bsVerifyButton.style.overflow = 'hidden';
    bsVerifyButton.innerHTML = `
      <span class="button-icon" style="animation: script-spin 1s linear infinite;">⚙️</span>
      <span>Verificando...</span>
    `;
    
    // Criar overlay de shimmer
    overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: script-loading-shimmer 2s infinite;
      pointer-events: none;
    `;
    bsVerifyButton.appendChild(overlay);
    
    updateBlueStacksAvailability(null);
    bsStatusLabel.classList.remove('warn', 'success');
    bsStatusLabel.textContent = 'Verificando diretórios...';

    // Se for uma verificação forçada (botão Verificar), limpar cache primeiro
    if (forceFullCheck) {
      // Limpar cache para forçar verificação completa
      await window.y20.bluestacksSetPath(null);
    }
    
    const result = await window.y20.bluestacksDetect();
    
    // Remover overlay
    if (overlay && overlay.parentNode) {
      overlay.remove();
    }
    
    // Se houver múltiplas instâncias, mostrar modal de seleção
    if (result && result.multiple && result.instances && result.instances.length > 1) {
      bsVerifyButton.innerHTML = originalHTML;
      bsVerifyButton.disabled = false;
      showBlueStacksSelectorModal(result.instances);
      return;
    }
    
    if (!result || !result.found) {
      blueStacksState.detected = false;
      blueStacksState.status = null;
      blueStacksState.basePath = null;
      blueStacksState.currentValues = {};
      blueStacksState.verified = false;
      sessionStorage.removeItem('bsVerified');
      bsStatusLabel.textContent = 'BlueStacks não encontrado. Ajuste manualmente e tente novamente.';
      bsStatusLabel.classList.add('warn');
      updateBlueStacksAvailability(null);
      if (showToastMessage) {
        showToast('BlueStacks não encontrado. Confira se o emulador está instalado.', 'error');
      }
      return;
    }

    blueStacksState.detected = true;
    blueStacksState.status = result.status || {};
    blueStacksState.basePath = result.basePath;
    blueStacksState.currentValues = result.currentValues || {};
    blueStacksState.verified = true; // Marcar como verificado
    
    // Salvar estado de verificação no sessionStorage para persistir ao mudar de slot
    sessionStorage.setItem('bsVerified', 'true');

    const hasConfig = !!result.status.config;
    const hasMapper = !!(result.status.delayPrimary || result.status.delaySecondary);
    const statusInfo = [
      `Base: ${result.basePath}`,
      `Config: ${hasConfig ? 'OK' : 'Ausente'}`,
      `InputMapper: ${hasMapper ? 'OK' : 'Parcial'}`
    ];
    bsStatusLabel.textContent = statusInfo.join(' • ');
    bsStatusLabel.classList.add('success');

    updateBlueStacksAvailability(result);
    updateBlueStacksFields(result.currentValues);
    
    // Mostrar sucesso no botão
    bsVerifyButton.innerHTML = `
      <span class="button-icon">✅</span>
      <span>Verificado!</span>
    `;
    bsVerifyButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    if (showToastMessage) {
      showToast('Diretórios verificados com sucesso!');
    }
    
    // Restaurar botão após 2 segundos
    setTimeout(() => {
      bsVerifyButton.innerHTML = originalHTML;
      bsVerifyButton.style.background = '';
    }, 2000);
  } catch (error) {
    console.error('[BlueStacks] detect error', error);
    
    // Remover overlay em caso de erro
    if (overlay && overlay.parentNode) {
      overlay.remove();
    }
    
    // Mostrar erro no botão
    bsVerifyButton.innerHTML = `
      <span class="button-icon">❌</span>
      <span>Erro ao verificar</span>
    `;
    bsVerifyButton.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    
    blueStacksState.verified = false;
    sessionStorage.removeItem('bsVerified');
    bsStatusLabel.textContent = 'Erro ao verificar diretórios.';
    bsStatusLabel.classList.add('warn');
    updateBlueStacksAvailability(null);
    if (showToastMessage) {
      showToast(error.message || 'Erro ao verificar diretórios.', 'error');
    }
    
    // Restaurar botão após 3 segundos
    setTimeout(() => {
      bsVerifyButton.innerHTML = originalHTML;
      bsVerifyButton.style.background = '';
    }, 3000);
  } finally {
    // Garantir que o overlay seja removido
    if (overlay && overlay.parentNode) {
      overlay.remove();
    }
    bsVerifyButton.disabled = false;
  }
}

// IMPORTANTE: As ações do menu Config/Emu (BlueStacks) NÃO devem aumentar o score de otimização.
// Esta função não chama increaseScoreByAction para garantir que as ações do emulador não interfiram no score.
async function runBlueStacksAction(action, successMessage) {
  if (!blueStacksState.detected) {
    showToast('Verifique a pasta do BlueStacks antes de aplicar.', 'error');
    return;
  }
  try {
    bsVerifyButton.disabled = true;
    bsControls.forEach((control) => {
      control.disabled = true;
    });
    await action();
    await verifyBlueStacks(false);
    if (successMessage) {
      showToast(successMessage);
    }
    // NOTA: Não chamar increaseScoreByAction aqui - ações do Config/Emu não devem afetar o score
  } catch (error) {
    console.error('[BlueStacks] action error', error);
    showToast(error.message || 'Não foi possível concluir a alteração.', 'error');
  } finally {
    bsVerifyButton.disabled = false;
  }
}

function getNumeric(input, label) {
  const value = parseInt(input.value, 10);
  if (Number.isNaN(value)) {
    throw new Error(`Informe um número válido para ${label}.`);
  }
  return value;
}

let gaugeAnimationInterval = null;
let gaugeBaseValue = 0;
let gaugeAnimationDirection = 1; // 1 para cima, -1 para baixo
let gaugeAnimationSpeed = 0.05; // Velocidade da animação
let gaugeRandomOffset = 0; // Offset aleatório para variação natural
let gaugeLastRandomChange = Date.now();

function setGaugeValue(value, animated = true) {
  // Arredondar para 1 casa decimal (como no print: 24%)
  gaugeBaseValue = Math.min(100, Math.max(0, Math.round(value * 10) / 10));
  
  // Se não for animado, apenas definir o valor
  if (!animated) {
    updateGaugeDisplay(gaugeBaseValue);
    return;
  }
  
  // Iniciar animação de oscilação (se ainda não estiver rodando)
  if (!gaugeAnimationInterval) {
    let currentValue = gaugeBaseValue;
    let timeOffset = Math.random() * 1000; // Offset aleatório inicial para não sincronizar
    
    // Otimizado: animação mais lenta para reduzir consumo de GPU
    gaugeAnimationInterval = setInterval(() => {
      const now = Date.now();
      const time = (now + timeOffset) / 3000; // Mais lento (3 segundos por ciclo) - reduzido consumo
      
      // Oscilação suave com seno (movimento natural)
      // Se o valor base está acima de 60%, fazer oscilação mais pronunciada (60% -> 61% -> 64% -> 62%)
      const baseOscillation = gaugeBaseValue >= 60 ? 1.5 : 0.4;
      const smoothOscillation = Math.sin(time) * baseOscillation;
      
      // Adicionar pequena variação aleatória que muda lentamente (otimizado: menos frequente)
      if (now - gaugeLastRandomChange > 5000 + Math.random() * 3000) {
        // Mudar o offset aleatório a cada 5-8 segundos (antes era 3-5)
        // Se está acima de 60%, fazer variação maior
        const randomRange = gaugeBaseValue >= 60 ? 1.0 : 0.3;
        gaugeRandomOffset = (Math.random() - 0.5) * randomRange;
        gaugeLastRandomChange = now;
      }
      
      // Oscilação secundária mais lenta para variação adicional
      const slowOscillation = Math.sin(time / 3) * (gaugeBaseValue >= 60 ? 0.8 : 0.2);
      
      // Combinar todas as oscilações
      const totalOscillation = smoothOscillation + slowOscillation + gaugeRandomOffset;
      
      currentValue = gaugeBaseValue + totalOscillation;
      
      // Garantir que não saia dos limites
      // Se está acima de 60%, permitir variação maior (até ±2%)
      const maxDeviation = gaugeBaseValue >= 60 ? 2.0 : 0.5;
      currentValue = Math.min(gaugeBaseValue + maxDeviation, Math.max(gaugeBaseValue - maxDeviation, currentValue));
      currentValue = Math.min(100, Math.max(0, currentValue));
      
      updateGaugeDisplay(currentValue);
    }, 250); // Atualizar a cada 250ms (reduzido de 100ms para melhor performance)
  }
}

function updateGaugeDisplay(percentage) {
  // Atualizar gauge de otimização
  if (gaugeValue) {
    // Mostrar com 1 casa decimal
    const displayValue = Math.round(percentage * 10) / 10;
    const displayText = displayValue % 1 === 0 ? displayValue : displayValue.toFixed(1);
    gaugeValue.textContent = `${displayText}%`;
  }
  
  // Atualizar status do gauge (usar valor base, não o animado)
  if (gaugeStatusLabel) {
    const baseValue = Math.round(gaugeBaseValue);
    if (baseValue >= 80) {
      gaugeStatusLabel.textContent = 'Ótimo';
    } else if (baseValue >= 60) {
      gaugeStatusLabel.textContent = 'Bom';
    } else if (baseValue >= 40) {
      gaugeStatusLabel.textContent = 'Regular';
    } else {
      gaugeStatusLabel.textContent = 'BAIXO';
    }
  }
  
  // Atualizar card de otimização com preenchimento de borda
  const optimizationCard = document.querySelector('.optimization-card');
  if (optimizationCard) {
    // Remover classes anteriores
    optimizationCard.classList.remove('opt-low', 'opt-medium', 'opt-high');
    
    // Determinar cor baseada na porcentagem
    let borderColor, fillColor, textColor;
    const baseValue = Math.round(gaugeBaseValue);
    
    if (baseValue >= 70) {
      // Verde - Alto (70%+)
      borderColor = 'rgba(46, 204, 113, 0.6)';
      fillColor = 'rgba(46, 204, 113, 0.9)';
      textColor = '#2ecc71';
      optimizationCard.classList.add('opt-high');
    } else if (baseValue >= 40) {
      // Amarelo - Médio (40-69%)
      borderColor = 'rgba(255, 193, 7, 0.6)';
      fillColor = 'rgba(255, 193, 7, 0.9)';
      textColor = '#ffc107';
      optimizationCard.classList.add('opt-medium');
    } else {
      // Vermelho - Baixo (0-39%)
      borderColor = 'rgba(231, 76, 60, 0.6)';
      fillColor = 'rgba(231, 76, 60, 0.9)';
      textColor = '#e74c3c';
      optimizationCard.classList.add('opt-low');
    }
    
    // Aplicar cor no texto
    if (gaugeValue) {
      gaugeValue.style.color = textColor;
      gaugeValue.style.textShadow = `0 0 15px ${fillColor}`;
    }
    if (gaugeStatusLabel) {
      gaugeStatusLabel.style.color = textColor;
    }
    if (sidebarScore) {
      sidebarScore.style.color = textColor;
      sidebarScore.style.textShadow = `0 0 10px ${fillColor}`;
    }
    
    // Definir variável CSS para o preenchimento da borda
    optimizationCard.style.setProperty('--opt-fill-percent', `${baseValue}%`);
    optimizationCard.style.setProperty('--opt-fill-color', fillColor);
    optimizationCard.style.setProperty('--opt-border-color', borderColor);
  }
  
  // Atualizar gauge visual com gradiente conic e cores dinâmicas
  if (optimizationGauge) {
    const angle = (percentage / 100) * 360;
    let color1, color2, borderColor, shadowColor, textColor;
    
    // Cores baseadas na porcentagem
    if (percentage >= 70) {
      // Verde - Top (70%+)
      color1 = 'rgba(46, 204, 113, 0.9)';
      color2 = 'rgba(46, 204, 113, 0.5)';
      borderColor = 'rgba(46, 204, 113, 0.6)';
      shadowColor = 'rgba(46, 204, 113, 0.6)';
      textColor = '#2ecc71';
      optimizationGauge.className = 'gauge gauge-green';
    } else if (percentage >= 40) {
      // Amarelo - Médio (40-69%)
      color1 = 'rgba(255, 193, 7, 0.9)';
      color2 = 'rgba(255, 193, 7, 0.5)';
      borderColor = 'rgba(255, 193, 7, 0.6)';
      shadowColor = 'rgba(255, 193, 7, 0.6)';
      textColor = '#ffc107';
      optimizationGauge.className = 'gauge gauge-yellow';
    } else {
      // Vermelho - Ruim (0-39%)
      color1 = 'rgba(231, 76, 60, 0.9)';
      color2 = 'rgba(231, 76, 60, 0.5)';
      borderColor = 'rgba(231, 76, 60, 0.6)';
      shadowColor = 'rgba(231, 76, 60, 0.6)';
      textColor = '#e74c3c';
      optimizationGauge.className = 'gauge gauge-red';
    }
    
    optimizationGauge.style.background = `conic-gradient(
      ${color1} 0deg ${angle}deg,
      rgba(255, 255, 255, 0.08) ${angle}deg 360deg
    )`;
    optimizationGauge.style.borderColor = borderColor;
    optimizationGauge.style.boxShadow = `
      0 0 40px ${shadowColor}66, 
      inset 0 0 40px ${shadowColor}33,
      0 0 60px ${shadowColor}44,
      0 4px 16px rgba(0, 0, 0, 0.4)
    `;
    
    // Atualizar cor do texto
    if (gaugeValue) {
      gaugeValue.style.color = textColor;
      gaugeValue.style.textShadow = `
        0 0 10px ${shadowColor}cc,
        0 0 20px ${shadowColor}99,
        0 0 30px ${shadowColor}66
      `;
    }
    
    if (gaugeStatusLabel) {
      gaugeStatusLabel.style.color = textColor;
      gaugeStatusLabel.style.textShadow = `0 0 8px ${shadowColor}aa`;
    }
  }
  
  // Atualizar sidebar usando o MESMO valor exibido no card (para ficar 100% sincronizado)
  if (sidebarScore) {
    const displayValue = Math.round(percentage * 10) / 10;
    const displayText = displayValue % 1 === 0 ? displayValue : displayValue.toFixed(1);
    sidebarScore.textContent = `${displayText}%`;
  }
}

function formatGB(value) {
  const numeric = Number.isFinite(value) ? value : 0;
  return `${Math.max(0, numeric).toLocaleString('pt-BR')} GB`;
}

function ensureGeneralSectionActive() {
  console.log('[Renderer] Garantindo que a seção "general" esteja ativa...');
  try {
    // Garantir que os elementos existam
    let navButtonsEl = navButtons;
    let sectionsEl = sections;
    
    if (!navButtonsEl || navButtonsEl.length === 0) {
      navButtonsEl = Array.from(document.querySelectorAll('.nav-item'));
      console.log('[Renderer] Nav buttons encontrados:', navButtonsEl.length);
    }
    if (!sectionsEl || sectionsEl.length === 0) {
      sectionsEl = Array.from(document.querySelectorAll('.panel-section'));
      console.log('[Renderer] Seções encontradas:', sectionsEl.length);
    }
    
    // Ativar seção "general" por padrão
    if (navButtonsEl && navButtonsEl.length > 0 && sectionsEl && sectionsEl.length > 0) {
      const generalButton = navButtonsEl.find(b => b.dataset.section === 'general');
      const generalSection = sectionsEl.find(s => s.dataset.section === 'general');
      
      console.log('[Renderer] General button encontrado?', !!generalButton);
      console.log('[Renderer] General section encontrada?', !!generalSection);
      
      if (generalButton && generalSection) {
        // Desativar todas as seções primeiro
        navButtonsEl.forEach((b) => b.classList.remove('active'));
        sectionsEl.forEach((section) => {
          section.classList.remove('active');
          section.style.display = 'none'; // Esconder todas as seções
          section.style.visibility = 'hidden';
        });
        
        // Ativar a seção general
        generalButton.classList.add('active');
        generalSection.classList.add('active');
        generalSection.style.display = 'block'; // Forçar exibição da seção general
        generalSection.style.visibility = 'visible';
        generalSection.style.opacity = '1';
        
        // Forçar reflow para garantir que o CSS seja aplicado
        void generalSection.offsetHeight;
        
        console.log('[Renderer] Seção "general" ativada e exibida com sucesso');
        console.log('[Renderer] General section display:', window.getComputedStyle(generalSection).display);
        console.log('[Renderer] General section visibility:', window.getComputedStyle(generalSection).visibility);
      } else {
        console.warn('[Renderer] Botão ou seção "general" não encontrados');
      }
    } else {
      console.warn('[Renderer] Nav buttons ou seções não encontrados');
    }
  } catch (error) {
    console.error('[Renderer] Erro ao garantir seção general ativa:', error);
  }
}

// Inicializar event listeners dos botões de navegação
if (navButtons && navButtons.length > 0) {
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.section;
      
      // Marcar que está navegando para evitar verificação de rede durante a transição
      window._navigatingSection = true;
      
      navButtons.forEach((b) => b.classList.remove('active'));
      sections.forEach((section) => {
        section.classList.toggle('active', section.dataset.section === target);
      });
      button.classList.add('active');
      
      // Remover classe offline durante navegação (evitar mostrar tela de erro)
      document.body.classList.remove('offline');
      
      // Carregar conteúdo específico de cada seção
      if (target === 'backup') {
        loadRestorePoints();
      } else if (target === 'optimization') {
        // Renderizar lista de otimizações quando abrir a seção de otimização
        // Aguardar um pouco para garantir que o DOM esteja pronto
        setTimeout(() => {
          // Garantir que o subpainel padrão esteja visível
          try {
            const catalogButtons = document.querySelectorAll('.config-catalog button[data-view]');
            const panels = document.querySelectorAll('.config-panel');
            if (catalogButtons.length && panels.length) {
              activeOptimizationPanel = 'panel-basic-settings';
              // Remover active de todos primeiro
              catalogButtons.forEach((b) => b.classList.remove('active'));
              panels.forEach((p) => p.classList.remove('active'));
              // Adicionar active no painel padrão com animação
              const defaultBtn = Array.from(catalogButtons).find(b => b.dataset.view === 'panel-basic-settings');
              const defaultPanel = document.getElementById('panel-basic-settings');
              if (defaultBtn && defaultPanel) {
                defaultBtn.classList.add('active');
                // Pequeno delay para animação
                setTimeout(() => {
                  defaultPanel.classList.add('active');
                }, 50);
              }
            }
          } catch {}
          renderOptimizations();
          // Se o painel de Windows estiver ativo, renderizar também
          if (activeOptimizationPanel === 'panel-windows-optimize') {
            renderWindowsOptimizations();
          }
        }, 100);
      } else if (target === 'config') {
        // Renderizar galeria de emuladores quando abrir a seção de config
        setTimeout(() => {
          // Garantir que o painel padrão esteja visível
          try {
            const catalogButtons = document.querySelectorAll('.config-catalog button[data-view]');
            const panels = document.querySelectorAll('.config-panel');
            if (catalogButtons.length && panels.length) {
              activeConfigPanel = 'panel-emulator';
              // Remover active de todos primeiro
              catalogButtons.forEach((b) => b.classList.remove('active'));
              panels.forEach((p) => p.classList.remove('active'));
              // Adicionar active no painel padrão com animação
              const defaultBtn = Array.from(catalogButtons).find(b => b.dataset.view === 'panel-emulator');
              const defaultPanel = document.getElementById('panel-emulator');
              if (defaultBtn && defaultPanel) {
                defaultBtn.classList.add('active');
                // Pequeno delay para animação
                setTimeout(() => {
                  defaultPanel.classList.add('active');
                }, 50);
              }
            }
          } catch (error) {
            console.error('[Renderer] Erro ao inicializar painel config:', error);
          }
          renderEmulatorGallery();
        }, 100);
      }
      
      // Aguardar um pouco antes de permitir verificação de rede novamente
      setTimeout(() => {
        window._navigatingSection = false;
      }, 1500);
    });
  });
} else {
  // Tentar novamente quando o DOM estiver pronto
  setTimeout(() => {
    const navButtonsEl = Array.from(document.querySelectorAll('.nav-item'));
    const sectionsEl = Array.from(document.querySelectorAll('.panel-section'));
    if (navButtonsEl.length > 0 && sectionsEl.length > 0) {
      navButtons = navButtonsEl;
      sections = sectionsEl;
      
      navButtons.forEach((button) => {
        button.addEventListener('click', () => {
          const target = button.dataset.section;
          
          // Marcar que está navegando para evitar verificação de rede durante a transição
          window._navigatingSection = true;
          
          navButtons.forEach((b) => b.classList.remove('active'));
          sections.forEach((section) => {
            section.classList.toggle('active', section.dataset.section === target);
          });
          button.classList.add('active');
          
          // Remover classe offline durante navegação (evitar mostrar tela de erro)
          document.body.classList.remove('offline');
          
          // Carregar conteúdo específico de cada seção
          if (target === 'backup') {
            loadRestorePoints();
          } else if (target === 'optimization') {
            // Renderizar lista de otimizações quando abrir a seção de otimização
            // Aguardar um pouco para garantir que o DOM esteja pronto
            setTimeout(() => {
              renderOptimizations();
              // Se o painel de Windows estiver ativo, renderizar também
              if (activeOptimizationPanel === 'panel-windows-optimize') {
                renderWindowsOptimizations();
              } else if (activeOptimizationPanel === 'panel-power-plan') {
                // Carregar scripts de Plano de Energia
                loadPowerPlanActions(true);
              } else if (activeOptimizationPanel === 'panel-cleanup-windows') {
                // Carregar scripts de Limpeza Windows
                loadCleanupWindowsActions(true);
              } else if (activeOptimizationPanel === 'panel-disable-windows') {
                // Carregar scripts de Desativar Windows
                loadDisableWindowsActions(true);
              }
            }, 100);
          } else if (target === 'forced-optimization') {
            // Inicializar Otimização Forçada quando abrir a seção
            console.log('[Otimização Forçada] Seção ativada, inicializando...');
            // Usar requestAnimationFrame para garantir que o DOM está atualizado
            requestAnimationFrame(() => {
              setTimeout(() => {
                // Verificar se a seção está visível
                const section = document.querySelector('[data-section="forced-optimization"]');
                console.log('[Otimização Forçada] Seção encontrada:', !!section, 'Ativa:', section?.classList.contains('active'));
                if (section && section.classList.contains('active')) {
                  initForcedOptimization();
                  // A ativação da categoria Processos é feita dentro de initForcedOptimization() após popular os cards
                  // Reaplicar restrições após inicializar
                  setTimeout(() => {
                    if (typeof applyForcedOptimizationRestrictions === 'function') {
                      applyForcedOptimizationRestrictions();
                    }
                    // Recarregar estado visual da API após inicializar (garantir estado atualizado)
                    setTimeout(async () => {
                      if (typeof loadAndUpdateForcedOptimizationState === 'function') {
                        await loadAndUpdateForcedOptimizationState();
                      }
                    }, 300);
                  }, 500);
                } else {
                  console.warn('[Otimização Forçada] Seção não está ativa, tentando mesmo assim...');
                  initForcedOptimization();
                  // Recarregar estado visual mesmo se a seção não estiver ativa
                  setTimeout(async () => {
                    if (typeof loadAndUpdateForcedOptimizationState === 'function') {
                      await loadAndUpdateForcedOptimizationState();
                    }
                  }, 500);
                }
              }, 100);
            });
          } else if (target === 'config') {
            // Renderizar galeria de emuladores quando abrir a seção de config
            setTimeout(() => {
              renderEmulatorGallery();
            }, 100);
          }
          
          // Aguardar um pouco antes de permitir verificação de rede novamente
          setTimeout(() => {
            window._navigatingSection = false;
          }, 1500);
        });
      });
    }
  }, 500);
}

if (sidebarElement) {
  sidebarElement.addEventListener('mouseenter', () => {
    sidebarElement.classList.add('expanded');
    document.body.classList.add('sidebar-expanded');
  });
  sidebarElement.addEventListener('mouseleave', () => {
    sidebarElement.classList.remove('expanded');
    document.body.classList.remove('sidebar-expanded');
  });
}

function closeDropdowns(event) {
  if (event && languageMenu.contains(event.target)) return;
  if (event && languageButton.contains(event.target)) return;
  if (event && paletteMenu.contains(event.target)) return;
  if (event && paletteButton.contains(event.target)) return;
  languageMenu.classList.remove('show');
  paletteMenu.classList.remove('show');
}

document.addEventListener('click', closeDropdowns);

languageButton.addEventListener('click', (event) => {
  event.stopPropagation();
  paletteMenu.classList.remove('show');
  languageMenu.classList.toggle('show');
});

paletteButton.addEventListener('click', (event) => {
  event.stopPropagation();
  languageMenu.classList.remove('show');
  paletteMenu.classList.toggle('show');
});

languageMenu.querySelectorAll('li').forEach((item) => {
  item.addEventListener('click', async () => {
    const lang = item.dataset.lang;
    currentLanguage = lang;
    await window.y20.setLanguage(lang);
    languageMenu.classList.remove('show');
    applyLanguage(lang);
  });
});

paletteMenu.querySelectorAll('li').forEach((item) => {
  item.addEventListener('click', async () => {
    const palette = item.dataset.palette;
    currentPalette = palette;
    await window.y20.setPalette(palette);
    document.body.setAttribute('data-palette', palette);
    localStorage.setItem('y20-palette', palette);
    showToast('Paleta atualizada.');
    paletteMenu.classList.remove('show');
    // Forçar atualização visual
    updatePaletteColors();
  });
});

function updatePaletteColors() {
  // Forçar atualização de todas as variáveis CSS
  const computedStyle = getComputedStyle(document.body);
  // Forçar repaint
  document.body.style.display = 'none';
  void document.body.offsetHeight; // Trigger reflow
  document.body.style.display = '';
  
  // Aplicar transição suave
  const style = document.createElement('style');
  style.textContent = `
    * {
      transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
  `;
  document.head.appendChild(style);
  setTimeout(() => {
    style.remove();
  }, 350);
}

// Event listener do Neon já foi movido para cima

if (bsVerifyButton) {
  // Resetar estado de verificação ao inicializar (ao abrir o painel)
  // Mas verificar se há estado salvo para manter ao mudar de slot
  const savedVerified = sessionStorage.getItem('bsVerified');
  if (savedVerified === 'true' && blueStacksState.detected) {
    // Se estava verificado e ainda tem detecção, manter verificado
    blueStacksState.verified = true;
    // Re-habilitar controles se já estava verificado
    if (blueStacksState.detected) {
      updateBlueStacksAvailability({ found: true, status: blueStacksState.status, basePath: blueStacksState.basePath });
    } else {
      updateBlueStacksAvailability(null);
    }
  } else {
    // Resetar estado ao abrir o painel
    blueStacksState.verified = false;
    sessionStorage.removeItem('bsVerified');
    bsControls.forEach((control) => {
      control.disabled = true;
    });
    updateBlueStacksAvailability(null);
  }
  
  bsVerifyButton.addEventListener('click', () => {
        verifyBlueStacks(true, true); // forceFullCheck = true para sempre fazer verificação completa
  });

  if (bsFpsApply && bsFpsInput) {
    bsFpsApply.addEventListener('click', () => {
      try {
        const value = getNumeric(bsFpsInput, 'FPS');
        showBlueStacksWarningModal(
          '⚠️ <strong>Fechar Emulador Antes de Aplicar</strong><br/><br/>Para aplicar a alteração de FPS, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar a alteração.',
          async () => {
            addLogEntry(`Aplicou: FPS do emulador - ${value}`, 'info');
            await runBlueStacksAction(() => window.y20.bluestacksApply('maxFps', { value }), 'FPS atualizado.');
          },
          bsFpsApply
        );
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  if (bsFpsRevert) {
    bsFpsRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('maxFps'), 'FPS original restaurado.');
    });
  }

  if (bsTweaksApply && bsTweaksInput) {
    bsTweaksApply.addEventListener('click', async () => {
      try {
        const value = getNumeric(bsTweaksInput, 'Tweaks');
        showBlueStacksWarningModal(
          '⚠️ <strong>Atenção - Aplicar Tweaks</strong><br/><br/>Para aplicar os tweaks, você precisa apenas <strong>fechar e relogar o jogo Free Fire</strong>.<br/><br/><strong>NÃO é necessário fechar o emulador.</strong><br/><br/>Após fechar o jogo, clique em OK para aplicar a alteração.',
          async () => {
            addLogEntry(`Aplicou: Tweaks/Cursores - ${value}`, 'info');
            await runBlueStacksAction(() => window.y20.bluestacksApply('tweaks', { value }), '');
            showToast('Tweaks aplicados! ⚠️ Feche o jogo Free Fire e abra novamente para aplicar as alterações.', 'success');
          },
          bsTweaksApply
        );
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  if (bsTweaksRevert) {
    bsTweaksRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('tweaks'), 'Tweaks originais restaurados.');
    });
  }

  if (bsDeviceApply && bsDeviceBrandInput && bsDeviceManufacturerInput && bsDeviceModelInput) {
    bsDeviceApply.addEventListener('click', () => {
      const brand = bsDeviceBrandInput.value.trim();
      const manufacturer = bsDeviceManufacturerInput.value.trim();
      const model = bsDeviceModelInput.value.trim();
      if (!brand || !manufacturer || !model) {
        showToast('Preencha marca, fabricante e modelo antes de aplicar.', 'error');
        return;
      }
      showBlueStacksWarningModal(
        '⚠️ <strong>Fechar Emulador Antes de Aplicar</strong><br/><br/>Para aplicar a alteração de dispositivo, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar a alteração.',
        async () => {
          addLogEntry(`Aplicou: Alterar dispositivo - ${brand} ${model}`, 'info');
          await runBlueStacksAction(
            () => window.y20.bluestacksApply('device', { brand, manufacturer, model }),
            'Dispositivo aplicado com sucesso.'
          );
        },
        bsDeviceApply
      );
    });
  }

  if (bsDeviceRevert) {
    bsDeviceRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('device'), 'Dispositivo original restaurado.');
    });
  }

  if (bsDpiApply && bsDpiInput) {
    bsDpiApply.addEventListener('click', () => {
      try {
        const value = getNumeric(bsDpiInput, 'DPI');
        showBlueStacksWarningModal(
          '⚠️ <strong>Fechar Emulador Antes de Aplicar</strong><br/><br/>Para aplicar a alteração de DPI, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar a alteração.',
          async () => {
            addLogEntry(`Aplicou: DPI do emulador - ${value}`, 'info');
            await runBlueStacksAction(() => window.y20.bluestacksApply('dpi', { value }), 'DPI atualizado com sucesso.');
          },
          bsDpiApply
        );
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  if (bsDpiRevert) {
    bsDpiRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('dpi'), 'DPI original restaurado.');
    });
  }

  if (bsResApply && bsWidthInput && bsHeightInput) {
    bsResApply.addEventListener('click', () => {
      try {
        const width = getNumeric(bsWidthInput, 'largura');
        const height = getNumeric(bsHeightInput, 'altura');
        showBlueStacksWarningModal(
          '⚠️ <strong>Fechar Emulador Antes de Aplicar</strong><br/><br/>Para aplicar a alteração de resolução, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar a alteração.',
          async () => {
            addLogEntry(`Aplicou: Resolução do emulador - ${width}x${height}`, 'info');
            await runBlueStacksAction(
              () => window.y20.bluestacksApply('resolution', { width, height }),
              'Resolução atualizada.'
            );
          },
          bsResApply
        );
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  if (bsResRevert) {
    bsResRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('resolution'), 'Resolução original restaurada.');
    });
  }

  if (bsDelayApply && bsDelayInput) {
    bsDelayApply.addEventListener('click', () => {
      try {
        const value = getNumeric(bsDelayInput, 'ExclusiveDelay');
        showBlueStacksWarningModal(
          '⚠️ <strong>Fechar Emulador Antes de Aplicar</strong><br/><br/>Para aplicar a alteração de ExclusiveDelay, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar a alteração.',
          async () => {
            addLogEntry(`Aplicou: Tirar delay HUD - ${value}`, 'info');
            await runBlueStacksAction(() => window.y20.bluestacksApply('exclusiveDelay', { value }), 'ExclusiveDelay atualizado com sucesso.');
          },
          bsDelayApply
        );
      } catch (error) {
        showToast(error.message, 'error');
      }
    });
  }

  if (bsDelayRevert) {
    bsDelayRevert.addEventListener('click', () => {
      runBlueStacksAction(() => window.y20.bluestacksRevert('exclusiveDelay'), 'ExclusiveDelay original restaurado.');
    });
  }

  if (bsOptimizeEmulator) {
    // Adicionar tooltip bubble customizado no ícone de interrogação
    const optimizeTooltipIcon = document.getElementById('bs-optimize-tooltip');
    if (optimizeTooltipIcon) {
      const tooltipText = optimizeTooltipIcon.getAttribute('data-tooltip');
      if (tooltipText) {
        optimizeTooltipIcon.addEventListener('mouseenter', (e) => {
          e.stopPropagation(); // Evitar que o evento se propague para o botão
          showTooltipBubble(optimizeTooltipIcon, tooltipText);
        });
        optimizeTooltipIcon.addEventListener('mouseleave', () => {
          hideTooltipBubble();
        });
        optimizeTooltipIcon.addEventListener('click', (e) => {
          e.stopPropagation(); // Evitar que o clique no ícone dispare o botão
        });
      }
    }
    
    bsOptimizeEmulator.addEventListener('click', () => {
      showBlueStacksWarningModal(
        '⚠️ <strong>Fechar Emulador Antes de Otimizar</strong><br/><br/>Para aplicar as otimizações, é necessário fechar o emulador BlueStacks antes de continuar.<br/><br/>Após fechar o emulador, clique em OK para aplicar as otimizações.',
        async () => {
          addLogEntry('Aplicou: Otimização do emulador', 'info');
          await runBlueStacksAction(() => window.y20.bluestacksOptimizeEmulator(), 'Emulador otimizado com sucesso.');
        },
        bsOptimizeEmulator
      );
    });
  }

  // Funções para mostrar modais de presets
  function showTweaksPresetsModal() {
    const modal = document.getElementById('bs-tweaks-presets-modal');
    if (modal) {
      modal.hidden = false;
      // Inicializar event listeners dos botões dentro do modal
      setTimeout(() => {
        const modalButtons = modal.querySelectorAll('.preset-option');
        modalButtons.forEach((button) => {
          // Remover listeners anteriores se existirem
          const newButton = button.cloneNode(true);
          button.parentNode.replaceChild(newButton, button);
          
          newButton.addEventListener('click', () => {
            if (bsTweaksInput) {
              bsTweaksInput.value = newButton.dataset.value || '';
              showToast(`Valor ${newButton.dataset.value} aplicado ao campo. Clique em "Aplicar" para confirmar.`, 'success');
            }
            hideTweaksPresetsModal();
          });
        });
      }, 100);
    }
  }

  function hideTweaksPresetsModal() {
    const modal = document.getElementById('bs-tweaks-presets-modal');
    if (modal) {
      modal.hidden = true;
    }
  }

  function showDevicePresetsModal() {
    const modal = document.getElementById('bs-device-presets-modal');
    if (modal) {
      modal.hidden = false;
      // Inicializar event listeners dos botões dentro do modal
      setTimeout(() => {
        const modalButtons = modal.querySelectorAll('.preset-device');
        modalButtons.forEach((button) => {
          // Remover listeners anteriores se existirem
          const newButton = button.cloneNode(true);
          button.parentNode.replaceChild(newButton, button);
          
          newButton.addEventListener('click', () => {
            if (bsDeviceBrandInput) bsDeviceBrandInput.value = newButton.dataset.brand || '';
            if (bsDeviceManufacturerInput) bsDeviceManufacturerInput.value = newButton.dataset.manufacturer || '';
            if (bsDeviceModelInput) bsDeviceModelInput.value = newButton.dataset.model || '';
            showToast('Preset aplicado. Ajuste se necessário e clique em Aplicar.', 'success');
            hideDevicePresetsModal();
          });
        });
      }, 100);
    }
  }

  function hideDevicePresetsModal() {
    const modal = document.getElementById('bs-device-presets-modal');
    if (modal) {
      modal.hidden = true;
    }
  }

  // Event listeners para fechar modais
  const tweaksModalClose = document.getElementById('bs-tweaks-modal-close');
  if (tweaksModalClose) {
    tweaksModalClose.addEventListener('click', hideTweaksPresetsModal);
  }

  const deviceModalClose = document.getElementById('bs-device-modal-close');
  if (deviceModalClose) {
    deviceModalClose.addEventListener('click', hideDevicePresetsModal);
  }

  // Fechar modais ao clicar fora
  const tweaksModal = document.getElementById('bs-tweaks-presets-modal');
  if (tweaksModal) {
    tweaksModal.addEventListener('click', (e) => {
      if (e.target === tweaksModal) {
        hideTweaksPresetsModal();
      }
    });
  }

  const deviceModal = document.getElementById('bs-device-presets-modal');
  if (deviceModal) {
    deviceModal.addEventListener('click', (e) => {
      if (e.target === deviceModal) {
        hideDevicePresetsModal();
      }
    });
  }

  // Manter listeners originais para os elementos inline (caso ainda existam)
  document.querySelectorAll('#bs-tweaks-presets .preset-option').forEach((button) => {
    button.addEventListener('click', () => {
      if (bsTweaksInput) {
        bsTweaksInput.value = button.dataset.value || '';
      }
    });
  });

  document.querySelectorAll('#bs-device-presets .preset-device').forEach((button) => {
    button.addEventListener('click', () => {
      if (bsDeviceBrandInput) bsDeviceBrandInput.value = button.dataset.brand || '';
      if (bsDeviceManufacturerInput) bsDeviceManufacturerInput.value = button.dataset.manufacturer || '';
      if (bsDeviceModelInput) bsDeviceModelInput.value = button.dataset.model || '';
      showToast('Preset aplicado. Ajuste se necessário e clique em Aplicar.');
    });
  });

  presetToggleButtons.forEach((button) => {
    const targetId = button.dataset.toggle;
    if (!targetId) return;
    
    // Buscar target diretamente pelo ID dentro do painel do emulador
    const panelEmulator = document.getElementById('panel-emulator');
    // Abrir modal ao invés de expandir inline
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      // Determinar qual modal abrir baseado no data-toggle
      if (targetId === 'bs-tweaks-presets') {
        showTweaksPresetsModal();
      } else if (targetId === 'bs-device-presets') {
        showDevicePresetsModal();
      }
    });
  });

  if (configCatalogButtons.length) {
    configCatalogButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const target = button.dataset.view;
        const catalog = button.closest('.config-catalog');
        
        // Determinar qual catálogo está sendo usado
        const isOptimizationCatalog = catalog && catalog.closest('[data-section="optimization"]');
        
        if (!target) {
          return;
        }
        
        // Verificar se já está ativo no mesmo catálogo
        if (isOptimizationCatalog && target === activeOptimizationPanel) {
          return;
        }
        if (!isOptimizationCatalog && target === activeConfigPanel) {
          return;
        }
        
        // Atualizar botões ativos apenas do mesmo catálogo
        const sameCatalogButtons = catalog ? catalog.querySelectorAll('button[data-view]') : [];
        sameCatalogButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Atualizar painéis correspondentes com animação
        configPanels.forEach((panel) => {
          panel.classList.remove('active');
        });
        const targetPanel = document.getElementById(target);
        if (targetPanel) {
          // Pequeno delay para animação
          setTimeout(() => {
            targetPanel.classList.add('active');
          }, 50);
        }
        
        // Atualizar estado ativo baseado no catálogo
        if (isOptimizationCatalog) {
          activeOptimizationPanel = target;
        } else {
          activeConfigPanel = target;
        }
        
        // Carregar conteúdo específico de cada painel
        if (target === 'panel-mouse-fix') {
          loadMouseFixActions(true);
        } else if (target === 'panel-delay') {
          loadInputLagActions(true);
        }
        
        // Aplicar bloqueios/liberações após mudar de painel
        setTimeout(() => {
          if (currentAccessLevel === 'simple') {
            // Bloquear botões dentro dos painéis bloqueados (acesso simples)
            const blockedPanels = [
              'panel-basic-settings', 'panel-windows-optimize', 'panel-disable-windows',
              'panel-important-scripts', 'panel-booster-robusta', 'panel-emulator',
              'panel-delay', 'panel-apps'
            ];
            if (blockedPanels.includes(target)) {
              blockPanelButtons(target);
            }
          } else if (currentAccessLevel === 'basic') {
            // Liberar botões nos painéis liberados no acesso básico
            const basicAllowedPanels = [
              'panel-basic-settings', 'panel-windows-optimize', 'panel-disable-windows',
              'panel-important-scripts', 'panel-emulator', 'panel-delay'
            ];
            if (basicAllowedPanels.includes(target)) {
              // Liberar todos os botões do painel
              const panel = document.getElementById(target);
              if (panel) {
                const buttonsInPanel = panel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button, input[type="checkbox"]');
                buttonsInPanel.forEach(btn => {
                  unblockElement(btn);
                  if (btn.type === 'checkbox') {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                    btn.removeAttribute('data-blocked');
                    const toggleWrap = btn.closest('.toggle-switch');
                    if (toggleWrap) {
                      toggleWrap.style.opacity = '1';
                      toggleWrap.style.cursor = 'pointer';
                      toggleWrap.removeAttribute('data-blocked');
                    }
                  }
                });
              }
            } else if (target === 'panel-booster-robusta' || target === 'panel-apps') {
              // Bloquear apenas Booster Robusta e Otimizar com APPS
              blockPanelButtons(target);
            }
          } else if (currentAccessLevel === 'vip') {
            // VIP: Liberar TUDO literalmente
            const panel = document.getElementById(target);
            if (panel) {
              const buttonsInPanel = panel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button, input[type="checkbox"]');
              buttonsInPanel.forEach(btn => {
                unblockElement(btn);
                if (btn.type === 'checkbox') {
                  btn.disabled = false;
                  btn.style.opacity = '1';
                  btn.style.cursor = 'pointer';
                  btn.removeAttribute('data-blocked');
                  const toggleWrap = btn.closest('.toggle-switch');
                  if (toggleWrap) {
                    toggleWrap.style.opacity = '1';
                    toggleWrap.style.cursor = 'pointer';
                    toggleWrap.removeAttribute('data-blocked');
                  }
                }
              });
            }
          }
        }, 300);
        
        // Ações específicas por painel
        if (target === 'panel-delay') {
          // Forçar reload para garantir que os cards sejam recriados sem estado de execução
          loadInputLagActions(true);
        } else if (target === 'panel-windows-optimize') {
          // Renderizar configurações do Windows
          renderWindowsOptimizations();
        } else if (target === 'panel-power-plan') {
          // Carregar scripts de Plano de Energia
          loadPowerPlanActions(true);
        } else if (target === 'panel-cleanup-windows') {
          // Carregar scripts de Limpeza Windows
          loadCleanupWindowsActions(true);
        } else if (target === 'panel-disable-windows') {
          // Carregar scripts de Desativar Windows
          loadDisableWindowsActions(true);
        } else if (target === 'panel-apps') {
          // Carregar galeria de APPS
          loadAppsGallery(true);
        } else if (target === 'panel-fake-processors') {
          // Carregar processadores falsos
          loadFakeProcessors(true);
        } else if (target === 'panel-cursors') {
          loadCursorsGallery(true);
        } else if (target === 'panel-important-scripts') {
          // Carregar Scripts Importantes
          loadImportantScripts(true);
        } else if (target === 'panel-booster-robusta') {
          // Carregar Booster Robusta
          loadBoosterRobusta(true);
        }
      });
    });
  }

  window.y20.onNetworkStatus?.((payload) => {
    if (payload) {
      // Ignorar verificações de rede durante o período de graça após login E durante navegação
      if (!window._appJustLoaded && !window._navigatingSection) {
        applyNetworkState(payload.online);
      } else {
        // Se estiver no período de graça ou navegando, apenas remover offline se estiver online
        if (payload.online) {
          document.body.classList.remove('offline');
          if (offlineOverlay) {
            offlineOverlay.hidden = true;
            offlineOverlay.style.display = 'none';
          }
        }
      }
    }
  });

  // Listener para verificação de atualizações (fallback manual)
  window.y20.onUpdateCheckResult?.((updateInfo) => {
    console.log('[Renderer] Resultado da verificação de atualização:', updateInfo);
    
    if (updateInfo && updateInfo.hasUpdate) {
      console.log('[Renderer] ✨ Atualização disponível - Recomendando atualização...');
      showUpdateRequiredModal(updateInfo);
      
      // Não bloquear completamente - apenas recomendar
      // appBlockedByUpdate será false para permitir uso enquanto recomenda atualização
    } else if (updateInfo && !updateInfo.hasUpdate) {
      console.log('[Renderer] ✅ Versão atual está atualizada');
    }
  });

  // ========== AUTO-UPDATER (Atualização Automática) ==========
  
  // Quando atualização estiver disponível
  window.y20.onAutoUpdateAvailable?.((info) => {
    console.log('[Renderer] 🔄 Atualização automática disponível:', info.version);
    showAutoUpdateModal(info, 'available');
  });

  // Quando não houver atualização
  window.y20.onAutoUpdateNotAvailable?.((info) => {
    console.log('[Renderer] ✅ Você está usando a versão mais recente');
  });

  // Progresso do download
  window.y20.onAutoUpdateProgress?.((progress) => {
    console.log(`[Renderer] 📥 Download: ${progress.percent}%`);
    updateAutoUpdateProgress(progress);
  });

  // Download concluído - instalar automaticamente
  window.y20.onAutoUpdateDownloaded?.((info) => {
    console.log('[Renderer] ✅ Download concluído! Instalando automaticamente...');
    showAutoUpdateModal(info, 'downloaded');
    
    // Instalar automaticamente após 3 segundos
    setTimeout(() => {
      if (window.y20.installUpdate) {
        window.y20.installUpdate();
      }
    }, 3000);
  });

  // Erro durante atualização
  window.y20.onAutoUpdateError?.((error) => {
    console.error('[Renderer] ❌ Erro na atualização automática:', error);
    showToast('Erro ao atualizar: ' + (error.message || 'Erro desconhecido'), 'error');
  });

  // ========== ATUALIZAR VERSÃO DINAMICAMENTE ==========
  // Atualizar versão exibida no header
  async function updateAppVersion() {
    try {
      if (window.y20 && window.y20.getAppVersion) {
        const version = await window.y20.getAppVersion();
        const versionTag = document.querySelector('.version-tag');
        if (versionTag && version) {
          versionTag.textContent = `v${version}`;
          console.log('[Renderer] Versão atualizada para:', version);
        }
      }
    } catch (error) {
      console.error('[Renderer] Erro ao obter versão:', error);
    }
  }
  
  // Atualizar versão quando o app carregar
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAppVersion);
  } else {
    updateAppVersion();
  }
  
  // Também atualizar após um pequeno delay para garantir
  setTimeout(updateAppVersion, 500);

  // Verificação de internet apenas uma vez ao abrir o painel (não em eventos online/offline)
  // Os eventos online/offline apenas atualizam a UI, sem fazer requisições à API
  window.addEventListener('online', () => {
    // Apenas atualizar UI, sem verificar API
    document.body.classList.remove('offline');
    if (offlineOverlay) {
      offlineOverlay.hidden = true;
      offlineOverlay.style.display = 'none';
    }
  });
  window.addEventListener('offline', () => {
    // Apenas atualizar UI, sem verificar API
    if (!window._appJustLoaded && !window._navigatingSection) {
      document.body.classList.add('offline');
      if (offlineOverlay) {
        offlineOverlay.hidden = false;
        offlineOverlay.style.display = 'flex';
      }
    }
  });

  // Botão de retry da tela de bloqueio VIP/Básico
  if (vipOfflineRetryButton) {
    vipOfflineRetryButton.addEventListener('click', async () => {
      vipOfflineRetryButton.disabled = true;
      vipOfflineRetryButton.textContent = 'Verificando...';
      
      try {
        // Verificar se API está online
        let apiOnline = false;
        try {
          if (window.y20 && window.y20.checkApiHealth) {
            const health = await Promise.race([
              window.y20.checkApiHealth(),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
            ]);
            apiOnline = health && health.online === true;
          } else {
            apiOnline = navigator.onLine;
          }
        } catch (error) {
          console.warn('[Renderer] Erro ao verificar saúde da API:', error.message);
          apiOnline = false;
        }
        
        if (apiOnline) {
          // API está online - verificar key e reconectar
          console.log('[Renderer] API está online, verificando key e restaurando acessos premium...');
          vipOfflineRetryButton.textContent = 'Reconectando...';
          
          // Verificar se tem key local
          const storedKey = await window.y20.checkAccessKey().catch(() => ({ hasKey: false }));
          
          if (storedKey && storedKey.hasKey) {
            // Tem key - verificar autenticação e restaurar acessos
            try {
              const authResult = await window.y20.isAuthenticated();
              
              if (authResult && authResult.authenticated && authResult.valid && !authResult.revoked && !authResult.expired && !authResult.notFound) {
                // Key válida - restaurar acessos premium
                console.log('[Renderer] Key válida detectada, restaurando acessos premium...');
                
                // Esconder aviso offline
                hideVIPOfflineBlock();
                
                // Determinar nível de acesso baseado no tipo da key usando função auxiliar
                const accessLevel = getAccessLevelFromKey(authResult.keyData);
                
                // Restaurar acessos premium
                currentAccessLevel = accessLevel;
                initializeAppWithAccessLevel(accessLevel);
                updateAccessLevelUI(accessLevel);
                
                // Atualizar UI do usuário
                const userCard = document.getElementById('user-card');
                const activateKeyCardTop = document.getElementById('activate-key-card-top');
                if (userCard) userCard.style.display = 'block';
                if (activateKeyCardTop) activateKeyCardTop.style.display = 'none';
                
                // Atualizar informações do Discord se disponível
                if (authResult.keyData && authResult.keyData.userId) {
                  try {
                    const discordResult = await window.y20.getDiscordUser(authResult.keyData.userId, false);
                    if (discordResult && discordResult.success && discordResult.data) {
                      const heroNameEl = document.getElementById('hero-discord-name');
                      const heroAvatarEl = document.getElementById('hero-discord-avatar');
                      if (heroNameEl) {
                        heroNameEl.textContent = discordResult.data.global_name || discordResult.data.username || 'Usuário';
                      }
                      if (heroAvatarEl && discordResult.data.avatar_url) {
                        heroAvatarEl.src = discordResult.data.avatar_url;
                        heroAvatarEl.style.display = 'block';
                        heroAvatarEl.hidden = false;
                      }
                    }
                  } catch (discordError) {
                    console.warn('[Renderer] Erro ao buscar dados do Discord (não crítico):', discordError.message);
                  }
                }
                
                // Reiniciar validações
                startKeyValidation();
                
                showToast('✅ Reconectado com sucesso! Acessos premium restaurados.', 'success');
                vipOfflineRetryButton.textContent = 'Verificar Bot/MongoDB';
                vipOfflineRetryButton.disabled = false;
                return;
              } else {
                // Key inválida/expirada/revogada
                console.log('[Renderer] Key inválida/expirada/revogada, mantendo acesso simples');
                showToast('Sua key não é mais válida. Mantendo acesso simples.', 'warning');
                await checkVIPOfflineStatus();
              }
            } catch (authError) {
              console.error('[Renderer] Erro ao verificar autenticação:', authError);
              showToast('Erro ao verificar key. Mantendo acesso simples.', 'error');
              await checkVIPOfflineStatus();
            }
          } else {
            // Não tem key local
            console.log('[Renderer] Não há key local, mantendo acesso simples');
            hideVIPOfflineBlock();
            showToast('API está online, mas não há key ativa. Use acesso simples.', 'info');
          }
        } else {
          // API ainda offline
          console.log('[Renderer] API ainda está offline');
          showToast('API ainda está offline. Tente novamente em alguns instantes.', 'warning');
          await checkVIPOfflineStatus();
        }
      } catch (error) {
        console.error('[Renderer] Erro ao verificar servidor:', error);
        showToast('Erro ao verificar servidor. Tente novamente.', 'error');
        await checkVIPOfflineStatus();
      } finally {
        // Reabilitar botão
        setTimeout(() => {
          vipOfflineRetryButton.disabled = false;
          vipOfflineRetryButton.textContent = 'Verificar Bot/MongoDB';
        }, 1000);
      }
    });
  }

  if (offlineRetryButton) {
    offlineRetryButton.addEventListener('click', () => {
      refreshNetworkState();
    });
  }
  
  // Botão "Tentar novamente" do banner API offline
  apiOfflineRetryBtn = document.getElementById('api-offline-retry-btn');
  if (apiOfflineRetryBtn && !apiOfflineRetryBtn.dataset.bound) {
    apiOfflineRetryBtn.addEventListener('click', async () => {
      apiOfflineRetryBtn.disabled = true;
      apiOfflineRetryBtn.textContent = 'Verificando...';
      
      try {
        // Verificar se API está online
        await checkVIPOfflineStatus();
        
        // Aguardar um pouco antes de reabilitar
        setTimeout(() => {
          apiOfflineRetryBtn.disabled = false;
          apiOfflineRetryBtn.textContent = 'Tentar novamente';
        }, 1000);
      } catch (error) {
        console.error('[Renderer] Erro ao verificar API:', error);
        apiOfflineRetryBtn.disabled = false;
        apiOfflineRetryBtn.textContent = 'Tentar novamente';
      }
    });
    apiOfflineRetryBtn.dataset.bound = 'true';
  }
}
discordButton.addEventListener('click', () => {
  window.y20.openDiscord();
});

// Botão da loja (comprar keys)
const shopButton = document.getElementById('shop-button');
if (shopButton) {
  shopButton.addEventListener('click', () => {
    window.y20.openExternal('https://y20.site/');
  });
}

vipButton.addEventListener('click', () => {
  window.y20.openDiscord('https://discord.gg/ADUGNY8sy5');
});

// Painel Administrativo
const adminNavItem = document.getElementById('admin-nav-item');
const adminGenerateVipKeyBtn = document.getElementById('admin-generate-vip-key');
const adminGenerateBasicKeyBtn = document.getElementById('admin-generate-basic-key');
const adminGenerateMobileKeyBtn = document.getElementById('admin-generate-mobile-key');
const adminKeyDaysInput = document.getElementById('admin-key-days');
const adminKeyResult = document.getElementById('admin-key-result');
const adminGeneratedKey = document.getElementById('admin-generated-key');
const adminCopyKeyBtn = document.getElementById('admin-copy-key');

// Função para gerar key
async function generateKey(type) {
  const days = parseInt(adminKeyDaysInput.value);
  if (!days || days < 1 || days > 3650) {
    showToast('Por favor, insira um número válido de dias (1-3650)', 'error');
    return;
  }

  try {
    const result = await cloudflareApiRequest('POST', '/auth/create', {
      days,
      type
    });

    if (result.success && result.data) {
      adminGeneratedKey.textContent = result.data.key;
      adminKeyResult.style.display = 'block';
      showToast(`${type === 'mobile' ? 'Key MOBILE' : type === 'vip' ? 'Key VIP' : 'Key Básico'} gerada com sucesso!`, 'success');
    } else {
      showToast(result.error || 'Erro ao gerar key', 'error');
    }
  } catch (error) {
    console.error('[Admin] Erro ao gerar key:', error);
    showToast('Erro ao gerar key: ' + error.message, 'error');
  }
}

if (adminGenerateVipKeyBtn) {
  adminGenerateVipKeyBtn.addEventListener('click', () => generateKey('vip'));
}

if (adminGenerateBasicKeyBtn) {
  adminGenerateBasicKeyBtn.addEventListener('click', () => generateKey('basic'));
}

if (adminGenerateMobileKeyBtn) {
  adminGenerateMobileKeyBtn.addEventListener('click', () => generateKey('mobile'));
}

if (adminCopyKeyBtn) {
  adminCopyKeyBtn.addEventListener('click', () => {
    const keyText = adminGeneratedKey.textContent;
    if (keyText) {
      navigator.clipboard.writeText(keyText).then(() => {
        showToast('Key copiada para a área de transferência!', 'success');
      }).catch(() => {
        showToast('Erro ao copiar key', 'error');
      });
    }
  });
}

// Mostrar/ocultar seção admin baseado em permissões (por enquanto sempre oculto, pode ser ativado via configuração)
// TODO: Implementar verificação de permissões de admin
if (adminNavItem) {
  // Por enquanto, sempre oculto. Pode ser ativado verificando permissões do usuário
  adminNavItem.style.display = 'none';
}

if (subscribersCta) {
  subscribersCta.addEventListener('click', () => {
    window.y20.openDiscord('https://discord.gg/ADUGNY8sy5');
  });
}

if (activateServicesButton) {
  activateServicesButton.addEventListener('click', () => {
    showToast('Ativando serviços do sistema... ⚙️');
    // TODO: Implementar ativação de serviços
  });
}

// Event listeners para optimizeBasicButton e optimizeVipButton
// já existem em outras partes do código (linhas 2225 e 2233)

// ======================
// APPS (ferramentas auxiliares)
// ======================
async function loadAppsGallery(force = false) {
  const gallery = document.getElementById('apps-gallery');
  const empty = document.getElementById('apps-empty');
  if (!gallery) return;
  if (!force && gallery.dataset.loaded === 'true') return;

  gallery.innerHTML = '';
  empty && (empty.hidden = true);

  // Botão Cursor Padrão
  const cursorDefaultBtn = document.getElementById('cursor-default-apply');
  if (cursorDefaultBtn && !cursorDefaultBtn.dataset.bound) {
    // Remover listener anterior se existir (clonar para remover)
    const newBtn = cursorDefaultBtn.cloneNode(true);
    if (cursorDefaultBtn.parentNode) {
      cursorDefaultBtn.parentNode.replaceChild(newBtn, cursorDefaultBtn);
    }
    
    newBtn.addEventListener('click', async () => {
      try {
        // Desabilitar botão e mostrar animação de "aplicando"
        newBtn.disabled = true;
        const originalHTML = '<span class="button-icon">🖱️</span><span>Voltar pro cursor padrão</span>';
        const originalBg = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        const originalBorder = '2px solid rgba(239, 68, 68, 0.5)';
        const originalShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
        
        // Animação de "aplicando"
        newBtn.innerHTML = '<span class="button-icon">⏳</span><span>Aplicando...</span>';
        newBtn.style.background = 'linear-gradient(135deg, rgba(112, 88, 255, 0.3), rgba(155, 127, 255, 0.3))';
        newBtn.style.opacity = '0.8';
        
        // Delay mínimo para mostrar animação
        const minDelay = 800;
        const startTime = Date.now();
        
        const res = await window.y20.cursorDefaultApply();
        
        // Garantir delay mínimo
        const elapsed = Date.now() - startTime;
        if (elapsed < minDelay) {
          await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
        }
        
        if (!res || !res.success) throw new Error(res?.message || 'Falha ao aplicar Cursor Padrão');
        
        // Feedback de sucesso
        newBtn.innerHTML = '<span class="button-icon">✓</span><span>Aplicado!</span>';
        newBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        showToast('Cursor padrão aplicado com sucesso!', 'success');
        
        // Restaurar estado original após 2 segundos
        setTimeout(() => {
          newBtn.innerHTML = originalHTML;
          newBtn.style.background = originalBg;
          newBtn.style.border = originalBorder;
          newBtn.style.boxShadow = originalShadow;
          newBtn.style.opacity = '';
          newBtn.disabled = false;
        }, 2000);
      } catch (e) {
        // Restaurar estado em caso de erro
        newBtn.innerHTML = originalHTML;
        newBtn.style.background = originalBg;
        newBtn.style.border = originalBorder;
        newBtn.style.boxShadow = originalShadow;
        newBtn.style.opacity = '';
        newBtn.disabled = false;
        showToast(e.message || 'Erro ao aplicar cursor padrão', 'error');
      }
    });
    newBtn.dataset.bound = 'true';
  }

  try {
    const res = await window.y20.appsList();
    if (!res || !res.success) throw new Error(res?.message || 'Falha ao carregar APPS');
    const apps = res.apps || [];
    if (apps.length === 0) {
      if (empty) empty.hidden = false;
      return;
    }

    apps.forEach((app) => {
      const card = document.createElement('div');
      card.className = 'emulator-card';

      if (app.image) {
        const img = document.createElement('img');
        img.alt = app.name;
        img.src = app.image.replace(/\\/g, '/');
        img.onerror = () => { img.style.display = 'none'; };
        card.appendChild(img);
      }

      const body = document.createElement('div');
      body.className = 'emulator-body';
      const title = document.createElement('h4');
      title.textContent = app.name;
      body.appendChild(title);
      card.appendChild(body);

      const actions = document.createElement('div');
      actions.className = 'cursor-actions';

      const viewBtn = document.createElement('button');
      viewBtn.type = 'button';
      viewBtn.textContent = 'Visualizar imagem';
      viewBtn.className = 'ghost';
      viewBtn.addEventListener('click', async () => {
        try {
          if (app.image) {
            const encoded = btoa(app.image);
            // Tentar carregar no modal interno primeiro
            const res = await window.y20.appsGetImageData(encoded);
            if (res && res.success && res.dataUrl) {
              const modal = document.getElementById('image-viewer-modal');
              const img = document.getElementById('image-viewer-img');
              const closeBtn = document.getElementById('image-viewer-close');
              if (modal && img && closeBtn) {
                img.src = res.dataUrl;
                modal.hidden = false;
                const close = () => { modal.hidden = true; img.src = ''; closeBtn.onclick = null; };
                closeBtn.onclick = () => close();
              } else {
                // fallback externo
                await window.y20.appsOpenImage(encoded);
              }
            } else {
              // fallback externo
              await window.y20.appsOpenImage(encoded);
            }
          } else {
            showToast('Imagem não encontrada para este app.', 'warn');
          }
        } catch (err) {
          showToast(err.message || 'Falha ao abrir imagem.', 'error');
        }
      });
      actions.appendChild(viewBtn);

      const execBtn = document.createElement('button');
      execBtn.type = 'button';
      execBtn.textContent = 'Executar';
      execBtn.className = 'primary';
      execBtn.addEventListener('click', async () => {
        try {
          // se for .bat/.cmd, exibir animação rápida
          const isBatch = (app.exec || '').toLowerCase().endsWith('.bat') || (app.exec || '').toLowerCase().endsWith('.cmd');
          let overlay;
          const original = execBtn.textContent;
          if (isBatch) {
            execBtn.disabled = true;
            execBtn.textContent = 'Executando...';
            overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent); animation: script-loading-shimmer 1.6s infinite; border-radius: inherit;';
            execBtn.style.position = 'relative';
            execBtn.appendChild(overlay);
          }

          const r = await window.y20.appsRun(app.id);
          if (!r || !r.success) throw new Error(r?.message || 'Falha ao executar');

          if (overlay) overlay.remove();
          if (isBatch) {
            setTimeout(() => {
              execBtn.disabled = false;
              execBtn.textContent = original;
            }, 1200);
          }
        } catch (err) {
          showToast(err.message || 'Falha ao executar', 'error');
        }
      });
      actions.appendChild(execBtn);

      card.appendChild(actions);

      gallery.appendChild(card);
    });

    gallery.dataset.loaded = 'true';
  } catch (e) {
    if (empty) {
      empty.hidden = false;
      empty.textContent = e.message || 'Falha ao carregar APPS';
    }
  }
}

// ======================
// Cursores
// ======================
async function loadCursorsGallery(force = false) {
  const gallery = document.getElementById('cursors-gallery');
  const empty = document.getElementById('cursors-empty');
  if (!gallery) return;
  if (!force && gallery.dataset.loaded === 'true') return;

  gallery.innerHTML = '';
  empty && (empty.hidden = true);

  try {
    const res = await window.y20.cursorsList();
    if (!res || !res.success) throw new Error(res?.message || 'Falha ao carregar Cursores');
    const items = res.items || [];
    
    // Filtrar "Mouse Padrão" da lista (já existe botão no topo)
    const filteredItems = items.filter(item => {
      const name = item.name || '';
      return !name.toLowerCase().includes('mouse padrão') && 
             !name.toLowerCase().includes('cursor padrão') &&
             !name.toLowerCase().includes('padrão');
    });
    
    if (filteredItems.length === 0) {
      if (empty) empty.hidden = false;
      return;
    }

    filteredItems.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'emulator-card';

      if (item.image) {
        const img = document.createElement('img');
        img.alt = item.name;
        img.src = item.image.replace(/\\/g, '/');
        img.onerror = () => { img.style.display = 'none'; };
        card.appendChild(img);
      }

      const body = document.createElement('div');
      body.className = 'emulator-body';
      const title = document.createElement('h4');
      title.textContent = item.name;
      body.appendChild(title);
      card.appendChild(body);

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '8px';
      actions.style.justifyContent = 'flex-end';

      const viewBtn = document.createElement('button');
      viewBtn.type = 'button';
      viewBtn.textContent = 'Visualizar imagem';
      viewBtn.className = 'ghost';
      viewBtn.addEventListener('click', async () => {
        try {
          if (item.preview) {
            const encoded = btoa(item.preview);
            const res = await window.y20.appsGetImageData(encoded);
            if (res && res.success && res.dataUrl) {
              const modal = document.getElementById('image-viewer-modal');
              const img = document.getElementById('image-viewer-img');
              const closeBtn = document.getElementById('image-viewer-close');
              if (modal && img && closeBtn) {
                img.src = res.dataUrl;
                modal.hidden = false;
                const close = () => { modal.hidden = true; img.src = ''; closeBtn.onclick = null; };
                closeBtn.onclick = () => close();
              }
            }
          } else {
            showToast('Imagem não encontrada para este cursor.', 'warn');
          }
        } catch (err) {
          showToast(err.message || 'Falha ao abrir imagem.', 'error');
        }
      });
      actions.appendChild(viewBtn);

      const execBtn = document.createElement('button');
      execBtn.type = 'button';
      execBtn.textContent = 'Aplicar';
      execBtn.className = 'primary';
      
      // Variável para armazenar timeout e controlar estado
      let restoreTimeout = null;
      let isProcessing = false;
      
      execBtn.addEventListener('click', async () => {
        // Se já está processando, ignorar clique
        if (isProcessing) {
          return;
        }
        
        // Limpar qualquer timeout pendente
        if (restoreTimeout) {
          clearTimeout(restoreTimeout);
          restoreTimeout = null;
        }
        
        try {
          isProcessing = true;
          
          // Desabilitar botão e mostrar animação de "aplicando"
          execBtn.disabled = true;
          const originalHTML = execBtn.innerHTML;
          const originalBg = execBtn.style.background;
          const originalText = execBtn.textContent;
          
          // Animação de "aplicando"
          execBtn.innerHTML = '<span class="button-icon">⏳</span><span>Aplicando...</span>';
          execBtn.style.background = 'linear-gradient(135deg, rgba(112, 88, 255, 0.3), rgba(155, 127, 255, 0.3))';
          execBtn.style.cursor = 'wait';
          
          const r = await window.y20.cursorsRun(item.id);
          
          if (!r || !r.success) {
            throw new Error(r?.message || 'Falha ao aplicar');
          }
          
          // Sucesso - mostrar "Aplicado!" temporariamente
          execBtn.innerHTML = '<span class="button-icon">✅</span><span>Aplicado!</span>';
          execBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          showToast('Cursor aplicado com sucesso!', 'success');
          
          // Restaurar botão após 2 segundos
          restoreTimeout = setTimeout(() => {
            execBtn.innerHTML = originalHTML;
            execBtn.style.background = originalBg;
            execBtn.style.cursor = '';
            execBtn.disabled = false;
            isProcessing = false;
            restoreTimeout = null;
          }, 2000);
        } catch (err) {
          // Erro - restaurar botão
          execBtn.innerHTML = '<span class="button-icon">❌</span><span>Erro</span>';
          execBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          showToast(err.message || 'Falha ao aplicar', 'error');
          
          // Restaurar botão após 2 segundos
          restoreTimeout = setTimeout(() => {
            execBtn.innerHTML = '<span>Aplicar</span>';
            execBtn.style.background = '';
            execBtn.style.cursor = '';
            execBtn.disabled = false;
            isProcessing = false;
            restoreTimeout = null;
          }, 2000);
        }
      });
      actions.appendChild(execBtn);

      card.appendChild(actions);
      gallery.appendChild(card);
    });

    gallery.dataset.loaded = 'true';
  } catch (e) {
    if (empty) {
      empty.hidden = false;
      empty.textContent = e.message || 'Falha ao carregar Cursores';
    }
  }
}

// ======================
// Falsos Processadores
// ======================
async function loadFakeProcessors(force = false) {
  const amdContainer = document.getElementById('fake-processors-amd');
  const intelContainer = document.getElementById('fake-processors-intel');
  const amdEmpty = document.getElementById('fake-processors-amd-empty');
  const intelEmpty = document.getElementById('fake-processors-intel-empty');
  
  if (!amdContainer || !intelContainer) return;
  if (!force && amdContainer.dataset.loaded === 'true' && intelContainer.dataset.loaded === 'true') return;

  amdContainer.innerHTML = '';
  intelContainer.innerHTML = '';
  if (amdEmpty) amdEmpty.hidden = true;
  if (intelEmpty) intelEmpty.hidden = true;

  // Carregar processadores AMD
  try {
    const amdRes = await window.y20.fakeProcessorsList('amd');
    if (amdRes && amdRes.success && amdRes.items) {
      const amdItems = amdRes.items || [];
      
      if (amdItems.length === 0) {
        if (amdEmpty) amdEmpty.hidden = false;
      } else {
        amdItems.forEach((item) => {
          const card = document.createElement('div');
          card.className = 'script-card';

          const info = document.createElement('div');
          info.className = 'script-info';

          const title = document.createElement('h4');
          title.textContent = item.name;
          info.appendChild(title);

          const description = document.createElement('span');
          description.className = 'script-type';
          description.textContent = 'Processador AMD';
          info.appendChild(description);

          card.appendChild(info);

          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'primary';
          button.textContent = 'Aplicar';
          button.addEventListener('click', async () => {
            try {
              console.log('[FakeProcessors] Iniciando aplicação:', item.name);
              button.disabled = true;
              button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Aplicando...</span>';
              button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
              
              const r = await window.y20.fakeProcessorsRun(item.id);
              console.log('[FakeProcessors] Resposta recebida:', r);
              
              if (r && r.success) {
                console.log('[FakeProcessors] Sucesso! Mudando botão para Aplicado');
                button.innerHTML = '<span>✓ Aplicado</span>';
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                button.style.cursor = 'default';
                button.disabled = true;
                showToast(`${item.name} aplicado com sucesso!`, 'success');
              } else {
                const errorMsg = r?.message || 'Falha ao aplicar processador';
                console.error('[FakeProcessors] Erro na resposta:', errorMsg);
                throw new Error(errorMsg);
              }
            } catch (err) {
              console.error('[FakeProcessors] Erro ao aplicar:', err);
              button.disabled = false;
              button.innerHTML = '<span>Aplicar</span>';
              button.style.background = '';
              button.style.cursor = '';
              showToast(err.message || 'Falha ao aplicar processador', 'error');
            }
          });

          card.appendChild(button);
          amdContainer.appendChild(card);
        });
      }
    }
    amdContainer.dataset.loaded = 'true';
  } catch (e) {
    console.error('[FakeProcessors] Erro ao carregar AMD:', e);
    if (amdEmpty) {
      amdEmpty.hidden = false;
      amdEmpty.textContent = e.message || 'Falha ao carregar processadores AMD';
    }
  }

  // Carregar processadores INTEL
  try {
    const intelRes = await window.y20.fakeProcessorsList('intel');
    if (intelRes && intelRes.success && intelRes.items) {
      const intelItems = intelRes.items || [];
      
      if (intelItems.length === 0) {
        if (intelEmpty) intelEmpty.hidden = false;
      } else {
        intelItems.forEach((item) => {
          const card = document.createElement('div');
          card.className = 'script-card';

          const info = document.createElement('div');
          info.className = 'script-info';

          const title = document.createElement('h4');
          title.textContent = item.name;
          info.appendChild(title);

          const description = document.createElement('span');
          description.className = 'script-type';
          description.textContent = 'Processador INTEL';
          info.appendChild(description);

          card.appendChild(info);

          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'primary';
          button.textContent = 'Aplicar';
          button.addEventListener('click', async () => {
            try {
              console.log('[FakeProcessors] Iniciando aplicação:', item.name);
              button.disabled = true;
              button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Aplicando...</span>';
              button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
              
              const r = await window.y20.fakeProcessorsRun(item.id);
              console.log('[FakeProcessors] Resposta recebida:', r);
              
              if (r && r.success) {
                console.log('[FakeProcessors] Sucesso! Mudando botão para Aplicado');
                button.innerHTML = '<span>✓ Aplicado</span>';
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                button.style.cursor = 'default';
                button.disabled = true;
                showToast(`${item.name} aplicado com sucesso!`, 'success');
              } else {
                const errorMsg = r?.message || 'Falha ao aplicar processador';
                console.error('[FakeProcessors] Erro na resposta:', errorMsg);
                throw new Error(errorMsg);
              }
            } catch (err) {
              console.error('[FakeProcessors] Erro ao aplicar:', err);
              button.disabled = false;
              button.innerHTML = '<span>Aplicar</span>';
              button.style.background = '';
              button.style.cursor = '';
              showToast(err.message || 'Falha ao aplicar processador', 'error');
            }
          });

          card.appendChild(button);
          intelContainer.appendChild(card);
        });
      }
    }
    intelContainer.dataset.loaded = 'true';
  } catch (e) {
    console.error('[FakeProcessors] Erro ao carregar INTEL:', e);
    if (intelEmpty) {
      intelEmpty.hidden = false;
      intelEmpty.textContent = e.message || 'Falha ao carregar processadores INTEL';
    }
  }
  
  // Handler para o botão "Conferir Processador"
  const checkProcessorBtn = document.getElementById('check-processor-btn');
  if (checkProcessorBtn && !checkProcessorBtn.dataset.bound) {
    checkProcessorBtn.addEventListener('click', async () => {
      try {
        const originalHTML = checkProcessorBtn.innerHTML;
        checkProcessorBtn.disabled = true;
        checkProcessorBtn.innerHTML = '<span class="button-icon">⏳</span><span>Executando...</span>';
        checkProcessorBtn.style.background = 'linear-gradient(135deg, rgba(112, 88, 255, 0.3), rgba(155, 127, 255, 0.3))';
        
        const result = await window.y20.checkProcessorRun();
        
        if (result && result.success) {
          checkProcessorBtn.innerHTML = '<span class="button-icon">✅</span><span>Executado!</span>';
          checkProcessorBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          showToast('Script executado com sucesso!', 'success');
          
          setTimeout(() => {
            checkProcessorBtn.innerHTML = originalHTML;
            checkProcessorBtn.style.background = '';
            checkProcessorBtn.disabled = false;
          }, 2000);
        } else {
          throw new Error(result?.message || 'Falha ao executar script');
        }
      } catch (err) {
        checkProcessorBtn.disabled = false;
        checkProcessorBtn.innerHTML = '<span class="button-icon">🔍</span><span>Conferir Processador</span>';
        checkProcessorBtn.style.background = '';
        showToast(err.message || 'Falha ao executar script', 'error');
      }
    });
    checkProcessorBtn.dataset.bound = 'true';
  }
  
  // Handler para o botão "Reiniciar PC para voltar ao normal"
  const restartPcBtn = document.getElementById('restart-pc-btn');
  if (restartPcBtn && !restartPcBtn.dataset.bound) {
    restartPcBtn.addEventListener('click', async () => {
      // Confirmar antes de reiniciar
      const confirmed = confirm('⚠️ ATENÇÃO: O PC será reiniciado imediatamente!\n\nTem certeza que deseja continuar?');
      if (!confirmed) return;
      
      try {
        const originalHTML = restartPcBtn.innerHTML;
        restartPcBtn.disabled = true;
        restartPcBtn.innerHTML = '<span class="button-icon">⏳</span><span>Reiniciando...</span>';
        restartPcBtn.style.background = 'linear-gradient(135deg, #ff8c42, #ff6b6b)';
        restartPcBtn.style.opacity = '0.8';
        
        showToast('Reiniciando o PC...', 'info');
        
        const result = await window.y20.restartPC();
        
        if (result && result.success) {
          // O PC será reiniciado, então não precisamos restaurar o botão
          showToast('PC será reiniciado em instantes...', 'success');
        } else {
          throw new Error(result?.message || 'Falha ao reiniciar PC');
        }
      } catch (err) {
        restartPcBtn.disabled = false;
        restartPcBtn.innerHTML = '<span class="button-icon">🔄</span><span>Reiniciar PC para voltar ao normal</span>';
        restartPcBtn.style.background = 'linear-gradient(135deg, #ff6b6b, #ff4757)';
        restartPcBtn.style.opacity = '';
        showToast(err.message || 'Falha ao reiniciar PC', 'error');
      }
    });
    restartPcBtn.dataset.bound = 'true';
  }
}

if (minimizeButton) {
  minimizeButton.addEventListener('click', () => {
    window.y20.windowControl('minimize');
  });
}

if (closeButton) {
  closeButton.addEventListener('click', () => {
    window.y20.windowControl('close');
  });
}

// Função para inicializar botões de controle de janela
function initializeWindowControls() {
  console.log('[Window] Inicializando controles de janela...');
  console.log('[Window] window.y20 disponível?', !!window.y20);
  console.log('[Window] window.y20.windowControl disponível?', !!(window.y20 && window.y20.windowControl));
  
  // Botões de controle de janela na tela de login
  const loginDevToolsButton = document.getElementById('login-devtools-window');
  const loginMinimizeButton = document.getElementById('login-minimize-window');
  const loginCloseButton = document.getElementById('login-close-window');
  
  console.log('[Window] loginDevToolsButton encontrado?', !!loginDevToolsButton);
  console.log('[Window] loginMinimizeButton encontrado?', !!loginMinimizeButton);
  console.log('[Window] loginCloseButton encontrado?', !!loginCloseButton);
  
  if (loginDevToolsButton && !loginDevToolsButton.dataset.bound) {
    loginDevToolsButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Window] Clique em DevTools detectado!');
      
      if (window.y20 && window.y20.openDevTools) {
        console.log('[Window] Chamando window.y20.openDevTools()...');
        window.y20.openDevTools().then((result) => {
          console.log('[Window] Resultado do openDevTools:', result);
        }).catch(err => {
          console.error('[Window] Erro ao abrir DevTools:', err);
        });
      } else {
        console.error('[Window] window.y20.openDevTools não está disponível!');
        alert('DevTools não está disponível. window.y20: ' + (window.y20 ? 'existe' : 'não existe'));
      }
    });
    loginDevToolsButton.dataset.bound = 'true';
    console.log('[Window] Event listener adicionado ao botão DevTools (login)');
  }

  if (loginMinimizeButton && !loginMinimizeButton.dataset.bound) {
    loginMinimizeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Window] Clique em minimizar detectado!');
      
      if (window.y20 && window.y20.windowControl) {
        console.log('[Window] Chamando window.y20.windowControl("minimize")...');
        window.y20.windowControl('minimize').then(result => {
          console.log('[Window] Resultado do minimize:', result);
        }).catch(err => {
          console.error('[Window] Erro ao minimizar:', err);
        });
      } else {
        console.error('[Window] window.y20.windowControl não está disponível!');
      }
    });
    loginMinimizeButton.dataset.bound = 'true';
    console.log('[Window] Event listener adicionado ao botão minimizar (login)');
  }

  if (loginCloseButton && !loginCloseButton.dataset.bound) {
    loginCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Window] Clique em fechar detectado!');
      
      if (window.y20 && window.y20.windowControl) {
        console.log('[Window] Chamando window.y20.windowControl("close")...');
        window.y20.windowControl('close').then(result => {
          console.log('[Window] Resultado do close:', result);
        }).catch(err => {
          console.error('[Window] Erro ao fechar:', err);
        });
      } else {
        console.error('[Window] window.y20.windowControl não está disponível!');
      }
    });
    loginCloseButton.dataset.bound = 'true';
    console.log('[Window] Event listener adicionado ao botão fechar (login)');
  }

  // Botões de controle de janela na tela de boas-vindas
  const welcomeMinimizeButton = document.getElementById('welcome-minimize-window');
  const welcomeCloseButton = document.getElementById('welcome-close-window');
  
  console.log('[Window] welcomeMinimizeButton encontrado?', !!welcomeMinimizeButton);
  console.log('[Window] welcomeCloseButton encontrado?', !!welcomeCloseButton);

  if (welcomeMinimizeButton && !welcomeMinimizeButton.dataset.bound) {
    welcomeMinimizeButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Window] Clique em minimizar (welcome) detectado!');
      
      if (window.y20 && window.y20.windowControl) {
        window.y20.windowControl('minimize').then(result => {
          console.log('[Window] Resultado do minimize (welcome):', result);
        }).catch(err => {
          console.error('[Window] Erro ao minimizar (welcome):', err);
        });
      } else {
        console.error('[Window] window.y20.windowControl não está disponível!');
      }
    });
    welcomeMinimizeButton.dataset.bound = 'true';
    console.log('[Window] Event listener adicionado ao botão minimizar (welcome)');
  }

  if (welcomeCloseButton && !welcomeCloseButton.dataset.bound) {
    welcomeCloseButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Window] Clique em fechar (welcome) detectado!');
      
      if (window.y20 && window.y20.windowControl) {
        window.y20.windowControl('close').then(result => {
          console.log('[Window] Resultado do close (welcome):', result);
        }).catch(err => {
          console.error('[Window] Erro ao fechar (welcome):', err);
        });
      } else {
        console.error('[Window] window.y20.windowControl não está disponível!');
      }
    });
    welcomeCloseButton.dataset.bound = 'true';
    console.log('[Window] Event listener adicionado ao botão fechar (welcome)');
  }
  
  console.log('[Window] Inicialização de controles de janela concluída');
}

async function renderEmulatorGallery() {
  const gallery = document.getElementById('emulator-gallery');
  if (!gallery) return;
  gallery.innerHTML = '';

  // Verificar se usuário tem key VIP
  const hasVIP = await hasVIPKey();

  for (const group of emulatorGroups) {
    const wrapper = document.createElement('div');
    wrapper.className = 'emulator-group';

    const heading = document.createElement('h3');
    heading.textContent = group.title;
    wrapper.appendChild(heading);

    const grid = document.createElement('div');
    grid.className = 'emulator-group-grid';

    for (const item of group.items) {
      const card = document.createElement('div');
      card.className = 'emulator-card';

      const img = document.createElement('img');
      img.alt = item.title;
      
      // Resolver caminho da imagem usando IPC
      if (window.y20 && window.y20.emulatorResolveImage) {
        try {
          const result = await window.y20.emulatorResolveImage(item.image);
          if (result && result.success && result.url) {
            img.src = result.url;
          } else {
            img.style.display = 'none';
          }
        } catch (e) {
          console.error('Erro ao resolver imagem:', e);
          img.style.display = 'none';
        }
      } else {
        // Fallback: tentar usar caminho direto
        img.src = item.image;
      }
      
      img.onerror = () => { img.style.display = 'none'; };
      card.appendChild(img);

      const body = document.createElement('div');
      body.className = 'emulator-body';

      const title = document.createElement('h4');
      title.textContent = item.title;
      body.appendChild(title);

      // Container para os botões
      const actionsContainer = document.createElement('div');
      actionsContainer.style.display = 'flex';
      actionsContainer.style.gap = '8px';
      actionsContainer.style.width = '100%';

      // Botão Baixar (normal)
      const action = document.createElement('button');
      action.type = 'button';
      action.className = 'emulator-action';
      action.textContent = 'Baixar';
      action.style.flex = '1';
      action.title = 'Link direto para key vip';
      action.addEventListener('mouseenter', (e) => {
        // Criar tooltip
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Link direto para key vip';
        tooltip.style.cssText = `
          position: absolute;
          background: rgba(0, 0, 0, 0.9);
          color: #fff;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          pointer-events: none;
          z-index: 10000;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        tooltip.id = 'emulator-download-tooltip';
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
      });
      action.addEventListener('mouseleave', () => {
        const tooltip = document.getElementById('emulator-download-tooltip');
        if (tooltip) tooltip.remove();
      });
      action.addEventListener('click', () => {
        if (window.y20.openExternal) {
          window.y20.openExternal(item.url);
        } else {
          window.open(item.url, '_blank');
        }
      });

      // Botão Vip💎
      const vipAction = document.createElement('button');
      vipAction.type = 'button';
      vipAction.className = 'emulator-action';
      vipAction.textContent = 'Vip💎';
      vipAction.style.flex = '1';
      vipAction.style.background = hasVIP ? 'linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 152, 0, 0.2))' : 'rgba(255, 255, 255, 0.05)';
      vipAction.style.border = hasVIP ? '1px solid rgba(255, 193, 7, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)';
      vipAction.style.color = hasVIP ? '#ffc107' : 'rgba(255, 255, 255, 0.4)';
      vipAction.style.cursor = hasVIP ? 'pointer' : 'not-allowed';
      vipAction.disabled = !hasVIP;
      
      if (hasVIP && item.vipUrl) {
        vipAction.addEventListener('click', () => {
          if (window.y20.openExternal) {
            window.y20.openExternal(item.vipUrl);
          } else {
            window.open(item.vipUrl, '_blank');
          }
        });
      } else {
        vipAction.addEventListener('click', () => {
          showToast('Você precisa de uma key VIP para acessar este link', 'warning');
        });
      }

      actionsContainer.appendChild(action);
      actionsContainer.appendChild(vipAction);
      body.appendChild(actionsContainer);
      card.appendChild(body);
      grid.appendChild(card);
    }

    wrapper.appendChild(grid);
    gallery.appendChild(wrapper);
  }
}

async function loadPowerPlanActions(force = false) {
  if (powerPlanState.loading || (powerPlanState.loaded && !force)) return;
  const emptyState = document.getElementById('powerplan-empty');
  const applyContainer = document.getElementById('powerplan-apply');
  if (!applyContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  powerPlanState.loading = true;
  try {
    const result = await window.y20.powerPlanList();
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    powerPlanState.loaded = true;
    powerPlanState.apply = Array.isArray(result.apply) ? result.apply : [];
    renderPowerPlanActions();
    if (emptyState) {
      emptyState.hidden = powerPlanState.apply.length > 0;
    }
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    powerPlanState.loading = false;
  }
}

function renderPowerPlanActions() {
  const applyContainer = document.getElementById('powerplan-apply');
  const removeAllBtn = document.getElementById('power-plan-remove-all-btn');
  if (!applyContainer) return;

  applyContainer.innerHTML = '';

  powerPlanState.apply.forEach((entry) => {
    const card = createPowerPlanCard(entry);
    applyContainer.appendChild(card);
  });

  // Event listener para botão Apagar todos planos energia
  if (removeAllBtn) {
    removeAllBtn.onclick = async () => {
      if (!confirm('Tem certeza que deseja apagar todos os planos de energia? Esta ação não pode ser desfeita.')) {
        return;
      }

      try {
        removeAllBtn.disabled = true;
        const originalHTML = removeAllBtn.innerHTML;
        removeAllBtn.innerHTML = `
          <span class="button-icon">⚙️</span>
          <span>Removendo planos de energia...</span>
        `;

        // Adicionar animação
        removeAllBtn.style.position = 'relative';
        removeAllBtn.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: script-loading-shimmer 2s infinite;
          pointer-events: none;
        `;
        removeAllBtn.appendChild(overlay);

        const result = await window.y20.powerPlanRemoveAll();
        
        overlay.remove();

        if (result.success) {
          removeAllBtn.innerHTML = `
            <span class="button-icon">✅</span>
            <span>Planos removidos com sucesso!</span>
          `;
          removeAllBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          
          showToast(result.message || 'Todos os planos de energia foram removidos com sucesso.');
          
          // Restaurar botão após 2 segundos
          setTimeout(() => {
            removeAllBtn.innerHTML = originalHTML;
            removeAllBtn.disabled = false;
            removeAllBtn.style.background = '';
          }, 2000);
        } else {
          removeAllBtn.innerHTML = `
            <span class="button-icon">❌</span>
            <span>Erro ao remover planos</span>
          `;
          removeAllBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          
          showToast(result.message || 'Não foi possível remover os planos de energia.', 'error');
          
          // Restaurar botão após 3 segundos
          setTimeout(() => {
            removeAllBtn.innerHTML = originalHTML;
            removeAllBtn.disabled = false;
            removeAllBtn.style.background = '';
          }, 3000);
        }
      } catch (error) {
        console.error('[PowerPlan] Erro ao remover planos:', error);
        showToast('Erro ao remover planos de energia.', 'error');
        removeAllBtn.disabled = false;
        removeAllBtn.innerHTML = `
          <span class="button-icon">🗑️</span>
          <span>Apagar todos planos energia</span>
        `;
      }
    };
  }
}

function createPowerPlanCard(entry) {
  const card = document.createElement('div');
  card.className = 'script-card';

  const info = document.createElement('div');
  info.className = 'script-info';

  const title = document.createElement('h4');
  title.textContent = entry.name;
  info.appendChild(title);

  const description = document.createElement('span');
  description.className = 'script-type';
  description.textContent = getScriptDescription(entry);
  info.appendChild(description);

  card.appendChild(info);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'primary';
  button.setAttribute('data-script-id', entry.id);
  button.setAttribute('data-script-name', entry.name);

  // Verificar se o script já foi executado nesta sessão
  const isExecuted = powerPlanState.executed.has(entry.id);

  if (isExecuted) {
    // Se já foi executado, mostrar estado "Executado"
    button.textContent = '✓ Executado';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    button.style.cursor = 'default';
    button.disabled = false;
    button.setAttribute('data-executed', 'true');
  } else {
    button.textContent = 'Executar';
    button.setAttribute('data-executed', 'false');
  }

  // Estado de execução (será atualizado durante a execução)
  button.setAttribute('data-executing', 'false');

  button.addEventListener('click', (e) => {
    // Verificação imediata de acesso ANTES de qualquer execução
    if (currentAccessLevel === 'simple') {
      const panel = button.closest('.config-panel');
      if (panel && (panel.id === 'panel-power-plan' || panel.id === 'panel-cleanup-windows' || panel.id === 'panel-disable-windows' || panel.id === 'panel-important-scripts' || panel.id === 'panel-booster-robusta')) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return;
      }
    }
    runPowerPlanScript(entry, button);
  });
  card.appendChild(button);

  return card;
}

async function runPowerPlanScript(entry, buttonElement = null) {
  const button = buttonElement || document.querySelector(`[data-script-id="${entry.id}"]`);
  if (!button) return;

  // Verificar se já foi executado
  if (powerPlanState.executed.has(entry.id)) {
    return;
  }

  // Verificar se está executando
  if (button.getAttribute('data-executing') === 'true') {
    return;
  }

  addLogEntry(`Aplicou: Plano Energia - ${entry.name}`, 'info');

  // Preparar animação de execução
  const originalHTML = button.innerHTML;
  const originalStyles = {
    background: button.style.background,
    boxShadow: button.style.boxShadow,
    transform: button.style.transform,
    cursor: button.style.cursor
  };

  // Estado "executando"
  button.disabled = true;
  button.setAttribute('data-executing', 'true');
  button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
  button.style.boxShadow = '0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4)';
  button.style.transform = 'scale(0.98)';
  button.style.cursor = 'wait';
  button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 14px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Executando...</span>';

  // Adicionar overlay de shimmer
  const overlay = document.createElement('div');
  overlay.className = 'script-executing-overlay';
  overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); background-size: 200% 100%; animation: script-loading-shimmer 1.5s infinite; border-radius: inherit; pointer-events: none;';
  button.style.position = 'relative';
  button.appendChild(overlay);

  // Adicionar estilos de animação se não existirem
  if (!document.getElementById('script-executing-styles')) {
    const style = document.createElement('style');
    style.id = 'script-executing-styles';
    style.textContent = `
      @keyframes script-loading-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes script-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes script-executing-pulse {
        0%, 100% { box-shadow: 0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4); }
        50% { box-shadow: 0 6px 30px rgba(112, 88, 255, 0.8), 0 0 40px rgba(112, 88, 255, 0.6); }
      }
    `;
    document.head.appendChild(style);
  }

  // Aguardar um pouco para mostrar a animação
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // Garantir tempo mínimo de animação (2.5 segundos total)
    const [result] = await Promise.all([
      window.y20.powerPlanRun(entry.id),
      new Promise(resolve => setTimeout(resolve, 1700))
    ]);

    // Remover overlay
    if (overlay.parentNode) {
      overlay.remove();
    }

    if (result && result.success) {
      // Sucesso - mostrar estado "executado" e marcar como executado na sessão
      powerPlanState.executed.add(entry.id);

      if (button) {
        button.disabled = false;
        button.setAttribute('data-executing', 'false');
        button.setAttribute('data-executed', 'true');
        button.textContent = '✓ Executado';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.style.cursor = 'default';
        button.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.4)';
        button.style.transform = 'scale(1)';
      }

      showToast(`${entry.name} executado com sucesso! ✓`);
    } else {
      throw new Error(result?.message || 'Falha ao executar script.');
    }
  } catch (error) {
    // Remover overlay em caso de erro
    if (overlay.parentNode) {
      overlay.remove();
    }

    // Restaurar estado original
    if (button) {
      button.disabled = false;
      button.setAttribute('data-executing', 'false');
      button.innerHTML = originalHTML;
      button.style.background = originalStyles.background;
      button.style.boxShadow = originalStyles.boxShadow;
      button.style.transform = originalStyles.transform;
      button.style.cursor = originalStyles.cursor;
    }
    showToast(error.message || 'Falha ao executar script.', 'error');
  }
}

async function loadCleanupWindowsActions(force = false) {
  if (cleanupWindowsState.loading || (cleanupWindowsState.loaded && !force)) return;
  const emptyState = document.getElementById('cleanup-empty');
  const applyContainer = document.getElementById('cleanup-apply');
  if (!applyContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  cleanupWindowsState.loading = true;
  try {
    const result = await window.y20.cleanupWindowsList();
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    cleanupWindowsState.loaded = true;
    cleanupWindowsState.apply = Array.isArray(result.apply) ? result.apply : [];
    renderCleanupWindowsActions();
    if (emptyState) {
      emptyState.hidden = cleanupWindowsState.apply.length > 0;
    }
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    cleanupWindowsState.loading = false;
  }
}

function renderCleanupWindowsActions() {
  const applyContainer = document.getElementById('cleanup-apply');
  if (!applyContainer) return;

  applyContainer.innerHTML = '';

  cleanupWindowsState.apply.forEach((entry) => {
    const card = createCleanupCard(entry);
    applyContainer.appendChild(card);
  });
}

function createCleanupCard(entry) {
  const card = document.createElement('div');
  card.className = 'script-card';

  const info = document.createElement('div');
  info.className = 'script-info';

  const title = document.createElement('h4');
  title.textContent = entry.name;
  info.appendChild(title);

  const description = document.createElement('span');
  description.className = 'script-type';
  description.textContent = getScriptDescription(entry);
  info.appendChild(description);

  card.appendChild(info);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'primary';
  button.setAttribute('data-script-id', entry.id);
  button.setAttribute('data-script-name', entry.name);

  const isExecuted = cleanupWindowsState.executed.has(entry.id);

  if (isExecuted) {
    button.textContent = '✓ Executado';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    button.style.cursor = 'default';
    button.disabled = false;
    button.setAttribute('data-executed', 'true');
  } else {
    button.textContent = 'Executar';
    button.setAttribute('data-executed', 'false');
  }

  button.setAttribute('data-executing', 'false');
  button.addEventListener('click', (e) => {
    // Verificação imediata de acesso ANTES de qualquer execução
    if (currentAccessLevel === 'simple') {
      const panel = button.closest('.config-panel');
      if (panel && (panel.id === 'panel-cleanup-windows' || panel.id === 'panel-disable-windows' || panel.id === 'panel-important-scripts' || panel.id === 'panel-booster-robusta')) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return;
      }
    }
    runCleanupScript(entry, button);
  });
  card.appendChild(button);

  return card;
}

async function runCleanupScript(entry, buttonElement = null) {
  const button = buttonElement || document.querySelector(`[data-script-id="${entry.id}"]`);
  if (!button) return;

  if (cleanupWindowsState.executed.has(entry.id) || button.getAttribute('data-executing') === 'true') {
    return;
  }

  addLogEntry(`Aplicou: Limpeza Windows - ${entry.name}`, 'info');

  const originalHTML = button.innerHTML;
  const originalStyles = {
    background: button.style.background,
    boxShadow: button.style.boxShadow,
    transform: button.style.transform,
    cursor: button.style.cursor
  };

  button.disabled = true;
  button.setAttribute('data-executing', 'true');
  button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
  button.style.boxShadow = '0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4)';
  button.style.transform = 'scale(0.98)';
  button.style.cursor = 'wait';
  button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 14px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Executando...</span>';

  const overlay = document.createElement('div');
  overlay.className = 'script-executing-overlay';
  overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); background-size: 200% 100%; animation: script-loading-shimmer 1.5s infinite; border-radius: inherit; pointer-events: none;';
  button.style.position = 'relative';
  button.appendChild(overlay);

  if (!document.getElementById('script-executing-styles')) {
    const style = document.createElement('style');
    style.id = 'script-executing-styles';
    style.textContent = `
      @keyframes script-loading-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes script-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const [result] = await Promise.all([
      window.y20.cleanupWindowsRun(entry.id),
      new Promise(resolve => setTimeout(resolve, 1700))
    ]);

    if (overlay.parentNode) overlay.remove();

    if (result && result.success) {
      cleanupWindowsState.executed.add(entry.id);

      if (button) {
        button.disabled = false;
        button.setAttribute('data-executing', 'false');
        button.setAttribute('data-executed', 'true');
        button.textContent = '✓ Executado';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.style.cursor = 'default';
        button.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.4)';
        button.style.transform = 'scale(1)';
      }

      showToast(`${entry.name} executado com sucesso! ✓`);
    } else {
      throw new Error(result?.message || 'Falha ao executar script.');
    }
  } catch (error) {
    if (overlay.parentNode) overlay.remove();
    if (button) {
      button.disabled = false;
      button.setAttribute('data-executing', 'false');
      button.innerHTML = originalHTML;
      button.style.background = originalStyles.background;
      button.style.boxShadow = originalStyles.boxShadow;
      button.style.transform = originalStyles.transform;
      button.style.cursor = originalStyles.cursor;
    }
    showToast(error.message || 'Falha ao executar script.', 'error');
  }
}

async function loadDisableWindowsActions(force = false) {
  if (disableWindowsState.loading || (disableWindowsState.loaded && !force)) return;
  const emptyState = document.getElementById('disable-empty');
  const applyContainer = document.getElementById('disable-apply');
  const revertBtn = document.getElementById('disable-windows-revert-btn');
  if (!applyContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  disableWindowsState.loading = true;
  try {
    const result = await window.y20.disableWindowsList();
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    disableWindowsState.loaded = true;
    disableWindowsState.apply = Array.isArray(result.apply) ? result.apply : [];
    disableWindowsState.revert = Array.isArray(result.revert) ? result.revert : [];
    renderDisableWindowsActions();
    
    if (emptyState) {
      emptyState.hidden = disableWindowsState.apply.length > 0;
    }
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    disableWindowsState.loading = false;
  }
}

function renderDisableWindowsActions() {
  const applyContainer = document.getElementById('disable-apply');
  const revertBtn = document.getElementById('disable-windows-revert-btn');
  if (!applyContainer) return;

  applyContainer.innerHTML = '';

  disableWindowsState.apply.forEach((entry) => {
    const card = createDisableCard(entry);
    applyContainer.appendChild(card);
  });

  // Event listener para botão Reverter
  if (revertBtn) {
    revertBtn.onclick = async (e) => {
      // Verificação imediata de acesso ANTES de qualquer execução
      if (currentAccessLevel === 'simple') {
        e.preventDefault();
        e.stopPropagation();
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return;
      }
      
      if (!confirm('Tem certeza que deseja executar todos os scripts de reversão? Esta ação irá reverter todas as alterações feitas.')) {
        return;
      }

      try {
        revertBtn.disabled = true;
        const originalHTML = revertBtn.innerHTML;
        revertBtn.innerHTML = `
          <span class="button-icon">⚙️</span>
          <span>Revertendo...</span>
        `;

        // Adicionar animação
        revertBtn.style.position = 'relative';
        revertBtn.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: script-loading-shimmer 2s infinite;
          pointer-events: none;
        `;
        revertBtn.appendChild(overlay);

        // Executar todos os scripts de reversão da pasta Reverte
        const result = await window.y20.disableWindowsRevertAll();
        
        overlay.remove();

        if (result.success) {
          revertBtn.innerHTML = `
            <span class="button-icon">✅</span>
            <span>Revertido com sucesso!</span>
          `;
          revertBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          
          // Limpar estado de execução
          disableWindowsState.executed.clear();
          disableWindowsState.executedNames.clear();
          
          // Recarregar interface
          renderDisableWindowsActions();
          
          const message = `Todos os scripts de reversão foram executados! (${result.successCount}/${result.executed} sucesso)`;
          showToast(message);
          
          // Restaurar botão após 2 segundos
          setTimeout(() => {
            revertBtn.innerHTML = originalHTML;
            revertBtn.disabled = false;
            revertBtn.style.background = '';
          }, 2000);
        } else {
          revertBtn.innerHTML = `
            <span class="button-icon">❌</span>
            <span>Erro ao reverter</span>
          `;
          revertBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          
          const message = result.message || `Alguns scripts falharam. (${result.successCount || 0}/${result.executed || 0} sucesso)`;
          showToast(message, 'error');
          
          // Restaurar botão após 3 segundos
          setTimeout(() => {
            revertBtn.innerHTML = originalHTML;
            revertBtn.disabled = false;
            revertBtn.style.background = '';
          }, 3000);
        }
      } catch (error) {
        console.error('[Disable Windows] Erro ao reverter:', error);
        showToast('Erro ao executar scripts de reversão.', 'error');
        revertBtn.disabled = false;
        revertBtn.innerHTML = `
          <span class="button-icon">🔄</span>
          <span>Reverter</span>
        `;
        if (overlay && overlay.parentNode) {
          overlay.remove();
        }
      }
    };
  }
}

// ======================
// Scripts Importantes
// ======================
async function loadImportantScripts(force = false) {
  if (importantScriptsState.loading || (importantScriptsState.loaded && !force)) return;
  const emptyState = document.getElementById('important-empty');
  const applyContainer = document.getElementById('important-apply');
  const runAllBtn = document.getElementById('important-run-all-btn');
  if (!applyContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  importantScriptsState.loading = true;
  try {
    // Ler da pasta solicitada pelo usuário (retorno esperado: { success, scripts })
    const result = await window.y20.optimizationPackList('Otimizetionn');
    if (!result) {
      throw new Error('Não foi possível carregar os scripts.');
    }
    importantScriptsState.loaded = true;
    importantScriptsState.items = Array.isArray(result)
      ? result
      : (result.scripts || result.apply || []);

    renderImportantScripts();
    if (emptyState) {
      emptyState.hidden = importantScriptsState.items.length > 0;
    }
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    importantScriptsState.loading = false;
  }
}

function renderImportantScripts() {
  const applyContainer = document.getElementById('important-apply');
  if (!applyContainer) return;
  applyContainer.innerHTML = '';

  // util para modal .reg
  function showRegConfirm(entry, onApply) {
    const modal = document.getElementById('reg-confirm-modal');
    const title = document.getElementById('reg-confirm-title');
    const msg = document.getElementById('reg-confirm-message');
    const btnCancel = document.getElementById('reg-confirm-cancel');
    const btnAccept = document.getElementById('reg-confirm-accept');
    if (!modal || !title || !msg || !btnCancel || !btnAccept) {
      if (confirm(`Aplicar o registro "${entry.name}"? Você precisa confirmar duas vezes.`)) {
        if (confirm('Confirme novamente para aplicar o registro.')) {
          onApply();
        }
      }
      return;
    }
    let step = 1;
    title.textContent = `Aplicar registro (.reg)`;
    msg.textContent = `O script "${entry.name}" vai alterar o registro do Windows. Confirme para continuar.`;
    btnAccept.textContent = 'Confirmar';
    modal.hidden = false;

    const close = () => { modal.hidden = true; btnCancel.onclick = null; btnAccept.onclick = null; };

    btnCancel.onclick = () => close();
    btnAccept.onclick = () => {
      if (step === 1) {
        step = 2;
        msg.textContent = 'Confirme novamente para aplicar.';
        btnAccept.textContent = 'Aplicar';
      } else {
        close();
        onApply();
      }
    };
  }

  importantScriptsState.items.forEach((entry) => {
    const card = document.createElement('div');
    card.className = 'script-card';

    const info = document.createElement('div');
    info.className = 'script-info';

    const title = document.createElement('h4');
    title.textContent = entry.name;
    info.appendChild(title);

    const description = document.createElement('span');
    description.className = 'script-type';
    description.textContent = getScriptDescription(entry);
    info.appendChild(description);

    card.appendChild(info);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'primary';
    button.textContent = 'Executar';
    button.addEventListener('click', async (e) => {
      // Verificação imediata de acesso ANTES de qualquer execução
      if (currentAccessLevel === 'simple') {
        const panel = button.closest('.config-panel');
        if (panel && (panel.id === 'panel-important-scripts' || panel.id === 'panel-booster-robusta')) {
          e.preventDefault();
          e.stopPropagation();
          showToast('Esta funcionalidade requer key ativada', 'warning');
          return;
        }
      }
      
      try {
        const run = async () => {
          // animação simples para .bat/.cmd
          const isBatch = (entry.type || '').toUpperCase() === 'BAT' || (entry.type || '').toUpperCase() === 'CMD';
          let overlay;
          const original = button.textContent;
          if (isBatch) {
            button.disabled = true;
            button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
            button.style.boxShadow = '0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4)';
            button.style.transform = 'scale(0.98)';
            button.style.cursor = 'wait';
            button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 14px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Executando...</span>';
            overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent); background-size: 200% 100%; animation: script-loading-shimmer 1.5s infinite; border-radius: inherit; pointer-events: none;';
            button.style.position = 'relative';
            button.appendChild(overlay);
            
            // Aguardar delay inicial
            await new Promise(resolve => setTimeout(resolve, 800));
          }

          const startTime = Date.now();
          const res = await window.y20.optimizationPackRunOne(entry.id);
          
          // Garantir tempo mínimo de animação (2.5 segundos total)
          if (isBatch) {
            const elapsedTime = Date.now() - startTime;
            const minAnimationTime = 2500;
            const remainingTime = Math.max(0, minAnimationTime - elapsedTime);
            if (remainingTime > 0) {
              await new Promise(resolve => setTimeout(resolve, remainingTime));
            }
          }
          
          if (!res || !res.success) {
            throw new Error(res?.message || 'Falha ao executar script');
          }

          if (overlay) overlay.remove();
          if (isBatch) {
            button.style.background = '';
            button.style.boxShadow = '';
            button.style.transform = '';
            button.style.cursor = '';
            button.textContent = original;
            button.disabled = false;
          }
          addLogEntry(`Aplicou: Script - ${entry.name}`, 'info');
          showToast(`${entry.name} executado.`);
          
          // Atualizar porcentagem de otimização em tempo real após script executado
          try {
            const scoreResult = await window.y20?.calculateOptimizationScore?.();
            if (scoreResult !== undefined) {
              setGaugeValue(scoreResult);
              console.log('[Optimization] Porcentagem atualizada (tempo real) após script individual:', scoreResult);
            }
          } catch (scoreError) {
            console.warn('[Optimization] Erro ao atualizar porcentagem em tempo real:', scoreError);
          }
        };

        if ((entry.type || '').toUpperCase() === 'REG') {
          showRegConfirm(entry, run);
        } else {
          await run();
        }
      } catch (e) {
        button.disabled = false;
        showToast(e.message || 'Erro ao executar script.', 'error');
      }
    });

    card.appendChild(button);
    applyContainer.appendChild(card);
  });
}

// ======================
// Booster Robusta
// ======================
async function loadBoosterRobusta(force = false) {
  if (boosterRobustaState.loading || (boosterRobustaState.loaded && !force)) return;
  
  const emptyState = document.getElementById('booster-empty');
  const applyContainer = document.getElementById('booster-apply');
  if (!applyContainer) return;

  if (!force && applyContainer.dataset.loaded === 'true') return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  boosterRobustaState.loading = true;
  try {
    const result = await window.y20.optimizationPackList('Booster Robusta');
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    const items = Array.isArray(result) ? result : (result.scripts || []);
    boosterRobustaState.loaded = true;
    boosterRobustaState.items = items;
    
    if (!items.length) {
      if (emptyState) emptyState.hidden = false;
      return;
    }

    items.forEach((entry) => {
      const card = document.createElement('div');
      card.className = 'script-card';

      const info = document.createElement('div');
      info.className = 'script-info';

      const title = document.createElement('h4');
      title.textContent = entry.name;
      info.appendChild(title);

      const description = document.createElement('span');
      description.className = 'script-type';
      description.textContent = getScriptDescription(entry);
      info.appendChild(description);

      card.appendChild(info);

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'primary';
      button.textContent = 'Executar';
      button.addEventListener('click', async (e) => {
        // Verificação imediata de acesso ANTES de qualquer execução
        if (currentAccessLevel === 'simple') {
          const panel = button.closest('.config-panel');
          if (panel && panel.id === 'panel-booster-robusta') {
            e.preventDefault();
            e.stopPropagation();
            showToast('Esta funcionalidade requer key ativada', 'warning');
            return;
          }
        }
        
        // Animação para .bat/.cmd
        const isBatch = (entry.type || '').toUpperCase() === 'BAT' || (entry.type || '').toUpperCase() === 'CMD';
        let overlay = null;
        const original = button.textContent;
        
        try {
          // Adicionar log baseado no painel
          if (panel && panel.id === 'panel-booster-robusta') {
            addLogEntry(`Aplicou: Booster Robusta - ${entry.name}`, 'info');
          }
          
          if (isBatch) {
            button.disabled = true;
            button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
            button.style.boxShadow = '0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4)';
            button.style.transform = 'scale(0.98)';
            button.style.cursor = 'wait';
            button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 14px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Executando...</span>';
            overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute; inset:0; background: linear-gradient(90deg, transparent, rgba(255,255,255,.3), transparent); background-size: 200% 100%; animation: script-loading-shimmer 1.5s infinite; border-radius: inherit; pointer-events: none;';
            button.style.position = 'relative';
            button.appendChild(overlay);
            
            // Aguardar delay inicial
            await new Promise(resolve => setTimeout(resolve, 800));
          }
          
          const startTime = Date.now();
          const res = await window.y20.optimizationPackRunOne(entry.id);
          
          // Garantir tempo mínimo de animação (2.5 segundos total)
          if (isBatch) {
            const elapsedTime = Date.now() - startTime;
            const minAnimationTime = 2500;
            const remainingTime = Math.max(0, minAnimationTime - elapsedTime);
            if (remainingTime > 0) {
              await new Promise(resolve => setTimeout(resolve, remainingTime));
            }
          }
          
          if (!res || !res.success) {
            throw new Error(res?.message || 'Falha ao executar script');
          }
          
          if (overlay && overlay.parentNode) overlay.remove();
          if (isBatch) {
            button.style.background = '';
            button.style.boxShadow = '';
            button.style.transform = '';
            button.style.cursor = '';
            button.textContent = original;
            button.disabled = false;
          }
          showToast(`${entry.name} executado.`);
          
          // Atualizar porcentagem de otimização em tempo real após script executado
          try {
            const scoreResult = await window.y20?.calculateOptimizationScore?.();
            if (scoreResult !== undefined) {
              setGaugeValue(scoreResult);
              console.log('[Optimization] Porcentagem atualizada (tempo real) após script individual:', scoreResult);
            }
          } catch (scoreError) {
            console.warn('[Optimization] Erro ao atualizar porcentagem em tempo real:', scoreError);
          }
        } catch (e) {
          if (overlay && overlay.parentNode) overlay.remove();
          if (button) {
            button.style.background = '';
            button.style.boxShadow = '';
            button.style.transform = '';
            button.style.cursor = '';
            button.textContent = original;
            button.disabled = false;
          }
          showToast(e.message || 'Erro ao executar script.', 'error');
        }
      });

      card.appendChild(button);
      applyContainer.appendChild(card);
    });

    applyContainer.dataset.loaded = 'true';
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    boosterRobustaState.loading = false;
  }
}

function createDisableCard(entry) {
  const card = document.createElement('div');
  card.className = 'script-card';

  const info = document.createElement('div');
  info.className = 'script-info';

  const title = document.createElement('h4');
  title.textContent = entry.name;
  info.appendChild(title);

  const description = document.createElement('span');
  description.className = 'script-type';
  description.textContent = getScriptDescription(entry);
  info.appendChild(description);

  card.appendChild(info);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'primary';
  button.setAttribute('data-script-id', entry.id);
  button.setAttribute('data-script-name', entry.name);

  const isExecuted = disableWindowsState.executed.has(entry.id);

  if (isExecuted) {
    button.textContent = '✓ Executado';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    button.style.cursor = 'default';
    button.disabled = false;
    button.setAttribute('data-executed', 'true');
  } else {
    button.textContent = 'Executar';
    button.setAttribute('data-executed', 'false');
  }

  button.setAttribute('data-executing', 'false');
  button.addEventListener('click', (e) => {
    // Verificação imediata de acesso ANTES de qualquer execução
    if (currentAccessLevel === 'simple') {
      const panel = button.closest('.config-panel');
      if (panel && (panel.id === 'panel-disable-windows' || panel.id === 'panel-important-scripts' || panel.id === 'panel-booster-robusta')) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return;
      }
    }
    runDisableScript(entry, button);
  });
  card.appendChild(button);

  return card;
}

async function runDisableScript(entry, buttonElement = null) {
  const button = buttonElement || document.querySelector(`[data-script-id="${entry.id}"]`);
  const revertBtn = document.getElementById('disable-windows-revert-btn');
  if (!button) return;

  if (disableWindowsState.executed.has(entry.id) || button.getAttribute('data-executing') === 'true') {
    return;
  }

  addLogEntry(`Aplicou: Desativar Windows - ${entry.name}`, 'info');

  const originalHTML = button.innerHTML;
  const originalStyles = {
    background: button.style.background,
    boxShadow: button.style.boxShadow,
    transform: button.style.transform,
    cursor: button.style.cursor
  };

  button.disabled = true;
  button.setAttribute('data-executing', 'true');
  button.style.background = 'linear-gradient(135deg, #7058ff, #9b7fff)';
  button.style.boxShadow = '0 4px 20px rgba(112, 88, 255, 0.6), 0 0 30px rgba(112, 88, 255, 0.4)';
  button.style.transform = 'scale(0.98)';
  button.style.cursor = 'wait';
  button.innerHTML = '<span style="display: flex; align-items: center; gap: 8px; font-size: 14px;"><span style="animation: script-spin 1s linear infinite;">⚙️</span> Executando...</span>';

  const overlay = document.createElement('div');
  overlay.className = 'script-executing-overlay';
  overlay.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); background-size: 200% 100%; animation: script-loading-shimmer 1.5s infinite; border-radius: inherit; pointer-events: none;';
  button.style.position = 'relative';
  button.appendChild(overlay);

  if (!document.getElementById('script-executing-styles')) {
    const style = document.createElement('style');
    style.id = 'script-executing-styles';
    style.textContent = `
      @keyframes script-loading-shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      @keyframes script-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    const [result] = await Promise.all([
      window.y20.disableWindowsRun(entry.id),
      new Promise(resolve => setTimeout(resolve, 1700))
    ]);

    if (overlay.parentNode) overlay.remove();

    if (result && result.success) {
      disableWindowsState.executed.add(entry.id);
      disableWindowsState.executedNames.set(entry.id, entry.name);

      if (button) {
        button.disabled = false;
        button.setAttribute('data-executing', 'false');
        button.setAttribute('data-executed', 'true');
        button.textContent = '✓ Executado';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.style.cursor = 'default';
        button.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.4)';
        button.style.transform = 'scale(1)';
      }

      // Mostrar botão Reverter
      if (revertBtn) {
        revertBtn.style.display = 'inline-flex';
      }

      showToast(`${entry.name} executado com sucesso! ✓`);
    } else {
      throw new Error(result?.message || 'Falha ao executar script.');
    }
  } catch (error) {
    if (overlay.parentNode) overlay.remove();
    if (button) {
      button.disabled = false;
      button.setAttribute('data-executing', 'false');
      button.innerHTML = originalHTML;
      button.style.background = originalStyles.background;
      button.style.boxShadow = originalStyles.boxShadow;
      button.style.transform = originalStyles.transform;
      button.style.cursor = originalStyles.cursor;
    }
    showToast(error.message || 'Falha ao executar script.', 'error');
  }
}

async function loadInputLagActions(force = false) {
  if (inputLagState.loading || (inputLagState.loaded && !force)) return;
  const emptyState = document.getElementById('inputlag-empty');
  const applyContainer = document.getElementById('inputlag-apply');
  const revertContainer = document.getElementById('inputlag-revert');
  if (!applyContainer || !revertContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';
  revertContainer.innerHTML = '';

  inputLagState.loading = true;
  try {
    const result = await window.y20.inputLagList();
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    inputLagState.loaded = true;
    inputLagState.apply = Array.isArray(result.apply) ? result.apply : [];
    inputLagState.revert = Array.isArray(result.revert) ? result.revert : [];
    renderInputLagActions();
    if (emptyState) {
      emptyState.hidden = inputLagState.apply.length + inputLagState.revert.length > 0;
    }
  } catch (error) {
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    inputLagState.loading = false;
  }
}

function renderInputLagActions() {
  const applyContainer = document.getElementById('inputlag-apply');
  const revertContainer = document.getElementById('inputlag-revert');
  if (!applyContainer || !revertContainer) return;

  applyContainer.innerHTML = '';
  revertContainer.innerHTML = '';

  const createCard = (entry, revert = false) => {
    // Criar card
    const card = document.createElement('div');
    card.className = 'script-card';
    card.setAttribute('data-script-id', entry.id);
    
    // Título
    const title = document.createElement('h5');
    title.textContent = entry.name;
    card.appendChild(title);
    
    // Descrição
    const description = document.createElement('p');
    description.textContent = getScriptDescription(entry);
    description.style.color = 'var(--text-secondary)';
    description.style.fontSize = '12px';
    description.style.marginBottom = '12px';
    card.appendChild(description);
    
    // Botão Executar
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'primary';
    button.setAttribute('data-script-id', entry.id);
    button.setAttribute('data-script-name', entry.name);
    
    // Verificar se o script já foi executado nesta sessão
    const isExecuted = inputLagState.executed.has(entry.id);
    
    if (isExecuted) {
      // Se já foi executado, mostrar estado "Executado"
      button.textContent = '✓ Executado';
      button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      button.style.cursor = 'default';
      button.disabled = false;
      button.setAttribute('data-executed', 'true');
    } else {
      button.textContent = revert ? 'Reverter' : 'Executar';
      button.setAttribute('data-executed', 'false');
    }
    
    // Estado de execução (será atualizado durante a execução)
    button.setAttribute('data-executing', 'false');
    
    button.addEventListener('click', (e) => {
      // Verificação imediata de acesso ANTES de qualquer execução
      if (currentAccessLevel === 'simple') {
        const panel = button.closest('.config-panel');
        if (panel && panel.id === 'panel-delay') {
          e.preventDefault();
          e.stopPropagation();
          showToast('Esta funcionalidade requer key ativada', 'warning');
          return;
        }
      }
      runInputLagScript(entry, button);
    });
    card.appendChild(button);
    
    return card;
  };

  inputLagState.apply.forEach((entry) => {
    applyContainer.appendChild(createCard(entry));
  });
  inputLagState.revert.forEach((entry) => {
    revertContainer.appendChild(createCard(entry, true));
  });
  
  // Adicionar event listener para o botão "Reverter todos"
  const revertAllBtn = document.getElementById('inputlag-revert-all-btn');
  if (revertAllBtn) {
    // Remover listeners anteriores para evitar duplicação
    const newBtn = revertAllBtn.cloneNode(true);
    revertAllBtn.parentNode.replaceChild(newBtn, revertAllBtn);
    
    newBtn.addEventListener('click', async () => {
      if (!confirm('Tem certeza que deseja reverter todos os ajustes? Esta ação irá executar todos os scripts de reversão.')) {
        return;
      }
      
      const originalHTML = newBtn.innerHTML;
      newBtn.disabled = true;
      newBtn.style.position = 'relative';
      newBtn.style.overflow = 'hidden';
      newBtn.innerHTML = `
        <span class="button-icon" style="animation: script-spin 1s linear infinite;">⚙️</span>
        <span>Revertendo...</span>
      `;
      
      // Criar overlay de shimmer
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: script-loading-shimmer 2s infinite;
        pointer-events: none;
      `;
      newBtn.appendChild(overlay);
      
      try {
        const result = await window.y20.inputLagRevertAll();
        
        // Remover overlay
        overlay.remove();
        
        if (result.success) {
          newBtn.innerHTML = `
            <span class="button-icon">✅</span>
            <span>Revertido com sucesso!</span>
          `;
          newBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          showToast(`Todos os ajustes foram revertidos! (${result.successful}/${result.executed} scripts executados)`);
          
          // Marcar todos os scripts de revert como executados
          inputLagState.revert.forEach((entry) => {
            inputLagState.executed.add(entry.id);
          });
          
          // Re-renderizar para atualizar os botões
          renderInputLagActions();
          
          setTimeout(() => {
            newBtn.innerHTML = originalHTML;
            newBtn.style.background = '';
            newBtn.disabled = false;
          }, 2000);
        } else {
          newBtn.innerHTML = `
            <span class="button-icon">⚠️</span>
            <span>Revertido parcialmente</span>
          `;
          newBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
          showToast(`Revertido parcialmente: ${result.successful}/${result.executed} scripts executados com sucesso.`, 'warning');
          
          setTimeout(() => {
            newBtn.innerHTML = originalHTML;
            newBtn.style.background = '';
            newBtn.disabled = false;
          }, 3000);
        }
      } catch (error) {
        console.error('[Input Lag] Erro ao reverter todos:', error);
        overlay.remove();
        
        newBtn.innerHTML = `
          <span class="button-icon">❌</span>
          <span>Erro ao reverter</span>
        `;
        newBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        showToast(error.message || 'Erro ao reverter todos os ajustes.', 'error');
        
        setTimeout(() => {
          newBtn.innerHTML = originalHTML;
          newBtn.style.background = '';
          newBtn.disabled = false;
        }, 3000);
      }
    });
  }
}

async function runInputLagScript(entry, buttonElement = null) {
  // Encontrar o botão se não foi fornecido
  if (!buttonElement) {
    buttonElement = document.querySelector(`button[data-script-id="${entry.id}"]`);
  }
  
  addLogEntry(`Aplicou: Tirar Delay - ${entry.name}`, 'info');
  
  // Se o botão não foi encontrado, criar um estado temporário
  let button = buttonElement;
  let originalHTML = button ? button.innerHTML : 'Executar';
  let originalText = button ? button.textContent : 'Executar';
  
  // Atualizar estado para "executando" com animação melhorada e mais visível
  if (button) {
    button.disabled = true;
    button.setAttribute('data-executing', 'true');
    
    // Salvar estilos originais
    const originalBackground = button.style.background || '';
    const originalTransform = button.style.transform || '';
    const originalBoxShadow = button.style.boxShadow || '';
    
    // Animação melhorada de "executando" - mais visível e lenta
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.style.background = 'linear-gradient(135deg, rgba(112, 88, 255, 1), rgba(88, 68, 220, 1))';
    button.style.cursor = 'wait';
    button.style.boxShadow = '0 0 25px rgba(112, 88, 255, 0.8), 0 4px 20px rgba(112, 88, 255, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.15)';
    button.style.transition = 'all 0.4s ease';
    button.style.transform = 'scale(0.98)';
    
    // Texto com ícone animado mais visível
    button.innerHTML = '<span style="display: inline-flex; align-items: center; gap: 10px; position: relative; z-index: 10;"><span style="display: inline-block; animation: script-spin 0.8s linear infinite; font-size: 16px;">⚙️</span><span style="font-weight: 600;">Executando...</span></span>';
    
    // Overlay de brilho animado mais visível e lento
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'script-executing-overlay';
    loadingOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.6) 30%,
        rgba(255, 255, 255, 0.8) 50%,
        rgba(255, 255, 255, 0.6) 70%,
        transparent 100%);
      animation: script-loading-shimmer 3s ease-in-out infinite;
      pointer-events: none;
      z-index: 1;
    `;
    button.appendChild(loadingOverlay);
    
    // Adicionar animações CSS se não existirem - mais lentas e visíveis
    if (!document.getElementById('script-executing-animations')) {
      const style = document.createElement('style');
      style.id = 'script-executing-animations';
      style.textContent = `
        @keyframes script-loading-shimmer {
          0% { 
            left: -100%;
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
          80% {
            opacity: 0.8;
          }
          100% { 
            left: 100%;
            opacity: 0;
          }
        }
        @keyframes script-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .script-card button[data-executing="true"] {
          animation: script-executing-pulse 2s ease-in-out infinite;
        }
        @keyframes script-executing-pulse {
          0%, 100% {
            box-shadow: 0 0 25px rgba(112, 88, 255, 0.8), 0 4px 20px rgba(112, 88, 255, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.15);
            transform: scale(0.98);
          }
          50% {
            box-shadow: 0 0 40px rgba(112, 88, 255, 1), 0 8px 30px rgba(112, 88, 255, 0.7), inset 0 0 35px rgba(255, 255, 255, 0.25);
            transform: scale(1.02);
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Forçar reflow para garantir que a animação comece
    void button.offsetHeight;
    
    // Aguardar um pouco para garantir que a animação seja visível antes de executar
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  try {
    // Adicionar um delay mínimo para garantir que a animação seja visível
    const minAnimationTime = 2500; // 2.5 segundos mínimo para ver a animação
    const startTime = Date.now();
    
    const result = await window.y20.inputLagRun(entry.id);
    
    // Garantir que a animação seja visível por pelo menos 2.5 segundos
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minAnimationTime - elapsedTime);
    
    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }
    
    // Remover overlay de loading
    if (button) {
      const overlay = button.querySelector('.script-executing-overlay');
      if (overlay) overlay.remove();
      
      // Restaurar estilos originais com transição suave
      button.style.transition = 'all 0.4s ease';
      button.style.background = '';
      button.style.boxShadow = '';
      button.style.transform = '';
      button.removeAttribute('data-executing');
      
      // Aguardar transição antes de continuar
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    
    if (result && result.success) {
      // Sucesso - mostrar estado "executado" e marcar como executado na sessão
      inputLagState.executed.add(entry.id);
      
      if (button) {
        button.disabled = false;
        button.setAttribute('data-executing', 'false');
        button.setAttribute('data-executed', 'true');
        button.textContent = '✓ Executado';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        button.style.cursor = 'default';
        
        // Não resetar - manter executado até reiniciar o painel
        // O estado será resetado apenas quando o painel for recarregado
      }
      
      showToast(`${entry.name} executado com sucesso! ✓`);
    } else {
      // Erro
      if (button) {
        button.disabled = false;
        button.setAttribute('data-executing', 'false');
        button.innerHTML = originalHTML;
        button.style.background = '';
        button.style.cursor = 'pointer';
        button.style.transition = '';
      }
      showToast(result?.message || 'Falha ao executar script.', 'error');
    }
  } catch (error) {
    // Erro
    if (button) {
      const overlay = button.querySelector('.script-executing-overlay');
      if (overlay) overlay.remove();
      
      button.disabled = false;
      button.setAttribute('data-executing', 'false');
      button.innerHTML = originalText;
      button.style.background = '';
      button.style.boxShadow = '';
      button.style.cursor = 'pointer';
      button.style.transition = '';
    }
    showToast(error.message || 'Falha ao executar script.', 'error');
  }
}

// ========== MOUSE FIX FUNCTIONS ==========

async function loadMouseFixActions(force = false) {
  if (mouseFixState.loading || (mouseFixState.loaded && !force)) return;
  const emptyState = document.getElementById('mouse-fix-apply-empty');
  const applyContainer = document.getElementById('mouse-fix-apply-grid');
  if (!applyContainer) return;

  emptyState && (emptyState.hidden = true);
  applyContainer.innerHTML = '';

  mouseFixState.loading = true;
  try {
    // Listar scripts da pasta Mouse fix (exceto "Voltar pro padrão" e "Configurar Manualmente")
    const result = await window.y20.optimizationPackList('Mouse fix');
    if (!result || !result.success) {
      throw new Error(result?.message || 'Não foi possível carregar os scripts.');
    }
    
    // Filtrar apenas pastas com .bat (aplicar_1.bat, aplicar_2.bat, aplicar_3.bat)
    const scripts = Array.isArray(result.scripts) ? result.scripts : [];
    const folders = new Map();
    
    scripts.forEach(script => {
      // Extrair nome da pasta do caminho (ex: "Extremo esquerda, lento/aplicar_1.bat" -> "Extremo esquerda, lento")
      const pathParts = script.path.split(/[/\\]/);
      if (pathParts.length >= 2) {
        const folderName = pathParts[pathParts.length - 2];
        // Ignorar "Voltar pro padrão" e "Configurar Manualmente"
        if (folderName !== 'Voltar pro padrão' && folderName !== 'Configurar Manualmente') {
          if (!folders.has(folderName)) {
            folders.set(folderName, []);
          }
          // Adicionar apenas .bat que começam com "aplicar_"
          if (script.name && script.name.startsWith('aplicar_') && script.name.endsWith('.bat')) {
            folders.get(folderName).push(script);
          }
        }
      }
    });
    
    mouseFixState.loaded = true;
    mouseFixState.apply = Array.from(folders.entries()).map(([folderName, scripts]) => ({
      folderName,
      scripts: scripts.sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por nome
    }));
    
    renderMouseFixActions();
    if (emptyState) {
      emptyState.hidden = mouseFixState.apply.length > 0;
    }
  } catch (error) {
    console.error('[Mouse Fix] Erro ao carregar scripts:', error);
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = error.message || 'Não foi possível carregar os scripts.';
    }
  } finally {
    mouseFixState.loading = false;
  }
}

function renderMouseFixActions() {
  const applyContainer = document.getElementById('mouse-fix-apply-grid');
  if (!applyContainer) return;

  applyContainer.innerHTML = '';

  mouseFixState.apply.forEach((folder) => {
    const card = document.createElement('div');
    card.className = 'script-card';
    
    const title = document.createElement('h5');
    title.textContent = folder.folderName;
    card.appendChild(title);
    
    const description = document.createElement('p');
    description.textContent = `Aplica ajuste de mouse fix: ${folder.folderName}`;
    description.style.color = 'var(--text-secondary)';
    description.style.fontSize = '12px';
    description.style.marginBottom = '12px';
    card.appendChild(description);
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'primary';
    button.textContent = 'Executar';
    
    button.addEventListener('click', async (e) => {
      await executeMouseFixApply(folder, e.target);
    });
    
    card.appendChild(button);
    applyContainer.appendChild(card);
  });
}

async function executeMouseFixApply(folder, buttonElement = null) {
  const button = buttonElement || document.querySelector(`[data-folder="${folder.folderName}"]`);
  
  addLogEntry(`Aplicou: Mouse Fix - ${folder.folderName}`, 'info');
  
  if (button) {
    button.disabled = true;
    button.textContent = 'Executando...';
    button.style.opacity = '0.7';
  }
  
  try {
    // Executar os 3 .bat em sequência com RunAs
    let successCount = 0;
    for (const script of folder.scripts) {
      try {
        // Usar handler específico que executa com RunAs
        const result = await window.y20.mouseFixRunBat(script.id);
        if (result && result.success) {
          successCount++;
        }
      } catch (e) {
        console.warn(`[Mouse Fix] Erro ao executar ${script.name}:`, e);
      }
    }
    
    if (button) {
      button.disabled = false;
      button.textContent = 'Executar';
      button.style.opacity = '1';
    }
    
    // Mostrar modal de sucesso
    showMouseFixSuccessModal();
  } catch (error) {
    console.error('[Mouse Fix] Erro ao aplicar:', error);
    if (button) {
      button.disabled = false;
      button.textContent = 'Executar';
      button.style.opacity = '1';
    }
    showToast(error.message || 'Erro ao aplicar Mouse Fix', 'error');
  }
}

async function executeMouseFixRemove() {
  const button = document.getElementById('mouse-fix-remove-btn');
  
  addLogEntry('Aplicou: Remover Mouse Fix', 'info');
  
  if (button) {
    button.disabled = true;
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span class="button-icon" style="animation: script-spin 1s linear infinite;">⚙️</span><span>Removendo...</span>';
  }
  
  try {
    // Listar scripts da pasta "Voltar pro padrão"
    const result = await window.y20.optimizationPackList('Mouse fix');
    if (!result || !result.success) {
      throw new Error('Não foi possível carregar os scripts de remoção.');
    }
    
    const scripts = Array.isArray(result.scripts) ? result.scripts : [];
    const removeScripts = scripts.filter(script => {
      const pathParts = script.path.split(/[/\\]/);
      return pathParts.includes('Voltar pro padrão') && 
             script.name && 
             script.name.startsWith('remover_') && 
             script.name.endsWith('.bat');
    }).sort((a, b) => a.name.localeCompare(b.name));
    
    if (removeScripts.length === 0) {
      throw new Error('Scripts de remoção não encontrados.');
    }
    
    // Executar os 3 .bat em sequência com RunAs
    let successCount = 0;
    for (const script of removeScripts) {
      try {
        // Usar handler específico que executa com RunAs
        const result = await window.y20.mouseFixRunBat(script.id);
        if (result && result.success) {
          successCount++;
        }
      } catch (e) {
        console.warn(`[Mouse Fix] Erro ao executar ${script.name}:`, e);
      }
    }
    
    if (button) {
      button.disabled = false;
      button.innerHTML = originalHTML;
    }
    
    // Mostrar modal de sucesso
    showMouseFixSuccessModal();
  } catch (error) {
    console.error('[Mouse Fix] Erro ao remover:', error);
    if (button) {
      button.disabled = false;
      button.innerHTML = '<span class="button-icon">🔄</span><span>Remover Mouse Fix</span>';
    }
    showToast(error.message || 'Erro ao remover Mouse Fix', 'error');
  }
}

function showMouseFixSuccessModal() {
  const modal = document.getElementById('mouse-fix-success-modal');
  if (!modal) return;
  
  modal.hidden = false;
  
  // Event listeners para os botões do modal
  const restartBtn = document.getElementById('mouse-fix-restart-btn');
  const cancelBtn = document.getElementById('mouse-fix-cancel-btn');
  
  if (restartBtn && !restartBtn.dataset.bound) {
    restartBtn.addEventListener('click', async () => {
      try {
        await window.y20.restartPC();
      } catch (e) {
        showToast('Erro ao reiniciar PC: ' + (e.message || 'Erro desconhecido'), 'error');
      }
    });
    restartBtn.dataset.bound = 'true';
  }
  
  if (cancelBtn && !cancelBtn.dataset.bound) {
    cancelBtn.addEventListener('click', () => {
      modal.hidden = true;
    });
    cancelBtn.dataset.bound = 'true';
  }
}

function renderWindowsOptimizations() {
  const container = document.getElementById('windows-optimize-list');
  
  // Verificar se o container existe
  if (!container) {
    console.warn('[Render] Container windows-optimize-list não encontrado');
    return;
  }
  
  // Limpar container
  container.innerHTML = '';

  windowsOptimizeItems.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.className = 'list-item';
    if (item.warning) {
      listItem.style.borderLeft = '3px solid #ff4444';
    }

    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.innerHTML = `${item.icon} ${item.title}`;
    if (item.warning) {
      title.style.color = '#ff4444';
    }
    const desc = document.createElement('p');
    desc.textContent = item.description;
    info.appendChild(title);
    info.appendChild(desc);

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.alignItems = 'center';
    actions.style.gap = '12px';

    const status = document.createElement('span');
    status.className = 'status-chip';

    const toggleWrap = document.createElement('label');
    toggleWrap.className = 'toggle-switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    // Se não há valor salvo, assume como desativado (false) por padrão
    input.checked = currentOptimizations[item.key] === true;
    input.dataset.key = item.key;
    const slider = document.createElement('span');
    slider.className = 'toggle-slider';
    toggleWrap.appendChild(input);
    toggleWrap.appendChild(slider);

    actions.appendChild(status);
    actions.appendChild(toggleWrap);

    updateOptimizationStatus(item.key, status, input.checked);

    // Bloquear toggle se acesso simples e estiver em painel bloqueado
    // No acesso básico, liberar todos os toggles
    if (currentAccessLevel === 'simple') {
      const panel = container.closest('.config-panel');
      if (panel && (panel.id === 'panel-windows-optimize' || panel.id === 'panel-basic-settings')) {
        input.disabled = true;
        input.style.opacity = '0.5';
        input.style.cursor = 'not-allowed';
        input.title = 'Esta funcionalidade requer key ativada';
        input.setAttribute('data-blocked', 'true');
        toggleWrap.style.opacity = '0.5';
        toggleWrap.style.cursor = 'not-allowed';
        toggleWrap.title = 'Esta funcionalidade requer key ativada';
        toggleWrap.setAttribute('data-blocked', 'true');
      }
    } else if (currentAccessLevel === 'basic' || currentAccessLevel === 'vip') {
      // Liberar toggles para acesso básico e VIP
      input.disabled = false;
      input.style.opacity = '1';
      input.style.cursor = 'pointer';
      input.title = '';
      input.removeAttribute('data-blocked');
      toggleWrap.style.opacity = '1';
      toggleWrap.style.cursor = 'pointer';
      toggleWrap.title = '';
      toggleWrap.removeAttribute('data-blocked');
    }

    input.addEventListener('change', async (e) => {
      // Verificação imediata de acesso ANTES de qualquer execução
      if (currentAccessLevel === 'simple') {
        const panel = container.closest('.config-panel');
        if (panel && (panel.id === 'panel-windows-optimize' || panel.id === 'panel-basic-settings')) {
          e.preventDefault();
          e.stopPropagation();
          e.target.checked = !e.target.checked;
          showToast('Esta funcionalidade requer key ativada', 'warning');
          return false;
        }
      }
      
      // Prevenir ação se estiver bloqueado
      if (e.target.disabled || e.target.getAttribute('data-blocked') === 'true') {
        e.preventDefault();
        e.stopPropagation();
        e.target.checked = !e.target.checked;
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return false;
      }
      
      const enabled = e.target.checked;
      try {
        await window.y20.setOptimization(item.key, enabled);
        currentOptimizations[item.key] = enabled;
        updateOptimizationStatus(item.key, status, enabled);
        showToast(`${item.title} ${enabled ? 'ativado' : 'desativado'}`);
      } catch (error) {
        e.target.checked = !enabled;
        showToast(`Erro ao ${enabled ? 'ativar' : 'desativar'} ${item.title}`, 'error');
      }
    });

    listItem.appendChild(info);
    listItem.appendChild(actions);
    container.appendChild(listItem);
  });
}

function renderOptimizations() {
  const container = document.getElementById('optimization-list');
  
  // Verificar se o container existe
  if (!container) {
    console.warn('[Render] Container optimization-list não encontrado');
    return;
  }
  
  // Limpar container
  container.innerHTML = '';

  optimizationItems.forEach((item) => {
    const listItem = document.createElement('div');
    listItem.className = 'list-item';

    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.innerHTML = `${item.icon} ${item.title}`;
    const desc = document.createElement('p');
    desc.textContent = item.description;
    info.appendChild(title);
    info.appendChild(desc);

    const actions = document.createElement('div');
    actions.style.display = 'flex';
    actions.style.alignItems = 'center';
    actions.style.gap = '12px';

    const status = document.createElement('span');
    status.className = 'status-chip';

    const toggleWrap = document.createElement('label');
    toggleWrap.className = 'toggle-switch';
    const input = document.createElement('input');
    input.type = 'checkbox';
    // Se não há valor salvo, assume como ativo (true) por padrão
    input.checked = currentOptimizations[item.key] !== false;
    input.dataset.key = item.key;
    const slider = document.createElement('span');
    slider.className = 'toggle-slider';
    toggleWrap.appendChild(input);
    toggleWrap.appendChild(slider);

    actions.appendChild(status);
    actions.appendChild(toggleWrap);

    updateOptimizationStatus(item.key, status, input.checked);

    // Bloquear toggle se acesso simples e estiver em painel bloqueado
    // No acesso básico, liberar todos os toggles
    if (currentAccessLevel === 'simple') {
      const panel = container.closest('.config-panel');
      if (panel && (panel.id === 'panel-windows-optimize' || panel.id === 'panel-basic-settings')) {
        input.disabled = true;
        input.style.opacity = '0.5';
        input.style.cursor = 'not-allowed';
        input.title = 'Esta funcionalidade requer key ativada';
        input.setAttribute('data-blocked', 'true');
        toggleWrap.style.opacity = '0.5';
        toggleWrap.style.cursor = 'not-allowed';
        toggleWrap.title = 'Esta funcionalidade requer key ativada';
        toggleWrap.setAttribute('data-blocked', 'true');
      }
    } else if (currentAccessLevel === 'basic' || currentAccessLevel === 'vip') {
      // Liberar toggles para acesso básico e VIP
      input.disabled = false;
      input.style.opacity = '1';
      input.style.cursor = 'pointer';
      input.title = '';
      input.removeAttribute('data-blocked');
      toggleWrap.style.opacity = '1';
      toggleWrap.style.cursor = 'pointer';
      toggleWrap.title = '';
      toggleWrap.removeAttribute('data-blocked');
    }
    
    input.addEventListener('change', async (event) => {
      // Verificação imediata de acesso ANTES de qualquer execução
      if (currentAccessLevel === 'simple') {
        const panel = container.closest('.config-panel');
        if (panel && (panel.id === 'panel-windows-optimize' || panel.id === 'panel-basic-settings')) {
          event.preventDefault();
          event.stopPropagation();
          event.target.checked = !event.target.checked;
          showToast('Esta funcionalidade requer key ativada', 'warning');
          return false;
        }
      }
      
      // Prevenir ação se estiver bloqueado
      if (event.target.disabled || event.target.getAttribute('data-blocked') === 'true') {
        event.preventDefault();
        event.stopPropagation();
        event.target.checked = !event.target.checked;
        showToast('Esta funcionalidade requer key ativada', 'warning');
        return false;
      }
      
      const enabled = event.target.checked;
      event.target.disabled = true;
      try {
        const { optimizationScore } = await window.y20.setOptimization(item.key, enabled);
        currentOptimizations[item.key] = enabled;
        updateOptimizationStatus(item.key, status, enabled);
        setGaugeValue(optimizationScore);
        showToast(`Configuração ${enabled ? 'ativada' : 'desativada'}.`);
      } catch (error) {
        event.target.checked = !enabled;
        showToast('Não foi possível aplicar a alteração. Execute como administrador.', 'error');
      } finally {
        event.target.disabled = false;
      }
    });

    listItem.appendChild(info);
    listItem.appendChild(actions);
    container.appendChild(listItem);
  });
}

function updateOptimizationStatus(key, element, enabled) {
  if (!element) return;
  element.textContent = enabled ? 'Ativo' : 'Inativo';
  element.classList.remove('good', 'medium', 'bad');
  element.classList.add(enabled ? 'good' : 'bad');
}

function calculateRealtimeOptimizationScore(cpuLoad, memoryUsed, memoryTotal, processCount) {
  const cpuWeight = 0.4;
  const memoryWeight = 0.4;
  const processWeight = 0.2;
  
  const cpuScore = Math.max(0, 100 - cpuLoad);
  const memoryPercent = (memoryUsed / memoryTotal) * 100;
  const memoryScore = Math.max(0, 100 - memoryPercent);
  const processScore = Math.max(0, 100 - Math.min(100, (processCount / 200) * 100));
  
  const totalScore = (cpuScore * cpuWeight) + (memoryScore * memoryWeight) + (processScore * processWeight);
  return Math.round(Math.max(0, Math.min(100, totalScore)));
}

async function testInternetSpeed() {
  if (!internetSpeedStatus || !internetDownload || !internetUpload || !internetPing) {
    console.warn('[Internet Speed] Elementos DOM não encontrados');
    return;
  }

  try {
    // Mostrar estado de teste
    internetSpeedStatus.textContent = '⏳ Testando...';
    internetSpeedStatus.style.color = '#ffaa00';
    internetDownload.textContent = '0.0';
    internetUpload.textContent = '0.0';
    internetPing.textContent = '-';
    
    if (internetSpeedTestBtn) {
      internetSpeedTestBtn.disabled = true;
      internetSpeedTestBtn.innerHTML = '<span class="button-icon">⏳</span><span>Testando...</span>';
    }

    console.log('[Internet Speed] Iniciando teste...');
    const result = await window.y20.testInternetSpeed();
    console.log('[Internet Speed] Resultado completo:', JSON.stringify(result, null, 2));
    
    // Atualizar valores mesmo se houver erros parciais
    if (result && typeof result.download === 'number' && !isNaN(result.download)) {
      internetDownload.textContent = result.download.toFixed(1);
    } else if (result && result.download === null) {
      internetDownload.textContent = 'N/D';
    } else {
      internetDownload.textContent = '-';
    }
    
    if (result && typeof result.upload === 'number' && !isNaN(result.upload)) {
      internetUpload.textContent = result.upload.toFixed(1);
    } else if (result && result.upload === null) {
      internetUpload.textContent = 'N/D';
    } else {
      internetUpload.textContent = '-';
    }
    
    if (result && typeof result.ping === 'number' && !isNaN(result.ping)) {
      internetPing.textContent = result.ping.toString();
    } else if (result && result.ping === null) {
      internetPing.textContent = 'N/D';
    } else {
      internetPing.textContent = '-';
    }
    
    // Verificar se pelo menos um teste funcionou
    const hasValidResult = (result && typeof result.download === 'number' && result.download > 0) || 
                          (result && typeof result.upload === 'number' && result.upload > 0) || 
                          (result && typeof result.ping === 'number' && result.ping > 0);
    
    if (hasValidResult || (result && result.success)) {
      internetSpeedStatus.textContent = '✓ Concluído';
      internetSpeedStatus.style.color = '#4ade80';
    } else {
      internetSpeedStatus.textContent = '✗ Erro';
      internetSpeedStatus.style.color = '#ef4444';
      const errorMsg = result?.error || result?.message;
      if (errorMsg) {
        console.error('[Internet Speed] Erro:', errorMsg);
        showToast(errorMsg, 'error');
      }
    }
  } catch (error) {
    console.error('[Internet Speed] Erro:', error);
    internetDownload.textContent = 'Erro';
    internetUpload.textContent = 'Erro';
    internetPing.textContent = 'Erro';
    internetSpeedStatus.textContent = '✗ Erro';
    internetSpeedStatus.style.color = '#ef4444';
    showToast('Erro ao testar velocidade de internet', 'error');
  } finally {
    if (internetSpeedTestBtn) {
      internetSpeedTestBtn.disabled = false;
      internetSpeedTestBtn.innerHTML = '<span class="button-icon">🔄</span><span>Verificar denovo</span>';
    }
  }
}

// Avaliar CPU e gerar recomendação
function evaluateCPU(cpuName, cores, threads) {
  if (!cpuName || cpuName === 'N/D' || cpuName === '-') {
    return '<span style="color: rgba(255, 255, 255, 0.5);">Aguardando informações do processador...</span>';
  }
  
  const cpuLower = cpuName.toLowerCase();
  let evaluation = '';
  let color = '#4ade80'; // Verde padrão
  
  // Processadores AMD
  if (cpuLower.includes('ryzen')) {
    if (cpuLower.includes('ryzen 9') || cpuLower.includes('ryzen 7 5') || cpuLower.includes('ryzen 7 7') || cpuLower.includes('ryzen 7 9')) {
      // Ryzen 9 ou Ryzen 7 5000/7000/9000
      evaluation = '✅ <strong>Excelente processador!</strong> Ideal para jogos, streaming, edição de vídeo e multitarefa pesada. Não precisa trocar.';
      color = '#4ade80';
    } else if (cpuLower.includes('ryzen 7') || cpuLower.includes('ryzen 5 5') || cpuLower.includes('ryzen 5 7') || cpuLower.includes('ryzen 5 9')) {
      // Ryzen 7 ou Ryzen 5 5000/7000/9000
      evaluation = '✅ <strong>Ótimo processador!</strong> Excelente para jogos e tarefas do dia a dia. Suporta bem multitarefa. Não precisa trocar.';
      color = '#4ade80';
    } else if (cpuLower.includes('ryzen 5') || cpuLower.includes('ryzen 3')) {
      // Ryzen 5 ou Ryzen 3 (gerações mais antigas)
      if (cpuLower.includes('3d') || cpuLower.includes('x3d')) {
        evaluation = '✅ <strong>Processador muito bom!</strong> Cache 3D V-Cache oferece excelente performance em jogos. Não precisa trocar.';
        color = '#4ade80';
      } else {
        evaluation = '✅ <strong>Bom processador!</strong> Adequado para jogos e uso geral. Pode considerar upgrade no futuro, mas não é urgente.';
        color = '#fbbf24';
      }
    } else {
      evaluation = '✅ <strong>Processador adequado!</strong> Funciona bem para tarefas básicas e jogos leves.';
      color = '#fbbf24';
    }
  }
  // Processadores Intel
  else if (cpuLower.includes('intel') || cpuLower.includes('core')) {
    if (cpuLower.includes('i9') || cpuLower.includes('i7-1') || cpuLower.includes('i7-2')) {
      // i9 ou i7 10ª/11ª/12ª/13ª/14ª geração
      evaluation = '✅ <strong>Excelente processador!</strong> Top de linha, ideal para jogos, streaming e trabalho pesado. Não precisa trocar.';
      color = '#4ade80';
    } else if (cpuLower.includes('i7') || cpuLower.includes('i5-1') || cpuLower.includes('i5-2')) {
      // i7 ou i5 10ª/11ª/12ª/13ª/14ª geração
      evaluation = '✅ <strong>Ótimo processador!</strong> Excelente para jogos e multitarefa. Performance muito boa. Não precisa trocar.';
      color = '#4ade80';
    } else if (cpuLower.includes('i5') || cpuLower.includes('i3-1') || cpuLower.includes('i3-2')) {
      // i5 ou i3 10ª/11ª/12ª/13ª/14ª geração
      evaluation = '✅ <strong>Bom processador!</strong> Adequado para jogos e uso geral. Performance satisfatória.';
      color = '#fbbf24';
    } else if (cpuLower.includes('i3') || cpuLower.includes('pentium') || cpuLower.includes('celeron')) {
      // i3 antigo, Pentium, Celeron
      evaluation = '⚠️ <strong>Processador básico.</strong> Funciona para tarefas leves, mas pode limitar em jogos modernos. Considere upgrade.';
      color = '#f59e0b';
    } else {
      // Intel genérico ou muito antigo
      if (cores < 4 || threads < 4) {
        evaluation = '⚠️ <strong>Processador limitado.</strong> Poucos núcleos podem limitar performance. Recomenda-se upgrade.';
        color = '#f59e0b';
      } else {
        evaluation = '✅ <strong>Processador adequado!</strong> Funciona bem para uso geral.';
        color = '#fbbf24';
      }
    }
  }
  // Processadores muito antigos ou desconhecidos
  else {
    if (cores < 4 || threads < 4) {
      evaluation = '⚠️ <strong>Processador pode estar limitado.</strong> Poucos núcleos podem afetar performance em tarefas modernas. Considere upgrade.';
      color = '#f59e0b';
    } else if (cores >= 8) {
      evaluation = '✅ <strong>Processador com bom número de núcleos!</strong> Adequado para multitarefa e jogos.';
      color = '#4ade80';
    } else {
      evaluation = '✅ <strong>Processador adequado!</strong> Funciona bem para uso geral.';
      color = '#fbbf24';
    }
  }
  
  return `<span style="color: ${color};">${evaluation}</span>`;
}

// Avaliar GPU e gerar recomendação
function evaluateGPU(gpuName, vramMB) {
  if (!gpuName || gpuName === 'N/D' || gpuName === '-') {
    return '<span style="color: rgba(255, 255, 255, 0.5);">Aguardando informações da placa de vídeo...</span>';
  }
  
  const gpuLower = gpuName.toLowerCase();
  const vramGB = vramMB / 1024;
  let evaluation = '';
  let color = '#4ade80'; // Verde padrão
  
  // NVIDIA GeForce
  if (gpuLower.includes('nvidia') || gpuLower.includes('geforce') || gpuLower.includes('rtx') || gpuLower.includes('gtx')) {
    // RTX 40 series (muito nova)
    if (gpuLower.includes('rtx 4090') || gpuLower.includes('rtx 4080')) {
      evaluation = '✅ <strong>Placa de vídeo top de linha!</strong> Excelente para jogos em 4K, ray tracing e trabalho profissional. Não precisa trocar.';
      color = '#4ade80';
    }
    // RTX 40 series (alta)
    else if (gpuLower.includes('rtx 4070') || gpuLower.includes('rtx 4060')) {
      evaluation = '✅ <strong>Placa de vídeo excelente!</strong> Ideal para jogos em alta resolução e ray tracing. Performance muito boa. Não precisa trocar.';
      color = '#4ade80';
    }
    // RTX 30 series
    else if (gpuLower.includes('rtx 3090') || gpuLower.includes('rtx 3080')) {
      evaluation = '✅ <strong>Placa de vídeo muito boa!</strong> Excelente para jogos em alta resolução. Performance top. Não precisa trocar.';
      color = '#4ade80';
    }
    else if (gpuLower.includes('rtx 3070') || gpuLower.includes('rtx 3060')) {
      evaluation = '✅ <strong>Placa de vídeo ótima!</strong> Boa para jogos em 1080p/1440p e ray tracing. Não precisa trocar.';
      color = '#4ade80';
    }
    // RTX 20 series
    else if (gpuLower.includes('rtx 2080') || gpuLower.includes('rtx 2070')) {
      evaluation = '✅ <strong>Placa de vídeo boa!</strong> Ainda roda jogos modernos bem. Adequada para 1080p/1440p.';
      color = '#fbbf24';
    }
    else if (gpuLower.includes('rtx 2060')) {
      evaluation = '✅ <strong>Placa de vídeo adequada!</strong> Roda jogos em 1080p. Pode considerar upgrade no futuro.';
      color = '#fbbf24';
    }
    // GTX 16 series
    else if (gpuLower.includes('gtx 1660') || gpuLower.includes('gtx 1650')) {
      evaluation = '✅ <strong>Placa de vídeo básica!</strong> Funciona para jogos em 1080p médio/baixo. Considere upgrade para melhor experiência.';
      color = '#fbbf24';
    }
    // GTX 10 series
    else if (gpuLower.includes('gtx 1080') || gpuLower.includes('gtx 1070')) {
      evaluation = '✅ <strong>Placa de vídeo ainda funcional!</strong> Roda jogos em 1080p, mas está ficando antiga. Considere upgrade.';
      color = '#f59e0b';
    }
    else if (gpuLower.includes('gtx 1060') || gpuLower.includes('gtx 1050')) {
      evaluation = '⚠️ <strong>Placa de vídeo antiga.</strong> Pode ter dificuldades em jogos modernos. Recomenda-se upgrade.';
      color = '#f59e0b';
    }
    // GTX série 9 ou mais antiga
    else if (gpuLower.includes('gtx 9') || gpuLower.includes('gtx 7') || gpuLower.includes('gtx 6') || gpuLower.includes('gt 1030') || gpuLower.includes('gt 730')) {
      evaluation = '❌ <strong>Placa de vídeo muito antiga.</strong> Não roda jogos modernos adequadamente. Recomenda-se trocar urgentemente.';
      color = '#ef4444';
    }
    // RTX genérico (caso não tenha sido capturado acima)
    else if (gpuLower.includes('rtx')) {
      if (vramGB >= 12) {
        evaluation = '✅ <strong>Placa de vídeo de alta performance!</strong> Excelente para jogos e trabalho. Não precisa trocar.';
        color = '#4ade80';
      } else if (vramGB >= 8) {
        evaluation = '✅ <strong>Placa de vídeo boa!</strong> Adequada para jogos modernos. Não precisa trocar.';
        color = '#4ade80';
      } else {
        evaluation = '✅ <strong>Placa de vídeo adequada!</strong> Funciona bem para jogos em 1080p.';
        color = '#fbbf24';
      }
    }
    // GTX genérico
    else if (gpuLower.includes('gtx')) {
      if (vramGB >= 8) {
        evaluation = '✅ <strong>Placa de vídeo ainda funcional!</strong> Pode rodar jogos, mas está ficando antiga. Considere upgrade.';
        color = '#fbbf24';
      } else {
        evaluation = '⚠️ <strong>Placa de vídeo limitada.</strong> VRAM baixa pode limitar em jogos modernos. Recomenda-se upgrade.';
        color = '#f59e0b';
      }
    }
    // NVIDIA genérica
    else {
      if (vramGB >= 8) {
        evaluation = '✅ <strong>Placa de vídeo adequada!</strong> VRAM suficiente para jogos modernos.';
        color = '#fbbf24';
      } else if (vramGB >= 4) {
        evaluation = '⚠️ <strong>Placa de vídeo básica.</strong> VRAM pode limitar em jogos modernos. Considere upgrade.';
        color = '#f59e0b';
      } else {
        evaluation = '❌ <strong>Placa de vídeo muito limitada.</strong> VRAM insuficiente. Recomenda-se trocar.';
        color = '#ef4444';
      }
    }
  }
  // AMD Radeon
  else if (gpuLower.includes('amd') || gpuLower.includes('radeon') || gpuLower.includes('rx')) {
    // RX 7000 series (muito nova)
    if (gpuLower.includes('rx 7900') || gpuLower.includes('rx 7800')) {
      evaluation = '✅ <strong>Placa de vídeo top de linha!</strong> Excelente para jogos em alta resolução. Não precisa trocar.';
      color = '#4ade80';
    }
    // RX 7000 series
    else if (gpuLower.includes('rx 7700') || gpuLower.includes('rx 7600')) {
      evaluation = '✅ <strong>Placa de vídeo excelente!</strong> Ideal para jogos modernos. Performance muito boa. Não precisa trocar.';
      color = '#4ade80';
    }
    // RX 6000 series
    else if (gpuLower.includes('rx 6900') || gpuLower.includes('rx 6800')) {
      evaluation = '✅ <strong>Placa de vídeo muito boa!</strong> Excelente para jogos em alta resolução. Não precisa trocar.';
      color = '#4ade80';
    }
    else if (gpuLower.includes('rx 6700') || gpuLower.includes('rx 6600')) {
      evaluation = '✅ <strong>Placa de vídeo ótima!</strong> Boa para jogos em 1080p/1440p. Não precisa trocar.';
      color = '#4ade80';
    }
    // RX 5000 series
    else if (gpuLower.includes('rx 5700') || gpuLower.includes('rx 5600')) {
      evaluation = '✅ <strong>Placa de vídeo boa!</strong> Ainda roda jogos modernos bem. Adequada para 1080p.';
      color = '#fbbf24';
    }
    // RX 500 series ou mais antiga
    else if (gpuLower.includes('rx 580') || gpuLower.includes('rx 570') || gpuLower.includes('rx 560')) {
      evaluation = '⚠️ <strong>Placa de vídeo antiga.</strong> Pode ter dificuldades em jogos modernos. Recomenda-se upgrade.';
      color = '#f59e0b';
    }
    else if (gpuLower.includes('rx 4') || gpuLower.includes('r9') || gpuLower.includes('r7') || gpuLower.includes('r5')) {
      evaluation = '❌ <strong>Placa de vídeo muito antiga.</strong> Não roda jogos modernos adequadamente. Recomenda-se trocar urgentemente.';
      color = '#ef4444';
    }
    // AMD genérica
    else {
      if (vramGB >= 8) {
        evaluation = '✅ <strong>Placa de vídeo adequada!</strong> VRAM suficiente para jogos.';
        color = '#fbbf24';
      } else {
        evaluation = '⚠️ <strong>Placa de vídeo pode estar limitada.</strong> Considere upgrade para melhor experiência.';
        color = '#f59e0b';
      }
    }
  }
  // Intel Arc ou integrada
  else if (gpuLower.includes('intel') || gpuLower.includes('arc') || gpuLower.includes('uhd') || gpuLower.includes('iris') || gpuLower.includes('hd graphics')) {
    if (gpuLower.includes('arc')) {
      evaluation = '✅ <strong>Placa de vídeo Intel Arc!</strong> Nova tecnologia, boa para jogos leves/médios. Adequada para uso geral.';
      color = '#fbbf24';
    } else {
      evaluation = '⚠️ <strong>Gráficos integrados.</strong> Limitados para jogos. Para melhor experiência, recomenda-se placa dedicada.';
      color = '#f59e0b';
    }
  }
  // Outras ou desconhecidas
  else {
    if (vramGB >= 12) {
      evaluation = '✅ <strong>Placa de vídeo de alta performance!</strong> VRAM alta indica boa capacidade. Não precisa trocar.';
      color = '#4ade80';
    } else if (vramGB >= 8) {
      evaluation = '✅ <strong>Placa de vídeo adequada!</strong> VRAM suficiente para jogos modernos.';
      color = '#fbbf24';
    } else if (vramGB >= 4) {
      evaluation = '⚠️ <strong>Placa de vídeo básica.</strong> VRAM pode limitar em jogos modernos. Considere upgrade.';
      color = '#f59e0b';
    } else {
      evaluation = '❌ <strong>Placa de vídeo muito limitada.</strong> VRAM insuficiente para jogos modernos. Recomenda-se trocar.';
      color = '#ef4444';
    }
  }
  
  return `<span style="color: ${color};">${evaluation}</span>`;
}

async function refreshSystemInfo() {
  // Prevenir chamadas concorrentes
  if (isRefreshingSystemInfo) {
    return;
  }
  
  isRefreshingSystemInfo = true;
  try {
    if (!window.y20 || !window.y20.getSystemInfo) {
      throw new Error('window.y20.getSystemInfo não está disponível');
    }
    
    const info = await window.y20.getSystemInfo();
    
    if (!info) {
      throw new Error('Dados do sistema são null ou undefined');
    }
    
    // Remover cálculo de score em tempo real (causa travamentos)
    // const realtimeScore = calculateRealtimeOptimizationScore(...);
    // setGaugeValue(realtimeScore);

    // Se a seção de velocidade de internet estiver vazia, disparar teste automaticamente
    try {
      const internetDownload = document.getElementById('internet-download');
      const internetUpload = document.getElementById('internet-upload');
      const internetPing = document.getElementById('internet-ping');
      const internetSpeedStatus = document.getElementById('internet-speed-status');
      if (internetDownload && internetUpload && internetPing && internetSpeedStatus) {
        const emptyVals = [internetDownload.textContent, internetUpload.textContent, internetPing.textContent]
          .every(v => !v || v.trim() === '-' || /N\/D|Erro/i.test(v));
        if (emptyVals && window.y20?.testInternetSpeed) {
          window.y20.testInternetSpeed().then((result) => {
            if (result && result.success) {
              if (typeof result.download === 'number') internetDownload.textContent = result.download.toFixed(1);
              if (typeof result.upload === 'number') internetUpload.textContent = result.upload.toFixed(1);
              if (typeof result.ping === 'number') internetPing.textContent = String(result.ping);
              internetSpeedStatus.textContent = '✓ Concluído';
              internetSpeedStatus.style.color = '#4ade80';
            }
          }).catch(() => {});
        }
      }
    } catch {}

    // Atualizar informações do CPU
    let cpuLabel = 'N/D N/D';
    if (info.cpu) {
      if (info.cpu.manufacturer && info.cpu.brand && info.cpu.manufacturer !== 'N/D' && info.cpu.brand !== 'N/D') {
        cpuLabel = `${info.cpu.manufacturer} ${info.cpu.brand}`;
      } else if (info.cpu.brand && info.cpu.brand !== 'N/D') {
        // Se só tiver brand, usar ele
        cpuLabel = info.cpu.brand;
      } else if (info.cpu.manufacturer && info.cpu.manufacturer !== 'N/D') {
        // Se só tiver manufacturer, usar ele
        cpuLabel = info.cpu.manufacturer;
      } else if (info.cpu.model && info.cpu.model !== 'N/D') {
        // Fallback para model se disponível
        cpuLabel = info.cpu.model;
      }
    }
    const cpuCores = info.cpu?.cores || info.cpu?.physicalCores || 0;
    const cpuThreads = info.cpu?.threads || 0;
    const cpuLoad = info.cpu?.load || 0;

    if (heroCpuTag) heroCpuTag.textContent = cpuLabel;
    // Removido: if (summaryCpuUsage) summaryCpuUsage.textContent = `${cpuLoad}%`;
    if (summaryCpuName) summaryCpuName.textContent = cpuLabel;
    if (summaryCpuCores) {
      summaryCpuCores.textContent = `Núcleos: ${cpuCores || '-'} • Threads: ${cpuThreads || '-'}`;
    }
    
    // Avaliar CPU e mostrar recomendação
    const cpuEvaluation = evaluateCPU(cpuLabel, cpuCores, cpuThreads);
    const summaryCpuEvaluation = document.getElementById('summary-cpu-evaluation');
    if (summaryCpuEvaluation) {
      summaryCpuEvaluation.innerHTML = cpuEvaluation;
    }
    
    // Atualizar informações da GPU
    const gpuName = info.gpu?.name || 'N/D';
    const gpuVram = info.gpu?.vram || 0;
    // VRAM já vem em MB do system-info.js
    const gpuVramDisplay = gpuVram > 0 ? (gpuVram >= 1024 ? (gpuVram / 1024).toFixed(1) + ' GB' : gpuVram + ' MB') : '0 MB';

    if (heroGpuTag) heroGpuTag.textContent = gpuName;
    // Removido: if (summaryGpuUsage) summaryGpuUsage.textContent = `${gpuUsage}%`;
    if (summaryGpuName) summaryGpuName.textContent = gpuName;
    if (summaryGpuVram) summaryGpuVram.textContent = `VRAM ${gpuVramDisplay}`;
    
    // Avaliar GPU e mostrar recomendação
    const gpuEvaluation = evaluateGPU(gpuName, gpuVram);
    const summaryGpuEvaluation = document.getElementById('summary-gpu-evaluation');
    if (summaryGpuEvaluation) {
      summaryGpuEvaluation.innerHTML = gpuEvaluation;
    }
    
    // Atualizar informações de Memória
    const memoryTotal = info.memory?.total || 0;
    const memoryUsed = info.memory?.used || 0;
    const memoryFree = memoryTotal - memoryUsed;
    const memoryPercent = memoryTotal > 0 ? Math.round((memoryUsed / memoryTotal) * 100) : 0;

    if (heroRamTag) heroRamTag.textContent = `${memoryUsed} / ${memoryTotal} GB`;
    if (summaryMemoryUsage) summaryMemoryUsage.textContent = `${memoryUsed} / ${memoryTotal} GB`;
    if (summaryMemoryProgress) summaryMemoryProgress.style.width = `${memoryPercent}%`;
    if (summaryMemoryFree) summaryMemoryFree.textContent = `Disponível: ${memoryFree} GB`;
    
    // Atualizar informações de Armazenamento
    const storageTotal = info.storage?.primary?.total || 0;
    const storageUsed = info.storage?.primary?.used || 0;
    const storageFree = info.storage?.primary?.free || 0;
    const storageMount = info.storage?.primary?.mount || 'C:';
    const storageDevices = info.storage?.devices || 0;
    const storagePercent = storageTotal > 0 ? Math.round((storageUsed / storageTotal) * 100) : 0;

    if (summaryStorageUsage) summaryStorageUsage.textContent = `${storageUsed} / ${storageTotal} GB`;
    if (summaryStorageProgress) summaryStorageProgress.style.width = `${storagePercent}%`;
    if (summaryStorageUsed) summaryStorageUsed.textContent = `Usado: ${storageUsed} GB`;
    if (summaryStorageFree) summaryStorageFree.textContent = `Livre: ${storageFree} GB`;
    if (summaryStorageMount) summaryStorageMount.textContent = `Unidade: ${storageMount}`;
    if (summaryStorageDevices) summaryStorageDevices.textContent = `Discos detectados: ${storageDevices}`;
    
    // Atualizar informações de Processos
    // Garantir que os valores sejam números válidos
    let processesRunning = info.processes?.running;
    if (typeof processesRunning !== 'number' || isNaN(processesRunning) || processesRunning < 0) {
      processesRunning = info.processes?.all || 0;
    }
    if (typeof processesRunning !== 'number' || isNaN(processesRunning) || processesRunning < 0) {
      processesRunning = 0;
    }
    
    const processesAll = (typeof info.processes?.all === 'number' && !isNaN(info.processes.all)) 
      ? info.processes.all 
      : (processesRunning > 0 ? processesRunning : 0);
    const processesBlocked = (typeof info.processes?.blocked === 'number' && !isNaN(info.processes.blocked)) 
      ? info.processes.blocked 
      : 0;
    const processesSleeping = (typeof info.processes?.sleeping === 'number' && !isNaN(info.processes.sleeping)) 
      ? info.processes.sleeping 
      : 0;
    const osPlatform = info.os?.platform || 'N/D';
    const osBuild = info.os?.build || 'N/D';
    const osArch = info.os?.arch || 'N/D';

    // Garantir que o título "Processos" não seja modificado
    // Buscar o card de processos e garantir que o título está correto
    const processCard = summaryProcessRunning?.closest('.summary-card');
    if (processCard) {
      const processTitle = processCard.querySelector('.summary-title');
      if (processTitle) {
        // Sempre garantir que o título seja "Processos"
        processTitle.textContent = 'Processos';
      }
    }

    // Atualizar valor de processos rodando (garantir que seja um número válido)
    if (summaryProcessRunning) {
      summaryProcessRunning.textContent = Math.max(0, Math.round(processesRunning));
    }
    if (summaryProcessTotal) summaryProcessTotal.textContent = `Total: ${processesAll}`;
    if (summaryProcessMeta) summaryProcessMeta.textContent = `Dormindo: ${processesSleeping} • Bloqueados: ${processesBlocked}`;
    if (summaryOsLabel) summaryOsLabel.textContent = `Sistema: ${osPlatform} • build ${osBuild} • ${osArch}`;
  } catch (error) {
    console.error('[Renderer] Erro ao atualizar system info:', error);
    console.error('[Renderer] Stack trace:', error.stack);
    
    // Tentar atualizar com valores padrão para não deixar tudo em branco
    // CPU
    // Removido: if (summaryCpuUsage) summaryCpuUsage.textContent = '0%';
    if (summaryCpuName) summaryCpuName.textContent = 'N/D';
    if (summaryCpuCores) summaryCpuCores.textContent = 'Núcleos: - • Threads: -';
    
    // GPU
    // Removido: if (summaryGpuUsage) summaryGpuUsage.textContent = 'N/D';
    if (summaryGpuName) summaryGpuName.textContent = 'GPU não detectada';
    if (summaryGpuVram) summaryGpuVram.textContent = 'VRAM N/D';
    
    // Memória
    if (summaryMemoryUsage) summaryMemoryUsage.textContent = '0 GB / 0 GB';
    if (summaryMemoryProgress) summaryMemoryProgress.style.width = '0%';
    if (summaryMemoryFree) summaryMemoryFree.textContent = 'Disponível: 0 GB';
    
    // Armazenamento
    if (summaryStorageUsage) summaryStorageUsage.textContent = '0 GB / 0 GB';
    if (summaryStorageProgress) summaryStorageProgress.style.width = '0%';
    if (summaryStorageUsed) summaryStorageUsed.textContent = '0 GB';
    if (summaryStorageFree) summaryStorageFree.textContent = '0 GB';
    if (summaryStorageMount) summaryStorageMount.textContent = 'C:';
    if (summaryStorageDevices) summaryStorageDevices.textContent = '0';
    
    // Processos
    if (summaryProcessRunning) summaryProcessRunning.textContent = '0';
    if (summaryProcessTotal) summaryProcessTotal.textContent = 'Total: 0';
    if (summaryProcessMeta) summaryProcessMeta.textContent = 'Dormindo: 0 • Bloqueados: 0';
    if (summaryOsLabel) summaryOsLabel.textContent = 'Sistema: N/D • build N/D • N/D';
    
    // Tentar novamente após um delay
    setTimeout(() => {
      console.log('[Renderer] Tentando atualizar novamente após erro...');
      refreshSystemInfo().catch(err => {
        console.error('[Renderer] Erro ao tentar atualizar novamente:', err);
      });
    }, 5000);
  } finally {
    isRefreshingSystemInfo = false;
  }
}

function applyLanguage(lang) {
  const dictionary = translations[lang] || translations['pt-BR'];
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  switch (lang) {
    case 'pt-BR':
      currentLanguageLabel.textContent = 'Brasil';
      languageButton.querySelector('img').src = '../../assets/flags/flag-br.png';
      break;
    case 'pt-PT':
      currentLanguageLabel.textContent = 'Portugal';
      languageButton.querySelector('img').src = '../../assets/flags/flag-pt.png';
      break;
    case 'en-US':
      currentLanguageLabel.textContent = 'USA';
      languageButton.querySelector('img').src = '../../assets/flags/flag-usa.png';
      break;
    case 'ar-SA':
      currentLanguageLabel.textContent = 'العربية';
      languageButton.querySelector('img').src = '../../assets/flags/flag-ar.png';
      break;
    default:
      currentLanguageLabel.textContent = 'Brasil';
  }
}

function applyNetworkState(online) {
  const isOnline = Boolean(online);
  const wasOffline = document.body.classList.contains('offline');
  
  // Não mostrar overlay offline durante login ou termos
  // Verificar se loginOverlay existe (pode não estar inicializado ainda)
  const loginOverlayEl = typeof loginOverlay !== 'undefined' ? loginOverlay : document.getElementById('login-overlay');
  const appShellEl = typeof appShell !== 'undefined' ? appShell : document.getElementById('app-shell');
  const termsModalEl = typeof termsModal !== 'undefined' ? termsModal : document.querySelector('.terms-modal');
  
  const isLoginVisible = loginOverlayEl && !loginOverlayEl.hidden;
  const isTermsVisible = termsModalEl && termsModalEl.classList.contains('show');
  const isAppVisible = appShellEl && !appShellEl.hidden;
  
  // Verificar se o app acabou de ser carregado (evitar mostrar offline imediatamente após login)
  const justLoaded = window._appJustLoaded;
  if (justLoaded) {
    // Se acabou de carregar, NUNCA mostrar offline por pelo menos 5 segundos
    // Se estiver online, remover classe offline
    if (isOnline) {
      document.body.classList.remove('offline');
    }
    // Não aplicar estado offline durante o período de graça
    return;
  }
  
  // Só aplicar estado offline se o app estiver visível E não estiver no período de graça
  // E se não estiver mudando de seção (evitar falsos positivos durante navegação)
  if (isAppVisible && !isLoginVisible && !isTermsVisible && !window._navigatingSection) {
    // Só mostrar offline se realmente estiver offline E não estiver no período de graça
    if (!isOnline && !wasOffline) {
      // Aguardar mais tempo antes de mostrar offline (evitar falsos positivos durante navegação)
      setTimeout(() => {
        // Verificar novamente antes de mostrar e garantir que não está navegando
        if (!document.body.classList.contains('offline') && !window._navigatingSection) {
          document.body.classList.add('offline');
          showToast('Sem conexão com a internet.', 'error');
        }
      }, 2000); // Aumentado de 1000 para 2000ms para dar mais margem
    } else if (isOnline) {
      document.body.classList.remove('offline');
    }
  } else if (isOnline) {
    // Se estiver online, remover classe offline mesmo durante login
    document.body.classList.remove('offline');
  }
}

// Verificação de internet - apenas uma vez ao abrir o painel
async function refreshNetworkState() {
  // Não verificar rede se estiver no período de graça ou navegando
  if (window._appJustLoaded || window._navigatingSection) {
    return;
  }
  
  // Verificar status da API (sempre verificar, não só quando tem VIP/Básico)
  await checkVIPOfflineStatus();
  
  if (navigator.onLine) {
    try {
      const response = await window.y20.checkNetwork();
      // Verificar novamente se não entrou no período de graça durante a verificação
      if (!window._appJustLoaded && !window._navigatingSection) {
        applyNetworkState(response?.online);
      }
    } catch (error) {
      // Em caso de erro, não mostrar offline se estiver no período de graça
      if (!window._appJustLoaded && !window._navigatingSection) {
        applyNetworkState(false);
      }
    }
  } else {
    // Só aplicar offline se não estiver no período de graça
    if (!window._appJustLoaded && !window._navigatingSection) {
      applyNetworkState(false);
    }
  }
}

termsAccept.addEventListener('click', async () => {
  await window.y20.acceptTerms(true);
  termsModal.classList.remove('show');
  if (termsModal) {
    termsModal.hidden = true;
    termsModal.style.display = 'none';
  }
  
  // Após aceitar os termos, verificar autenticação novamente
  // Isso vai mostrar a tela apropriada (com ou sem key)
  console.log('[Terms] Termos aceitos, verificando autenticação...');
  await checkAuthentication();
});

termsDecline.addEventListener('click', async () => {
  await window.y20.acceptTerms(false);
  // Usar windowControl para fechar a janela corretamente
  await window.y20.windowControl('close');
});

const runOptimization = async ({ mode, presetReg } = {}) => {
  const optimizeRunFn = window.y20?.optimizeRun;
  if (typeof optimizeRunFn !== 'function') {
    showToast('Função de otimização indisponível.', 'error');
    return;
  }

  optimizeButtonState(true);
  showOptimizeOverlay();
  try {
    const result = await optimizeRunFn({ mode, presetReg });
    if (result?.cancelled) {
      showToast('Otimização cancelada.', 'info');
      return;
    }
    if (result?.success) {
      Object.keys(currentOptimizations).forEach((key) => {
        currentOptimizations[key] = true;
      });
      renderOptimizations();
      setGaugeValue(result.optimizationScore || 0);
      showToast('Otimização concluída com sucesso!');
    } else if (Array.isArray(result?.failed) && result.failed.length) {
      showToast('Otimização concluída com avisos.', 'warning');
    } else if (Array.isArray(result?.skipped) && result.skipped.length) {
      showToast('Algumas otimizações foram ignoradas (requer admin).', 'info');
    }
    await refreshSystemInfo();
  } catch (error) {
    if (!optimizationCancelled) {
      showToast(error.message || 'Falha ao otimizar.', 'error');
    }
  } finally {
    optimizeButtonState(false);
  }
};

function optimizeButtonState(disabled) {
  if (optimizeBasicButton) {
    optimizeBasicButton.disabled = disabled;
    optimizeBasicButton.classList.toggle('loading', disabled);
  }
  if (optimizeVipButton) {
    optimizeVipButton.disabled = disabled;
    optimizeVipButton.classList.toggle('loading', disabled);
  }
}

function renderVipModal() {
  if (!vipOptionsContainer) return;
  vipOptionsContainer.innerHTML = '';
  
  if (!vipPresetOptions || vipPresetOptions.length === 0) {
    vipOptionsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Nenhuma opção de núcleos encontrada.</p>';
    return;
  }
  
  vipPresetOptions.forEach((option, index) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'vip-option';
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'vip-preset';
    input.value = option.path || option.id;
    if (index === 0) {
      input.checked = true;
    }
    const title = document.createElement('span');
    title.textContent = option.label || option.name || 'Opção sem nome';
    wrapper.appendChild(input);
    wrapper.appendChild(title);
    vipOptionsContainer.appendChild(wrapper);
  });
}

function openVipModal() {
  if (!vipModal) return;
  vipModal.hidden = false;
  vipModal.classList.add('show');
}

function closeVipModal() {
  if (!vipModal) return;
  vipModal.classList.remove('show');
  vipModal.hidden = true;
}

async function loadRestorePoints() {
  const container = document.getElementById('restore-points-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="restore-loading">
      <div class="loading-spinner"></div>
      <p>Carregando pontos de restauração...</p>
    </div>
  `;
  
  try {
    // Usar IPC handler diretamente (mais confiável que API)
    const result = await window.y20.listRestorePoints();
    if (!result || !result.success) {
      const errorMessage = result?.message || 'Erro ao carregar pontos de restauração.';
      const isPermissionError = errorMessage.includes('administrador') || errorMessage.includes('permissão') || errorMessage.includes('permission');
      
      container.innerHTML = `
        <div class="restore-empty">
          <div class="empty-icon">${isPermissionError ? '🔒' : '⚠️'}</div>
          <p>${errorMessage}</p>
          ${isPermissionError ? '<p class="empty-hint">Feche o painel e execute novamente como administrador (botão direito > Executar como administrador).</p>' : ''}
        </div>
      `;
      const countElement = document.getElementById('restore-points-count');
      if (countElement) countElement.textContent = '0 pontos';
      return;
    }
    
    // Se não há pontos mas a operação foi bem-sucedida, mostrar mensagem informativa
    if (result.success && result.points && result.points.length === 0 && result.message) {
      container.innerHTML = `
        <div class="restore-empty">
          <div class="empty-icon">📋</div>
          <p>${result.message}</p>
          <p class="empty-hint">Clique em "Criar ponto agora" para criar seu primeiro ponto de restauração.</p>
        </div>
      `;
      const countElement = document.getElementById('restore-points-count');
      if (countElement) countElement.textContent = '0 pontos';
      return;
    }
    
    if (!result.points || result.points.length === 0) {
      container.innerHTML = `
        <div class="restore-empty">
          <div class="empty-icon">📋</div>
          <p>Nenhum ponto de restauração encontrado.</p>
          <p class="empty-hint">Clique em "Criar ponto agora" para criar seu primeiro ponto de restauração.</p>
        </div>
      `;
      const countElement = document.getElementById('restore-points-count');
      if (countElement) countElement.textContent = '0 pontos';
      return;
    }
    
    container.innerHTML = '';
    
    // Atualizar contador
    const countElement = document.getElementById('restore-points-count');
    if (countElement) {
      const count = result.points.length;
      countElement.textContent = `${count} ${count === 1 ? 'ponto' : 'pontos'}`;
    }
    
    // Criar um Set para rastrear pontos que estão sendo deletados globalmente
    if (!window._deletingRestorePoints) {
      window._deletingRestorePoints = new Set();
    }
    
    result.points.forEach((point) => {
      const seqNum = point.sequence;
      
      // Verificar se este ponto está na lista de pontos sendo deletados
      if (window._deletingRestorePoints.has(seqNum)) {
        console.log(`[Restore] Ponto #${seqNum} está sendo deletado, pulando...`);
        return; // Pular este ponto se está sendo deletado
      }
      
      // Verificar se este ponto já existe no DOM (evitar duplicar)
      const container = document.getElementById('restore-points-container');
      const existingItem = container?.querySelector(`[data-sequence="${seqNum}"]`);
      if (existingItem && existingItem.getAttribute('data-deleting') === 'true') {
        console.log(`[Restore] Ponto #${seqNum} já existe e está sendo deletado, pulando...`);
        return;
      }
      
      const item = document.createElement('div');
      item.className = 'restore-point-item';
      item.setAttribute('data-sequence', seqNum); // Adicionar atributo para identificar
      
      let formattedDate = 'Data inválida';
      try {
        // Tentar múltiplos formatos de data
        let date = null;
        
        if (point.date) {
          // Se já é uma string ISO
          if (typeof point.date === 'string') {
            date = new Date(point.date);
          } 
          // Se é um objeto Date
          else if (point.date instanceof Date) {
            date = point.date;
          }
          // Se é um número (timestamp)
          else if (typeof point.date === 'number') {
            date = new Date(point.date);
          }
          // Tentar parsear como string genérica
          else {
            date = new Date(String(point.date));
          }
        }
        
        // Verificar se a data é válida
        if (date && !isNaN(date.getTime())) {
          formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        } else {
          // Se não conseguiu parsear, apenas marcar como "Data não disponível" sem poluir o console
          console.debug('[Restore] Data inválida para ponto (sem data definida):', point.sequence, 'Data original:', point.date);
          formattedDate = 'Data não disponível';
        }
      } catch (e) {
        console.error('[Restore] Erro ao formatar data:', e, 'Data original:', point.date);
        formattedDate = 'Data não disponível';
      }
      
      const typeIcon = point.type === 'MANUAL' ? '👤' : '🤖';
      const typeLabel = point.type === 'MANUAL' ? 'Manual' : 'Automático';
      
      item.innerHTML = `
        <div class="restore-point-icon">${typeIcon}</div>
        <div class="restore-point-info">
          <div class="restore-point-name">${point.description || 'Ponto de restauração'}</div>
          <div class="restore-point-meta">
            <span class="restore-point-date">${formattedDate}</span>
            <span class="restore-point-type-badge">${typeLabel}</span>
          </div>
        </div>
        <div class="restore-point-actions" style="display: flex; gap: 8px; margin-left: auto;">
          <button class="backup-button primary small" data-sequence="${point.sequence || point.SequenceNumber}" data-action="execute">
            <span class="button-icon">▶️</span>
            <span>Executar</span>
          </button>
          <button class="backup-button ghost small" data-sequence="${point.sequence || point.SequenceNumber}" data-action="delete" style="color: #ef4444;">
            <span class="button-icon">🗑️</span>
            <span>Apagar</span>
          </button>
        </div>
      `;
      
      // Adicionar event listener ao botão Executar
      const executeBtn = item.querySelector('button[data-action="execute"]');
      if (executeBtn) {
        executeBtn.addEventListener('click', async () => {
          const sequence = parseInt(executeBtn.getAttribute('data-sequence'));
          if (isNaN(sequence)) return;
          
          executeBtn.disabled = true;
          executeBtn.innerHTML = '<span class="button-icon">⏳</span><span>Executando...</span>';
          
          if (!confirm('Tem certeza que deseja executar este ponto de restauração? O sistema pode reiniciar.')) {
            executeBtn.disabled = false;
            executeBtn.innerHTML = '<span class="button-icon">▶️</span><span>Executar</span>';
            return;
          }
          
          try {
            // Obter descrição do ponto de restauração para o log
            const restorePointItem = executeBtn.closest('.restore-point-item');
            const pointName = restorePointItem?.querySelector('.restore-point-name')?.textContent || `Ponto ${sequence}`;
            addLogEntry(`Executou: Restaurar ponto - ${pointName}`, 'info');
            
            // Usar IPC handler diretamente (mais confiável que API)
            const result = await window.y20.executeRestorePoint(sequence);
            
            if (result && result.success) {
              showToast(result.message || 'Restauração iniciada. O sistema pode reiniciar.', 'success');
              console.log('[Backup] Restore point executado via API:', result);
              console.log('[Backup] Data/Hora:', result.dateTime);
              // Não recarregar a lista pois o sistema pode reiniciar
            } else {
              showToast(result?.message || 'Não foi possível executar restauração.', 'error');
              executeBtn.disabled = false;
              executeBtn.innerHTML = '<span class="button-icon">▶️</span><span>Executar</span>';
            }
          } catch (error) {
            console.error('[Backup] Erro ao executar restore point:', error);
            showToast('Erro ao executar restauração. Verifique se a API está rodando.', 'error');
            executeBtn.disabled = false;
            executeBtn.innerHTML = '<span class="button-icon">▶️</span><span>Executar</span>';
          }
        });
      }
      
          // Adicionar event listener ao botão Apagar
      const deleteBtn = item.querySelector('button[data-action="delete"]');
      if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
          const sequence = parseInt(deleteBtn.getAttribute('data-sequence'));
          if (isNaN(sequence)) return;
          
          // Verificar se já está sendo deletado
          const restorePointItem = deleteBtn.closest('.restore-point-item');
          if (restorePointItem && restorePointItem.getAttribute('data-deleting') === 'true') {
            console.log(`[Restore] Ponto #${sequence} já está sendo deletado, ignorando...`);
            return;
          }
          
          if (!confirm('Tem certeza que deseja apagar este ponto de restauração?')) {
            return;
          }
          
          // Obter nome do ponto para o log (restorePointItem já foi declarado acima)
          const pointName = restorePointItem?.querySelector('.restore-point-name')?.textContent || `Ponto ${sequence}`;
          addLogEntry(`Executou: Apagar ponto de restauração - ${pointName}`, 'info');
          
          deleteBtn.disabled = true;
          deleteBtn.innerHTML = '<span class="button-icon">⏳</span><span>Apagando...</span>';
          
          // Marcar como sendo deletado globalmente e localmente
          if (!window._deletingRestorePoints) {
            window._deletingRestorePoints = new Set();
          }
          window._deletingRestorePoints.add(sequence);
          
          // Marcar como sendo deletado e remover visualmente o item imediatamente
          if (restorePointItem) {
            restorePointItem.setAttribute('data-deleting', 'true');
            restorePointItem.style.opacity = '0.5';
            restorePointItem.style.transition = 'opacity 0.3s';
          }
          
          try {
            console.log(`[Restore] Tentando deletar ponto #${sequence}...`);
            
            const result = await window.y20.deleteRestorePoint(sequence);
            console.log(`[Restore] Resultado da deleção:`, result);
            
            if (result && result.success) {
              // Remover da lista global de pontos sendo deletados após um delay
              setTimeout(() => {
                if (window._deletingRestorePoints) {
                  window._deletingRestorePoints.delete(sequence);
                }
              }, 5000); // Remover após 5 segundos para garantir que não será recriado
              
              // Remover o item da lista visualmente imediatamente
              if (restorePointItem) {
                restorePointItem.style.transition = 'all 0.3s';
                restorePointItem.style.transform = 'translateX(-100%)';
                restorePointItem.style.opacity = '0';
                setTimeout(() => {
                  restorePointItem.remove();
                  // Atualizar contador
                  const container = document.getElementById('restore-points-container');
                  const countElement = document.getElementById('restore-points-count');
                  if (countElement && container) {
                    const remainingItems = container.querySelectorAll('.restore-point-item').length;
                    countElement.textContent = `${remainingItems} ${remainingItems === 1 ? 'ponto' : 'pontos'}`;
                  }
                }, 300);
              }
              
              showToast(result.message || 'Ponto de restauração apagado com sucesso.', 'success');
              
              // Aguardar mais tempo antes de recarregar para garantir que o sistema processou a deleção
              // E verificar se o item ainda está marcado como deletando antes de recarregar
              setTimeout(() => {
                const stillDeleting = restorePointItem && restorePointItem.getAttribute('data-deleting') === 'true';
                const itemRemoved = !restorePointItem || !restorePointItem.parentNode;
                
                if (itemRemoved) {
                  // Item já foi removido do DOM, recarregar lista para sincronizar contador
                  // Mas aguardar mais um pouco para garantir que o sistema processou
                  setTimeout(() => {
                    loadRestorePoints();
                  }, 1000);
                } else if (!stillDeleting) {
                  // Item não está mais marcado como deletando, recarregar
                  setTimeout(() => {
                    loadRestorePoints();
                  }, 1000);
                } else {
                  // Ainda está sendo deletado, aguardar mais
                  setTimeout(() => {
                    if (restorePointItem && restorePointItem.parentNode) {
                      restorePointItem.removeAttribute('data-deleting');
                      loadRestorePoints();
                    }
                  }, 2000);
                }
              }, 3000); // Aumentado para 3 segundos
            } else {
              // Remover da lista global se falhou
              if (window._deletingRestorePoints) {
                window._deletingRestorePoints.delete(sequence);
              }
              
              // Restaurar visual do item se falhou
              if (restorePointItem) {
                restorePointItem.removeAttribute('data-deleting');
                restorePointItem.style.opacity = '1';
                restorePointItem.style.transform = '';
              }
              const errorMsg = result?.message || 'Não foi possível apagar ponto de restauração.';
              console.error('[Restore] Falha ao deletar:', errorMsg);
              showToast(errorMsg, 'error');
              deleteBtn.disabled = false;
              deleteBtn.innerHTML = '<span class="button-icon">🗑️</span><span>Apagar</span>';
              
              // Recarregar lista para verificar estado atual (mas aguardar mais)
              setTimeout(() => loadRestorePoints(), 1500);
            }
          } catch (error) {
            // Remover da lista global se houve erro
            if (window._deletingRestorePoints) {
              window._deletingRestorePoints.delete(sequence);
            }
            
            // Restaurar visual do item se houve erro
            if (restorePointItem) {
              restorePointItem.removeAttribute('data-deleting');
              restorePointItem.style.opacity = '1';
              restorePointItem.style.transform = '';
            }
            console.error('[Restore] Erro ao apagar:', error);
            const errorMsg = error.message || 'Erro desconhecido ao apagar ponto de restauração.';
            showToast(errorMsg, 'error');
            deleteBtn.disabled = false;
            deleteBtn.innerHTML = '<span class="button-icon">🗑️</span><span>Apagar</span>';
            
            // Recarregar lista para sincronizar (mas aguardar mais)
            setTimeout(() => loadRestorePoints(), 1500);
          }
        });
      }
      
      container.appendChild(item);
    });
  } catch (error) {
    console.error('[Restore] Erro ao carregar pontos', error);
    container.innerHTML = `
      <div class="restore-empty">
        <div class="empty-icon">❌</div>
        <p>Erro ao carregar pontos de restauração.</p>
        <p class="empty-hint">Verifique se você tem permissões de administrador.</p>
      </div>
    `;
    const countElement = document.getElementById('restore-points-count');
    if (countElement) countElement.textContent = '0 pontos';
  }
}

createRestorePointBtn.addEventListener('click', async () => {
  addLogEntry('Executou: Criar ponto de restauração', 'info');
  // Desabilitar botão e mostrar estado de execução
  const originalHTML = createRestorePointBtn.innerHTML;
  createRestorePointBtn.disabled = true;
  createRestorePointBtn.innerHTML = `
    <span class="button-icon">⚙️</span>
    <span>Criando ponto de restauração...</span>
  `;
  
  // Adicionar animação de execução
  createRestorePointBtn.style.position = 'relative';
  createRestorePointBtn.style.overflow = 'hidden';
  
  // Criar overlay de animação
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    animation: script-loading-shimmer 2s infinite;
    pointer-events: none;
  `;
  createRestorePointBtn.appendChild(overlay);
  
  // Adicionar estilo de animação se não existir
  if (!document.getElementById('restore-create-animation-style')) {
    const style = document.createElement('style');
    style.id = 'restore-create-animation-style';
    style.textContent = `
      @keyframes script-loading-shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `;
    document.head.appendChild(style);
  }
  
  try {
    console.log('[Restore] Iniciando criação de ponto de restauração...');
    
    // Usar IPC handler diretamente (mais confiável que API)
    const now = new Date();
    const description = `Y20 BOOSTER - Backup ${now.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`;
    
    // Usar IPC handler diretamente (mais confiável que API)
    const result = await window.y20.createRestorePoint(description);
    console.log('[Restore] Resultado:', result);
    
    // Remover overlay
    overlay.remove();
    
    if (result && result.success) {
      // Log foi gerado automaticamente pela API
      console.log('[Backup] Ponto de restauração criado:', result);
      if (result.point) {
        console.log('[Backup] Sequence Number:', result.point.sequence);
        console.log('[Backup] Descrição:', result.point.description);
        console.log('[Backup] Data:', result.point.date);
      }
      
      // Mostrar sucesso
      createRestorePointBtn.innerHTML = `
        <span class="button-icon">✅</span>
        <span>Ponto criado com sucesso!</span>
      `;
      createRestorePointBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      
      let toastMessage = 'Ponto de restauração criado com sucesso!';
      if (result.sequenceNumber) {
        toastMessage = `Ponto criado! Sequência: ${result.sequenceNumber}, Data: ${result.dateTime}`;
      }
      
      showToast(toastMessage);
      
      // Recarregar lista após criar (com múltiplas tentativas para garantir sincronização)
      setTimeout(() => {
        loadRestorePoints();
        // Tentar recarregar novamente após mais tempo
        setTimeout(() => {
          loadRestorePoints();
          // Restaurar botão após 3 segundos
          setTimeout(() => {
            createRestorePointBtn.innerHTML = originalHTML;
            createRestorePointBtn.disabled = false;
            createRestorePointBtn.style.background = '';
          }, 2000);
        }, 1500);
      }, 1000);
    } else {
      // Mostrar erro com mensagem mais clara
      const errorMessage = result?.message || 'Não foi possível criar ponto de restauração.';
      const isPermissionError = errorMessage.includes('administrador') || errorMessage.includes('permissão') || errorMessage.includes('permission') || errorMessage.includes('acesso negado') || errorMessage.includes('Access is denied');
      
      createRestorePointBtn.innerHTML = `
        <span class="button-icon">${isPermissionError ? '🔒' : '❌'}</span>
        <span>${isPermissionError ? 'Execute como administrador' : 'Erro ao criar ponto'}</span>
      `;
      createRestorePointBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      
      const fullErrorMessage = isPermissionError 
        ? 'Execute o painel como administrador para criar pontos de restauração. Feche o painel e execute novamente com botão direito > Executar como administrador.'
        : errorMessage;
      
      showToast(fullErrorMessage, 'error');
      
      // Restaurar botão após 5 segundos
      setTimeout(() => {
        overlay.remove();
        createRestorePointBtn.innerHTML = originalHTML;
        createRestorePointBtn.disabled = false;
        createRestorePointBtn.style.background = '';
      }, 5000);
    }
  } catch (error) {
    // Remover overlay
    if (overlay && overlay.parentNode) {
      overlay.remove();
    }
    
    console.error('[Restore] Erro ao criar restore point:', error);
    
    const errorMessage = error.message || 'Erro desconhecido ao criar ponto de restauração.';
    const isPermissionError = errorMessage.includes('administrador') || errorMessage.includes('permissão') || errorMessage.includes('permission') || errorMessage.includes('acesso negado') || errorMessage.includes('Access is denied');
    
    // Mostrar erro
    createRestorePointBtn.innerHTML = `
      <span class="button-icon">${isPermissionError ? '🔒' : '❌'}</span>
      <span>${isPermissionError ? 'Execute como administrador' : 'Erro ao criar ponto'}</span>
    `;
    createRestorePointBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    
    const fullErrorMessage = isPermissionError 
      ? 'Execute o painel como administrador para criar pontos de restauração. Feche o painel e execute novamente com botão direito > Executar como administrador.'
      : `Erro ao criar ponto de restauração: ${errorMessage}`;
    
    showToast(fullErrorMessage, 'error');
    
    // Restaurar botão após 5 segundos
    setTimeout(() => {
      createRestorePointBtn.innerHTML = originalHTML;
      createRestorePointBtn.disabled = false;
      createRestorePointBtn.style.background = '';
    }, 5000);
  }
});

openRestoreSettingsBtn.addEventListener('click', async () => {
  await window.y20.openRestoreSettings();
  showToast('Abrindo configurações de restauração...');
});

// Removido: activateRestoreProtectionBtn event listener (seção de proteção removida)

window.y20.onRestorePointResult((result) => {
  if (result.success) {
    showToast('Ponto de restauração automático criado.');
  } else {
    showToast(result.message || 'Falha ao criar ponto automático.', 'error');
  }
});

// Carregar e atualizar estado do botão de backup automático
async function updateAutoBackupButton() {
  if (!toggleAutoBackupBtn || !autoBackupIcon || !autoBackupText) return;
  
  try {
    const result = await window.y20.getAutoBackupSetting();
    const enabled = result?.enabled || false;
    
    if (enabled) {
      autoBackupIcon.textContent = '🟢';
      autoBackupText.textContent = 'Fazer backup automático após abrir painel';
      toggleAutoBackupBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      toggleAutoBackupBtn.style.color = '#ffffff';
    } else {
      autoBackupIcon.textContent = '🔴';
      autoBackupText.textContent = 'Fazer backup automático após abrir painel';
      toggleAutoBackupBtn.style.background = '';
      toggleAutoBackupBtn.style.color = '';
    }
  } catch (error) {
    console.error('[Restore] Erro ao carregar configuração de backup automático:', error);
  }
}

// Event listener para toggle do backup automático
if (toggleAutoBackupBtn) {
  toggleAutoBackupBtn.addEventListener('click', async () => {
    try {
      const currentResult = await window.y20.getAutoBackupSetting();
      const currentEnabled = currentResult?.enabled || false;
      const newEnabled = !currentEnabled;
      
      toggleAutoBackupBtn.disabled = true;
      
      const result = await window.y20.setAutoBackupSetting(newEnabled);
      
      if (result.success) {
        await updateAutoBackupButton();
        showToast(
          newEnabled 
            ? 'Backup automático ativado. Um backup será criado toda vez que você abrir o painel.' 
            : 'Backup automático desativado.',
          'success'
        );
      } else {
        showToast('Erro ao alterar configuração de backup automático.', 'error');
      }
    } catch (error) {
      console.error('[Restore] Erro ao alterar configuração de backup automático:', error);
      showToast('Erro ao alterar configuração.', 'error');
    } finally {
      toggleAutoBackupBtn.disabled = false;
    }
  });
  
  // Carregar estado inicial
  updateAutoBackupButton();
}

if (clearAllRestorePointsBtn) {
  clearAllRestorePointsBtn.addEventListener('click', async () => {
    if (!confirm('Tem certeza que deseja limpar TODOS os pontos de restauração? Esta ação não pode ser desfeita.')) {
      return;
    }

    addLogEntry('Executou: Limpar todos os pontos de restauração', 'info');

    clearAllRestorePointsBtn.disabled = true;
    clearAllRestorePointsBtn.innerHTML = '<span class="button-icon">⏳</span><span>Limpando...</span>';

    try {
      const result = await window.y20.clearAllRestorePoints();
      if (result.success) {
        const deleted = result.deleted || 0;
        showToast(`Todos os pontos de restauração foram removidos (${deleted} removidos).`);
        
        // Limpar a lista imediatamente visualmente
        const container = document.getElementById('restore-points-container');
        if (container) {
          container.innerHTML = `
            <div class="restore-loading">
              <div class="loading-spinner"></div>
              <p>Atualizando lista...</p>
            </div>
          `;
        }
        
        // Atualizar contador imediatamente
        const countElement = document.getElementById('restore-points-count');
        if (countElement) {
          countElement.textContent = '0 pontos';
        }
        
        // Aguardar um pouco para o sistema atualizar e depois recarregar várias vezes
        setTimeout(() => loadRestorePoints(), 1000);
        setTimeout(() => loadRestorePoints(), 2500);
        setTimeout(() => loadRestorePoints(), 4000);
      } else {
        showToast(result.message || 'Não foi possível limpar os pontos de restauração.', 'error');
      }
    } catch (error) {
      console.error('[Restore] Erro ao limpar pontos:', error);
      showToast('Erro ao limpar pontos de restauração.', 'error');
      // Mesmo com erro, tentar recarregar a lista
      setTimeout(() => loadRestorePoints(), 1000);
    } finally {
      clearAllRestorePointsBtn.disabled = false;
      clearAllRestorePointsBtn.innerHTML = '<span class="button-icon">🗑️</span><span>Limpar Todos Backup</span>';
    }
  });
}

window.y20.onOptimizationProgress?.((payload) => {
  if (!optimizeOverlay) {
    return;
  }

  // IMPORTANTE: Se o overlay já está aberto e é VIP, não processar aqui
  // O listener específico do VIP vai processar
  const isVipOptimization = optimizeTitle && optimizeTitle.textContent === 'Otimizando VIP';
  if (isVipOptimization && optimizationOverlayVisible) {
    // Deixar o listener específico do VIP processar
    return;
  }

  switch (payload?.type) {
    case 'init': {
      optimizationTotalSteps = payload.total || 0;
      optimizationSummary = { applied: 0, failed: 0, skipped: payload?.skipped?.length || 0 };
      updateOptimizeCounts();
      if (!optimizationOverlayVisible) {
        showOptimizeOverlay();
      }
      if (optimizeTitle) optimizeTitle.textContent = 'Aplicando otimizações';
      resetOptimizationEntries();
      if (Array.isArray(payload?.skipped)) {
        payload.skipped.forEach((item) => {
          if (item && typeof item === 'object') {
            setOptimizationEntry(
              item.path || item.name,
              item.label || item.name || item.path,
              'skipped',
              item.message || 'Requer privilégios de administrador.'
            );
          }
        });
        if (payload.skipped.length && optimizeTips) {
          optimizeTips.hidden = false;
        }
      }
      updateOptimizeOverlay(0, 'Aguarde, a otimização está em andamento...');
      break;
    }
    case 'step': {
      const total = payload.total || optimizationTotalSteps || 1;
      const baseLabel = payload.displayLabel || payload.label || 'Script';
      const pathValue = payload.path || baseLabel;
      if (!optimizationOverlayVisible) {
        showOptimizeOverlay();
      }
      if (payload.status === 'done') {
        optimizationSummary.applied += 1;
      } else if (payload.status === 'error') {
        optimizationSummary.failed += 1;
      }
      updateOptimizeCounts();
      setOptimizationEntry(
        pathValue,
        baseLabel,
        payload.status === 'done'
          ? 'done'
          : payload.status === 'error'
            ? 'error'
            : payload.status === 'skipped'
              ? 'skipped'
              : 'running',
        payload.message
      );
      const index = payload.index || optimizationSummary.applied + optimizationSummary.failed;
      if (payload.status === 'start') {
        const percent = total ? Math.round(((index - 1) / total) * 100) : 0;
        updateOptimizeOverlay(percent, `Executando ${baseLabel} (${index}/${total})`);
      } else if (payload.status === 'done') {
        const percent = total ? Math.round((index / total) * 100) : 100;
        updateOptimizeOverlay(percent, `Concluído ${baseLabel} (${index}/${total})`);
      } else if (payload.status === 'error') {
        updateOptimizeOverlay(undefined, `Falha em ${baseLabel}. Continuando...`);
      } else if (payload.status === 'skipped') {
        updateOptimizeOverlay(undefined, `${baseLabel} ignorado (requer administrador).`);
      }
      break;
    }
    case 'finish': {
      optimizationFinished = true;
      if (payload?.summary) {
        optimizationSummary = payload.summary;
        updateOptimizeCounts();
      }
      const appliedCount = optimizationSummary.applied || 0;
      const failedCount = payload?.failed?.length || optimizationSummary.failed || 0;
      const skippedCount = payload?.skipped?.length || optimizationSummary.skipped || 0;
      
      if (optimizeTitle) {
        if (failedCount) {
          optimizeTitle.textContent = 'Concluído com avisos';
          optimizeOverlay.classList.add('error');
        } else if (skippedCount) {
          optimizeTitle.textContent = 'Concluído (faltou aplicar)';
          optimizeOverlay.classList.add('cancelled');
          if (optimizeTips) optimizeTips.hidden = false;
        } else {
          optimizeTitle.textContent = 'Otimização concluída';
        }
      }
      
      // Mensagem detalhada do resumo final
      const summaryParts = [];
      if (appliedCount > 0) {
        summaryParts.push(`${appliedCount} ${appliedCount === 1 ? 'otimização aplicada' : 'otimizações aplicadas'}`);
      }
      if (skippedCount > 0) {
        summaryParts.push(`${skippedCount} ${skippedCount === 1 ? 'não executada' : 'não executadas'} por falta de privilégios de administrador`);
      }
      if (failedCount > 0) {
        summaryParts.push(`${failedCount} ${failedCount === 1 ? 'falhou' : 'falharam'}`);
      }
      
      if (summaryParts.length > 0) {
        const summaryMessage = summaryParts.join(' • ');
        updateOptimizeOverlay(100, summaryMessage);
      } else {
        updateOptimizeOverlay(100, 'Todas as otimizações foram aplicadas.');
      }
      if (optimizeCancelButton) optimizeCancelButton.hidden = true;
      if (optimizeCloseButton) optimizeCloseButton.hidden = false;
      break;
    }
    case 'summary': {
      if (Array.isArray(payload.items)) {
        payload.items.forEach((item) => {
          if (item && typeof item === 'object') {
            setOptimizationEntry(item.path || item.name, item.label || item.name || item.path, 'done');
          } else if (typeof item === 'string') {
            setOptimizationEntry(item, item.split(/[\\/]/).pop(), 'done');
          }
        });
      }
      if (Array.isArray(payload.failed)) {
        payload.failed.forEach((item) => {
          if (item && typeof item === 'object') {
            setOptimizationEntry(item.path || item.name, item.label || item.name || item.path, 'error', item.message);
          }
        });
      }
      if (Array.isArray(payload.skipped)) {
        payload.skipped.forEach((item) => {
          if (item && typeof item === 'object') {
            setOptimizationEntry(
              item.path || item.name,
              item.label || item.name || item.path,
              'skipped',
              item.message || 'Requer privilégios de administrador.'
            );
          }
        });
        if (payload.skipped.length && optimizeTips) {
          optimizeTips.hidden = false;
        }
      }
      if (payload?.summary) {
        optimizationSummary = payload.summary;
        updateOptimizeCounts();
      }
      break;
    }
    case 'paused': {
      // Mostrar modal de confirmação
      showCancelConfirmationModal();
      if (optimizeTitle) optimizeTitle.textContent = 'Otimização pausada';
      updateOptimizeOverlay(undefined, payload.message || 'Otimização pausada. Aguardando confirmação...');
      break;
    }
    case 'resumed': {
      if (optimizeTitle) optimizeTitle.textContent = 'Aplicando otimização';
      if (optimizeCancelButton) {
        optimizeCancelButton.disabled = false;
        optimizeCancelButton.textContent = 'Cancelar';
        optimizeCancelButton.hidden = false;
      }
      updateOptimizeOverlay(undefined, payload.message || 'Continuando otimização...');
      break;
    }
    case 'cancelled': {
      optimizationCancelled = true;
      optimizeOverlay.classList.add('cancelled');
      if (optimizeTitle) optimizeTitle.textContent = 'Otimização cancelada';
      if (optimizeCancelButton) optimizeCancelButton.hidden = true;
      if (optimizeCloseButton) optimizeCloseButton.hidden = false;
      updateOptimizeOverlay(undefined, payload.message || 'Otimização cancelada.');
      break;
    }
    case 'error': {
      optimizeOverlay.classList.add('error');
      if (optimizeTitle) optimizeTitle.textContent = 'Erro ao otimizar';
      if (optimizeCancelButton) optimizeCancelButton.hidden = true;
      if (optimizeCloseButton) optimizeCloseButton.hidden = false;
      updateOptimizeOverlay(undefined, payload.message || 'Falha ao aplicar otimizações.');
      break;
    }
    default:
      break;
  }
});

// Função para inicializar botão de cancelar (garantir que sempre funcione)
function initializeOptimizeCancelButton() {
  const btn = document.getElementById('optimize-cancel');
  if (!btn) {
    // Tentar novamente se não encontrar
    setTimeout(initializeOptimizeCancelButton, 100);
    return;
  }
  
  // Remover listener anterior se existir (clonar para remover)
  const newBtn = btn.cloneNode(true);
  if (btn.parentNode) {
    btn.parentNode.replaceChild(newBtn, btn);
  }
  
  // Garantir que nunca seja bloqueado
  newBtn.disabled = false;
  newBtn.style.opacity = '1';
  newBtn.style.cursor = 'pointer';
  newBtn.removeAttribute('data-blocked');
  newBtn.title = '';
  
  // Adicionar event listener
  newBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (optimizationCancelled || optimizationFinished) {
      hideOptimizeOverlay();
      return;
    }
    
    newBtn.disabled = true;
    newBtn.textContent = 'Pausando...';
    
    try {
      if (window.y20 && window.y20.optimizeCancel) {
        await window.y20.optimizeCancel();
        // O modal será mostrado quando o evento 'paused' for recebido
      } else {
        // Se não tiver a função, tentar cancelar diretamente
        console.warn('[Optimize] optimizeCancel não disponível, cancelando diretamente...');
        optimizationCancelled = true;
        hideOptimizeOverlay();
        showToast('Otimização cancelada.', 'info');
      }
    } catch (error) {
      console.error('[Optimize] Erro ao cancelar:', error);
      newBtn.disabled = false;
      newBtn.textContent = 'Cancelar';
      showToast('Não foi possível pausar. Tente novamente.', 'error');
    }
  });
  
  // Atualizar referência global
  optimizeCancelButton = newBtn;
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeOptimizeCancelButton);
} else {
  initializeOptimizeCancelButton();
}

// Também inicializar após um delay para garantir
setTimeout(initializeOptimizeCancelButton, 500);

if (optimizeCloseButton) {
  optimizeCloseButton.addEventListener('click', () => {
    hideOptimizeOverlay();
  });
}

if (optimizeRetryAdmin) {
  optimizeRetryAdmin.addEventListener('click', () => {
    hideOptimizeOverlay();
    showToast('Reabra o Y20 Booster como administrador e execute novamente.', 'warning');
  });
}

async function runOptimizationPackSimple() {
  // Executar todos os .bat da pasta raiz OptimizationPack
  if (!window.y20?.optimizationPackRunSimple) {
    showToast('Função de otimização simples indisponível.', 'error');
    return;
  }

  // Verificar se está bloqueado (só para usuários sem key)
  try {
    const accessLevel = await window.y20?.getCurrentAccessLevel?.() || 'simple';
    if (accessLevel === 'simple') {
      const blockCheck = await window.y20?.checkSimpleOptimizationBlocked?.();
      if (blockCheck && blockCheck.blocked) {
        showToast('⚠️ Otimizar Simples bloqueado. Aguarde decay de 4h (-6%) para executar novamente.', 'warning');
        return;
      }
    }
  } catch (error) {
    console.warn('[Optimization] Erro ao verificar bloqueio:', error);
  }

  optimizeButtonState(true);
  showOptimizeOverlay('Simples');
  
  // Resetar entradas de otimização
  optimizationEntries = [];
  if (optimizeResults) optimizeResults.innerHTML = '';
  if (optimizeSummary) optimizeSummary.hidden = true;
  if (optimizeLog) optimizeLog.hidden = false;
  
  let optimizationResults = {
    applied: 0,
    failed: 0,
    skipped: 0,
    requiresAdmin: []
  };
  
  try {
    // Registrar contexto da última otimização (modo simples)
    lastOptimizationContext = { type: 'simple', folderName: null };
    // Configurar listener de progresso
    if (window.y20?.onOptimizationProgress) {
      window.y20.onOptimizationProgress(async (payload) => {
        if (payload && typeof payload === 'object') {
          const percent = payload.percent || 0;
          const scriptName = payload.script || 'Script';
          
          // Atualizar progresso
          updateOptimizeOverlay(percent, payload.status === 'Executando...' ? `Executando ${scriptName}...` : 'Aguarde, a otimização está em andamento...');
          
          // Processar diferentes tipos de eventos
          if (payload.type === 'executing') {
            addOptimizationLogEntry(scriptName, 'executing');
          } else if (payload.type === 'success') {
            updateOptimizationLogEntry(scriptName, 'success', 'Pronto! ✓');
            optimizationResults.applied++;
            
            // Atualizar porcentagem de otimização em tempo real após cada script executado
            try {
              const scoreResult = await window.y20?.calculateOptimizationScore?.();
              if (scoreResult !== undefined) {
                setGaugeValue(scoreResult);
                console.log('[Optimization] Porcentagem atualizada (tempo real) após', scriptName, ':', scoreResult);
              }
            } catch (scoreError) {
              console.warn('[Optimization] Erro ao atualizar porcentagem em tempo real:', scoreError);
            }
          } else if (payload.type === 'admin_required') {
            updateOptimizationLogEntry(scriptName, 'admin_required', 'Pronto! ✓');
            optimizationResults.skipped++;
            optimizationResults.requiresAdmin.push(scriptName);
            
            if (optimizeTips && optimizeTips.hidden) {
              await showOptimizationAdminWarning(optimizationResults.requiresAdmin.length);
            }
          } else if (payload.type === 'paused') {
            if (optimizeCancelButton) {
              optimizeCancelButton.disabled = false;
              optimizeCancelButton.textContent = 'Cancelar';
            }
            showCancelConfirmationModal();
            return;
          } else if (payload.type === 'cancelled') {
            hideCancelConfirmationModal();
            hideOptimizeOverlay();
            return;
          } else if (payload.type === 'error') {
            updateOptimizationLogEntry(scriptName, 'error', 'Erro');
            optimizationResults.failed++;
          } else if (payload.type === 'completed') {
            optimizationResults = payload.results || optimizationResults;
            showOptimizationSummary(optimizationResults, false);
            return;
          }
        }
      });
    }

    const result = await window.y20.optimizationPackRunSimple();
    
    // ATUALIZAR PORCENTAGEM IMEDIATAMENTE após otimização simples
    if (result?.success) {
      // Usar o score retornado pelo backend (já atualizado)
      if (result?.optimizationScore !== undefined) {
        setGaugeValue(result.optimizationScore);
        console.log('[Optimization] Simples: Porcentagem atualizada IMEDIATAMENTE para:', result.optimizationScore);
      } else {
        // Se não veio no resultado, buscar do backend
        try {
          const scoreResult = await window.y20?.calculateOptimizationScore?.();
          if (scoreResult !== undefined) {
            setGaugeValue(scoreResult);
            console.log('[Optimization] Simples: Porcentagem atualizada (busca) para:', scoreResult);
          }
        } catch (scoreError) {
          console.warn('[Optimization] Simples: Erro ao atualizar porcentagem:', scoreError);
        }
      }
      
      if (!optimizationSummary || optimizationSummary.hidden) {
        showOptimizationSummary(result, false);
      }
      
      if (result.requiresAdmin && result.requiresAdmin.length > 0) {
        await showOptimizationAdminWarning(result.requiresAdmin.length);
      }
      
      // Atualizar score de otimização IMEDIATAMENTE - FORÇAR ATUALIZAÇÃO
      // PRIMEIRO: Usar o score retornado pelo backend se disponível
      if (result.optimizationScore !== undefined) {
        setGaugeValue(result.optimizationScore);
        console.log('[Optimization] Simples: Porcentagem atualizada IMEDIATAMENTE (do resultado) para:', result.optimizationScore);
      }
      
      // SEGUNDO: Sempre buscar do backend para garantir que está atualizado
      try {
        // Pequeno delay para garantir que o backend processou
        await new Promise(resolve => setTimeout(resolve, 100));
        const scoreResult = await window.y20?.calculateOptimizationScore?.();
        if (scoreResult !== undefined) {
          setGaugeValue(scoreResult);
          console.log('[Optimization] Simples: Porcentagem atualizada IMEDIATAMENTE (busca backend) para:', scoreResult);
        }
      } catch (scoreError) {
        console.warn('[Optimization] Simples: Erro ao buscar score após otimização:', scoreError);
      }
      
      // TERCEIRO: Atualização adicional após delay para garantir persistência
      setTimeout(async () => {
        try {
          const persistentScore = await window.y20?.calculateOptimizationScore?.();
          if (persistentScore !== undefined) {
            setGaugeValue(persistentScore);
            console.log('[Optimization] Simples: Porcentagem atualizada (persistente) para:', persistentScore);
          }
        } catch (persistentError) {
          console.warn('[Optimization] Simples: Erro ao buscar score (persistente):', persistentError);
        }
      }, 500);
      
      // Garantir que as informações do usuário permaneçam visíveis após otimização
      try {
        const authResult = await window.y20.isAuthenticated();
        if (authResult && authResult.authenticated && authResult.valid && authResult.keyData) {
          const accessLevel = getAccessLevelFromKey(authResult.keyData);
          updateAccessLevelUI(accessLevel);
          
          // Garantir que user-card está visível e activate-key-card está escondido
          const userCard = document.getElementById('user-card');
          const activateKeyCardTop = document.getElementById('activate-key-card-top');
          if (userCard && activateKeyCardTop) {
            userCard.style.display = 'block';
            activateKeyCardTop.style.display = 'none';
          }
        }
      } catch (authError) {
        console.warn('[Optimization] Erro ao verificar autenticação após otimização:', authError);
      }
    } else {
      showToast(result?.message || 'Erro ao executar otimização simples', 'error');
      hideOptimizeOverlay();
    }
    
    await refreshSystemInfo();
  } catch (error) {
    console.error('[OptimizationPackSimple] Erro:', error);
    showToast(error.message || 'Falha ao executar otimização simples.', 'error');
    hideOptimizeOverlay();
  } finally {
    optimizeButtonState(false);
  }
}

async function runOptimizationPack(folderName, keepOverlayOpen = false, startIndex = 0, totalItems = 0) {
  console.log('[OptimizationPack] Iniciando runOptimizationPack para:', folderName);
  
  // Verificar se é tentativa de executar otimização VIP sem permissão
  const isVipOptimization = folderName === 'Otimização Vip' || folderName.includes('Vip');
  if (isVipOptimization) {
    // Verificar se o usuário tem acesso VIP
    try {
      const authResult = await window.y20.isAuthenticated();
      if (!authResult.authenticated || !authResult.valid || !authResult.keyData) {
        showToast('Você precisa estar autenticado para usar esta funcionalidade.', 'error');
        return;
      }
      
      const keyType = authResult.keyData.type || 'normal';
      if (keyType !== 'vip') {
        showToast('Esta funcionalidade requer Key VIP. Faça upgrade no Discord para desbloquear!', 'warning');
        // Tentar abrir Discord se disponível
        try {
          await window.y20.openDiscord();
        } catch (e) {
          // Ignorar erro ao abrir Discord
        }
        return;
      }
    } catch (error) {
      console.error('[OptimizationPack] Erro ao verificar autenticação VIP:', error);
      showToast('Erro ao verificar permissões. Tente novamente.', 'error');
      return;
    }
  }
  
  if (!window.y20?.optimizationPackRun) {
    console.error('[OptimizationPack] window.y20.optimizationPackRun não disponível');
    showToast('Função de otimização indisponível.', 'error');
    if (!keepOverlayOpen) {
      hideOptimizeOverlay();
    }
    return;
  }

  console.log('[OptimizationPack] Mostrando overlay...');
  // Registrar contexto da última otimização em pack
  lastOptimizationContext = { type: 'pack', folderName };
  // Verificar se overlay já está aberto (para não resetar progresso)
  const overlayAlreadyOpen = optimizeOverlay && !optimizeOverlay.hidden;
  
  // Determinar tipo de otimização para o título
  let optimizationType = null;
  if (folderName === 'Otimização Vip' || folderName === 'Otimização VIP' || folderName.includes('Vip')) {
    optimizationType = 'VIP';
  } else if (folderName === 'Otimização Basico' || folderName === 'Otimização Básico' || folderName.includes('Basico') || folderName.includes('Básico')) {
    optimizationType = 'Básico';
  }
  
  // Se overlay já está aberto (VIP), não resetar - apenas continuar
  // Se não está aberto, mostrar agora
  if (!overlayAlreadyOpen) {
    optimizeButtonState(true);
    showOptimizeOverlay(optimizationType);
    // Se totalItems foi passado, atualizar overlay com progresso inicial
    if (totalItems > 0 && startIndex >= 0) {
      updateOptimizeOverlay(Math.round((startIndex / totalItems) * 100), `Iniciando scripts .bat... (${startIndex}/${totalItems})`);
    }
    
    // Resetar entradas de otimização apenas se for um novo overlay
    optimizationEntries = [];
    if (optimizeResults) optimizeResults.innerHTML = '';
    if (optimizeSummary) optimizeSummary.hidden = true;
    if (optimizeLog) optimizeLog.hidden = false;
  } else {
    // Overlay já está aberto - apenas atualizar progresso se totalItems foi passado
    // IMPORTANTE: Não resetar o subtitle, apenas atualizar com o contador correto
    if (totalItems > 0 && startIndex >= 0) {
      updateOptimizeOverlay(Math.round((startIndex / totalItems) * 100), `Continuando com scripts .bat... (${startIndex}/${totalItems})`);
    }
  }
  
  // IMPORTANTE: Armazenar totalItems em uma variável que será usada no listener
  // Isso garante que mesmo se o payload.total for diferente, usaremos o totalItems correto
  // Usar uma variável que será capturada pelo closure do listener
  const effectiveTotalItemsForListener = (keepOverlayOpen && totalItems > 0) ? totalItems : (totalItems > 0 ? totalItems : null);
  
  let optimizationResults = {
    applied: 0,
    failed: 0,
    skipped: 0,
    requiresAdmin: []
  };
  
  try {
    // Configurar listener de progresso
    // IMPORTANTE: Este listener será registrado e usará totalItems completo quando disponível
    // Este listener tem PRIORIDADE sobre o listener global quando keepOverlayOpen é true
    if (window.y20?.onOptimizationProgress) {
      window.y20.onOptimizationProgress(async (payload) => {
        console.log('[OptimizationPack] Listener runOptimizationPack: Evento recebido:', payload, 'keepOverlayOpen:', keepOverlayOpen, 'vipListenerActive:', window._vipOptimizationListenerActive);
        
        if (payload && typeof payload === 'object') {
          // IMPORTANTE: Se já existe um listener VIP pré-registrado (do executePreset), 
          // dar prioridade a ele, mas processar também aqui como fallback
          if (window._vipOptimizationListenerActive && window._vipOptimizationTotalItems) {
            console.log('[OptimizationPack] Listener VIP ativo detectado, dando prioridade ao listener pré-registrado');
            // Não retornar completamente - processar também aqui como fallback
            // O listener VIP deve processar primeiro, mas se não processar corretamente, este processará
          }
          
          // IMPORTANTE: Se não é VIP (keepOverlayOpen = false), deixar o listener global processar
          if (!keepOverlayOpen || !effectiveTotalItemsForListener) {
            // Se não é VIP e não tem listener VIP ativo, processar normalmente
            if (!window._vipOptimizationListenerActive) {
              // Continuar processando normalmente
            } else {
              // Se tem listener VIP ativo mas não é VIP, deixar o listener global processar
              return;
            }
          }
          
          // IMPORTANTE: Para VIP, processar TODOS os payloads relacionados à execução de scripts
          // Não deixar o listener global processar quando é VIP
          const percent = payload.percent || 0;
          const scriptName = payload.script || 'Script';
          
          // IMPORTANTE: Se keepOverlayOpen é true e totalItems foi passado, usar totalItems completo
          // O payload.total do backend é apenas dos scripts .bat (124), não do total completo (225)
          let adjustedPercent = percent;
          let currentItemDisplay = undefined;
          let displayTotal = undefined;
          
          // Usar effectiveTotalItemsForListener se disponível (para VIP), senão usar totalItems
          const effectiveTotalItems = effectiveTotalItemsForListener || totalItems;
          
          if (keepOverlayOpen && effectiveTotalItems > 0 && startIndex >= 0) {
            // Para VIP: usar effectiveTotalItems completo (225) desde o início
            // O payload.percent é relativo apenas aos scripts .bat (0-100% dos 124 scripts)
            // O payload.current é o índice atual dentro dos scripts .bat (1 até payload.total)
            const scriptsRange = effectiveTotalItems - startIndex; // Quantidade de scripts .bat (ex: 124)
            
            // Calcular payloadCurrent: se payload.current existe, usar; senão calcular do percent
            let payloadCurrent = 0;
            if (payload.current !== undefined && payload.current !== null) {
              payloadCurrent = payload.current; // payload.current já é o índice atual (1, 2, 3...)
            } else {
              // Se não tem payload.current, calcular do percent
              // payload.total é apenas dos scripts .bat (124), não usar para calcular currentItemDisplay
              payloadCurrent = Math.max(1, Math.round((percent / 100) * scriptsRange));
            }
            
            // currentItem = startIndex (já executado, ex: 1 = RAM Booster) + payloadCurrent (progresso nos scripts .bat)
            // payloadCurrent começa em 1 (primeiro script), então currentItem = startIndex + payloadCurrent
            currentItemDisplay = startIndex + payloadCurrent;
            
            // Calcular percentual ajustado para o total completo (225)
            adjustedPercent = Math.round((currentItemDisplay / effectiveTotalItems) * 100);
            displayTotal = effectiveTotalItems; // SEMPRE usar effectiveTotalItems completo (225), nunca payload.total (124)
            
            console.log(`[OptimizationPack] Progresso VIP: payload.current=${payload.current}, payload.total=${payload.total} (IGNORADO - usar effectiveTotalItems=${effectiveTotalItems}), startIndex=${startIndex}, scriptsRange=${scriptsRange}, payloadCurrent=${payloadCurrent}, currentItemDisplay=${currentItemDisplay}, effectiveTotalItems=${effectiveTotalItems}, adjustedPercent=${adjustedPercent}%`);
          } else if (effectiveTotalItems > 0 && startIndex >= 0) {
            // Para outros casos: calcular normalmente
            const scriptsRange = effectiveTotalItems - startIndex;
            if (scriptsRange > 0) {
              const payloadCurrent = payload.current || Math.round((percent / 100) * (payload.total || scriptsRange));
              currentItemDisplay = startIndex + payloadCurrent;
              adjustedPercent = Math.round((currentItemDisplay / effectiveTotalItems) * 100);
              displayTotal = effectiveTotalItems;
            }
          } else {
            // Se não tem effectiveTotalItems, usar o total do payload (comportamento padrão)
            displayTotal = payload.total;
            currentItemDisplay = payload.current;
          }
          
          // Atualizar progresso - SEMPRE usar totalItems completo quando passado
          updateOptimizeOverlay(adjustedPercent, payload.status === 'Executando...' ? `Executando: ${scriptName}...${currentItemDisplay !== undefined && displayTotal !== undefined ? ` (${currentItemDisplay}/${displayTotal})` : ''}` : 'Aguarde, a otimização está em andamento...');
          
          // Processar diferentes tipos de eventos
          if (payload.type === 'executing') {
            // Adicionar entrada como "Executando..."
            addOptimizationLogEntry(scriptName, 'executing');
          } else if (payload.type === 'success') {
            // Atualizar entrada para "Pronto! ✓"
            updateOptimizationLogEntry(scriptName, 'success', 'Pronto! ✓');
            optimizationResults.applied++;
            
            // Atualizar porcentagem de otimização em tempo real após cada script executado
            try {
              const scoreResult = await window.y20?.calculateOptimizationScore?.();
              if (scoreResult !== undefined) {
                setGaugeValue(scoreResult);
                console.log('[Optimization] Porcentagem atualizada (tempo real) após', scriptName, ':', scoreResult);
              }
            } catch (scoreError) {
              console.warn('[Optimization] Erro ao atualizar porcentagem em tempo real:', scoreError);
            }
          } else if (payload.type === 'admin_required') {
            // Atualizar entrada para mostrar que precisa admin
            updateOptimizationLogEntry(scriptName, 'admin_required', 'Pronto! ✓');
            optimizationResults.skipped++;
            optimizationResults.requiresAdmin.push(scriptName);
            
            // Mostrar aviso de admin se ainda não estiver visível
            if (optimizeTips && optimizeTips.hidden) {
              await showOptimizationAdminWarning(optimizationResults.requiresAdmin.length);
            }
          } else if (payload.type === 'paused') {
            // Mostrar modal de confirmação de cancelamento
            if (optimizeCancelButton) {
              optimizeCancelButton.disabled = false;
              optimizeCancelButton.textContent = 'Cancelar';
            }
            showCancelConfirmationModal();
            return;
          } else if (payload.type === 'cancelled') {
            // Fechar overlay ao cancelar de vez
            hideCancelConfirmationModal();
            if (!keepOverlayOpen) {
              hideOptimizeOverlay();
            }
            return;
          } else if (payload.type === 'error') {
            // Atualizar entrada para "Erro"
            updateOptimizationLogEntry(scriptName, 'error', 'Erro');
            optimizationResults.failed++;
          } else if (payload.type === 'completed' || payload.type === 'finish') {
            // Otimização concluída - NÃO resetar porcentagem se keepOverlayOpen é true
            // Se keepOverlayOpen é true, manter progresso e continuar (otimização forçada vem depois)
            if (!keepOverlayOpen) {
              optimizationResults = payload.results || optimizationResults;
              const isVip = folderName === 'Otimização Vip' || folderName.includes('Vip');
              showOptimizationSummary(optimizationResults, isVip);
            } else {
              // Se está mantendo aberto (VIP), mostrar progresso correto baseado no effectiveTotalItems completo
              const effectiveTotalItems = effectiveTotalItemsForListener || totalItems;
              if (effectiveTotalItems > 0 && startIndex >= 0) {
                const scriptsRange = effectiveTotalItems - startIndex; // Quantidade de scripts .bat
                if (scriptsRange > 0) {
                  // Quando scripts .bat terminam, mostrar porcentagem baseada no que foi executado
                  // startIndex + scriptsRange = total de scripts .bat executados
                  const scriptsExecuted = startIndex + scriptsRange;
                  const scriptsPercent = Math.round((scriptsExecuted / effectiveTotalItems) * 100);
                  // Não limitar a 95% - mostrar o progresso real baseado no effectiveTotalItems completo
                  updateOptimizeOverlay(scriptsPercent, `Scripts .bat concluídos (${scriptsExecuted}/${effectiveTotalItems}). Continuando com otimizações forçadas...`);
                }
              }
            }
            return;
          }
        }
      });
    }

    const result = await window.y20.optimizationPackRun(folderName);
    
    console.log('[OptimizationPack] Resultado recebido:', result);
    
    // ATUALIZAR PORCENTAGEM IMEDIATAMENTE se a otimização foi bem-sucedida
    if (result?.success && result?.optimizationScore !== undefined) {
      setGaugeValue(result.optimizationScore);
      console.log('[OptimizationPack] Porcentagem atualizada IMEDIATAMENTE para:', result.optimizationScore);
    }
    
    // Se result.success é false, verificar o motivo antes de continuar
    if (!result?.success) {
      console.error('[OptimizationPack] Otimização falhou:', result?.message);
      
      // Verificar se o erro é relacionado a API/database (não deve bloquear a otimização)
      const isApiError = result?.message && (
        result.message.includes('API') || 
        result.message.includes('database') || 
        result.message.includes('D1_ERROR') ||
        result.message.includes('SQLITE_ERROR') ||
        result.message.includes('no such table')
      );
      
      // Se foi bloqueado por segurança, mostrar mensagem e fechar overlay
      if (result?.securityBlocked) {
        showToast(result?.message || 'Acesso negado. Esta funcionalidade requer uma key Básica ou VIP válida e ativa.', 'error');
        if (!keepOverlayOpen) {
          hideOptimizeOverlay();
        }
        return result;
      }
      
      // Se é erro de API/database, avisar mas não bloquear (a otimização pode ter sido executada)
      if (isApiError) {
        console.warn('[OptimizationPack] Erro de API/database detectado, mas otimização pode ter sido executada:', result?.message);
        showToast('Otimização executada, mas houve um problema ao salvar no servidor. A otimização local foi aplicada.', 'warning');
        // Continuar como se tivesse sucesso, pois a otimização foi executada
        // Forçar result.success = true para continuar o fluxo normal
        result.success = true;
        result.apiError = true; // Marcar que houve erro de API mas otimização foi executada
      } else {
        // Outros erros: mostrar mensagem e fechar overlay
        showToast(result?.message || 'Erro ao executar otimização', 'error');
        if (!keepOverlayOpen) {
          hideOptimizeOverlay();
        }
        return result;
      }
    }
    
    // Se keepOverlayOpen é true, retornar o número de scripts executados para continuar o progresso
    let scriptsExecutedCount = 0;
    if (result?.success && result.applied !== undefined) {
      scriptsExecutedCount = result.applied || 0;
    } else if (result?.scripts && Array.isArray(result.scripts)) {
      scriptsExecutedCount = result.scripts.length;
    }
    
    // Se result.success é true (incluindo quando forçamos para true após erro de API)
    if (result?.success) {
      // Se keepOverlayOpen é true, não mostrar resumo ainda (otimização forçada vem depois)
      if (!keepOverlayOpen) {
        // O evento 'completed' já foi enviado pelo runScriptsSequentially
        // Mas garantir que o resumo seja mostrado
        if (!optimizationSummary || optimizationSummary.hidden) {
          showOptimizationSummary(result, result.showNucleos);
        }
      } else {
        // Se está mantendo aberto, atualizar progresso para refletir scripts .bat concluídos
        // mas não resetar - continuar acumulando
        const effectiveTotalItems = effectiveTotalItemsForListener || totalItems;
        if (effectiveTotalItems > 0 && startIndex >= 0) {
          const newCurrentItem = startIndex + scriptsExecutedCount;
          const scriptsPercent = Math.round((newCurrentItem / effectiveTotalItems) * 100);
          // Mostrar progresso real baseado no effectiveTotalItems completo (não limitar a 95%)
          updateOptimizeOverlay(scriptsPercent, `Scripts .bat concluídos (${newCurrentItem}/${effectiveTotalItems}). Continuando com otimizações forçadas...`);
        }
      }
      
      // Mostrar aviso se houver scripts que precisam de admin
      if (result.requiresAdmin && result.requiresAdmin.length > 0) {
        await showOptimizationAdminWarning(result.requiresAdmin.length);
      }
      
      // Atualizar score de otimização IMEDIATAMENTE se disponível
      if (result.optimizationScore !== undefined) {
        setGaugeValue(result.optimizationScore);
        console.log('[OptimizationPack] Porcentagem atualizada IMEDIATAMENTE (do resultado) para:', result.optimizationScore);
      } else {
        // Se não veio no resultado, buscar do backend IMEDIATAMENTE
        try {
          const scoreResult = await window.y20?.calculateOptimizationScore?.();
          if (scoreResult !== undefined) {
            setGaugeValue(scoreResult);
            console.log('[OptimizationPack] Porcentagem atualizada IMEDIATAMENTE (busca backend) para:', scoreResult);
          }
        } catch (scoreError) {
          console.warn('[OptimizationPack] Erro ao buscar score após otimização:', scoreError);
        }
      }
      
      // Garantir que as informações do usuário permaneçam visíveis após otimização
      // Verificar se o usuário tem key ativa e manter o user-card visível
      try {
        const authResult = await window.y20.isAuthenticated();
        if (authResult && authResult.authenticated && authResult.valid && authResult.keyData) {
          const accessLevel = getAccessLevelFromKey(authResult.keyData);
          updateAccessLevelUI(accessLevel);
          
          // Garantir que user-card está visível e activate-key-card está escondido
          const userCard = document.getElementById('user-card');
          const activateKeyCardTop = document.getElementById('activate-key-card-top');
          if (userCard && activateKeyCardTop) {
            userCard.style.display = 'block';
            activateKeyCardTop.style.display = 'none';
          }
        }
      } catch (authError) {
        console.warn('[Optimization] Erro ao verificar autenticação após otimização:', authError);
      }
      
      // Se keepOverlayOpen = true, não fecha o overlay (para continuar com otimizações forçadas)
      // Retornar resultado para que quem chamou possa usar (especialmente para VIP)
      return result;
    } else {
      // Se result.success é false, verificar se foi bloqueado por segurança
      if (result?.securityBlocked) {
        showToast(result?.message || 'Acesso negado. Esta funcionalidade requer uma key Básica ou VIP válida e ativa.', 'error');
      } else {
        showToast(result?.message || 'Erro ao executar otimização', 'error');
      }
      if (!keepOverlayOpen) {
        hideOptimizeOverlay();
      }
      return result;
    }
    
    await refreshSystemInfo();
  } catch (error) {
    console.error('[OptimizationPack] Erro:', error);
    showToast(error.message || 'Falha ao executar otimização.', 'error');
    if (!keepOverlayOpen) {
      hideOptimizeOverlay();
    }
    return { success: false, message: error.message };
  } finally {
    if (!keepOverlayOpen) {
      optimizeButtonState(false);
    }
  }
}

function addOptimizationLogEntry(scriptName, status = 'executing') {
  if (!optimizeResults) return;
  
  // IMPORTANTE: Se estamos adicionando um novo script como "Executando...", 
  // garantir que qualquer script anterior marcado como "Executando..." seja marcado como concluído
  if (status === 'executing') {
    const allEntries = optimizeResults.querySelectorAll('li.optimize-log-entry');
    allEntries.forEach(entry => {
      const statusSpan = entry.querySelector('.log-status');
      if (statusSpan && statusSpan.textContent === 'Executando...') {
        // Se este não é o script atual, marcar como concluído (pode ter sido perdido o evento de sucesso)
        const entryScriptName = entry.getAttribute('data-script');
        if (entryScriptName !== scriptName) {
          statusSpan.textContent = 'Pronto! ✓';
          statusSpan.className = 'log-status success';
          entry.className = 'optimize-log-entry success';
          console.log(`[Optimization] Marcando script anterior como concluído: ${entryScriptName}`);
        }
      }
    });
  }
  
  // IMPORTANTE: Verificar se já existe uma entrada para este script
  // Se existir, atualizar em vez de criar uma nova (evita múltiplas entradas "Executando...")
  const existingEntry = optimizeResults.querySelector(`li[data-script="${scriptName}"]`);
  if (existingEntry) {
    // Se já existe, atualizar o status
    updateOptimizationLogEntry(scriptName, status, status === 'executing' ? 'Executando...' : 
                                                      status === 'success' ? 'Pronto! ✓' : 
                                                      status === 'admin_required' ? 'Pronto! ⚠' : 
                                                      status === 'error' ? 'Erro' : 'Executando...');
    return;
  }
  
  // Se não existe, criar nova entrada
  const li = document.createElement('li');
  li.className = `optimize-log-entry ${status}`;
  li.setAttribute('data-script', scriptName);
  
  const labelSpan = document.createElement('span');
  labelSpan.className = 'log-label';
  labelSpan.textContent = scriptName;
  
  const statusSpan = document.createElement('span');
  statusSpan.className = 'log-status';
  
  if (status === 'executing') {
    statusSpan.textContent = 'Executando...';
    statusSpan.className += ' executing';
  } else if (status === 'success') {
    statusSpan.textContent = 'Pronto! ✓';
    statusSpan.className += ' success';
  } else if (status === 'admin_required') {
    statusSpan.textContent = 'Pronto! ⚠';
    statusSpan.className += ' success';
    li.setAttribute('data-admin-required', 'true');
    li.title = 'Este script requer privilégios de administrador';
  } else if (status === 'error') {
    statusSpan.textContent = 'Erro';
    statusSpan.className += ' error';
  }
  
  li.appendChild(labelSpan);
  li.appendChild(statusSpan);
  optimizeResults.appendChild(li);
  
  // Auto-scroll para o último item
  optimizeResults.scrollTop = optimizeResults.scrollHeight;
}

function updateOptimizationLogEntry(scriptName, status, statusText) {
  if (!optimizeResults) return;
  
  const entry = optimizeResults.querySelector(`li[data-script="${scriptName}"]`);
  if (entry) {
    entry.className = `optimize-log-entry ${status}`;
    const statusSpan = entry.querySelector('.log-status');
    if (statusSpan) {
      statusSpan.textContent = statusText;
      statusSpan.className = `log-status ${status}`;
    }
    
    if (status === 'admin_required') {
      entry.setAttribute('data-admin-required', 'true');
      entry.title = 'Este script requer privilégios de administrador';
      if (statusText === 'Pronto! ✓') {
        // Se está usando o status padrão, mudar para ⚠ para indicar aviso
        statusSpan.textContent = 'Pronto! ⚠';
      }
    }
  }
}

function showCancelConfirmationModal() {
  if (!cancelConfirmModal || !cancelConfirmExecuted) return;
  
  // Coletar o que foi executado até agora
  const executedItems = [];
  if (optimizeResults) {
    const entries = optimizeResults.querySelectorAll('li.optimize-log-entry');
    entries.forEach(entry => {
      const scriptName = entry.getAttribute('data-script') || entry.querySelector('.log-label')?.textContent || 'Script';
      const statusSpan = entry.querySelector('.log-status');
      const status = statusSpan?.textContent || 'Executando...';
      
      if (status.includes('Pronto') || status.includes('✓')) {
        executedItems.push(`✓ ${scriptName}`);
      } else if (status === 'Executando...') {
        executedItems.push(`⏳ ${scriptName} (em execução)`);
      } else if (status === 'Erro') {
        executedItems.push(`❌ ${scriptName} (erro)`);
      }
    });
  }
  
  // Atualizar lista de executados
  if (cancelConfirmExecuted) {
    if (executedItems.length > 0) {
      cancelConfirmExecuted.innerHTML = executedItems.map(item => `<div>${item}</div>`).join('');
    } else {
      cancelConfirmExecuted.innerHTML = '<div style="color: #888;">Nenhum script executado ainda.</div>';
    }
  }
  
  // Mostrar modal
  cancelConfirmModal.hidden = false;
}

function hideCancelConfirmationModal() {
  if (cancelConfirmModal) {
    cancelConfirmModal.hidden = true;
  }
}

// Executar otimizações forçadas para VIP (exceto processos, extras, modos, monitoramento, energia, rede)
async function executeVipForcedOptimizations(startIndex = 0, totalItems = 0) {
  if (!advancedOptimizationsData) return;
  
  // Excluir categorias: processos, extras, modos, monitoramento, energia, rede
  const excludedCategories = ['processos', 'extras', 'modos', 'monitoramento', 'energia', 'rede'];
  const excludedKeys = ['processos.encerrar_background'];
  
  const optimizationsToExecute = [];
  
  // Coletar todas as otimizações forçadas (exceto as excluídas)
  Object.keys(advancedOptimizationsData).forEach(category => {
    if (excludedCategories.includes(category)) return;
    
    advancedOptimizationsData[category].forEach(item => {
      if (!excludedKeys.includes(item.key)) {
        optimizationsToExecute.push(item.key);
      }
    });
  });
  
  // Se totalItems não foi passado, calcular
  if (totalItems === 0) {
    let scriptsCount = 0;
    if (!powerPlanState.loaded) await loadPowerPlanActions(true);
    if (!cleanupWindowsState.loaded) await loadCleanupWindowsActions(true);
    if (!disableWindowsState.loaded) await loadDisableWindowsActions(true);
    if (!importantScriptsState.loaded) await loadImportantScripts(true);
    
    if (powerPlanState.apply) scriptsCount += powerPlanState.apply.length;
    if (cleanupWindowsState.apply) scriptsCount += cleanupWindowsState.apply.length;
    if (disableWindowsState.apply) scriptsCount += disableWindowsState.apply.length;
    if (importantScriptsState.items) scriptsCount += importantScriptsState.items.length;
    
    totalItems = optimizationsToExecute.length + scriptsCount;
  }
  
  // Carregar configurações existentes da API uma única vez
  let currentConfig = {};
  try {
    const loadResult = await cloudflareApiRequest('GET', '/api/optimizations/get');
    if (loadResult.success && loadResult.data) {
      currentConfig = loadResult.data;
    }
  } catch (err) {
    console.warn('[VIP] Erro ao carregar estado de otimizações forçadas da API (continuando mesmo assim):', err);
  }
  
  // Executar otimizações forçadas
  // IMPORTANTE: startIndex já inclui RAM Booster (1) + scripts .bat executados
  // Então começamos a contar as otimizações forçadas a partir de startIndex
  // startIndex = número de itens já executados (RAM Booster + scripts .bat)
  for (let i = 0; i < optimizationsToExecute.length; i++) {
    const optKey = optimizationsToExecute[i];
    try {
      // Calcular currentItem corretamente: startIndex (já executado) + i (índice atual) + 1 (este item)
      // Exemplo: se startIndex = 124 (124 itens já executados), então:
      // - i=0: currentItem = 124 + 0 + 1 = 125 (primeira otimização forçada)
      // - i=1: currentItem = 124 + 1 + 1 = 126 (segunda otimização forçada)
      const currentItem = startIndex + i + 1;
      const optName = getOptimizationName(optKey);
      // Calcular porcentagem considerando que já passamos dos scripts .bat
      // Não zerar, continuar acumulando a partir do startIndex
      const percent = totalItems > 0 ? Math.min(100, Math.round((currentItem / totalItems) * 100)) : 0;
      
      // DEBUG: Log para verificar cálculo
      console.log(`[VIP Forced] Item ${i+1}/${optimizationsToExecute.length}: currentItem=${currentItem}, totalItems=${totalItems}, percent=${percent}%`);
      
      updateOptimizeOverlay(
        percent,
        `Aplicando: ${optName}${totalItems > 0 ? ` (${currentItem}/${totalItems})` : ''}`
      );
      addOptimizationLogEntry(optName, 'executing');
      
      const result = await window.y20?.applyOptimization?.(optKey);
      
      if (result && (result.success !== false)) {
        updateOptimizationLogEntry(optName, 'success', 'Pronto! ✓');
        // Marcar visualmente o card como aplicado (borda verde)
        if (typeof updateForcedOptimizationCardState === 'function') {
          updateForcedOptimizationCardState(optKey, true);
        }
        // Atualizar configuração local para salvar depois na API
        currentConfig[optKey] = true;
        
        // Atualizar porcentagem de otimização em tempo real após cada otimização forçada aplicada
        // Para VIP, aumentar incrementalmente: dividir o aumento total pelo número de otimizações forçadas
        try {
          // Calcular aumento incremental baseado no progresso
          // Se for VIP e ainda não aumentou, aumentar um pouco a cada otimização
          const accessLevel = await window.y20?.getCurrentAccessLevel?.();
          if (accessLevel === 'vip') {
            // Aumentar incrementalmente: ~0.1% a cada otimização forçada (simula progresso)
            const currentScore = await window.y20?.calculateOptimizationScore?.();
            if (currentScore !== undefined && currentScore < 94) {
              // Aumentar pequena quantidade para simular progresso incremental
              const incrementalIncrease = 0.1; // 0.1% por otimização forçada
              const newScore = Math.min(94, currentScore + incrementalIncrease);
              // Atualizar no backend (precisa de um método para isso, ou fazer via store)
              // Por enquanto, apenas atualizar visualmente
              setGaugeValue(newScore);
              console.log('[Optimization] Porcentagem atualizada (incremental) após', optName, ':', currentScore, '->', newScore);
            }
          } else {
            // Para outros níveis, apenas buscar o score atual
            const scoreResult = await window.y20?.calculateOptimizationScore?.();
            if (scoreResult !== undefined) {
              setGaugeValue(scoreResult);
              console.log('[Optimization] Porcentagem atualizada (tempo real) após', optName, ':', scoreResult);
            }
          }
        } catch (scoreError) {
          console.warn('[Optimization] Erro ao atualizar porcentagem em tempo real:', scoreError);
        }
      } else {
        updateOptimizationLogEntry(optName, 'error', 'Erro');
      }
    } catch (err) {
      console.error(`[VIP] Erro ao aplicar ${optKey}:`, err);
      const optName = getOptimizationName(optKey);
      updateOptimizationLogEntry(optName, 'error', 'Erro');
    }
  }
  
  // Salvar estado das otimizações aplicadas na API em uma única chamada
  try {
    const saveResult = await cloudflareApiRequest('POST', '/api/optimizations/save', currentConfig);
    if (!saveResult.success) {
      console.warn('[VIP] Erro ao salvar estado de otimizações forçadas na API:', saveResult.error);
    } else {
      console.log('[VIP] Estado de otimizações forçadas salvo na API após Otimizar VIP');
    }
  } catch (err) {
    console.warn('[VIP] Erro ao salvar estado de otimizações forçadas na API (pós-VIP):', err);
  }
  
  // Atualizar progresso final para 100% quando todas as otimizações forçadas terminarem
  if (totalItems > 0 && startIndex >= 0) {
    const finalItem = startIndex + optimizationsToExecute.length;
    const finalPercent = Math.min(100, Math.round((finalItem / totalItems) * 100));
    updateOptimizeOverlay(finalPercent, `Otimizações forçadas concluídas (${finalItem}/${totalItems})`);
    console.log(`[VIP Forced] Finalizado: ${finalItem}/${totalItems} (${finalPercent}%)`);
  }
  
  // NÃO executar scripts .bat aqui, pois já foram executados no runOptimizationPack
  // Os scripts .bat são executados dentro do pacote VIP
}

// Carregar e executar scripts .bat para VIP
async function loadAndExecuteVipScripts(startIndex = 0, totalItems = 0) {
  const scriptsToExecute = [];
  
  // Coletar todos os scripts
  if (powerPlanState.apply && powerPlanState.apply.length > 0) {
    powerPlanState.apply.forEach(entry => {
      scriptsToExecute.push({ type: 'powerplan', id: entry.id, name: entry.name || entry.path });
    });
  }
  if (cleanupWindowsState.apply && cleanupWindowsState.apply.length > 0) {
    cleanupWindowsState.apply.forEach(entry => {
      scriptsToExecute.push({ type: 'cleanup', id: entry.id, name: entry.name || entry.path });
    });
  }
  if (disableWindowsState.apply && disableWindowsState.apply.length > 0) {
    disableWindowsState.apply.forEach(entry => {
      scriptsToExecute.push({ type: 'disable', id: entry.id, name: entry.name || entry.path });
    });
  }
  if (importantScriptsState.items && importantScriptsState.items.length > 0) {
    importantScriptsState.items.forEach(entry => {
      scriptsToExecute.push({ type: 'important', id: entry.id || entry.name, name: entry.name || entry.path });
    });
  }
  
  // Executar scripts
  for (let i = 0; i < scriptsToExecute.length; i++) {
    const script = scriptsToExecute[i];
    try {
      const currentItem = startIndex + i + 1;
      updateOptimizeOverlay(
        totalItems > 0 ? Math.round((currentItem / totalItems) * 100) : Math.round(((i + 1) / scriptsToExecute.length) * 100),
        `Executando: ${script.name}${totalItems > 0 ? ` (${currentItem}/${totalItems})` : ''}`
      );
      addOptimizationLogEntry(script.name, 'executing');
      
      let result = null;
      if (script.type === 'powerplan') {
        result = await window.y20?.powerPlanRun?.(script.id);
      } else if (script.type === 'cleanup') {
        result = await window.y20?.cleanupWindowsRun?.(script.id);
      } else if (script.type === 'disable') {
        result = await window.y20?.disableWindowsRun?.(script.id);
      } else if (script.type === 'important') {
        result = await window.y20?.optimizationPackRunOne?.(script.id);
      }
      
      if (result && (result.success !== false)) {
        updateOptimizationLogEntry(script.name, 'success', 'Pronto! ✓');
      } else {
        updateOptimizationLogEntry(script.name, 'error', 'Erro');
      }
    } catch (err) {
      console.error(`[VIP] Erro ao executar script ${script.name}:`, err);
      updateOptimizationLogEntry(script.name, 'error', 'Erro');
    }
  }
}

// Mostrar modal de serviços após otimização
// Estado do modal de serviços
let servicesList = [];
let servicesStatus = {}; // Status de cada serviço no Windows
let servicesActivationState = {
  loading: false,
  executing: false,
  results: {},
  cancelled: false
};
let servicesActivationCancelRequested = false; // Variável global para controle de cancelamento

// Lista de serviços do Windows que o script gerencia (extraído do ServicesActivator.ps1)
// Com DisplayName para melhor identificação
const WINDOWS_SERVICES = [
  { name: 'PcaSvc', displayName: 'Program Compatibility Assistant Service' },
  { name: 'PlugPlay', displayName: 'Plug and Play' },
  { name: 'DPS', displayName: 'Diagnostic Policy Service' },
  { name: 'DiagTrack', displayName: 'Connected User Experiences and Telemetry' },
  { name: 'SysMain', displayName: 'SysMain' },
  { name: 'Sysmon', displayName: 'System Monitor' }
];

// Modal de confirmação antes de ativar serviços
function showServicesActivationConfirmation() {
  return new Promise((resolve) => {
    // Criar modal de confirmação dinamicamente
    const existingModal = document.getElementById('services-activation-confirmation-modal');
    if (existingModal) {
      existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'services-activation-confirmation-modal';
    modal.className = 'vip-modal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: flex; align-items: center; justify-content: center; z-index: 10000;';
    
    modal.innerHTML = `
      <div class="vip-dialog" style="max-width: 450px; padding: 24px; background: var(--bg-secondary); border-radius: 12px; border: 2px solid rgba(112, 88, 255, 0.3);">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 48px; margin-bottom: 12px;">🔧</div>
          <h2 style="margin: 0; color: var(--accent); font-size: 20px; font-weight: 600;">Ativar Serviços do Windows?</h2>
        </div>
        <p style="color: var(--text-secondary); font-size: 14px; line-height: 1.6; margin: 0 0 24px 0; text-align: center;">
          Deseja ativar os serviços do Windows agora? Isso é importante para evitar W.O em (ORGS) e melhorar o desempenho do sistema.
        </p>
        <div style="display: flex; gap: 12px;">
          <button id="services-confirmation-cancel" class="ghost" style="flex: 1; padding: 12px; font-size: 14px; background: rgba(239, 68, 68, 0.1); border: 2px solid rgba(239, 68, 68, 0.3); color: #ef4444; border-radius: 8px; cursor: pointer; font-weight: 600;">
            ❌ Não
          </button>
          <button id="services-confirmation-confirm" class="primary" style="flex: 1; padding: 12px; font-size: 14px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none; color: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
            ✅ Sim, Ativar
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const cancelBtn = document.getElementById('services-confirmation-cancel');
    const confirmBtn = document.getElementById('services-confirmation-confirm');
    
    const closeModal = (result) => {
      modal.remove();
      resolve(result);
    };
    
    cancelBtn.addEventListener('click', () => closeModal(false));
    confirmBtn.addEventListener('click', () => closeModal(true));
    
    // Fechar ao clicar fora do modal
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(false);
      }
    });
  });
}

async function showServicesActivationModal() {
  const modal = document.getElementById('services-activation-modal');
  if (!modal) return;
  
  // Resetar estado
  servicesActivationState = {
    loading: false,
    executing: true,
    results: {},
    cancelled: false
  };
  servicesActivationCancelRequested = false;
  
  modal.hidden = false;
  modal.style.display = 'flex';
  
  // Inicializar lista de serviços conhecidos
  const servicesList = [
    { name: 'PcaSvc', displayName: 'Program Compatibility Assistant Service' },
    { name: 'PlugPlay', displayName: 'Plug and Play' },
    { name: 'DPS', displayName: 'Diagnostic Policy Service' },
    { name: 'DiagTrack', displayName: 'Connected User Experiences and Telemetry' },
    { name: 'SysMain', displayName: 'SysMain' },
    { name: 'Sysmon', displayName: 'System Monitor' }
  ];
  
  // Estado dos serviços - todos começam como "verificando"
  const servicesState = {};
  servicesList.forEach(svc => {
    servicesState[svc.name] = { status: 'verifying', displayName: svc.displayName };
  });
  
  // Mostrar mensagem inicial de "Ativando, aguarde..."
  const container = document.getElementById('services-list-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
        <div class="loading-spinner" style="font-size: 48px; margin-bottom: 16px; animation: spin 1s linear infinite;">🔄</div>
        <p style="margin: 0; font-size: 16px; font-weight: 600; color: var(--accent);">Ativando serviços...</p>
        <p style="margin: 8px 0 0 0; font-size: 14px; color: var(--text-secondary);">Aguarde, estamos verificando e ativando os serviços do Windows</p>
      </div>
    `;
  }
  
  renderServicesList();
  
  // Encontrar arquivo .exe ou .bat na pasta
  try {
    if (!window.y20 || !window.y20.optimizationPackList) {
      showErrorInModal('Função de listar arquivos não disponível');
      return;
    }
    
    const result = await window.y20.optimizationPackList('Ativar Serviços');
    if (!result || !result.success || !result.scripts || result.scripts.length === 0) {
      showErrorInModal('Nenhum arquivo encontrado na pasta "Ativar Serviços"');
      return;
    }
    
    // Procurar por .exe primeiro, depois .bat
    let scriptToExecute = null;
    for (const script of result.scripts) {
      const ext = script.path ? script.path.split('.').pop().toLowerCase() : '';
      if (ext === 'exe') {
        scriptToExecute = script;
        break;
      } else if (ext === 'bat' && !scriptToExecute) {
        scriptToExecute = script;
      }
    }
    
    if (!scriptToExecute) {
      showErrorInModal('Nenhum arquivo .exe ou .bat encontrado');
      return;
    }
    
    // Configurar listener para saída em tempo real
    if (window.y20.onServicesActivationOutput) {
      window.y20.onServicesActivationOutput((payload) => {
        if (servicesActivationCancelRequested) return;
        
        if (payload.type === 'stdout' || payload.type === 'stderr') {
          const line = payload.line.toLowerCase();
          
          // Detectar serviços sendo ativados
          servicesList.forEach(svc => {
            const svcName = svc.name.toLowerCase();
            const svcDisplay = svc.displayName.toLowerCase();
            
            // Verificar se a linha menciona o serviço
            if (line.includes(svcName) || line.includes(svcDisplay)) {
              if (line.includes('ativado') || line.includes('ativado') || line.includes('sucesso') || line.includes('success') || line.includes('running')) {
                servicesState[svc.name].status = 'success';
              } else if (line.includes('erro') || line.includes('error') || line.includes('falha') || line.includes('failed')) {
                servicesState[svc.name].status = 'error';
              } else if (line.includes('ativando') || line.includes('criando') || line.includes('configurando') || line.includes('creating') || line.includes('configuring')) {
                servicesState[svc.name].status = 'executing';
              }
            }
          });
          
          // Atualizar renderização
          renderServicesList();
        } else if (payload.type === 'done') {
          // Marcar todos os pendentes como concluídos
          Object.keys(servicesState).forEach(key => {
            if (servicesState[key].status === 'pending' || servicesState[key].status === 'executing') {
              servicesState[key].status = payload.code === 0 ? 'success' : 'error';
            }
          });
          renderServicesList();
          servicesActivationState.executing = false;
        }
      });
    }
    
    function renderServicesList() {
      const container = document.getElementById('services-list-container');
      if (!container) return;
      
      const allProcessed = Object.values(servicesState).every(s => s.status !== 'verifying' && s.status !== 'executing');
      
      container.innerHTML = servicesList.map(svc => {
        const state = servicesState[svc.name];
        let icon = '⏳';
        let statusText = 'Verificando...';
        let bgColor = 'rgba(112, 88, 255, 0.1)';
        let borderColor = 'rgba(112, 88, 255, 0.3)';
        let textColor = 'var(--text-secondary)';
        
        if (state.status === 'verifying') {
          icon = '<span class="loading-spinner" style="display: inline-block; animation: spin 1s linear infinite;">🔄</span>';
          statusText = 'Verificando...';
          bgColor = 'rgba(112, 88, 255, 0.15)';
          borderColor = 'rgba(112, 88, 255, 0.4)';
          textColor = 'var(--text-primary)';
        } else if (state.status === 'executing') {
          icon = '<span class="loading-spinner" style="display: inline-block; animation: spin 1s linear infinite;">🔄</span>';
          statusText = 'Ativando, aguarde...';
          bgColor = 'rgba(59, 130, 246, 0.15)';
          borderColor = 'rgba(59, 130, 246, 0.4)';
          textColor = 'var(--text-primary)';
        } else if (state.status === 'success') {
          icon = '✅';
          statusText = 'Ativado';
          bgColor = 'rgba(16, 185, 129, 0.15)';
          borderColor = 'rgba(16, 185, 129, 0.4)';
          textColor = '#10b981';
        } else if (state.status === 'error') {
          icon = '⚠️';
          statusText = 'Erro ao ativar';
          bgColor = 'rgba(239, 68, 68, 0.15)';
          borderColor = 'rgba(239, 68, 68, 0.4)';
          textColor = '#ef4444';
        }
        
        return `
          <div style="
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            background: ${bgColor};
            border: 2px solid ${borderColor};
            border-radius: 10px;
            transition: all 0.3s ease;
          ">
            <span style="font-size: 24px; min-width: 32px; text-align: center;">${icon}</span>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 4px;">
              <span style="color: ${textColor}; font-weight: 600; font-size: 14px;">${svc.displayName}</span>
              <span style="color: var(--text-secondary); font-size: 12px; opacity: 0.7;">${svc.name}</span>
            </div>
            <span style="
              color: ${textColor};
              font-weight: 500;
              font-size: 12px;
              padding: 4px 12px;
              background: ${bgColor};
              border-radius: 6px;
              white-space: nowrap;
            ">${statusText}</span>
          </div>
        `;
      }).join('');
      
      // Adicionar mensagem final se tudo foi processado
      if (allProcessed) {
        const successCount = Object.values(servicesState).filter(s => s.status === 'success').length;
        const errorCount = Object.values(servicesState).filter(s => s.status === 'error').length;
        
        const summary = document.createElement('div');
        summary.style.cssText = `
          margin-top: 16px;
          padding: 16px;
          background: ${errorCount === 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)'};
          border: 2px solid ${errorCount === 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'};
          border-radius: 10px;
          text-align: center;
        `;
        summary.innerHTML = `
          <div style="font-size: 18px; margin-bottom: 8px;">
            ${errorCount === 0 ? '✅' : '⚠️'}
          </div>
          <div style="color: ${errorCount === 0 ? '#10b981' : '#f59e0b'}; font-weight: 600; font-size: 14px; margin-bottom: 4px;">
            ${errorCount === 0 ? 'Todos os serviços foram ativados!' : `${successCount} ativados, ${errorCount} com erro`}
          </div>
          ${errorCount > 0 ? `
            <div style="color: #ef4444; font-size: 12px; margin-top: 8px; padding: 8px; background: rgba(239, 68, 68, 0.1); border-radius: 6px;">
              ⚠️ Alguns serviços não puderam ser ativados. Verifique as permissões de administrador.
            </div>
          ` : ''}
        `;
        container.appendChild(summary);
      }
    }
    
    // Executar o script
    if (window.y20.executeServicesActivation) {
      const executionResult = await window.y20.executeServicesActivation(scriptToExecute.path);
      
      if (servicesActivationCancelRequested) {
        const outputContainer = document.getElementById('services-output-content');
        if (outputContainer) {
          const line = document.createElement('div');
          line.style.color = '#f59e0b';
          line.style.marginTop = '12px';
          line.style.fontWeight = '600';
          line.textContent = '⚠️ Ativação cancelada pelo usuário';
          outputContainer.appendChild(line);
        }
        servicesActivationState.executing = false;
        return;
      }
      
      if (executionResult && executionResult.success) {
        const outputContainer = document.getElementById('services-output-content');
        if (outputContainer) {
          const line = document.createElement('div');
          line.style.color = '#10b981';
          line.style.marginTop = '12px';
          line.style.fontWeight = '600';
          line.style.fontSize = '14px';
          line.textContent = '✅ Todos os serviços foram ativados com sucesso!';
          outputContainer.appendChild(line);
        }
      } else {
        const outputContainer = document.getElementById('services-output-content');
        if (outputContainer) {
          const line = document.createElement('div');
          line.style.color = '#ef4444';
          line.style.marginTop = '12px';
          line.style.fontWeight = '600';
          line.textContent = `❌ Erro: ${executionResult?.message || 'Erro desconhecido'}`;
          outputContainer.appendChild(line);
        }
      }
      
      servicesActivationState.executing = false;
    } else {
      showErrorInModal('Função de executar scripts não disponível');
    }
  } catch (error) {
    console.error('[Services] Erro ao executar ativação:', error);
    showErrorInModal('Erro ao executar ativação: ' + error.message);
    servicesActivationState.executing = false;
  }
}

async function checkWindowsServicesStatus() {
  try {
    // Tentar usar o handler IPC primeiro
    if (window.y20 && window.y20.checkServicesStatus) {
      try {
        const serviceNames = WINDOWS_SERVICES.map(s => s.name);
        const statusResult = await window.y20.checkServicesStatus(serviceNames);
        if (statusResult && statusResult.success && statusResult.services) {
          servicesStatus = statusResult.services;
          console.log('[Services] Status dos serviços verificados via IPC:', servicesStatus);
          return; // Sucesso, sair
        }
      } catch (ipcError) {
        console.warn('[Services] Erro ao usar handler IPC, tentando método alternativo...', ipcError);
      }
    }
    
    // Fallback: usar PowerShell diretamente via runPowerShell ou executeSystemCommand
    if (window.y20) {
      try {
        const serviceNames = WINDOWS_SERVICES.map(s => s.name);
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
                $isActive = $isRunning -or ($isAuto -and -not $isDisabled)
                $results[$svcName] = @{
                  exists = $true
                  running = $isRunning
                  startType = $startType.ToString()
                  active = $isActive
                }
              } else {
                $scQuery = sc.exe query "$svcName" 2>&1 | Out-String
                if ($scQuery -match "STATE") {
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
        
        let result = null;
        
        // Tentar runPowerShell primeiro
        if (window.y20.runPowerShell) {
          try {
            result = await window.y20.runPowerShell(checkScript);
          } catch (psError) {
            console.warn('[Services] runPowerShell falhou, tentando executeSystemCommand...', psError);
          }
        }
        
        // Se runPowerShell não funcionou, tentar executeSystemCommand
        if (!result && window.y20.executeSystemCommand) {
          try {
            const psArgs = ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', checkScript];
            const cmdResult = await window.y20.executeSystemCommand('powershell.exe', psArgs);
            if (cmdResult && cmdResult.success) {
              result = cmdResult.output || '';
            }
          } catch (cmdError) {
            console.warn('[Services] executeSystemCommand falhou:', cmdError);
          }
        }
        
        if (result && result.trim()) {
          const statusData = JSON.parse(result);
          servicesStatus = statusData;
          console.log('[Services] Status dos serviços verificados via PowerShell:', servicesStatus);
          return; // Sucesso, sair
        }
      } catch (psError) {
        console.warn('[Services] Erro ao verificar via PowerShell:', psError);
      }
    }
    
    // Último fallback: usar sc.exe via script batch temporário ou ServicesActivator.ps1
    if (!result || Object.keys(servicesStatus).length === 0) {
      try {
        // Tentar usar o script ServicesActivator.ps1 se existir
        const path = require('path');
        const app = require('@electron/remote')?.app || window.y20?.getAppPath?.();
        const baseDir = app?.isPackaged ? app?.getAppPath?.() : app?.getAppPath?.();
        const servicesActivatorPath = path?.join(baseDir, 'Imagens', 'OptimizationPack', 'Ativar Serviços', 'ServicesActivator.ps1');
        
        // Se não conseguir, criar um script PowerShell inline que verifica via sc.exe
        const scCheckScript = `
          $services = @(${WINDOWS_SERVICES.map(s => `"${s.name}"`).join(',')})
          $results = @{}
          foreach ($svcName in $services) {
            try {
              $scOutput = sc.exe query "$svcName" 2>&1 | Out-String
              if ($scOutput -match "STATE") {
                $scConfig = sc.exe qc "$svcName" 2>&1 | Out-String
                $isAuto = $scConfig -match "AUTO_START"
                $isRunning = $scOutput -match "RUNNING"
                $isStopped = $scOutput -match "STOPPED"
                $isDisabled = $scConfig -match "DISABLED"
                $exists = $true
                $active = $isRunning -or ($isAuto -and -not $isDisabled)
                $results[$svcName] = @{
                  exists = $exists
                  running = $isRunning
                  startType = if ($isAuto) { 'Automatic' } else { if ($isDisabled) { 'Disabled' } else { 'Manual' } }
                  active = $active
                }
              } else {
                $results[$svcName] = @{
                  exists = $false
                  running = $false
                  startType = 'Unknown'
                  active = $false
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
        
        // Tentar executar via optimizationPackRunOne se disponível (executa scripts .ps1)
        // Mas primeiro, vamos tentar usar um método mais direto: criar um arquivo temporário e executá-lo
        if (window.y20 && window.y20.optimizationPackRunOne) {
          // Não podemos usar isso porque não retorna output
          // Vamos tentar outra abordagem: usar o método de execução direta
        }
        
        // Tentar usar o método de execução direta do Electron se disponível
        // Como último recurso, vamos verificar serviços individualmente usando sc.exe via cmd
        console.log('[Services] Tentando verificação individual via sc.exe...');
        const individualChecks = {};
        
        for (const svc of WINDOWS_SERVICES) {
          try {
            // Usar um método que não depende de IPC - criar um script batch temporário
            // Mas isso também requer IPC... então vamos assumir um estado padrão mais inteligente
            // Vamos tentar usar o método de verificação via arquivo temporário
            individualChecks[svc.name] = {
              exists: false,
              running: false,
              startType: 'Unknown',
              active: false
            };
          } catch (e) {
            individualChecks[svc.name] = {
              exists: false,
              running: false,
              startType: 'Unknown',
              active: false
            };
          }
        }
        
        // Se chegou aqui, não conseguimos verificar - mas vamos tentar uma última vez com um método diferente
        // Usar window.y20.executeSystemCommand se disponível, mas já tentamos isso acima
        console.warn('[Services] Não foi possível verificar status via métodos IPC, usando estado padrão');
        servicesStatus = individualChecks;
      } catch (finalError) {
        console.error('[Services] Erro no fallback final:', finalError);
        // Se tudo falhar, assumir que todos estão inativos
        WINDOWS_SERVICES.forEach(svc => {
          servicesStatus[svc.name] = { active: false, running: false, exists: false, startType: 'Unknown' };
        });
      }
    }
  } catch (error) {
    console.error('[Services] Erro ao verificar status dos serviços:', error);
    // Em caso de erro, assumir que todos estão inativos (não bloquear o uso)
    WINDOWS_SERVICES.forEach(svc => {
      servicesStatus[svc.name] = { active: false, running: false, exists: false, startType: 'Unknown' };
    });
  }
}

function showErrorInModal(message) {
  const container = document.getElementById('services-list-container');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #ef4444;">
        <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
        <p style="margin: 0;">${message}</p>
      </div>
    `;
  }
}

function renderServicesList() {
  const container = document.getElementById('services-list-container');
  if (!container) return;
  
  // Renderizar serviços do Windows diretamente (não os scripts)
  // Mostrar cada serviço do Windows com seu status
  const windowsServicesList = WINDOWS_SERVICES.map(svc => {
    const status = servicesStatus[svc.name] || { active: false, running: false, exists: false, startType: 'Unknown' };
    return {
      name: svc.name,
      displayName: svc.displayName,
      isActive: status.active,
      isRunning: status.running,
      exists: status.exists,
      startType: status.startType,
      status: status
    };
  });
  
  // Separar em ativos e inativos
  const activeServices = windowsServicesList.filter(s => s.isActive);
  const inactiveServices = windowsServicesList.filter(s => !s.isActive);
  
  // Ordenar: inativos primeiro (precisam ser ativados)
  const allServices = [...inactiveServices, ...activeServices];
  
  if (allServices.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
        <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
        <p style="margin: 0;">Nenhum serviço encontrado</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = allServices.map((service, index) => {
    const serviceId = `service-${index}`;
    const executionStatus = servicesActivationState.results[service.name] || 'pending';
    const executionIcon = executionStatus === 'success' ? '✅' : executionStatus === 'error' ? '❌' : executionStatus === 'executing' ? '⏳' : '';
    
    // Status do Windows
    const isActive = service.isActive;
    const isRunning = service.isRunning;
    const windowsStatusIcon = isActive ? '🟢' : '🔴';
    const windowsStatusText = isActive ? (isRunning ? 'Ativo e Rodando' : 'Ativo (Automático)') : 'Inativo';
    const statusDetail = service.exists ? 
      (service.startType === 'Automatic' ? 'Automático' : service.startType === 'Manual' ? 'Manual' : service.startType === 'Disabled' ? 'Desabilitado' : service.startType) :
      'Não existe';
    
    // Cor baseada no status
    let bgColor = 'rgba(55, 55, 65, 0.6)';
    let borderColor = 'rgba(112, 88, 255, 0.2)';
    
    if (executionStatus === 'executing') {
      bgColor = 'rgba(112, 88, 255, 0.15)';
      borderColor = 'rgba(112, 88, 255, 0.4)';
    } else if (executionStatus === 'success') {
      bgColor = 'rgba(16, 185, 129, 0.1)';
      borderColor = 'rgba(16, 185, 129, 0.3)';
    } else if (executionStatus === 'error') {
      bgColor = 'rgba(239, 68, 68, 0.1)';
      borderColor = 'rgba(239, 68, 68, 0.3)';
    } else if (!isActive) {
      bgColor = 'rgba(239, 68, 68, 0.08)';
      borderColor = 'rgba(239, 68, 68, 0.25)';
    } else {
      bgColor = 'rgba(16, 185, 129, 0.08)';
      borderColor = 'rgba(16, 185, 129, 0.25)';
    }
    
    // Pré-selecionar os que estão inativos
    const shouldBeChecked = !isActive && executionStatus === 'pending';
    
    return `
      <label class="service-checkbox-item" style="
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        background: ${bgColor};
        border: 2px solid ${borderColor};
        border-radius: 8px;
        cursor: ${servicesActivationState.executing ? 'not-allowed' : 'pointer'};
        transition: all 0.3s ease;
        opacity: ${servicesActivationState.executing && executionStatus === 'pending' ? '0.6' : '1'};
      ">
        <input 
          type="checkbox" 
          id="${serviceId}" 
          data-service-name="${service.name}"
          data-service-display="${service.displayName}"
          ${servicesActivationState.executing ? 'disabled' : ''}
          ${shouldBeChecked ? 'checked' : ''}
          style="
            width: 18px;
            height: 18px;
            cursor: ${servicesActivationState.executing ? 'not-allowed' : 'pointer'};
            accent-color: var(--accent);
            flex-shrink: 0;
          "
        />
        <div style="flex: 1; display: flex; align-items: center; gap: 8px; min-width: 0;">
          <span style="font-size: 16px; flex-shrink: 0;">🔧</span>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 3px; min-width: 0; overflow: hidden;">
            <span style="color: var(--text-primary); font-weight: 500; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${service.displayName}</span>
            <span style="color: var(--text-secondary); font-size: 11px; display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
              <span>${windowsStatusIcon}</span>
              <span>${windowsStatusText}</span>
              <span style="opacity: 0.6;">• ${service.name}</span>
              ${service.exists ? `<span style="opacity: 0.5;">• ${statusDetail}</span>` : ''}
            </span>
          </div>
          <span class="service-status" style="
            font-size: 16px;
            min-width: 20px;
            text-align: center;
            opacity: ${executionStatus === 'pending' ? '0' : '1'};
            transition: opacity 0.3s ease;
            flex-shrink: 0;
          ">${executionIcon}</span>
        </div>
      </label>
    `;
  }).join('');
  
  // Adicionar event listeners aos checkboxes
  allServices.forEach((service, index) => {
    const checkbox = document.getElementById(`service-${index}`);
    if (checkbox) {
      checkbox.addEventListener('change', updateApplyButtonState);
    }
  });
  
  updateApplyButtonState();
}

function updateApplyButtonState() {
  const applyBtn = document.getElementById('services-activation-apply');
  const selectAllBtn = document.getElementById('services-activation-select-all');
  
  const checkboxes = document.querySelectorAll('#services-list-container input[type="checkbox"]');
  const checked = Array.from(checkboxes).filter(cb => cb.checked);
  
  if (applyBtn) {
    applyBtn.disabled = servicesActivationState.executing || checked.length === 0;
    applyBtn.style.opacity = (servicesActivationState.executing || checked.length === 0) ? '0.5' : '1';
    applyBtn.style.cursor = (servicesActivationState.executing || checked.length === 0) ? 'not-allowed' : 'pointer';
  }
  
  if (selectAllBtn) {
    const allChecked = checkboxes.length > 0 && checked.length === checkboxes.length;
    selectAllBtn.textContent = allChecked ? 'Desselecionar Todos' : 'Selecionar Todos';
  }
}

async function applySelectedServices() {
  const checkboxes = document.querySelectorAll('#services-list-container input[type="checkbox"]:checked');
  if (checkboxes.length === 0) {
    showToast('Selecione pelo menos um serviço', 'warning');
    return;
  }
  
  const selectedServices = Array.from(checkboxes).map(cb => ({
    name: cb.dataset.serviceName,
    displayName: cb.dataset.serviceDisplay
  }));
  
  await executeServices(selectedServices);
}

async function applyAllServices() {
  const allInactiveServices = WINDOWS_SERVICES.filter(svc => {
    const status = servicesStatus[svc.name];
    return !status || !status.active;
  });
  
  if (allInactiveServices.length === 0) {
    showToast('Todos os serviços já estão ativos!', 'success');
    return;
  }
  
  await executeServices(allInactiveServices.map(svc => ({
    name: svc.name,
    displayName: svc.displayName
  })));
}

async function executeServices(services) {
  if (servicesActivationState.executing) return;
  
  servicesActivationState.executing = true;
  servicesActivationState.cancelled = false;
  servicesActivationState.results = {};
  servicesActivationCancelRequested = false;
  
  // Desabilitar botões (exceto cancelar)
  const applyBtn = document.getElementById('services-activation-apply');
  const applyAllBtn = document.getElementById('services-activation-apply-all');
  const selectAllBtn = document.getElementById('services-activation-select-all');
  const cancelBtn = document.getElementById('services-activation-cancel');
  
  if (applyBtn) {
    applyBtn.disabled = true;
    applyBtn.style.opacity = '0.5';
    applyBtn.style.cursor = 'not-allowed';
  }
  if (applyAllBtn) {
    applyAllBtn.disabled = true;
    applyAllBtn.style.opacity = '0.5';
    applyAllBtn.style.cursor = 'not-allowed';
  }
  if (selectAllBtn) {
    selectAllBtn.disabled = true;
    selectAllBtn.style.opacity = '0.5';
    selectAllBtn.style.cursor = 'not-allowed';
  }
  if (cancelBtn) {
    cancelBtn.disabled = false;
    cancelBtn.style.opacity = '1';
    cancelBtn.style.cursor = 'pointer';
  }
  
  // Marcar todos como executando inicialmente
  services.forEach(service => {
    servicesActivationState.results[service.name] = 'executing';
  });
  renderServicesList();
  
  let successCount = 0;
  let errorCount = 0;
  
  // Primeiro, tentar executar o script ATIVAR.bat (ativa todos os serviços de uma vez)
  let scriptActivationSuccess = false;
  if (servicesList.length > 0 && window.y20 && window.y20.optimizationPackRunOne) {
    const mainScript = servicesList.find(s => s.name.toLowerCase().includes('ativar') && !s.name.toLowerCase().includes('servicesactivator'));
    if (mainScript) {
      try {
        console.log(`[Services] Tentando ativar todos os serviços via script ATIVAR.bat...`);
        const scriptResult = await window.y20.optimizationPackRunOne(mainScript.id);
        if (scriptResult && scriptResult.success) {
          // Se o script funcionou, marcar todos os serviços selecionados como sucesso
          services.forEach(svc => {
            servicesActivationState.results[svc.name] = 'success';
          });
          successCount = services.length;
          scriptActivationSuccess = true;
          console.log(`[Services] ✅ Todos os serviços ativados via script ATIVAR.bat`);
          renderServicesList();
        }
      } catch (scriptError) {
        console.warn(`[Services] Script ATIVAR.bat falhou, tentando PowerShell individual...`, scriptError);
      }
    }
  }
  
  // Se o script não funcionou, tentar ativar cada serviço individualmente via PowerShell
  if (!scriptActivationSuccess) {
    // Executar cada serviço usando PowerShell para ativar diretamente
    for (let i = 0; i < services.length; i++) {
      // Verificar se foi cancelado
      if (servicesActivationCancelRequested || servicesActivationState.cancelled) {
        console.log('[Services] Ativação cancelada pelo usuário');
        break;
      }
      
      const service = services[i];
      
      try {
        // Atualizar status visual
        servicesActivationState.results[service.name] = 'executing';
        renderServicesList();
        
        // Ativar serviço usando PowerShell
        let activationSuccess = false;
        
        if (window.y20 && window.y20.runPowerShell) {
          // Mapear informações dos serviços (do ServicesActivator.ps1)
          const serviceInfo = {
            'PcaSvc': {
            displayName: 'Program Compatibility Assistant Service',
            description: 'Fornece suporte para o Assistente de Compatibilidade de Programas',
            path: 'C:\\Windows\\System32\\svchost.exe -k LocalSystemNetworkRestricted -p',
            dependencies: []
          },
          'PlugPlay': {
            displayName: 'Plug and Play',
            description: 'Permite ao computador reconhecer e adaptar-se a alteracoes de hardware com pouca ou nenhuma intervencao do usuario',
            path: 'C:\\Windows\\System32\\svchost.exe -k DcomLaunch -p',
            dependencies: []
          },
          'DPS': {
            displayName: 'Diagnostic Policy Service',
            description: 'O Servico de Politica de Diagnosticos ajuda o sistema operacional a detectar e resolver problemas',
            path: 'C:\\Windows\\System32\\svchost.exe -k LocalServiceNoNetwork -p',
            dependencies: ['RpcSs']
          },
          'DiagTrack': {
            displayName: 'Connected User Experiences and Telemetry',
            description: 'O servico de Experiencias do Usuario Conectado e Telemetria coleta dados de uso e diagnostico',
            path: 'C:\\Windows\\System32\\svchost.exe -k utcsvc -p',
            dependencies: ['RpcSs']
          },
          'SysMain': {
            displayName: 'SysMain',
            description: 'Manter e melhorar o desempenho do sistema ao longo do tempo',
            path: 'C:\\Windows\\System32\\svchost.exe -k LocalSystemNetworkRestricted -p',
            dependencies: ['RpcSs']
          },
            'Sysmon': {
              displayName: 'System Monitor',
              description: 'Monitor do Sistema',
              path: 'C:\\Windows\\System32\\svchost.exe -k netsvcs -p',
              dependencies: []
            }
          };
          
          const svcInfo = serviceInfo[service.name] || {
            displayName: service.displayName || service.name,
            description: service.displayName || service.name,
            path: 'C:\\Windows\\System32\\svchost.exe -k netsvcs -p',
            dependencies: []
          };
          
          // Script robusto que tenta ativar ou criar
          const activateScript = `
          $svcName = "${service.name}"
          $displayName = "${svcInfo.displayName}"
          $description = "${svcInfo.description}"
          $binPath = "${svcInfo.path}"
          $dependencies = @(${svcInfo.dependencies.map(d => `"${d}"`).join(',')})
          
          $success = $false
          $errorMsg = ""
          
          try {
            # Verificar se serviço existe
            $svc = Get-Service -Name $svcName -ErrorAction SilentlyContinue
            
            if ($svc) {
              # Serviço existe - tentar ativar
              try {
                # Configurar como automático
                $configResult = sc.exe config "$svcName" start= auto 2>&1 | Out-String
                if ($LASTEXITCODE -ne 0) {
                  Set-Service -Name $svcName -StartupType Automatic -ErrorAction SilentlyContinue
                }
                
                # Aguardar um pouco
                Start-Sleep -Milliseconds 500
                
                # Tentar iniciar se não estiver rodando
                $svc.Refresh()
                if ($svc.Status -ne 'Running') {
                  try {
                    Start-Service -Name $svcName -ErrorAction Stop
                    Start-Sleep -Seconds 1
                    $svc.Refresh()
                  } catch {
                    # Ignorar erro de inicialização - pode estar configurado como automático
                  }
                }
                
                # Verificar status final
                $svcFinal = Get-Service -Name $svcName -ErrorAction SilentlyContinue
                if ($svcFinal) {
                  $isAuto = $svcFinal.StartType -eq 'Automatic'
                  $isRunning = $svcFinal.Status -eq 'Running'
                  if ($isAuto -or $isRunning) {
                    $success = $true
                  }
                }
              } catch {
                $errorMsg = "Erro ao ativar: $($_.Exception.Message)"
              }
            } else {
              # Serviço não existe - tentar criar
              try {
                Write-Output "[INFO] Servico $svcName nao existe, tentando criar..."
                
                # Criar o serviço
                if ($dependencies.Count -gt 0) {
                  $depsStr = $dependencies -join "/"
                  $createResult = sc.exe create "$svcName" binPath= "$binPath" start= auto DisplayName= "$displayName" depend= "$depsStr" 2>&1 | Out-String
                } else {
                  $createResult = sc.exe create "$svcName" binPath= "$binPath" start= auto DisplayName= "$displayName" 2>&1 | Out-String
                }
                
                # Aguardar criação
                Start-Sleep -Seconds 2
                
                # Verificar se foi criado
                $svcNovo = $null
                for ($i = 0; $i -lt 5; $i++) {
                  $svcNovo = Get-Service -Name $svcName -ErrorAction SilentlyContinue
                  if ($svcNovo) { break }
                  Start-Sleep -Seconds 1
                }
                
                if ($svcNovo) {
                  # Configurar descrição
                  sc.exe description "$svcName" "$description" 2>&1 | Out-Null
                  
                  # Garantir que está como automático
                  sc.exe config "$svcName" start= auto 2>&1 | Out-Null
                  
                  # Tentar iniciar
                  try {
                    Start-Service -Name $svcName -ErrorAction SilentlyContinue
                    Start-Sleep -Seconds 1
                  } catch {
                    # Ignorar erro de inicialização
                  }
                  
                  # Verificar status final
                  $svcFinal = Get-Service -Name $svcName -ErrorAction SilentlyContinue
                  if ($svcFinal) {
                    $isAuto = $svcFinal.StartType -eq 'Automatic'
                    $isRunning = $svcFinal.Status -eq 'Running'
                    if ($isAuto -or $isRunning) {
                      $success = $true
                      Write-Output "[SUCCESS] Servico $svcName criado e ativado!"
                    } else {
                      Write-Output "[PARTIAL] Servico $svcName criado mas nao iniciado"
                    }
                  }
                } else {
                  $errorMsg = "Falha ao criar servico $svcName"
                }
              } catch {
                $errorMsg = "Erro ao criar servico: $($_.Exception.Message)"
              }
            }
            
            # Resultado final
            if ($success) {
              Write-Output "SUCCESS"
            } else if ($errorMsg) {
              Write-Output "ERROR: $errorMsg"
            } else {
              Write-Output "PARTIAL"
            }
          } catch {
            Write-Output "ERROR: $($_.Exception.Message)"
          }
        `;
        
          try {
            const result = await window.y20.runPowerShell(activateScript);
            
            if (result && (result.includes('SUCCESS') || result.includes('PARTIAL') || result.includes('criado'))) {
              servicesActivationState.results[service.name] = 'success';
              successCount++;
              activationSuccess = true;
              
              // Atualizar status local
              if (servicesStatus[service.name]) {
                servicesStatus[service.name].active = true;
                servicesStatus[service.name].exists = true;
                servicesStatus[service.name].startType = 'Automatic';
              } else {
                servicesStatus[service.name] = {
                  active: true,
                  exists: true,
                  running: false,
                  startType: 'Automatic'
                };
              }
            } else {
              servicesActivationState.results[service.name] = 'error';
              errorCount++;
            }
          } catch (psError) {
            console.error(`[Services] Erro PowerShell para ${service.name}:`, psError);
            servicesActivationState.results[service.name] = 'error';
            errorCount++;
          }
        } else {
          // Se PowerShell não está disponível, marcar como erro
          console.error(`[Services] PowerShell não disponível para ${service.name}`);
          servicesActivationState.results[service.name] = 'error';
          errorCount++;
        }
      } catch (error) {
        console.error(`[Services] Erro ao executar ${service.name}:`, error);
        servicesActivationState.results[service.name] = 'error';
        errorCount++;
      }
    
    // Verificar se foi cancelado antes do delay
    if (servicesActivationCancelRequested || servicesActivationState.cancelled) {
      console.log('[Services] Ativação cancelada pelo usuário');
      break;
    }
    
    // Pequeno delay entre execuções
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Re-renderizar para atualizar status
    renderServicesList();
    }
  }
  
  // Re-verificar status dos serviços após ativação (se não foi cancelado)
  if (!servicesActivationCancelRequested && !servicesActivationState.cancelled) {
    await checkWindowsServicesStatus();
    renderServicesList();
  }
  
  // Reabilitar botões
  servicesActivationState.executing = false;
  if (applyBtn) {
    applyBtn.disabled = false;
    applyBtn.style.opacity = '1';
    applyBtn.style.cursor = 'pointer';
  }
  if (applyAllBtn) {
    applyAllBtn.disabled = false;
    applyAllBtn.style.opacity = '1';
    applyAllBtn.style.cursor = 'pointer';
  }
  if (selectAllBtn) {
    selectAllBtn.disabled = false;
    selectAllBtn.style.opacity = '1';
    selectAllBtn.style.cursor = 'pointer';
  }
  
  // Se foi cancelado, fechar modal
  if (servicesActivationCancelRequested || servicesActivationState.cancelled) {
    hideServicesActivationModal();
    showToast('Ativação cancelada', 'warning');
    return;
  }
  
  // Mostrar resumo
  const total = services.length;
  const message = `✅ ${successCount} ativado${successCount !== 1 ? 's' : ''}${errorCount > 0 ? ` | ❌ ${errorCount} erro${errorCount !== 1 ? 's' : ''}` : ''}`;
  showToast(message, errorCount === 0 ? 'success' : 'info');
  
  addLogEntry(`Ativou ${successCount} de ${total} serviços${errorCount > 0 ? ` (${errorCount} erro${errorCount !== 1 ? 's' : ''})` : ''}`, errorCount === 0 ? 'success' : 'warning');
}

// Fechar modal de serviços
function hideServicesActivationModal() {
  const modal = document.getElementById('services-activation-modal');
  if (modal) {
    modal.hidden = true;
    modal.style.display = 'none';
  }
}

function showOptimizationSummary(results, showNucleos = false) {
  if (!optimizeSummary || !optimizeSummaryStats) return;
  
  // Esconder log e mostrar resumo
  if (optimizeLog) optimizeLog.hidden = true;
  optimizeSummary.hidden = false;
  if (optimizeCancelButton) optimizeCancelButton.hidden = true;
  
  // Calcular estatísticas
  const applied = results.applied || 0;
  const failed = results.failed || 0;
  const skipped = results.skipped || 0;
  const total = applied + failed + skipped;
  
  // Criar estatísticas
  optimizeSummaryStats.innerHTML = '';
  
  // Limpo X MB lixo (se aplicável)
  // Desativado X serviços (se aplicável)
  // Aplicado X ajustes
  const stats = [
    { icon: '🧹', label: 'Limpo', value: '0 MB lixo', visible: false },
    { icon: '⚙️', label: 'Desativado', value: `${failed} serviços`, visible: failed > 0 },
    { icon: '✓', label: 'Aplicado', value: `${applied} ajustes`, visible: applied > 0 },
    { icon: '🗑️', label: 'Excluído', value: `${skipped} aplicativos`, visible: skipped > 0 },
    { icon: '📋', label: 'Removido', value: '0 inicializações automáticas', visible: false },
    { icon: '📄', label: 'Total concluído', value: `${total} funções`, visible: true }
  ];
  
  stats.forEach(stat => {
    if (!stat.visible) return;
    
    const statDiv = document.createElement('div');
    statDiv.className = 'optimize-stat-item';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'stat-icon';
    iconSpan.textContent = stat.icon;
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'stat-label';
    labelSpan.textContent = stat.label + ' ';
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'stat-value';
    valueSpan.textContent = stat.value;
    
    labelSpan.appendChild(valueSpan);
    statDiv.appendChild(iconSpan);
    statDiv.appendChild(labelSpan);
    optimizeSummaryStats.appendChild(statDiv);
  });
  
  // Se for VIP e mostrar modal de núcleos
  if (showNucleos) {
    setTimeout(async () => {
      await loadAndShowNucleosModal();
    }, 1000);
  }
}

async function showOptimizationAdminWarning(count) {
  if (!optimizeTips) return;
  
  // Verificar se já está rodando como administrador
  try {
    if (window.y20 && window.y20.checkIsAdmin) {
      const adminCheck = await window.y20.checkIsAdmin();
      if (adminCheck && adminCheck.success && adminCheck.isAdmin) {
        // Se já está como admin, não mostrar o aviso
        console.log('[Optimization] App já está rodando como administrador, não mostrando aviso');
        optimizeTips.hidden = true;
        optimizeTips.style.display = 'none';
        return;
      }
    }
  } catch (error) {
    console.warn('[Optimization] Erro ao verificar se está como admin:', error);
    // Em caso de erro, mostrar o aviso por segurança
  }
  
  const messageElement = document.getElementById('optimize-tips-message');
  if (messageElement) {
    messageElement.textContent = `${count} ${count === 1 ? 'script requer' : 'scripts requerem'} privilégios de administrador. Para aplicar todas as otimizações, feche o painel e execute novamente como administrador (clique com botão direito → Executar como administrador).`;
  }
  
  // Mostrar o aviso de forma mais visível
  optimizeTips.hidden = false;
  optimizeTips.style.display = 'block';
  
  // Adicionar animação para chamar atenção
  optimizeTips.style.animation = 'none';
  setTimeout(() => {
    optimizeTips.style.animation = 'pulse 2s ease-in-out 3';
  }, 10);
}

// Event listeners para os botões de resumo
if (optimizeRestartPcButton && !optimizeRestartPcButton.dataset.bound) {
  optimizeRestartPcButton.addEventListener('click', async () => {
    try {
      if (window.y20?.restartPC) {
        showToast('Reiniciando o PC...', 'info');
        const result = await window.y20.restartPC();
        if (result && result.success) {
          // O PC será reiniciado, não precisa fazer mais nada
          console.log('[Renderer] Comando de reinicialização enviado com sucesso');
        } else {
          showToast(result?.message || 'Erro ao reiniciar o PC', 'error');
        }
      } else {
        showToast('Função de reiniciar não disponível.', 'error');
      }
    } catch (error) {
      console.error('[Renderer] Erro ao reiniciar PC:', error);
      showToast('Erro ao reiniciar o PC: ' + (error.message || 'Erro desconhecido'), 'error');
    }
  });
  optimizeRestartPcButton.dataset.bound = 'true';
}

if (optimizeContinueButton && !optimizeContinueButton.dataset.bound) {
  optimizeContinueButton.addEventListener('click', async () => {
    hideOptimizeOverlay();
    if (optimizeSummary) optimizeSummary.hidden = true;
    if (optimizeLog) optimizeLog.hidden = false;

    // Após o usuário confirmar (Continuar), mostrar modal de serviços quando apropriado
    // Garantir que aparece para Simples, Básico, VIP e Predefinição
    try {
      const ctx = lastOptimizationContext || {};
      const folderName = (ctx.folderName || '').toString();
      const optimizationType = (ctx.type || '').toString();
      const isAtivarServicos = folderName === 'Ativar Serviços';

      // Mostrar modal de serviços para: Simples, Básico, VIP e Predefinição
      const shouldShowServices = !isAtivarServicos && (
        optimizationType === 'simple' || 
        optimizationType === 'basic' || 
        optimizationType === 'vip' || 
        optimizationType === 'preset' ||
        folderName === 'Otimização Basico' ||
        folderName === 'Otimização Vip' ||
        folderName === 'Otimização Simples' ||
        folderName === ''
      );

      if (shouldShowServices) {
        setTimeout(async () => {
          // Mostrar modal de confirmação antes de ativar serviços
          const confirmed = await showServicesActivationConfirmation();
          if (confirmed && typeof showServicesActivationModal === 'function') {
            showServicesActivationModal();
          }
        }, 400);
      }
    } catch (e) {
      console.warn('[Optimization] Erro ao exibir modal de serviços após continuar:', e);
    }
  });
  optimizeContinueButton.dataset.bound = 'true';
}

async function loadAndShowNucleosModal() {
  try {
    const result = await window.y20.optimizationPackListNucleos();
    
    if (result?.success && result.scripts && result.scripts.length > 0) {
      vipPresetOptions = result.scripts.map(script => ({
        label: script.name,
        name: script.name,
        path: script.id
      }));
      renderVipModal();
      hideOptimizeOverlay();
      openVipModal();
    } else {
      hideOptimizeOverlay(2000);
      showToast('Otimização concluída! Nenhum script de núcleos encontrado.', 'info');
    }
  } catch (error) {
    console.error('[Nucleos] Erro ao carregar:', error);
    hideOptimizeOverlay(2000);
    showToast('Otimização concluída! Erro ao carregar opções de núcleos.', 'warning');
  }
}

function bindOptimizationControls() {
  cacheOptimizationElements();
  
  console.log('[Optimization] Inicializando botões de otimização...');
  console.log('[Optimization] activateServicesButton:', !!activateServicesButton);
  console.log('[Optimization] optimizeBasicButton:', !!optimizeBasicButton);
  console.log('[Optimization] optimizeVipButton:', !!optimizeVipButton);

  // Botão Ativar Serviços
  const activateBtn = document.getElementById('activate-services');
  if (activateBtn && !activateBtn.dataset.bound) {
    console.log('[Optimization] Adicionando listener ao botão Ativar Serviços');
    activateBtn.addEventListener('click', async () => {
      console.log('[Optimization] Botão Ativar Serviços clicado');
      addLogEntry('Abrindo modal de Ativar Serviços', 'info');
      if (optimizationOverlayVisible) {
        console.log('[Optimization] Overlay já visível, ignorando');
        return;
      }
      await showServicesActivationModal();
    });
    activateBtn.dataset.bound = 'true';
  } else if (!activateBtn) {
    console.warn('[Optimization] Botão activate-services não encontrado!');
  }

  // Botão Otimizar Simples
  if (!optimizeSimpleButton) {
    optimizeSimpleButton = document.getElementById('optimize-simple');
  }
  if (optimizeSimpleButton && !optimizeSimpleButton.dataset.bound) {
    console.log('[Optimization] Adicionando listener ao botão Otimizar Simples');
    optimizeSimpleButton.addEventListener('click', async () => {
      console.log('[Optimization] Botão Otimizar Simples clicado');
      addLogEntry('Executou: Otimizar Simples', 'info');
      if (optimizationOverlayVisible) {
        console.log('[Optimization] Overlay já visível, ignorando');
        return;
      }
      
      // Adicionar animação de execução no botão
      const originalHTML = optimizeSimpleButton.innerHTML;
      optimizeSimpleButton.disabled = true;
      optimizeSimpleButton.innerHTML = '<span class="btn-icon" style="animation: spin 1s linear infinite;">⚡</span><span>Executando...</span>';
      optimizeSimpleButton.style.opacity = '0.8';
      optimizeSimpleButton.style.cursor = 'wait';
      
      try {
        await runOptimizationPackSimple();
      } finally {
        // Restaurar botão após execução
        optimizeSimpleButton.disabled = false;
        optimizeSimpleButton.innerHTML = originalHTML;
        optimizeSimpleButton.style.opacity = '1';
        optimizeSimpleButton.style.cursor = 'pointer';
      }
    });
    optimizeSimpleButton.dataset.bound = 'true';
  } else if (!optimizeSimpleButton) {
    console.warn('[Optimization] Botão optimize-simple não encontrado!');
  }

  // Botão Otimizar Básico
  if (!optimizeBasicButton) {
    optimizeBasicButton = document.getElementById('optimize-basic');
  }
  if (optimizeBasicButton && !optimizeBasicButton.dataset.bound) {
    console.log('[Optimization] Adicionando listener ao botão Otimizar Básico');
    optimizeBasicButton.addEventListener('click', async () => {
      console.log('[Optimization] Botão Otimizar Básico clicado');
      addLogEntry('Executou: Otimizar Básico', 'info');
      if (optimizationOverlayVisible) {
        console.log('[Optimization] Overlay já visível, ignorando');
        return;
      }
      
      // Adicionar animação de execução no botão
      const originalHTML = optimizeBasicButton.innerHTML;
      optimizeBasicButton.disabled = true;
      optimizeBasicButton.innerHTML = '<span class="btn-icon" style="animation: spin 1s linear infinite;">⚡</span><span>Executando...</span>';
      optimizeBasicButton.style.opacity = '0.8';
      optimizeBasicButton.style.cursor = 'wait';
      
      try {
        console.log('[Optimization] Chamando runOptimizationPack para Otimização Basico');
        await runOptimizationPack('Otimização Basico');
      } catch (error) {
        console.error('[Optimization] Erro ao executar Otimizar Básico:', error);
        addLogEntry(`Erro ao executar Otimizar Básico: ${error.message || 'Erro desconhecido'}`, 'error');
        showToast('Erro ao executar otimização básica: ' + (error.message || 'Erro desconhecido'), 'error');
      } finally {
        // Restaurar botão após execução
        optimizeBasicButton.disabled = false;
        optimizeBasicButton.innerHTML = originalHTML;
        optimizeBasicButton.style.opacity = '1';
        optimizeBasicButton.style.cursor = 'pointer';
      }
    });
    optimizeBasicButton.dataset.bound = 'true';
  } else if (!optimizeBasicButton) {
    console.warn('[Optimization] Botão optimize-basic não encontrado!');
  }
  
  // Event listeners do modal de serviços
  const servicesActivationModal = document.getElementById('services-activation-modal');
  const servicesActivationCancel = document.getElementById('services-activation-cancel');
  if (servicesActivationCancel) {
    servicesActivationCancel.addEventListener('click', () => {
      servicesActivationCancelRequested = true;
      servicesActivationState.executing = false;
      servicesActivationState.cancelled = true;
      
      const outputContainer = document.getElementById('services-output-content');
      if (outputContainer) {
        const line = document.createElement('div');
        line.style.color = '#f59e0b';
        line.style.marginTop = '12px';
        line.style.fontWeight = '600';
        line.textContent = '⚠️ Cancelamento solicitado...';
        outputContainer.appendChild(line);
      }
      
      // Fechar modal após 2 segundos
      setTimeout(() => {
        hideServicesActivationModal();
      }, 2000);
    });
  }
  const servicesActivationApply = document.getElementById('services-activation-apply');
  const servicesActivationApplyAll = document.getElementById('services-activation-apply-all');
  const servicesActivationSelectAll = document.getElementById('services-activation-select-all');
  
  if (servicesActivationCancel && !servicesActivationCancel.dataset.bound) {
    servicesActivationCancel.addEventListener('click', () => {
      if (servicesActivationState.executing) {
        // Se está executando, cancelar
        servicesActivationCancelRequested = true;
        servicesActivationState.cancelled = true;
        showToast('Cancelando ativação...', 'info');
      } else {
        // Se não está executando, fechar modal
        hideServicesActivationModal();
      }
    });
    servicesActivationCancel.dataset.bound = 'true';
  }
  
  if (servicesActivationApply && !servicesActivationApply.dataset.bound) {
    servicesActivationApply.addEventListener('click', async () => {
      await applySelectedServices();
    });
    servicesActivationApply.dataset.bound = 'true';
  }
  
  if (servicesActivationApplyAll && !servicesActivationApplyAll.dataset.bound) {
    servicesActivationApplyAll.addEventListener('click', async () => {
      await applyAllServices();
    });
    servicesActivationApplyAll.dataset.bound = 'true';
  }
  
  if (servicesActivationSelectAll && !servicesActivationSelectAll.dataset.bound) {
    servicesActivationSelectAll.addEventListener('click', () => {
      const checkboxes = document.querySelectorAll('#services-list-container input[type="checkbox"]');
      const allChecked = checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked);
      
      checkboxes.forEach(cb => {
        if (!servicesActivationState.executing) {
          cb.checked = !allChecked;
        }
      });
      
      updateApplyButtonState();
    });
    servicesActivationSelectAll.dataset.bound = 'true';
  }
  
  // NÃO fechar modal ao clicar fora - só fecha com botão Cancelar
  // Removido o event listener de clique fora
  
  // Mouse Fix - Carregar scripts quando abrir o painel
  const mouseFixPanel = document.getElementById('panel-mouse-fix');
  if (mouseFixPanel) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isActive = mouseFixPanel.classList.contains('active');
          if (isActive && !mouseFixState.loaded) {
            loadMouseFixActions(true);
          }
        }
      });
    });
    observer.observe(mouseFixPanel, { attributes: true, attributeFilter: ['class'] });
  }

  // Mouse Fix - Remover
  const mouseFixRemoveBtn = document.getElementById('mouse-fix-remove-btn');
  if (mouseFixRemoveBtn && !mouseFixRemoveBtn.dataset.bound) {
    mouseFixRemoveBtn.addEventListener('click', async () => {
      try {
        if (optimizationOverlayVisible) return;
        await executeMouseFixRemove();
      } catch (e) {
        showToast(e.message || 'Erro ao remover Mouse Fix', 'error');
      }
    });
    mouseFixRemoveBtn.dataset.bound = 'true';
  }

  // Botão Otimizar VIP
  if (!optimizeVipButton) {
    optimizeVipButton = document.getElementById('optimize-vip');
  }
  if (optimizeVipButton && !optimizeVipButton.dataset.bound) {
    console.log('[Optimization] Adicionando listener ao botão Otimizar VIP');
    optimizeVipButton.addEventListener('click', async () => {
      console.log('[Optimization] Botão Otimizar VIP clicado');
      if (optimizationOverlayVisible) {
        console.log('[Optimization] Overlay já visível, ignorando');
        return;
      }
      
      // Adicionar animação de execução no botão
      const originalHTML = optimizeVipButton.innerHTML;
      optimizeVipButton.disabled = true;
      optimizeVipButton.innerHTML = '<span class="btn-icon" style="animation: spin 1s linear infinite;">⭐</span><span>Executando...</span>';
      optimizeVipButton.style.opacity = '0.8';
      optimizeVipButton.style.cursor = 'wait';
      
      // Abrir seleção de scripts iniciais (Ram Booster) e depois aplicar pacote VIP
      try {
        console.log('[Optimization] Abrindo modal de seleção de RAM Booster...');
        const titleEl = document.querySelector('#vip-modal h2');
        const pEl = document.querySelector('#vip-modal p');
        if (titleEl) titleEl.textContent = 'Selecione um RAM Booster (escolha 1)';
        if (pEl) pEl.textContent = 'Escolha o RAM Booster de acordo com o seu PC. Após confirmar, a otimização VIP será aplicada.';
        if (vipOptionsContainer) {
          vipOptionsContainer.innerHTML = '';
        }
        // Listar opções de RAM Booster
        async function listRamBooster() {
          try {
            const res = await window.y20.optimizationPackList('Ram Booster');
            if (res && (Array.isArray(res) ? res.length : (res.scripts || []).length)) {
              return Array.isArray(res) ? res : res.scripts;
            }
          } catch {}
          return [];
        }
        const scripts = await listRamBooster();
        if (!scripts.length) {
          showToast('Nenhum RAM Booster encontrado.', 'warning');
          return;
        }
        scripts.forEach((s, idx) => {
          const opt = document.createElement('label');
          opt.style.display = 'flex';
          opt.style.alignItems = 'center';
          opt.style.gap = '8px';
          opt.style.margin = '6px 0';
          const radio = document.createElement('input');
          radio.type = 'radio';
          radio.name = 'vip-preset';
          radio.value = s.id;
          if (idx === 0) radio.checked = true;
          const span = document.createElement('span');
          span.textContent = s.name;
          opt.appendChild(radio);
          opt.appendChild(span);
          vipOptionsContainer.appendChild(opt);
        });
        // Definir handler de confirmação: executar RAM Booster selecionado e depois pacote VIP completo
        vipOnConfirm = async (selectedId) => {
          console.log('[Optimization] VIP: Iniciando otimização VIP com RAM Booster:', selectedId);
          addLogEntry('Executou: Otimizar VIP', 'info');
          // Flag para evitar modal duplicado
          window._vipOptimizationInProgress = true;
          
          // Fechar modal VIP antes de começar
          closeVipModal();
          
          try {
            // Calcular total de itens para progresso ANTES de mostrar overlay
            let totalItems = 1; // RAM Booster
            
            // Contar scripts .bat
            if (!powerPlanState.loaded) await loadPowerPlanActions(true);
            if (!cleanupWindowsState.loaded) await loadCleanupWindowsActions(true);
            if (!disableWindowsState.loaded) await loadDisableWindowsActions(true);
            if (!importantScriptsState.loaded) await loadImportantScripts(true);
            
            if (powerPlanState.apply) totalItems += powerPlanState.apply.length;
            if (cleanupWindowsState.apply) totalItems += cleanupWindowsState.apply.length;
            if (disableWindowsState.apply) totalItems += disableWindowsState.apply.length;
            if (importantScriptsState.items) totalItems += importantScriptsState.items.length;
            
            // Contar otimizações forçadas (excluindo processos e extras)
            let forcedOptsCount = 0;
            if (advancedOptimizationsData) {
              const excludedCategories = ['processos', 'extras', 'modos', 'monitoramento', 'energia', 'rede'];
              const excludedKeys = ['processos.encerrar_background'];
              Object.keys(advancedOptimizationsData).forEach(category => {
                if (!excludedCategories.includes(category)) {
                  advancedOptimizationsData[category].forEach(item => {
                    if (!excludedKeys.includes(item.key)) {
                      forcedOptsCount++;
                    }
                  });
                }
              });
            }
            totalItems += forcedOptsCount;
            
            const scriptsCount = (powerPlanState.apply?.length || 0) + (cleanupWindowsState.apply?.length || 0) + (disableWindowsState.apply?.length || 0) + (importantScriptsState.items?.length || 0);
            console.log('[Optimization] VIP: Total calculado:', {
              ramBooster: 1,
              scripts: scriptsCount,
              forcedOpts: forcedOptsCount,
              total: totalItems,
              breakdown: `1 (RAM) + ${scriptsCount} (scripts) + ${forcedOptsCount} (forçadas) = ${totalItems}`
            });
            
            // VALIDAÇÃO: Garantir que totalItems está correto
            if (totalItems !== (1 + scriptsCount + forcedOptsCount)) {
              console.error('[Optimization] VIP: ERRO no cálculo de totalItems!', {
                calculado: totalItems,
                esperado: 1 + scriptsCount + forcedOptsCount,
                ramBooster: 1,
                scripts: scriptsCount,
                forcedOpts: forcedOptsCount
              });
              // Corrigir o totalItems
              totalItems = 1 + scriptsCount + forcedOptsCount;
              console.log('[Optimization] VIP: totalItems corrigido para:', totalItems);
            }
            
            // Agora que temos o totalItems, mostrar overlay com o total correto
            console.log('[Optimization] VIP: Mostrando overlay com totalItems:', totalItems);
            optimizeButtonState(true);
            showOptimizeOverlay('VIP');
            // Atualizar overlay imediatamente com 0/totalItems
            // IMPORTANTE: Forçar atualização imediata para garantir que mostra 0/225
            updateOptimizeOverlay(0, `Iniciando otimização VIP... (0/${totalItems})`);
            
            // Garantir que o subtitle foi atualizado corretamente
            if (optimizeSubtitle) {
              optimizeSubtitle.textContent = `Iniciando otimização VIP... (0/${totalItems})`;
              console.log('[Optimization] VIP: Subtitle atualizado para:', optimizeSubtitle.textContent);
            }
            
            // Resetar entradas de otimização
            optimizationEntries = [];
            if (optimizeResults) optimizeResults.innerHTML = '';
            if (optimizeSummary) optimizeSummary.hidden = true;
            if (optimizeLog) optimizeLog.hidden = false;
            
            let currentItem = 0;
            
            // 1) Executar RAM Booster escolhido (dentro do overlay)
            {
              currentItem++;
              const ramBoosterName = document.querySelector(`input[name="vip-preset"]:checked + span`)?.textContent || 'RAM Booster';
              console.log('[Optimization] VIP: Executando RAM Booster:', ramBoosterName);
              updateOptimizeOverlay(Math.round((currentItem / totalItems) * 100), `Executando: ${ramBoosterName}... (${currentItem}/${totalItems})`);
              addOptimizationLogEntry(ramBoosterName, 'executing');
              
              try {
                const res = await window.y20.optimizationPackRunOne(selectedId);
                if (!res || !res.success) {
                  throw new Error(res?.message || 'Falha ao aplicar RAM Booster');
                }
                console.log('[Optimization] VIP: RAM Booster executado com sucesso');
                updateOptimizationLogEntry(ramBoosterName, 'success', 'Pronto! ✓');
                
                // Atualizar porcentagem de otimização em tempo real após RAM Booster
                try {
                  const scoreResult = await window.y20?.calculateOptimizationScore?.();
                  if (scoreResult !== undefined) {
                    setGaugeValue(scoreResult);
                    console.log('[Optimization] VIP: Porcentagem atualizada (tempo real) após RAM Booster:', scoreResult);
                  }
                } catch (scoreError) {
                  console.warn('[Optimization] VIP: Erro ao atualizar porcentagem em tempo real:', scoreError);
                }
              } catch (error) {
                console.error('[Optimization] VIP: Erro ao executar RAM Booster:', error);
                updateOptimizationLogEntry(ramBoosterName, 'error', 'Erro');
                throw error;
              }
            }
            
            // 2) IMPORTANTE: Registrar listener do VIP ANTES de chamar runOptimizationPack
            // Isso garante que o listener esteja ativo antes de qualquer payload chegar
            console.log('[Optimization] VIP: Registrando listener antes de executar pacote...');
            
            // Criar uma flag para indicar que o listener VIP está ativo
            window._vipOptimizationListenerActive = true;
            window._vipOptimizationTotalItems = totalItems;
            window._vipOptimizationStartIndex = currentItem;
            
            // Registrar listener temporário para capturar o totalItems correto
            if (window.y20?.onOptimizationProgress) {
              // Registrar listener que será usado pelo runOptimizationPack
              window.y20.onOptimizationProgress(async (payload) => {
                console.log('[Optimization] VIP Listener (pré-registrado): Evento recebido:', payload);
                
                if (payload && typeof payload === 'object' && window._vipOptimizationListenerActive) {
                  const vipTotalItems = window._vipOptimizationTotalItems;
                  const vipStartIndex = window._vipOptimizationStartIndex || 0;
                  
                  console.log('[Optimization] VIP Listener: vipTotalItems=', vipTotalItems, ', vipStartIndex=', vipStartIndex);
                  
                  if (vipTotalItems > 0 && vipStartIndex >= 0) {
                    // Extrair informações do payload (suporta diferentes formatos)
                    // O backend pode enviar eventos do tipo 'step' (do executeOptimizationPack) ou 'executing'/'success' (do optimization-pack.js)
                    let percent = 0;
                    let scriptName = 'Script';
                    let payloadCurrent = 0;
                    
                    // Processar eventos do tipo 'step' (vindos do executeOptimizationPack)
                    if (payload.type === 'step') {
                      scriptName = payload.displayLabel || payload.label || 'Script';
                      if (payload.index !== undefined && payload.total !== undefined) {
                        percent = Math.round((payload.index / payload.total) * 100);
                        payloadCurrent = payload.index;
                      }
                    } 
                    // Processar eventos do tipo 'executing', 'success', etc (vindos do optimization-pack.js)
                    else if (payload.type === 'executing' || payload.type === 'success' || payload.type === 'error' || payload.type === 'admin_required') {
                      scriptName = payload.script || 'Script';
                      if (payload.percent !== undefined) {
                        percent = payload.percent;
                      }
                      if (payload.current !== undefined && payload.current !== null) {
                        payloadCurrent = payload.current;
                      } else if (payload.total !== undefined && percent > 0) {
                        payloadCurrent = Math.max(1, Math.round((percent / 100) * payload.total));
                      }
                    }
                    // Fallback para outros formatos
                    else {
                      scriptName = payload.script || payload.displayLabel || payload.label || 'Script';
                      if (payload.percent !== undefined) {
                        percent = payload.percent;
                      }
                      if (payload.current !== undefined && payload.current !== null) {
                        payloadCurrent = payload.current;
                      } else if (payload.index !== undefined) {
                        payloadCurrent = payload.index;
                      }
                    }
                    
                    const scriptsRange = vipTotalItems - vipStartIndex;
                    
                    // Se não conseguiu calcular payloadCurrent, tentar calcular do percent
                    if (payloadCurrent === 0 && percent > 0 && scriptsRange > 0) {
                      payloadCurrent = Math.max(1, Math.round((percent / 100) * scriptsRange));
                    } else if (payloadCurrent === 0) {
                      payloadCurrent = 1; // Default mínimo
                    }
                    
                    // Calcular currentItemDisplay baseado no totalItems completo
                    const currentItemDisplay = vipStartIndex + payloadCurrent;
                    const adjustedPercent = Math.round((currentItemDisplay / vipTotalItems) * 100);
                    
                    // Determinar mensagem de status
                    let statusMessage = 'Aguarde, a otimização está em andamento...';
                    if (payload.type === 'executing' || payload.status === 'Executando...' || (payload.type === 'step' && payload.status === 'start')) {
                      statusMessage = `Executando: ${scriptName}... (${currentItemDisplay}/${vipTotalItems})`;
                    } else if (payload.type === 'success' || payload.status === 'Pronto!' || (payload.type === 'step' && payload.status === 'done')) {
                      statusMessage = `Concluído: ${scriptName} (${currentItemDisplay}/${vipTotalItems})`;
                    } else if (payload.type === 'step') {
                      statusMessage = `Continuando com scripts .bat... (${currentItemDisplay}/${vipTotalItems})`;
                    }
                    
                    // Atualizar overlay com totalItems correto
                    console.log(`[Optimization] VIP Listener: Atualizando overlay - ${adjustedPercent}% - ${statusMessage}`);
                    updateOptimizeOverlay(adjustedPercent, statusMessage);
                    
                    // Adicionar entrada no log se for evento de execução
                    if (payload.type === 'executing' || (payload.type === 'step' && payload.status === 'start')) {
                      addOptimizationLogEntry(scriptName, 'executing');
                    } else if (payload.type === 'success' || (payload.type === 'step' && payload.status === 'done')) {
                      updateOptimizationLogEntry(scriptName, 'success', 'Pronto! ✓');
                    } else if (payload.type === 'error' || (payload.type === 'step' && payload.status === 'error')) {
                      updateOptimizationLogEntry(scriptName, 'error', 'Erro');
                    } else if (payload.type === 'admin_required') {
                      updateOptimizationLogEntry(scriptName, 'admin_required', 'Pronto! ✓');
                    }
                    
                    console.log(`[Optimization] VIP Listener: type=${payload.type}, current=${payload.current}, index=${payload.index}, total=${payload.total}, vipStartIndex=${vipStartIndex}, payloadCurrent=${payloadCurrent}, currentItemDisplay=${currentItemDisplay}, vipTotalItems=${vipTotalItems}, adjustedPercent=${adjustedPercent}%`);
                  } else {
                    console.warn('[Optimization] VIP Listener: vipTotalItems ou vipStartIndex inválidos', { vipTotalItems, vipStartIndex });
                  }
                } else {
                  console.log('[Optimization] VIP Listener: Ignorando evento (não é VIP ou listener não está ativo)');
                }
              });
              console.log('[Optimization] VIP: Listener pré-registrado com totalItems=', totalItems, ', startIndex=', currentItem);
            }
            
            // 2) Aplicar pacote VIP completo (dentro do overlay, sem fechar)
            // O runOptimizationPack vai executar os scripts .bat e mostrar no overlay
            // Passar currentItem e totalItems para calcular progresso correto
            console.log('[Optimization] Executando pacote VIP completo...');
            let scriptsExecutedCount = 0;
            let packOptimizationScore = null;
            try {
              const packResult = await runOptimizationPack('Otimização Vip', true, currentItem, totalItems); // true = não fechar overlay
              // Obter número de scripts executados do resultado
              if (packResult?.applied !== undefined) {
                scriptsExecutedCount = packResult.applied;
              } else if (packResult?.scripts && Array.isArray(packResult.scripts)) {
                scriptsExecutedCount = packResult.scripts.length;
              } else {
                // Se não conseguir do resultado, estimar baseado nos scripts esperados
                scriptsExecutedCount = (powerPlanState.apply?.length || 0) + 
                                      (cleanupWindowsState.apply?.length || 0) + 
                                      (disableWindowsState.apply?.length || 0) + 
                                      (importantScriptsState.items?.length || 0);
              }
              // Guardar score retornado pelo pack (já atualizado no backend)
              if (packResult?.optimizationScore !== undefined) {
                packOptimizationScore = packResult.optimizationScore;
                console.log('[Optimization] VIP: Score retornado pelo pack:', packOptimizationScore);
              }
            } catch (error) {
              console.error('[Optimization] Erro ao executar pacote VIP:', error);
              showToast('Erro ao executar otimização VIP: ' + (error.message || 'Erro desconhecido'), 'error');
              throw error;
            }
            
            // Atualizar currentItem após scripts .bat - CONTINUAR ACUMULANDO, NÃO RESETAR
            // currentItem já era 1 (RAM Booster), então adicionamos os scripts executados
            currentItem = currentItem + scriptsExecutedCount;
            
            console.log('[Optimization] VIP: Scripts .bat concluídos:', scriptsExecutedCount, '| CurrentItem agora:', currentItem, '| TotalItems:', totalItems);
            console.log('[Optimization] VIP: Verificação - RAM Booster (1) + Scripts (' + scriptsExecutedCount + ') =', currentItem, '| Total esperado:', totalItems);
            
            // 3) Executar otimizações forçadas (dentro do overlay)
            // executeVipForcedOptimizations já mostra o progresso no overlay
            // Passar currentItem (número de itens já executados) e totalItems (total incluindo forçadas)
            await executeVipForcedOptimizations(currentItem, totalItems);
            
            // 4) Mostrar resumo e depois fechar overlay e mostrar modal de serviços
            // Contar resultados do log
            const logEntries = optimizeResults?.querySelectorAll('li.optimize-log-entry') || [];
            let appliedCount = 0;
            let failedCount = 0;
            let skippedCount = 0;
            
            logEntries.forEach(entry => {
              const statusSpan = entry.querySelector('.log-status');
              if (statusSpan) {
                const statusText = statusSpan.textContent || '';
                if (statusText.includes('Pronto') || statusText.includes('✓')) {
                  appliedCount++;
                } else if (statusText.includes('Erro')) {
                  failedCount++;
                } else if (statusText.includes('⚠')) {
                  skippedCount++;
                }
              }
            });
            
            const finalResults = {
              applied: appliedCount,
              failed: failedCount,
              skipped: skippedCount
            };
            
            // Atualizar porcentagem de otimização após VIP completo - IMEDIATAMENTE E FORÇADAMENTE
            // O runOptimizationPack já chamou increaseOptimizationScore('vip') no backend
            // MAS também precisamos aumentar após as otimizações forçadas
            try {
              console.log('[Optimization] VIP: Atualizando porcentagem IMEDIATAMENTE após otimização completa...');
              
              // PRIMEIRO: Usar o score retornado pelo pack se disponível
              if (packOptimizationScore !== null && packOptimizationScore !== undefined) {
                setGaugeValue(packOptimizationScore);
                console.log('[Optimization] VIP: Porcentagem atualizada (do pack) para:', packOptimizationScore);
              }
              
              // SEGUNDO: Buscar do backend imediatamente (sem delay)
              const scoreResult = await window.y20?.calculateOptimizationScore?.();
              if (scoreResult !== undefined) {
                setGaugeValue(scoreResult);
                console.log('[Optimization] VIP: Porcentagem atualizada (backend) para:', scoreResult);
              }
              
              // TERCEIRO: Forçar atualização novamente após pequeno delay para garantir
              setTimeout(async () => {
                try {
                  const finalScore = await window.y20?.calculateOptimizationScore?.();
                  if (finalScore !== undefined) {
                    setGaugeValue(finalScore);
                    console.log('[Optimization] VIP: Porcentagem atualizada (final) para:', finalScore);
                  }
                } catch (finalError) {
                  console.error('[Optimization] VIP: Erro ao buscar score (final):', finalError);
                }
              }, 300);
              
              // QUARTO: Atualização adicional após delay maior para garantir persistência
              setTimeout(async () => {
                try {
                  const persistentScore = await window.y20?.calculateOptimizationScore?.();
                  if (persistentScore !== undefined) {
                    setGaugeValue(persistentScore);
                    console.log('[Optimization] VIP: Porcentagem atualizada (persistente) para:', persistentScore);
                  }
                } catch (persistentError) {
                  console.error('[Optimization] VIP: Erro ao buscar score (persistente):', persistentError);
                }
              }, 1000);
            } catch (scoreError) {
              console.error('[Optimization] VIP: Erro ao atualizar porcentagem:', scoreError);
              // Tentar buscar novamente mesmo com erro
              try {
                const fallbackScore = await window.y20?.calculateOptimizationScore?.();
                if (fallbackScore !== undefined) {
                  setGaugeValue(fallbackScore);
                  console.log('[Optimization] VIP: Porcentagem atualizada (fallback) para:', fallbackScore);
                }
              } catch (fallbackError) {
                console.error('[Optimization] VIP: Erro ao buscar score (fallback):', fallbackError);
              }
            }
            
            // Mostrar resumo e manter overlay aberto até o usuário confirmar
            showOptimizationSummary(finalResults, false);
          } catch (error) {
            console.error('[VIP] Erro na otimização:', error);
            showToast(error.message || 'Erro ao executar otimização VIP', 'error');
            hideOptimizeOverlay();
          } finally {
            window._vipOptimizationInProgress = false;
            optimizeButtonState(false);
            // Restaurar botão VIP após execução
            if (optimizeVipButton) {
              optimizeVipButton.disabled = false;
              optimizeVipButton.innerHTML = '<span class="btn-icon">⭐</span><span>Otimizar VIP</span>';
              optimizeVipButton.style.opacity = '1';
              optimizeVipButton.style.cursor = 'pointer';
            }
          }
        };
        // Abrir modal
        if (vipModal) vipModal.hidden = false;
      } catch (e) {
        console.error('[VIP] Erro ao preparar fluxo VIP:', e);
        showToast('Erro ao preparar Otimização VIP.', 'error');
        // Restaurar botão em caso de erro
        if (optimizeVipButton) {
          optimizeVipButton.disabled = false;
          optimizeVipButton.innerHTML = '<span class="btn-icon">⭐</span><span>Otimizar VIP</span>';
          optimizeVipButton.style.opacity = '1';
          optimizeVipButton.style.cursor = 'pointer';
        }
      }
    });
    optimizeVipButton.dataset.bound = 'true';
  } else if (!optimizeVipButton) {
    console.warn('[Optimization] Botão optimize-vip não encontrado!');
  }

  if (vipConfirmButton && !vipConfirmButton.dataset.bound) {
    vipConfirmButton.addEventListener('click', async () => {
      const selected = document.querySelector('input[name="vip-preset"]:checked');
      if (!selected) {
        showToast('Selecione uma opção antes de aplicar.', 'warning');
        return;
      }
      
      vipConfirmButton.disabled = true;
      vipConfirmButton.textContent = 'Aplicando...';
      
      try {
        if (typeof vipOnConfirm === 'function') {
          // vipOnConfirm já fecha o modal e gerencia o overlay
          await vipOnConfirm(selected.value);
          vipOnConfirm = null;
          // Não mostrar toast aqui, pois o vipOnConfirm já gerencia tudo
        } else {
          // Fluxo antigo: NÚCLEOS
          const result = await window.y20.optimizationPackRunNucleos(selected.value);
          if (result?.success) {
            closeVipModal();
            hideOptimizeOverlay();
            showToast('Otimização VIP concluída com sucesso!', 'success');
          } else {
            showToast(result?.message || 'Erro ao aplicar script de núcleos', 'error');
          }
        }
      } catch (error) {
        console.error('[VIP] Erro ao aplicar:', error);
        showToast(error.message || 'Erro ao aplicar', 'error');
      } finally {
        vipConfirmButton.disabled = false;
        vipConfirmButton.textContent = 'Aplicar';
      }
    });
    vipConfirmButton.dataset.bound = 'true';
  }

  if (vipCancelButton && !vipCancelButton.dataset.bound) {
    vipCancelButton.addEventListener('click', () => {
      closeVipModal();
    });
    vipCancelButton.dataset.bound = 'true';
  }

  // Handlers para modal de confirmação de cancelamento
  if (cancelConfirmContinueBtn && !cancelConfirmContinueBtn.dataset.bound) {
    cancelConfirmContinueBtn.addEventListener('click', async () => {
      hideCancelConfirmationModal();
      try {
        await window.y20.optimizeContinue?.();
        if (optimizeCancelButton) {
          optimizeCancelButton.disabled = false;
          optimizeCancelButton.textContent = 'Cancelar';
        }
      } catch (error) {
        console.error('[Optimization] Erro ao continuar:', error);
        showToast('Não foi possível continuar a otimização.', 'error');
      }
    });
    cancelConfirmContinueBtn.dataset.bound = 'true';
  }

  if (cancelConfirmCancelBtn && !cancelConfirmCancelBtn.dataset.bound) {
    cancelConfirmCancelBtn.addEventListener('click', async () => {
      hideCancelConfirmationModal();
      try {
        await window.y20.optimizeCancelConfirmed?.();
        hideOptimizeOverlay();
        showToast('Otimização cancelada.', 'info');
      } catch (error) {
        console.error('[Optimization] Erro ao cancelar:', error);
        showToast('Não foi possível cancelar a otimização.', 'error');
      }
    });
    cancelConfirmCancelBtn.dataset.bound = 'true';
  }
}

function ensureOptimizationControls() {
  if (!optimizationControlsInitialized) {
    bindOptimizationControls();
    optimizationControlsInitialized = true;
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    ensureOptimizationControls();
  });
} else {
  ensureOptimizationControls();
}

if (openDevToolsButton) {
  openDevToolsButton.addEventListener('click', async () => {
    try {
      await window.y20.openDevTools?.();
    } catch (error) {
      showToast('Não foi possível abrir os logs.', 'error');
    }
  });
}

// Controlar painel de logs
function initializeLogsPanel() {
  try {
    // Garantir que o painel exista
    const panel = createLogsPanel();
    
    if (!panel) {
      console.error('Erro: createLogsPanel retornou null/undefined');
      return;
    }
    
    // Adicionar event listeners
    const toggleBtn = document.getElementById('toggle-logs-panel');
    if (toggleBtn) {
      try {
        // Remover listeners anteriores adicionando novo listener diretamente
        // (cloneNode não copia event listeners, então podemos adicionar diretamente)
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const panel = document.getElementById('logs-panel');
            if (panel) {
              const isHidden = panel.hidden || panel.style.display === 'none' || window.getComputedStyle(panel).display === 'none';
              
              if (isHidden) {
                // Não limpar logs ao abrir o painel - manter histórico da sessão
                
                // Mostrar painel
                panel.hidden = false;
                panel.style.display = 'block';
                panel.style.visibility = 'visible';
                // Log removido - não necessário
              } else {
                // Esconder painel
                panel.hidden = true;
                panel.style.display = 'none';
                // Log removido - não necessário
              }
            } else {
              console.error('Painel de logs não encontrado ao clicar no botão');
            }
          });
          
          // Log removido - não necessário
        } catch (error) {
          console.error('Erro ao adicionar event listener ao botão toggle:', error);
        }
    } else {
      console.error('Botão toggle-logs-panel não encontrado no DOM');
    }
    
    const closeBtn = document.getElementById('close-logs-panel');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const panel = document.getElementById('logs-panel');
        if (panel) {
          panel.hidden = true;
          panel.style.display = 'none';
          // Log removido - não necessário
        }
      });
    }
    
    const clearBtn = document.getElementById('clear-logs');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const content = document.getElementById('logs-content');
        if (content) {
          content.innerHTML = '';
          addLogEntry('Logs limpos pelo usuário', 'info');
        }
      });
    }
    
    // Log removido - não necessário
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Erro na função initializeLogsPanel:', errorMsg, errorStack || error);
    throw error; // Re-throw para ser capturado pelo try-catch externo
  }
}

// Inicializar painel de logs quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeLogsPanel();
    initializeWindowControls(); // Inicializar controles de janela
    initializeLoginElements(); // Inicializar elementos de login
    // Não abrir painel automaticamente - usuário pode abrir com Ctrl+Shift+L
  });
} else {
  initializeLogsPanel();
  initializeWindowControls(); // Inicializar controles de janela
  initializeLoginElements(); // Inicializar elementos de login
  // Não abrir painel automaticamente - usuário pode abrir com Ctrl+Shift+L
}

// Aguardar window.y20 estar disponível antes de inicializar
function waitForY20(callback, maxAttempts = 50, attempt = 0) {
  if (window.y20) {
    console.log('[Renderer] window.y20 disponível após', attempt, 'tentativas');
    callback();
  } else if (attempt < maxAttempts) {
    setTimeout(() => waitForY20(callback, maxAttempts, attempt + 1), 100);
  } else {
    console.error('[Renderer] window.y20 não ficou disponível após', maxAttempts, 'tentativas');
    callback(); // Executar mesmo assim para não bloquear a inicialização
  }
}

// Inicializar painel de logs quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    waitForY20(() => {
      initializeLogsPanel();
      initializeWindowControls(); // Inicializar controles de janela
      initializeLoginElements(); // Inicializar elementos de login
      initializeOfflineScreen(); // Inicializar tela de offline
      // Não abrir painel automaticamente - usuário pode abrir com Ctrl+Shift+L
    });
  });
} else {
  waitForY20(() => {
    initializeLogsPanel();
    initializeWindowControls(); // Inicializar controles de janela
    initializeLoginElements(); // Inicializar elementos de login
    initializeOfflineScreen(); // Inicializar tela de offline
    // Não abrir painel automaticamente - usuário pode abrir com Ctrl+Shift+L
  });
}

// Inicializar tela de offline
function initializeOfflineScreen() {
  const offlineRetryButton = document.getElementById('offline-retry');
  if (offlineRetryButton) {
    offlineRetryButton.addEventListener('click', async () => {
      console.log('[Bot] Tentando verificar status do bot novamente...');
      const botStatus = await checkBotStatus();
      if (botStatus && botStatus.online) {
        hideOfflineScreen();
        try {
          await checkAuthentication();
        } catch (error) {
          console.error('[Renderer] Erro ao verificar autenticação após bot voltar online:', error);
        }
      } else {
        showToast('O bot ainda está offline. Tente novamente mais tarde.', 'error');
      }
    });
  }
}

// Adicionar atalho de teclado para abrir/fechar o painel de logs (Ctrl+Shift+L)
// Event listener global de teclado - funciona em qualquer tela
// Usar window.addEventListener com capture phase para garantir que seja executado primeiro

// Adicionar event listener de teclado quando window.y20 estiver disponível
waitForY20(() => {
  console.log('[Renderer] window.y20 disponível?', !!window.y20);
  console.log('[Renderer] window.y20.openDevTools disponível?', !!(window.y20 && window.y20.openDevTools));
  
  // Adicionar event listener de teclado global
  window.addEventListener('keydown', (e) => {
    // Verificar se está em modo desenvolvimento (não compilado)
    // Em produção, bloquear TODOS os atalhos de DevTools
    const isDevMode = window.location.protocol === 'file:' || 
                      window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      !navigator.userAgent.includes('Electron');
    
    // Atalho para DevTools (F12) - BLOQUEADO em produção
    if (e.key === 'F12') {
      if (!isDevMode) {
        // Em produção, bloquear F12 completamente
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
      
      // Em desenvolvimento, permitir abrir DevTools
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Renderer] F12 pressionado, abrindo DevTools...');
      console.log('[Renderer] window.y20 disponível?', !!window.y20);
      console.log('[Renderer] window.y20.openDevTools disponível?', !!(window.y20 && window.y20.openDevTools));
      
      if (window.y20 && window.y20.openDevTools) {
        window.y20.openDevTools().then((result) => {
          console.log('[Renderer] DevTools aberto com sucesso. Resultado:', result);
        }).catch(err => {
          console.error('[Renderer] Erro ao abrir DevTools:', err);
        });
      } else {
        console.error('[Renderer] window.y20.openDevTools não está disponível!');
        console.error('[Renderer] window.y20:', window.y20);
      }
      return false;
    }
    
    // Atalho para DevTools (Ctrl+Shift+I) - BLOQUEADO em produção
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      if (!isDevMode) {
        // Em produção, bloquear Ctrl+Shift+I completamente
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
      
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      console.log('[Renderer] Ctrl+Shift+I pressionado, abrindo DevTools...');
      console.log('[Renderer] window.y20 disponível?', !!window.y20);
      console.log('[Renderer] window.y20.openDevTools disponível?', !!(window.y20 && window.y20.openDevTools));
      
      if (window.y20 && window.y20.openDevTools) {
        window.y20.openDevTools().then((result) => {
          console.log('[Renderer] DevTools aberto com sucesso. Resultado:', result);
        }).catch(err => {
          console.error('[Renderer] Erro ao abrir DevTools:', err);
        });
      } else {
        console.error('[Renderer] window.y20.openDevTools não está disponível!');
        console.error('[Renderer] window.y20:', window.y20);
      }
      return false;
    }
    
    // Atalho para Logs (Ctrl+Shift+L) - só funciona quando o app shell estiver visível
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
      const appShell = document.getElementById('app-shell');
      if (appShell && !appShell.hidden) {
        e.preventDefault();
        e.stopPropagation();
        const panel = document.getElementById('logs-panel');
        const button = document.getElementById('toggle-logs-panel');
        if (panel && button) {
          button.click();
        }
      }
      return;
    }
  }, true); // Usar capture phase para garantir que seja executado primeiro
  
  console.log('[Renderer] Event listener de teclado adicionado');
}, 50);

const optimizeProceedButton = document.getElementById('optimize-proceed');
if (optimizeProceedButton) {
  optimizeProceedButton.addEventListener('click', () => {
    hideOptimizeOverlay();
    showToast('Scripts que exigem administrador foram ignorados.', 'info');
  });
}

function applyInitialState(state) {
  currentLanguage = state.language || localStorage.getItem('y20-language') || 'pt-BR';
  currentPalette = state.palette || localStorage.getItem('y20-palette') || 'royal';
  
  // Carregar neon do state ou localStorage
  const savedNeon = localStorage.getItem('y20-neon');
  if (state.neonEnabled !== undefined) {
    isNeonEnabled = state.neonEnabled;
  } else if (savedNeon !== null) {
    isNeonEnabled = savedNeon === 'true';
  } else {
    isNeonEnabled = false; // Padrão desativado
  }
  
  // Se não há otimizações salvas, inicializar todas como ativas (true)
  if (!state.optimizations || Object.keys(state.optimizations).length === 0) {
    currentOptimizations = {};
    optimizationItems.forEach(item => {
      currentOptimizations[item.key] = true;
    });
  } else {
    currentOptimizations = state.optimizations || {};
  }

  document.body.setAttribute('data-palette', currentPalette || 'royal');
  document.body.setAttribute('data-neon', isNeonEnabled ? 'on' : 'off');
  
  // Atualizar toggle neon sem disparar evento
  // Botão Neon removido da UI
  
  // Forçar atualização visual
  updateNeonEffects();
  updatePaletteColors();

  applyLanguage(currentLanguage);
  renderOptimizations();
  setGaugeValue(state.optimizationScore || 0);
  
  // Verificar e atualizar score periodicamente (para aplicar degradação)
  startOptimizationScoreUpdates();

  // Não mostrar termos aqui - será mostrado após login
}

let optimizationScoreUpdateInterval = null;

function startOptimizationScoreUpdates() {
  // Limpar intervalo anterior se existir
  if (optimizationScoreUpdateInterval) {
    clearInterval(optimizationScoreUpdateInterval);
  }
  
  // Verificar e atualizar score a cada 30 minutos (degradação ocorre a cada 4 horas)
  optimizationScoreUpdateInterval = setInterval(async () => {
    try {
      const result = await window.y20.getSystemInfo();
      if (result && result.optimizationScore !== undefined) {
        setGaugeValue(result.optimizationScore, true); // Atualizar com animação
      }
    } catch (error) {
      // Ignorar erro silenciosamente
    }
  }, 30 * 60 * 1000); // 30 minutos
}

function stopOptimizationScoreUpdates() {
  if (optimizationScoreUpdateInterval) {
    clearInterval(optimizationScoreUpdateInterval);
    optimizationScoreUpdateInterval = null;
  }
}

function stopGaugeAnimation() {
  if (gaugeAnimationInterval) {
    clearInterval(gaugeAnimationInterval);
    gaugeAnimationInterval = null;
  }
}

let bootExecuted = false; // Flag para evitar execução múltipla do boot

async function boot() {
  // Evitar execução múltipla
  if (bootExecuted) {
    console.log('[Renderer] boot() já foi executado, ignorando...');
    return;
  }
  
  bootExecuted = true;
  console.log('[Renderer] Função boot() chamada');
  try {
    document.body.classList.add('booting');
    console.log('[Renderer] Obtendo estado inicial...');
    const initialState = await window.y20.getInitialState();
    console.log('[Renderer] Estado inicial obtido:', initialState);
    applyInitialState(initialState);
    console.log('[Renderer] Estado inicial aplicado');
    
    // Não atualizar system info imediatamente para evitar erros
    // Limpar intervalo anterior se existir
    if (systemInfoInterval) {
      clearInterval(systemInfoInterval);
      systemInfoInterval = null;
    }
    
        // Carregar informações do sistema apenas uma vez (não em tempo real)
        setTimeout(async () => {
          try {
            await refreshSystemInfo();
          } catch (error) {
            // Ignorar erro silenciosamente
          }
        }, 1000);
    
    if (bsVerifyButton) {
      setTimeout(() => {
        verifyBlueStacks(false);
      }, 2000);
    }
    
    // Inicializar tooltips com imagem
    setTimeout(() => {
      initializeImageTooltips();
    }, 500);
  } catch (error) {
    console.error('[Renderer] Erro na função boot():', error);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Renderer] DOMContentLoaded disparado');
  // Forçar tema premium minimal
  try {
    document.body.setAttribute('data-theme', 'premium');
    // Não forçar neon off aqui - será carregado do localStorage/state
  } catch {}
  
  // Inicializar tooltips com imagem
  setTimeout(() => {
    initializeImageTooltips();
  }, 1000);

  // Iniciar atualização de system info imediatamente e garantir loop de 1s
  try {
    // primeira atualização rápida
    setTimeout(() => {
      refreshSystemInfo().catch(err => console.error('[Renderer] Erro no refresh inicial:', err));
    }, 300);

    // REMOVIDO: Loop de atualização em tempo real (causava travamentos)
    // Informações do sistema são carregadas apenas uma vez na inicialização
  } catch (e) {
    console.error('[Renderer] Falha ao iniciar loop de system info:', e);
  }
  try {
    document.body.classList.add('booting');
    
    // Inicializar elementos de login
    console.log('[Renderer] Inicializando elementos de login...');
    initializeLoginElements();
    console.log('[Renderer] Elementos de login inicializados');
    
    // SEMPRE esconder login overlay - painel abre direto sem key (GRATUITO)
    if (loginOverlay) {
      loginOverlay.hidden = true;
      loginOverlay.style.display = 'none';
      loginOverlay.style.visibility = 'hidden';
    }
    
    // Se não tiver key, abrir painel com acesso simples
    // Se tiver key, vai mostrar welcome screen
  } catch (error) {
    console.error('[Renderer] Erro no DOMContentLoaded:', error);
  }
});

// Sistema de Login - Variáveis já declaradas no topo do arquivo

function initializeLoginElements() {
  loginOverlay = document.getElementById('login-overlay');
  appShell = document.getElementById('app-shell');
  keyInput = document.getElementById('key-input');
  loginButton = document.getElementById('login-button');
  loginStatus = document.getElementById('login-status');
  loginStatusMessage = document.getElementById('login-status-message');
  
  // Inicializar controles de janela
  initializeWindowControls();
  
  // Event listeners
  if (loginButton) {
    loginButton.addEventListener('click', handleLogin);
  }

  if (keyInput) {
    keyInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !loginButton?.disabled) {
        handleLogin();
      }
    });
  }
  
  // Inicializar listener do botão de ativar key no card top (substitui user card)
  const dashboardActivateBtnTop = document.getElementById('dashboard-activate-key-btn-top');
  const dashboardKeyInputTop = document.getElementById('dashboard-key-input-top');
  
  if (dashboardActivateBtnTop) {
    dashboardActivateBtnTop.addEventListener('click', handleDashboardKeyActivationTop);
  }
  
  if (dashboardKeyInputTop) {
    dashboardKeyInputTop.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !dashboardActivateBtnTop?.disabled) {
        handleDashboardKeyActivationTop();
      }
    });
  }
  
  // Inicializar botão "Tentar novamente" do card de manutenção
  const maintenanceRetryBtn = document.getElementById('api-maintenance-retry-btn');
  if (maintenanceRetryBtn) {
    // Remover listener anterior se existir (clonar para remover)
    const newBtn = maintenanceRetryBtn.cloneNode(true);
    if (maintenanceRetryBtn.parentNode) {
      maintenanceRetryBtn.parentNode.replaceChild(newBtn, maintenanceRetryBtn);
    }
    
    newBtn.addEventListener('click', async () => {
      try {
        newBtn.disabled = true;
        newBtn.innerHTML = '<span>⏳ Verificando...</span>';
        
        // Verificar status da API
        const apiStatus = await checkVIPOfflineStatus();
        
        if (apiStatus && apiStatus.apiOnline) {
          showToast('✅ API está online! Acessos restaurados.', 'success');
          hideApiOfflineBanner();
          
          // Recarregar informações da key se tiver
          const keyResult = await window.y20.checkAccessKey().catch(() => ({ hasKey: false }));
          if (keyResult && keyResult.hasKey && keyResult.valid) {
            // Recarregar página para restaurar acessos
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } else {
          showToast('⚠️ API ainda está offline. Tente novamente em alguns instantes.', 'warning');
          newBtn.disabled = false;
          newBtn.innerHTML = '<span>🔄 Tentar novamente</span>';
        }
      } catch (error) {
        console.error('[Renderer] Erro ao verificar API:', error);
        showToast('Erro ao verificar API: ' + error.message, 'error');
        newBtn.disabled = false;
        newBtn.innerHTML = '<span>🔄 Tentar novamente</span>';
      }
    });
  }
}

async function checkBotStatus() {
  try {
    if (!window.y20 || !window.y20.checkBotStatus) {
      console.warn('[Bot] Função checkBotStatus não disponível');
      return { online: false, error: 'Função não disponível' };
    }
    
    const result = await window.y20.checkBotStatus();
    console.log('[Bot] Status do bot:', result);
    return result;
  } catch (error) {
    console.error('[Bot] Erro ao verificar status do bot:', error);
    return { online: false, error: error.message };
  }
}

function showOfflineScreen() {
  // REATIVADO: Mostrar tela de bloqueio quando BOT está offline
  const offlineOverlay = document.getElementById('offline-overlay');
  
  // Garantir que login e welcome estão escondidos
  const loginOverlay = document.getElementById('login-overlay');
  const welcomeOverlay = document.getElementById('welcome-overlay');
  const appShell = document.getElementById('app-shell');
  
  if (loginOverlay) {
    loginOverlay.hidden = true;
    loginOverlay.style.display = 'none';
  }
  
  if (welcomeOverlay) {
    welcomeOverlay.hidden = true;
    welcomeOverlay.style.display = 'none';
  }
  
  if (appShell) {
    appShell.hidden = true;
    appShell.style.display = 'none';
  }
  
  if (offlineOverlay) {
    offlineOverlay.removeAttribute('hidden');
    offlineOverlay.style.display = 'flex';
    offlineOverlay.style.visibility = 'visible';
    offlineOverlay.style.opacity = '1';
    offlineOverlay.style.zIndex = '999999';
    
    // Garantir que o card também está visível
    const offlineCard = offlineOverlay.querySelector('.offline-card');
    if (offlineCard) {
      offlineCard.style.display = 'block';
      offlineCard.style.visibility = 'visible';
      offlineCard.style.opacity = '1';
    }
    
    console.log('[Bot] ❌ Bot offline - Painel BLOQUEADO com tela de aviso');
    console.log('[Bot] offlineOverlay display:', offlineOverlay.style.display);
    console.log('[Bot] offlineOverlay hidden:', offlineOverlay.hidden);
  } else {
    console.error('[Bot] ⚠️ offline-overlay não encontrado no DOM!');
  }
  
  // Atualizar mensagem do overlay
  const offlineTitle = offlineOverlay?.querySelector('.offline-content h1');
  const offlineMessage = offlineOverlay?.querySelector('.offline-content p');
  
  if (offlineTitle) {
    offlineTitle.textContent = 'Servidor Offline';
  }
  
  if (offlineMessage) {
    offlineMessage.textContent = 'O servidor está temporariamente indisponível. Por favor, aguarde alguns instantes e tente novamente.';
  }
}

function hideOfflineScreen() {
  const offlineOverlay = document.getElementById('offline-overlay');
  if (offlineOverlay) {
    offlineOverlay.hidden = true;
    offlineOverlay.style.display = 'none';
    offlineOverlay.style.visibility = 'hidden';
    offlineOverlay.style.opacity = '0';
    offlineOverlay.style.pointerEvents = 'none';
    offlineOverlay.style.zIndex = '-1';
  }
  console.log('[Bot] ✅ Tela de offline FORÇADA a esconder');
}

let botStatusCheckInterval = null;

function startBotStatusCheck() {
  if (botStatusCheckInterval) {
    clearInterval(botStatusCheckInterval);
  }
  
  botStatusCheckInterval = setInterval(async () => {
    const botStatus = await checkBotStatus();
    if (botStatus && botStatus.online) {
      hideOfflineScreen();
      // Quando o bot volta online, NÃO chamar checkAuthentication novamente
      // pois isso pode limpar a key se o banco foi resetado
      // Apenas verificar se já está autenticado, e se sim, manter autenticado
      // Se não, checkAuthentication será chamado normalmente no próximo ciclo
      
      // Parar o check de status do bot já que ele voltou online
      stopBotStatusCheck();
      
      // Verificar se há key local - se sim, apenas verificar se ainda é válida SEM limpar se o banco estiver limpo
      const storedKey = await window.y20.checkAccessKey();
      if (storedKey && storedKey.hasKey) {
        // Tem key local, verificar se ainda é válida
        try {
          const result = await window.y20.isAuthenticated();
          if (result && result.authenticated && result.valid && !result.notFound) {
            // Key ainda válida, manter autenticado
            console.log('[Bot] Bot voltou online e key ainda válida, mantendo autenticação');
            // Não fazer nada, apenas manter o estado atual
          } else if (result && result.notFound) {
            // Key não existe mais no banco, mas deixar que o usuário use temporariamente
            // O próximo checkAuthentication (que é chamado periodicamente) vai tratar isso
            console.log('[Bot] Bot voltou online mas key não encontrada no banco, mantendo key local temporariamente');
          }
        } catch (error) {
          console.error('[Bot] Erro ao verificar autenticação após bot voltar online:', error);
          // Manter key local em caso de erro
        }
      } else {
        // Não tem key local, chamar checkAuthentication normalmente
        try {
          await checkAuthentication();
        } catch (error) {
          console.error('[Renderer] Erro ao verificar autenticação no ciclo:', error);
        }
      }
    } else {
      showOfflineScreen();
    }
  }, 2 * 60 * 1000); // 2 minutos - otimizado para não sobrecarregar servidor com muitos usuários
}

function stopBotStatusCheck() {
  if (botStatusCheckInterval) {
    clearInterval(botStatusCheckInterval);
    botStatusCheckInterval = null;
  }
}

async function checkAuthentication() {
  try {
    // PRIMEIRO: Verificar se os termos foram aceitos (ANTES de tudo)
    // Se não foram aceitos, mostrar modal de termos e bloquear tudo
    if (window.y20) {
      try {
        const initialState = await window.y20.getInitialState();
        if (!initialState.termsAccepted) {
          console.log('[Auth] Termos não aceitos, mostrando modal de termos...');
          // Esconder login overlay
          if (loginOverlay) {
            loginOverlay.hidden = true;
            loginOverlay.style.display = 'none';
            loginOverlay.style.visibility = 'hidden';
          }
          // Mostrar modal de termos
          if (termsModal) {
            termsModal.hidden = false;
            termsModal.style.display = 'flex';
            termsModal.classList.add('show');
          }
          return; // Bloquear tudo até aceitar termos
        }
      } catch (termsError) {
        console.warn('[Auth] Erro ao verificar termos:', termsError);
        // Continuar mesmo com erro
      }
    }
    
    // Verificar se window.y20 está disponível
    if (!window.y20) {
      console.warn('[Auth] window.y20 não disponível, abrindo painel com acesso simples...');
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Aplicar "Bem vindo convidado"
      const heroNameElNoY20 = document.getElementById('hero-discord-name');
      const heroAvatarElNoY20 = document.getElementById('hero-discord-avatar');
      if (heroNameElNoY20) heroNameElNoY20.textContent = 'Convidado';
      if (heroAvatarElNoY20) {
        heroAvatarElNoY20.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElNoY20.style.display = 'block';
        heroAvatarElNoY20.hidden = false;
      }
      return;
    }
    
    // REMOVIDO: Verificação de bot Discord não bloqueia mais o painel
    // O painel agora funciona independente do bot Discord
    // Apenas a API Cloudflare é necessária
    console.log('[Auth] Painel independente do bot Discord - continuando verificação');
    hideOfflineScreen();
    
    // Garantir que os elementos estejam inicializados
    if (!loginOverlay || !appShell) {
      initializeLoginElements();
    }
    
    // PRIMEIRO: Verificar status da API ANTES de verificar a key
    // Isso garante que o painel já abre no estado correto (com ou sem key)
    let apiStatus;
    try {
      apiStatus = await checkVIPOfflineStatus();
    } catch (apiCheckError) {
      console.warn('[Auth] Erro ao verificar status da API:', apiCheckError);
      apiStatus = { apiOnline: false };
    }
    
    const isApiOnline = apiStatus && apiStatus.apiOnline === true;
    
    // PRIMEIRO: Sempre abrir o painel (com acesso simples se não tiver key)
    // Se não tem key, abrir painel com acesso limitado
    let storedKey;
    try {
      storedKey = await window.y20.checkAccessKey();
    } catch (checkError) {
      console.error('[Auth] Erro ao verificar key local:', checkError);
      // Em caso de erro, assumir que não tem key e abrir com acesso simples
      storedKey = { hasKey: false };
    }
    if (!storedKey || !storedKey.hasKey) {
      // Não tem key, mostrar animação de boas-vindas para convidado (sem gerar log)
      console.log('[Auth] Acessando painel sem key (acesso simples - GRATUITO)');
      // Garantir que login está escondido
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      
      // Mostrar animação de boas-vindas para convidado (não gera log de entrada)
      showWelcomeScreen(null); // Passar null para indicar que é convidado
      
      stopKeyValidation();
      return;
    }
    
    // Se API está offline, aplicar acesso simples imediatamente (mesmo tendo key)
    if (!isApiOnline) {
      console.log('[Auth] API está offline - aplicando acesso simples mesmo com key local');
      
      // Verificar se tem key VIP/Básico para mostrar aviso apropriado
      const hasVIPBasic = await hasVIPOrBasic().catch(() => false);
      
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      
      // Mostrar tela de boas-vindas com acesso simples (sem dados VIP)
      showWelcomeScreen(null); // Passar null para não mostrar dados VIP
      
      // Mostrar aviso informativo
      if (hasVIPBasic && typeof showToast === 'function') {
        setTimeout(() => {
          showToast('⚠️ API está offline. Você pode usar recursos normais (acesso simples).', 'warning');
        }, 3500); // Após a tela de boas-vindas
      }
      
      stopKeyValidation();
      return;
    }
    
    // Agora verificar com a API se tem acesso válido (sempre consultar servidor)
    // Mas só se window.y20 estiver disponível
    if (!window.y20 || !window.y20.isAuthenticated) {
      console.warn('[Auth] window.y20.isAuthenticated não disponível, abrindo painel com acesso simples...');
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Garantir que card de ativar key top está visível
      const activateKeyCardTop = document.getElementById('activate-key-card-top');
      const userCard = document.getElementById('user-card');
      if (activateKeyCardTop) activateKeyCardTop.style.display = 'block';
      if (userCard) userCard.style.display = 'none';
      
      // Aplicar "Bem vindo convidado"
      const heroNameElNoApi = document.getElementById('hero-discord-name');
      const heroAvatarElNoApi = document.getElementById('hero-discord-avatar');
      if (heroNameElNoApi) heroNameElNoApi.textContent = 'Convidado';
      if (heroAvatarElNoApi) {
        heroAvatarElNoApi.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElNoApi.style.display = 'block';
        heroAvatarElNoApi.hidden = false;
      }
      return;
    }
    
    let result;
    try {
      result = await window.y20.isAuthenticated();
    } catch (authError) {
      console.error('[Auth] Erro ao verificar autenticação:', authError);
      // Verificar se é erro de conexão (API offline)
      const isApiOfflineError = authError?.message && (
        authError.message.includes('conexão') || 
        authError.message.includes('timeout') || 
        authError.message.includes('ECONNREFUSED') || 
        authError.message.includes('ECONNRESET') ||
        authError.message.includes('Network') ||
        authError.message.includes('fetch')
      );
      
      if (isApiOfflineError && storedKey && storedKey.hasKey) {
        // API offline mas tem key - aplicar acesso simples e mostrar aviso
        console.log('[Auth] API offline detectada, mas há key local. Aplicando acesso simples...');
        
        // Verificar se tem key VIP/Básico para aplicar acesso simples
        const hasVIPBasic = await hasVIPOrBasic().catch(() => false);
        if (hasVIPBasic) {
          // Tem VIP/Básico - aplicar acesso simples e mostrar aviso
          await checkVIPOfflineStatus();
          
          // Mostrar aviso informativo
          if (typeof showToast === 'function') {
            showToast('⚠️ API está offline. Você pode usar recursos normais (acesso simples).', 'warning');
          }
        } else {
          // Não tem VIP/Básico, mas tem key - mostrar aviso genérico
          if (typeof showToast === 'function') {
            showToast('⚠️ API está offline. Algumas funcionalidades podem estar limitadas.', 'warning');
          }
        }
      }
      
      // Em caso de erro, abrir painel com acesso simples
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Garantir que card de ativar key top está visível
      const activateKeyCardTopError = document.getElementById('activate-key-card-top');
      const userCardError = document.getElementById('user-card');
      if (activateKeyCardTopError) activateKeyCardTopError.style.display = 'block';
      if (userCardError) userCardError.style.display = 'none';
      
      // Aplicar "Bem vindo convidado"
      const heroNameElError = document.getElementById('hero-discord-name');
      const heroAvatarElError = document.getElementById('hero-discord-avatar');
      if (heroNameElError) heroNameElError.textContent = 'Convidado';
      if (heroAvatarElError) {
        heroAvatarElError.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElError.style.display = 'block';
        heroAvatarElError.hidden = false;
      }
      return;
    }
    
    // Verificar se a key não foi encontrada no banco (foi removida/limpa)
    if (result && result.notFound) {
      console.log('[Auth] Key não encontrada no banco, removendo key local e abrindo painel com acesso simples...');
      // A key local já será limpa automaticamente pelo checkAccessKey quando detectar notFound
      
      // Não mostrar login, apenas abrir painel com acesso simples
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Garantir que card de ativar key top está visível
      const activateKeyCardTop = document.getElementById('activate-key-card-top');
      const userCard = document.getElementById('user-card');
      if (activateKeyCardTop) {
        activateKeyCardTop.style.display = 'block';
      }
      if (userCard) {
        userCard.style.display = 'none';
      }
      
      // Aplicar "Bem vindo convidado" no painel
      const heroNameElGuest = document.getElementById('hero-discord-name');
      const heroAvatarElGuest = document.getElementById('hero-discord-avatar');
      if (heroNameElGuest) {
        heroNameElGuest.textContent = 'Convidado';
      }
      if (heroAvatarElGuest) {
        // Avatar padrão para convidado
        heroAvatarElGuest.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElGuest.style.display = 'block';
        heroAvatarElGuest.hidden = false;
      }
      
      stopKeyValidation();
      stopBotStatusCheck();
      return;
    }
    
    if (result.authenticated && result.valid && !result.revoked && !result.expired) {
      // IMPORTANTE: Buscar dados do Discord ANTES de mostrar o painel
      // Adicionar delay para carregar tudo antes de exibir
      if (result.keyData && result.keyData.userId) {
        try {
          // Buscar dados do Discord (isso vai enviar log no bot)
          const discordResult = await window.y20.getDiscordUser(result.keyData.userId, true);
          
          if (discordResult && discordResult.success && discordResult.data) {
            // Adicionar informações do Discord aos dados da key
            if (!result.keyData.discordInfo) {
              result.keyData.discordInfo = {};
            }
            result.keyData.discordInfo = {
              avatar: discordResult.data.avatar,
              avatar_url: discordResult.data.avatar_url,
              username: discordResult.data.username,
              tag: discordResult.data.tag,
              global_name: discordResult.data.global_name || discordResult.data.username,
              id: discordResult.data.id
            };
          }
        } catch (discordError) {
          console.error('[Login] Erro ao buscar dados do Discord:', discordError.message);
          // Não bloquear autenticação se falhar ao buscar Discord
        }
        
        // Aguardar um pouco para garantir que tudo carregou
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Enviar log de abertura do painel
      if (result.keyData) {
        try {
          // Obter a key do store
          const keyResult = await window.y20.getAccessKey();
          if (keyResult && keyResult.success && keyResult.key) {
            console.log('[Auth] Enviando log de abertura do painel com key:', keyResult.key.substring(0, 8) + '...');
            if (window.y20 && window.y20.logPanelOpen) {
              const logResult = await window.y20.logPanelOpen(keyResult.key);
              if (logResult && logResult.success) {
                console.log('[Auth] Log de abertura do painel enviado com sucesso');
              } else {
                console.warn('[Auth] Erro ao enviar log de abertura do painel:', logResult?.message);
              }
            } else {
              console.warn('[Auth] window.y20.logPanelOpen não disponível');
            }
          } else {
            console.warn('[Auth] Não foi possível obter a key para enviar log');
          }
        } catch (logError) {
          console.warn('[Auth] Erro ao enviar log de abertura do painel:', logError);
          // Não bloquear autenticação se falhar ao enviar log
        }
      }
      
      // Verificar se os termos foram aceitos
      if (!result.termsAccepted) {
        // Mostrar termos antes de mostrar o app
        showTermsAfterLogin();
        // Guardar dados da key para usar depois
        window._pendingKeyData = result.keyData || null;
      } else {
        // Termos já aceitos, mostrar tela de boas-vindas primeiro
        // Dados do Discord já foram carregados acima
        showWelcomeScreen(result.keyData || null);
      }
    } else {
      // Key inválida/revogada/expirada - abrir painel com acesso simples
      console.log('[Auth] Key inválida/revogada/expirada, abrindo painel com acesso simples...');
      // A key local já será limpa automaticamente pelo checkAccessKey quando detectar inválida/revogada/expirada
      
      // Não mostrar login, apenas abrir painel com acesso simples
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Garantir que card de ativar key top está visível
      const activateKeyCardTop = document.getElementById('activate-key-card-top');
      const userCard = document.getElementById('user-card');
      if (activateKeyCardTop) {
        activateKeyCardTop.style.display = 'block';
      }
      if (userCard) {
        userCard.style.display = 'none';
      }
      
      // Aplicar "Bem vindo convidado" no painel
      const heroNameElInvalid = document.getElementById('hero-discord-name');
      const heroAvatarElInvalid = document.getElementById('hero-discord-avatar');
      if (heroNameElInvalid) {
        heroNameElInvalid.textContent = 'Convidado';
      }
      if (heroAvatarElInvalid) {
        // Avatar padrão para convidado
        heroAvatarElInvalid.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElInvalid.style.display = 'block';
        heroAvatarElInvalid.hidden = false;
      }
      
      stopKeyValidation();
      stopBotStatusCheck();
    }
  } catch (error) {
    console.error('[Login] Erro ao verificar autenticação:', error);
    
    // Verificar se o erro é porque o bot está offline
    let botStatus;
    try {
      botStatus = await checkBotStatus();
    } catch (botCheckError) {
      console.warn('[Auth] Erro ao verificar bot no catch, continuando em modo simples:', botCheckError);
      botStatus = { online: true }; // Assumir online em caso de erro de verificação
    }
    
    if (!botStatus || !botStatus.online) {
      // ❌ Bot está OFFLINE - BLOQUEAR painel
      console.log('[Auth] ❌ Bot offline (erro) - BLOQUEANDO painel');
      
      // Esconder login overlay e welcome overlay
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
      }
      
      const welcomeOverlay = document.getElementById('welcome-overlay');
      if (welcomeOverlay) {
        welcomeOverlay.hidden = true;
        welcomeOverlay.style.display = 'none';
      }
      
      // Mostrar tela de bloqueio
      showOfflineScreen();
      startBotStatusCheck();
      
      // PARAR AQUI - Não abrir o painel
      return;
    } else {
      hideOfflineScreen();
    }
    
    // Em caso de erro (mas bot online), abrir painel com acesso simples (não mostrar login)
    console.log('[Auth] Erro ao verificar key (bot online), abrindo painel com acesso simples...');
    // Não limpar key local em caso de erro de rede - pode ser temporário
    
    if (loginOverlay) {
      loginOverlay.hidden = true;
      loginOverlay.style.display = 'none';
      loginOverlay.style.visibility = 'hidden';
    }
    showAppShell();
    initializeAppWithAccessLevel('simple');
    updateAccessLevelUI('simple');
    
    // Garantir que card de ativar key top está visível
    const activateKeyCardTop = document.getElementById('activate-key-card-top');
    const userCard = document.getElementById('user-card');
    if (activateKeyCardTop) {
      activateKeyCardTop.style.display = 'block';
    }
    if (userCard) {
      userCard.style.display = 'none';
    }
    
    // Aplicar "Bem vindo convidado" no painel
    const heroNameEl = document.getElementById('hero-discord-name');
    const heroAvatarEl = document.getElementById('hero-discord-avatar');
    if (heroNameEl) {
      heroNameEl.textContent = 'Convidado';
    }
    if (heroAvatarEl) {
      // Avatar padrão para convidado
      heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
      heroAvatarEl.style.display = 'block';
      heroAvatarEl.hidden = false;
    }
    
    stopKeyValidation();
    stopBotStatusCheck();
  }
}

async function loadDiscordUserInfo(userId, forWelcome = false, keyData = null) {
  try {
    if (!userId) {
      console.warn('[Discord] userId não fornecido');
      return null;
    }
    
    console.log(`[Discord] Buscando dados do Discord para userId: ${userId}`);
    const result = await window.y20.getDiscordUser(userId, true);
    console.log(`[Discord] Resultado recebido:`, result ? (result.success ? 'Sucesso' : 'Falhou') : 'Nulo');
    
    if (result && result.success && result.data) {
      console.log(`[Discord] Dados recebidos:`, result.data.tag || result.data.username);
      let userInfo, userAvatar, userName;
      let userPlan, userDays, userExpires;
      let heroAvatar, heroName, heroPlan, heroDays, heroExpires;
      
      if (forWelcome) {
        // Usar elementos da tela de boas-vindas
        userAvatar = document.getElementById('welcome-user-avatar');
        userName = document.getElementById('welcome-user-name');
      } else {
        // Usar elementos do hero card (topbar removido)
        heroAvatar = document.getElementById('hero-discord-avatar');
        heroName = document.getElementById('hero-discord-name');
        heroPlan = document.getElementById('hero-discord-plan');
        heroDays = document.getElementById('hero-discord-days');
        heroExpires = document.getElementById('hero-discord-expires');
        
        // Usar elementos do hero card também para compatibilidade
        userAvatar = heroAvatar;
        userName = heroName;
      }
      
      // Função auxiliar para carregar avatar - sempre exibir algo
      const loadAvatar = (avatarElement, userId, avatarData) => {
        if (!avatarElement) {
          console.warn('[Discord] Elemento de avatar não encontrado');
          return;
        }
        
        // Garantir que o elemento seja visível
        avatarElement.style.display = 'block';
        avatarElement.hidden = false;
        avatarElement.style.visibility = 'visible';
        avatarElement.style.opacity = '1';
        
        // Função para carregar avatar padrão do Discord
        const loadDefaultAvatar = () => {
          if (userId) {
            const defaultAvatarUrl = `https://cdn.discordapp.com/embed/avatars/${userId % 5}.png`;
            avatarElement.src = defaultAvatarUrl;
            console.log('[Discord] Usando avatar padrão do Discord:', defaultAvatarUrl);
          } else {
            // Se não tiver userId, usar avatar genérico
            avatarElement.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
            console.log('[Discord] Usando avatar genérico do Discord');
          }
          avatarElement.onerror = null; // Remover handler de erro para evitar loop
        };
        
        if (avatarData) {
          // Se o avatar começa com http, usar diretamente, senão construir URL do Discord
          let avatarUrl;
          if (avatarData.startsWith('http')) {
            avatarUrl = avatarData;
          } else {
            avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarData}.png?size=256`;
          }
          
          avatarElement.src = avatarUrl;
          console.log('[Discord] Tentando carregar avatar:', avatarUrl);
          
          // Handler de erro - usar avatar padrão se falhar
          avatarElement.onerror = () => {
            console.warn('[Discord] Erro ao carregar avatar, usando fallback');
            loadDefaultAvatar();
          };
          
          // Verificar se carregou com sucesso após um tempo
          avatarElement.onload = () => {
            console.log('[Discord] Avatar carregado com sucesso:', avatarUrl);
            avatarElement.style.display = 'block';
            avatarElement.hidden = false;
            avatarElement.style.visibility = 'visible';
            avatarElement.style.opacity = '1';
          };
        } else {
          // Sem avatar, usar avatar padrão do Discord imediatamente
          loadDefaultAvatar();
        }
      };
      
      // Função auxiliar para carregar nome
      const loadName = (nameElement, data) => {
        if (nameElement) {
          const displayName = data.tag || data.username || data.global_name || 'Usuário';
          nameElement.textContent = displayName;
        }
      };
      
      // Carregar avatar do Discord - sempre tentar carregar, mesmo sem avatar específico
      // Usar avatar_url se disponível (URL completa), senão usar avatar (hash)
      const avatarData = result.data.avatar_url || result.data.avatar || null;
      
      if (forWelcome) {
        if (userAvatar) {
          // Se tem avatar_url, usar diretamente, senão passar avatar hash
          if (result.data.avatar_url) {
            userAvatar.src = result.data.avatar_url;
            userAvatar.style.display = 'block';
            userAvatar.hidden = false;
            userAvatar.style.visibility = 'visible';
            userAvatar.style.opacity = '1';
            console.log('[Discord] Avatar URL carregado (boas-vindas):', result.data.avatar_url);
          } else {
            loadAvatar(userAvatar, userId, result.data.avatar);
          }
        } else {
          console.warn('[Discord] Elemento welcome-user-avatar não encontrado');
        }
      } else {
        // Apenas hero card (topbar removido)
        if (heroAvatar) {
          // Se tem avatar_url, usar diretamente, senão passar avatar hash
          if (result.data.avatar_url) {
            heroAvatar.src = result.data.avatar_url;
            heroAvatar.style.display = 'block';
            heroAvatar.hidden = false;
            heroAvatar.style.visibility = 'visible';
            heroAvatar.style.opacity = '1';
            console.log('[Discord] Avatar URL carregado (hero card):', result.data.avatar_url);
          } else {
            loadAvatar(heroAvatar, userId, result.data.avatar);
          }
        } else {
          console.warn('[Discord] Elemento hero-discord-avatar não encontrado');
          // Tentar novamente após um delay
          setTimeout(() => {
            const heroAvatarRetry = document.getElementById('hero-discord-avatar');
            if (heroAvatarRetry) {
              if (result.data.avatar_url) {
                heroAvatarRetry.src = result.data.avatar_url;
                heroAvatarRetry.style.display = 'block';
                heroAvatarRetry.hidden = false;
                heroAvatarRetry.style.visibility = 'visible';
                heroAvatarRetry.style.opacity = '1';
              } else {
                loadAvatar(heroAvatarRetry, userId, result.data.avatar);
              }
            }
          }, 500);
        }
      }
      
      // Carregar nome do Discord
      const displayName = result.data.tag || result.data.username || result.data.global_name || 'Usuário';
      if (forWelcome) {
        if (userName) {
          userName.textContent = displayName;
          userName.hidden = false;
          console.log('[Discord] Nome carregado na tela de boas-vindas:', displayName);
        }
      } else {
        // Apenas hero card (topbar removido)
        if (heroName) {
          heroName.textContent = displayName;
          heroName.hidden = false;
          console.log('[Discord] Nome carregado no hero card:', displayName);
        } else {
          console.warn('[Discord] Elemento hero-discord-name não encontrado');
        }
      }
      
      // Carregar informações de acesso se keyData estiver disponível
      // IMPORTANTE: Sempre chamar mesmo sem dados do Discord
      if (!forWelcome && keyData) {
        console.log('[Discord] Atualizando informações de acesso no hero card...', keyData);
        // Aguardar um pouco para garantir que os elementos estejam no DOM
        setTimeout(async () => {
          const heroPlanEl = document.getElementById('hero-discord-plan');
          const heroDaysEl = document.getElementById('hero-discord-days');
          const heroExpiresEl = document.getElementById('hero-discord-expires');
          
          if (heroPlanEl && heroDaysEl && heroExpiresEl) {
            await updateUserAccessInfo(keyData, heroPlanEl, heroDaysEl, heroExpiresEl);
            // Iniciar atualização periódica das informações de acesso
            startUserAccessInfoUpdates(keyData);
            console.log('[Discord] Informações de acesso atualizadas');
          } else {
            console.warn('[Discord] Elementos do hero card não encontrados, tentando novamente...', { 
              heroPlan: !!heroPlanEl, 
              heroDays: !!heroDaysEl, 
              heroExpires: !!heroExpiresEl 
            });
            // Tentar novamente após mais um delay
            setTimeout(async () => {
              const heroPlanEl2 = document.getElementById('hero-discord-plan');
              const heroDaysEl2 = document.getElementById('hero-discord-days');
              const heroExpiresEl2 = document.getElementById('hero-discord-expires');
              
              if (heroPlanEl2 && heroDaysEl2 && heroExpiresEl2) {
                await updateUserAccessInfo(keyData, heroPlanEl2, heroDaysEl2, heroExpiresEl2);
                startUserAccessInfoUpdates(keyData);
              }
            }, 500);
          }
        }, 100);
      } else if (!forWelcome) {
        console.warn('[Discord] keyData não disponível para atualizar informações de acesso');
      }
      
      console.log('[Discord] Dados do usuário carregados:', displayName);
      return { avatar: userAvatar ? userAvatar.src : '', name: displayName };
    } else {
      console.warn('[Discord] Resposta inválida:', result);
      // Mesmo com resposta inválida, tentar carregar avatar padrão se tiver userId
      if (!forWelcome && userId) {
        const heroAvatarEl = document.getElementById('hero-discord-avatar');
        if (heroAvatarEl) {
          heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${userId % 5}.png`;
          heroAvatarEl.style.display = 'block';
          heroAvatarEl.hidden = false;
          heroAvatarEl.style.visibility = 'visible';
          heroAvatarEl.style.opacity = '1';
          console.log('[Discord] Carregando avatar padrão após resposta inválida');
        }
      }
    }
    return null;
  } catch (error) {
    console.error('[Login] Erro ao carregar dados do Discord:', error);
    // Mesmo com erro, tentar carregar avatar padrão se tiver userId
    if (!forWelcome && userId) {
      try {
        const heroAvatarEl = document.getElementById('hero-discord-avatar');
        if (heroAvatarEl) {
          heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${userId % 5}.png`;
          heroAvatarEl.style.display = 'block';
          heroAvatarEl.hidden = false;
          heroAvatarEl.style.visibility = 'visible';
          heroAvatarEl.style.opacity = '1';
          console.log('[Discord] Carregando avatar padrão após erro:', error.message);
        }
      } catch (fallbackError) {
        console.error('[Discord] Erro ao carregar avatar padrão:', fallbackError);
      }
    }
    return null;
  }
}

function applyKeyRestrictions(isVip) {
  console.log('[Key] Aplicando restrições. É VIP:', isVip);
  
  // Botão Otimizar Completo VIP - só funciona para VIP
  const optimizeVipBtn = document.getElementById('optimize-vip');
  if (optimizeVipBtn) {
    if (!isVip) {
      optimizeVipBtn.disabled = true;
      optimizeVipBtn.title = 'Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear todas as otimizações avançadas!';
      optimizeVipBtn.style.opacity = '0.5';
      optimizeVipBtn.style.cursor = 'not-allowed';
      
      // Adicionar listener para mostrar mensagem ao tentar usar
      if (!optimizeVipBtn.dataset.restrictionListener) {
        optimizeVipBtn.addEventListener('click', (e) => {
          if (optimizeVipBtn.disabled) {
            e.preventDefault();
            e.stopPropagation();
            showToast('Esta funcionalidade requer Key VIP. Acesse nosso Discord para fazer upgrade!', 'warning');
            return false;
          }
        });
        optimizeVipBtn.dataset.restrictionListener = 'true';
      }
    } else {
      optimizeVipBtn.disabled = false;
      optimizeVipBtn.title = 'Otimização VIP - Acesso completo a todas as funcionalidades avançadas';
      optimizeVipBtn.style.opacity = '1';
      optimizeVipBtn.style.cursor = 'pointer';
    }
  }
  
  // Aplicar classe no body para CSS diferenciado
  if (isVip) {
    document.body.setAttribute('data-plan-type', 'vip');
    document.body.classList.add('plan-vip');
    document.body.classList.remove('plan-normal');
  } else {
    document.body.setAttribute('data-plan-type', 'normal');
    document.body.classList.add('plan-normal');
    document.body.classList.remove('plan-vip');
  }
  
  // Outros botões VIP podem ser adicionados aqui
  // Por enquanto, apenas o "Otimizar Completo VIP" está restrito
}

function showLogin() {
  console.log('[Login] Mostrando tela de login...');
  
  try {
    // Garantir que os elementos existam
    if (!loginOverlay || !appShell) {
      console.warn('[Login] Elementos não inicializados, tentando inicializar...');
      initializeLoginElements();
    }
    
    console.log('[Login] Login overlay existe?', !!loginOverlay);
    console.log('[Login] App shell existe?', !!appShell);
    
    if (loginOverlay) {
      loginOverlay.hidden = false;
      loginOverlay.style.display = 'flex';
      loginOverlay.classList.remove('hidden');
    }
    if (appShell) {
      appShell.hidden = true;
      appShell.style.display = 'none';
      appShell.classList.add('hidden');
    }
    if (keyInput) {
      keyInput.value = '';
      // Focar apenas se o overlay estiver visível
      setTimeout(() => {
        if (keyInput && loginOverlay && !loginOverlay.hidden) {
          keyInput.focus();
        }
      }, 100);
    }
    stopKeyValidation();
  } catch (error) {
    console.error('[Login] Erro ao mostrar login:', error);
    // Em caso de erro, tentar mostrar o login de qualquer forma
    if (loginOverlay) {
      loginOverlay.hidden = false;
      loginOverlay.style.display = 'flex';
    }
    if (appShell) {
      appShell.hidden = true;
      appShell.style.display = 'none';
    }
  }
}

function showTermsAfterLogin() {
  console.log('[Login] Mostrando termos após login...');
  
  // Esconder login overlay
  if (loginOverlay) {
    loginOverlay.hidden = true;
    loginOverlay.style.display = 'none';
    loginOverlay.classList.add('hidden');
  }
  
  // Mostrar modal de termos
  if (termsModal) {
    termsModal.classList.add('show');
  }
}

// Função auxiliar para atualizar status de verificação na tela de boas-vindas
function updateWelcomeServerCheck(title, message) {
  const welcomeServerCheck = document.getElementById('welcome-server-check');
  const welcomeServerCheckMessage = document.getElementById('welcome-server-check-message');
  if (welcomeServerCheck) {
    const strongEl = welcomeServerCheck.querySelector('strong');
    if (strongEl) {
      strongEl.textContent = title;
    }
    if (welcomeServerCheckMessage) {
      welcomeServerCheckMessage.textContent = message;
    }
  }
}

async function showWelcomeScreen(keyData = null) {
  // Limpar logs ao iniciar o painel
  setTimeout(() => {
    if (logsContent) {
      logsContent.innerHTML = '';
      addLogEntry('Sistema iniciado...', 'info');
    }
  }, 100);
  console.log('[Welcome] Mostrando tela de boas-vindas...');
  
  // Esconder login overlay primeiro
  if (loginOverlay) {
    loginOverlay.hidden = true;
    loginOverlay.style.display = 'none';
    loginOverlay.classList.add('hidden');
  }
  
  // Esconder termos modal se estiver visível
  const termsModal = document.getElementById('terms-modal');
  if (termsModal) {
    termsModal.hidden = true;
    termsModal.style.display = 'none';
  }
  
  const welcomeOverlay = document.getElementById('welcome-overlay');
  if (!welcomeOverlay) {
    console.warn('[Welcome] Elemento welcome-overlay não encontrado');
    // Se não encontrar a tela de boas-vindas, mostrar o painel diretamente
    await showAppAfterTermsAccepted(keyData);
    return;
  }
  
  // MOSTRAR TELA DE BOAS-VINDAS IMEDIATAMENTE (sem tela azul)
  welcomeOverlay.hidden = false;
  welcomeOverlay.style.display = 'flex';
  
  // Inicializar status de verificação
  updateWelcomeServerCheck('Verificando...', 'Verificando servidor e banco de dados...');
  
  // PRIMEIRO: Verificar status do BOT, MongoDB E API ANTES de continuar
  let botStatus;
  let apiStatus;
  try {
    updateWelcomeServerCheck('Verificando...', 'Verificando bot Discord e API...');
    botStatus = await checkBotStatus();
    console.log('[Welcome] Status do bot verificado:', botStatus);
    
    // Verificar API também
    if (window.y20 && window.y20.checkApiHealth) {
      try {
        apiStatus = await Promise.race([
          window.y20.checkApiHealth(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
        ]);
        console.log('[Welcome] Status da API verificado:', apiStatus);
      } catch (apiError) {
        console.warn('[Welcome] Erro ao verificar API:', apiError.message);
        apiStatus = { online: false };
      }
    } else {
      apiStatus = { online: false };
    }
  } catch (error) {
    console.error('[Welcome] Erro ao verificar status do bot:', error);
    botStatus = { online: false, mongoConnected: false, error: error.message };
    apiStatus = { online: false };
  }
  
  const botOnline = botStatus && botStatus.online === true;
  const mongoConnected = botStatus && botStatus.mongoConnected === true;
  const apiOnline = apiStatus && apiStatus.online === true;
  
  // Atualizar status da verificação
  if (apiOnline && botOnline) {
    updateWelcomeServerCheck('Verificando...', 'Servidores online - Conectando...');
  } else if (!apiOnline) {
    updateWelcomeServerCheck('Verificando...', 'API offline - Usando modo básico...');
  }
  
  // DECISÃO CRÍTICA: Se bot offline + MongoDB online = BLOQUEAR
  if (!botOnline && mongoConnected) {
    console.log('[Welcome] ❌ Bot offline + MongoDB online - BLOQUEANDO acesso');
    updateWelcomeServerCheck('Servidor Offline', 'Bot Discord está offline');
    
    // Esperar um pouco para mostrar a mensagem de forma clara
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Esconder welcome e mostrar tela de bloqueio
    welcomeOverlay.style.animation = 'welcomeFadeOut 0.5s ease-out forwards';
    await new Promise(resolve => setTimeout(resolve, 500));
    welcomeOverlay.hidden = true;
    welcomeOverlay.style.display = 'none';
    welcomeOverlay.style.animation = '';
    
    showOfflineScreen();
    startBotStatusCheck();
    return; // PARAR AQUI - não continuar
  }
  
  // Se bot online + MongoDB offline = permitir acesso free
  if (botOnline && !mongoConnected) {
    console.log('[Welcome] ⚠️ Bot online + MongoDB offline - Acesso FREE com aviso');
    updateWelcomeServerCheck('Verificando...', 'MongoDB offline - usando acesso básico');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Se ambos online = continuar normalmente
  if (botOnline && mongoConnected) {
    console.log('[Welcome] ✅ Bot online + MongoDB online - Acesso normal');
    updateWelcomeServerCheck('Verificando...', 'Servidores online');
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Se não tiver keyData, mostrar animação de "Bem vindo Convidado"
  if (!keyData || !keyData.discordInfo || !keyData.discordInfo.avatar_url) {
    console.log('[Welcome] Sem key ou dados do Discord, mostrando animação para convidado...');
    
    // Aplicar "Bem-Vindo!" na tela de boas-vindas
    const welcomeTitle = document.querySelector('.welcome-title');
    
    if (welcomeTitle) {
      welcomeTitle.textContent = 'Bem-Vindo!';
    }
    
    // Verificar key e API durante a tela de boas-vindas
    let finalKeyData = null;
    let finalAccessLevel = 'simple';
    
    // NÃO precisa marcar aqui, já foi marcado no início do DOMContentLoaded
    // window._appJustLoaded = true;
    
    try {
      // PRIMEIRO: Verificar status da API ANTES de verificar a key
      updateWelcomeServerCheck('Verificando...', 'Conectando com servidor...');
      await new Promise(resolve => setTimeout(resolve, 500)); // Pequeno delay para mostrar
      const apiStatus = await checkVIPOfflineStatus();
      const isApiOnline = apiStatus && apiStatus.apiOnline === true;
      
      console.log('[Welcome] Status da API verificado (convidado):', isApiOnline ? 'ONLINE' : 'OFFLINE');
      
      if (!isApiOnline) {
        // API offline - forçar acesso simples mesmo tendo key
        updateWelcomeServerCheck('Verificando...', 'API offline - usando acesso simples');
        finalAccessLevel = 'simple';
        finalKeyData = null;
      } else {
        // API online - verificar se tem key salva
        updateWelcomeServerCheck('Verificando...', 'Procurando key salva...');
        await new Promise(resolve => setTimeout(resolve, 500));
        if (window.y20) {
          const storedKey = await window.y20.checkAccessKey().catch(() => ({ hasKey: false }));
          if (storedKey && storedKey.hasKey) {
            updateWelcomeServerCheck('Verificando...', 'Key encontrada, validando...');
            await new Promise(resolve => setTimeout(resolve, 500));
            const authResult = await window.y20.isAuthenticated().catch(() => null);
            if (authResult && authResult.authenticated && authResult.valid && !authResult.revoked && !authResult.expired && !authResult.notFound) {
              finalKeyData = authResult.keyData;
              finalAccessLevel = getAccessLevelFromKey(finalKeyData);
              updateWelcomeServerCheck('Verificando...', `Plano ${finalAccessLevel === 'vip' ? 'VIP' : finalAccessLevel === 'basic' ? 'Básico' : 'Simples'} detectado`);
            } else {
              updateWelcomeServerCheck('Verificando...', 'Key inválida, usando acesso simples');
              finalAccessLevel = 'simple';
              finalKeyData = null;
            }
          } else {
            updateWelcomeServerCheck('Verificando...', 'Sem key - usando acesso simples');
            finalAccessLevel = 'simple';
            finalKeyData = null;
          }
        }
      }
      
      updateWelcomeServerCheck('Verificando...', 'Verificação concluída');
      
      // Aguardar um pouco para mostrar "Verificação concluída"
      await new Promise(resolve => setTimeout(resolve, 800));
      
    } catch (error) {
      console.error('[Welcome] Erro durante verificação:', error);
      updateWelcomeServerCheck('Verificando...', 'Continuando com acesso simples...');
      finalAccessLevel = 'simple';
      finalKeyData = null;
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    // AGORA que a verificação está completa, mostrar o painel
    console.log('[Welcome] Finalizando animação de boas-vindas (convidado)...');
    // Esconder tela de boas-vindas com fade out
    welcomeOverlay.style.animation = 'welcomeFadeOut 0.5s ease-out forwards';
    await new Promise(resolve => setTimeout(resolve, 500));
    welcomeOverlay.hidden = true;
    welcomeOverlay.style.display = 'none';
    welcomeOverlay.style.animation = '';
    
    // Enviar log de abertura do painel se tiver key
    if (finalKeyData) {
      try {
        const keyResult = await window.y20.getAccessKey();
        if (keyResult && keyResult.success && keyResult.key) {
          console.log('[Welcome] Enviando log de abertura do painel após boas-vindas');
          if (window.y20 && window.y20.logPanelOpen) {
            const logResult = await window.y20.logPanelOpen(keyResult.key);
            if (logResult && logResult.success) {
              console.log('[Welcome] Log de abertura do painel enviado com sucesso');
            } else {
              console.warn('[Welcome] Erro ao enviar log:', logResult?.message);
            }
          }
        }
      } catch (logError) {
        console.warn('[Welcome] Erro ao enviar log de abertura do painel:', logError);
      }
    }
    
    // Agora mostrar o painel com o nível de acesso correto
    initializeAppWithAccessLevel(finalAccessLevel);
    updateAccessLevelUI(finalAccessLevel);
      
      // Definir paleta padrão "royal neon" para convidados
      if (!finalKeyData) {
        currentPalette = 'royal';
        document.body.setAttribute('data-palette', 'royal');
        if (window.y20 && window.y20.setPalette) {
          try {
            await window.y20.setPalette('royal');
          } catch (err) {
            console.warn('[Welcome] Erro ao definir paleta royal para convidado:', err);
          }
        }
        updatePaletteColors();
      }
      
      // Aplicar "Bem vindo convidado" no painel
      const heroNameEl = document.getElementById('hero-discord-name');
      const heroAvatarEl = document.getElementById('hero-discord-avatar');
      if (heroNameEl) {
        heroNameEl.textContent = 'Convidado';
      }
      if (heroAvatarEl) {
        heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarEl.style.display = 'block';
        heroAvatarEl.hidden = false;
      }
      
      showAppShell();
      ensureGeneralSectionActive();
      
      // Enviar log de abertura do painel quando o painel é mostrado
      if (finalKeyData) {
        try {
          const keyResult = await window.y20.getAccessKey();
          if (keyResult && keyResult.success && keyResult.key) {
            console.log('[Welcome] Enviando log de abertura do painel após mostrar painel');
            if (window.y20 && window.y20.logPanelOpen) {
              const logResult = await window.y20.logPanelOpen(keyResult.key);
              if (logResult && logResult.success) {
                console.log('[Welcome] Log de abertura do painel enviado com sucesso');
              } else {
                console.warn('[Welcome] Erro ao enviar log:', logResult?.message);
              }
            }
          }
        } catch (logError) {
          console.warn('[Welcome] Erro ao enviar log de abertura do painel:', logError);
        }
      }
      
      // Se MongoDB offline + bot online, mostrar banner imediatamente
      if (botOnline && !mongoConnected) {
        // Aguardar um pouco para o painel carregar completamente
        await new Promise(resolve => setTimeout(resolve, 800));
        // Mostrar banner de aviso (MongoDB offline)
        if (typeof showDashboardApiWarning === 'function') {
          showDashboardApiWarning();
          console.log('[Welcome] ✅ Banner MongoDB offline exibido (convidado)');
        } else if (typeof showApiOfflineBanner === 'function') {
          showApiOfflineBanner();
          console.log('[Welcome] ✅ Banner MongoDB offline exibido (convidado)');
        }
      }
      
      // 🎯 IMPORTANTE: Desativar flag de inicialização APÓS mostrar o painel E banner
      // Agora o painel pode mostrar avisos normalmente
      setTimeout(() => {
        window._appJustLoaded = false;
        console.log('[Welcome] 🎯 Inicialização concluída: window._appJustLoaded = false');
      }, 500);
    return;
  }
  
  // Verificar key e API durante a tela de boas-vindas ANTES de mostrar dados
  let finalKeyData = keyData;
  let finalAccessLevel = 'simple'; // Começar com simples por padrão
  
  // NÃO precisa marcar aqui, já foi marcado no início do DOMContentLoaded
  // window._appJustLoaded = true;
  
    try {
      // PRIMEIRO: Verificar status da API ANTES de verificar a key
      updateWelcomeServerCheck('Verificando...', 'Conectando com servidor...');
      await new Promise(resolve => setTimeout(resolve, 500));
      const apiStatus = await checkVIPOfflineStatus();
      const isApiOnline = apiStatus && apiStatus.apiOnline === true;
      
      console.log('[Welcome] Status da API verificado:', isApiOnline ? 'ONLINE' : 'OFFLINE');
      
      if (!isApiOnline) {
        // API offline - forçar acesso simples mesmo tendo key
        updateWelcomeServerCheck('Verificando...', 'API offline - usando acesso simples');
        await new Promise(resolve => setTimeout(resolve, 800));
        finalAccessLevel = 'simple';
        finalKeyData = null; // Não mostrar dados VIP se API está offline
      } else {
        // API online - verificar se key ainda é válida
        updateWelcomeServerCheck('Verificando...', 'Validando key...');
        await new Promise(resolve => setTimeout(resolve, 500));
        if (finalKeyData && window.y20) {
          const authResult = await window.y20.isAuthenticated().catch(() => null);
        if (authResult && authResult.authenticated && authResult.valid && !authResult.revoked && !authResult.expired && !authResult.notFound) {
          finalKeyData = authResult.keyData;
          finalAccessLevel = getAccessLevelFromKey(finalKeyData);
          updateWelcomeServerCheck('Verificando...', `Plano ${finalAccessLevel === 'vip' ? 'VIP' : finalAccessLevel === 'basic' ? 'Básico' : 'Simples'} confirmado`);
        } else {
          updateWelcomeServerCheck('Verificando...', 'Key inválida, usando acesso simples');
          finalAccessLevel = 'simple';
          finalKeyData = null;
        }
      } else {
        updateWelcomeServerCheck('Verificando...', 'Sem key - usando acesso simples');
        finalAccessLevel = 'simple';
        finalKeyData = null;
      }
    }
    
    updateWelcomeServerCheck('Verificando...', 'Verificação concluída');
    
    // Aguardar um pouco para mostrar "Verificação concluída"
    await new Promise(resolve => setTimeout(resolve, 800));
    
  } catch (error) {
    console.error('[Welcome] Erro durante verificação:', error);
    updateWelcomeServerCheck('Verificando...', 'Continuando com acesso simples...');
    finalAccessLevel = 'simple';
    finalKeyData = null;
    await new Promise(resolve => setTimeout(resolve, 800));
  }
  
  // Garantir que o título está correto
  const welcomeTitle = document.querySelector('.welcome-title');
  if (welcomeTitle) {
    welcomeTitle.textContent = 'Bem-Vindo!';
  }
  
  // AGORA que a verificação está completa, mostrar o painel
  console.log('[Welcome] Finalizando animação de boas-vindas...');
  // Esconder tela de boas-vindas com fade out
  welcomeOverlay.style.animation = 'welcomeFadeOut 0.5s ease-out forwards';
  await new Promise(resolve => setTimeout(resolve, 500));
  welcomeOverlay.hidden = true;
  welcomeOverlay.style.display = 'none';
  welcomeOverlay.style.animation = '';
  
  // Agora mostrar o painel com o nível de acesso correto
  await showAppAfterTermsAccepted(finalKeyData);
  
  // Se MongoDB offline + bot online, mostrar banner imediatamente após painel carregar
  if (botOnline && !mongoConnected) {
    // Aguardar um pouco para o painel carregar completamente
    await new Promise(resolve => setTimeout(resolve, 800));
    // Mostrar banner de aviso (MongoDB offline)
    if (typeof showDashboardApiWarning === 'function') {
      showDashboardApiWarning();
      console.log('[Welcome] ✅ Banner MongoDB offline exibido (com key)');
    } else if (typeof showApiOfflineBanner === 'function') {
      showApiOfflineBanner();
      console.log('[Welcome] ✅ Banner MongoDB offline exibido (com key)');
    }
    
    // Marcar que MongoDB está offline para evitar que checkVIPOfflineStatus remova o banner
    window._mongoOffline = true;
  }
}

async function showAppAfterTermsAccepted(keyData = null) {
  // Limpar logs ao abrir o painel
  if (logsContent) {
    logsContent.innerHTML = '';
    addLogEntry('Sistema iniciado...', 'info');
  }
  console.log('[Login] Mostrando aplicativo após termos aceitos...');
  
  try {
    // Usar dados da key guardados se não foram passados
    if (!keyData && window._pendingKeyData) {
      keyData = window._pendingKeyData;
      window._pendingKeyData = null;
    }
    
    // Garantir que os elementos existam
    if (!loginOverlay || !appShell) {
      console.warn('[Login] Elementos não inicializados, tentando inicializar...');
      initializeLoginElements();
    }
    
    // Verificar novamente após inicializar
    if (!loginOverlay || !appShell) {
      console.error('[Login] Erro: Elementos ainda não inicializados após tentativa');
      return;
    }
    
    console.log('[Login] Escondendo overlay de login...');
    // Esconder login overlay e termos
    if (loginOverlay) {
      loginOverlay.hidden = true;
      loginOverlay.style.display = 'none';
      loginOverlay.classList.add('hidden');
    }
    
    // Esconder termos modal se estiver visível
    const termsModal = document.getElementById('terms-modal');
    if (termsModal) {
      termsModal.hidden = true;
      termsModal.style.display = 'none';
    }
    
    // Esconder tela de boas-vindas se ainda estiver visível
    const welcomeOverlay = document.getElementById('welcome-overlay');
    if (welcomeOverlay && !welcomeOverlay.hidden) {
      welcomeOverlay.hidden = true;
      welcomeOverlay.style.display = 'none';
    }
    
    console.log('[Login] Mostrando app shell...');
    
    // Garantir que abre na seção General (Dashboard)
    ensureGeneralSectionActive();
    
    // Verificar status da API ANTES de determinar nível de acesso
    let apiStatus;
    try {
      apiStatus = await checkVIPOfflineStatus();
    } catch (apiCheckError) {
      console.warn('[Login] Erro ao verificar status da API:', apiCheckError);
      apiStatus = { apiOnline: false };
    }
    
    const isApiOnline = apiStatus && apiStatus.apiOnline === true;
    
    // Se API está offline, forçar acesso simples mesmo tendo key
    let accessLevel = 'simple';
    if (isApiOnline && keyData) {
      accessLevel = getAccessLevelFromKey(keyData);
    } else if (!isApiOnline && keyData) {
      // API offline - não mostrar dados VIP
      keyData = null;
      accessLevel = 'simple';
    }
    
    console.log('[Login] Nível de acesso:', accessLevel, '(API online:', isApiOnline, ')');
    
    // Inicializar app com nível de acesso correto
    initializeAppWithAccessLevel(accessLevel);
    updateAccessLevelUI(accessLevel);
    
    // Mostrar app shell
    showAppShell();
    
    // Recarregar código de indicação após mostrar o app
    setTimeout(() => {
      loadReferralCode();
    }, 1500);
    
    // Mostrar app shell
    if (appShell) {
      appShell.hidden = false;
      appShell.style.display = 'flex';
      appShell.classList.remove('hidden');
    }
    
    // NÃO redefinir window._appJustLoaded aqui - já foi definido no início
    window._navigatingSection = false; // Garantir que não está navegando no início
    
    // 🎯 IMPORTANTE: Desativar flag de inicialização APÓS mostrar o painel
    // Agora o painel pode mostrar avisos normalmente
    setTimeout(() => {
      window._appJustLoaded = false;
      console.log('[Welcome] 🎯 Inicialização concluída: window._appJustLoaded = false');
    }, 500);
    
    // Remover classe offline imediatamente ao carregar o app
    document.body.classList.remove('offline');
    
    // Esconder overlay offline se estiver visível
    if (offlineOverlay) {
      offlineOverlay.hidden = true;
      offlineOverlay.style.display = 'none';
    }
    
    // Esconder aviso de API offline se estiver visível
    hideApiOfflineBanner();
    
    // Aguardar um pouco para garantir que o DOM esteja pronto
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // A flag window._appJustLoaded já será desativada automaticamente após 500ms
    // pela lógica adicionada em showAppAfterTermsAccepted()
    
    // Iniciar validação periódica
    startKeyValidation();
    
    // IMPORTANTE: Aguardar e aplicar dados do Discord ANTES de mostrar o painel
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Aplicar dados do Discord APENAS se API está online e tem key válida
    // Se API está offline, não mostrar dados VIP
    if (isApiOnline && keyData && keyData.userId && accessLevel !== 'simple') {
      // Aguardar mais um pouco para garantir que elementos estejam no DOM
      await new Promise(resolve => setTimeout(resolve, 200));
      
      try {
        // Se já tiver dados do Discord (carregados na autenticação), aplicar diretamente
        if (keyData.discordInfo && keyData.discordInfo.avatar_url) {
          const heroAvatarEl = document.getElementById('hero-discord-avatar');
          const heroNameEl = document.getElementById('hero-discord-name');
          
          if (heroAvatarEl) {
            heroAvatarEl.src = keyData.discordInfo.avatar_url;
            heroAvatarEl.style.display = 'block';
            heroAvatarEl.hidden = false;
            heroAvatarEl.style.visibility = 'visible';
            heroAvatarEl.style.opacity = '1';
          }
          
          if (heroNameEl) {
            heroNameEl.textContent = keyData.discordInfo.tag || keyData.discordInfo.username || keyData.discordInfo.global_name || 'Usuário';
            heroNameEl.hidden = false;
          }
          
          // Atualizar informações de acesso
          await updateUserAccessInfo(keyData);
          startUserAccessInfoUpdates(keyData);
          
          // Iniciar atualizações do score de otimização
          startOptimizationScoreUpdates();
        } else {
          // Se não tiver dados, fazer nova busca
          await loadDiscordUserInfo(keyData.userId, false, keyData);
        }
      } catch (error) {
        console.error('[Login] Erro ao aplicar dados do Discord:', error.message);
        
        // Se falhar, tentar usar dados cached se disponível
        if (keyData.discordInfo) {
          console.log('[Login] Usando dados cached do Discord como fallback');
          try {
            const heroAvatarEl = document.getElementById('hero-discord-avatar');
            const heroNameEl = document.getElementById('hero-discord-name');
            
            if (heroAvatarEl && keyData.discordInfo) {
              // Usar avatar_url se disponível, senão avatar hash, senão avatar padrão
              if (keyData.discordInfo.avatar_url) {
                heroAvatarEl.src = keyData.discordInfo.avatar_url;
              } else if (keyData.discordInfo.avatar) {
                const avatarUrl = keyData.discordInfo.avatar.startsWith('http') 
                  ? keyData.discordInfo.avatar 
                  : `https://cdn.discordapp.com/avatars/${keyData.userId}/${keyData.discordInfo.avatar}.png?size=256`;
                heroAvatarEl.src = avatarUrl;
              } else if (keyData.userId) {
                heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${keyData.userId % 5}.png`;
              }
              heroAvatarEl.style.display = 'block';
              heroAvatarEl.hidden = false;
              heroAvatarEl.style.visibility = 'visible';
              heroAvatarEl.style.opacity = '1';
            } else if (heroAvatarEl && keyData.userId) {
              heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${keyData.userId % 5}.png`;
              heroAvatarEl.style.display = 'block';
              heroAvatarEl.hidden = false;
            }
            
            if (heroNameEl && keyData.discordInfo) {
              heroNameEl.textContent = keyData.discordInfo.tag || keyData.discordInfo.username || keyData.discordInfo.global_name || 'Usuário';
              heroNameEl.hidden = false;
            }
          } catch (fallbackError) {
            console.error('[Login] Erro ao aplicar fallback do Discord:', fallbackError);
          }
        }
        // Mesmo com erro no Discord, carregar avatar padrão e atualizar informações de acesso
        try {
          const heroAvatarEl = document.getElementById('hero-discord-avatar');
          if (heroAvatarEl) {
            heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${keyData.userId % 5}.png`;
            heroAvatarEl.style.display = 'block';
            heroAvatarEl.hidden = false;
            heroAvatarEl.style.visibility = 'visible';
            heroAvatarEl.style.opacity = '1';
            console.log('[Login] Avatar padrão carregado após erro no Discord');
          }
        } catch (avatarError) {
          console.error('[Login] Erro ao carregar avatar padrão:', avatarError);
        }
        
        if (keyData) {
          setTimeout(async () => {
            await updateUserAccessInfo(keyData);
            startUserAccessInfoUpdates(keyData);
          }, 500);
        }
      }
    } else {
      // API está offline ou sem key - mostrar como convidado
      console.log('[Login] API offline ou sem key válida - mostrando como convidado');
      
      // Se tem keyData mas API está offline, ainda mostrar informações da key
      if (keyData && !isApiOnline) {
        console.log('[Login] Tem key mas API offline - exibindo informações da key mesmo assim');
        try {
          // Atualizar informações da key mesmo sem dados do Discord
          await updateUserAccessInfo(keyData);
          startUserAccessInfoUpdates(keyData);
          
          // Aplicar nome padrão se não tiver dados do Discord
          const heroNameEl = document.getElementById('hero-discord-name');
          if (heroNameEl && !keyData.discordInfo) {
            heroNameEl.textContent = 'Usuário';
            heroNameEl.hidden = false;
          }
          
          // Aplicar avatar padrão se não tiver dados do Discord
          const heroAvatarEl = document.getElementById('hero-discord-avatar');
          if (heroAvatarEl && !keyData.discordInfo) {
            heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${(keyData.userId || 0) % 5}.png`;
            heroAvatarEl.style.display = 'block';
            heroAvatarEl.hidden = false;
            heroAvatarEl.style.visibility = 'visible';
            heroAvatarEl.style.opacity = '1';
          }
        } catch (error) {
          console.error('[Login] Erro ao atualizar informações da key:', error);
        }
      } else {
        // Sem key - mostrar como convidado
        // Garantir que card de ativar key top está visível
        const activateKeyCardTop = document.getElementById('activate-key-card-top');
        const userCard = document.getElementById('user-card');
        if (activateKeyCardTop) activateKeyCardTop.style.display = 'block';
        if (userCard) userCard.style.display = 'none';
        
        // Aplicar "Bem vindo convidado"
        const heroNameEl = document.getElementById('hero-discord-name');
        const heroAvatarEl = document.getElementById('hero-discord-avatar');
        if (heroNameEl) {
          heroNameEl.textContent = 'Convidado';
          heroNameEl.hidden = false;
        }
        if (heroAvatarEl) {
          heroAvatarEl.src = 'https://cdn.discordapp.com/embed/avatars/0.png';
          heroAvatarEl.style.display = 'block';
          heroAvatarEl.hidden = false;
          heroAvatarEl.style.visibility = 'visible';
          heroAvatarEl.style.opacity = '1';
          console.log('[Login] Avatar de convidado carregado (API offline ou sem key)');
        }
      }
    }
    
    // Carregar componentes do app
    if (appShell && !appShell.hidden) {
      try {
        console.log('[Login] Carregando componentes do app...');
        
        // Aguardar um pouco para garantir que o DOM esteja pronto
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Garantir que a seção "general" esteja ativa
        console.log('[Login] Ativando seção "general"...');
        ensureGeneralSectionActive();
        
        // Garantir que os controles de otimização estejam vinculados
        ensureOptimizationControls();
        console.log('[Login] Controles de otimização inicializados');
        
        // Verificar se a seção foi ativada
        const generalSection = document.querySelector('.panel-section[data-section="general"]');
        if (generalSection) {
          generalSection.style.display = 'block';
          generalSection.style.visibility = 'visible';
          generalSection.style.opacity = '1';
          generalSection.classList.add('active');
          
          // Forçar reflow para garantir que o CSS seja aplicado
          void generalSection.offsetHeight;
          
          console.log('[Login] Seção "general" forçada a aparecer');
          console.log('[Login] General section display:', window.getComputedStyle(generalSection).display);
          console.log('[Login] General section visibility:', window.getComputedStyle(generalSection).visibility);
        }
        
        // Iniciar atualização de informações do sistema em tempo real
        // Limpar intervalo anterior se existir para evitar múltiplos intervalos
        if (systemInfoInterval) {
          clearInterval(systemInfoInterval);
          systemInfoInterval = null;
        }
        
        // Carregar informações do sistema apenas uma vez (não em tempo real)
        setTimeout(async () => {
          try {
            await refreshSystemInfo();
          } catch (error) {
            console.error('[Login] Erro ao atualizar system info:', error);
          }
        }, 500);
        
        // Renderizar otimizações logo após o app ser mostrado
        setTimeout(() => {
          try {
            renderOptimizations();
          } catch (error) {
            console.error('[Login] Erro ao renderizar otimizações:', error);
          }
        }, 500);
        
        setTimeout(() => {
          try {
            renderEmulatorGallery();
          } catch (error) {
            console.error('[Login] Erro ao renderizar galeria de emuladores:', error);
          }
        }, 500);
      } catch (error) {
        console.error('[Login] Erro ao carregar componentes do app:', error);
      }
    } else {
      console.warn('[Login] App shell está oculto ou não existe');
    }
  } catch (error) {
    console.error('[Login] Erro ao mostrar aplicativo:', error);
  }
  
  // Verificar tipo de key e aplicar restrições após um delay
  setTimeout(() => {
    if (keyData && keyData.type) {
      applyKeyRestrictions(keyData.type === 'vip');
    }
  }, 500);
  
  console.log('[Login] Aplicativo exibido. Login overlay:', loginOverlay?.hidden, 'App shell:', appShell?.hidden);
}

function showApp() {
  // Função mantida para compatibilidade, mas não deve ser usada diretamente após login
  showAppAfterTermsAccepted();
}

function showLoginStatus(message, type = 'error') {
  if (!loginStatus || !loginStatusMessage) return;
  loginStatusMessage.textContent = message;
  loginStatus.className = `login-status ${type}`;
  loginStatus.hidden = false;
}

function hideLoginStatus() {
  if (loginStatus) loginStatus.hidden = true;
}

function hideLogin() {
  if (loginOverlay) {
    loginOverlay.hidden = true;
    loginOverlay.style.display = 'none';
    loginOverlay.classList.add('hidden');
  }
}

function showAppShell() {
  if (appShell) {
    appShell.hidden = false;
    appShell.style.display = 'flex';
    appShell.classList.remove('hidden');
  }
}

// Variável global para armazenar nível de acesso atual
let currentAccessLevel = 'simple'; // 'simple', 'basic', 'vip'

// Função para determinar nível de acesso baseado no tipo de key
function getAccessLevelFromKey(keyData) {
  if (!keyData || !keyData.type) {
    return 'simple';
  }
  const keyType = keyData.type.toLowerCase();
  if (keyType === 'vip') {
    return 'vip';
  } else if (keyType === 'basic' || keyType === 'basico' || keyType === 'normal') {
    return 'basic';
  }
  return 'simple';
}

// Verificar se usuário tem VIP ou Básico
async function hasVIPOrBasic() {
  try {
    // Tentar obter dados da key de várias formas
    let keyData = window._pendingKeyData;
    
    if (!keyData) {
      // Tentar obter via checkAccessKey
      try {
        const accessKeyResult = await window.y20.checkAccessKey();
        if (accessKeyResult && accessKeyResult.hasKey && accessKeyResult.data) {
          keyData = accessKeyResult.data;
        }
      } catch (e) {
        // Ignorar erro
      }
    }
    
    if (!keyData) {
      // Tentar obter via isAuthenticated
      try {
        const authResult = await window.y20.isAuthenticated();
        if (authResult && authResult.authenticated && authResult.keyData) {
          keyData = authResult.keyData;
        }
      } catch (e) {
        // Ignorar erro
      }
    }
    
    if (!keyData) {
      return false;
    }
    
    const accessLevel = getAccessLevelFromKey(keyData);
    return accessLevel === 'vip' || accessLevel === 'basic';
  } catch (error) {
    console.error('[Renderer] Erro ao verificar VIP/Básico:', error);
    return false;
  }
}

// Verificar se usuário tem key VIP especificamente
async function hasVIPKey() {
  try {
    // Tentar obter dados da key de várias formas
    let keyData = window._pendingKeyData;
    
    if (!keyData) {
      // Tentar obter via checkAccessKey
      try {
        const accessKeyResult = await window.y20.checkAccessKey();
        if (accessKeyResult && accessKeyResult.hasKey && accessKeyResult.data) {
          keyData = accessKeyResult.data;
        }
      } catch (e) {
        // Ignorar erro
      }
    }
    
    if (!keyData) {
      // Tentar obter via isAuthenticated
      try {
        const authResult = await window.y20.isAuthenticated();
        if (authResult && authResult.authenticated && authResult.keyData) {
          keyData = authResult.keyData;
        }
      } catch (e) {
        // Ignorar erro
      }
    }
    
    if (!keyData) {
      return false;
    }
    
    const accessLevel = getAccessLevelFromKey(keyData);
    return accessLevel === 'vip';
  } catch (error) {
    console.error('[Renderer] Erro ao verificar VIP:', error);
    return false;
  }
}

// Mostrar tela de bloqueio para VIP/Básico offline
function showVIPOfflineBlock() {
  if (vipOfflineBlock) {
    vipOfflineBlock.hidden = false;
    vipOfflineBlock.style.display = 'flex';
    // NÃO bloquear interações completamente - permitir usar recursos normais
    // Apenas mostrar mensagem informando que API está offline
    if (appShell) {
      // Não bloquear completamente, apenas reduzir opacidade para mostrar aviso
      appShell.style.opacity = '0.95';
    }
    console.log('[Renderer] Aviso API offline exibido para usuário VIP/Básico (recursos normais disponíveis)');
  }
}

// Esconder tela de bloqueio para VIP/Básico offline
function hideVIPOfflineBlock() {
  if (vipOfflineBlock) {
    vipOfflineBlock.hidden = true;
    vipOfflineBlock.style.display = 'none';
    // Restaurar interações com o painel
    if (appShell) {
      appShell.style.pointerEvents = 'auto';
      appShell.style.opacity = '1';
    }
      // Log removido para reduzir carga no painel
  }
}

// Banner de aviso API offline (topo - manter para compatibilidade)
let apiOfflineBanner = null;
let apiOfflineCheckInterval = null;

// Aviso API offline no Dashboard
let dashboardApiWarning = null;
let dashboardApiRetryBtn = null;

// Status de verificação de servidores
let serverCheckStatus = null;
let serverCheckMessage = null;

// Mostrar banner de aviso API offline
function showApiOfflineBanner() {
  // Mostrar card de manutenção quando API está offline
  const maintenanceCard = document.getElementById('api-maintenance-card');
  if (maintenanceCard) {
    maintenanceCard.hidden = false;
    maintenanceCard.style.display = 'block';
    console.log('[Renderer] Card de manutenção exibido (API offline)');
  }
  
  // Garantir que o banner antigo está escondido
  if (!apiOfflineBanner) {
    apiOfflineBanner = document.getElementById('api-offline-banner');
  }
  if (apiOfflineBanner) {
    apiOfflineBanner.hidden = true;
    apiOfflineBanner.style.display = 'none';
  }
  
  // Esconder banner do topo (apenas mostrar no dashboard)
  if (!apiOfflineBanner) {
    apiOfflineBanner = document.getElementById('api-offline-banner');
  }
  if (apiOfflineBanner) {
    apiOfflineBanner.hidden = true;
    apiOfflineBanner.style.display = 'none';
  }
  
  // Mostrar aviso no dashboard
  showDashboardApiWarning();
}

// Esconder banner de aviso API offline
function hideApiOfflineBanner() {
  // Esconder card de manutenção quando API está online
  const maintenanceCard = document.getElementById('api-maintenance-card');
  if (maintenanceCard) {
    maintenanceCard.hidden = true;
    maintenanceCard.style.display = 'none';
    console.log('[Renderer] Card de manutenção escondido (API online)');
  }
  
  // Garantir que o banner antigo está escondido
  if (!apiOfflineBanner) {
    apiOfflineBanner = document.getElementById('api-offline-banner');
  }
  if (apiOfflineBanner) {
    apiOfflineBanner.hidden = true;
    apiOfflineBanner.style.display = 'none';
  }
  
  // Esconder aviso do dashboard
  hideDashboardApiWarning();
}

// Mostrar aviso API offline no dashboard
function showDashboardApiWarning() {
  if (!dashboardApiWarning) {
    dashboardApiWarning = document.getElementById('dashboard-api-offline-warning');
  }
  if (dashboardApiWarning) {
    dashboardApiWarning.hidden = false;
    dashboardApiWarning.style.display = 'block';
    console.log('[Renderer] Aviso API offline exibido no dashboard');
    
    // Vincular botão de retry se ainda não foi vinculado
    if (!dashboardApiRetryBtn) {
      dashboardApiRetryBtn = document.getElementById('dashboard-api-retry-btn');
      if (dashboardApiRetryBtn && !dashboardApiRetryBtn.dataset.bound) {
        dashboardApiRetryBtn.addEventListener('click', async () => {
          dashboardApiRetryBtn.disabled = true;
          dashboardApiRetryBtn.textContent = 'Verificando...';
          
          try {
            await checkVIPOfflineStatus();
            setTimeout(() => {
              dashboardApiRetryBtn.disabled = false;
              dashboardApiRetryBtn.textContent = 'Tentar novamente';
            }, 1000);
          } catch (error) {
            console.error('[Renderer] Erro ao verificar API:', error);
            dashboardApiRetryBtn.disabled = false;
            dashboardApiRetryBtn.textContent = 'Tentar novamente';
          }
        });
        dashboardApiRetryBtn.dataset.bound = 'true';
      }
    }
  }
}

// Esconder aviso API offline do dashboard
function hideDashboardApiWarning() {
  if (!dashboardApiWarning) {
    dashboardApiWarning = document.getElementById('dashboard-api-offline-warning');
  }
  if (dashboardApiWarning) {
    dashboardApiWarning.hidden = true;
    dashboardApiWarning.style.display = 'none';
    console.log('[Renderer] Aviso API offline escondido do dashboard');
  }
}

// Mostrar status de verificação de servidores
function showServerCheckStatus(title, message) {
  if (!serverCheckStatus) {
    serverCheckStatus = document.getElementById('server-check-status');
    serverCheckMessage = document.getElementById('server-check-message');
  }
  if (serverCheckStatus) {
    const strongEl = serverCheckStatus.querySelector('strong');
    if (strongEl) {
      strongEl.textContent = title;
    }
    if (serverCheckMessage) {
      serverCheckMessage.textContent = message;
    }
    serverCheckStatus.hidden = false;
    serverCheckStatus.style.display = 'block';
  }
}

// Esconder status de verificação de servidores
function hideServerCheckStatus() {
  if (!serverCheckStatus) {
    serverCheckStatus = document.getElementById('server-check-status');
  }
  if (serverCheckStatus) {
    serverCheckStatus.hidden = true;
    serverCheckStatus.style.display = 'none';
  }
}

// Verificar status da API e forçar acesso simples quando offline
// Retorna { apiOnline: boolean } para uso na inicialização
async function checkVIPOfflineStatus() {
  try {
    // Verificar se API está online (SEMPRE verificar, não importa se tem VIP/Básico ou não)
    let apiOnline = false;
    try {
      if (window.y20 && window.y20.checkApiHealth) {
        const health = await Promise.race([
          window.y20.checkApiHealth(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000))
        ]);
        apiOnline = health && health.online === true;
      } else {
        // Fallback: verificar network
        apiOnline = navigator.onLine;
      }
    } catch (error) {
      console.warn('[Renderer] Erro ao verificar saúde da API (offline):', error.message);
      apiOnline = false;
    }
    
    // Retornar status imediatamente se for chamada durante inicialização (para evitar modificar estado antes de abrir painel)
    const isInitialization = !appShell || appShell.hidden;
    
    // Se o app acabou de carregar, não mostrar avisos (apenas retornar status)
    const justLoaded = window._appJustLoaded === true;
    
    if (isInitialization || justLoaded) {
      return { apiOnline };
    }

    if (!apiOnline) {
      // API offline - SEMPRE forçar acesso simples e mostrar banner
      console.log('[Renderer] API offline detectada - forçando acesso simples e mostrando banner');
      
      // IMPORTANTE: Forçar acesso simples quando API está offline (só se painel já estiver aberto)
      if (!isInitialization && currentAccessLevel !== 'simple') {
        currentAccessLevel = 'simple';
        initializeAppWithAccessLevel('simple');
        updateAccessLevelUI('simple');
      }
      
      // Mostrar banner e esconder tela de bloqueio VIP (só se painel já estiver aberto)
      if (!isInitialization) {
        // Mostrar aviso no dashboard
        showApiOfflineBanner();
        
        // Esconder tela de bloqueio VIP se estiver visível
        hideVIPOfflineBlock();
      }
      
      // Iniciar verificação contínua quando API está offline (otimizado: a cada 60 segundos)
      if (!isInitialization && !apiOfflineCheckInterval) {
        apiOfflineCheckInterval = setInterval(async () => {
          await checkVIPOfflineStatus();
        }, 60 * 1000); // Verificar a cada 60 segundos quando offline - otimizado para reduzir consumo
      }
      
      return { apiOnline: false };
    } else {
      // API online - verificar se MongoDB está offline antes de esconder banner
      // Se MongoDB estiver offline, manter o banner visível
      const mongoOffline = window._mongoOffline === true;
      
      if (!mongoOffline) {
        // API online e MongoDB online - esconder banner e parar verificação contínua
        if (!isInitialization) {
          hideApiOfflineBanner();
          
          if (apiOfflineCheckInterval) {
            clearInterval(apiOfflineCheckInterval);
            apiOfflineCheckInterval = null;
          }
        }
      } else {
        // MongoDB offline - manter banner visível mesmo com API online
        console.log('[Renderer] MongoDB offline - mantendo banner visível');
        if (!isInitialization && typeof showDashboardApiWarning === 'function') {
          showDashboardApiWarning();
        }
        
        // Verificar se MongoDB voltou online
        try {
          const botStatus = await checkBotStatus();
          if (botStatus && botStatus.mongoConnected === true) {
            // MongoDB voltou online - limpar flag e esconder banner
            window._mongoOffline = false;
            if (!isInitialization) {
              hideApiOfflineBanner();
            }
            console.log('[Renderer] ✅ MongoDB voltou online - banner removido');
          }
        } catch (error) {
          console.warn('[Renderer] Erro ao verificar status do bot:', error);
        }
      }
      
      // Verificar se precisa restaurar acessos premium (só se ambos online)
      if (!mongoOffline && !isInitialization) {
        const hasVIPBasic = await hasVIPOrBasic().catch(() => false);
        if (hasVIPBasic && currentAccessLevel === 'simple') {
          try {
            const storedKey = await window.y20.checkAccessKey().catch(() => ({ hasKey: false }));
            if (storedKey && storedKey.hasKey) {
              const authResult = await window.y20.isAuthenticated();
              if (authResult && authResult.authenticated && authResult.valid && !authResult.revoked && !authResult.expired && !authResult.notFound) {
                // Restaurar acessos premium
                const accessLevel = getAccessLevelFromKey(authResult.keyData);
                currentAccessLevel = accessLevel;
                initializeAppWithAccessLevel(accessLevel);
                updateAccessLevelUI(accessLevel);
                console.log('[Renderer] Acessos premium restaurados automaticamente após API voltar online');
                
                // Buscar e aplicar dados do Discord
                if (authResult.keyData && authResult.keyData.userId) {
                  try {
                    const discordResult = await window.y20.getDiscordUser(authResult.keyData.userId, false);
                    if (discordResult && discordResult.success && discordResult.data) {
                      // Atualizar avatar e nome
                      const heroAvatarEl = document.getElementById('hero-discord-avatar');
                      const heroNameEl = document.getElementById('hero-discord-name');
                      
                      if (heroAvatarEl && discordResult.data.avatar_url) {
                        heroAvatarEl.src = discordResult.data.avatar_url;
                        heroAvatarEl.style.display = 'block';
                        heroAvatarEl.hidden = false;
                      }
                      
                      if (heroNameEl) {
                        heroNameEl.textContent = discordResult.data.tag || discordResult.data.username || discordResult.data.global_name || 'Usuário';
                        heroNameEl.hidden = false;
                      }
                      
                      // Atualizar informações de acesso (key, dias, expira)
                      await updateUserAccessInfo(authResult.keyData);
                      startUserAccessInfoUpdates(authResult.keyData);
                      
                      // Esconder card de ativar key e mostrar user card
                      const activateKeyCardTop = document.getElementById('activate-key-card-top');
                      const userCard = document.getElementById('user-card');
                      if (activateKeyCardTop) activateKeyCardTop.style.display = 'none';
                      if (userCard) userCard.style.display = 'block';
                      
                      console.log('[Renderer] Dados do Discord carregados após restaurar acessos premium');
                    }
                  } catch (discordError) {
                    console.warn('[Renderer] Erro ao carregar dados do Discord:', discordError.message);
                  }
                }
                
                if (typeof showToast === 'function') {
                  showToast('✅ API está online! Acessos premium restaurados.', 'success');
                }
              }
            }
          } catch (error) {
            console.warn('[Renderer] Erro ao restaurar acessos premium (não crítico):', error.message);
          }
        }
      }
      
      return { apiOnline: true };
    }
  } catch (error) {
    console.error('[Renderer] Erro ao verificar status API offline:', error);
    // Em caso de erro, assumir que API está offline
    const isInitialization = !appShell || appShell.hidden;
    if (!isInitialization) {
      if (currentAccessLevel !== 'simple') {
        currentAccessLevel = 'simple';
        initializeAppWithAccessLevel('simple');
        updateAccessLevelUI('simple');
      }
      // Mostrar aviso no dashboard
      showApiOfflineBanner();
      hideVIPOfflineBlock();
    }
    return { apiOnline: false };
  }
}

// Função auxiliar para bloquear elemento (visualizar mas não executar)
function blockElement(element, tooltip = 'Esta funcionalidade requer key ativada') {
  if (!element) return;
  element.disabled = true;
  element.style.opacity = '0.5';
  element.style.cursor = 'not-allowed';
  element.title = tooltip;
  element.setAttribute('data-blocked', 'true');
}

// Função auxiliar para liberar elemento
function unblockElement(element) {
  if (!element) return;
  element.disabled = false;
  element.style.opacity = '1';
  element.style.cursor = 'pointer';
  element.title = '';
  element.removeAttribute('data-blocked');
}

// Função auxiliar para bloquear botões dentro de um painel
function blockPanelButtons(panelId) {
  const panel = document.getElementById(panelId);
  if (panel) {
    // Bloquear todos os botões de ação dentro do painel (exceto navegação)
    const buttonsInPanel = panel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button');
    buttonsInPanel.forEach(btn => {
      // Não bloquear botões que já estão permitidos (activate-services, optimize-simple)
      if (btn.id && (btn.id.includes('activate-services') || btn.id.includes('optimize-simple'))) {
        return;
      }
      // NÃO bloquear botão de cancelar de otimização
      if (btn.id === 'optimize-cancel' || btn.id === 'cancel-confirm-cancel' || btn.id === 'cancel-confirm-continue') {
        return;
      }
      // Não bloquear botões de navegação
      if (btn.hasAttribute('data-view')) {
        return;
      }
      blockElement(btn, 'Esta funcionalidade requer key ativada');
    });
    
    // Bloquear toggles/checkboxes dentro do painel
    const togglesInPanel = panel.querySelectorAll('input[type="checkbox"].toggle-switch input, .toggle-switch input[type="checkbox"], label.toggle-switch input');
    togglesInPanel.forEach(toggle => {
      toggle.disabled = true;
      toggle.style.opacity = '0.5';
      toggle.style.cursor = 'not-allowed';
      toggle.title = 'Esta funcionalidade requer key ativada';
      toggle.setAttribute('data-blocked', 'true');
      
      // Bloquear o label também
      const toggleLabel = toggle.closest('.toggle-switch');
      if (toggleLabel) {
        toggleLabel.style.opacity = '0.5';
        toggleLabel.style.cursor = 'not-allowed';
        toggleLabel.title = 'Esta funcionalidade requer key ativada';
        toggleLabel.setAttribute('data-blocked', 'true');
      }
    });
  }
}

// Função para inicializar app com nível de acesso específico
function initializeAppWithAccessLevel(level) {
  currentAccessLevel = level;
  console.log('[Access] Inicializando app com nível de acesso:', level);
  
  // ✅ Garantir que o card de velocidade internet sempre apareça
  const internetSpeedCard = document.querySelector('.internet-speed-card');
  if (internetSpeedCard) {
    internetSpeedCard.style.display = '';
    internetSpeedCard.hidden = false;
    internetSpeedCard.style.visibility = 'visible';
    internetSpeedCard.style.opacity = '1';
  }
  
  // Inicializar funcionalidades básicas que sempre devem estar disponíveis
  // Botão Neon removido da UI
  
  // Aplicar restrições baseadas no nível de acesso
  applyAccessLevelRestrictions(level);
}

// Função para aplicar restrições baseadas no nível de acesso
function applyAccessLevelRestrictions(level) {
  console.log('[Access] Aplicando restrições para nível:', level);
  
  // ✅ Garantir que o card de velocidade internet sempre apareça
  const internetSpeedCard = document.querySelector('.internet-speed-card');
  if (internetSpeedCard) {
    internetSpeedCard.style.display = '';
    internetSpeedCard.hidden = false;
    internetSpeedCard.style.visibility = 'visible';
    internetSpeedCard.style.opacity = '1';
  }
  
  if (level === 'simple') {
    // ========== ABA GERAL ==========
    // ✅ ATIVAR SERVIÇOS - liberado
    const activateServicesBtn = document.getElementById('activate-services');
    unblockElement(activateServicesBtn);
    
    // ✅ OTIMIZAR SIMPLES - liberado
    const optimizeSimpleBtn = document.getElementById('optimize-simple');
    unblockElement(optimizeSimpleBtn);
    
    // ❌ OTIMIZAR BÁSICO - bloqueado
    const optimizeBasicBtn = document.getElementById('optimize-basic');
    blockElement(optimizeBasicBtn, 'Esta funcionalidade requer key básica ou VIP');
    
    // ❌ OTIMIZAR VIP - bloqueado
    const optimizeVipBtn = document.getElementById('optimize-vip');
    blockElement(optimizeVipBtn, 'Esta funcionalidade requer key VIP');
    
    // ❌ PREDEFINIÇÃO - bloqueado (visível mas desabilitado)
    const presetButton = document.getElementById('preset-button');
    const presetExecute = document.getElementById('preset-execute');
    const presetEdit = document.getElementById('preset-edit');
    const presetDelete = document.getElementById('preset-delete');
    if (presetButton) {
      presetButton.disabled = true;
      presetButton.style.opacity = '0.5';
      presetButton.style.cursor = 'not-allowed';
      presetButton.title = 'Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!';
      presetButton.setAttribute('data-blocked', 'true');
    }
    if (presetExecute) {
      presetExecute.disabled = true;
      presetExecute.style.opacity = '0.5';
      presetExecute.style.cursor = 'not-allowed';
    }
    if (presetEdit) {
      presetEdit.disabled = true;
      presetEdit.style.opacity = '0.5';
      presetEdit.style.cursor = 'not-allowed';
    }
    if (presetDelete) {
      presetDelete.disabled = true;
      presetDelete.style.opacity = '0.5';
      presetDelete.style.cursor = 'not-allowed';
    }
    
    // ❌ PALETA DE CORES - bloqueado
    const paletteButton = document.getElementById('palette-button');
    if (paletteButton) {
      paletteButton.disabled = true;
      paletteButton.style.opacity = '0.5';
      paletteButton.style.cursor = 'not-allowed';
      paletteButton.title = 'Paleta de cores requer key ativada';
      paletteButton.setAttribute('data-blocked', 'true');
    }
    
    // ========== ABA OTIMIZAÇÃO ==========
    // ❌ Configurações básicas - botão de navegação clicável, mas conteúdo bloqueado
    const basicSettingsBtn = document.querySelector('[data-view="panel-basic-settings"]');
    // NÃO bloquear o botão de navegação, permitir clicar para visualizar
    if (basicSettingsBtn) {
      basicSettingsBtn.disabled = false;
      basicSettingsBtn.style.opacity = '1';
      basicSettingsBtn.style.cursor = 'pointer';
      basicSettingsBtn.removeAttribute('data-blocked');
    }
    // Bloquear botões dentro do painel (funções de ação)
    blockPanelButtons('panel-basic-settings');
    
    // ❌ Otimizar Windows - botão de navegação clicável, mas conteúdo bloqueado
    const windowsOptimizeBtn = document.querySelector('[data-view="panel-windows-optimize"]');
    if (windowsOptimizeBtn) {
      windowsOptimizeBtn.disabled = false;
      windowsOptimizeBtn.style.opacity = '1';
      windowsOptimizeBtn.style.cursor = 'pointer';
      windowsOptimizeBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-windows-optimize');
    
    // ✅ Plano Energia - liberado
    const powerPlanBtn = document.querySelector('[data-view="panel-power-plan"]');
    unblockElement(powerPlanBtn);
    
    // ✅ Limpeza Windows - liberado
    const cleanupWindowsBtn = document.querySelector('[data-view="panel-cleanup-windows"]');
    unblockElement(cleanupWindowsBtn);
    
    // ❌ Desativar Windows - botão de navegação clicável, mas conteúdo bloqueado
    const disableWindowsBtn = document.querySelector('[data-view="panel-disable-windows"]');
    if (disableWindowsBtn) {
      disableWindowsBtn.disabled = false;
      disableWindowsBtn.style.opacity = '1';
      disableWindowsBtn.style.cursor = 'pointer';
      disableWindowsBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-disable-windows');
    
    // ❌ Scripts Importantes - botão de navegação clicável, mas conteúdo bloqueado
    const importantScriptsBtn = document.querySelector('[data-view="panel-important-scripts"]');
    if (importantScriptsBtn) {
      importantScriptsBtn.disabled = false;
      importantScriptsBtn.style.opacity = '1';
      importantScriptsBtn.style.cursor = 'pointer';
      importantScriptsBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-important-scripts');
    
    // ❌ Booster Robusta - botão de navegação clicável, mas conteúdo bloqueado
    const boosterRobustaBtn = document.querySelector('[data-view="panel-booster-robusta"]');
    if (boosterRobustaBtn) {
      boosterRobustaBtn.disabled = false;
      boosterRobustaBtn.style.opacity = '1';
      boosterRobustaBtn.style.cursor = 'pointer';
      boosterRobustaBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-booster-robusta');
    
    // ========== ABA CONFIG/EMU ==========
    // ❌ Ajustar Emulador - botão de navegação clicável, mas conteúdo bloqueado
    const emulatorBtn = document.querySelector('[data-view="panel-emulator"]');
    if (emulatorBtn) {
      emulatorBtn.disabled = false;
      emulatorBtn.style.opacity = '1';
      emulatorBtn.style.cursor = 'pointer';
      emulatorBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-emulator');
    
    // ❌ Tirar delay - botão de navegação clicável, mas conteúdo bloqueado
    const delayBtn = document.querySelector('[data-view="panel-delay"]');
    if (delayBtn) {
      delayBtn.disabled = false;
      delayBtn.style.opacity = '1';
      delayBtn.style.cursor = 'pointer';
      delayBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-delay');
    
    // ❌ Otimizar com APPS - botão de navegação clicável, mas conteúdo bloqueado
    const appsBtn = document.querySelector('[data-view="panel-apps"]');
    if (appsBtn) {
      appsBtn.disabled = false;
      appsBtn.style.opacity = '1';
      appsBtn.style.cursor = 'pointer';
      appsBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-apps');
    
    // ✅ Cursores - liberado
    const cursorsBtn = document.querySelector('[data-view="panel-cursors"]');
    unblockElement(cursorsBtn);
    
    // ✅ FF/Emu - liberado
    const emulatorsBtn = document.querySelector('[data-view="panel-emulators"]');
    unblockElement(emulatorsBtn);
    
    // ========== ABA BACKUP ==========
    // ✅ Backup - liberado (não precisa bloquear nada)
    
    // Esconder card de assinantes VIP
    const subscribersCard = document.getElementById('subscribers-card');
    if (subscribersCard) subscribersCard.style.display = 'none';
    
  } else if (level === 'basic') {
    // ========== ABA GERAL ==========
    // ✅ ATIVAR SERVIÇOS - liberado (já estava no simples)
    const activateServicesBtn = document.getElementById('activate-services');
    unblockElement(activateServicesBtn);
    
    // ✅ OTIMIZAR SIMPLES - liberado (já estava no simples)
    const optimizeSimpleBtn = document.getElementById('optimize-simple');
    unblockElement(optimizeSimpleBtn);
    
    // ✅ OTIMIZAR BÁSICO - liberado
    const optimizeBasicBtn = document.getElementById('optimize-basic');
    unblockElement(optimizeBasicBtn);
    
    // ❌ OTIMIZAR VIP - bloqueado
    const optimizeVipBtn = document.getElementById('optimize-vip');
    blockElement(optimizeVipBtn, 'Esta funcionalidade requer key VIP');
    
    // ❌ PREDEFINIÇÃO - bloqueado (visível mas desabilitado)
    const presetButton = document.getElementById('preset-button');
    const presetExecute = document.getElementById('preset-execute');
    const presetEdit = document.getElementById('preset-edit');
    const presetDelete = document.getElementById('preset-delete');
    if (presetButton) {
      presetButton.disabled = true;
      presetButton.style.opacity = '0.5';
      presetButton.style.cursor = 'not-allowed';
      presetButton.title = 'Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!';
      presetButton.setAttribute('data-blocked', 'true');
    }
    if (presetExecute) {
      presetExecute.disabled = true;
      presetExecute.style.opacity = '0.5';
      presetExecute.style.cursor = 'not-allowed';
    }
    if (presetEdit) {
      presetEdit.disabled = true;
      presetEdit.style.opacity = '0.5';
      presetEdit.style.cursor = 'not-allowed';
    }
    if (presetDelete) {
      presetDelete.disabled = true;
      presetDelete.style.opacity = '0.5';
      presetDelete.style.cursor = 'not-allowed';
    }
    
    // ✅ PALETA DE CORES - liberado
    const paletteButton = document.getElementById('palette-button');
    if (paletteButton) {
      paletteButton.disabled = false;
      paletteButton.style.opacity = '1';
      paletteButton.style.cursor = 'pointer';
      paletteButton.title = '';
      paletteButton.removeAttribute('data-blocked');
    }
    
    // ========== ABA OTIMIZAÇÃO ==========
    // ✅ Configurações básicas - liberado
    const basicSettingsBtn = document.querySelector('[data-view="panel-basic-settings"]');
    if (basicSettingsBtn) {
      basicSettingsBtn.disabled = false;
      basicSettingsBtn.style.opacity = '1';
      basicSettingsBtn.style.cursor = 'pointer';
      basicSettingsBtn.removeAttribute('data-blocked');
      basicSettingsBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const basicSettingsPanel = document.getElementById('panel-basic-settings');
      if (basicSettingsPanel) {
        const buttonsInPanel = basicSettingsPanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button, input[type="checkbox"]');
        buttonsInPanel.forEach(btn => {
          unblockElement(btn);
          if (btn.type === 'checkbox') {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.removeAttribute('data-blocked');
            const toggleWrap = btn.closest('.toggle-switch');
            if (toggleWrap) {
              toggleWrap.style.opacity = '1';
              toggleWrap.style.cursor = 'pointer';
              toggleWrap.removeAttribute('data-blocked');
            }
          }
        });
      }
    }, 100);
    
    // ✅ Otimizar Windows - liberado
    const windowsOptimizeBtn = document.querySelector('[data-view="panel-windows-optimize"]');
    if (windowsOptimizeBtn) {
      windowsOptimizeBtn.disabled = false;
      windowsOptimizeBtn.style.opacity = '1';
      windowsOptimizeBtn.style.cursor = 'pointer';
      windowsOptimizeBtn.removeAttribute('data-blocked');
      windowsOptimizeBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const windowsOptimizePanel = document.getElementById('panel-windows-optimize');
      if (windowsOptimizePanel) {
        const buttonsInPanel = windowsOptimizePanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button, input[type="checkbox"]');
        buttonsInPanel.forEach(btn => {
          unblockElement(btn);
          if (btn.type === 'checkbox') {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.removeAttribute('data-blocked');
            const toggleWrap = btn.closest('.toggle-switch');
            if (toggleWrap) {
              toggleWrap.style.opacity = '1';
              toggleWrap.style.cursor = 'pointer';
              toggleWrap.removeAttribute('data-blocked');
            }
          }
        });
      }
    }, 100);
    
    // ✅ Plano Energia - liberado (já estava no simples)
    const powerPlanBtn = document.querySelector('[data-view="panel-power-plan"]');
    unblockElement(powerPlanBtn);
    
    // ✅ Limpeza Windows - liberado (já estava no simples)
    const cleanupWindowsBtn = document.querySelector('[data-view="panel-cleanup-windows"]');
    unblockElement(cleanupWindowsBtn);
    
    // ✅ Desativar Windows - liberado
    const disableWindowsBtn = document.querySelector('[data-view="panel-disable-windows"]');
    if (disableWindowsBtn) {
      disableWindowsBtn.disabled = false;
      disableWindowsBtn.style.opacity = '1';
      disableWindowsBtn.style.cursor = 'pointer';
      disableWindowsBtn.removeAttribute('data-blocked');
      disableWindowsBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const disableWindowsPanel = document.getElementById('panel-disable-windows');
      if (disableWindowsPanel) {
        const buttonsInPanel = disableWindowsPanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button');
        buttonsInPanel.forEach(btn => unblockElement(btn));
      }
    }, 100);
    
    // ✅ Scripts Importantes - liberado
    const importantScriptsBtn = document.querySelector('[data-view="panel-important-scripts"]');
    if (importantScriptsBtn) {
      importantScriptsBtn.disabled = false;
      importantScriptsBtn.style.opacity = '1';
      importantScriptsBtn.style.cursor = 'pointer';
      importantScriptsBtn.removeAttribute('data-blocked');
      importantScriptsBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const importantScriptsPanel = document.getElementById('panel-important-scripts');
      if (importantScriptsPanel) {
        const buttonsInPanel = importantScriptsPanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button');
        buttonsInPanel.forEach(btn => unblockElement(btn));
      }
    }, 100);
    
    // ❌ Booster Robusta - bloqueado
    const boosterRobustaBtn = document.querySelector('[data-view="panel-booster-robusta"]');
    if (boosterRobustaBtn) {
      boosterRobustaBtn.disabled = false;
      boosterRobustaBtn.style.opacity = '1';
      boosterRobustaBtn.style.cursor = 'pointer';
      boosterRobustaBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-booster-robusta');
    
    // ========== ABA CONFIG/EMU ==========
    // ✅ Ajustar Emulador - liberado
    const emulatorBtn = document.querySelector('[data-view="panel-emulator"]');
    if (emulatorBtn) {
      emulatorBtn.disabled = false;
      emulatorBtn.style.opacity = '1';
      emulatorBtn.style.cursor = 'pointer';
      emulatorBtn.removeAttribute('data-blocked');
      emulatorBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const emulatorPanel = document.getElementById('panel-emulator');
      if (emulatorPanel) {
        const buttonsInPanel = emulatorPanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .config-block button');
        buttonsInPanel.forEach(btn => unblockElement(btn));
      }
    }, 100);
    
    // ✅ Tirar delay - liberado
    const delayBtn = document.querySelector('[data-view="panel-delay"]');
    if (delayBtn) {
      delayBtn.disabled = false;
      delayBtn.style.opacity = '1';
      delayBtn.style.cursor = 'pointer';
      delayBtn.removeAttribute('data-blocked');
      delayBtn.title = '';
    }
    // Liberar botões dentro do painel
    setTimeout(() => {
      const delayPanel = document.getElementById('panel-delay');
      if (delayPanel) {
        const buttonsInPanel = delayPanel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button');
        buttonsInPanel.forEach(btn => unblockElement(btn));
      }
    }, 100);
    
    // ❌ Otimizar com APPS - bloqueado
    const appsBtn = document.querySelector('[data-view="panel-apps"]');
    if (appsBtn) {
      appsBtn.disabled = false;
      appsBtn.style.opacity = '1';
      appsBtn.style.cursor = 'pointer';
      appsBtn.removeAttribute('data-blocked');
    }
    blockPanelButtons('panel-apps');
    
    // ✅ Cursores - liberado (já estava no simples)
    const cursorsBtn = document.querySelector('[data-view="panel-cursors"]');
    unblockElement(cursorsBtn);
    
    // ✅ FF/Emu - liberado (já estava no simples)
    const emulatorsBtn = document.querySelector('[data-view="panel-emulators"]');
    unblockElement(emulatorsBtn);
    
    // ========== ABA BACKUP ==========
    // ✅ Backup - liberado (já estava no simples)
    
    // Mostrar card de assinantes VIP
    const subscribersCard = document.getElementById('subscribers-card');
    if (subscribersCard) subscribersCard.style.display = 'block';
    
  } else if (level === 'vip') {
    // ========== ABA GERAL ==========
    // ✅ PREDEFINIÇÃO - liberado para VIP
    const presetButton = document.getElementById('preset-button');
    const presetExecute = document.getElementById('preset-execute');
    const presetEdit = document.getElementById('preset-edit');
    const presetDelete = document.getElementById('preset-delete');
    if (presetButton) {
      presetButton.disabled = false;
      presetButton.style.opacity = '1';
      presetButton.style.cursor = 'pointer';
      presetButton.title = '';
      presetButton.removeAttribute('data-blocked');
    }
    if (presetExecute) {
      presetExecute.disabled = false;
      presetExecute.style.opacity = '1';
      presetExecute.style.cursor = 'pointer';
    }
    if (presetEdit) {
      presetEdit.disabled = false;
      presetEdit.style.opacity = '1';
      presetEdit.style.cursor = 'pointer';
    }
    if (presetDelete) {
      presetDelete.disabled = false;
      presetDelete.style.opacity = '1';
      presetDelete.style.cursor = 'pointer';
    }
    // Acesso VIP: TUDO liberado literalmente
    
    // ========== ABA GERAL ==========
    // ✅ Todos os botões de otimização liberados
    const activateServicesBtn = document.getElementById('activate-services');
    unblockElement(activateServicesBtn);
    
    const optimizeSimpleBtn = document.getElementById('optimize-simple');
    unblockElement(optimizeSimpleBtn);
    
    const optimizeBasicBtn = document.getElementById('optimize-basic');
    unblockElement(optimizeBasicBtn);
    
    const optimizeVipBtn = document.getElementById('optimize-vip');
    unblockElement(optimizeVipBtn);
    
    // ✅ PALETA DE CORES - liberado
    const paletteButton = document.getElementById('palette-button');
    if (paletteButton) {
      paletteButton.disabled = false;
      paletteButton.style.opacity = '1';
      paletteButton.style.cursor = 'pointer';
      paletteButton.title = '';
      paletteButton.removeAttribute('data-blocked');
    }
    
    // ========== ABA OTIMIZAÇÃO ==========
    // Liberar TODOS os botões de navegação
    const allOptimizationNavBtns = document.querySelectorAll('[data-view]');
    allOptimizationNavBtns.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.removeAttribute('data-blocked');
      btn.title = '';
    });
    
    // Liberar TODOS os botões e toggles dentro de TODOS os painéis
    setTimeout(() => {
      const allPanels = document.querySelectorAll('.config-panel');
      allPanels.forEach(panel => {
        const buttonsInPanel = panel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button, input[type="checkbox"]');
        buttonsInPanel.forEach(btn => {
          unblockElement(btn);
          if (btn.type === 'checkbox') {
            btn.disabled = false;
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.removeAttribute('data-blocked');
            const toggleWrap = btn.closest('.toggle-switch');
            if (toggleWrap) {
              toggleWrap.style.opacity = '1';
              toggleWrap.style.cursor = 'pointer';
              toggleWrap.removeAttribute('data-blocked');
            }
          }
        });
      });
    }, 100);
    
    // ========== ABA CONFIG/EMU ==========
    // Liberar TODOS os botões de config
    const allConfigNavBtns = document.querySelectorAll('[data-view="panel-emulator"], [data-view="panel-delay"], [data-view="panel-apps"], [data-view="panel-cursors"], [data-view="panel-emulators"]');
    allConfigNavBtns.forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.removeAttribute('data-blocked');
      btn.title = '';
    });
    
    // Liberar TODOS os botões dentro de TODOS os painéis de config
    setTimeout(() => {
      const configPanels = ['panel-emulator', 'panel-delay', 'panel-apps', 'panel-cursors', 'panel-emulators'];
      configPanels.forEach(panelId => {
        const panel = document.getElementById(panelId);
        if (panel) {
          const buttonsInPanel = panel.querySelectorAll('button:not([data-view]), .modern-btn:not([data-view]), .backup-button:not([data-view]), .script-card button, .config-block button');
          buttonsInPanel.forEach(btn => unblockElement(btn));
        }
      });
    }, 100);
    
    // ========== ABA BACKUP ==========
    // ✅ Backup - já liberado por padrão
    
    // Remover TODOS os bloqueios de qualquer elemento
    document.querySelectorAll('[data-blocked="true"]').forEach(element => {
      element.disabled = false;
      element.style.opacity = '1';
      element.style.cursor = element.tagName === 'BUTTON' || element.tagName === 'INPUT' ? 'pointer' : 'default';
      element.title = '';
      element.removeAttribute('data-blocked');
    });
    
    // Mostrar card de assinantes VIP
    const subscribersCard = document.getElementById('subscribers-card');
    if (subscribersCard) subscribersCard.style.display = 'block';
  }
  
  // Adicionar event listeners para mostrar mensagem ao tentar usar funcionalidades bloqueadas
  document.querySelectorAll('[data-blocked="true"]').forEach(element => {
    if (!element.dataset.blockedListener) {
      element.addEventListener('click', (e) => {
        if (element.disabled || element.getAttribute('data-blocked') === 'true') {
          e.preventDefault();
          e.stopPropagation();
          const tooltip = element.title || 'Esta funcionalidade requer key ativada';
          showToast(tooltip, 'warning');
          return false;
        }
      });
      element.dataset.blockedListener = 'true';
    }
  });
}

// Função para atualizar UI baseado no nível de acesso
function updateAccessLevelUI(level) {
  currentAccessLevel = level;
  
  // Esconder/mostrar botão "Seja VIP" baseado no nível de acesso
  if (vipButton) {
    if (level === 'vip') {
      // Se tiver acesso VIP, esconder o botão
      vipButton.style.display = 'none';
    } else {
      // Se não tiver VIP, mostrar o botão
      vipButton.style.display = 'block';
    }
  }
  
  // Esconder/mostrar card de ativar key top (substitui user card)
  const activateKeyCardTop = document.getElementById('activate-key-card-top');
  const userCard = document.getElementById('user-card');
  
  if (activateKeyCardTop && userCard) {
    // Se tem key (básico ou VIP), esconder card de ativação e mostrar user card
    if (level === 'basic' || level === 'vip') {
      activateKeyCardTop.style.display = 'none';
      userCard.style.display = 'block';
      
      // Atualizar informações da key quando o card for exibido
      setTimeout(async () => {
        try {
          const initialState = await window.y20.getInitialState();
          if (initialState && initialState.keyData) {
            await updateUserAccessInfo(initialState.keyData);
          }
        } catch (error) {
          console.error('[Renderer] Erro ao atualizar informações da key:', error);
        }
      }, 100);
    } else {
      activateKeyCardTop.style.display = 'block';
      userCard.style.display = 'none';
    }
  }
  
  // Esconder/mostrar card de indicação baseado no nível de acesso
  const referralCard = document.getElementById('referral-card');
  if (referralCard) {
    if (level === 'basic' || level === 'vip') {
      // Mostrar card de indicação para básico e VIP
      referralCard.style.display = 'block';
      // Carregar código de indicação
      loadReferralCode();
    } else {
      // Esconder card de indicação para acesso simples
      referralCard.style.display = 'none';
    }
  }
  
  // Atualizar informações PRO/VIP no user-card (movido do pro-card)
  const userProStatusItem = document.getElementById('user-pro-status-item');
  const userProStatusValue = document.getElementById('user-pro-status-value');
  const userProDescriptionItem = document.getElementById('user-pro-description-item');
  const userProDescription = document.getElementById('user-pro-description');
  
  if (userProStatusItem && userProStatusValue && userProDescriptionItem && userProDescription) {
    if (level === 'vip') {
      // VIP ativo - mostrar "VIP ATIVO" e descrição no user-card
      userProStatusItem.style.display = 'flex';
      userProStatusValue.textContent = 'VIP ATIVO';
      userProStatusValue.style.color = '#fbbf24'; // Amarelo dourado
      userProDescriptionItem.style.display = 'block';
      userProDescription.textContent = 'Você tem acesso completo do painel. Aproveite!';
    } else if (level === 'basic') {
      // Básico ativo - mostrar "BÁSICO ATIVO"
      userProStatusItem.style.display = 'flex';
      userProStatusValue.textContent = 'BÁSICO ATIVO';
      userProStatusValue.style.color = '#60a5fa'; // Azul
      userProDescriptionItem.style.display = 'block';
      userProDescription.textContent = 'Você tem acesso básico do painel. Faça upgrade para VIP e desbloqueie tudo!';
    } else {
      // Sem key - esconder informações PRO/VIP
      userProStatusItem.style.display = 'none';
      userProDescriptionItem.style.display = 'none';
    }
  }
  
  // Aplicar restrições
  applyAccessLevelRestrictions(level);
  
  // Reaplicar restrições de otimização forçada quando o nível mudar
  setTimeout(() => {
    if (typeof applyForcedOptimizationRestrictions === 'function') {
      applyForcedOptimizationRestrictions();
    }
  }, 500);
}

// Inicializar botão "Ativar" do card PRO para abrir Discord
function initializeProActivateButton() {
  const proActivateButton = document.getElementById('pro-activate-button');
  if (!proActivateButton) {
    // Tentar novamente se não encontrar
    setTimeout(initializeProActivateButton, 100);
    return;
  }
  
  // Remover listener anterior se existir (clonar para remover)
  const newBtn = proActivateButton.cloneNode(true);
  if (proActivateButton.parentNode) {
    proActivateButton.parentNode.replaceChild(newBtn, proActivateButton);
  }
  
  // Adicionar event listener para abrir Discord
  newBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Abrir Discord
      if (window.y20 && window.y20.openDiscord) {
        await window.y20.openDiscord('https://discord.gg/ZUMqUGMQWE');
      } else if (window.y20 && window.y20.openExternal) {
        await window.y20.openExternal('https://discord.gg/ZUMqUGMQWE');
      } else {
        // Fallback: tentar abrir diretamente
        window.open('https://discord.gg/ZUMqUGMQWE', '_blank');
      }
      
      showToast('Abrindo Discord... Entre e desbloqueie acesso completo!', 'info');
    } catch (error) {
      console.error('[PRO] Erro ao abrir Discord:', error);
      showToast('Erro ao abrir Discord. Tente acessar manualmente: discord.gg/ZUMqUGMQWE', 'error');
    }
  });
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProActivateButton);
} else {
  initializeProActivateButton();
}

// Também inicializar após um delay para garantir
setTimeout(initializeProActivateButton, 500);

// Função para carregar e exibir código de indicação
// IMPORTANTE: O código deve ser sempre o mesmo que foi gerado quando a key foi criada na API
async function loadReferralCode() {
  const referralCodeValue = document.getElementById('referral-code-value');
  
  if (!referralCodeValue) return;
  
  try {
    // Prioridade 1: Buscar do isAuthenticated (dados mais atualizados da API)
    try {
      const authResult = await window.y20.isAuthenticated();
      if (authResult && authResult.authenticated && authResult.keyData) {
        // Usar APENAS referralCode (campo padrão da API)
        const referralCode = authResult.keyData.referralCode;
        
        if (referralCode && typeof referralCode === 'string' && referralCode.length > 0) {
          referralCodeValue.textContent = referralCode;
          console.log('[Referral] Código carregado do isAuthenticated (API):', referralCode);
          // Salvar no store para preservar
          if (window.y20?.saveReferralCode) {
            await window.y20.saveReferralCode(referralCode);
          }
          return;
        }
      }
    } catch (authError) {
      console.warn('[Referral] Erro ao buscar do isAuthenticated:', authError);
    }
    
    // Prioridade 2: Buscar do checkAccessKey (pode ter dados mais recentes)
    try {
      const keyDataResult = await window.y20.checkAccessKey();
      if (keyDataResult && keyDataResult.data) {
        // Usar APENAS referralCode (campo padrão da API)
        const referralCode = keyDataResult.data.referralCode;
        
        if (referralCode && typeof referralCode === 'string' && referralCode.length > 0) {
          referralCodeValue.textContent = referralCode;
          console.log('[Referral] Código carregado do checkAccessKey (API):', referralCode);
          // Salvar no store para preservar
          if (window.y20?.saveReferralCode) {
            await window.y20.saveReferralCode(referralCode);
          }
          return;
        }
      }
    } catch (checkError) {
      console.warn('[Referral] Erro ao buscar do checkAccessKey:', checkError);

    }
    
    // Prioridade 3: Tentar buscar do store local (código salvo anteriormente)
    try {
      if (window.y20?.loadReferralCode) {
        const savedCode = await window.y20.loadReferralCode();
        if (savedCode && typeof savedCode === 'string' && savedCode.length > 0) {
          referralCodeValue.textContent = savedCode;
          console.log('[Referral] Código carregado do store local:', savedCode);
          return;
        }
      }
    } catch (storeError) {
      console.warn('[Referral] Erro ao buscar do store:', storeError);
    }
    
    // Se ainda não encontrou, mostrar "-"
    console.warn('[Referral] Código de indicação não encontrado. O código deve vir da API quando a key é gerada.');
    referralCodeValue.textContent = '-';
  } catch (error) {
    console.error('[Renderer] Erro ao carregar código de indicação:', error);
    referralCodeValue.textContent = '-';
  }
}

// Função para copiar código de indicação
function initializeReferralCopyButton() {
  const referralCopyBtn = document.getElementById('referral-copy-btn');
  const referralCodeValue = document.getElementById('referral-code-value');
  
  if (!referralCopyBtn || !referralCodeValue) {
    setTimeout(initializeReferralCopyButton, 100);
    return;
  }
  
  // Remover listener anterior se existir
  const newBtn = referralCopyBtn.cloneNode(true);
  if (referralCopyBtn.parentNode) {
    referralCopyBtn.parentNode.replaceChild(newBtn, referralCopyBtn);
  }
  
  newBtn.addEventListener('click', async () => {
    const code = referralCodeValue.textContent;
    if (code && code !== '-') {
      try {
        await navigator.clipboard.writeText(code);
        showToast('Código copiado para a área de transferência!', 'success');
        
        // Feedback visual
        newBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        newBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        
        setTimeout(() => {
          newBtn.style.background = '';
          newBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
      } catch (error) {
        console.error('[Renderer] Erro ao copiar código:', error);
        showToast('Erro ao copiar código.', 'error');
      }
    } else {
      showToast('Código de indicação não disponível.', 'warning');
    }
  });
}

// Inicializar botão de copiar quando DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeReferralCopyButton);
} else {
  initializeReferralCopyButton();
}

// Também inicializar após um delay para garantir
setTimeout(initializeReferralCopyButton, 500);

// Função para ativar key no dashboard (card top - substitui user card)
async function handleDashboardKeyActivationTop() {
  const dashboardKeyInputTop = document.getElementById('dashboard-key-input-top');
  const dashboardActivateBtnTop = document.getElementById('dashboard-activate-key-btn-top');
  const activateKeyStatusTop = document.getElementById('activate-key-status-top');
  
  if (!dashboardKeyInputTop || !dashboardActivateBtnTop) {
    console.error('[Dashboard] Elementos de ativação top não encontrados');
    return;
  }
  
  const key = dashboardKeyInputTop.value.trim();
  
  if (!key) {
    if (activateKeyStatusTop) {
      activateKeyStatusTop.textContent = 'Por favor, digite uma chave.';
      activateKeyStatusTop.className = 'activate-key-status-top error';
      activateKeyStatusTop.hidden = false;
    }
    return;
  }
  
  // Desabilitar botão e mostrar loading
  dashboardActivateBtnTop.disabled = true;
  dashboardActivateBtnTop.innerHTML = '<span>ATIVANDO...</span>';
  if (activateKeyStatusTop) {
    activateKeyStatusTop.hidden = true;
  }
  
  try {
    console.log('[Dashboard] Validando key (top)...');
    const result = await window.y20.validateAccessKey(key);
    
    if (result && result.success) {
      if (activateKeyStatusTop) {
        activateKeyStatusTop.textContent = 'Key ativada com sucesso! Reiniciando painel...';
        activateKeyStatusTop.className = 'activate-key-status-top success';
        activateKeyStatusTop.hidden = false;
      }
      
      // Aguardar um pouco antes de reiniciar UI e sistema
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Atualizar painel com novo nível de acesso
      await restartAppAfterKeyActivation(result.data);
      
      // Forçar reinício do painel (app) após ativar a key
      try {
        console.log('[Dashboard] Reiniciando painel após ativação da key...');
        if (window.y20?.restartApp) {
          await window.y20.restartApp();
        } else if (window.y20?.windowControl) {
          await window.y20.windowControl('restart');
        } else {
          // Fallback: recarregar a página
          console.log('[Dashboard] Recarregando página após ativação da key...');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (restartError) {
        console.warn('[Dashboard] Erro ao tentar reiniciar painel após ativar key:', restartError);
        // Fallback: recarregar a página
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      
      // Recarregar código de indicação após ativação
      setTimeout(() => {
        loadReferralCode();
      }, 2000);
    } else {
      const errorMsg = result?.message || 'Chave inválida ou não encontrada.';
      if (activateKeyStatusTop) {
        activateKeyStatusTop.textContent = errorMsg;
        activateKeyStatusTop.className = 'activate-key-status-top error';
        activateKeyStatusTop.hidden = false;
      }
    }
  } catch (error) {
    console.error('[Dashboard] Erro ao ativar key (top):', error);
    const errorMsg = error.message || 'Erro ao ativar chave. Verifique sua conexão.';
    if (activateKeyStatusTop) {
      activateKeyStatusTop.textContent = errorMsg;
      activateKeyStatusTop.className = 'activate-key-status-top error';
      activateKeyStatusTop.hidden = false;
    }
  } finally {
    dashboardActivateBtnTop.disabled = false;
    dashboardActivateBtnTop.innerHTML = '<span>ATIVAR</span>';
  }
}

// Função para reiniciar o painel após ativar key
async function restartAppAfterKeyActivation(keyData) {
  console.log('[Dashboard] Reiniciando painel após ativação de key...');
  
  // Determinar nível de acesso baseado no tipo de key
  const accessLevel = getAccessLevelFromKey(keyData);
  
  // Buscar dados do Discord se disponível
  if (keyData && keyData.userId) {
    try {
      const discordResult = await window.y20.getDiscordUser(keyData.userId, true);
      if (discordResult && discordResult.success && discordResult.data) {
        if (!keyData.discordInfo) keyData.discordInfo = {};
        keyData.discordInfo = {
          avatar: discordResult.data.avatar,
          avatar_url: discordResult.data.avatar_url,
          username: discordResult.data.username,
          tag: discordResult.data.tag,
          global_name: discordResult.data.global_name || discordResult.data.username,
          id: discordResult.data.id
        };
      }
    } catch (error) {
      console.error('[Dashboard] Erro ao buscar dados do Discord:', error);
    }
  }
  
  // Verificar termos
  const initialState = await window.y20.getInitialState();
  if (!initialState.termsAccepted) {
    // Mostrar termos antes de continuar
    showTermsAfterLogin();
    window._pendingKeyData = keyData;
    return;
  }
  
  // Mostrar tela de boas-vindas se tiver dados do Discord
  if (keyData && keyData.discordInfo) {
    showWelcomeScreen(keyData);
  } else {
    // Se não tiver dados do Discord, apenas atualizar acesso e mostrar app
    initializeAppWithAccessLevel(accessLevel);
    updateAccessLevelUI(accessLevel);
    showAppShell();
  }
  
  // Recarregar código de indicação após reiniciar
  setTimeout(() => {
    loadReferralCode();
  }, 1000);
}

async function handleLogin() {
  const key = keyInput?.value?.trim();
  
  if (!key) {
    showLoginStatus('Por favor, digite uma chave.', 'error');
    return;
  }

  if (loginButton) {
    loginButton.disabled = true;
    loginButton.classList.add('loading');
  }

  hideLoginStatus();

  try {
    console.log('[Login] Iniciando validação da chave...');
    console.log('[Login] window.y20 disponível?', !!window.y20);
    console.log('[Login] window.y20.validateAccessKey disponível?', !!(window.y20 && window.y20.validateAccessKey));
    
    if (!window.y20) {
      showLoginStatus('Erro: window.y20 não está disponível. Recarregue a aplicação.', 'error');
      console.error('[Login] window.y20 não está disponível!');
      return;
    }
    
    if (!window.y20.validateAccessKey) {
      showLoginStatus('Erro: Função de validação não está disponível. Recarregue a aplicação.', 'error');
      console.error('[Login] window.y20.validateAccessKey não está disponível!');
      return;
    }
    
    const result = await window.y20.validateAccessKey(key);
    
    console.log('[Login] Resultado da validação:', result);
    
    if (result && result.success) {
      showLoginStatus('Chave válida! Entrando...', 'success');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Verificar se os termos foram aceitos
      const initialState = await window.y20.getInitialState();
      console.log('[Login] Estado inicial:', initialState);
      
      if (!initialState.termsAccepted) {
        // Mostrar termos antes de mostrar o app
        console.log('[Login] Termos não aceitos, mostrando modal de termos...');
        showTermsAfterLogin();
        // Guardar dados da key para usar depois
        window._pendingKeyData = result.data;
      } else {
        // Termos já aceitos, mostrar tela de boas-vindas primeiro
        console.log('[Login] Termos já aceitos, mostrando tela de boas-vindas...');
        showWelcomeScreen(result.data);
      }
    } else {
      const errorMsg = result?.message || 'Chave inválida ou não encontrada.';
      console.error('[Login] Validação falhou:', errorMsg);
      showLoginStatus(errorMsg, 'error');
    }
  } catch (error) {
    console.error('[Login] Erro ao validar chave:', error);
    console.error('[Login] Stack trace:', error.stack);
    const errorMsg = error.message || 'Erro ao validar chave. Verifique sua conexão e se a API está rodando.';
    showLoginStatus(errorMsg, 'error');
  } finally {
    if (loginButton) {
      loginButton.disabled = false;
      loginButton.classList.remove('loading');
    }
  }
}

function startKeyValidation() {
  // Verificar a cada 20 minutos para não sobrecarregar servidor e gerar muitos logs
  // Quando key é cancelada ou API offline, o painel será atualizado para acesso simples
  if (keyValidationInterval) clearInterval(keyValidationInterval);
  
  keyValidationInterval = setInterval(async () => {
    try {
      const result = await window.y20.checkAccessKey();
      // Verificar se key foi cancelada/revogada/expirada OU se API está offline (erro de conexão)
      const isInvalidKey = !result || !result.success || result.expired || result.revoked || !result.valid || result.notFound;
      const isApiOffline = result?.error && (result.error.includes('conexão') || result.error.includes('timeout') || result.error.includes('ECONNREFUSED') || result.error.includes('ECONNRESET'));
      
      if (isInvalidKey || isApiOffline) {
        if (isInvalidKey) {
          console.log('[KeyValidation] Key expirada/revogada/cancelada detectada, reiniciando painel para acesso simples...');
        } else if (isApiOffline) {
          console.log('[KeyValidation] API offline detectada, reiniciando painel para acesso simples...');
        }
        
        // Parar validações
        stopKeyValidation();
        stopSystemInfoUpdates();
        stopUserAccessInfoUpdates();
        stopBotStatusCheck();
        
        // Esconder tela de boas-vindas se estiver visível
        const welcomeOverlay = document.getElementById('welcome-overlay');
        if (welcomeOverlay && !welcomeOverlay.hidden) {
          welcomeOverlay.hidden = true;
          welcomeOverlay.style.display = 'none';
        }
        
        // Esconder login overlay se estiver visível
        if (loginOverlay) {
          loginOverlay.hidden = true;
          loginOverlay.style.display = 'none';
          loginOverlay.style.visibility = 'hidden';
        }
        
        // Mostrar mensagem ao usuário
        let message = '';
        if (isApiOffline) {
          message = '⚠️ API está offline. Você pode usar recursos normais (acesso simples).';
        } else if (result?.revoked) {
          message = 'Sua chave foi cancelada. Painel reiniciado para acesso simples.';
        } else if (result?.expired) {
          message = 'Sua chave expirou. Painel reiniciado para acesso simples.';
        } else {
          message = 'Sua chave não é mais válida. Painel reiniciado para acesso simples.';
        }
        showToast(message, 'warning');
        
        // Esconder tela de bloqueio se estiver visível
        hideVIPOfflineBlock();
        
        // Mostrar aviso no dashboard se API estiver offline
        if (isApiOffline) {
          showApiOfflineBanner();
        }
        
        // Reiniciar painel com acesso simples
        currentAccessLevel = 'simple';
        
        // Atualizar UI para acesso simples
        const activateKeyCardTop = document.getElementById('activate-key-card-top');
        const userCard = document.getElementById('user-card');
        if (activateKeyCardTop) {
          activateKeyCardTop.style.display = 'block';
        }
        if (userCard) {
          userCard.style.display = 'none';
        }
        
        // Aplicar restrições de acesso simples
        initializeAppWithAccessLevel('simple');
        updateAccessLevelUI('simple');
        
        // Aplicar "Bem vindo convidado" no painel
        const heroNameEl = document.getElementById('hero-discord-name');
        const heroAvatarEl = document.getElementById('hero-discord-avatar');
        if (heroNameEl) {
          heroNameEl.textContent = 'Convidado';
        }
        if (heroAvatarEl) {
          heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
          heroAvatarEl.style.display = 'block';
          heroAvatarEl.hidden = false;
        }
        
        // Garantir que o app shell está visível
        showAppShell();
        
        console.log('[KeyValidation] Painel reiniciado com acesso simples');
      }
    } catch (error) {
      console.error('[KeyValidation] Erro na validação periódica:', error);
      // Em caso de erro de rede, verificar se é erro de conexão (API offline)
      // Se for, também reiniciar para acesso simples
      if (error?.message && (error.message.includes('conexão') || error.message.includes('timeout') || error.message.includes('ECONNREFUSED') || error.message.includes('ECONNRESET'))) {
        console.log('[KeyValidation] Erro de conexão (API offline), reiniciando painel para acesso simples...');
        
        // Parar validações
        stopKeyValidation();
        stopSystemInfoUpdates();
        stopUserAccessInfoUpdates();
        stopBotStatusCheck();
        
        // Reiniciar painel com acesso simples
        currentAccessLevel = 'simple';
        initializeAppWithAccessLevel('simple');
        updateAccessLevelUI('simple');
        
        // Esconder tela de bloqueio se estiver visível
        hideVIPOfflineBlock();
        
        // Mostrar aviso no dashboard
        showApiOfflineBanner();
      } else {
        // Outros erros: apenas logar (pode ser temporário)
        console.error('[KeyValidation] Erro na validação periódica:', error);
      }
    }
  }, 20 * 60 * 1000); // 20 minutos - verificação periódica para não sobrecarregar servidor
}

function stopKeyValidation() {
  if (keyValidationInterval) {
    clearInterval(keyValidationInterval);
    keyValidationInterval = null;
  }
}

function stopSystemInfoUpdates() {
  if (systemInfoInterval) {
    clearInterval(systemInfoInterval);
    systemInfoInterval = null;
  }
}

async function updateUserAccessInfo(keyData, heroPlanElement = null, heroDaysElement = null, heroExpiresElement = null) {
  console.log('[Renderer] updateUserAccessInfo chamada com:', keyData);
  
  if (!keyData) {
    console.warn('[Renderer] keyData não fornecido para updateUserAccessInfo');
    return;
  }
  
  // Usar elementos do hero card (topbar removido)
  const planElement = heroPlanElement || document.getElementById('hero-discord-plan');
  const daysElement = heroDaysElement || document.getElementById('hero-discord-days');
  const expiresElement = heroExpiresElement || document.getElementById('hero-discord-expires');
  const keyElement = document.getElementById('hero-discord-key');
  
  // Log removido para reduzir carga no painel
  // console.log('[Renderer] Elementos encontrados:', { 
  //   planElement: !!planElement, 
  //   daysElement: !!daysElement, 
  //   expiresElement: !!expiresElement, 
  //   keyElement: !!keyElement 
  // });
  
  if (!planElement || !daysElement || !expiresElement) {
    console.error('[Renderer] Elementos do hero card não encontrados!');
    return;
  }
  
  // Buscar e exibir a key ativa
  if (keyElement) {
    try {
      let keyToDisplay = null;
      
      // Tentar buscar key do store primeiro
      if (window.y20 && window.y20.getAccessKey) {
        // Log removido para reduzir carga no painel
        const keyResult = await window.y20.getAccessKey();
        // console.log('[Renderer] Resultado da busca de key:', keyResult);
        
        if (keyResult && keyResult.success && keyResult.key) {
          keyToDisplay = keyResult.key;
        }
      }
      
      // Se não encontrou, tentar usar keyData.key
      if (!keyToDisplay && keyData.key) {
        keyToDisplay = keyData.key;
      }
      
      // Atualizar elemento com a key
      if (keyToDisplay) {
        // Remover listeners anteriores (clonar para remover)
        const newKeyElement = keyElement.cloneNode(true);
        newKeyElement.textContent = keyToDisplay;
        newKeyElement.title = `Key ativa: ${keyToDisplay} - Clique para copiar`;
        newKeyElement.style.cursor = 'pointer';
        newKeyElement.hidden = false;
        newKeyElement.style.display = 'inline';
        
        // Adicionar listener de clique para copiar
        newKeyElement.addEventListener('click', () => {
          navigator.clipboard.writeText(keyToDisplay).then(() => {
            showToast('Key copiada para a área de transferência!', 'success');
          }).catch(() => {
            showToast('Erro ao copiar key', 'error');
          });
        });
        
        if (keyElement.parentNode) {
          keyElement.parentNode.replaceChild(newKeyElement, keyElement);
        }
        // Log removido para reduzir carga no painel
        // console.log('[Renderer] Key exibida:', keyToDisplay);
      } else {
        keyElement.textContent = 'N/A';
        keyElement.hidden = false;
        keyElement.style.cursor = 'default';
      }
    } catch (error) {
      console.error('[Renderer] Erro ao buscar key:', error);
      if (keyElement) {
        // Tentar usar a key dos dados em caso de erro
        if (keyData.key) {
          keyElement.textContent = keyData.key;
          keyElement.hidden = false;
        } else {
          keyElement.textContent = 'N/A';
          keyElement.hidden = false;
        }
      }
    }
  }
  
  // Tipo de plano
  const isVip = keyData.type === 'vip';
  const planText = isVip ? '⭐ VIP' : '📦 Plano Normal';
  const planClass = isVip ? 'hero-plan vip' : 'hero-plan normal';
  
  planElement.textContent = planText;
  planElement.className = planClass;
  planElement.hidden = false;
  planElement.style.display = 'inline';
  
  // Calcular dias restantes
  if (keyData.expiresAt) {
    const expiresAt = new Date(keyData.expiresAt);
    const now = new Date();
    const diffTime = expiresAt - now;
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    
    const daysText = diffDays > 0 
      ? `${diffDays} ${diffDays === 1 ? 'dia restante' : 'dias restantes'}`
      : 'Expirado';
    const daysClass = diffDays > 0 ? 'hero-days' : 'hero-days expired';
    
    daysElement.textContent = daysText;
    daysElement.className = daysClass;
    daysElement.hidden = false;
    daysElement.style.display = 'inline';
    
    // Data de expiração formatada
    const expiresDate = expiresAt.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
    const expiresText = `Expira em: ${expiresDate}`;
    expiresElement.textContent = expiresText;
    expiresElement.hidden = false;
    expiresElement.style.display = 'inline';
  } else if (keyData.days) {
    const daysText = `${keyData.days} ${keyData.days === 1 ? 'dia' : 'dias'}`;
    const expiresText = 'Plano ativo';
    
    daysElement.textContent = daysText;
    daysElement.className = 'hero-days';
    daysElement.hidden = false;
    daysElement.style.display = 'inline';
    expiresElement.textContent = expiresText;
    expiresElement.hidden = false;
    expiresElement.style.display = 'inline';
  } else {
    const daysText = 'Acesso ativo';
    const expiresText = '';
    
    daysElement.textContent = daysText;
    daysElement.className = 'hero-days';
    daysElement.hidden = false;
    daysElement.style.display = 'inline';
    expiresElement.textContent = expiresText;
    expiresElement.hidden = expiresText === '';
  }
  
  // Log removido para reduzir carga no painel
  // console.log('[Renderer] Informações de acesso atualizadas:', {
  //   plan: planText,
  //   days: daysElement.textContent,
  //   expires: expiresElement.textContent
  // });
}

function startUserAccessInfoUpdates(keyData) {
  if (userAccessUpdateInterval) {
    clearInterval(userAccessUpdateInterval);
    userAccessUpdateInterval = null;
  }
  
  if (!keyData) return;
  
  // Obter elementos do hero card
  const heroPlan = document.getElementById('hero-discord-plan');
  const heroDays = document.getElementById('hero-discord-days');
  const heroExpires = document.getElementById('hero-discord-expires');
  
  // Atualizar imediatamente (tanto topbar quanto hero card)
  updateUserAccessInfo(keyData, heroPlan, heroDays, heroExpires);
  
  // Otimizado: Atualizar a cada 2 horas (7200000ms) para não sobrecarregar servidor
  // Com 100 usuários: ~0.83 requisições/minuto ao invés de 50 requisições/minuto
  userAccessUpdateInterval = setInterval(async () => {
    try {
      // Consultar API para verificar status atualizado (dias restantes)
      const authResult = await window.y20.isAuthenticated();
      if (authResult && authResult.authenticated && authResult.valid && authResult.keyData) {
        // Verificar se os dados mudaram antes de atualizar
        // Usar localStorage como fallback para verificar mudanças
        const currentKeyDataStr = localStorage.getItem('keyData');
        let currentKeyData = null;
        try {
          currentKeyData = currentKeyDataStr ? JSON.parse(currentKeyDataStr) : null;
        } catch {}
        
        const hasChanged = !currentKeyData || 
          currentKeyData.expiresAt !== authResult.keyData.expiresAt ||
          currentKeyData.days !== authResult.keyData.days;
        
        if (hasChanged) {
          // Log removido para reduzir carga no painel
          // Salvar em localStorage para referência
          try {
            localStorage.setItem('keyData', JSON.stringify(authResult.keyData));
          } catch {}
        }
        
        // Atualizar com dados mais recentes da API
        updateUserAccessInfo(authResult.keyData, heroPlan, heroDays, heroExpires);
        
        // Verificar se expirou durante o uso
        if (authResult.expired || authResult.revoked || authResult.notFound) {
          console.log('[Renderer] Key expirou ou foi revogada durante o uso, forçando logout...');
          stopUserAccessInfoUpdates();
          try {
            await checkAuthentication();
          } catch (error) {
            console.error('[Renderer] Erro ao verificar autenticação após key expirada:', error);
          }
          return;
        }
      } else if (!authResult || !authResult.authenticated || !authResult.valid) {
        // Key inválida, verificar novamente
        console.log('[Renderer] Key inválida detectada, verificando autenticação...');
        stopUserAccessInfoUpdates();
        try {
          await checkAuthentication();
        } catch (error) {
          console.error('[Renderer] Erro ao verificar autenticação após key inválida:', error);
        }
        return;
      } else {
        // Manter dados locais se não conseguir verificar
        updateUserAccessInfo(keyData, heroPlan, heroDays, heroExpires);
      }
    } catch (error) {
      console.error('[Renderer] Erro ao verificar status durante atualização:', error);
      // Em caso de erro, usar dados locais
      updateUserAccessInfo(keyData, heroPlan, heroDays, heroExpires);
    }
  }, 2 * 60 * 60 * 1000); // 2 horas (7200000ms) - otimizado para não sobrecarregar servidor
}

// Função para forçar atualização imediata das informações da key
async function forceUpdateKeyInfo() {
  try {
    const heroPlan = document.getElementById('hero-discord-plan');
    const heroDays = document.getElementById('hero-discord-days');
    const heroExpires = document.getElementById('hero-discord-expires');
    
    if (!heroPlan || !heroDays || !heroExpires) {
      console.warn('[Renderer] Elementos não encontrados para atualização forçada');
      return;
    }
    
    // Buscar dados atualizados da API
    const authResult = await window.y20.isAuthenticated();
    if (authResult && authResult.authenticated && authResult.valid && authResult.keyData) {
      // Salvar em localStorage para referência
      try {
        localStorage.setItem('keyData', JSON.stringify(authResult.keyData));
      } catch {}
      // Atualizar UI
      updateUserAccessInfo(authResult.keyData, heroPlan, heroDays, heroExpires);
      console.log('[Renderer] Informações da key atualizadas forçadamente');
    } else {
      // Tentar usar checkAccessKey como fallback
      const keyResult = await window.y20.checkAccessKey();
      if (keyResult && keyResult.success && keyResult.data) {
        try {
          localStorage.setItem('keyData', JSON.stringify(keyResult.data));
        } catch {}
        updateUserAccessInfo(keyResult.data, heroPlan, heroDays, heroExpires);
        console.log('[Renderer] Informações da key atualizadas via checkAccessKey');
      }
    }
  } catch (error) {
    console.error('[Renderer] Erro ao forçar atualização da key:', error);
  }
}

function stopUserAccessInfoUpdates() {
  if (userAccessUpdateInterval) {
    clearInterval(userAccessUpdateInterval);
    userAccessUpdateInterval = null;
  }
}

window.addEventListener('load', async () => {
  // Resetar estado de verificação do BlueStacks ao abrir o painel
  // (mas manter se já estava verificado na mesma sessão)
  if (!sessionStorage.getItem('bsVerified')) {
    blueStacksState.verified = false;
    blueStacksState.detected = false;
  }
  
  try {
    document.body.classList.add('boot-complete');
    
    // Garantir que os botões de otimização estejam inicializados
    bindOptimizationControls();
    
    // Garantir que os elementos estejam inicializados
    if (!loginOverlay || !appShell) {
      initializeLoginElements();
    }
    
    // 🚀 IMPORTANTE: Definir flag de inicialização ANTES de qualquer verificação
    // Isso evita que avisos apareçam durante a tela de boas-vindas
    window._appJustLoaded = true;
    console.log('[Renderer] 🚀 Inicialização: window._appJustLoaded = true');
    
    // Verificar autenticação primeiro (com tratamento de erro)
    try {
      await checkAuthentication();
    } catch (authError) {
      console.error('[Renderer] Erro crítico ao verificar autenticação:', authError);
      // Em caso de erro crítico, abrir painel com acesso simples
      if (loginOverlay) {
        loginOverlay.hidden = true;
        loginOverlay.style.display = 'none';
        loginOverlay.style.visibility = 'hidden';
      }
      showAppShell();
      initializeAppWithAccessLevel('simple');
      updateAccessLevelUI('simple');
      
      // Aplicar "Bem vindo convidado"
      const heroNameElLoad = document.getElementById('hero-discord-name');
      const heroAvatarElLoad = document.getElementById('hero-discord-avatar');
      if (heroNameElLoad) heroNameElLoad.textContent = 'Convidado';
      if (heroAvatarElLoad) {
        heroAvatarElLoad.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        heroAvatarElLoad.style.display = 'block';
        heroAvatarElLoad.hidden = false;
      }
    }
    
    // Sempre tentar carregar dados do Discord se tiver key (mesmo se appShell não estiver visível ainda)
    // Aguardar um pouco para garantir que checkAuthentication tenha terminado
    setTimeout(async () => {
      try {
        // Verificar se window.y20 está disponível antes de usar
        if (!window.y20 || !window.y20.getInitialState) {
          console.warn('[Renderer] window.y20.getInitialState não disponível');
          return;
        }
        const initialState = await window.y20.getInitialState();
        
        // IMPORTANTE: Sempre exibir informações da key se houver keyData, mesmo sem dados do Discord
        if (initialState && initialState.keyData) {
          // Verificar se tem key resgatada (used: true ou tem expiresAt)
          const hasRedeemedKey = initialState.keyData.used === true || initialState.keyData.expiresAt || initialState.keyData.userId;
          
          if (hasRedeemedKey && appShell && !appShell.hidden) {
            // Atualizar informações da key imediatamente (tipo, dias, expiração)
            try {
              await updateUserAccessInfo(initialState.keyData);
              startUserAccessInfoUpdates(initialState.keyData);
              console.log('[Renderer] Informações da key exibidas automaticamente');
            } catch (error) {
              console.error('[Renderer] Erro ao atualizar informações da key:', error);
            }
          }
        }
        
        // Só buscar dados do Discord se tiver key (não gerar log para convidado)
        if (initialState && initialState.keyData && initialState.keyData.userId) {
          // Se appShell estiver visível, carregar dados do Discord
          if (appShell && !appShell.hidden) {
            try {
              // Forçar busca nova mesmo se já tiver dados cached (para enviar log no bot)
              // Só chama se tiver userId (não é convidado)
              const discordResult = await window.y20.getDiscordUser(initialState.keyData.userId, true);
              if (discordResult && discordResult.success && discordResult.data) {
                // Atualizar keyData com novos dados
                if (!initialState.keyData.discordInfo) {
                  initialState.keyData.discordInfo = {};
                }
                initialState.keyData.discordInfo = {
                  avatar: discordResult.data.avatar,
                  avatar_url: discordResult.data.avatar_url,
                  username: discordResult.data.username,
                  tag: discordResult.data.tag,
                  global_name: discordResult.data.global_name || discordResult.data.username,
                  id: discordResult.data.id
                };
                
                // Agora chamar loadDiscordUserInfo com os dados atualizados
                await loadDiscordUserInfo(initialState.keyData.userId, false, initialState.keyData);
              } else {
                await loadDiscordUserInfo(initialState.keyData.userId, false, initialState.keyData);
              }
              
              // Se loadDiscordUserInfo não atualizou, usar dados do estado inicial como fallback
              if (initialState.keyData.discordInfo) {
                const heroAvatarEl = document.getElementById('hero-discord-avatar');
                const heroNameEl = document.getElementById('hero-discord-name');
                
                // Verificar se os elementos ainda não foram atualizados
                if (heroAvatarEl && (!heroAvatarEl.src || heroAvatarEl.src.includes('embed/avatars'))) {
                  if (initialState.keyData.discordInfo.avatar_url) {
                    heroAvatarEl.src = initialState.keyData.discordInfo.avatar_url;
                  } else if (initialState.keyData.discordInfo.avatar) {
                    const avatarUrl = initialState.keyData.discordInfo.avatar.startsWith('http') 
                      ? initialState.keyData.discordInfo.avatar 
                      : `https://cdn.discordapp.com/avatars/${initialState.keyData.userId}/${initialState.keyData.discordInfo.avatar}.png?size=256`;
                    heroAvatarEl.src = avatarUrl;
                  } else if (initialState.keyData.userId) {
                    heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${initialState.keyData.userId % 5}.png`;
                  }
                  heroAvatarEl.style.display = 'block';
                  heroAvatarEl.hidden = false;
                  heroAvatarEl.style.visibility = 'visible';
                  heroAvatarEl.style.opacity = '1';
                }
                
                if (heroNameEl && (!heroNameEl.textContent || heroNameEl.textContent === 'Carregando...')) {
                  heroNameEl.textContent = initialState.keyData.discordInfo.tag || initialState.keyData.discordInfo.username || initialState.keyData.discordInfo.global_name || 'Usuário';
                  heroNameEl.hidden = false;
                }
              }
              
              // Atualizar informações de acesso
              await updateUserAccessInfo(initialState.keyData);
              startUserAccessInfoUpdates(initialState.keyData);
            } catch (discordError) {
              console.error('[Renderer] Erro ao carregar informações do Discord:', discordError);
              // Mesmo com erro, tentar usar dados do estado inicial ou avatar padrão
              if (initialState.keyData) {
                const heroAvatarEl = document.getElementById('hero-discord-avatar');
                const heroNameEl = document.getElementById('hero-discord-name');
                
                if (heroAvatarEl && initialState.keyData.userId) {
                  if (initialState.keyData.discordInfo && initialState.keyData.discordInfo.avatar_url) {
                    heroAvatarEl.src = initialState.keyData.discordInfo.avatar_url;
                  } else if (initialState.keyData.discordInfo && initialState.keyData.discordInfo.avatar) {
                    const avatarUrl = initialState.keyData.discordInfo.avatar.startsWith('http') 
                      ? initialState.keyData.discordInfo.avatar 
                      : `https://cdn.discordapp.com/avatars/${initialState.keyData.userId}/${initialState.keyData.discordInfo.avatar}.png?size=256`;
                    heroAvatarEl.src = avatarUrl;
                  } else {
                    heroAvatarEl.src = `https://cdn.discordapp.com/embed/avatars/${initialState.keyData.userId % 5}.png`;
                  }
                  heroAvatarEl.style.display = 'block';
                  heroAvatarEl.hidden = false;
                }
                
                if (heroNameEl) {
                  if (initialState.keyData.discordInfo) {
                    heroNameEl.textContent = initialState.keyData.discordInfo.tag || initialState.keyData.discordInfo.username || initialState.keyData.discordInfo.global_name || 'Usuário';
                  } else {
                    heroNameEl.textContent = 'Usuário';
                  }
                  heroNameEl.hidden = false;
                }
                
                await updateUserAccessInfo(initialState.keyData);
                startUserAccessInfoUpdates(initialState.keyData);
              }
            }
          } else {
            // Se appShell não estiver visível, tentar novamente depois
            setTimeout(async () => {
              const shellVisible = appShell && !appShell.hidden;
              if (shellVisible && initialState && initialState.keyData && initialState.keyData.userId) {
                try {
                  await loadDiscordUserInfo(initialState.keyData.userId, false, initialState.keyData);
                } catch (error) {
                  // Ignorar erro silenciosamente
                }
              }
            }, 2000);
          }
        }
      } catch (error) {
        // Ignorar erro silenciosamente
      }
    }, 1000);
      
      // Aguardar um pouco para garantir que o DOM esteja pronto
      setTimeout(() => {
        // Garantir que a seção "general" esteja ativa
        ensureGeneralSectionActive();
        
        // Forçar exibição da seção general imediatamente
        setTimeout(() => {
          const generalSection = document.querySelector('.panel-section[data-section="general"]');
          if (generalSection) {
            generalSection.style.display = 'block';
            generalSection.style.visibility = 'visible';
            generalSection.classList.add('active');
            console.log('[Renderer] Seção "general" forçada a aparecer');
          } else {
            console.warn('[Renderer] Seção "general" não encontrada no DOM');
          }
        }, 100);
        
        // NÃO redefinir window._appJustLoaded aqui - já foi definido no início
        window._navigatingSection = false; // Garantir que não está navegando no início
        
        // 🎯 IMPORTANTE: Desativar flag de inicialização APÓS mostrar o painel
        // Agora o painel pode mostrar avisos normalmente
        setTimeout(() => {
          window._appJustLoaded = false;
          console.log('[Welcome] 🎯 Inicialização concluída: window._appJustLoaded = false');
        }, 500);
        
        // Remover classe offline imediatamente
        document.body.classList.remove('offline');
        
        // Esconder overlay offline se estiver visível
        if (offlineOverlay) {
          offlineOverlay.hidden = true;
          offlineOverlay.style.display = 'none';
        }
        
        // Iniciar atualização de informações do sistema (com pequeno delay para não sobrecarregar)
        console.log('[Renderer] Iniciando atualização de informações do sistema...');
        console.log('[Renderer] Verificando se window.y20 está disponível:', typeof window.y20 !== 'undefined');
        
        // Forçar primeira atualização imediatamente
        setTimeout(async () => {
          try {
            console.log('[Renderer] ===== INICIANDO PRIMEIRA ATUALIZAÇÃO =====');
            console.log('[Renderer] Chamando refreshSystemInfo pela primeira vez...');
            
            if (!window.y20 || !window.y20.getSystemInfo) {
              console.error('[Renderer] ERRO: window.y20.getSystemInfo não está disponível!');
              console.error('[Renderer] window.y20:', window.y20);
              return;
            }
            
            await refreshSystemInfo();
            console.log('[Renderer] Primeira atualização concluída');
            
            // Iniciar interval de atualização em tempo real (otimizado para reduzir consumo)
            if (!systemInfoInterval) {
              console.log('[Renderer] Iniciando interval de atualização (30s)...');
              systemInfoInterval = setInterval(async () => {
                try {
                  // Log removido para reduzir spam no console
                  await refreshSystemInfo();
                } catch (error) {
                  console.error('[Renderer] Erro ao atualizar system info no interval:', error);
                }
              }, 30000); // 30 segundos - otimizado para reduzir consumo de CPU/GPU
              console.log('[Renderer] Interval iniciado com sucesso');
            } else {
              console.warn('[Renderer] Interval já existe, não criando novo');
            }
          } catch (error) {
            console.error('[Renderer] ERRO na primeira atualização:', error);
            console.error('[Renderer] Stack trace:', error.stack);
            console.error('[Renderer] Tipo do erro:', error.constructor.name);
          }
        }, 1000); // Aumentado para 1 segundo para garantir que tudo está carregado
        
        // Testar velocidade de internet automaticamente UMA VEZ ao abrir o painel
        // Aguardar alguns segundos para não sobrecarregar a inicialização
        setTimeout(() => {
          console.log('[Renderer] Iniciando teste de velocidade automático (único)...');
          testInternetSpeed().catch(error => {
            console.error('[Renderer] Erro ao testar velocidade automaticamente:', error);
          });
        }, 5000);
        
        // Event listener para botão de teste de velocidade
        if (internetSpeedTestBtn) {
          internetSpeedTestBtn.addEventListener('click', async () => {
            await testInternetSpeed();
          });
        }
        
        renderEmulatorGallery();
        // Aguardar mais tempo antes de verificar conexão (após período de graça)
        setTimeout(() => {
          // Verificar se ainda está no período de graça antes de verificar rede
          if (!window._appJustLoaded && !window._navigatingSection) {
            refreshNetworkState();
          }
        }, 11000); // Aguardar 11 segundos (após o período de graça de 10 segundos)
        
        // A flag window._appJustLoaded já será desativada automaticamente após 500ms
        verifyBlueStacks(false);
      }, 300);
  } catch (error) {
    console.error('[Renderer] Erro durante inicialização:', error);
    // Em caso de erro, garantir que o login esteja visível
    if (loginOverlay) {
      loginOverlay.hidden = false;
      loginOverlay.style.display = 'flex';
    }
    if (appShell) {
      appShell.hidden = true;
      appShell.style.display = 'none';
    }
  }
});

window.addEventListener('beforeunload', () => {
  document.body.classList.add('closing');
  // Limpar logs ao fechar o painel
  try {
    if (logsContent) {
      logsContent.innerHTML = '';
    }
  } catch (e) {
    // Ignorar erro se não conseguir limpar
  }
});

// ========== SISTEMA DE OTIMIZAÇÕES AVANÇADAS ==========

// Dados de todas as otimizações organizadas por categoria
const advancedOptimizationsData = {
  processos: [
    { key: 'processos.aumentar_prioridade', name: 'Aumentar prioridade de processos', tech: 'C++/JS: SetPriorityClass, process.priority' },
    { key: 'processos.ajustar_afinidade', name: 'Ajustar afinidade da CPU', tech: 'C++: SetProcessAffinityMask' },
    { key: 'processos.suspender_processos', name: 'Suspender processos', tech: 'C++: SuspendThread, NtSuspendProcess' },
    { key: 'processos.matar_processos', name: 'Matar processos inúteis', tech: 'JS: process.kill(), taskkill.exe' },
    { key: 'processos.boost_foco', name: 'Boost de foco em um processo', tech: 'C++: SetForegroundWindow, SetFocus' },
    { key: 'processos.reiniciar_explorer', name: 'Reiniciar explorer.exe', tech: 'JS: taskkill + start explorer.exe' },
    { key: 'processos.lista_proibidos', name: 'Criar lista de processos proibidos', tech: 'JS: Array de processos + monitoramento' },
    { key: 'processos.encerrar_background', name: 'Encerrar apps em segundo plano automaticamente', tech: 'JS: setInterval + tasklist monitor' }
  ],
  sistema: [
    { key: 'sistema.limpeza_temp', name: 'Limpeza de pastas TEMP', tech: 'JS: fs.rmSync, del /q /s' },
    { key: 'sistema.limpeza_cache_windows', name: 'Limpeza de cache do Windows', tech: 'JS: cleanmgr.exe, DISM' },
    { key: 'sistema.limpeza_prefetch', name: 'Limpeza de Prefetch', tech: 'JS: del C:\\Windows\\Prefetch\\*.*' },
    { key: 'sistema.limpeza_logs', name: 'Limpeza de logs', tech: 'JS: wevtutil cl, fs cleanup' },
    { key: 'sistema.limpeza_winsxs', name: 'Limpeza de WinSxS (parcial)', tech: 'JS: DISM /Cleanup-Image' },
    { key: 'sistema.limpeza_atualizacoes', name: 'Limpeza de atualizações inúteis', tech: 'JS: DISM, Windows Update cleanup' },
    { key: 'sistema.otimizacao_inicializacao', name: 'Otimização de inicialização', tech: 'JS: msconfig, regedit startup' },
    { key: 'sistema.gerenciar_startup', name: 'Gerenciar programas de inicialização', tech: 'JS: shell:startup, registry keys' },
    { key: 'sistema.remover_tarefas', name: 'Remover tarefas agendadas desnecessárias', tech: 'JS: schtasks /delete' },
    { key: 'sistema.reiniciar_servicos_criticos', name: 'Reiniciar serviços críticos', tech: 'JS: net stop/start, sc.exe' },
    { key: 'sistema.reset_windows_update', name: 'Reset total do Windows Update', tech: 'JS: net stop wuauserv, reset cache' },
    { key: 'sistema.otimizacao_visual', name: 'Otimização de performance visual', tech: 'C++: SystemParametersInfo, registry tweaks' }
  ],
  memoria: [
    { key: 'memoria.flush_ram', name: 'Flush de RAM (Memory Trim)', tech: 'C++: SetProcessWorkingSetSize, EmptyWorkingSet' },
    { key: 'memoria.flush_working_sets', name: 'Flush de Working Sets', tech: 'C++: NtSetInformationProcess' },
    { key: 'memoria.encerrar_handles_zumbis', name: 'Encerrar handles zumbis', tech: 'C++: CloseHandle, NtClose' },
    { key: 'memoria.reduzir_consumo_ram', name: 'Reduzir consumo de RAM em apps específicos', tech: 'C++: SetProcessWorkingSetSize' },
    { key: 'memoria.desalocar_memoria_orfã', name: 'Desalocar memória órfã', tech: 'C++: VirtualFree, HeapCompact' },
    { key: 'memoria.forcar_gc_sistema', name: 'Forçar garbage collector de sistema', tech: 'JS: global.gc(), v8 heap optimization' }
  ],
  rede: [
    { key: 'rede.desativar_nagle', name: 'Desativar Nagle', tech: 'C++: TCP_NODELAY, registry tweak' },
    { key: 'rede.ajustar_tcp_window', name: 'Ajustar TCP Window Size', tech: 'C++: registry TCPWindowSize' },
    { key: 'rede.ajustar_mtu', name: 'Ajustar MTU', tech: 'JS: netsh interface ip set mtu' },
    { key: 'rede.reset_winsock', name: 'Reset Winsock', tech: 'JS: netsh winsock reset' },
    { key: 'rede.reset_ip', name: 'Reset IP', tech: 'JS: ipconfig /release /renew' },
    { key: 'rede.flush_dns', name: 'Flush DNS', tech: 'JS: ipconfig /flushdns' },
    { key: 'rede.flush_arp', name: 'Flush ARP', tech: 'JS: arp -d *' },
    { key: 'rede.recriar_pilha_rede', name: 'Recriar pilha de rede', tech: 'JS: netsh int ip reset, restart adapters' },
    { key: 'rede.otimizar_rotas', name: 'Otimizar rotas de rede', tech: 'JS: route optimize, QoS tweaks' },
    { key: 'rede.melhorar_latencia_jogos', name: 'Melhorar latência para jogos', tech: 'C++: QoS, DPC latency reduction' },
    { key: 'rede.monitor_ping', name: 'Monitor de ping em tempo real', tech: 'JS: ping -t, setInterval monitor' }
  ],
  disco: [
    { key: 'disco.otimizar_ssd', name: 'Otimizar SSD', tech: 'JS: defrag /O, TRIM optimization' },
    { key: 'disco.otimizar_hdd', name: 'Otimizar HDD', tech: 'JS: defrag /C /H, disk optimization' },
    { key: 'disco.desfragmentacao_auto', name: 'Desfragmentação automática', tech: 'JS: schtasks defrag schedule' },
    { key: 'disco.limpeza_cache_disco', name: 'Limpeza de cache de disco', tech: 'C++: FlushFileBuffers, registry tweaks' },
    { key: 'disco.reset_indexacao', name: 'Reset de indexação', tech: 'JS: net stop wsearch, rebuild index' },
    { key: 'disco.otimizacao_arquivos_temp', name: 'Otimização de arquivos temporários', tech: 'JS: temp cleanup, disk cleanup' },
    { key: 'disco.rebuild_icones', name: 'Rebuild de ícones e miniaturas', tech: 'JS: del thumbcache.db, iconcache rebuild' }
  ],
  gpu: [
    { key: 'gpu.definir_gpu_dedicada', name: 'Definir GPU dedicada para jogos', tech: 'C++: SetProcessAffinityMask, GPU selection' },
    { key: 'gpu.mudar_modo_energia_gpu', name: 'Mudar modo de energia da GPU', tech: 'C++: registry GPU power management' },
    { key: 'gpu.limpeza_shader_cache', name: 'Limpeza de shader cache', tech: 'JS: del shader cache folders' },
    { key: 'gpu.reiniciar_driver_grafico', name: 'Reiniciar driver gráfico', tech: 'C++: D3DKMTResetDevice, driver restart' },
    { key: 'gpu.ajustes_latencia_registro', name: 'Ajustes de latência por registro', tech: 'C++: registry GPU latency tweaks' },
    { key: 'gpu.otimizar_flip_model', name: 'Otimizar flip model', tech: 'C++: DXGI flip model, registry tweaks' },
    { key: 'gpu.ajustar_prioridade_grafica', name: 'Ajustar prioridade gráfica do processo', tech: 'C++: SetPriorityClass, GPU scheduling' }
  ],
  energia: [
    { key: 'energia.criar_perfil_ultra', name: 'Criar perfil Ultra Performance', tech: 'JS: powercfg /create, /setactive' },
    { key: 'energia.modo_alto_desempenho', name: 'Modo Alto Desempenho real', tech: 'JS: powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c' },
    { key: 'energia.modo_turbo', name: 'Modo turbo (força CPU no máximo)', tech: 'C++: SetThreadExecutionState, CPU boost' },
    { key: 'energia.ajustar_tempo_suspensao', name: 'Ajustar tempo de suspensão', tech: 'JS: powercfg /change, sleep timeout' },
    { key: 'energia.ajuste_energia_gpu_registro', name: 'Ajuste de energia da GPU via registro', tech: 'C++: registry GPU power settings' },
    { key: 'energia.reduzir_throttling', name: 'Reduzir throttling via políticas', tech: 'C++: registry CPU throttling disable' }
  ],
  servicos: [
    { key: 'servicos.parar_servicos_desnecessarios', name: 'Parar serviços desnecessários', tech: 'JS: net stop, sc.exe stop' },
    { key: 'servicos.pausar_servicos_temporariamente', name: 'Pausar serviços temporariamente', tech: 'JS: sc.exe pause, service control' },
    { key: 'servicos.reiniciar_servicos_travados', name: 'Reiniciar serviços travados', tech: 'JS: sc.exe stop + start, service restart' },
    { key: 'servicos.criar_perfis_servicos', name: 'Criar perfis de serviços (Gamer/Produtividade)', tech: 'JS: service profiles, JSON config' }
  ],
  registro: [
    { key: 'registro.tweaks_desempenho_cpu', name: 'Tweaks de desempenho da CPU', tech: 'C++: registry CPU performance tweaks' },
    { key: 'registro.tweaks_latencia', name: 'Tweaks de latência', tech: 'C++: registry DPC latency, timer resolution' },
    { key: 'registro.tweaks_rede', name: 'Tweaks de rede', tech: 'C++: registry TCP/IP optimizations' },
    { key: 'registro.tweaks_memoria', name: 'Tweaks de memória', tech: 'C++: registry memory management tweaks' },
    { key: 'registro.tweaks_interface', name: 'Tweaks de interface', tech: 'C++: registry UI performance tweaks' },
    { key: 'registro.tweaks_gpu', name: 'Tweaks de GPU', tech: 'C++: registry GPU performance tweaks' },
    { key: 'registro.tweaks_sistema_arquivos', name: 'Tweaks de sistema de arquivos', tech: 'C++: registry file system optimizations' },
    { key: 'registro.otimizacao_resposta_sistema', name: 'Otimização de resposta do sistema', tech: 'C++: registry system responsiveness tweaks' }
  ],
  monitoramento: [
    { key: 'monitoramento.uso_cpu', name: 'Uso de CPU', tech: 'JS: os.cpus(), setInterval monitor' },
    { key: 'monitoramento.uso_ram', name: 'Uso de RAM', tech: 'JS: os.totalmem(), os.freemem()' },
    { key: 'monitoramento.uso_gpu', name: 'Uso de GPU', tech: 'JS: nvidia-smi, wmic path win32_VideoController' },
    { key: 'monitoramento.uso_disco', name: 'Uso de Disco', tech: 'JS: fs.statSync, disk usage' },
    { key: 'monitoramento.ping', name: 'Ping', tech: 'JS: ping command, network latency' },
    { key: 'monitoramento.download_upload', name: 'Download/Upload', tech: 'JS: network interface stats' },
    { key: 'monitoramento.processos_pesados', name: 'Processos mais pesados', tech: 'JS: tasklist, process monitoring' },
    { key: 'monitoramento.temperaturas', name: 'Temperaturas (com libs externas)', tech: 'JS: systeminformation, wmic temperature' },
    { key: 'monitoramento.fps_overlay', name: 'FPS overlay (com DLL externa)', tech: 'C++: DirectX hook, overlay rendering' }
  ],
  modos: [
    { key: 'modos.modo_gamer', name: 'Modo Gamer', desc: 'Otimizações focadas em jogos e performance', type: 'radio' },
    { key: 'modos.modo_turbo', name: 'Modo Turbo', desc: 'Performance máxima, todos os recursos', type: 'radio' },
    { key: 'modos.modo_produtividade', name: 'Modo Produtividade', desc: 'Balanceado para trabalho e multitarefa', type: 'radio' },
    { key: 'modos.modo_economia', name: 'Modo Economia', desc: 'Economia de energia e recursos', type: 'radio' },
    { key: 'modos.modo_antilag', name: 'Modo Antilag', desc: 'Foco em reduzir latência ao máximo', type: 'radio' },
    { key: 'modos.modo_streamer', name: 'Modo Streamer', desc: 'Otimizado para streaming e gravação', type: 'radio' },
    { key: 'modos.modo_estavel', name: 'Modo Estável', desc: 'Performance estável e confiável', type: 'radio' },
    { key: 'modos.modo_silencioso', name: 'Modo Silencioso', desc: 'Mínimo de ruído e consumo', type: 'radio' }
  ],
  extras: [
    { key: 'extras.booster_automatico_jogo', name: 'Booster automático quando jogo abrir', tech: 'JS: process monitor, auto-optimize on game launch' },
    { key: 'extras.logs_detalhados', name: 'Logs detalhados', tech: 'JS: winston, file logging system' },
    { key: 'extras.historico_otimizacoes', name: 'Histórico de otimizações', tech: 'JS: JSON history, optimization log' },
    { key: 'extras.auto_restore_configuracoes', name: 'Auto-Restore de configurações', tech: 'JS: backup/restore system, registry snapshots' },
    { key: 'extras.backup_registro', name: 'Backup de registro', tech: 'JS: reg export, registry backup' }
  ]
};

// Estado das otimizações

// ========== OTIMIZAÇÃO FORÇADA ==========

// Descrições detalhadas para cada otimização
const forcedOptDescriptions = {
  'processos.aumentar_prioridade': 'Aumenta a prioridade de processos específicos para melhorar o desempenho e responsividade.',
  'processos.ajustar_afinidade': 'Ajusta quais núcleos da CPU serão usados por processos específicos para melhor distribuição.',
  'processos.suspender_processos': 'Suspende temporariamente processos não essenciais para liberar recursos do sistema.',
  'processos.matar_processos': 'Encerra processos desnecessários que consomem recursos do sistema.',
  'processos.boost_foco': 'Dá prioridade máxima ao processo em foco para melhorar a responsividade.',
  'processos.reiniciar_explorer': 'Reinicia o Windows Explorer para resolver problemas de interface e liberar memória.',
  'processos.lista_proibidos': 'Cria uma lista de processos que serão automaticamente encerrados quando detectados.',
  'processos.encerrar_background': 'Encerra automaticamente aplicativos rodando em segundo plano.',
  'sistema.limpeza_temp': 'Remove arquivos temporários das pastas TEMP e TMP para liberar espaço em disco.',
  'sistema.limpeza_cache_windows': 'Limpa o cache do Windows usando a ferramenta de limpeza de disco.',
  'sistema.limpeza_prefetch': 'Remove arquivos de prefetch para liberar espaço e melhorar inicialização.',
  'sistema.limpeza_logs': 'Limpa logs do sistema e aplicativos para reduzir uso de disco.',
  'sistema.limpeza_winsxs': 'Limpa componentes antigos do Windows (WinSxS) para liberar espaço.',
  'sistema.limpeza_atualizacoes': 'Remove arquivos de atualizações antigas do Windows.',
  'sistema.otimizacao_inicializacao': 'Otimiza quais programas iniciam com o Windows para reduzir tempo de boot.',
  'sistema.gerenciar_startup': 'Abre a pasta de inicialização para gerenciar programas que iniciam automaticamente.',
  'sistema.remover_tarefas': 'Remove tarefas agendadas desnecessárias do Agendador de Tarefas.',
  'sistema.reiniciar_servicos_criticos': 'Reinicia serviços críticos do Windows para resolver problemas.',
  'sistema.reset_windows_update': 'Reseta completamente o serviço de atualização do Windows.',
  'sistema.otimizacao_visual': 'Desativa efeitos visuais desnecessários para melhorar performance.',
  'memoria.flush_ram': 'Libera memória RAM não utilizada de processos em execução.',
  'memoria.flush_working_sets': 'Limpa working sets de processos para liberar memória física.',
  'memoria.encerrar_handles_zumbis': 'Encerra handles de memória órfãos que não foram liberados corretamente.',
  'memoria.reduzir_consumo_ram': 'Reduz o consumo de RAM de aplicativos específicos.',
  'memoria.desalocar_memoria_orfã': 'Libera memória que não está mais sendo referenciada.',
  'memoria.forcar_gc_sistema': 'Força a coleta de lixo do sistema para liberar memória.',
  'rede.desativar_nagle': 'Desativa o algoritmo de Nagle para reduzir latência em jogos.',
  'rede.ajustar_tcp_window': 'Ajusta o tamanho da janela TCP para melhorar velocidade de transferência.',
  'rede.ajustar_mtu': 'Ajusta o MTU (Maximum Transmission Unit) da interface de rede.',
  'rede.reset_winsock': 'Reseta a pilha Winsock para resolver problemas de conexão de rede.',
  'rede.reset_ip': 'Renova o endereço IP da interface de rede.',
  'rede.flush_dns': 'Limpa o cache DNS para resolver problemas de conexão.',
  'rede.flush_arp': 'Limpa a tabela ARP para atualizar informações de rede.',
  'rede.recriar_pilha_rede': 'Recria completamente a pilha de rede do Windows.',
  'rede.otimizar_rotas': 'Otimiza as rotas de rede para melhor desempenho.',
  'rede.melhorar_latencia_jogos': 'Aplica otimizações específicas para reduzir latência em jogos online.',
  'rede.monitor_ping': 'Inicia monitoramento contínuo de ping para verificar latência.',
  'disco.otimizar_ssd': 'Otimiza unidades SSD usando TRIM e outras otimizações específicas.',
  'disco.otimizar_hdd': 'Desfragmenta e otimiza unidades HDD para melhor desempenho.',
  'disco.desfragmentacao_auto': 'Configura desfragmentação automática para manter discos otimizados.',
  'disco.limpeza_cache_disco': 'Limpa o cache de disco para melhorar velocidade de escrita.',
  'disco.reset_indexacao': 'Reinicia o serviço de indexação do Windows.',
  'disco.otimizacao_arquivos_temp': 'Remove arquivos temporários para liberar espaço.',
  'disco.rebuild_icones': 'Reconstrói o cache de ícones e miniaturas do Windows.',
  'gpu.definir_gpu_dedicada': 'Força o uso da GPU dedicada para aplicativos específicos.',
  'gpu.mudar_modo_energia_gpu': 'Ajusta o modo de energia da GPU para máximo desempenho.',
  'gpu.limpeza_shader_cache': 'Remove cache de shaders para resolver problemas gráficos.',
  'gpu.reiniciar_driver_grafico': 'Reinicia o driver gráfico sem reiniciar o sistema.',
  'gpu.ajustes_latencia_registro': 'Aplica ajustes de registro para reduzir latência gráfica.',
  'gpu.otimizar_flip_model': 'Otimiza o modelo de apresentação gráfica para melhor performance.',
  'gpu.ajustar_prioridade_grafica': 'Aumenta a prioridade de processos gráficos.',
  'energia.criar_perfil_ultra': 'Cria um perfil de energia personalizado para máximo desempenho.',
  'energia.modo_alto_desempenho': 'Ativa o modo Alto Desempenho real do Windows.',
  'energia.modo_turbo': 'Força a CPU a operar no máximo de frequência disponível.',
  'energia.ajustar_tempo_suspensao': 'Ajusta quando o sistema entra em modo de suspensão.',
  'energia.ajuste_energia_gpu_registro': 'Ajusta configurações de energia da GPU via registro.',
  'energia.reduzir_throttling': 'Reduz throttling da CPU para manter performance máxima.',
  'servicos.parar_servicos_desnecessarios': 'Para serviços do Windows que não são essenciais.',
  'servicos.pausar_servicos_temporariamente': 'Pausa serviços temporariamente sem desabilitá-los permanentemente.',
  'servicos.reiniciar_servicos_travados': 'Reinicia serviços que estão travados ou não respondendo.',
  'servicos.criar_perfis_servicos': 'Cria perfis de serviços para diferentes cenários (Gamer, Produtividade, etc).',
  'registro.tweaks_desempenho_cpu': 'Aplica ajustes de registro para melhorar desempenho da CPU.',
  'registro.tweaks_latencia': 'Aplica ajustes para reduzir latência do sistema.',
  'registro.tweaks_rede': 'Otimiza configurações de rede via registro.',
  'registro.tweaks_memoria': 'Ajusta gerenciamento de memória do sistema.',
  'registro.tweaks_interface': 'Otimiza interface do Windows para melhor responsividade.',
  'registro.tweaks_gpu': 'Aplica otimizações de GPU via registro.',
  'registro.tweaks_sistema_arquivos': 'Otimiza sistema de arquivos para melhor performance.',
  'registro.otimizacao_resposta_sistema': 'Melhora a resposta geral do sistema.',
  'monitoramento.uso_cpu': 'Monitora uso de CPU em tempo real.',
  'monitoramento.uso_ram': 'Monitora uso de memória RAM.',
  'monitoramento.uso_gpu': 'Monitora uso e temperatura da GPU.',
  'monitoramento.uso_disco': 'Monitora uso de espaço e velocidade de disco.',
  'monitoramento.ping': 'Testa latência de rede com ping.',
  'monitoramento.download_upload': 'Monitora velocidade de download e upload.',
  'monitoramento.processos_pesados': 'Identifica processos que mais consomem recursos.',
  'monitoramento.temperaturas': 'Monitora temperaturas do sistema.',
  'monitoramento.fps_overlay': 'Exibe FPS em tempo real sobre aplicativos.',
  'modos.modo_gamer': 'Aplica todas as otimizações focadas em jogos.',
  'modos.modo_turbo': 'Ativa modo de performance máxima com todas as otimizações.',
  'modos.modo_produtividade': 'Balanceia performance e estabilidade para trabalho.',
  'modos.modo_economia': 'Otimiza para economia de energia e recursos.',
  'modos.modo_antilag': 'Foca em reduzir latência ao máximo possível.',
  'modos.modo_streamer': 'Otimiza para streaming e gravação de vídeo.',
  'modos.modo_estavel': 'Prioriza estabilidade sobre performance máxima.',
  'modos.modo_silencioso': 'Minimiza ruído e consumo de recursos.',
  'extras.booster_automatico_jogo': 'Aplica otimizações automaticamente quando um jogo é detectado.',
  'extras.logs_detalhados': 'Ativa logs detalhados de todas as operações.',
  'extras.historico_otimizacoes': 'Mantém histórico de todas as otimizações aplicadas.',
  'extras.auto_restore_configuracoes': 'Restaura automaticamente configurações em caso de problemas.',
  'extras.backup_registro': 'Cria backup do registro antes de aplicar mudanças.'
};

// Estado da Otimização Forçada
let forcedOptimizationState = {
  loaded: false,
  initialized: false
};

// Inicializar Otimização Forçada
async function initForcedOptimization() {
  console.log('[Otimização Forçada] Inicializando...');
  
  // Verificar se os dados existem
  if (!advancedOptimizationsData) {
    console.error('[Otimização Forçada] advancedOptimizationsData não encontrado!');
    return;
  }
  
  // Se já foi inicializado e os cards existem, apenas atualizar estados visuais sem recriar
  if (forcedOptimizationState.initialized) {
    const existingCards = document.querySelectorAll('.forced-opt-card');
    if (existingCards.length > 0) {
      console.log('[Otimização Forçada] Cards já existem, apenas atualizando estados visuais...');
      
      // Garantir que a categoria Processos está ativa quando os cards já existem
      const firstCategoryBtn = document.querySelector('[data-section="forced-optimization"] .config-catalog button[data-view="forced-opt-processos"]');
      const firstCategoryPanel = document.getElementById('forced-opt-processos');
      const hasActivePanel = document.querySelector('[data-section="forced-optimization"] .config-panel.active');
      
      // Se não há painel ativo, ativar Processos
      if (!hasActivePanel && firstCategoryBtn && firstCategoryPanel) {
        document.querySelectorAll('[data-section="forced-optimization"] .config-catalog button[data-view]').forEach(btn => {
          btn.classList.remove('active');
        });
        document.querySelectorAll('[data-section="forced-optimization"] .config-panel').forEach(panel => {
          panel.classList.remove('active');
        });
        firstCategoryBtn.classList.add('active');
        // Pequeno delay para animação
        setTimeout(() => {
          firstCategoryPanel.classList.add('active');
        }, 50);
        console.log('[Otimização Forçada] Categoria Processos ativada automaticamente (cards já existiam)');
      }
      
      await loadAndUpdateForcedOptimizationState();
      return;
    }
  }

  console.log('[Otimização Forçada] Categorias disponíveis:', Object.keys(advancedOptimizationsData));

  // Sistema de navegação por categorias
  const catalogButtons = document.querySelectorAll('[data-section="forced-optimization"] .config-catalog button[data-view]');
  const panels = document.querySelectorAll('[data-section="forced-optimization"] .config-panel');

  console.log('[Otimização Forçada] Botões encontrados:', catalogButtons.length);
  console.log('[Otimização Forçada] Painéis encontrados:', panels.length);

  if (catalogButtons.length === 0 || panels.length === 0) {
    console.error('[Otimização Forçada] Elementos não encontrados!');
    console.error('[Otimização Forçada] Seção forced-optimization existe?', !!document.querySelector('[data-section="forced-optimization"]'));
    return;
  }

  // Remover event listeners antigos se existirem
  catalogButtons.forEach(btn => {
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
  });

  // Re-obter os botões após clonar
  const freshButtons = document.querySelectorAll('[data-section="forced-optimization"] .config-catalog button[data-view]');
  
  // Event listeners para navegação entre categorias
  freshButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.view;
      
      freshButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetPanel = document.getElementById(target);
      if (targetPanel) {
        // Pequeno delay para animação
        setTimeout(() => {
          targetPanel.classList.add('active');
        }, 50);
      }
    });
  });

      // Carregar estados das otimizações ANTES de popular os cards para manter estados visuais
      let savedOptimizationsState = {};
      try {
        // Carregar estados da API Cloudflare
        const stateResult = await cloudflareApiRequest('GET', '/api/optimizations/get');
        if (stateResult.success && stateResult.data) {
          savedOptimizationsState = stateResult.data;
          console.log('[Otimização Forçada] Estados carregados da API Cloudflare antes de popular cards');
        }
      } catch (err) {
        console.warn('[Otimização Forçada] Erro ao carregar estados da API (continuando):', err);
        
        // Verificar se é erro de conexão (API offline) e mostrar aviso apenas uma vez
        const isApiOfflineError = err?.message && (
          err.message.includes('Failed to fetch') || 
          err.message.includes('Refused to connect') ||
          err.message.includes('NetworkError') ||
          err.message.includes('CORS') ||
          err.message.includes('Content Security Policy')
        );
        
        if (isApiOfflineError) {
          const lastApiOfflineWarning = window._lastApiOfflineWarning || 0;
          const now = Date.now();
          if (now - lastApiOfflineWarning > 30000) {
            window._lastApiOfflineWarning = now;
            if (typeof showToast === 'function') {
              showToast('⚠️ API está offline. Você pode usar recursos normais (acesso simples).', 'warning');
            }
          }
        }
      }

  // Popular todas as categorias
  let totalItems = 0;
  const categories = Object.keys(advancedOptimizationsData);
  console.log('[Otimização Forçada] Categorias para popular:', categories);
  
  categories.forEach(category => {
    const gridId = `forced-opt-grid-${category}`;
    const grid = document.getElementById(gridId);
    
    console.log(`[Otimização Forçada] Tentando popular categoria: ${category}, Grid ID: ${gridId}, Encontrado:`, !!grid);
    
    if (!grid) {
      console.warn(`[Otimização Forçada] Grid não encontrado: ${gridId}`);
      // Tentar encontrar de outra forma
      const altGrid = document.querySelector(`#${gridId}`);
      if (altGrid) {
        console.log(`[Otimização Forçada] Grid encontrado via querySelector: ${gridId}`);
      }
      return;
    }

    const items = advancedOptimizationsData[category];
    console.log(`[Otimização Forçada] Itens para ${category}:`, items?.length || 0);
    
    if (!items || items.length === 0) {
      console.warn(`[Otimização Forçada] Nenhum item para categoria: ${category}`);
      return;
    }

    grid.innerHTML = '';

    items.forEach((item, index) => {
      const description = forcedOptDescriptions[item.key] || item.desc || 'Otimização do sistema para melhor desempenho.';
      const tech = item.tech || '';
      const isRadio = item.type === 'radio';
      const buttonText = isRadio ? 'Ativar' : 'Aplicar';
      const buttonClass = isRadio ? 'activate' : 'apply';
      
      // Verificar se é o card que precisa de aviso
      const needsWarning = item.key === 'processos.encerrar_background';
      const warningHtml = needsWarning ? `
        <div class="forced-opt-warning" style="margin-top: 12px; padding: 10px 12px; background: rgba(255, 193, 7, 0.15); border: 1px solid rgba(255, 193, 7, 0.4); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px;">
          <span style="font-size: 16px; flex-shrink: 0;">⚠️</span>
          <p style="margin: 0; font-size: 12px; color: rgba(255, 193, 7, 0.95); line-height: 1.4; font-weight: 500;">
            <strong style="color: rgba(255, 193, 7, 1);">⚠️ IMPORTANTE:</strong> Se ocorrer tela azul, recomendo trocar de windows, ou evite de aplicar-lo.
          </p>
        </div>
      ` : '';

      const card = document.createElement('div');
      card.className = 'forced-opt-card';
      card.dataset.optKey = item.key;
      card.innerHTML = `
        <div class="forced-opt-status"></div>
        <div class="forced-opt-header">
          <h3 class="forced-opt-title">${item.name}</h3>
          <p class="forced-opt-description">${description}</p>
          ${tech ? `<span class="forced-opt-tech">${tech}</span>` : ''}
          ${warningHtml}
        </div>
        <div class="forced-opt-actions">
          <button class="forced-opt-btn ${buttonClass}" 
                  data-action="${buttonClass}" 
                  data-opt-key="${item.key}">
            ${buttonText}
          </button>
          <button class="forced-opt-btn deactivate" 
                  data-action="deactivate" 
                  data-opt-key="${item.key}" 
                  style="display:none;">
            Desativar
          </button>
        </div>
      `;
      grid.appendChild(card);
      
      // Aplicar estado visual IMEDIATAMENTE após criar o card se estiver salvo como ativo
      if (savedOptimizationsState[item.key] === true) {
        // Usar setTimeout mínimo para garantir que o DOM foi atualizado
        setTimeout(() => {
          updateForcedOptimizationCardState(item.key, true);
        }, 0);
      }
      
      totalItems++;
      
      if (index === 0) {
        console.log(`[Otimização Forçada] Primeiro card criado para ${category}:`, item.name);
      }
    });
    
    console.log(`[Otimização Forçada] ${items.length} cards adicionados ao grid ${category}`);
  });

  console.log(`[Otimização Forçada] ${totalItems} itens populados`);
  
  // Verificação final - ver se os cards foram realmente adicionados
  categories.forEach(category => {
    const grid = document.getElementById(`forced-opt-grid-${category}`);
    if (grid) {
      const cards = grid.querySelectorAll('.forced-opt-card');
      console.log(`[Otimização Forçada] Verificação: ${category} tem ${cards.length} cards no DOM`);
      if (cards.length === 0 && advancedOptimizationsData[category]?.length > 0) {
        console.error(`[Otimização Forçada] ERRO: Grid ${category} deveria ter cards mas está vazio!`);
      }
    }
  });

  // IMPORTANTE: Ativar automaticamente a categoria "Processos" APÓS popular todos os cards
  const firstCategoryBtn = document.querySelector('[data-section="forced-optimization"] .config-catalog button[data-view="forced-opt-processos"]');
  const firstCategoryPanel = document.getElementById('forced-opt-processos');
  if (firstCategoryBtn && firstCategoryPanel) {
    // Garantir que nenhuma outra categoria está ativa
    document.querySelectorAll('[data-section="forced-optimization"] .config-catalog button[data-view]').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelectorAll('[data-section="forced-optimization"] .config-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    // Ativar categoria Processos com animação
    firstCategoryBtn.classList.add('active');
    // Pequeno delay para animação
    setTimeout(() => {
      firstCategoryPanel.classList.add('active');
    }, 50);
    console.log('[Otimização Forçada] Categoria Processos ativada automaticamente após popular cards');
  } else {
    console.warn('[Otimização Forçada] Botão ou painel de Processos não encontrado para ativação automática');
  }

  // Event listeners para botões (só adicionar uma vez)
  if (!forcedOptimizationState.loaded) {
    document.addEventListener('click', async (e) => {
      if (e.target.closest('.forced-opt-btn[data-action="apply"]')) {
        const btn = e.target.closest('.forced-opt-btn');
        if (btn.disabled) return; // Não executar se desabilitado
        
        // Verificação imediata de acesso ANTES de qualquer execução
        const optKey = btn.dataset.optKey;
        const isVip = currentAccessLevel === 'vip';
        const isBasic = currentAccessLevel === 'basic';
        const isExtras = optKey && optKey.startsWith('extras.');
        
        if (!isVip && (!isExtras || !isBasic)) {
          e.preventDefault();
          e.stopPropagation();
          showToast('Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!', 'warning');
          return;
        }
        
        await applyForcedOptimization(optKey);
      } else if (e.target.closest('.forced-opt-btn[data-action="activate"]')) {
        const btn = e.target.closest('.forced-opt-btn');
        if (btn.disabled) return; // Não executar se desabilitado
        
        // Verificação imediata de acesso ANTES de qualquer execução
        const optKey = btn.dataset.optKey;
        const isVip = currentAccessLevel === 'vip';
        const isBasic = currentAccessLevel === 'basic';
        const isExtras = optKey && optKey.startsWith('extras.');
        
        if (!isVip && (!isExtras || !isBasic)) {
          e.preventDefault();
          e.stopPropagation();
          showToast('Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!', 'warning');
          return;
        }
        
        await applyForcedOptimization(optKey);
      } else if (e.target.closest('.forced-opt-btn[data-action="deactivate"]')) {
        const btn = e.target.closest('.forced-opt-btn');
        if (btn.disabled) return; // Não executar se desabilitado
        
        // Verificação imediata de acesso ANTES de qualquer execução
        const optKey = btn.dataset.optKey;
        const isVip = currentAccessLevel === 'vip';
        const isBasic = currentAccessLevel === 'basic';
        const isExtras = optKey && optKey.startsWith('extras.');
        
        if (!isVip && (!isExtras || !isBasic)) {
          e.preventDefault();
          e.stopPropagation();
          showToast('Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!', 'warning');
          return;
        }
        
        await deactivateForcedOptimization(optKey);
      }
    });
    forcedOptimizationState.loaded = true;
  }
  
  // Aplicar restrições de acesso aos botões (aguardar um pouco para garantir que currentAccessLevel está definido)
  setTimeout(() => {
    if (typeof applyForcedOptimizationRestrictions === 'function') {
      applyForcedOptimizationRestrictions();
    }
  }, 200);

  // Marcar como inicializado
  forcedOptimizationState.initialized = true;
  
  // Recarregar estados após criar todos os cards (como fallback e para garantir sincronização)
  // Aguardar um pouco para garantir que todos os cards foram criados
  setTimeout(async () => {
    await loadAndUpdateForcedOptimizationState();
    // Aplicar estados novamente após mais um delay para garantir persistência
    setTimeout(async () => {
      await loadAndUpdateForcedOptimizationState();
    }, 500);
  }, 300);

  console.log('[Otimização Forçada] Inicializado com sucesso -', totalItems, 'itens populados');
}

// Carregar otimizações salvas da API Cloudflare e atualizar estado visual dos cards
async function loadAndUpdateForcedOptimizationState() {
  try {
    // Buscar da API Cloudflare
    const result = await cloudflareApiRequest('GET', '/api/optimizations/get');
    
    if (!result.success || !result.data) {
      throw new Error(result.error || 'Erro ao carregar otimizações');
    }
    
    const config = result.data;
    
    if (config) {
      
      // Iterar sobre todas as otimizações forçadas e atualizar estado visual
      if (advancedOptimizationsData) {
        Object.keys(advancedOptimizationsData).forEach(category => {
          const items = advancedOptimizationsData[category];
          items.forEach(item => {
            const optKey = item.key;
            // Verificar se a otimização está marcada como ativa na configuração
            if (config[optKey] === true) {
              // Atualizar estado visual do card com múltiplas tentativas
              updateForcedOptimizationCardState(optKey, true);
              // Tentar novamente após um delay para garantir que o DOM está pronto
              setTimeout(() => updateForcedOptimizationCardState(optKey, true), 200);
              setTimeout(() => updateForcedOptimizationCardState(optKey, true), 500);
            } else if (config[optKey] === false) {
              // Se estiver marcado como false, desativar visualmente
              updateForcedOptimizationCardState(optKey, false);
            }
          });
        });
      }
      
      console.log('[Otimização Forçada] Estado carregado da API e atualizado');
    }
  } catch (err) {
    console.warn('[Otimização Forçada] Erro ao carregar estado da API:', err);
    
    // Verificar se é erro de conexão (API offline) e mostrar aviso apenas uma vez
    const isApiOfflineError = err?.message && (
      err.message.includes('Failed to fetch') || 
      err.message.includes('Refused to connect') ||
      err.message.includes('NetworkError') ||
      err.message.includes('CORS') ||
      err.message.includes('Content Security Policy')
    );
    
    if (isApiOfflineError) {
      // Verificar se já mostramos aviso recentemente para não spam
      const lastApiOfflineWarning = window._lastApiOfflineWarning || 0;
      const now = Date.now();
      if (now - lastApiOfflineWarning > 30000) { // Mostrar aviso a cada 30 segundos no máximo
        window._lastApiOfflineWarning = now;
        if (typeof showToast === 'function') {
          showToast('⚠️ API está offline. Você pode usar recursos normais (acesso simples).', 'warning');
        }
      }
    }
    
    // Tentar carregar do store local como fallback
    try {
      const localConfig = await window.y20?.loadOptimizations?.() || {};
      if (localConfig && Object.keys(localConfig).length > 0) {
        if (advancedOptimizationsData) {
          Object.keys(advancedOptimizationsData).forEach(category => {
            const items = advancedOptimizationsData[category];
            items.forEach(item => {
              const optKey = item.key;
              if (localConfig[optKey] === true) {
                updateForcedOptimizationCardState(optKey, true);
              }
            });
          });
        }
        console.log('[Otimização Forçada] Estado carregado do store local');
      }
    } catch (localErr) {
      console.warn('[Otimização Forçada] Erro ao carregar do store local:', localErr);
    }
  }
}

// Aplicar restrições de acesso na Otimização Forçada
function applyForcedOptimizationRestrictions() {
  const isVip = currentAccessLevel === 'vip';
  const isBasic = currentAccessLevel === 'basic';
  
  // Buscar todos os botões de otimização forçada
  const allForcedButtons = document.querySelectorAll('.forced-opt-btn');
  
  allForcedButtons.forEach(btn => {
    const optKey = btn.dataset.optKey;
    const card = btn.closest('.forced-opt-card');
    
    // Se for categoria "extras", liberar para VIP básico também
    const isExtras = optKey && optKey.startsWith('extras.');
    
    if (isVip || (isExtras && isBasic)) {
      // VIP ou extras para básico: liberar
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
      btn.style.pointerEvents = 'auto';
      btn.title = '';
      if (card) card.style.opacity = '1';
    } else {
      // Não VIP (exceto extras para básico): desabilitar
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
      btn.style.pointerEvents = 'none';
      btn.title = 'Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!';
      if (card) card.style.opacity = '0.8';
    }
  });
}

// Aplicar otimização forçada
async function applyForcedOptimization(optKey) {
  const card = document.querySelector(`.forced-opt-card[data-opt-key="${optKey}"]`);
  const applyBtn = card?.querySelector('.forced-opt-btn[data-action="apply"], .forced-opt-btn[data-action="activate"]');
  const deactivateBtn = card?.querySelector('.forced-opt-btn[data-action="deactivate"]');

  if (!card || !applyBtn) return;
  
  // Verificar se tem acesso VIP
  if (currentAccessLevel !== 'vip') {
    const isExtras = optKey && optKey.startsWith('extras.');
    const isBasic = currentAccessLevel === 'basic';
    
    if (!isExtras || !isBasic) {
      showToast('Esta funcionalidade requer Key VIP. Faça upgrade para desbloquear!', 'warning');
      return;
    }
  }

  // Salvar texto original do botão
  const originalText = applyBtn.dataset.action === 'activate' ? 'Ativar' : 'Aplicar';
  
  // Obter nome da otimização para o log
  const optName = getOptimizationName(optKey) || optKey;
  addLogEntry(`Aplicou: Otimização Forçada - ${optName}`, 'info');
  
  try {
    applyBtn.disabled = true;
    applyBtn.textContent = 'Aplicando...';

    const result = await window.y20?.applyOptimization?.(optKey);
    
    if (result?.success) {
      // Mostrar "Aplicado!" temporariamente antes de esconder
      applyBtn.textContent = 'Aplicado!';
      applyBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      
      // Aguardar um pouco para mostrar o feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      card.classList.add('applied');
      // Restaurar texto original antes de esconder
      applyBtn.textContent = originalText;
      applyBtn.style.background = '';
      applyBtn.style.display = 'none';
      if (deactivateBtn) deactivateBtn.style.display = 'flex';
      console.log(`[Otimização Forçada] ${optKey} aplicado:`, result.message);
      
      // Salvar na API Cloudflare (migrado do bot Discord)
      try {
        // Carregar configurações existentes da API Cloudflare
        let currentConfig = {};
        try {
          const loadResult = await cloudflareApiRequest('GET', '/api/optimizations/get');
          if (loadResult.success && loadResult.data) {
            currentConfig = loadResult.data;
          }
        } catch (err) {
          console.warn('[Otimização Forçada] Erro ao carregar da API (continuando):', err);
          // Se falhar ao carregar, começar com objeto vazio
          currentConfig = {};
        }
        
        // Marcar como ativa
        currentConfig[optKey] = true;
        
        // Salvar na API Cloudflare
        try {
          const saveResult = await cloudflareApiRequest('POST', '/api/optimizations/save', currentConfig);
          if (saveResult.success) {
            console.log(`[Otimização Forçada] ${optKey} salvo na API Cloudflare`);
          } else {
            // Se a API falhar (ex: tabela não existe), salvar localmente como fallback
            console.warn(`[Otimização Forçada] Erro ao salvar na API: ${saveResult.error}. Salvando localmente como fallback.`);
            // Salvar localmente usando electron-store
            if (window.y20?.saveForcedOptimizationState) {
              await window.y20.saveForcedOptimizationState(currentConfig);
            }
          }
        } catch (saveErr) {
          // Se houver erro de rede ou tabela não existe, salvar localmente
          console.warn('[Otimização Forçada] Erro ao salvar na API (tabela pode não existir):', saveErr);
          // Salvar localmente como fallback
          if (window.y20?.saveForcedOptimizationState) {
            await window.y20.saveForcedOptimizationState(currentConfig);
          }
        }
      } catch (err) {
        console.warn('[Otimização Forçada] Erro geral ao salvar (salvando localmente):', err);
        // Fallback: salvar localmente
        if (window.y20?.saveForcedOptimizationState) {
          const fallbackConfig = { [optKey]: true };
          await window.y20.saveForcedOptimizationState(fallbackConfig);
        }
      }
      
      showToast('Otimização aplicada com sucesso!', 'success');
    } else {
      throw new Error(result?.message || 'Erro ao aplicar otimização');
    }
  } catch (error) {
    console.error(`[Otimização Forçada] Erro ao aplicar ${optKey}:`, error);
    applyBtn.disabled = false;
    applyBtn.textContent = originalText;
    applyBtn.style.background = '';
    showToast(`Erro ao aplicar otimização: ${error.message}`, 'error');
  }
}

// Atualizar estado visual do card de otimização forçada (sem executar)
function updateForcedOptimizationCardState(optKey, isApplied) {
  // Tentar encontrar o card - pode não estar visível ainda
  let card = document.querySelector(`.forced-opt-card[data-opt-key="${optKey}"]`);
  
  // Se não encontrou, tentar com diferentes seletores
  if (!card) {
    // Tentar encontrar por atributo data-opt-key sem o ponto
    card = document.querySelector(`[data-opt-key="${optKey}"]`);
  }
  
  if (!card) {
    // Tentar encontrar qualquer card que contenha o optKey no data-opt-key
    const allCards = document.querySelectorAll('.forced-opt-card');
    for (const c of allCards) {
      const cardKey = c.getAttribute('data-opt-key') || c.dataset.optKey;
      if (cardKey === optKey) {
        card = c;
        break;
      }
    }
  }
  
  // Se ainda não encontrou, retornar (será tentado novamente depois)
  if (!card) {
    return;
  }
  
  updateCardState(card, isApplied);
  
  function updateCardState(card, isApplied) {
    const applyBtn = card?.querySelector('.forced-opt-btn[data-action="apply"], .forced-opt-btn[data-action="activate"]');
    const deactivateBtn = card?.querySelector('.forced-opt-btn[data-action="deactivate"]');
    
    if (isApplied) {
      // Marcar como aplicado
      card.classList.add('applied');
      if (applyBtn) {
        const originalText = applyBtn.dataset.action === 'activate' ? 'Ativar' : 'Aplicar';
        applyBtn.textContent = originalText;
        applyBtn.style.background = '';
        applyBtn.style.display = 'none';
        applyBtn.disabled = false;
      }
      if (deactivateBtn) {
        deactivateBtn.style.display = 'flex';
        deactivateBtn.disabled = false;
      }
      // Adicionar indicador visual verde
      card.style.borderColor = 'rgba(16, 185, 129, 0.5)';
      card.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)';
      // Garantir que a classe applied está presente
      if (!card.classList.contains('applied')) {
        card.classList.add('applied');
      }
    } else {
      // Marcar como não aplicado
      card.classList.remove('applied');
      if (deactivateBtn) {
        deactivateBtn.style.display = 'none';
        deactivateBtn.textContent = 'Desativar';
        deactivateBtn.style.background = '';
        deactivateBtn.disabled = false;
      }
      if (applyBtn) {
        const originalText = applyBtn.dataset.action === 'activate' ? 'Ativar' : 'Aplicar';
        applyBtn.textContent = originalText;
        applyBtn.style.background = '';
        applyBtn.style.display = 'flex';
        applyBtn.disabled = false;
      }
      // Remover indicador visual verde
      card.style.borderColor = '';
      card.style.boxShadow = '';
    }
  }
}

// Desativar otimização forçada
async function deactivateForcedOptimization(optKey) {
  const card = document.querySelector(`.forced-opt-card[data-opt-key="${optKey}"]`);
  const applyBtn = card?.querySelector('.forced-opt-btn[data-action="apply"], .forced-opt-btn[data-action="activate"]');
  const deactivateBtn = card?.querySelector('.forced-opt-btn[data-action="deactivate"]');

  if (!card || !deactivateBtn) return;

  // Obter nome da otimização para o log
  const optName = getOptimizationName(optKey) || optKey;
  addLogEntry(`Desativou: Otimização Forçada - ${optName}`, 'info');

  // Garantir que o botão aplicar está com o texto correto antes de mostrar
  if (applyBtn) {
    const originalText = applyBtn.dataset.action === 'activate' ? 'Ativar' : 'Aplicar';
    applyBtn.textContent = originalText;
    applyBtn.style.background = '';
    applyBtn.disabled = false;
  }

  try {
    deactivateBtn.disabled = true;
    deactivateBtn.textContent = 'Desativando...';

    const result = await window.y20?.deactivateOptimization?.(optKey);
    
    if (result?.success) {
      // Mostrar "Desativado!" temporariamente
      deactivateBtn.textContent = 'Desativado!';
      deactivateBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      
      // Aguardar um pouco para mostrar o feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      card.classList.remove('applied');
      deactivateBtn.style.display = 'none';
      deactivateBtn.textContent = 'Desativar';
      deactivateBtn.style.background = '';
      if (applyBtn) {
        applyBtn.style.display = 'flex';
        // Garantir que o texto está correto
        const originalText = applyBtn.dataset.action === 'activate' ? 'Ativar' : 'Aplicar';
        applyBtn.textContent = originalText;
      }
      console.log(`[Otimização Forçada] ${optKey} desativado:`, result.message);
      
      // Salvar na API Cloudflare (marcar como false)
      try {
        // Carregar configurações existentes da API Cloudflare
        let currentConfig = {};
        try {
          const loadResult = await cloudflareApiRequest('GET', '/api/optimizations/get');
          if (loadResult.success && loadResult.data) {
            currentConfig = loadResult.data;
          }
        } catch (err) {
          console.warn('[Otimização Forçada] Erro ao carregar da API:', err);
        }
        
        // Marcar como desativada (false)
        currentConfig[optKey] = false;
        
        // Salvar na API Cloudflare
        const saveResult = await cloudflareApiRequest('POST', '/api/optimizations/save', currentConfig);
        if (saveResult.success) {
          console.log(`[Otimização Forçada] ${optKey} desativado na API Cloudflare`);
        } else {
          console.warn(`[Otimização Forçada] Erro ao salvar: ${saveResult.error}`);
        }
      } catch (err) {
        console.warn('[Otimização Forçada] Erro ao salvar na API:', err);
      }
      
      showToast('Otimização desativada com sucesso!', 'success');
    } else {
      throw new Error(result?.message || 'Erro ao desativar otimização');
    }
  } catch (error) {
    console.error(`[Otimização Forçada] Erro ao desativar ${optKey}:`, error);
    deactivateBtn.disabled = false;
    deactivateBtn.textContent = 'Desativar';
    deactivateBtn.style.background = '';
    showToast(`Erro ao desativar otimização: ${error.message}`, 'error');
  }
}

// Função global para teste manual (disponível no console)
window.testForcedOptimization = function() {
  console.log('=== TESTE MANUAL DE OTIMIZAÇÃO FORÇADA ===');
  console.log('1. Verificando seção:', !!document.querySelector('[data-section="forced-optimization"]'));
  console.log('2. Verificando dados:', !!advancedOptimizationsData, Object.keys(advancedOptimizationsData || {}));
  console.log('3. Verificando grids:');
  ['processos', 'sistema', 'gpu'].forEach(cat => {
    const grid = document.getElementById(`forced-opt-grid-${cat}`);
    console.log(`   - ${cat}:`, !!grid, grid?.children.length || 0, 'elementos');
  });
  console.log('4. Chamando initForcedOptimization()...');
  initForcedOptimization();
  console.log('=== FIM DO TESTE ===');
};

boot();

// Função auxiliar para inicializar quando a seção estiver pronta
function tryInitForcedOptimization() {
  const forcedSection = document.querySelector('[data-section="forced-optimization"]');
  if (forcedSection) {
    // Verificar se está ativa ou se os grids existem
    const hasGrids = document.getElementById('forced-opt-grid-processos');
    if (hasGrids || forcedSection.classList.contains('active')) {
      console.log('[Otimização Forçada] Tentando inicializar...');
      initForcedOptimization();
      return true;
    }
  }
  return false;
}

// Inicializar Otimização Forçada se a seção já estiver ativa após o boot
setTimeout(() => {
  if (!tryInitForcedOptimization()) {
    // Tentar novamente após mais tempo
    setTimeout(() => {
      tryInitForcedOptimization();
    }, 2000);
  }
}, 1000);

// Observer para detectar quando a seção se torna ativa
const forcedSectionObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const target = mutation.target;
      if (target.dataset.section === 'forced-optimization' && target.classList.contains('active')) {
        console.log('[Otimização Forçada] Seção se tornou ativa (via observer)');
        setTimeout(() => {
          initForcedOptimization();
        }, 200);
      }
    }
  });
});

// Iniciar observer quando o DOM estiver pronto
setTimeout(() => {
  const forcedSection = document.querySelector('[data-section="forced-optimization"]');
  if (forcedSection) {
    forcedSectionObserver.observe(forcedSection, {
      attributes: true,
      attributeFilter: ['class']
    });
    console.log('[Otimização Forçada] Observer configurado');
  }
}, 2000);

// ========== PREDEFINIÇÃO DE OTIMIZAÇÕES ==========

// Estrutura completa de todas as otimizações disponíveis
function getAllPresetOptimizations() {
  const allOptimizations = {
    'configuracoes_basicas': {
      name: '⚙️ Configurações Básicas',
      items: (optimizationItems || []).map(item => ({
        key: `basic.${item.key}`,
        name: item.title,
        description: item.description,
        tech: '',
        icon: item.icon || '⚙️'
      }))
    },
    'otimizar_windows': {
      name: '🚀 Otimizar Windows',
      items: (windowsOptimizeItems || []).map(item => ({
        key: `windows.${item.key}`,
        name: item.title,
        description: item.description,
        tech: '',
        icon: item.icon || '🚀'
      }))
    },
    'plano_energia': {
      name: '🔋 Plano Energia',
      items: (powerPlanState.apply || []).map(entry => ({
        key: `powerplan.${entry.id}`,
        name: entry.name || entry.path || 'Script de Energia',
        description: getScriptDescription(entry) || 'Otimiza plano de energia do sistema',
        tech: '',
        icon: '🔋'
      }))
    },
    'limpeza_windows': {
      name: '🧹 Limpeza Windows',
      items: (cleanupWindowsState.apply || []).map(entry => ({
        key: `cleanup.${entry.id}`,
        name: entry.name || entry.path || 'Script de Limpeza',
        description: getScriptDescription(entry) || 'Limpeza e otimização do sistema',
        tech: '',
        icon: '🧹'
      }))
    },
    'desativar_windows': {
      name: '🚫 Desativar Windows',
      items: (disableWindowsState.apply || []).map(entry => ({
        key: `disable.${entry.id}`,
        name: entry.name || entry.path || 'Script de Desativação',
        description: getScriptDescription(entry) || 'Desativa recursos do Windows',
        tech: '',
        icon: '🚫'
      }))
    },
    'scripts_importantes': {
      name: '📜 Scripts Importantes',
      items: (importantScriptsState.items || []).map(entry => ({
        key: `important.${entry.id || entry.name}`,
        name: entry.name || entry.path || 'Script Importante',
        description: getScriptDescription(entry) || 'Script importante de otimização',
        tech: '',
        icon: '📜'
      }))
    },
    'booster_robusta': {
      name: '💪 Booster Robusta',
      items: (boosterRobustaState.items || []).map(entry => ({
        key: `booster.${entry.id || entry.name}`,
        name: entry.name || entry.path || 'Script Booster',
        description: getScriptDescription(entry) || 'Script de booster robusta',
        tech: '',
        icon: '💪'
      }))
    },
    'otimizacao_simples': {
      name: '⚡ Otimização Simples',
      items: (optimizationSimpleState.items || []).map(entry => ({
        key: `simple.${entry.id || entry.name}`,
        name: entry.name || entry.path || 'Script Simples',
        description: getScriptDescription(entry) || 'Script de otimização simples',
        tech: '',
        icon: '⚡'
      }))
    },
    'otimizacao_basico': {
      name: '🔵 Otimização Básico',
      items: (optimizationBasicState.items || []).map(entry => ({
        key: `basicpack.${entry.id || entry.name}`,
        name: entry.name || entry.path || 'Script Básico',
        description: getScriptDescription(entry) || 'Script de otimização básico',
        tech: '',
        icon: '🔵'
      }))
    },
    'otimizacao_vip': {
      name: '⭐ Otimização VIP',
      items: (optimizationVipState.items || []).map(entry => ({
        key: `vippack.${entry.id || entry.name}`,
        name: entry.name || entry.path || 'Script VIP',
        description: getScriptDescription(entry) || 'Script de otimização VIP',
        tech: '',
        icon: '⭐'
      }))
    }
  };
  
  // Adicionar otimizações forçadas
  if (advancedOptimizationsData) {
    Object.keys(advancedOptimizationsData).forEach(category => {
      const categoryName = getCategoryName(category);
      allOptimizations[`forced_${category}`] = {
        name: categoryName,
        items: advancedOptimizationsData[category].map(item => ({
          key: item.key,
          name: item.name,
          description: forcedOptDescriptions[item.key] || item.desc || 'Otimização do sistema.',
          tech: '',
          icon: categoryName.split(' ')[0] // Pegar emoji do nome
        }))
      };
    });
  }
  
  return allOptimizations;
}

let presetState = {
  saved: null, // { selected: ['opt1', 'opt2', ...], categories: {...} }
  modalOpen: false,
  currentCategory: null
};

// Carregar predefinição salva
async function loadPreset() {
  try {
    const saved = await window.y20?.loadPreset?.() || null;
    presetState.saved = saved;
    updatePresetUI();
    return saved;
  } catch (err) {
    console.error('[Preset] Erro ao carregar:', err);
    return null;
  }
}

// Salvar predefinição
async function savePreset(selected) {
  try {
    await window.y20?.savePreset?.(selected);
    presetState.saved = selected;
    updatePresetUI();
    showToast('✅ Predefinição salva com sucesso!', 'success');
    return true;
  } catch (err) {
    console.error('[Preset] Erro ao salvar:', err);
    showToast('❌ Erro ao salvar predefinição', 'error');
    return false;
  }
}

// Apagar predefinição
async function deletePreset() {
  if (!confirm('Deseja realmente apagar a predefinição?')) {
    return;
  }
  try {
    await window.y20?.deletePreset?.();
    presetState.saved = null;
    updatePresetUI();
    showToast('🗑️ Predefinição apagada', 'info');
  } catch (err) {
    console.error('[Preset] Erro ao apagar:', err);
    showToast('❌ Erro ao apagar predefinição', 'error');
  }
}

// Atualizar UI dos botões de predefinição
function updatePresetUI() {
  const presetButton = document.getElementById('preset-button');
  const presetExecute = document.getElementById('preset-execute');
  const presetEdit = document.getElementById('preset-edit');
  const presetDelete = document.getElementById('preset-delete');
  const presetButtonText = document.getElementById('preset-button-text');
  const presetCardTitle = document.getElementById('preset-card-title');
  const presetCardSubtitle = document.getElementById('preset-card-subtitle');
  
  if (!presetButton) return;
  
  const hasPreset = presetState.saved && presetState.saved.selected && presetState.saved.selected.length > 0;
  const count = hasPreset ? presetState.saved.selected.length : 0;
  
  // Atualizar título e subtítulo
  if (presetCardTitle) {
    presetCardTitle.textContent = hasPreset ? `Predefinição (${count} itens)` : 'Predefinição';
  }
  if (presetCardSubtitle) {
    presetCardSubtitle.textContent = hasPreset ? `${count} otimizações configuradas` : 'Crie e execute otimizações personalizadas';
  }
  if (presetButtonText) {
    presetButtonText.textContent = hasPreset ? 'Editar' : 'Criar';
  }
  
  // Ativar/desativar botões
  if (presetExecute) {
    presetExecute.disabled = !hasPreset;
    presetExecute.style.opacity = hasPreset ? '1' : '0.5';
    presetExecute.style.cursor = hasPreset ? 'pointer' : 'not-allowed';
  }
  if (presetEdit) {
    presetEdit.disabled = !hasPreset;
    presetEdit.style.opacity = hasPreset ? '1' : '0.5';
    presetEdit.style.cursor = hasPreset ? 'pointer' : 'not-allowed';
  }
  if (presetDelete) {
    presetDelete.disabled = !hasPreset;
    presetDelete.style.opacity = hasPreset ? '1' : '0.5';
    presetDelete.style.cursor = hasPreset ? 'pointer' : 'not-allowed';
  }
}

// Abrir modal de predefinição
async function openPresetModal() {
  const modal = document.getElementById('preset-modal');
  if (!modal) return;
  
  presetState.modalOpen = true;
  modal.hidden = false;
  
  // Carregar scripts .bat se ainda não foram carregados
  if (!powerPlanState.loaded) {
    await loadPowerPlanActions(true);
  }
  if (!cleanupWindowsState.loaded) {
    await loadCleanupWindowsActions(true);
  }
  if (!disableWindowsState.loaded) {
    await loadDisableWindowsActions(true);
  }
  if (!importantScriptsState.loaded) {
    await loadImportantScripts(true);
  }
  if (!boosterRobustaState.loaded) {
    await loadBoosterRobusta(true);
  }
  
  // Carregar scripts das pastas de otimização
  if (!optimizationSimpleState.loaded) {
    try {
      const result = await window.y20.optimizationPackList('');
      if (result && result.success && Array.isArray(result.scripts)) {
        optimizationSimpleState.items = result.scripts;
        optimizationSimpleState.loaded = true;
      } else if (result && Array.isArray(result)) {
        // Fallback: se retornar array diretamente
        optimizationSimpleState.items = result;
        optimizationSimpleState.loaded = true;
      }
    } catch (e) {
      console.warn('[Preset] Erro ao carregar scripts simples:', e);
    }
  }
  if (!optimizationBasicState.loaded) {
    try {
      const result = await window.y20.optimizationPackList('Otimização Basico');
      if (result && result.success && Array.isArray(result.scripts)) {
        optimizationBasicState.items = result.scripts;
        optimizationBasicState.loaded = true;
      } else if (result && Array.isArray(result)) {
        // Fallback: se retornar array diretamente
        optimizationBasicState.items = result;
        optimizationBasicState.loaded = true;
      }
    } catch (e) {
      console.warn('[Preset] Erro ao carregar scripts básico:', e);
    }
  }
  if (!optimizationVipState.loaded) {
    try {
      const result = await window.y20.optimizationPackList('Otimização Vip');
      if (result && result.success && Array.isArray(result.scripts)) {
        optimizationVipState.items = result.scripts;
        optimizationVipState.loaded = true;
      } else if (result && Array.isArray(result)) {
        // Fallback: se retornar array diretamente
        optimizationVipState.items = result;
        optimizationVipState.loaded = true;
      }
    } catch (e) {
      console.warn('[Preset] Erro ao carregar scripts VIP:', e);
    }
  }
  
  // Popular categorias
  populatePresetCategories();
  
  // Selecionar primeira categoria
  const allOptimizations = getAllPresetOptimizations();
  const firstCategory = Object.keys(allOptimizations)[0];
  if (firstCategory) {
    selectPresetCategory(firstCategory);
  }
  
  // Marcar itens já salvos
  if (presetState.saved && presetState.saved.selected) {
    presetState.saved.selected.forEach(optKey => {
      const checkbox = document.querySelector(`input[data-preset-opt="${optKey}"]`);
      if (checkbox) checkbox.checked = true;
    });
  }
}

// Fechar modal de predefinição
function closePresetModal() {
  const modal = document.getElementById('preset-modal');
  if (!modal) return;
  
  presetState.modalOpen = false;
  modal.hidden = true;
  presetState.currentCategory = null;
}

// Popular categorias no modal
function populatePresetCategories() {
  const categoriesContainer = document.getElementById('preset-categories');
  if (!categoriesContainer) return;
  
  categoriesContainer.innerHTML = '';
  
  const allOptimizations = getAllPresetOptimizations();
  
  Object.keys(allOptimizations).forEach(categoryKey => {
    const category = allOptimizations[categoryKey];
    if (!category.items || category.items.length === 0) return;
    
    const btn = document.createElement('button');
    btn.className = 'ghost';
    btn.style.textAlign = 'left';
    btn.style.width = '100%';
    btn.style.padding = '12px';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.transition = 'all 0.2s';
    btn.textContent = `${category.name} (${category.items.length})`;
    btn.dataset.category = categoryKey;
    
    btn.addEventListener('click', () => selectPresetCategory(categoryKey));
    
    categoriesContainer.appendChild(btn);
  });
}

// Nome da categoria
function getCategoryName(category) {
  const names = {
    'processos': '🔄 Processos',
    'sistema': '🖥️ Sistema',
    'memoria': '💾 Memória RAM',
    'rede': '🌐 Rede',
    'disco': '💿 Disco',
    'gpu': '🎮 GPU',
    'energia': '⚡ Energia',
    'servicos': '🔧 Serviços',
    'registro': '📝 Registro',
    'monitoramento': '📊 Monitoramento',
    'modos': '🎯 Modos',
    'extras': '✨ Extras'
  };
  return names[category] || category;
}

// Selecionar categoria no modal
function selectPresetCategory(categoryKey) {
  presetState.currentCategory = categoryKey;
  
  // Atualizar botões de categoria
  document.querySelectorAll('#preset-categories button').forEach(btn => {
    if (btn.dataset.category === categoryKey) {
      btn.style.background = 'var(--accent-primary)';
      btn.style.color = '#fff';
    } else {
      btn.style.background = 'transparent';
      btn.style.color = 'var(--text-primary)';
    }
  });
  
  // Popular conteúdo
  populatePresetContent(categoryKey);
  
  // Atualizar título após mudar de categoria (para mostrar contador correto)
  updatePresetModalTitle();
}

// Popular conteúdo da categoria
function populatePresetContent(categoryKey) {
  const contentContainer = document.getElementById('preset-content');
  if (!contentContainer) return;
  
  contentContainer.innerHTML = '';
  
  const allOptimizations = getAllPresetOptimizations();
  const category = allOptimizations[categoryKey];
  
  if (!category || !category.items || category.items.length === 0) {
    contentContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Nenhuma otimização disponível nesta categoria.</p>';
    return;
  }
  
  category.items.forEach(item => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; display: flex; align-items: flex-start; gap: 12px; transition: all 0.2s; flex-direction: column;';
    card.addEventListener('mouseenter', () => {
      card.style.background = 'var(--bg-secondary)';
      card.style.borderColor = 'var(--accent-primary)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = 'var(--bg-card)';
      card.style.borderColor = 'var(--border-color)';
    });
    
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = 'display: flex; align-items: center; gap: 12px; width: 100%;';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.presetOpt = item.key;
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';
    checkbox.style.cursor = 'pointer';
    checkbox.style.flexShrink = '0';
    
    const label = document.createElement('label');
    label.style.cssText = 'flex: 1; cursor: pointer;';
    
    // Verificar se é o item que precisa de aviso
    const needsWarning = item.key === 'processos.encerrar_background';
    const warningHtml = needsWarning ? `
      <div class="forced-opt-warning" style="margin-top: 12px; padding: 10px 12px; background: rgba(255, 193, 7, 0.15); border: 1px solid rgba(255, 193, 7, 0.4); border-radius: 8px; display: flex; align-items: flex-start; gap: 8px; width: 100%;">
        <span style="font-size: 16px; flex-shrink: 0;">⚠️</span>
        <p style="margin: 0; font-size: 12px; color: rgba(255, 193, 7, 0.95); line-height: 1.4; font-weight: 500;">
          <strong style="color: rgba(255, 193, 7, 1);">⚠️ IMPORTANTE:</strong> Se ocorrer tela azul, recomendo trocar de windows, ou evite de aplicar-lo.
        </p>
      </div>
    ` : '';
    
    label.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
        <span style="font-size: 18px;">${item.icon || '⚙️'}</span>
        <div style="font-weight: 600; color: var(--text-primary);">${item.name}</div>
      </div>
      <div style="font-size: 12px; color: var(--text-secondary); margin-left: 26px;">${item.description}</div>
    `;
    label.addEventListener('click', (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        // Disparar evento change para atualizar o estado
        checkbox.dispatchEvent(new Event('change'));
      }
    });
    
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (!presetState.saved) presetState.saved = { selected: [] };
        if (!presetState.saved.selected) presetState.saved.selected = [];
        if (!presetState.saved.selected.includes(item.key)) {
          presetState.saved.selected.push(item.key);
        }
      } else {
        if (presetState.saved && presetState.saved.selected) {
          presetState.saved.selected = presetState.saved.selected.filter(k => k !== item.key);
        }
      }
      updatePresetModalTitle();
    });
    
    contentWrapper.appendChild(checkbox);
    contentWrapper.appendChild(label);
    card.appendChild(contentWrapper);
    
    // Adicionar aviso se necessário
    if (needsWarning) {
      const warningDiv = document.createElement('div');
      warningDiv.innerHTML = warningHtml;
      card.appendChild(warningDiv.firstElementChild);
    }
    
    contentContainer.appendChild(card);
  });
  
  // Atualizar título após popular
  updatePresetModalTitle();
  
  // Marcar itens já salvos imediatamente após criar os cards
  if (presetState.saved && presetState.saved.selected) {
    presetState.saved.selected.forEach(optKey => {
      const checkbox = document.querySelector(`input[data-preset-opt="${optKey}"]`);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
    // Atualizar título após marcar
    updatePresetModalTitle();
  }
}

// Atualizar contador no título do modal
function updatePresetModalTitle() {
  const modalTitle = document.querySelector('#preset-modal h2');
  if (!modalTitle) return;
  
  // Contar todas as seleções salvas (não apenas as visíveis na categoria atual)
  let checkedCount = 0;
  
  // Primeiro, verificar se há seleções salvas
  if (presetState.saved && presetState.saved.selected) {
    checkedCount = presetState.saved.selected.length;
  } else {
    // Se não há seleções salvas, contar apenas os checkboxes visíveis (para feedback imediato)
    checkedCount = document.querySelectorAll('input[data-preset-opt]:checked').length;
  }
  
  if (checkedCount > 0) {
    modalTitle.textContent = `📋 Predefina o que esse botão vai executar (${checkedCount} selecionado${checkedCount > 1 ? 's' : ''})`;
  } else {
    modalTitle.textContent = '📋 Predefina o que esse botão vai executar';
  }
}

// Confirmar predefinição
function confirmPreset() {
  // Usar presetState.saved.selected se existir (já está sendo atualizado em tempo real)
  // Caso contrário, coletar dos checkboxes visíveis
  let selected = [];
  
  if (presetState.saved && presetState.saved.selected && presetState.saved.selected.length > 0) {
    // Usar as seleções já salvas no estado (atualizadas em tempo real)
    selected = [...presetState.saved.selected];
  } else {
    // Fallback: coletar dos checkboxes visíveis
    document.querySelectorAll('input[data-preset-opt]:checked').forEach(checkbox => {
      selected.push(checkbox.dataset.presetOpt);
    });
  }
  
  if (selected.length === 0) {
    showToast('⚠️ Selecione pelo menos uma otimização', 'warning');
    return;
  }
  
  savePreset({ selected });
  closePresetModal();
}

// Executar predefinição
async function executePreset() {
  if (!presetState.saved || !presetState.saved.selected || presetState.saved.selected.length === 0) {
    showToast('⚠️ Nenhuma predefinição configurada', 'warning');
    return;
  }
  
  addLogEntry('Executou: Predefinição de otimizações', 'info');
  
  // Adicionar animação no botão de executar predefinição
  const presetExecuteBtn = document.getElementById('preset-execute');
  let originalPresetHTML = '';
  if (presetExecuteBtn) {
    originalPresetHTML = presetExecuteBtn.innerHTML;
    presetExecuteBtn.disabled = true;
    presetExecuteBtn.innerHTML = '<span class="btn-icon" style="animation: spin 1s linear infinite;">▶️</span><span>Executando...</span>';
    presetExecuteBtn.style.opacity = '0.8';
    presetExecuteBtn.style.cursor = 'wait';
  }
  
  try {
    // Abrir overlay de otimização (similar ao VIP)
    showOptimizeOverlay('Predefinição');
    const selected = presetState.saved.selected;
    const selectedCount = selected.length;
    
    // Resetar entradas de otimização
    optimizationEntries = [];
    if (optimizeResults) optimizeResults.innerHTML = '';
    if (optimizeSummary) optimizeSummary.hidden = true;
    if (optimizeLog) optimizeLog.hidden = false;
    
    updateOptimizeOverlay(0, `Iniciando execução da predefinição (${selectedCount} otimização${selectedCount > 1 ? 'ões' : ''} selecionada${selectedCount > 1 ? 's' : ''})...`);
    
    // Coletar todas as otimizações básicas e Windows disponíveis
    const allBasicOpts = (optimizationItems || []).map(item => `basic.${item.key}`);
    const allWindowsOpts = (windowsOptimizeItems || []).map(item => `windows.${item.key}`);
    
    // Identificar quais básicas/Windows foram selecionadas
    const selectedBasic = selected.filter(k => k.startsWith('basic.'));
    const selectedWindows = selected.filter(k => k.startsWith('windows.'));
    
    // Identificar quais básicas/Windows NÃO foram selecionadas (devem ser desativadas)
    const toDeactivateBasic = allBasicOpts.filter(k => !selectedBasic.includes(k));
    const toDeactivateWindows = allWindowsOpts.filter(k => !selectedWindows.includes(k));
    
    // Calcular total de operações (ativar selecionadas + desativar não selecionadas)
    const totalOperations = selected.length + toDeactivateBasic.length + toDeactivateWindows.length;
    // selectedCount já foi declarado acima
    let currentOperation = 0;
    let successCount = 0;
    let failCount = 0;
    // Primeiro: Desativar otimizações básicas não selecionadas (silenciosamente, sem mostrar contador)
    for (const optKey of toDeactivateBasic) {
      currentOperation++;
      const key = optKey.replace('basic.', '');
      const optName = getOptimizationName(optKey);
      const percent = Math.round((currentOperation / totalOperations) * 100);
      
      // Mostrar apenas o progresso geral, sem contador específico
      updateOptimizeOverlay(percent, `Preparando: ${optName}...`);
      
      try {
        const result = await window.y20?.setOptimization?.(key, false);
        if (result && (result.success !== false)) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        console.error(`[Preset] Erro ao desativar ${optKey}:`, err);
        failCount++;
      }
    }
    
    // Segundo: Desativar otimizações Windows não selecionadas (silenciosamente, sem mostrar contador)
    for (const optKey of toDeactivateWindows) {
      currentOperation++;
      const key = optKey.replace('windows.', '');
      const optName = getOptimizationName(optKey);
      const percent = Math.round((currentOperation / totalOperations) * 100);
      
      // Mostrar apenas o progresso geral, sem contador específico
      updateOptimizeOverlay(percent, `Preparando: ${optName}...`);
      
      try {
        const result = await window.y20?.setOptimization?.(key, false);
        if (result && (result.success !== false)) {
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        console.error(`[Preset] Erro ao desativar ${optKey}:`, err);
        failCount++;
      }
    }
    
    // Terceiro: Aplicar otimizações selecionadas (mostrar contador apenas das selecionadas)
    let appliedCount = 0; // Contador apenas das aplicadas
    for (let i = 0; i < selected.length; i++) {
      currentOperation++;
      appliedCount++;
      const optKey = selected[i];
      const optName = getOptimizationName(optKey);
      const percent = Math.round((currentOperation / totalOperations) * 100);
      
      // Atualizar progresso no overlay (mostrar apenas as selecionadas no contador)
      updateOptimizeOverlay(percent, `Aplicando: ${optName} (${appliedCount}/${selectedCount})`);
      
      // Adicionar entrada no log
      addOptimizationLogEntry(optName, 'executing');
      
      try {
        let result = null;
        
        // Verificar tipo de otimização e aplicar
        if (optKey.startsWith('basic.')) {
          // Otimização básica
          const key = optKey.replace('basic.', '');
          result = await window.y20?.setOptimization?.(key, true);
        } else if (optKey.startsWith('windows.')) {
          // Otimização Windows
          const key = optKey.replace('windows.', '');
          result = await window.y20?.setOptimization?.(key, true);
        } else if (optKey.startsWith('powerplan.')) {
          // Plano Energia
          const id = optKey.replace('powerplan.', '');
          result = await window.y20?.powerPlanRun?.(id);
        } else if (optKey.startsWith('cleanup.')) {
          // Limpeza Windows
          const id = optKey.replace('cleanup.', '');
          result = await window.y20?.cleanupWindowsRun?.(id);
        } else if (optKey.startsWith('disable.')) {
          // Desativar Windows
          const id = optKey.replace('disable.', '');
          result = await window.y20?.disableWindowsRun?.(id);
        } else if (optKey.startsWith('important.')) {
          // Scripts Importantes
          const id = optKey.replace('important.', '');
          result = await window.y20?.optimizationPackRunOne?.(id);
        } else if (optKey.startsWith('booster.')) {
          // Booster Robusta
          const id = optKey.replace('booster.', '');
          result = await window.y20?.optimizationPackRunOne?.(id);
        } else if (optKey.startsWith('simple.')) {
          // Otimização Simples
          const id = optKey.replace('simple.', '');
          result = await window.y20?.optimizationPackRunOne?.(id);
        } else if (optKey.startsWith('basicpack.')) {
          // Otimização Básico
          const id = optKey.replace('basicpack.', '');
          result = await window.y20?.optimizationPackRunOne?.(id);
        } else if (optKey.startsWith('vippack.')) {
          // Otimização VIP
          const id = optKey.replace('vippack.', '');
          result = await window.y20?.optimizationPackRunOne?.(id);
        } else {
          // Otimização forçada
          result = await window.y20?.applyOptimization?.(optKey);
          
          // Se aplicou com sucesso, atualizar estado visual do card na Otimização Forçada
          if (result && result.success !== false) {
            // Aguardar um pouco para garantir que a aplicação foi processada
            await new Promise(resolve => setTimeout(resolve, 300));
            updateForcedOptimizationCardState(optKey, true);
          }
        }
        
        if (result && (result.success !== false)) {
          successCount++;
          updateOptimizationLogEntry(optName, 'success', 'Pronto! ✓');
        } else {
          failCount++;
          updateOptimizationLogEntry(optName, 'error', 'Erro');
        }
      } catch (err) {
        console.error(`[Preset] Erro ao aplicar ${optKey}:`, err);
        failCount++;
        updateOptimizationLogEntry(optName, 'error', 'Erro');
      }
      
      // Pequeno delay entre otimizações
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Atualizar progresso final (mostrar apenas as selecionadas aplicadas)
    const appliedSuccessCount = successCount - (toDeactivateBasic.length + toDeactivateWindows.length - failCount);
    updateOptimizeOverlay(100, `Concluído! ${appliedCount} otimizações aplicadas`);
    
    // Calcular e atualizar score baseado na quantidade de itens selecionados
    try {
      const scoreResult = await window.y20?.calculatePresetScore?.(selectedCount);
      if (scoreResult && scoreResult.success && scoreResult.optimizationScore !== undefined) {
        setGaugeValue(scoreResult.optimizationScore);
        console.log('[Preset] Score atualizado após predefinição:', scoreResult.optimizationScore);
      }
    } catch (scoreError) {
      console.warn('[Preset] Erro ao atualizar score:', scoreError);
    }
    
    // Aguardar um pouco antes de fechar
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Atualizar estado visual de todas as otimizações forçadas que foram aplicadas
    // Fazer isso após todas as aplicações para garantir que os cards estejam renderizados
    const forcedOptsApplied = selected.filter(optKey => {
      // Verificar se é otimização forçada (não tem prefixo)
      return !optKey.startsWith('basic.') && 
             !optKey.startsWith('windows.') && 
             !optKey.startsWith('powerplan.') && 
             !optKey.startsWith('cleanup.') && 
             !optKey.startsWith('disable.') && 
             !optKey.startsWith('important.') && 
             !optKey.startsWith('booster.') && 
             !optKey.startsWith('simple.') && 
             !optKey.startsWith('basicpack.') && 
             !optKey.startsWith('vippack.');
    });
    
    // Atualizar cada otimização forçada aplicada
    for (const optKey of forcedOptsApplied) {
      // Tentar múltiplas vezes para garantir que o card seja encontrado
      updateForcedOptimizationCardState(optKey, true);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 500);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 1000);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 1500);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 2000);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 3000);
      setTimeout(() => updateForcedOptimizationCardState(optKey, true), 5000);
    }
    
    // Salvar otimizações forçadas na API após aplicá-las
    if (forcedOptsApplied.length > 0) {
      try {
        // Carregar configurações existentes da API Cloudflare
        let currentConfig = {};
        try {
          const loadResult = await cloudflareApiRequest('GET', '/api/optimizations/get');
          if (loadResult.success && loadResult.data) {
            currentConfig = loadResult.data;
          }
        } catch (err) {
          console.warn('[Preset] Erro ao carregar otimizações da API:', err);
        }
        
        // Marcar todas as otimizações forçadas aplicadas como ativas
        forcedOptsApplied.forEach(optKey => {
          currentConfig[optKey] = true;
        });
        
        // Salvar configurações atualizadas na API Cloudflare
        try {
          const saveResult = await cloudflareApiRequest('POST', '/api/optimizations/save', currentConfig);
          if (saveResult.success) {
            console.log('[Preset] Otimizações forçadas salvas na API Cloudflare');
          } else {
            console.warn('[Preset] Erro ao salvar: ' + saveResult.error);
          }
          
          // Recarregar estado visual após salvar (com delay para garantir que a API processou)
          setTimeout(async () => {
            if (typeof loadAndUpdateForcedOptimizationState === 'function') {
              await loadAndUpdateForcedOptimizationState();
              // Tentar atualizar novamente após mais um delay
              setTimeout(() => {
                forcedOptsApplied.forEach(optKey => {
                  updateForcedOptimizationCardState(optKey, true);
                });
              }, 500);
            }
          }, 500);
        } catch (err) {
          console.warn('[Preset] Erro ao salvar otimizações na API:', err);
        }
      } catch (err) {
        console.error('[Preset] Erro ao salvar otimizações forçadas:', err);
      }
    }
    
    // Mostrar resumo antes de fechar overlay
    const presetResults = {
      applied: appliedCount,
      failed: failCount,
      skipped: 0
    };
    
    // Registrar contexto para modal de serviços
    lastOptimizationContext = { type: 'preset', folderName: '' };
    
    // Mostrar resumo
    showOptimizationSummary(presetResults, false);
    
    // Não fechar overlay ainda - esperar usuário confirmar no resumo
    // O overlay será fechado quando o usuário clicar em "Continuar" no resumo
  } catch (err) {
    console.error('[Preset] Erro ao executar:', err);
    hideOptimizeOverlay();
    showToast('❌ Erro ao executar predefinição', 'error');
  } finally {
    // Restaurar botão de predefinição após execução
    const presetExecuteBtn = document.getElementById('preset-execute');
    if (presetExecuteBtn) {
      presetExecuteBtn.disabled = false;
      presetExecuteBtn.innerHTML = '<span class="btn-icon" style="font-size: 12px;">▶️</span><span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Executar</span>';
      presetExecuteBtn.style.opacity = '1';
      presetExecuteBtn.style.cursor = 'pointer';
    }
  }
}

// Obter nome da otimização
function getOptimizationName(optKey) {
  // Verificar em otimizações forçadas
  if (advancedOptimizationsData) {
    for (const category in advancedOptimizationsData) {
      const item = advancedOptimizationsData[category].find(i => i.key === optKey);
      if (item) return item.name;
    }
  }
  
  // Verificar em configurações básicas
  if (optKey.startsWith('basic.')) {
    const key = optKey.replace('basic.', '');
    const item = optimizationItems?.find(i => i.key === key);
    if (item) return item.title;
  }
  
  // Verificar em otimizar windows
  if (optKey.startsWith('windows.')) {
    const key = optKey.replace('windows.', '');
    const item = windowsOptimizeItems?.find(i => i.key === key);
    if (item) return item.title;
  }
  
  // Verificar em plano energia
  if (optKey.startsWith('powerplan.')) {
    const id = optKey.replace('powerplan.', '');
    const item = powerPlanState.apply?.find(i => i.id === id);
    if (item) return item.name || item.path || 'Script de Energia';
  }
  
  // Verificar em limpeza windows
  if (optKey.startsWith('cleanup.')) {
    const id = optKey.replace('cleanup.', '');
    const item = cleanupWindowsState.apply?.find(i => i.id === id);
    if (item) return item.name || item.path || 'Script de Limpeza';
  }
  
  // Verificar em desativar windows
  if (optKey.startsWith('disable.')) {
    const id = optKey.replace('disable.', '');
    const item = disableWindowsState.apply?.find(i => i.id === id);
    if (item) return item.name || item.path || 'Script de Desativação';
  }
  
  // Verificar em scripts importantes
  if (optKey.startsWith('important.')) {
    const id = optKey.replace('important.', '');
    const item = importantScriptsState.items?.find(i => (i.id === id) || (i.name === id));
    if (item) return item.name || item.path || 'Script Importante';
  }
  
  // Verificar em booster robusta
  if (optKey.startsWith('booster.')) {
    const id = optKey.replace('booster.', '');
    const item = boosterRobustaState.items?.find(i => (i.id === id) || (i.name === id));
    if (item) return item.name || item.path || 'Script Booster';
  }
  
  return optKey;
}

// Inicializar predefinição
function initPreset() {
  // Carregar predefinição salva
  loadPreset();
  
  // Botão principal
  const presetButton = document.getElementById('preset-button');
  if (presetButton) {
    presetButton.addEventListener('click', () => {
      // Sempre abre o modal (criar ou editar)
      openPresetModal();
    });
  }
  
  // Botão executar
  const presetExecute = document.getElementById('preset-execute');
  if (presetExecute) {
    presetExecute.addEventListener('click', executePreset);
  }
  
  // Botão alterar
  const presetEdit = document.getElementById('preset-edit');
  if (presetEdit) {
    presetEdit.addEventListener('click', openPresetModal);
  }
  
  // Botão apagar
  const presetDelete = document.getElementById('preset-delete');
  if (presetDelete) {
    presetDelete.addEventListener('click', deletePreset);
  }
  
  // Botões do modal
  const presetModalCancel = document.getElementById('preset-modal-cancel');
  if (presetModalCancel) {
    presetModalCancel.addEventListener('click', closePresetModal);
  }
  
  const presetModalConfirm = document.getElementById('preset-modal-confirm');
  if (presetModalConfirm) {
    presetModalConfirm.addEventListener('click', confirmPreset);
  }
}

// Inicializar quando o DOM estiver pronto
requestAnimationFrame(() => {
  initPreset();
});

// Sistema de atualização obrigatória
let updateInfo = null;
let appBlockedByUpdate = false;

function showUpdateRequiredModal(info) {
  updateInfo = info;
  // Não bloquear completamente - apenas recomendar atualização
  appBlockedByUpdate = false;
  
  const modal = document.getElementById('update-required-modal');
  const currentVersionEl = document.getElementById('update-current-version');
  const latestVersionEl = document.getElementById('update-latest-version');
  const notesTextEl = document.getElementById('update-notes-text');
  const downloadBtn = document.getElementById('update-download-btn');
  
  if (!modal) {
    console.error('[Update] Modal de atualização não encontrado no DOM');
    return;
  }
  
  // Preencher informações
  if (currentVersionEl) {
    currentVersionEl.textContent = info.currentVersion || 'Desconhecida';
  }
  if (latestVersionEl) {
    latestVersionEl.textContent = info.latestVersion || 'Desconhecida';
  }
  if (notesTextEl) {
    // Limitar notas a 500 caracteres para não ficar muito longo
    const notes = info.releaseNotes || 'Sem notas de versão disponíveis.';
    notesTextEl.textContent = notes.length > 500 ? notes.substring(0, 500) + '...' : notes;
  }
  
  // Configurar botão de download
  if (downloadBtn) {
    downloadBtn.onclick = async () => {
      if (info.downloadUrl) {
        try {
          await window.y20.openUpdateDownload(info.downloadUrl);
          showToast('Abrindo link de download...', 'info');
        } catch (error) {
          console.error('[Update] Erro ao abrir link de download:', error);
          showToast('Erro ao abrir link de download', 'error');
        }
      } else {
        showToast('Link de download não disponível', 'error');
      }
    };
  }
  
  // Mostrar modal SEM bloquear completamente - apenas sobrepor
  modal.hidden = false;
  modal.style.display = 'flex';
  modal.style.zIndex = '99999';
  
  // NÃO bloquear elementos - apenas mostrar modal sobreposto
  // Usuário pode fechar e continuar usando
  
  // Adicionar event listener para o botão de fechar (já existe no HTML)
  const closeBtn = document.getElementById('update-modal-close');
  if (closeBtn) {
    closeBtn.onclick = () => {
      hideUpdateRequiredModal();
    };
  }
  
  console.log('[Update] ✨ Modal de atualização RECOMENDADA exibido - Usuário pode continuar usando');
}

function hideUpdateRequiredModal() {
  // Permitir fechar - é apenas uma recomendação
  const modal = document.getElementById('update-required-modal');
  if (modal) {
    modal.hidden = true;
    modal.style.display = 'none';
  }
  
  appBlockedByUpdate = false;
  
  // Reabilitar interface
  const appShell = document.getElementById('app-shell');
  if (appShell) {
    appShell.style.pointerEvents = '';
    appShell.style.opacity = '';
    appShell.style.filter = '';
  }
  
  document.body.style.overflow = '';
  document.body.style.pointerEvents = '';
  document.body.style.userSelect = '';
  
  const loginOverlay = document.getElementById('login-overlay');
  if (loginOverlay) {
    loginOverlay.style.pointerEvents = '';
    loginOverlay.style.opacity = '';
  }
  
  console.log('[Update] Modal de atualização fechado');
}

// ========== AUTO-UPDATER (Atualização Automática) ==========

let autoUpdateModal = null;
let autoUpdateProgressBar = null;
let autoUpdateStatusText = null;

function showAutoUpdateModal(info, status) {
  // Criar ou atualizar modal de atualização automática
  if (!autoUpdateModal) {
    autoUpdateModal = document.createElement('div');
    autoUpdateModal.className = 'vip-modal';
    autoUpdateModal.id = 'auto-update-modal';
    autoUpdateModal.style.cssText = 'z-index: 10000; display: flex;';
    autoUpdateModal.innerHTML = `
      <div class="vip-dialog" style="max-width: 600px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <div style="font-size: 64px; margin-bottom: 16px;">🔄</div>
          <h2 style="margin: 0; color: var(--accent);" id="auto-update-title">Atualizando...</h2>
        </div>
        <div style="margin: 20px 0; padding: 16px; background: rgba(112, 88, 255, 0.1); border: 2px solid rgba(112, 88, 255, 0.3); border-radius: 8px;">
          <p id="auto-update-status" style="margin: 0 0 12px 0; color: var(--text-primary); font-weight: 600;">
            Verificando atualizações...
          </p>
          <div style="margin: 12px 0; padding: 12px; background: rgba(0, 0, 0, 0.3); border-radius: 6px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: var(--text-secondary);">Nova versão:</span>
              <strong id="auto-update-version" style="color: var(--accent);">-</strong>
            </div>
          </div>
          <div style="margin-top: 16px;">
            <div style="width: 100%; height: 24px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; overflow: hidden;">
              <div id="auto-update-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--accent), #00b894); transition: width 0.3s; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 600;">
                0%
              </div>
            </div>
            <p id="auto-update-progress-text" style="margin: 8px 0 0 0; color: var(--text-secondary); font-size: 13px; text-align: center;">
              Aguardando...
            </p>
          </div>
        </div>
        <p style="margin: 20px 0; color: var(--text-secondary); text-align: center; font-size: 14px; line-height: 1.6;">
          <strong style="color: #00b894;">✨ Atualização automática em andamento!</strong><br>
          O painel será atualizado automaticamente. Não feche o aplicativo.
        </p>
      </div>
    `;
    document.body.appendChild(autoUpdateModal);
    
    autoUpdateProgressBar = document.getElementById('auto-update-progress-bar');
    autoUpdateStatusText = document.getElementById('auto-update-status');
  }
  
  // Atualizar conteúdo baseado no status
  const titleEl = document.getElementById('auto-update-title');
  const versionEl = document.getElementById('auto-update-version');
  const statusEl = document.getElementById('auto-update-status');
  
  if (status === 'available') {
    if (titleEl) titleEl.textContent = 'Atualização Disponível';
    if (versionEl) versionEl.textContent = info.version || 'Nova versão';
    if (statusEl) statusEl.textContent = 'Baixando atualização...';
    autoUpdateModal.hidden = false;
    autoUpdateModal.style.display = 'flex';
    
    // Bloquear interface
    document.body.style.pointerEvents = 'none';
    const appShell = document.getElementById('app-shell');
    if (appShell) {
      appShell.style.pointerEvents = 'none';
      appShell.style.opacity = '0.3';
    }
  } else if (status === 'downloaded') {
    if (titleEl) titleEl.textContent = 'Atualização Pronta!';
    if (statusEl) statusEl.textContent = 'Instalando atualização e reiniciando...';
    if (autoUpdateProgressBar) {
      autoUpdateProgressBar.style.width = '100%';
      autoUpdateProgressBar.textContent = '100%';
    }
  }
}

function updateAutoUpdateProgress(progress) {
  if (autoUpdateProgressBar) {
    const percent = Math.round(progress.percent);
    autoUpdateProgressBar.style.width = `${percent}%`;
    autoUpdateProgressBar.textContent = `${percent}%`;
  }
  
  if (autoUpdateStatusText) {
    const transferred = (progress.transferred / 1024 / 1024).toFixed(2);
    const total = (progress.total / 1024 / 1024).toFixed(2);
    autoUpdateStatusText.textContent = `Baixando: ${transferred} MB / ${total} MB (${Math.round(progress.percent)}%)`;
  }
  
  const progressTextEl = document.getElementById('auto-update-progress-text');
  if (progressTextEl && progress.bytesPerSecond) {
    const speed = (progress.bytesPerSecond / 1024 / 1024).toFixed(2);
    progressTextEl.textContent = `Velocidade: ${speed} MB/s`;
  }
}

// Verificar atualizações manualmente (pode ser chamado de um botão no futuro)
async function checkForUpdatesManually() {
  try {
    const result = await window.y20.checkUpdates();
    if (result && result.hasUpdate) {
      showUpdateRequiredModal(result);
    } else {
      showToast('Você está usando a versão mais recente!', 'success');
    }
  } catch (error) {
    console.error('[Update] Erro ao verificar atualizações:', error);
    showToast('Erro ao verificar atualizações', 'error');
  }
}

// Garantir que o banner "Painel offline" está sempre escondido
(function hideApiOfflineBannerOnLoad() {
  function hideBanner() {
    const banner = document.getElementById('api-offline-banner');
    if (banner) {
      banner.hidden = true;
      banner.style.display = 'none';
    }
  }
  
  // Esconder imediatamente se DOM já está pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hideBanner);
  } else {
    hideBanner();
  }
  
  // Esconder periodicamente para garantir que não apareça (otimizado: a cada 5 segundos)
  setInterval(hideBanner, 5000);
})();


