const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente
require('dotenv').config();

// Caminho do latest.yml
const latestYmlPath = path.join(__dirname, '../release/latest.yml');
const packageJsonPath = path.join(__dirname, '../package.json');

if (!fs.existsSync(latestYmlPath)) {
  console.log('⚠️  latest.yml não encontrado');
  process.exit(0);
}

// Ler package.json para obter versão
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// Ler latest.yml
let latestYml = fs.readFileSync(latestYmlPath, 'utf8');

// O latest.yml gerado pelo electron-builder já tem URLs relativas, que é o formato correto
// O electron-updater resolve automaticamente as URLs relativas baseado no feed URL
// Não precisamos modificar o arquivo, apenas garantir que ele seja enviado

console.log(`✅ latest.yml verificado para versão ${version}`);
console.log(`   Arquivo pronto para upload: ${latestYmlPath}`);

