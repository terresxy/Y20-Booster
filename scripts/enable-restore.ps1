$service = Get-Service -Name "vss" -ErrorAction SilentlyContinue
if ($service -and $service.Status -ne "Running") {
    Set-Service -Name "vss" -StartupType Automatic
    Start-Service -Name "vss"
}

$protectionEnabled = (Get-CimInstance -Namespace "root/default" -ClassName "SystemRestoreConfig" -ErrorAction SilentlyContinue).RPSessionEnabled

if ($protectionEnabled -eq $false) {
    $null = Checkpoint-Computer -Description "Y20 BOOSTER - Ativação da proteção do sistema" -RestorePointType MODIFY_SETTINGS
}

