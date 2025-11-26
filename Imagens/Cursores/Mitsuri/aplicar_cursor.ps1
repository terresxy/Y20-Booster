param(
    [string]$CursorDir
)

if (-not $CursorDir) {
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

# Normaliza o caminho recebido, removendo aspas extras e tratando erros
$CursorDir = $CursorDir.Trim('"')
$CursorDir = $CursorDir -replace '"',''
try {
    $CursorDir = [System.IO.Path]::GetFullPath($CursorDir)
} catch {
    Write-Host "Aviso: caminho de pasta invalido recebido: '$CursorDir'. Usando pasta do script." -ForegroundColor Yellow
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public static class CursorApplier
{
    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
    public static extern IntPtr LoadCursorFromFile(string lpFileName);

    [DllImport("user32.dll", SetLastError = true)]
    public static extern IntPtr CopyIcon(IntPtr hIcon);

    [DllImport("user32.dll", SetLastError = true)]
    [return: MarshalAs(UnmanagedType.Bool)]
    public static extern bool SetSystemCursor(IntPtr hcur, uint id);
}
"@

$cursorMap = [ordered]@{
    32512 = "Mitsuri.ani";                   # IDC_ARROW
    32650 = "Mitsuri Working.ani";           # IDC_APPSTARTING
    32514 = "Petals Busy.ani";               # IDC_WAIT
    32515 = "Mitsuri Precision.ani";         # IDC_CROSS
    32513 = "Mitsuri Text.ani";              # IDC_IBEAM
    32631 = "Petals Handwriting.ani";        # IDC_PEN (Handwriting)
    32648 = "Mitsuri Unavailable.ani";       # IDC_NO
    32645 = "Cherry Blossom Vertical.ani";   # IDC_SIZENS
    32644 = "Cherry Blossom Horizontal.ani"; # IDC_SIZEWE
    32642 = "Cherry Blossom Diagonal 1.ani"; # IDC_SIZENWSE
    32643 = "Cherry Blossom Diagonal 2.ani"; # IDC_SIZENESW
    32646 = "Cherry Blossom Move.ani";       # IDC_SIZEALL
    32516 = "Mitsuri Alternate.ani";         # IDC_UPARROW
    32649 = "Mitsuri Link.ani";              # IDC_HAND
    32651 = "Mitsuri Help.ani";              # IDC_HELP
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    $fullPath = Join-Path $CursorDir $entry.Value

    if (-not (Test-Path -Path $fullPath)) {
        Write-Host "Aviso: arquivo não encontrado -> $($entry.Value)"
        continue
    }

    $cursorHandle = [CursorApplier]::LoadCursorFromFile($fullPath)
    if ($cursorHandle -eq [IntPtr]::Zero) {
        Write-Host "Falha ao carregar cursor: $($entry.Value)"
        continue
    }

    $cursorCopy = [CursorApplier]::CopyIcon($cursorHandle)
    if ($cursorCopy -eq [IntPtr]::Zero) {
        Write-Host "Falha ao duplicar cursor: $($entry.Value)"
        continue
    }

    $ok = [CursorApplier]::SetSystemCursor($cursorCopy, [uint32]$entry.Key)
    if (-not $ok) {
        Write-Host "Falha ao aplicar cursor: $($entry.Value) (ID=$($entry.Key))"
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

