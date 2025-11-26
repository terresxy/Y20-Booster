const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

async function generateIcon() {
  const source = path.join(__dirname, '..', 'Imagens', 'LogoPrograma.png');
  const destination = path.join(__dirname, '..', 'assets', 'icons', 'win', 'icon.ico');
  const size = 256;

  try {
    const image = await Jimp.Jimp.read(source);
    await image.resize({ w: size, h: size });

    const pixelCount = size * size;
    const maskRowSize = Math.ceil(size / 32) * 4;
    const maskSize = maskRowSize * size;
    const bmpSize = 40 + pixelCount * 4 + maskSize;
    const buffer = Buffer.alloc(6 + 16 + bmpSize);
    let offset = 0;

    buffer.writeUInt16LE(0, offset); offset += 2;
    buffer.writeUInt16LE(1, offset); offset += 2;
    buffer.writeUInt16LE(1, offset); offset += 2;

    buffer.writeUInt8(0, offset++);
    buffer.writeUInt8(0, offset++);
    buffer.writeUInt8(0, offset++);
    buffer.writeUInt8(0, offset++);
    buffer.writeUInt16LE(1, offset); offset += 2;
    buffer.writeUInt16LE(32, offset); offset += 2;
    buffer.writeUInt32LE(bmpSize, offset); offset += 4;
    buffer.writeUInt32LE(6 + 16, offset); offset += 4;

    buffer.writeUInt32LE(40, offset); offset += 4;
    buffer.writeInt32LE(size, offset); offset += 4;
    buffer.writeInt32LE(size * 2, offset); offset += 4;
    buffer.writeUInt16LE(1, offset); offset += 2;
    buffer.writeUInt16LE(32, offset); offset += 2;
    buffer.writeUInt32LE(0, offset); offset += 4;
    buffer.writeUInt32LE(pixelCount * 4, offset); offset += 4;
    buffer.writeInt32LE(0, offset); offset += 4;
    buffer.writeInt32LE(0, offset); offset += 4;
    buffer.writeUInt32LE(0, offset); offset += 4;
    buffer.writeUInt32LE(0, offset); offset += 4;

    const data = image.bitmap.data;
    for (let y = size - 1; y >= 0; y--) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        buffer.writeUInt8(b, offset++);
        buffer.writeUInt8(g, offset++);
        buffer.writeUInt8(r, offset++);
        buffer.writeUInt8(a, offset++);
      }
    }

    const maskOffset = offset;
    const mask = Buffer.alloc(maskSize, 0);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4;
        const alpha = data[idx + 3];
        if (alpha < 128) {
          const row = size - 1 - y;
          const byteIndex = row * maskRowSize + (x >> 3);
          const bit = 7 - (x & 7);
          mask[byteIndex] |= 1 << bit;
        }
      }
    }
    mask.copy(buffer, maskOffset);

    await fs.writeFile(destination, buffer);
    console.log('Ícone do instalador gerado a partir de LogoPrograma.png');
  } catch (error) {
    console.error('Falha ao gerar o ícone do instalador:', error);
    process.exit(1);
  }
}

generateIcon();

