const https = require('https');
const http = require('http');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

// Teste de ping
async function testPing() {
  try {
    const pingCmd = process.platform === 'win32' 
      ? 'ping -n 4 8.8.8.8' 
      : 'ping -c 4 8.8.8.8';
    
    const { stdout } = await execAsync(pingCmd, { timeout: 10000 });
    
    // Extrair tempo médio do ping
    const match = stdout.match(/Média = (\d+)ms/i) || stdout.match(/avg = ([\d.]+) ms/i);
    if (match) {
      return Math.round(parseFloat(match[1]));
    }
    
    return null;
  } catch (error) {
    console.warn('[Internet Speed] Erro ao testar ping:', error.message);
    return null;
  }
}

// Função para fazer requisição HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        ...options.headers
      },
      timeout: options.timeout || 30000
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({ data, statusCode: res.statusCode, headers: res.headers });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Teste de download usando Fast.com
async function testDownloadSpeed() {
  try {
    // Tentar obter configuração do Fast.com primeiro
    let downloadUrls = [];
    try {
      const configUrl = 'https://api.fast.com/netflix/speedtest/v2?https=true&token=YXNkZmFzZGxmbmNkc2ZsbGNkZnNsa2Rmc2xrZGZza2xm';
      const configResponse = await makeRequest(configUrl, { timeout: 10000 });
      const config = JSON.parse(configResponse.data);
      
      if (config.targets && Array.isArray(config.targets) && config.targets.length > 0) {
        downloadUrls = config.targets.map(t => t.url).filter(Boolean);
      }
    } catch (error) {
      console.warn('[Internet Speed] Erro ao obter config do Fast.com:', error.message);
    }

    // URLs padrão de teste (fallback)
    if (downloadUrls.length === 0) {
      downloadUrls = [
        'https://speed.cloudflare.com/__down?bytes=25000000',
        'https://speed.cloudflare.com/__down?bytes=50000000'
      ];
    }

    // Executar download de teste
    const testUrl = downloadUrls[0] || 'https://speed.cloudflare.com/__down?bytes=25000000';
    
    return new Promise((resolve) => {
      const startTime = Date.now();
      let downloadedBytes = 0;
      
      const parsedUrl = new URL(testUrl);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const req = client.get(testUrl, {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }, (res) => {
        res.on('data', (chunk) => {
          downloadedBytes += chunk.length;
        });
        
        res.on('end', () => {
          const endTime = Date.now();
          const durationSeconds = (endTime - startTime) / 1000;
          
          if (durationSeconds > 0 && downloadedBytes > 0) {
            const bitsPerSecond = (downloadedBytes * 8) / durationSeconds;
            const mbps = bitsPerSecond / (1000 * 1000); // Mbps
            console.log('[Internet Speed] Download:', mbps.toFixed(2), 'Mbps');
            resolve({ download: Math.round(mbps * 10) / 10 });
          } else {
            console.warn('[Internet Speed] Download: duração ou bytes inválidos');
            resolve({ download: null, error: 'Dados inválidos' });
          }
        });
      });

      req.on('error', (error) => {
        console.warn('[Internet Speed] Erro no download:', error.message);
        resolve({ download: null, error: error.message });
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[Internet Speed] Timeout no download');
        resolve({ download: null, error: 'Timeout' });
      });
    });
  } catch (error) {
    console.error('[Internet Speed] Erro no teste de download:', error);
    return { download: null, error: error.message };
  }
}

// Teste de upload usando Fast.com
async function testUploadSpeed() {
  try {
    // URL padrão para upload (Cloudflare)
    const uploadUrl = 'https://speed.cloudflare.com/__up';

    // Fazer upload de dados de teste (2MB para melhor precisão)
    const testDataSize = 2 * 1024 * 1024; // 2MB
    const testData = Buffer.alloc(testDataSize);
    
    return new Promise((resolve) => {
      const startTime = Date.now();
      const parsedUrl = new URL(uploadUrl);
      const client = parsedUrl.protocol === 'https:' ? https : http;
      
      const options = {
        hostname: parsedUrl.hostname,
        port: parsedUrl.port || 443,
        path: parsedUrl.pathname + parsedUrl.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Length': testDataSize,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 30000
      };

      const req = client.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', () => {
          const endTime = Date.now();
          const durationSeconds = (endTime - startTime) / 1000;
          
          if (durationSeconds > 0) {
            const bitsPerSecond = (testDataSize * 8) / durationSeconds;
            const mbps = bitsPerSecond / (1000 * 1000); // Mbps
            console.log('[Internet Speed] Upload:', mbps.toFixed(2), 'Mbps');
            resolve({ upload: Math.round(mbps * 10) / 10 });
          } else {
            console.warn('[Internet Speed] Upload: duração inválida');
            resolve({ upload: null, error: 'Duração inválida' });
          }
        });
      });

      req.on('error', (error) => {
        console.warn('[Internet Speed] Erro no teste de upload:', error.message);
        resolve({ upload: null, error: error.message });
      });

      req.on('timeout', () => {
        req.destroy();
        console.warn('[Internet Speed] Timeout no upload');
        resolve({ upload: null, error: 'Timeout' });
      });

      req.write(testData);
      req.end();
    });
  } catch (error) {
    console.error('[Internet Speed] Erro no teste de upload:', error);
    return { upload: null, error: error.message };
  }
}

// Função principal que executa todos os testes
async function runSpeedTest() {
  const results = {
    ping: null,
    download: null,
    upload: null,
    error: null,
    timestamp: Date.now()
  };
  
  try {
    console.log('[Internet Speed] Iniciando teste de velocidade...');
    
    // Testar ping primeiro (mais rápido)
    console.log('[Internet Speed] Testando ping...');
    results.ping = await testPing();
    
    // Testar download
    console.log('[Internet Speed] Testando download...');
    const downloadResult = await testDownloadSpeed();
    if (downloadResult.download !== null && downloadResult.download > 0) {
      results.download = downloadResult.download;
    } else {
      results.error = downloadResult.error || 'Erro no teste de download';
    }
    
    // Testar upload
    console.log('[Internet Speed] Testando upload...');
    const uploadResult = await testUploadSpeed();
    if (uploadResult.upload !== null && uploadResult.upload > 0) {
      results.upload = uploadResult.upload;
    } else {
      results.error = results.error || uploadResult.error || 'Erro no teste de upload';
    }
    
    console.log('[Internet Speed] Teste concluído:', results);
    return results;
  } catch (error) {
    console.error('[Internet Speed] Erro ao executar teste de velocidade:', error);
    results.error = error.message || 'Erro desconhecido';
    return results;
  }
}

module.exports = {
  runSpeedTest,
  testPing,
  testDownloadSpeed,
  testUploadSpeed
};
