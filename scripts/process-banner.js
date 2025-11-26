const path = require('path');
const fs = require('fs');
const Jimp = require('jimp');

function findInstallerLogo() {
  // 1) Procurar em Imagens/Logo do instalador (qualquer .png/.jpg)
  const dir = path.join(__dirname, '..', 'Imagens', 'Logo do instalador');
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    if (files.length) {
      return path.join(dir, files[0]);
    }
  }
  // 2) Fallback antigo: Imagens/logoinstalador.png
  const legacy = path.join(__dirname, '..', 'Imagens', 'logoinstalador.png');
  if (fs.existsSync(legacy)) return legacy;
  // 3) Fallback padrão do projeto
  return path.join(__dirname, '..', 'assets', 'installer', 'y20-banner.png');
}

async function composeBannerFromLogo(logoPath) {
  // Base 1152x768 com fundo escuro vibrante
  const width = 1152;
  const height = 768;
  const base = new Jimp.Jimp({ width, height, color: '#050510' });

  // Gradiente radial laranja/vermelho vibrante (efeito neon)
  const glow1 = new Jimp.Jimp({ width, height, color: 0x00000000 });
  const cx = width * 0.5;
  const cy = height * 0.5;
  const maxR = Math.sqrt(cx * cx + cy * cy);
  glow1.scan(0, 0, glow1.bitmap.width, glow1.bitmap.height, function (x, y, idx) {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.sqrt(dx * dx + dy * dy) / maxR;
    const alpha = Math.max(0, 1 - d) ** 1.5;
    // Gradiente laranja/vermelho vibrante
    const r = Math.min(255, 255 * (1 - d * 0.7));
    const g = Math.min(255, 180 * (1 - d * 0.8));
    const b = Math.min(255, 80 * (1 - d));
    this.bitmap.data[idx + 0] = Math.round(b);
    this.bitmap.data[idx + 1] = Math.round(g);
    this.bitmap.data[idx + 2] = Math.round(r);
    this.bitmap.data[idx + 3] = Math.round(alpha * 120);
  });
  base.composite(glow1, 0, 0);

  // Segundo gradiente roxo/azul para profundidade
  const glow2 = new Jimp.Jimp({ width, height, color: 0x00000000 });
  glow2.scan(0, 0, glow2.bitmap.width, glow2.bitmap.height, function (x, y, idx) {
    const dx = x - cx;
    const dy = y - cy;
    const d = Math.sqrt(dx * dx + dy * dy) / maxR;
    const alpha = Math.max(0, 1 - d) ** 2;
    // Gradiente roxo/azul
    this.bitmap.data[idx + 0] = 0xFF;
    this.bitmap.data[idx + 1] = 0x58;
    this.bitmap.data[idx + 2] = 0x70;
    this.bitmap.data[idx + 3] = Math.round(alpha * 60);
  });
  base.composite(glow2, 0, 0);

  // Gradiente linear de cima para baixo (escuro para laranja)
  const linearGrad = new Jimp.Jimp({ width, height, color: 0x00000000 });
  linearGrad.scan(0, 0, linearGrad.bitmap.width, linearGrad.bitmap.height, function (x, y, idx) {
    const ratio = y / height;
    const alpha = Math.max(0, (1 - ratio) * 0.4);
    // Laranja vibrante na parte inferior
    this.bitmap.data[idx + 0] = 0x00;
    this.bitmap.data[idx + 1] = Math.round(100 * (1 - ratio));
    this.bitmap.data[idx + 2] = Math.round(255 * (1 - ratio));
    this.bitmap.data[idx + 3] = Math.round(alpha * 255);
  });
  base.composite(linearGrad, 0, 0);

  // Carregar logo e redimensionar para PREENCHER ABSOLUTAMENTE TUDO
  const logo = await Jimp.Jimp.read(logoPath);
  // Usar 100% do espaço - cobrir COMPLETAMENTE toda a área
  const maxW = width; // 100% da largura (1152px)
  const maxH = height; // 100% da altura (768px)
  // Calcular escala para PREENCHER TODO o espaço sem margens
  const scale = Math.min(maxW / logo.bitmap.width, maxH / logo.bitmap.height);
  const logoW = Math.floor(logo.bitmap.width * scale);
  const logoH = Math.floor(logo.bitmap.height * scale);
  logo.resize({ w: logoW, h: logoH });

  // Esticar o logo para PREENCHER COMPLETAMENTE toda a área (1152x768)
  // Esticar para preencher 100% da largura e altura - SEM MARGENS
  logo.resize({ w: width, h: height });
  
  // Logo agora preenche completamente, posicionar no canto superior esquerdo
  const x = 0;
  const y = 0;
  
  // Criar sombra/brilho cobrindo toda a área
  const shadow = new Jimp.Jimp({ width: width, height: height, color: 0x00000000 });
  
  // Brilho neon suave nas bordas cobrindo toda a área
  for (let i = 0; i < 4; i++) {
    const pad = 30 - i * 7;
    const alpha = 0x15 + i * 0x0A;
    const glowColor = 0xFFD700;
    const layer = new Jimp.Jimp({ 
      width: width - pad * 2, 
      height: height - pad * 2, 
      color: (glowColor & 0xffffff) | (alpha << 24) 
    });
    shadow.composite(layer, pad, pad);
  }
  
  // Aplicar sombra/brilho e logo - logo cobre TUDO
  base.composite(shadow, 0, 0);
  base.composite(logo, x, y);

  return base;
}

async function generateInstallerAssets() {
  const logoPath = findInstallerLogo();
  const outputDir = path.join(__dirname, '..', 'build', 'assets', 'installer');
  fs.mkdirSync(outputDir, { recursive: true });

  let base;
  if (!fs.existsSync(logoPath)) {
    console.warn(`Logo do instalador não encontrado. Usando fallback.`);
    base = new Jimp.Jimp({ width: 1152, height: 768, color: '#0f0f1c' });
  } else {
    base = await composeBannerFromLogo(logoPath);
  }

  const targetWelcome = path.join(outputDir, 'welcome.bmp');
  const targetInstall = path.join(outputDir, 'install.bmp');

  // Welcome asset (500x280) - centralizado e proporcional
  const welcome = base.clone();
  welcome.cover({ w: 500, h: 280 });
  await welcome.write(targetWelcome);
  
  // Install asset (500x260) - centralizado e proporcional
  const install = base.clone();
  install.cover({ w: 500, h: 260 });
  await install.write(targetInstall);

  console.log('Assets de instalador gerados com sucesso a partir do logo:', logoPath);
}

generateInstallerAssets().catch((error) => {
  console.error('Erro ao gerar assets:', error.message || error);
  process.exit(1);
});

