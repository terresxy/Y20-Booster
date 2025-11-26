const si = require('systeminformation');
const os = require('os');
const { execSync } = require('child_process');

const GIB = 1024 ** 3;

function toGiB(value) {
  if (!value) {
    return 0;
  }
  return Math.round(value / GIB);
}

// Suprimir stderr do process para evitar mensagens de erro do systeminformation
const originalStderr = process.stderr.write;
let stderrSuppressed = false;

function suppressStderr() {
  if (!stderrSuppressed) {
    stderrSuppressed = true;
    process.stderr.write = function(chunk, encoding, fd) {
      // Suprimir mensagens específicas do Windows sobre caminhos não encontrados
      if (chunk && typeof chunk === 'string') {
        if (chunk.includes('O sistema não pode encontrar o caminho especificado') ||
            chunk.includes('não pode encontrar o caminho') ||
            chunk.includes('cannot find the path')) {
          return true; // Suprimir o erro
        }
      }
      // Permitir outros erros importantes
      return originalStderr.call(process.stderr, chunk, encoding, fd);
    };
  }
}

function restoreStderr() {
  if (stderrSuppressed) {
    stderrSuppressed = false;
    process.stderr.write = originalStderr;
  }
}

async function getSystemSnapshot() {
  let cpu, cpuCurrentLoad, mem, osInfo, processes, diskLayout, fsSize, graphics, gpuStats;
  
  // Suprimir stderr temporariamente durante a coleta
  suppressStderr();
  
  try {
    // Log reduzido para evitar spam
    // console.log('[SystemInfo] Iniciando coleta de dados do sistema...');
    // Executar todas as chamadas com tratamento de erro individual
    // Adicionar si.gpuStats() para obter uso da GPU em tempo real
    // Usar timeout mais longo para dar tempo de coletar dados
    const results = await Promise.allSettled([
      si.cpu().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter CPU:', e.message);
        return { manufacturer: 'N/D', brand: 'N/D', cores: 0, physicalCores: 0, logicalProcessors: 0 };
      }),
      si.currentLoad().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter currentLoad:', e.message);
        return { currentLoad: 0, gpus: [] };
      }),
      si.mem().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter memória:', e.message);
        return { total: 0, available: 0 };
      }),
      si.osInfo().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter osInfo:', e.message);
        return { distro: 'N/D', hostname: 'N/D', arch: 'N/D', build: 'N/D' };
      }),
      si.processes().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter processos:', e.message);
        return { running: 0, blocked: 0, sleeping: 0, all: 0 };
      }),
      si.diskLayout().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter diskLayout:', e.message);
        return [];
      }),
      si.fsSize().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter fsSize:', e.message);
        return [];
      }),
      si.graphics().catch((e) => {
        console.warn('[SystemInfo] Erro ao obter graphics:', e.message);
        return { controllers: [] };
      })
      // gpuStats removido - função não existe na versão atual do systeminformation
      // e estava causando erros repetidos
    ]);
    
    // Log reduzido para evitar spam
    // console.log('[SystemInfo] Resultados obtidos, processando...');
    
    cpu = results[0].status === 'fulfilled' ? results[0].value : { manufacturer: 'N/D', brand: 'N/D', cores: 0, physicalCores: 0, logicalProcessors: 0 };
    cpuCurrentLoad = results[1].status === 'fulfilled' ? results[1].value : { currentLoad: 0, gpus: [] };
    mem = results[2].status === 'fulfilled' ? results[2].value : { total: 0, available: 0 };
    osInfo = results[3].status === 'fulfilled' ? results[3].value : { distro: 'N/D', hostname: 'N/D', arch: 'N/D', build: 'N/D' };
    processes = results[4].status === 'fulfilled' ? results[4].value : { running: 0, blocked: 0, sleeping: 0, all: 0 };
    diskLayout = results[5].status === 'fulfilled' ? results[5].value : [];
    fsSize = results[6].status === 'fulfilled' ? results[6].value : [];
    graphics = results[7].status === 'fulfilled' ? results[7].value : { controllers: [] };
    gpuStats = { controllers: [] }; // gpuStats removido, usar valor vazio
  } catch (error) {
    // Se tudo falhar, usar valores padrão
    console.error('[SystemInfo] Erro ao coletar informações do sistema:', error);
    cpu = { manufacturer: 'N/D', brand: 'N/D', cores: 0, physicalCores: 0, logicalProcessors: 0 };
    cpuCurrentLoad = { currentLoad: 0, gpus: [] };
    mem = { total: 0, available: 0 };
    osInfo = { distro: 'N/D', hostname: 'N/D', arch: 'N/D', build: 'N/D' };
    processes = { running: 0, blocked: 0, sleeping: 0, all: 0 };
    diskLayout = [];
    fsSize = [];
    graphics = { controllers: [] };
    gpuStats = { controllers: [] };
  } finally {
    // Restaurar stderr após a coleta
    restoreStderr();
  }

  const gpuControllers = graphics.controllers || [];
  const gpuStatsControllers = gpuStats.controllers || [];
  
  // Tentar obter uso da GPU em tempo real do gpuStats primeiro (mais confiável)
  let gpuLoad = 0;
  const gpuStatsEntry = gpuStatsControllers.find((controller) => 
    typeof controller.utilizationGpu === 'number' && !Number.isNaN(controller.utilizationGpu) && controller.utilizationGpu > 0
  );
  
  // Variável para armazenar referência da GPU selecionada
  let selectedGpu = null;
  
  if (gpuStatsEntry && typeof gpuStatsEntry.utilizationGpu === 'number') {
    gpuLoad = Math.round(gpuStatsEntry.utilizationGpu);
    selectedGpu = gpuStatsEntry;
  } else {
    // Fallback: usar graphics.controllers
    selectedGpu =
      gpuControllers.find((controller) => typeof controller.utilizationGpu === 'number' && !Number.isNaN(controller.utilizationGpu)) ||
      gpuControllers[0] ||
      null;
    
    if (selectedGpu && typeof selectedGpu.utilizationGpu === 'number') {
      gpuLoad = Math.round(selectedGpu.utilizationGpu);
    } else {
      const gpuLoadEntry = Array.isArray(cpuCurrentLoad.gpus)
        ? cpuCurrentLoad.gpus.find((entry) => typeof entry.load === 'number' && !Number.isNaN(entry.load))
        : null;
      const gpuLoadFallback =
        typeof cpuCurrentLoad.currentLoadGpu === 'number' && !Number.isNaN(cpuCurrentLoad.currentLoadGpu)
          ? cpuCurrentLoad.currentLoadGpu
          : gpuLoadEntry?.load;
      gpuLoad = typeof gpuLoadFallback === 'number' ? Math.round(gpuLoadFallback) : 0;
    }
  }
  
  // Tentar fallback leve via PowerShell para utilização de GPU (tempo curto)
  if (gpuLoad === 0 && process.platform === 'win32') {
    try {
      const psCmd = `powershell -NoProfile -Command "(Get-Counter '\\\\GPU Engine(*_engtype_3D)\\\\Utilization Percentage' -ErrorAction SilentlyContinue | Select -Expand CounterSamples | Measure -Property CookedValue -Average).Average"`;
      const output = execSync(psCmd, { timeout: 1200, encoding: 'utf8' });
      const gpuUsagePs = parseFloat((output || '').toString().trim());
      if (!Number.isNaN(gpuUsagePs) && gpuUsagePs > 0) {
        gpuLoad = Math.round(gpuUsagePs);
      }
    } catch {}
  }
  
  // Se ainda não encontrou a GPU, usar a primeira disponível para nome e VRAM
  if (!selectedGpu) {
    selectedGpu = gpuControllers[0] || (gpuStatsControllers && gpuStatsControllers[0]) || {};
  }
  
  // Tentar obter informações da GPU via WMIC se não tiver nome/VRAM (Windows)
  try {
    if ((!selectedGpu || !selectedGpu.model || selectedGpu.model === 'N/D') && process.platform === 'win32') {
      const gpuInfo = execSync('wmic path win32_VideoController get name,AdapterRAM,VideoProcessor /format:value', { encoding: 'utf8', timeout: 2000 });
      const lines = gpuInfo.split(/\r?\n/).filter(Boolean);
      const gpus = [];
      let currentGpu = {};
      
      // Processar múltiplas GPUs (pode haver integrada + dedicada)
      for (const line of lines) {
        if (line.trim() === '') {
          if (currentGpu.Name) {
            gpus.push({ ...currentGpu });
          }
          currentGpu = {};
          continue;
        }
        const [key, value] = line.split('=');
        if (key && value && value.trim() !== '') {
          currentGpu[key.trim()] = value.trim();
        }
      }
      if (currentGpu.Name) {
        gpus.push(currentGpu);
      }
      
      // Priorizar GPU dedicada (excluir Intel HD, AMD Radeon integrada, etc.)
      let preferredGpu = gpus.find(gpu => 
        gpu.Name && 
        !gpu.Name.toLowerCase().includes('intel') && 
        !gpu.Name.toLowerCase().includes('radeon graphics') &&
        !gpu.Name.toLowerCase().includes('vega')
      ) || gpus[0]; // Fallback para primeira GPU se não encontrar dedicada
      
      if (preferredGpu && preferredGpu.Name && (!selectedGpu || !selectedGpu.model || selectedGpu.model === 'N/D')) {
        if (!selectedGpu) selectedGpu = {};
        selectedGpu.model = preferredGpu.Name;
        if (preferredGpu.AdapterRAM) {
          const vramBytes = parseInt(preferredGpu.AdapterRAM, 10);
          if (!Number.isNaN(vramBytes) && vramBytes > 0 && vramBytes < 4294967296) { // Validar que não é valor inválido
            selectedGpu.vram = Math.round(vramBytes / (1024 * 1024)); // Converter bytes para MB
          }
        }
      }
    }
  } catch (err) {
    console.warn('[SystemInfo] Erro ao obter GPU via WMIC:', err.message);
  }

  // Fallbacks quando algumas leituras retornam zero (comum no Windows com WMI bloqueado)
  try {
    if (!mem || !mem.total || mem.total === 0) {
      mem = { total: os.totalmem(), available: os.freemem() };
    }
  } catch {}
  
  // CPU: tentar obter informações via WMIC se não tiver manufacturer/brand
  try {
    if ((!cpu.manufacturer || cpu.manufacturer === 'N/D' || !cpu.brand || cpu.brand === 'N/D') && process.platform === 'win32') {
      const cpuInfo = execSync('wmic cpu get name,manufacturer,numberofcores,numberoflogicalprocessors /format:value', { encoding: 'utf8', timeout: 2000 });
      const lines = cpuInfo.split(/\r?\n/).filter(Boolean);
      const cpuData = {};
      for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
          cpuData[key.trim()] = value.trim();
        }
      }
      if (cpuData.Name && cpuData.Name !== '') {
        // Extrair manufacturer e brand do nome completo
        const fullName = cpuData.Name;
        if (!cpu.manufacturer || cpu.manufacturer === 'N/D') {
          cpu.manufacturer = cpuData.Manufacturer || cpu.manufacturer || 'N/D';
        }
        if (!cpu.brand || cpu.brand === 'N/D') {
          // Se o nome completo contém informação completa, usar parte dele
          // Exemplo: "Intel(R) Core(TM) i7-9700K CPU @ 3.60GHz" -> "Intel Core i7-9700K"
          // Remover marcações desnecessárias
          let cleanName = fullName
            .replace(/\(R\)/gi, '')
            .replace(/\(TM\)/gi, '')
            .replace(/CPU\s*@.*$/i, '') // Remover frequência
            .replace(/\s+/g, ' ')
            .trim();
          // Tentar extrair o modelo do nome limpo
          const brandMatch = cleanName.match(/(?:Intel|AMD|Qualcomm|MediaTek)?\s*(Core|Ryzen|Athlon|Celeron|Pentium|Snapdragon|MediaTek)?[^\s]*(?:\s+[i|r|a|f|e|x]?\d+[^\s]*)?/i);
          cpu.brand = brandMatch ? brandMatch[0].trim() : cleanName.substring(0, 60).trim();
        }
        // WMIC retorna NumberOfCores (núcleos físicos) e NumberOfLogicalProcessors (processos lógicos/threads)
        if (cpuData.NumberOfCores) {
          const physicalCores = parseInt(cpuData.NumberOfCores, 10);
          if (!cpu.physicalCores) cpu.physicalCores = physicalCores;
          if (!cpu.cores) cpu.cores = physicalCores; // Usar physicalCores como cores também
        }
        if (cpuData.NumberOfLogicalProcessors) {
          const logicalProcessors = parseInt(cpuData.NumberOfLogicalProcessors, 10);
          if (!cpu.logicalProcessors) cpu.logicalProcessors = logicalProcessors;
          if (!cpu.threads) cpu.threads = logicalProcessors;
        }
      }
    }
  } catch (err) {
    console.warn('[SystemInfo] Erro ao obter CPU via WMIC:', err.message);
  }
  
  // CPU: se uso vier zerado, tentar via WMIC (Windows)
  try {
    if ((typeof cpuCurrentLoad.currentLoad !== 'number') || cpuCurrentLoad.currentLoad === 0) {
      const out = execSync('wmic cpu get loadpercentage /value', { encoding: 'utf8', timeout: 1200 });
      const line = out.split(/\r?\n/).find(l => /LoadPercentage=/i.test(l));
      const val = line ? parseInt(line.split('=')[1], 10) : NaN;
      if (!Number.isNaN(val) && val >= 0 && val <= 100) {
        cpuCurrentLoad.currentLoad = val;
      }
    }
  } catch {}

  let primaryFsFallback = null;
  try {
    if (!fsSize || !Array.isArray(fsSize) || fsSize.length === 0) {
      const out = execSync('wmic logicaldisk where "DeviceID=\'C:\'" get Size,FreeSpace /format:value', { encoding: 'utf8', timeout: 1500 });
      const lines = out.split(/\r?\n/).filter(Boolean);
      const parsed = {};
      for (const line of lines) {
        const [k, v] = line.split('=');
        if (k && v) parsed[k.trim()] = parseInt(v.trim(), 10);
      }
      if (parsed.Size) {
        primaryFsFallback = {
          mount: 'C:',
          size: parsed.Size,
          available: parsed.FreeSpace || 0,
          used: parsed.Size - (parsed.FreeSpace || 0)
        };
      }
    }
  } catch {}

  const storageTotal = diskLayout.reduce((total, disk) => total + (disk.size || 0), 0);

  // Processes: sempre tentar obter via tasklist se o valor estiver zerado ou inválido
  try {
    // Verificar se precisa usar fallback (valor zerado ou inválido)
    const needsFallback = !processes || 
                         processes.running === 0 || 
                         processes.all === 0 || 
                         (!processes.running && !processes.all) ||
                         (typeof processes.running !== 'number') ||
                         (typeof processes.all !== 'number');
    
    if (needsFallback) {
      // Tentar primeiro com tasklist padrão (mais confiável)
      try {
        const out = execSync('tasklist', { encoding: 'utf8', timeout: 2000 });
        const lines = out.split(/\r?\n/).filter(l => {
          const trimmed = l.trim();
          // Filtrar linhas vazias, cabeçalhos e linhas que não são processos válidos
          return trimmed && 
                 trimmed.length > 10 && // Linhas de processo têm mais de 10 caracteres
                 !trimmed.startsWith('=') && 
                 !/^(Imagem|Nome|Image|Process|PID)/i.test(trimmed) &&
                 !trimmed.match(/^=+$/); // Não são linhas de separação
        });
        const count = Math.max(0, lines.length);
        
        // Se conseguiu contar processos, usar esse valor
        if (count > 0) {
          processes = {
            running: count,
            blocked: processes?.blocked || 0,
            sleeping: processes?.sleeping || 0,
            all: count
          };
        }
      } catch (err1) {
        // Se falhar, tentar com formato CSV
        try {
          const out2 = execSync('tasklist /FO CSV', { encoding: 'utf8', timeout: 2000 });
          const lines2 = out2.split(/\r?\n/).filter(l => {
            const trimmed = l.trim();
            return trimmed && 
                   !trimmed.startsWith('"Image Name"') && 
                   !trimmed.startsWith('=') && 
                   trimmed.includes(',') &&
                   trimmed.split(',').length >= 2;
          });
          const count2 = Math.max(0, lines2.length);
          if (count2 > 0) {
            processes = {
              running: count2,
              blocked: processes?.blocked || 0,
              sleeping: processes?.sleeping || 0,
              all: count2
            };
          }
        } catch (err2) {
          console.warn('[SystemInfo] Erro ao obter processos via tasklist (ambos métodos):', err2.message);
        }
      }
    }
  } catch (err) {
    console.warn('[SystemInfo] Erro geral ao obter processos via tasklist:', err.message);
  }

  const primaryFs =
    (fsSize.find((volume) => volume.mount && volume.mount.toUpperCase().startsWith('C')) ||
    fsSize[0] ||
    primaryFsFallback ||
    {});

  const usedBytes =
    typeof primaryFs.used === 'number'
      ? primaryFs.used
      : (primaryFs.size || 0) - (primaryFs.available || 0);
  const freeBytes = typeof primaryFs.available === 'number' ? primaryFs.available : 0;

  const primaryTotal = toGiB(primaryFs.size);
  const primaryUsed = toGiB(usedBytes);
  const primaryFree = toGiB(freeBytes);
  const primaryUtilization =
    primaryTotal > 0
      ? Math.min(100, Math.max(0, Math.round((primaryUsed / primaryTotal) * 100)))
      : 0;

  // Obter cores físicas e processos lógicos corretamente
  // cores = número de núcleos físicos (physicalCores)
  // threads = número de processos lógicos (logicalProcessors)
  // Prioridade: usar physicalCores do systeminformation ou do WMIC, senão usar cores
  // Para threads: usar logicalProcessors do systeminformation ou do WMIC, senão usar os.cpus().length
  let cpuPhysicalCores = cpu.physicalCores || cpu.cores || 0;
  let cpuLogicalProcessors = cpu.logicalProcessors || cpu.threads || 0;
  
  // Se não tiver logicalProcessors, usar os.cpus().length como fallback (número real de threads)
  if (!cpuLogicalProcessors || cpuLogicalProcessors === 0) {
    try {
      cpuLogicalProcessors = os.cpus().length;
    } catch (e) {
      // Se falhar, calcular baseado em cores físicas (assumindo hyperthreading)
      cpuLogicalProcessors = cpuPhysicalCores > 0 ? cpuPhysicalCores * 2 : 0;
    }
  }
  
  // Se não tiver physicalCores mas tiver logicalProcessors, tentar calcular
  if (!cpuPhysicalCores || cpuPhysicalCores === 0) {
    // Se tiver logicalProcessors, assumir que é aproximadamente metade (hyperthreading)
    if (cpuLogicalProcessors > 0) {
      cpuPhysicalCores = Math.ceil(cpuLogicalProcessors / 2);
    }
  }
  
  const result = {
    cpu: {
      manufacturer: cpu.manufacturer || 'N/D',
      brand: cpu.brand || cpu.model || 'N/D',
      cores: cpuPhysicalCores, // Núcleos físicos
      threads: cpuLogicalProcessors, // Processos lógicos (threads)
      load: Math.round(cpuCurrentLoad.currentLoad)
    },
    gpu: {
      name: (selectedGpu && selectedGpu.model) || (gpuControllers[0] && gpuControllers[0].model) || (gpuStatsControllers[0] && gpuStatsControllers[0].model) || 'N/D',
      vram: (selectedGpu && selectedGpu.vram) || (gpuControllers[0] && gpuControllers[0].vram) || (gpuStatsControllers[0] && gpuStatsControllers[0].vram) || 0,
      utilization: gpuLoad
    },
    memory: {
      total: toGiB(mem.total),
      used: toGiB(mem.total - mem.available)
    },
    storage: {
      total: toGiB(storageTotal),
      devices: diskLayout.length,
      primary: {
        mount: primaryFs.mount || 'C:',
        total: primaryTotal,
        used: primaryUsed,
        free: primaryFree,
        utilization: primaryUtilization
      }
    },
    os: {
      platform: osInfo.distro,
      hostname: osInfo.hostname,
      arch: osInfo.arch,
      build: osInfo.build
    },
    processes: {
      running: processes.running,
      blocked: processes.blocked,
      sleeping: processes.sleeping,
      all: processes.all
    },
    timestamp: Date.now()
  };
  
  // Log reduzido para evitar spam no console
  // console.log('[SystemInfo] Snapshot criado com sucesso:', { ... });
  
  // Verificar se os dados estão realmente válidos
  if (result.cpu.load === 0 && result.memory.total === 0 && result.processes.running === 0) {
    console.warn('[SystemInfo] ATENÇÃO: Todos os valores estão zerados! Isso pode indicar um problema na coleta.');
  }
  
  return result;
}

module.exports = {
  getSystemSnapshot
};

