const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Script para gerar hash de integridade do executável após o build
 * Este hash será usado para verificar se o executável foi modificado
 */

const mainJsPath = path.join(__dirname, '../src/main/main.js');
const exePath = process.argv[2]; // Caminho do executável gerado

if (!exePath) {
  console.log('Uso: node generate-integrity-hash.js <caminho-do-executavel>');
  console.log('Exemplo: node generate-integrity-hash.js release/win-unpacked/Y20Booster.exe');
  process.exit(1);
}

if (!fs.existsSync(exePath)) {
  console.error(`Erro: Executável não encontrado: ${exePath}`);
  process.exit(1);
}

try {
  // Ler executável e calcular hash
  const exeBuffer = fs.readFileSync(exePath);
  const hash = crypto.createHash('sha256').update(exeBuffer).digest('hex');
  
  console.log(`[Integrity] Hash SHA256 do executável: ${hash}`);
  
  // Ler main.js
  let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
  
  // Substituir o placeholder pelo hash real
  const placeholder = "const EXPECTED_HASH = 'Y20_BOOSTER_INTEGRITY_CHECK';";
  const newHashLine = `const EXPECTED_HASH = '${hash}';`;
  
  if (mainJsContent.includes(placeholder)) {
    mainJsContent = mainJsContent.replace(placeholder, newHashLine);
    fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
    console.log('[Integrity] ✅ Hash de integridade atualizado em main.js');
  } else if (mainJsContent.includes("const EXPECTED_HASH = '")) {
    // Se já tem um hash, substituir
    const hashRegex = /const EXPECTED_HASH = '[^']+';/;
    mainJsContent = mainJsContent.replace(hashRegex, newHashLine);
    fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
    console.log('[Integrity] ✅ Hash de integridade atualizado em main.js');
  } else {
    console.warn('[Integrity] ⚠️ Não foi possível encontrar o placeholder do hash em main.js');
  }
  
  // Salvar hash em arquivo separado também (backup)
  const hashFilePath = path.join(__dirname, '../build/integrity-hash.txt');
  fs.writeFileSync(hashFilePath, hash, 'utf8');
  console.log(`[Integrity] ✅ Hash salvo em: ${hashFilePath}`);
  
  console.log('[Integrity] ✅ Processo concluído!');
} catch (error) {
  console.error('[Integrity] ❌ Erro ao gerar hash:', error);
  process.exit(1);
}










