const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Script para gerar hash de integridade após o build
 * Executado no postbuild para gerar hash do executável final
 */

const releaseDir = path.join(__dirname, '../release');
const winUnpackedDir = path.join(releaseDir, 'win-unpacked');

// Procurar executável
function findExecutable(dir) {
  try {
    if (!fs.existsSync(dir)) {
      return null;
    }
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith('.exe') && !file.includes('setup') && !file.includes('installer') && !file.includes('uninstall')) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);
        // Verificar se é um arquivo executável (não um diretório)
        if (stats.isFile() && stats.size > 1000000) { // Pelo menos 1MB
          return fullPath;
        }
      }
    }
  } catch (error) {
    console.error('[Integrity] Erro ao procurar executável:', error);
  }
  return null;
}

const exePath = findExecutable(winUnpackedDir);

if (!exePath) {
  console.warn('[Integrity] ⚠️ Executável não encontrado em win-unpacked');
  console.warn('[Integrity] ⚠️ Hash será gerado na próxima execução do app');
  console.warn('[Integrity] ⚠️ Para gerar hash agora, execute o app uma vez após o build');
  process.exit(0);
}

try {
  console.log(`[Integrity] Calculando hash de: ${exePath}`);
  
  // Ler executável e calcular hash
  const exeBuffer = fs.readFileSync(exePath);
  const hash = crypto.createHash('sha256').update(exeBuffer).digest('hex');
  const fileSize = exeBuffer.length;
  const stats = fs.statSync(exePath);
  
  // Criar objeto de integridade
  const integrityData = {
    hash: hash,
    size: fileSize,
    modified: stats.mtime.toISOString(),
    version: require('../package.json').version,
    generated: new Date().toISOString()
  };
  
  // Salvar em arquivo JSON dentro do app (será incluído no build)
  const integrityJsonPath = path.join(__dirname, '../src/main/integrity.json');
  fs.writeFileSync(integrityJsonPath, JSON.stringify(integrityData, null, 2), 'utf8');
  
  console.log(`[Integrity] ✅ Hash SHA256 gerado: ${hash.substring(0, 16)}...`);
  console.log(`[Integrity] ✅ Tamanho do arquivo: ${(fileSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`[Integrity] ✅ Dados de integridade salvos em: ${integrityJsonPath}`);
  console.log(`[Integrity] ✅ Este arquivo será incluído no próximo build`);
  
} catch (error) {
  console.error('[Integrity] ❌ Erro ao gerar hash:', error);
  process.exit(1);
}

