const fs = require('fs');
const path = require('path');

const releaseDir = path.join(__dirname, '../release');

console.log('🧹 Limpando pasta release...');

// Função para remover diretório recursivamente
function removeDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      removeDir(filePath);
    } else {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        // Ignorar erros de arquivos bloqueados
        console.warn(`⚠️  Não foi possível remover: ${filePath}`);
      }
    }
  });

  try {
    fs.rmdirSync(dirPath);
  } catch (error) {
    // Ignorar erros se o diretório não estiver vazio
  }
}

// Limpar pasta release
if (fs.existsSync(releaseDir)) {
  try {
    removeDir(releaseDir);
    console.log('✅ Pasta release limpa com sucesso!');
  } catch (error) {
    console.warn('⚠️  Alguns arquivos não puderam ser removidos (podem estar em uso):', error.message);
  }
} else {
  console.log('ℹ️  Pasta release não existe, criando...');
  fs.mkdirSync(releaseDir, { recursive: true });
  console.log('✅ Pasta release criada!');
}

console.log('📝 Pronto para build!\n');








