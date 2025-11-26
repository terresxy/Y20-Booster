const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const store = require('./store');

const DEFAULT_FOLDER_NAMES = ['BlueStacks_msi2', 'BlueStacks_msi5', 'BlueStacks_nxt'];
const CONFIG_FILE = 'bluestacks.conf';
const FREE_FIRE_CFG = path.join('Engine', 'UserData', 'InputMapper', 'com.dts.freefireth.cfg');
const FREE_FIRE_USER_CFG = path.join('Engine', 'UserData', 'InputMapper', 'UserFiles', 'com.dts.freefireth.cfg');

const BACKUP_KEY = 'bluestacksBackups';

function ensureBackups() {
  if (!store.get(BACKUP_KEY)) {
    store.set(BACKUP_KEY, {});
  }
}

function getBackups() {
  ensureBackups();
  return store.get(BACKUP_KEY) || {};
}

function appendBackup(key, entry) {
  ensureBackups();
  const backups = store.get(BACKUP_KEY) || {};
  const existing = backups[key];
  let list = [];
  if (Array.isArray(existing)) {
    list = existing.filter(
      (item) => !(item.filePath === entry.filePath && item.key === entry.key)
    );
  } else if (existing) {
    if (!(existing.filePath === entry.filePath && existing.key === entry.key)) {
      list = [existing];
    }
  }
  list.push(entry);
  backups[key] = list;
  store.set(BACKUP_KEY, backups);
}

function getBackupEntries(key) {
  const backups = getBackups();
  const entry = backups[key];
  if (!entry) {
    return [];
  }
  return Array.isArray(entry) ? entry : [entry];
}

function clearBackup(key) {
  const backups = getBackups();
  if (backups[key]) {
    delete backups[key];
    store.set(BACKUP_KEY, backups);
  }
}

function getProgramDataFolders() {
  try {
    const programData = process.env.PROGRAMDATA || path.join(process.env.SystemDrive || 'C:', 'ProgramData');
    return DEFAULT_FOLDER_NAMES.map((folder) => path.join(programData, folder));
  } catch (error) {
    console.error('[BlueStacks] Erro ao obter pastas do ProgramData:', error);
    return [];
  }
}

function fileExistsSync(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

async function readFileSafe(filePath) {
  return fsp.readFile(filePath, 'utf8');
}

async function writeFileSafe(filePath, content) {
  return fsp.writeFile(filePath, content, 'utf8');
}

// Função para detectar todas as instâncias do BlueStacks disponíveis
function detectAllBlueStacksInstances() {
  const instances = [];
  try {
    const programData = process.env.PROGRAMDATA || path.join(process.env.SystemDrive || 'C:', 'ProgramData');
    const folderNames = ['BlueStacks_msi2', 'BlueStacks_msi5', 'BlueStacks_nxt'];
    
    for (const folderName of folderNames) {
      const candidate = path.join(programData, folderName);
      const configPath = path.join(candidate, CONFIG_FILE);
      
      if (fileExistsSync(configPath)) {
        // Verificar se os arquivos necessários existem
        const delayPathPrimary = path.join(candidate, FREE_FIRE_CFG);
        const delayPathSecondary = path.join(candidate, FREE_FIRE_USER_CFG);
        
        let displayName = '';
        if (folderName === 'BlueStacks_msi2') {
          displayName = 'BlueStacks_msi2 (MSI 4)';
        } else if (folderName === 'BlueStacks_msi5') {
          displayName = 'BlueStacks_msi5 (MSI 5)';
        } else if (folderName === 'BlueStacks_nxt') {
          displayName = 'BlueStacks_nxt (BLUESTACKS 5)';
        }
        
        instances.push({
          basePath: candidate,
          folderName: folderName,
          displayName: displayName,
          configPath: configPath,
          delayPathPrimary: delayPathPrimary,
          delayPathSecondary: delayPathSecondary,
          hasConfig: fileExistsSync(configPath),
          hasDelayPrimary: fileExistsSync(delayPathPrimary),
          hasDelaySecondary: fileExistsSync(delayPathSecondary)
        });
      }
    }
  } catch (error) {
    console.error('[BlueStacks] Erro ao detectar instâncias:', error);
  }
  
  return instances;
}

function detectPaths() {
  try {
    // Primeiro verificar se há uma seleção salva
    const cached = store?.get('bluestacksBasePath');
    if (cached && fileExistsSync(path.join(cached, CONFIG_FILE))) {
      return {
        basePath: cached,
        configPath: path.join(cached, CONFIG_FILE),
        delayPathPrimary: path.join(cached, FREE_FIRE_CFG),
        delayPathSecondary: path.join(cached, FREE_FIRE_USER_CFG)
      };
    }
    
    // Se não houver cache ou cache inválido, buscar todas as instâncias
    const instances = detectAllBlueStacksInstances();
    if (instances.length === 0) {
      return null;
    }
    
    // Se houver apenas uma instância, usar ela
    if (instances.length === 1) {
      const instance = instances[0];
      if (store) {
        store.set('bluestacksBasePath', instance.basePath);
      }
      return {
        basePath: instance.basePath,
        configPath: instance.configPath,
        delayPathPrimary: instance.delayPathPrimary,
        delayPathSecondary: instance.delayPathSecondary
      };
    }
    
    // Se houver múltiplas instâncias, retornar null para que o renderer mostre o modal de seleção
    return null;
  } catch (error) {
    console.error('[BlueStacks] Erro ao detectar caminhos:', error);
  }

  return null;
}

async function detectBlueStacks() {
  // Sempre detectar todas as instâncias disponíveis
  const allInstances = detectAllBlueStacksInstances();
  
  if (allInstances.length === 0) {
    return { found: false, instances: [] };
  }
  
  // Se houver múltiplas instâncias, retornar todas para o renderer escolher
  if (allInstances.length > 1) {
    return { 
      found: true, 
      multiple: true, 
      instances: allInstances.map(inst => ({
        basePath: inst.basePath,
        folderName: inst.folderName,
        displayName: inst.displayName,
        hasConfig: inst.hasConfig,
        hasDelayPrimary: inst.hasDelayPrimary,
        hasDelaySecondary: inst.hasDelaySecondary
      }))
    };
  }
  
  // Se houver apenas uma instância, usar ela diretamente
  const paths = detectPaths();
  if (!paths) {
    return { found: false, instances: [] };
  }

  const { configPath, delayPathPrimary, delayPathSecondary, basePath } = paths;
  const status = {
    config: fileExistsSync(configPath),
    delayPrimary: fileExistsSync(delayPathPrimary),
    delaySecondary: fileExistsSync(delayPathSecondary)
  };

  const currentValues = {};
  try {
    if (status.config) {
      const content = await readFileSafe(configPath);
      currentValues.maxFps = extractQuotedValue(content, 'bst.instance.Pie64.max_fps');
      currentValues.dpi = extractQuotedValue(content, 'bst.instance.Pie64.dpi');
      currentValues.fbWidth = extractQuotedValue(content, 'bst.instance.Pie64.fb_width');
      currentValues.fbHeight = extractQuotedValue(content, 'bst.instance.Pie64.fb_height');
      currentValues.brand = extractQuotedValue(content, 'bst.instance.Pie64.device_custom_brand');
      currentValues.manufacturer = extractQuotedValue(content, 'bst.instance.Pie64.device_custom_manufacturer');
      currentValues.model = extractQuotedValue(content, 'bst.instance.Pie64.device_custom_model');
    }

    // Tentar ler ExclusiveDelay do arquivo primário, se não encontrar, tentar do secundário
    if (status.delayPrimary) {
      try {
        const delayContent = await readFileSafe(delayPathPrimary);
        const delayValue = extractJSONNumber(delayContent, '"ExclusiveDelay"');
        if (delayValue !== null) {
          currentValues.exclusiveDelay = delayValue;
        }
      } catch (error) {
        console.warn('[BlueStacks] Erro ao ler ExclusiveDelay do arquivo primário:', error);
      }
    }
    
    // Se não encontrou no primário, tentar no secundário
    if (currentValues.exclusiveDelay == null && status.delaySecondary) {
      try {
        const delayContentSecondary = await readFileSafe(delayPathSecondary);
        const delayValue = extractJSONNumber(delayContentSecondary, '"ExclusiveDelay"');
        if (delayValue !== null) {
          currentValues.exclusiveDelay = delayValue;
        }
      } catch (error) {
        console.warn('[BlueStacks] Erro ao ler ExclusiveDelay do arquivo secundário:', error);
      }
    }
    
    // Ler tweaks do arquivo UserFiles (arquivo correto)
    if (status.delaySecondary) {
      try {
        const userFilesContent = await readFileSafe(delayPathSecondary);
        // Procurar tweaks na seção Pan
        const tweaksMatch = userFilesContent.match(/"Type"\s*:\s*"Pan"[^}]*"Tweaks"\s*:\s*(-?\d+)/is);
        if (tweaksMatch) {
          currentValues.tweaks = parseInt(tweaksMatch[1], 10);
        }
      } catch (error) {
        console.warn('[BlueStacks] Erro ao ler tweaks do arquivo UserFiles:', error);
      }
    }
  } catch (error) {
    console.error('[BlueStacks] Erro ao coletar valores atuais', error);
  }

  return {
    found: true,
    basePath,
    files: {
      config: configPath,
      delayPrimary: delayPathPrimary,
      delaySecondary: delayPathSecondary
    },
    status,
    currentValues
  };
}

function extractQuotedValue(content, key) {
  const regex = new RegExp(`${escapeRegex(key)}="([^"]*)"`);
  const match = content.match(regex);
  return match ? match[1] : null;
}

function extractJSONNumber(content, key) {
  const regex = new RegExp(`${escapeRegex(key)}\\s*:\\s*(-?\\d+)`, 'i');
  const match = content.match(regex);
  return match ? parseInt(match[1], 10) : null;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function replaceQuotedValue(filePath, key, newValue, backupKey) {
  const content = await readFileSafe(filePath);
  const regex = new RegExp(`(${escapeRegex(key)}=")([^"]*)(")`);
  const match = content.match(regex);
  if (!match) {
    throw new Error(`Não foi possível localizar a chave ${key}.`);
  }
  const currentValue = match[2];
  if (backupKey) {
    appendBackup(backupKey, { filePath, key, value: currentValue, timestamp: Date.now() });
  }
  const updated = content.replace(regex, `$1${newValue}$3`);
  await writeFileSafe(filePath, updated);
  return currentValue;
}

async function replaceNumberValue(filePath, key, newValue, backupKey) {
  const content = await readFileSafe(filePath);
  const regex = new RegExp(`(${escapeRegex(key)}\\s*:\\s*)(-?\\d+)(\\s*,)`, 'i');
  const match = content.match(regex);
  if (!match) {
    throw new Error(`Não foi possível localizar a chave ${key}.`);
  }
  const currentValue = match[2];
  if (backupKey) {
    appendBackup(backupKey, { filePath, key, value: currentValue, timestamp: Date.now() });
  }
  const updated = content.replace(regex, `$1${newValue}$3`);
  await writeFileSafe(filePath, updated);
  return currentValue;
}

async function applyMaxFps(value) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  await replaceQuotedValue(paths.configPath, 'bst.instance.Pie64.max_fps', value, 'maxFps');
  return true;
}

async function revertMaxFps() {
  const entries = getBackupEntries('maxFps');
  if (!entries.length) throw new Error('Nenhum valor anterior salvo para FPS.');
  for (const entry of entries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  clearBackup('maxFps');
  return true;
}

async function applyExclusiveDelay(value) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  const targets = [];
  if (fileExistsSync(paths.delayPathPrimary)) targets.push(paths.delayPathPrimary);
  if (fileExistsSync(paths.delayPathSecondary)) targets.push(paths.delayPathSecondary);
  if (!targets.length) throw new Error('Arquivos de mapeamento não encontrados.');
  for (const file of targets) {
    await replaceNumberValue(file, '"ExclusiveDelay"', value, 'exclusiveDelay');
  }
  return true;
}

async function revertExclusiveDelay() {
  const entries = getBackupEntries('exclusiveDelay');
  if (!entries.length) throw new Error('Nenhum valor anterior salvo para delay.');
  for (const entry of entries) {
    await replaceNumberValue(entry.filePath, entry.key, entry.value);
  }
  clearBackup('exclusiveDelay');
  return true;
}

async function applyTweaks(value) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  
  // Usar especificamente o arquivo UserFiles/com.dts.freefireth.cfg
  const targetFile = paths.delayPathSecondary;
  if (!fileExistsSync(targetFile)) {
    throw new Error('Arquivo de mapeamento não encontrado: UserFiles/com.dts.freefireth.cfg');
  }
  
  // Ler o arquivo
  let content = await readFileSafe(targetFile);
  
  // Regex para encontrar todas as ocorrências de "Tweaks" : <número> (com ou sem vírgula)
  // Padrão: "Tweaks" : <número> seguido opcionalmente por vírgula
  const tweaksRegex = /("Tweaks"\s*:\s*)(-?\d+)(\s*,?)/g;
  const matches = [...content.matchAll(tweaksRegex)];
  
  if (matches.length === 0) {
    throw new Error('Não foi possível localizar nenhuma linha com "Tweaks" no arquivo.');
  }
  
  // Fazer backup do primeiro valor encontrado (ou todos se necessário)
  const firstMatch = matches[0];
  const oldValue = firstMatch[2];
  appendBackup('tweaks', { filePath: targetFile, key: '"Tweaks"', value: oldValue, timestamp: Date.now() });
  
  // Substituir todas as ocorrências de "Tweaks" : <número> pelo novo valor
  // Mantém a formatação: "Tweaks" : <novo_valor>,
  content = content.replace(tweaksRegex, `$1${value}$3`);
  
  await writeFileSafe(targetFile, content);
  return true;
}

async function revertTweaks() {
  const entries = getBackupEntries('tweaks');
  if (!entries.length) throw new Error('Nenhum valor anterior salvo para tweaks.');
  
  // Usar o primeiro entry para obter o arquivo e valor original
  const entry = entries[0];
  const content = await readFileSafe(entry.filePath);
  
  // Regex para encontrar todas as ocorrências de "Tweaks" : <número> (com ou sem vírgula)
  const tweaksRegex = /("Tweaks"\s*:\s*)(-?\d+)(\s*,?)/g;
  const matches = [...content.matchAll(tweaksRegex)];
  
  if (matches.length === 0) {
    throw new Error('Não foi possível localizar nenhuma linha com "Tweaks" no arquivo.');
  }
  
  // Substituir todas as ocorrências pelo valor original salvo no backup
  const updated = content.replace(tweaksRegex, `$1${entry.value}$3`);
  await writeFileSafe(entry.filePath, updated);
  
  clearBackup('tweaks');
  return true;
}

async function addDeviceProfileCode(filePath) {
  const content = await readFileSafe(filePath);
  const profileCodeKey = 'bst.instance.Pie64.device_profile_code';
  const profileCodeRegex = new RegExp(`${escapeRegex(profileCodeKey)}="[^"]*"`);
  
  // Verificar se a linha já existe
  if (profileCodeRegex.test(content)) {
    // Se já existe, atualizar para "custom"
    const updated = content.replace(profileCodeRegex, `${profileCodeKey}="custom"`);
    await writeFileSafe(filePath, updated);
  } else {
    // Se não existe, adicionar após a linha de device_custom_model
    const modelKey = 'bst.instance.Pie64.device_custom_model';
    // Procurar pela linha completa incluindo quebra de linha
    const modelRegex = new RegExp(`(${escapeRegex(modelKey)}="[^"]*")(\\r?\\n)`);
    const match = content.match(modelRegex);
    
    if (match) {
      // Adicionar a linha após device_custom_model na próxima linha
      const newLine = `${profileCodeKey}="custom"`;
      const updated = content.replace(modelRegex, `$1$2${newLine}$2`);
      await writeFileSafe(filePath, updated);
    } else {
      // Se não encontrar com quebra de linha, tentar sem
      const modelRegexNoNewline = new RegExp(`(${escapeRegex(modelKey)}="[^"]*")`);
      const matchNoNewline = content.match(modelRegexNoNewline);
      if (matchNoNewline) {
        const newLine = `\n${profileCodeKey}="custom"`;
        const updated = content.replace(modelRegexNoNewline, `$1${newLine}`);
        await writeFileSafe(filePath, updated);
      } else {
        // Se não encontrar device_custom_model, adicionar no final do arquivo
        const updated = content.trimEnd() + `\n${profileCodeKey}="custom"`;
        await writeFileSafe(filePath, updated);
      }
    }
  }
}

async function removeDeviceProfileCode(filePath) {
  const content = await readFileSafe(filePath);
  const profileCodeKey = 'bst.instance.Pie64.device_profile_code';
  // Remover a linha completa incluindo quebra de linha antes (se houver) e depois
  const profileCodeRegex = new RegExp(`\\r?\\n?\\s*${escapeRegex(profileCodeKey)}="[^"]*"\\r?\\n?`, 'g');
  
  // Remover a linha se existir
  const updated = content.replace(profileCodeRegex, '');
  await writeFileSafe(filePath, updated);
}

async function applyDevice({ brand, manufacturer, model }) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  const { configPath } = paths;
  await replaceQuotedValue(configPath, 'bst.instance.Pie64.device_custom_brand', brand, 'deviceBrand');
  await replaceQuotedValue(configPath, 'bst.instance.Pie64.device_custom_manufacturer', manufacturer, 'deviceManufacturer');
  await replaceQuotedValue(configPath, 'bst.instance.Pie64.device_custom_model', model, 'deviceModel');
  // Adicionar a linha device_profile_code="custom"
  await addDeviceProfileCode(configPath);
  return true;
}

async function revertDevice() {
  const brandEntries = getBackupEntries('deviceBrand');
  const manufacturerEntries = getBackupEntries('deviceManufacturer');
  const modelEntries = getBackupEntries('deviceModel');
  if (!brandEntries.length && !manufacturerEntries.length && !modelEntries.length) {
    throw new Error('Nenhum valor anterior salvo para dispositivo.');
  }
  
  // Obter o caminho do arquivo (usar o primeiro entry disponível)
  const filePath = brandEntries[0]?.filePath || manufacturerEntries[0]?.filePath || modelEntries[0]?.filePath;
  
  for (const entry of brandEntries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  for (const entry of manufacturerEntries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  for (const entry of modelEntries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  
  // Remover a linha device_profile_code="custom"
  if (filePath) {
    await removeDeviceProfileCode(filePath);
  }
  
  clearBackup('deviceBrand');
  clearBackup('deviceManufacturer');
  clearBackup('deviceModel');
  return true;
}

async function applyDpi(value) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  await replaceQuotedValue(paths.configPath, 'bst.instance.Pie64.dpi', value, 'dpi');
  return true;
}

async function revertDpi() {
  const entries = getBackupEntries('dpi');
  if (!entries.length) throw new Error('Nenhum valor anterior salvo para DPI.');
  for (const entry of entries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  clearBackup('dpi');
  return true;
}

async function applyResolution({ width, height }) {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  await replaceQuotedValue(paths.configPath, 'bst.instance.Pie64.fb_width', width, 'fbWidth');
  await replaceQuotedValue(paths.configPath, 'bst.instance.Pie64.fb_height', height, 'fbHeight');
  return true;
}

async function revertResolution() {
  const widthEntries = getBackupEntries('fbWidth');
  const heightEntries = getBackupEntries('fbHeight');
  if (!widthEntries.length && !heightEntries.length) throw new Error('Nenhum valor anterior salvo para resolução.');
  for (const entry of widthEntries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  for (const entry of heightEntries) {
    await replaceQuotedValue(entry.filePath, entry.key, entry.value);
  }
  clearBackup('fbWidth');
  clearBackup('fbHeight');
  return true;
}

// Função para definir o caminho base do BlueStacks (chamada após seleção do usuário)
function setBlueStacksBasePath(basePath) {
  if (store) {
    if (basePath === null || basePath === undefined) {
      // Se basePath for null/undefined, limpar o cache para forçar verificação completa
      store.delete('bluestacksBasePath');
    } else {
      store.set('bluestacksBasePath', basePath);
    }
  }
}

async function optimizeEmulator() {
  const paths = detectPaths();
  if (!paths) throw new Error('BlueStacks não encontrado.');
  const { configPath } = paths;
  
  const content = await readFileSafe(configPath);
  let updated = content;
  
  // Configurações de otimização
  const optimizations = [
    { key: 'bst.enable_discord_integration', value: '0' },
    { key: 'bst.create_desktop_shortcuts', value: '0' },
    { key: 'bst.enable_sigin_gamelaunch', value: '0' },
    { key: 'bst.instance.Pie64.android_sound_while_tapping', value: '0' },
    { key: 'bst.enable_gamepad_detection', value: '0' },
    { key: 'bst.enable_native_gamepad', value: '0' },
    { key: 'bst.enable_gamepad_vibration', value: '0' },
    { key: 'bst.enable_adb_access', value: '0' },
    { key: 'bst.enable_adb_remote_access', value: '0' },
    { key: 'bst.instance.Pie64.enable_logcat_redirection', value: '0' },
    { key: 'bst.instance.Pie64.enable_notifications', value: '0' },
    { key: 'bst.instance.Pie64.enable_fullscreen_all_apps', value: '0' },
    { key: 'bst.instance.Pie64.graphics_engine', value: 'aga' },
    { key: 'bst.instance.Pie64.graphics_renderer', value: 'gl' },
    { key: 'bst.instance.Pie64.astc_decoding_mode', value: 'software' },
    { key: 'bst.shortcut.airplane_mode', value: '' },
    { key: 'bst.shortcut.boss_key', value: '' },
    { key: 'bst.shortcut.decrease_volume', value: '' },
    { key: 'bst.shortcut.enable_disable_game_controls', value: '' },
    { key: 'bst.shortcut.go_back', value: '' },
    { key: 'bst.shortcut.go_home', value: '' },
    { key: 'bst.shortcut.increase_volume', value: '' },
    { key: 'bst.shortcut.install_apk', value: '' },
    { key: 'bst.shortcut.mute_unmute', value: '' },
    { key: 'bst.shortcut.open_controls_editor', value: '' },
    { key: 'bst.shortcut.open_location_provider', value: '' },
    { key: 'bst.shortcut.open_macro_recorder', value: '' },
    { key: 'bst.shortcut.open_media_folder', value: '' },
    { key: 'bst.shortcut.open_mim', value: '' },
    { key: 'bst.shortcut.open_recent_apps', value: '' },
    { key: 'bst.shortcut.open_settings', value: '' },
    { key: 'bst.shortcut.open_sync_operations', value: '' },
    { key: 'bst.shortcut.pause_play_macros', value: '' },
    { key: 'bst.shortcut.play_pause_sync_operations', value: '' },
    { key: 'bst.shortcut.record_screen', value: '' },
    { key: 'bst.shortcut.rotate', value: '' },
    { key: 'bst.shortcut.screen_translate', value: '' },
    { key: 'bst.shortcut.shake', value: '' },
    { key: 'bst.shortcut.show_hide_on_screen_controls', value: '' },
    { key: 'bst.shortcut.take_screenshot', value: '' },
    { key: 'bst.shortcut.toggle_eco_mode', value: '' },
    { key: 'bst.shortcut.toggle_mouse_cursor_lock', value: '' },
    { key: 'bst.shortcut.trim_memory', value: '' }
  ];
  
  // Aplicar cada otimização
  for (const opt of optimizations) {
    const regex = new RegExp(`(${escapeRegex(opt.key)}=")([^"]*)(")`);
    if (regex.test(updated)) {
      // Se a linha existe, substituir o valor
      updated = updated.replace(regex, `$1${opt.value}$3`);
    } else {
      // Se a linha não existe, adicionar no final do arquivo
      updated = updated.trimEnd() + `\n${opt.key}="${opt.value}"`;
    }
  }
  
  await writeFileSafe(configPath, updated);
  return true;
}

module.exports = {
  detectBlueStacks,
  detectAllBlueStacksInstances,
  setBlueStacksBasePath,
  applyMaxFps,
  revertMaxFps,
  applyExclusiveDelay,
  revertExclusiveDelay,
  applyTweaks,
  revertTweaks,
  applyDevice,
  revertDevice,
  applyDpi,
  revertDpi,
  applyResolution,
  revertResolution,
  optimizeEmulator
};


