/**
 * Verificação e instalação de dependências do sistema necessárias para o Y20 BOOSTER
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Verificar se Visual C++ Redistributables está instalado
 */
async function checkVCRedist() {
  try {
    // Verificar versões comuns do VC++ Redistributable
    const vcVersions = [
      { name: 'Microsoft Visual C++ 2015-2022 Redistributable (x64)', key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VisualStudio\\14.0\\VC\\Runtimes\\x64' },
      { name: 'Microsoft Visual C++ 2015-2022 Redistributable (x86)', key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VisualStudio\\14.0\\VC\\Runtimes\\x86' },
      { name: 'Microsoft Visual C++ 2013 Redistributable (x64)', key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VisualStudio\\12.0\\VC\\Runtimes\\x64' },
      { name: 'Microsoft Visual C++ 2013 Redistributable (x86)', key: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\VisualStudio\\12.0\\VC\\Runtimes\\x86' }
    ];

    for (const vc of vcVersions) {
      try {
        const { stdout } = await execAsync(`reg query "${vc.key}" /v Version 2>nul`);
        if (stdout && stdout.includes('Version')) {
          console.log(`[Dependencies] ✅ ${vc.name} encontrado`);
          return true;
        }
      } catch (error) {
        // Continuar verificando outras versões
      }
    }

    // Verificar também via WMI
    try {
      const { stdout } = await execAsync('wmic product get name | findstr /i "Visual C++"');
      if (stdout && stdout.trim()) {
        console.log('[Dependencies] ✅ Visual C++ Redistributable encontrado via WMI');
        return true;
      }
    } catch (error) {
      // Continuar
    }

    console.warn('[Dependencies] ⚠️ Visual C++ Redistributable não encontrado');
    return false;
  } catch (error) {
    console.error('[Dependencies] Erro ao verificar VC++ Redistributable:', error.message);
    return false;
  }
}

/**
 * Verificar se .NET Framework está instalado
 */
async function checkDotNet() {
  try {
    // Verificar .NET Framework 4.5 ou superior
    const { stdout } = await execAsync('reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\NET Framework Setup\\NDP\\v4\\Full" /v Release 2>nul');
    if (stdout && stdout.includes('Release')) {
      const releaseMatch = stdout.match(/Release\s+REG_DWORD\s+0x(\w+)/);
      if (releaseMatch) {
        const releaseValue = parseInt(releaseMatch[1], 16);
        // Release >= 378389 significa .NET Framework 4.5
        if (releaseValue >= 378389) {
          console.log('[Dependencies] ✅ .NET Framework encontrado');
          return true;
        }
      }
    }
    console.warn('[Dependencies] ⚠️ .NET Framework não encontrado ou versão antiga');
    return false;
  } catch (error) {
    console.warn('[Dependencies] ⚠️ Erro ao verificar .NET Framework:', error.message);
    return false;
  }
}

/**
 * Verificar se há permissões de administrador
 */
function checkAdminRights() {
  try {
    // Tentar acessar uma chave do registro que requer admin
    const testKey = 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion';
    const { execSync } = require('child_process');
    execSync(`reg query "${testKey}" 2>nul`, { stdio: 'ignore' });
    console.log('[Dependencies] ✅ Permissões de administrador detectadas');
    return true;
  } catch (error) {
    console.warn('[Dependencies] ⚠️ Permissões de administrador não detectadas');
    return false;
  }
}

/**
 * Verificar todas as dependências
 */
async function checkAllDependencies() {
  console.log('[Dependencies] Verificando dependências do sistema...');
  
  const results = {
    vcRedist: await checkVCRedist(),
    dotNet: await checkDotNet(),
    adminRights: checkAdminRights()
  };

  const missing = [];
  if (!results.vcRedist) missing.push('Visual C++ Redistributable');
  if (!results.dotNet) missing.push('.NET Framework 4.5+');
  if (!results.adminRights) missing.push('Permissões de Administrador');

  if (missing.length > 0) {
    console.warn('[Dependencies] ⚠️ Dependências faltando:', missing.join(', '));
    return {
      allOk: false,
      missing,
      results
    };
  }

  console.log('[Dependencies] ✅ Todas as dependências estão instaladas');
  return {
    allOk: true,
    missing: [],
    results
  };
}

/**
 * Obter URL de download do Visual C++ Redistributable
 */
function getVCRedistDownloadUrl() {
  // URL oficial do Microsoft Visual C++ 2015-2022 Redistributable (x64)
  return 'https://aka.ms/vs/17/release/vc_redist.x64.exe';
}

/**
 * Obter URL de download do .NET Framework
 */
function getDotNetDownloadUrl() {
  // URL oficial do .NET Framework 4.8
  return 'https://dotnet.microsoft.com/download/dotnet-framework/net48';
}

module.exports = {
  checkVCRedist,
  checkDotNet,
  checkAdminRights,
  checkAllDependencies,
  getVCRedistDownloadUrl,
  getDotNetDownloadUrl
};

