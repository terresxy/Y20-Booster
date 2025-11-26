const https = require('https');
const { app } = require('electron');
const path = require('path');
const fs = require('fs');

// Configuração do repositório GitHub
// Pode ser configurado via variável de ambiente ou usar valores padrão
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'terresxy';
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || 'Y20-Booster';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/releases/latest`;

// Versão atual do app (lida do package.json)
const CURRENT_VERSION = app.isPackaged 
  ? require(path.join(process.resourcesPath, 'app', 'package.json')).version
  : require(path.join(__dirname, '../../package.json')).version;

console.log('[Update Checker] Versão atual:', CURRENT_VERSION);
console.log('[Update Checker] Repositório:', `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`);

/**
 * Compara duas versões no formato semver (ex: 1.0.0)
 * Retorna: 1 se v1 > v2, -1 se v1 < v2, 0 se v1 === v2
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  
  return 0;
}

/**
 * Faz requisição HTTPS para a API do GitHub
 */
function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const requestOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Y20-Booster-Updater',
        'Accept': 'application/vnd.github.v3+json',
        ...options.headers
      },
      timeout: 10000 // 10 segundos
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(new Error(`Erro ao parsear resposta JSON: ${error.message}`));
          }
        } else {
          reject(new Error(`Erro HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout na requisição'));
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

/**
 * Verifica se há atualização disponível no GitHub
 * @returns {Promise<{hasUpdate: boolean, latestVersion: string, downloadUrl: string, releaseNotes: string, error: string}>}
 */
async function checkForUpdates() {
  try {
    console.log('[Update Checker] Verificando atualizações...');
    console.log('[Update Checker] URL:', GITHUB_API_URL);
    
    const release = await httpsRequest(GITHUB_API_URL);
    
    if (!release || !release.tag_name) {
      console.warn('[Update Checker] Resposta inválida da API do GitHub');
      return {
        hasUpdate: false,
        latestVersion: CURRENT_VERSION,
        downloadUrl: null,
        releaseNotes: null,
        error: 'Resposta inválida da API'
      };
    }

    // Remover 'v' do início da tag se existir (ex: v1.0.0 -> 1.0.0)
    const latestVersion = release.tag_name.replace(/^v/, '');
    const comparison = compareVersions(latestVersion, CURRENT_VERSION);
    const hasUpdate = comparison > 0;

    console.log('[Update Checker] Versão atual do app:', CURRENT_VERSION);
    console.log('[Update Checker] Versão mais recente no GitHub:', latestVersion);
    console.log('[Update Checker] Comparação (1=maior, -1=menor, 0=igual):', comparison);
    console.log('[Update Checker] Há atualização?', hasUpdate);

    // Encontrar o arquivo de download (.exe para Windows)
    let downloadUrl = null;
    if (release.assets && release.assets.length > 0) {
      const exeAsset = release.assets.find(asset => 
        asset.name.endsWith('.exe') && 
        (asset.name.includes('setup') || asset.name.includes('installer'))
      );
      
      if (exeAsset) {
        downloadUrl = exeAsset.browser_download_url;
      } else if (release.assets.length > 0) {
        // Se não encontrar .exe, pegar o primeiro asset
        downloadUrl = release.assets[0].browser_download_url;
      }
    }

    // Se não houver assets, usar o zipball ou tarball
    if (!downloadUrl) {
      downloadUrl = release.zipball_url || release.tarball_url;
    }

    return {
      hasUpdate,
      latestVersion,
      currentVersion: CURRENT_VERSION,
      downloadUrl,
      releaseNotes: release.body || release.name || 'Sem notas de versão',
      releaseName: release.name || release.tag_name,
      publishedAt: release.published_at,
      error: null
    };
  } catch (error) {
    console.error('[Update Checker] Erro ao verificar atualizações:', error.message);
    return {
      hasUpdate: false,
      latestVersion: CURRENT_VERSION,
      downloadUrl: null,
      releaseNotes: null,
      error: error.message
    };
  }
}

/**
 * Verifica atualizações com retry automático
 */
async function checkForUpdatesWithRetry(maxRetries = 3, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await checkForUpdates();
      
      // Se não houver erro ou se o erro for de timeout/rede, tentar novamente
      if (!result.error || (i < maxRetries - 1 && (
        result.error.includes('timeout') || 
        result.error.includes('ECONNREFUSED') ||
        result.error.includes('ENOTFOUND')
      ))) {
        if (i > 0) {
          console.log(`[Update Checker] Sucesso após ${i + 1} tentativa(s)`);
        }
        return result;
      }
      
      // Se for outro tipo de erro, retornar imediatamente
      return result;
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(`[Update Checker] Tentativa ${i + 1} falhou, tentando novamente em ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('[Update Checker] Todas as tentativas falharam');
        return {
          hasUpdate: false,
          latestVersion: CURRENT_VERSION,
          downloadUrl: null,
          releaseNotes: null,
          error: error.message
        };
      }
    }
  }
}

module.exports = {
  checkForUpdates,
  checkForUpdatesWithRetry,
  CURRENT_VERSION,
  compareVersions
};

