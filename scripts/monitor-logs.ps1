$ErrorActionPreference = 'SilentlyContinue'

$apiFile = $args[0]
$botFile = $args[1]

$apiPos = 0
$botPos = 0

Write-Host 'Monitorando logs... (Ctrl+C para parar)' -ForegroundColor Yellow
Write-Host ''

while ($true) {
    if (Test-Path $apiFile) {
        $apiContent = Get-Content $apiFile -ErrorAction SilentlyContinue
        if ($apiContent -and $apiContent.Length -gt $apiPos) {
            $apiContent[$apiPos..($apiContent.Length-1)] | ForEach-Object {
                Write-Host '[API]' $_ -ForegroundColor Cyan
            }
            $apiPos = $apiContent.Length
        }
    }
    
    if (Test-Path $botFile) {
        $botContent = Get-Content $botFile -ErrorAction SilentlyContinue
        if ($botContent -and $botContent.Length -gt $botPos) {
            $botContent[$botPos..($botContent.Length-1)] | ForEach-Object {
                Write-Host '[BOT]' $_ -ForegroundColor Green
            }
            $botPos = $botContent.Length
        }
    }
    
    Start-Sleep -Milliseconds 500
}

