const { execFile, exec } = require('child_process');
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Função otimizada para executar PowerShell (quando necessário)
function runPowerShell(command) {
  return new Promise((resolve, reject) => {
    const psArgs = [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      command
    ];

    execFile('powershell.exe', psArgs, { windowsHide: true }, (error, stdout, stderr) => {
      // Log para debug
      if (stdout) console.log('[PowerShell] Stdout:', stdout.trim());
      if (stderr) console.log('[PowerShell] Stderr:', stderr.trim());
      
      // Se houver erro mas stdout contém resultado válido, ainda considerar sucesso
      // (alguns comandos PowerShell podem escrever warnings em stderr mas ainda funcionar)
      if (error) {
        // Se stderr contém apenas warnings comuns, tentar usar stdout se disponível
        const stderrLower = (stderr || '').toLowerCase();
        const isWarningOnly = stderrLower.includes('warning') || 
                             stderrLower.includes('aviso') ||
                             stderrLower.length === 0;
        
        if (isWarningOnly && stdout && stdout.trim()) {
          console.log('[PowerShell] Erro ignorado (apenas warning), usando stdout:', stdout.trim());
          resolve(stdout.trim());
          return;
        }
        
        reject(new Error(stderr || error.message));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

// Função otimizada para executar comandos diretos do Windows (mais eficiente)
function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    exec(command, { 
      windowsHide: true, 
      shell: true,
      ...options 
    }, (error, stdout, stderr) => {
      // Alguns comandos podem retornar erro mas ainda funcionar
      if (error && !options.ignoreError) {
        reject(new Error(stderr || error.message));
        return;
      }
      resolve(stdout.trim());
    });
  });
}

const optimizationDefinitions = {
  mouseAcceleration: {
    label: 'Aceleração do mouse',
    enable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d "0" /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d "0" /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d "0" /f', { ignoreError: true })
      ]).then(() => {
        // Aplicar mudanças imediatamente usando SystemParametersInfo via PowerShell
        return runPowerShell('[System.Windows.Forms.Cursor]::Current = [System.Windows.Forms.Cursor]::Current');
      }),
    disable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseSpeed /t REG_SZ /d "1" /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold1 /t REG_SZ /d "6" /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\Control Panel\\Mouse" /v MouseThreshold2 /t REG_SZ /d "10" /f', { ignoreError: true })
      ])
  },
  driverAutoUpdate: {
    label: 'Atualização automática de drivers',
    enable: () =>
      runCommand('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DriverSearching" /v SearchOrderConfig /t REG_DWORD /d 0 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\DriverSearching" /v SearchOrderConfig /t REG_DWORD /d 1 /f', { ignoreError: true })
  },
  globalNotifications: {
    label: 'Notificações globais',
    enable: () =>
      runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 0 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\PushNotifications" /v ToastEnabled /t REG_DWORD /d 1 /f', { ignoreError: true })
  },
  uwpBackgroundApps: {
    label: 'Aplicativos UWP em segundo plano',
    enable: () =>
      runPowerShell(
        'Get-AppxPackage | foreach { Set-ItemProperty -Path ("HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications\\\\" + $_.PackageFamilyName) -Name Disabled -Value 1 -ErrorAction SilentlyContinue }'
      ),
    disable: () =>
      runPowerShell(
        'Get-AppxPackage | foreach { Remove-ItemProperty -Path ("HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications\\\\" + $_.PackageFamilyName) -Name Disabled -ErrorAction SilentlyContinue }'
      )
  },
  mapsAutoUpdate: {
    label: 'Atualização automática de mapas',
    enable: () =>
      runCommand('reg add "HKLM\\SYSTEM\\Maps" /v AutoUpdateEnabled /t REG_DWORD /d 0 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg add "HKLM\\SYSTEM\\Maps" /v AutoUpdateEnabled /t REG_DWORD /d 1 /f', { ignoreError: true })
  },
  storeAutoUpdate: {
    label: 'Atualização de aplicativos da loja',
    enable: () =>
      runCommand('reg add "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsStore" /v AutoDownload /t REG_DWORD /d 2 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg delete "HKLM\\SOFTWARE\\Policies\\Microsoft\\WindowsStore" /v AutoDownload /f', { ignoreError: true })
  },
  gameBar: {
    label: 'Game Bar',
    enable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\GameBar" /v ShowStartupPanel /t REG_DWORD /d 0 /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 0 /f', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\GameBar" /v ShowStartupPanel /t REG_DWORD /d 1 /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\System\\GameConfigStore" /v GameDVR_Enabled /t REG_DWORD /d 1 /f', { ignoreError: true })
      ])
  },
  indexing: {
    label: 'Indexação',
    enable: () =>
      Promise.all([
        runCommand('sc stop WSearch', { ignoreError: true }),
        runCommand('sc config WSearch start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config WSearch start= auto', { ignoreError: true }),
        runCommand('sc start WSearch', { ignoreError: true })
      ])
  },
  sysMain: {
    label: 'SysMain (Prefetch, Superfetch)',
    enable: () =>
      Promise.all([
        runCommand('sc stop SysMain', { ignoreError: true }),
        runCommand('sc config SysMain start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config SysMain start= auto', { ignoreError: true }),
        runCommand('sc start SysMain', { ignoreError: true })
      ])
  },
  pauseWindowsUpdate: {
    label: 'Pausar atualizações do Windows',
    enable: () =>
      Promise.all([
        runCommand('sc stop wuauserv', { ignoreError: true }),
        runCommand('sc config wuauserv start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config wuauserv start= demand', { ignoreError: true }),
        runCommand('sc start wuauserv', { ignoreError: true })
      ])
  },
  // Otimizações do Windows
  activityFeed: {
    label: 'Feed de atividade',
    enable: () =>
      Promise.all([
        runCommand('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" /v AllowTelemetry /t REG_DWORD /d 0 /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v ShellFeedsTaskbarViewMode /t REG_DWORD /d 2 /f', { ignoreError: true })
      ]),
    disable: () =>
      runCommand('reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Feeds" /v ShellFeedsTaskbarViewMode /f', { ignoreError: true })
  },
  bluetooth: {
    label: 'Bluetooth',
    enable: () =>
      Promise.all([
        runCommand('sc stop BthServ', { ignoreError: true }),
        runCommand('sc config BthServ start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config BthServ start= demand', { ignoreError: true }),
        runCommand('sc start BthServ', { ignoreError: true })
      ])
  },
  cortana: {
    label: 'Cortana',
    enable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v BingSearchEnabled /t REG_DWORD /d 0 /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v CortanaConsent /t REG_DWORD /d 0 /f', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v BingSearchEnabled /t REG_DWORD /d 1 /f', { ignoreError: true }),
        runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Search" /v CortanaConsent /t REG_DWORD /d 1 /f', { ignoreError: true })
      ])
  },
  reduceProcesses: {
    label: 'Reduzir Processos',
    enable: () =>
      runCommand('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 1 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg add "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" /v DisablePagingExecutive /t REG_DWORD /d 0 /f', { ignoreError: true })
  },
  networkTraffic: {
    label: 'Tráfego de Rede',
    enable: () => runPowerShell('Set-NetConnectionProfile -NetworkCategory Private -ErrorAction SilentlyContinue'),
    disable: () => runPowerShell('Set-NetConnectionProfile -NetworkCategory Public -ErrorAction SilentlyContinue')
  },
  logsEvents: {
    label: 'Logs e Eventos',
    enable: () => runPowerShell('wevtutil sl "System" /e:false; wevtutil sl "Application" /e:false'),
    disable: () => runPowerShell('wevtutil sl "System" /e:true; wevtutil sl "Application" /e:true')
  },
  smartScreen: {
    label: 'Smart Screen',
    enable: () =>
      runCommand('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v SmartScreenEnabled /t REG_SZ /d "Off" /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg add "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer" /v SmartScreenEnabled /t REG_SZ /d "Warn" /f', { ignoreError: true })
  },
  backgroundApps: {
    label: 'Segundo Plano',
    enable: () =>
      runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalUserDisabled /t REG_DWORD /d 1 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\BackgroundAccessApplications" /v GlobalUserDisabled /f', { ignoreError: true })
  },
  biometricService: {
    label: 'Serviço Biométrico',
    enable: () =>
      Promise.all([
        runCommand('sc stop WBioSrvc', { ignoreError: true }),
        runCommand('sc config WBioSrvc start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config WBioSrvc start= auto', { ignoreError: true }),
        runCommand('sc start WBioSrvc', { ignoreError: true })
      ])
  },
  sync: {
    label: 'Sincronização',
    enable: () =>
      runCommand('reg add "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SettingSync" /v SyncPolicy /t REG_DWORD /d 0 /f', { ignoreError: true }),
    disable: () =>
      runCommand('reg delete "HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\SettingSync" /v SyncPolicy /f', { ignoreError: true })
  },
  windowsUpdate: {
    label: 'Windows Update',
    enable: () =>
      Promise.all([
        runCommand('sc stop wuauserv', { ignoreError: true }),
        runCommand('sc config wuauserv start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config wuauserv start= demand', { ignoreError: true }),
        runCommand('sc start wuauserv', { ignoreError: true })
      ])
  },
  xboxWindows: {
    label: 'Xbox Windows',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" -Name AppCaptureEnabled -Value 0; Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\XboxApp" -Name AllowXboxGameSaveTask -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\GameDVR" -Name AppCaptureEnabled -Value 1; Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\XboxApp" -Name AllowXboxGameSaveTask -Value 1')
  },
  windowsApps: {
    label: 'Windows Apps',
    enable: () => runPowerShell('Get-AppxPackage | Where-Object {$_.Name -notlike "*Store*" -and $_.Name -notlike "*Calculator*" -and $_.Name -notlike "*StickyNotes*"} | Remove-AppxPackage -ErrorAction SilentlyContinue'),
    disable: () => runPowerShell('# Não é possível reverter remoção de apps')
  },
  visualEffects: {
    label: 'Efeitos Visuais',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" -Name VisualFXSetting -Value 2'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\VisualEffects" -Name VisualFXSetting -Value 0')
  },
  fileIndexing: {
    label: 'Indexação Arquivos',
    enable: () =>
      Promise.all([
        runCommand('sc stop WSearch', { ignoreError: true }),
        runCommand('sc config WSearch start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config WSearch start= auto', { ignoreError: true }),
        runCommand('sc start WSearch', { ignoreError: true })
      ])
  },
  compatibility: {
    label: 'Compatibilidade',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options" -Name DisablePca -Value 1'),
    disable: () => runPowerShell('Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options" -Name DisablePca -ErrorAction SilentlyContinue')
  },
  networkThrottling: {
    label: 'Network Throttling',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name NetworkThrottlingIndex -Value 4294967295'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name NetworkThrottlingIndex -Value 10')
  },
  windowsInk: {
    label: 'Windows Ink',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\PenWorkspace" -Name PenWorkspaceButtonDesiredVisibility -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\PenWorkspace" -Name PenWorkspaceButtonDesiredVisibility -Value 1')
  },
  hibernation: {
    label: 'Hibernação',
    enable: () => runPowerShell('powercfg /hibernate off'),
    disable: () => runPowerShell('powercfg /hibernate on')
  },
  powerThrottling: {
    label: 'Power Throttling',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power" -Name EnergyEstimationEnabled -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Power" -Name EnergyEstimationEnabled -Value 1')
  },
  telemetry: {
    label: 'Telemetria',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" -Name AllowTelemetry -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\DataCollection" -Name AllowTelemetry -Value 3')
  },
  windowsInsider: {
    label: 'Windows Insider',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsSelfHost\\Applicability" -Name BranchName -Value ""'),
    disable: () => runPowerShell('Remove-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\WindowsSelfHost\\Applicability" -Name BranchName -ErrorAction SilentlyContinue')
  },
  snapAssist: {
    label: 'Snap Assist',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name SnapFill -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name SnapFill -Value 1')
  },
  mediaPlayerSharing: {
    label: 'Media Player Sharing',
    enable: () => runPowerShell('Set-Service "WMPNetworkSvc" -StartupType Disabled -ErrorAction SilentlyContinue; Stop-Service "WMPNetworkSvc" -ErrorAction SilentlyContinue'),
    disable: () => runPowerShell('Set-Service "WMPNetworkSvc" -StartupType Manual -ErrorAction SilentlyContinue')
  },
  dataCollection: {
    label: 'Coleta de Dados',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting" -Name Disabled -Value 1'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\Windows Error Reporting" -Name Disabled -Value 0')
  },
  spooler: {
    label: 'Spooler',
    enable: () => runPowerShell('Stop-Service "Spooler" -ErrorAction SilentlyContinue; Set-Service "Spooler" -StartupType Disabled'),
    disable: () => runPowerShell('Set-Service "Spooler" -StartupType Automatic; Start-Service "Spooler" -ErrorAction SilentlyContinue')
  },
  widgets: {
    label: 'Widgets',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name TaskbarDa -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name TaskbarDa -Value 1')
  },
  quickAccess: {
    label: 'Acesso Rápido',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name LaunchTo -Value 1'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced" -Name LaunchTo -Value 2')
  },
  cloudClipboard: {
    label: 'Cloud Clipboard',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Clipboard" -Name EnableClipboardHistory -Value 0'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKCU:\\SOFTWARE\\Microsoft\\Clipboard" -Name EnableClipboardHistory -Value 1')
  },
  remoteAccess: {
    label: 'Acesso Remoto',
    enable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" -Name fDenyTSConnections -Value 1'),
    disable: () => runPowerShell('Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" -Name fDenyTSConnections -Value 0')
  },
  unusedServices: {
    label: 'Serviços Inutilizados',
    enable: () => runPowerShell('Get-Service | Where-Object {$_.StartType -eq "Automatic" -and $_.DisplayName -like "*Fax*" -or $_.DisplayName -like "*Tablet*"} | Set-Service -StartupType Disabled -ErrorAction SilentlyContinue'),
    disable: () => runPowerShell('# Reverter serviços individuais se necessário')
  },
  superfetch: {
    label: 'Superfetch',
    enable: () =>
      Promise.all([
        runCommand('sc stop SysMain', { ignoreError: true }),
        runCommand('sc config SysMain start= disabled', { ignoreError: true })
      ]),
    disable: () =>
      Promise.all([
        runCommand('sc config SysMain start= auto', { ignoreError: true }),
        runCommand('sc start SysMain', { ignoreError: true })
      ])
  }
};

async function applyOptimizationSetting(key, enabled) {
  const optimization = optimizationDefinitions[key];

  if (!optimization) {
    throw new Error(`Configuração desconhecida: ${key}`);
  }

  if (enabled) {
    return optimization.enable();
  }

  return optimization.disable();
}

module.exports = {
  applyOptimizationSetting,
  optimizationDefinitions,
  runPowerShell,
  runCommand
};

