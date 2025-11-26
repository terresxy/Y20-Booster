// Sistema de Proteção Anti-Crack
// Este módulo implementa verificações de segurança para evitar uso não autorizado

const crypto = require('crypto');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const { app } = require('electron');

// Configurar timezone para Brasília/Brasil
process.env.TZ = 'America/Sao_Paulo';

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

// Configurações de segurança
const SECURITY_CONFIG = {
  // Intervalo de verificação de key (em ms) - verificar a cada 2 minutos
  KEY_CHECK_INTERVAL: 2 * 60 * 1000,
  // Tempo máximo offline permitido (em ms) - 1 minuto
  // Permite uso temporário offline por 1 minuto, depois bloqueia
  MAX_OFFLINE_TIME: 1 * 60 * 1000, // 1 minuto de tolerância offline
  // Verificar integridade a cada 5 minutos
  INTEGRITY_CHECK_INTERVAL: 5 * 60 * 1000,
  // Hash esperado do executável principal (será calculado na compilação)
  EXPECTED_EXE_HASH: null, // Será definido durante a build
};

// Estado de segurança
let securityState = {
  lastKeyCheck: Date.now(),
  lastOnlineCheck: Date.now(),
  lastIntegrityCheck: Date.now(),
  isOnline: true,
  keyValid: false,
  integrityValid: true,
  checkInterval: null,
  integrityInterval: null,
};

// Referência para store e funções de validação
let store = null;
let checkKeyStatus = null;
let API_URL = null;

/**
 * Inicializar sistema de segurança
 */
function initSecurity(storeInstance, checkKeyStatusFn, apiUrl) {
  store = storeInstance;
  checkKeyStatus = checkKeyStatusFn;
  API_URL = apiUrl;
  
  console.log('[Security] Sistema de segurança inicializado');
  
  // Iniciar verificações periódicas
  startSecurityChecks();
  
  // Verificar integridade periodicamente
  startIntegrityChecks();
}

/**
 * Verificar se a key é válida no servidor
 */
async function verifyKeyOnServer(key) {
  if (!key || !checkKeyStatus) {
    return { valid: false, reason: 'No key or check function' };
  }
  
  try {
    const result = await promiseWithTimeout(
      checkKeyStatus(key),
      3000,
      'Timeout'
    );
    
    if (result && result.success && result.data) {
      // Verificar se foi revogada ou expirou
      if (result.data.revoked) {
        return { valid: false, reason: 'revoked' };
      }
      if (result.data.expired) {
        return { valid: false, reason: 'expired' };
      }
      return { valid: true, data: result.data };
    }
    
    return { valid: false, reason: 'not_found' };
  } catch (error) {
    // Se timeout ou erro de conexão, permitir temporariamente mas marcar como offline
    // Se estava online antes, marcar o momento em que ficou offline
    if (securityState.isOnline) {
      securityState.lastOnlineCheck = Date.now();
      securityState.isOnline = false;
    }
    return { valid: false, reason: 'offline', allowTemporary: true };
  }
}

/**
 * Verificar acesso a funcionalidades VIP/Básico
 */
async function checkVIPAccess(requiredType = 'vip') {
  const storedKey = store ? store.get('accessKey') : null;
  
  if (!storedKey) {
    console.warn('[Security] Tentativa de acesso VIP/Básico sem key');
    return { allowed: false, reason: 'no_key' };
  }
  
  // Verificar no servidor (sempre, não usar cache)
  const verification = await verifyKeyOnServer(storedKey);
  
  if (!verification.valid) {
    // Se foi revogada ou expirou, bloquear imediatamente
    if (verification.reason === 'revoked' || verification.reason === 'expired' || verification.reason === 'not_found') {
      console.warn('[Security] Key inválida, bloqueando acesso VIP/Básico');
      // Limpar dados locais
      if (store) {
        store.delete('accessKey');
        store.delete('keyData');
        store.delete('keyValidatedAt');
      }
      return { allowed: false, reason: verification.reason };
    }
    
    // Se offline, verificar tempo offline
    if (verification.reason === 'offline') {
      // Se estava online antes, marcar o momento em que ficou offline
      if (securityState.isOnline) {
        securityState.lastOnlineCheck = Date.now();
        securityState.isOnline = false;
      }
      
      const timeOffline = Date.now() - securityState.lastOnlineCheck;
      if (timeOffline > SECURITY_CONFIG.MAX_OFFLINE_TIME) {
        console.warn('[Security] Muito tempo offline (mais de 1 minuto), bloqueando acesso VIP/Básico');
        return { allowed: false, reason: 'offline_too_long', message: 'Não foi possível conectar ao servidor por mais de 1 minuto. A conexão com a API é necessária para usar funcionalidades VIP/Básico.' };
      }
      // Permitir temporariamente se offline há menos de 1 minuto
      console.log(`[Security] API offline, mas permitindo uso temporário (${Math.round(timeOffline / 1000)}s offline)`);
      return { allowed: true, reason: 'offline_temporary', warning: true };
    }
  }
  
  // Verificar tipo de key
  const keyData = verification.data || (store ? store.get('keyData') : null);
  if (keyData) {
    const keyType = (keyData.type || keyData.keyType || '').toLowerCase();
    
    // Verificar se o tipo de key permite acesso
    if (requiredType === 'vip' && keyType !== 'vip') {
      console.warn('[Security] Tentativa de acesso VIP com key não-VIP');
      return { allowed: false, reason: 'wrong_key_type' };
    }
    
    if (requiredType === 'basic' && keyType !== 'basic' && keyType !== 'vip') {
      console.warn('[Security] Tentativa de acesso Básico com key inválida');
      return { allowed: false, reason: 'wrong_key_type' };
    }
  }
  
  // Atualizar estado
  securityState.lastKeyCheck = Date.now();
  securityState.lastOnlineCheck = Date.now();
  securityState.isOnline = true;
  securityState.keyValid = true;
  
  return { allowed: true, keyData };
}

/**
 * Verificar integridade do executável
 */
async function checkExecutableIntegrity() {
  try {
    // Obter caminho do executável
    const exePath = process.execPath;
    
    if (!exePath || !fs.existsSync(exePath)) {
      console.warn('[Security] Executável não encontrado');
      return { valid: false, reason: 'exe_not_found' };
    }
    
    // Calcular hash do executável
    const exeBuffer = await fsp.readFile(exePath);
    const hash = crypto.createHash('sha256').update(exeBuffer).digest('hex');
    
    // Se temos hash esperado, verificar
    if (SECURITY_CONFIG.EXPECTED_EXE_HASH) {
      if (hash !== SECURITY_CONFIG.EXPECTED_EXE_HASH) {
        console.error('[Security] Hash do executável não corresponde! Possível modificação.');
        securityState.integrityValid = false;
        return { valid: false, reason: 'hash_mismatch', hash };
      }
    }
    
    securityState.integrityValid = true;
    securityState.lastIntegrityCheck = Date.now();
    
    return { valid: true, hash };
  } catch (error) {
    console.error('[Security] Erro ao verificar integridade:', error);
    return { valid: false, reason: 'check_error', error: error.message };
  }
}

/**
 * Verificações periódicas de segurança
 */
function startSecurityChecks() {
  if (securityState.checkInterval) {
    clearInterval(securityState.checkInterval);
  }
  
  securityState.checkInterval = setInterval(async () => {
    try {
      const storedKey = store ? store.get('accessKey') : null;
      
      if (storedKey) {
        // Verificar key no servidor
        const verification = await verifyKeyOnServer(storedKey);
        
        if (!verification.valid) {
          // Se foi revogada, expirou ou não existe mais, limpar dados
          if (verification.reason === 'revoked' || verification.reason === 'expired' || verification.reason === 'not_found') {
            console.warn('[Security] Key inválida detectada, limpando dados...');
            if (store) {
              store.delete('accessKey');
              store.delete('keyData');
              store.delete('keyValidatedAt');
            }
            securityState.keyValid = false;
          } else if (verification.reason === 'offline') {
            // Se estava online antes, marcar o momento em que ficou offline
            if (securityState.isOnline) {
              securityState.lastOnlineCheck = Date.now();
              securityState.isOnline = false;
            }
            
            // Verificar tempo offline
            const timeOffline = Date.now() - securityState.lastOnlineCheck;
            if (timeOffline > SECURITY_CONFIG.MAX_OFFLINE_TIME) {
              console.warn('[Security] Muito tempo offline (mais de 1 minuto), bloqueando acesso');
              securityState.keyValid = false;
            } else {
              // Ainda dentro do tempo permitido, manter válido temporariamente
              console.log(`[Security] API offline, mas ainda dentro do tempo permitido (${Math.round(timeOffline / 1000)}s)`);
            }
          }
        } else {
          securityState.keyValid = true;
          securityState.isOnline = true;
          securityState.lastOnlineCheck = Date.now();
        }
      } else {
        securityState.keyValid = false;
      }
      
      securityState.lastKeyCheck = Date.now();
    } catch (error) {
      console.error('[Security] Erro na verificação periódica:', error);
    }
  }, SECURITY_CONFIG.KEY_CHECK_INTERVAL);
  
  console.log('[Security] Verificações periódicas iniciadas');
}

/**
 * Verificações periódicas de integridade
 */
function startIntegrityChecks() {
  if (securityState.integrityInterval) {
    clearInterval(securityState.integrityInterval);
  }
  
  securityState.integrityInterval = setInterval(async () => {
    try {
      await checkExecutableIntegrity();
    } catch (error) {
      console.error('[Security] Erro na verificação de integridade:', error);
    }
  }, SECURITY_CONFIG.INTEGRITY_CHECK_INTERVAL);
  
  console.log('[Security] Verificações de integridade iniciadas');
}

/**
 * Parar verificações de segurança
 */
function stopSecurityChecks() {
  if (securityState.checkInterval) {
    clearInterval(securityState.checkInterval);
    securityState.checkInterval = null;
  }
  
  if (securityState.integrityInterval) {
    clearInterval(securityState.integrityInterval);
    securityState.integrityInterval = null;
  }
  
  console.log('[Security] Verificações de segurança paradas');
}

/**
 * Verificar se pode executar otimização VIP/Básico
 */
async function canExecuteOptimization(type) {
  // Verificar integridade primeiro
  if (!securityState.integrityValid) {
    const integrityCheck = await checkExecutableIntegrity();
    if (!integrityCheck.valid) {
      console.error('[Security] Integridade inválida, bloqueando execução');
      return { allowed: false, reason: 'integrity_invalid' };
    }
  }
  
  // Verificar acesso VIP/Básico
  const accessCheck = await checkVIPAccess(type);
  
  if (!accessCheck.allowed) {
    console.warn(`[Security] Acesso negado para otimização ${type}:`, accessCheck.reason);
    return accessCheck;
  }
  
  return { allowed: true };
}

/**
 * Obter estado de segurança
 */
function getSecurityState() {
  return {
    ...securityState,
    config: {
      keyCheckInterval: SECURITY_CONFIG.KEY_CHECK_INTERVAL,
      maxOfflineTime: SECURITY_CONFIG.MAX_OFFLINE_TIME,
      integrityCheckInterval: SECURITY_CONFIG.INTEGRITY_CHECK_INTERVAL
    }
  };
}

module.exports = {
  initSecurity,
  checkVIPAccess,
  checkExecutableIntegrity,
  canExecuteOptimization,
  getSecurityState,
  stopSecurityChecks,
  verifyKeyOnServer
};

