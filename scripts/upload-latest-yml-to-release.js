const fs = require('fs');
const path = require('path');
const https = require('https');

// Carregar variáveis de ambiente
require('dotenv').config();

// Configurações do GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'terresxy';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Y20-Booster';

// Versão da release (pode ser passada como argumento)
const VERSION = process.argv[2] || '1.0.7';
const TAG = `v${VERSION}`;

function log(message, color = 'white') {
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[color] || ''}${message}${colors.reset}`);
}

// Função para fazer requisições HTTP
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

// Obter release por tag
async function getReleaseByTag(tag) {
  log(`\n🔍 Buscando release ${tag}...\n`, 'blue');
  
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tags/${tag}`,
    method: 'GET',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const response = await makeRequest(options);
  
  if (response.status >= 200 && response.status < 300) {
    log(`✅ Release encontrada!`, 'green');
    return response.data;
  } else {
    log(`❌ Erro ao buscar release: ${response.status} - ${JSON.stringify(response.data)}`, 'red');
    return null;
  }
}

// Upload de arquivo
async function uploadAsset(releaseId, filePath) {
  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);
  const fileSize = fileContent.length;

  const options = {
    hostname: 'uploads.github.com',
    port: 443,
    path: `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/${releaseId}/assets?name=${encodeURIComponent(fileName)}`,
    method: 'POST',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileSize,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  log(`📤 Enviando: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)...`, 'cyan');

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            log(`✅ Arquivo anexado com sucesso!`, 'green');
            resolve({ status: res.statusCode, data: parsed });
          } else {
            log(`❌ Erro ao anexar arquivo: ${res.statusCode} - ${JSON.stringify(parsed)}`, 'red');
            resolve({ status: res.statusCode, data: parsed });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            log(`✅ Arquivo anexado com sucesso!`, 'green');
            resolve({ status: res.statusCode, data: body });
          } else {
            log(`❌ Erro ao anexar arquivo: ${res.statusCode} - ${body}`, 'red');
            resolve({ status: res.statusCode, data: body });
          }
        }
      });
    });

    req.on('error', reject);
    req.write(fileContent);
    req.end();
  });
}

// Função principal
async function main() {
  log('🚀 Y20 BOOSTER - Upload latest.yml para Release\n', 'blue');

  if (!GITHUB_TOKEN) {
    log('❌ Erro: GITHUB_TOKEN não configurado!', 'red');
    process.exit(1);
  }

  // Verificar se latest.yml existe
  const latestYmlPath = path.join(process.cwd(), 'release', 'latest.yml');
  if (!fs.existsSync(latestYmlPath)) {
    log(`❌ latest.yml não encontrado: ${latestYmlPath}`, 'red');
    log(`   Execute primeiro: npm run build`, 'yellow');
    process.exit(1);
  }

  try {
    // 1. Buscar release
    const release = await getReleaseByTag(TAG);
    
    if (!release) {
      log(`\n❌ Release ${TAG} não encontrada!`, 'red');
      process.exit(1);
    }

    // 2. Verificar se latest.yml já existe na release
    const existingAsset = release.assets?.find(asset => asset.name === 'latest.yml');
    if (existingAsset) {
      log(`\n⚠️  latest.yml já existe na release ${TAG}`, 'yellow');
      log(`   Asset ID: ${existingAsset.id}`, 'cyan');
      log(`   Deseja substituir? (S/N)`, 'yellow');
      // Por enquanto, vamos sempre substituir
      log(`   Substituindo automaticamente...`, 'cyan');
    }

    // 3. Upload latest.yml
    log(`\n📎 Fazendo upload do latest.yml...\n`, 'blue');
    const result = await uploadAsset(release.id, latestYmlPath);
    
    if (result.status >= 200 && result.status < 300) {
      log(`\n✅ latest.yml enviado com sucesso!`, 'green');
      log(`   URL: https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${TAG}/latest.yml`, 'cyan');
      log(`\n✅ O auto-updater agora deve funcionar corretamente!`, 'green');
    } else {
      log(`\n❌ Erro ao enviar latest.yml!`, 'red');
      process.exit(1);
    }

  } catch (error) {
    log(`\n❌ Erro: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Executar
if (require.main === module) {
  main();
}

module.exports = { uploadAsset, getReleaseByTag };








