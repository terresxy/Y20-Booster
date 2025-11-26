const fs = require('fs');
const path = require('path');
const https = require('https');
const archiver = require('archiver');

// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Configurações do GitHub
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'terresxy';
const GITHUB_REPO = process.env.GITHUB_REPO || 'Y20-Booster';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_PRIVATE_OWNER = process.env.GITHUB_PRIVATE_OWNER || GITHUB_OWNER;
const GITHUB_PRIVATE_REPO = process.env.GITHUB_PRIVATE_REPO || '';
const GITHUB_PRIVATE_TOKEN = process.env.GITHUB_PRIVATE_TOKEN || GITHUB_TOKEN;

// Versão
const VERSION = '1.0.84';
const TAG = `v${VERSION}`;
const PRIVATE_ARCHIVE_NAME = process.env.GITHUB_PRIVATE_ARCHIVE_NAME || `Y20Booster-${VERSION}-source.zip`;
const PRIVATE_EXTRA_IGNORE = (process.env.GITHUB_PRIVATE_EXTRA_IGNORE || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const SHOULD_UPLOAD_PRIVATE_CODE = process.env.UPLOAD_PRIVATE_CODE === 'false'
  ? false
  : Boolean(GITHUB_PRIVATE_REPO && GITHUB_PRIVATE_TOKEN);

// Cores para console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Função para fazer requisições HTTPS
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

// Criar commit inicial (se repositório estiver vazio)
async function createInitialCommit(repoConfig) {
  const { owner, repo, token } = repoConfig;
  log(`\n📝 Verificando repositório ${owner}/${repo}...\n`, 'blue');
  
  const checkOptions = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}`,
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  try {
    const repoInfo = await makeRequest(checkOptions);
    if (repoInfo.data.size === 0 || !repoInfo.data.default_branch) {
      log('📄 Criando commit inicial...', 'yellow');
      
      const content = Buffer.from('# Y20 BOOSTER\n\nPainel de otimização Y20 BOOSTER com Electron e Node.js.').toString('base64');
      const createFileOptions = {
        hostname: 'api.github.com',
        port: 443,
        path: `/repos/${owner}/${repo}/contents/README.md`,
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Y20-Booster-Uploader',
          'Accept': 'application/vnd.github.v3+json'
        }
      };

      const filePayload = JSON.stringify({
        message: 'Initial commit - Y20 BOOSTER',
        content,
        branch: 'main'
      });

      const fileResponse = await makeRequest(createFileOptions, filePayload);
      if (fileResponse.status >= 200 && fileResponse.status < 300) {
        log('✅ Commit inicial criado!', 'green');
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
      } else {
        const payloadMaster = JSON.stringify({
          message: 'Initial commit - Y20 BOOSTER',
          content,
          branch: 'master'
        });
        const fileResponse2 = await makeRequest(createFileOptions, payloadMaster);
        if (fileResponse2.status >= 200 && fileResponse2.status < 300) {
          log('✅ Commit inicial criado!', 'green');
          await new Promise(resolve => setTimeout(resolve, 2000));
          return true;
        }
      }
    }
  } catch (error) {
    // Ignorar erros e continuar
  }
  
  return false;
}

async function getReleaseByTag(repoConfig, tagName) {
  const { owner, repo, token } = repoConfig;
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}/releases/tags/${encodeURIComponent(tagName)}`,
    method: 'GET',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const response = await makeRequest(options);
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return null;
}

// Criar release
async function createRelease(repoConfig, releaseOptions) {
  const {
    tagName,
    name,
    body,
    draft = false,
    prerelease = false,
    reuseIfExists = false
  } = releaseOptions;
  const { owner, repo, token } = repoConfig;

  log(`\n📦 Criando release ${tagName} em ${owner}/${repo}...\n`, 'blue');

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}/releases`,
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const payload = JSON.stringify({
    tag_name: tagName,
    name,
    body,
    draft,
    prerelease
  });

  const response = await makeRequest(options, payload);

  if (response.status >= 200 && response.status < 300) {
    log(`✅ Release ${tagName} criada com sucesso em ${owner}/${repo}!`, 'green');
    log(`🔗 URL: https://github.com/${owner}/${repo}/releases/tag/${tagName}`, 'cyan');
    return response.data;
  } else if (response.status === 422 && reuseIfExists) {
    log(`⚠️ Release ${tagName} já existe em ${owner}/${repo}. Reutilizando...`, 'yellow');
    return await getReleaseByTag(repoConfig, tagName);
  } else {
    log(`❌ Erro ao criar release em ${owner}/${repo}: ${response.status} - ${JSON.stringify(response.data)}`, 'red');
    return null;
  }
}

// Deletar asset de release
async function deleteAsset(repoConfig, assetId, assetName = 'arquivo') {
  const { owner, repo, token } = repoConfig;
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}/releases/assets/${assetId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  const response = await makeRequest(options);
  if (response.status === 204) {
    log(`✅ ${assetName} deletado com sucesso!`, 'green');
    return true;
  } else {
    log(`⚠️ Erro ao deletar ${assetName}: ${response.status}`, 'yellow');
    return false;
  }
}

// Upload de arquivo para release
async function uploadAsset(repoConfig, releaseId, filePath, label = 'arquivo') {
  const { owner, repo, token } = repoConfig;
  log(`\n📎 Fazendo upload de ${label} para ${owner}/${repo}...\n`, 'blue');

  const fileName = path.basename(filePath);
  const fileContent = fs.readFileSync(filePath);
  const fileSize = fileContent.length;

  const options = {
    hostname: 'uploads.github.com',
    port: 443,
    path: `/repos/${owner}/${repo}/releases/${releaseId}/assets?name=${encodeURIComponent(fileName)}`,
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileSize,
      'User-Agent': 'Y20-Booster-Uploader',
      'Accept': 'application/vnd.github.v3+json'
    }
  };

  log(`📤 Enviando (${label}): ${fileName} (${(fileSize / 1024 / 1024).toFixed(2)} MB)...`, 'cyan');
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            log(`✅ ${label} anexado com sucesso!`, 'green');
            resolve({ status: res.statusCode, data: parsed });
          } else {
            log(`❌ Erro ao anexar ${label}: ${res.statusCode} - ${JSON.stringify(parsed)}`, 'red');
            resolve({ status: res.statusCode, data: parsed });
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            log(`✅ ${label} anexado com sucesso!`, 'green');
            resolve({ status: res.statusCode, data: body });
          } else {
            log(`❌ Erro ao anexar ${label}: ${res.statusCode} - ${body}`, 'red');
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

function getDefaultPrivateIgnorePatterns() {
  return [
    'release/**',
    '**/node_modules/**',
    '.git/**',
    '.github/**',
    '.vscode/**',
    '*.log',
    '*.tmp',
    '*.lock',
    'npm-debug.log*',
    'logs/**',
    'y20booster-electron@1.0.0/**'
  ];
}

async function createSourceArchive(destinationPath, extraIgnore = []) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    if (fs.existsSync(destinationPath)) {
      fs.unlinkSync(destinationPath);
    }

    const output = fs.createWriteStream(destinationPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    const ignorePatterns = Array.from(new Set([
      ...getDefaultPrivateIgnorePatterns(),
      ...extraIgnore
    ]));

    output.on('close', () => {
      const sizeMb = (archive.pointer() / 1024 / 1024).toFixed(2);
      log(`✅ Arquivo do código completo gerado (${sizeMb} MB): ${destinationPath}`, 'green');
      resolve(destinationPath);
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        log(`⚠️ Aviso ao criar pacote privado: ${err.message}`, 'yellow');
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => reject(err));

    archive.pipe(output);
    archive.glob('**/*', {
      cwd: process.cwd(),
      dot: false,
      nodir: false,
      ignore: ignorePatterns
    });
    archive.finalize();
  });
}

async function uploadPrivateSourceCode(repoConfig) {
  if (!repoConfig) {
    log('\nℹ️ Upload privado do código completo não está configurado.\n', 'yellow');
    return;
  }

  const archivePath = path.join(process.cwd(), 'release', PRIVATE_ARCHIVE_NAME);
  try {
    log('\n🔐 Preparando pacote completo do código para repositório privado...\n', 'blue');
    await createSourceArchive(archivePath, PRIVATE_EXTRA_IGNORE);

    const privateReleaseNotes = `### Backup privado\n- Código completo da versão ${VERSION}\n- Gerado em ${new Date().toLocaleString('pt-BR')}`;

    const privateRelease = await createRelease(repoConfig, {
      tagName: TAG,
      name: `Código fonte v${VERSION}`,
      body: privateReleaseNotes,
      draft: false,
      prerelease: false,
      reuseIfExists: true
    });

    if (!privateRelease) {
      log('❌ Não foi possível criar ou reutilizar a release privada para o código completo.', 'red');
      return;
    }

    await uploadAsset(repoConfig, privateRelease.id, archivePath, 'código completo');
  } catch (error) {
    log(`❌ Erro ao preparar/enviar o código privado: ${error.message}`, 'red');
    console.error(error);
  }
}

// Função principal
async function main() {
  log('🚀 Y20 BOOSTER - Upload para GitHub\n', 'blue');

  if (!GITHUB_TOKEN) {
    log('❌ Erro: GITHUB_TOKEN não configurado!', 'red');
    log('\n📝 Para obter o token:', 'yellow');
    log('1. Acesse: https://github.com/settings/tokens', 'cyan');
    log('2. Clique em "Generate new token" → "Generate new token (classic)"', 'cyan');
    log('3. Dê um nome (ex: "Y20-Booster-Upload")', 'cyan');
    log('4. Marque as permissões: repo (Full control of private repositories)', 'cyan');
    log('5. Clique em "Generate token"', 'cyan');
    log('6. Copie o token gerado', 'cyan');
    log('\n💡 Configure no arquivo .env:', 'yellow');
    log('   GITHUB_TOKEN=seu_token_aqui', 'cyan');
    log('   GITHUB_OWNER=seu_usuario', 'cyan');
    log('   GITHUB_REPO=Y20-Booster', 'cyan');
    log('\n   Depois execute: npm run upload-github', 'cyan');
    process.exit(1);
  }

  if (!GITHUB_OWNER) {
    log('❌ Erro: GITHUB_OWNER não configurado!', 'red');
    log('\n💡 Configure no arquivo .env:', 'yellow');
    log('   GITHUB_OWNER=seu_usuario', 'cyan');
    process.exit(1);
  }

  try {
    const publicRepoConfig = {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      token: GITHUB_TOKEN
    };

    let privateRepoConfig = null;
    if (SHOULD_UPLOAD_PRIVATE_CODE) {
      if (!GITHUB_PRIVATE_REPO) {
        log('⚠️ Upload privado habilitado, mas GITHUB_PRIVATE_REPO não foi informado.', 'yellow');
      } else if (!GITHUB_PRIVATE_TOKEN) {
        log('⚠️ Upload privado habilitado, mas GITHUB_PRIVATE_TOKEN não foi informado.', 'yellow');
      } else {
        privateRepoConfig = {
          owner: GITHUB_PRIVATE_OWNER,
          repo: GITHUB_PRIVATE_REPO,
          token: GITHUB_PRIVATE_TOKEN
        };
      }
    }

    const releaseNotes = `## Y20 BOOSTER v${VERSION}

### ✨ Novidades
- Instalador customizado estilo Lunar Client
- Interface moderna com tema escuro
- Seleção de idioma (Português, English, Español)

### 🔧 Melhorias
- Caminho de instalação fixo e otimizado
- Interface de instalação aprimorada
- Validação de termos de uso

### 🐛 Correções
- Correção de bugs no instalador
- Melhorias de estabilidade

### 📥 Instalação
1. Baixe o arquivo \`Y20Booster-${VERSION}-setup.exe\`
2. Execute o instalador como Administrador
3. Siga as instruções na tela
4. O Y20 BOOSTER será instalado em: \`C:\\Users\\[SeuUsuário]\\AppData\\Local\\Programs\\Y20 BOOSTER\`

### ⚠️ Requisitos
- Windows 10 ou superior
- Permissões de Administrador
- Conexão com a internet (para atualizações)`;

    await createInitialCommit(publicRepoConfig);
    
    const release = await createRelease(publicRepoConfig, {
      tagName: TAG,
      name: `Y20 BOOSTER v${VERSION}`,
      body: releaseNotes,
      draft: false,
      prerelease: false,
      reuseIfExists: true
    });
    
    if (!release) {
      log('\n❌ Falha ao criar release', 'red');
      process.exit(1);
    }

    const installerPath = path.join(process.cwd(), 'release', `Y20Booster-${VERSION}-setup.exe`);
    const latestYmlPath = path.join(process.cwd(), 'release', 'latest.yml');
    const blockmapPath = path.join(process.cwd(), 'release', `Y20Booster-${VERSION}-setup.exe.blockmap`);
    
    if (fs.existsSync(installerPath)) {
      await uploadAsset(publicRepoConfig, release.id, installerPath, 'instalador');
    } else {
      log(`\n⚠️  Arquivo instalador não encontrado: ${installerPath}`, 'yellow');
      log('   Você pode anexar manualmente na interface do GitHub', 'yellow');
    }
    
    if (fs.existsSync(latestYmlPath)) {
      log(`\n📎 Fazendo upload do latest.yml (OBRIGATÓRIO para auto-updater)...\n`, 'blue');
      
      // Verificar se latest.yml já existe e deletar antes de enviar o novo
      const existingLatestYml = release.assets?.find(asset => asset.name === 'latest.yml');
      if (existingLatestYml) {
        log(`⚠️ latest.yml já existe, deletando versão antiga...`, 'yellow');
        await deleteAsset(publicRepoConfig, existingLatestYml.id, 'latest.yml');
        // Aguardar um pouco para garantir que a deleção foi processada
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      const latestYmlResult = await uploadAsset(publicRepoConfig, release.id, latestYmlPath, 'latest.yml');
      if (latestYmlResult.status >= 200 && latestYmlResult.status < 300) {
        log(`✅ latest.yml enviado com sucesso!`, 'green');
        log(`   URL: https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/download/${TAG}/latest.yml`, 'cyan');
      } else {
        log(`❌ ERRO CRÍTICO: Falha ao enviar latest.yml!`, 'red');
        log(`   O auto-updater NÃO funcionará sem este arquivo!`, 'red');
      }
    } else {
      log(`\n❌ ERRO CRÍTICO: latest.yml não encontrado: ${latestYmlPath}`, 'red');
      log(`   O auto-updater NÃO funcionará sem este arquivo!`, 'red');
      log(`   Verifique se o electron-builder gerou o arquivo corretamente.`, 'yellow');
    }
    
    if (fs.existsSync(blockmapPath)) {
      log(`\n📎 Fazendo upload do blockmap...\n`, 'blue');
      await uploadAsset(publicRepoConfig, release.id, blockmapPath, 'blockmap');
    }

    log('\n✅ Upload público concluído!', 'green');
    log(`🔗 Release: https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tag/${TAG}`, 'cyan');

    if (privateRepoConfig) {
      await uploadPrivateSourceCode(privateRepoConfig);
    } else if (SHOULD_UPLOAD_PRIVATE_CODE) {
      log('\n⚠️ Upload privado foi solicitado, mas faltam variáveis de ambiente. Configure GITHUB_PRIVATE_REPO e GITHUB_PRIVATE_TOKEN.\n', 'yellow');
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

module.exports = { createRelease, uploadAsset };

