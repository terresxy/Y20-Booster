const fs = require('fs');
const path = require('path');

// Caminho do package.json
const packageJsonPath = path.join(__dirname, '../package.json');
const uploadGithubPath = path.join(__dirname, 'upload-to-github.js');
const uploadGiteaPath = path.join(__dirname, 'upload-to-gitea.js');

// Ler package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

console.log(`📦 Versão atual: ${currentVersion}`);

// Incrementar versão (ex: 1.0.2 -> 1.0.3)
function incrementVersion(version) {
  const parts = version.split('.');
  
  // Incrementar patch version (último número)
  parts[2] = (parseInt(parts[2]) + 1).toString();
  
  return parts.join('.');
}

const newVersion = incrementVersion(currentVersion);
console.log(`🚀 Nova versão: ${newVersion}`);

// Atualizar package.json
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
console.log(`✅ package.json atualizado para versão ${newVersion}`);

// Atualizar upload-to-github.js
if (fs.existsSync(uploadGithubPath)) {
  let githubContent = fs.readFileSync(uploadGithubPath, 'utf8');
  githubContent = githubContent.replace(
    /const VERSION = ['"]\d+\.\d+\.\d+['"];?/,
    `const VERSION = '${newVersion}';`
  );
  fs.writeFileSync(uploadGithubPath, githubContent);
  console.log(`✅ upload-to-github.js atualizado para versão ${newVersion}`);
}

// Atualizar upload-to-gitea.js
if (fs.existsSync(uploadGiteaPath)) {
  let giteaContent = fs.readFileSync(uploadGiteaPath, 'utf8');
  giteaContent = giteaContent.replace(
    /const VERSION = ['"]\d+\.\d+\.\d+['"];?/,
    `const VERSION = '${newVersion}';`
  );
  fs.writeFileSync(uploadGiteaPath, giteaContent);
  console.log(`✅ upload-to-gitea.js atualizado para versão ${newVersion}`);
}

console.log(`\n✨ Versão incrementada de ${currentVersion} para ${newVersion}`);
console.log(`📝 Pronto para build!\n`);








