param(
    [string]$CursorDir
)

if (-not $CursorDir) {
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$CursorDir = $CursorDir.Trim('"')
$CursorDir = [System.IO.Path]::GetFullPath($CursorDir)

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

function Apply-Cursor {
    param(
        [uint32]$Id,
        [string]$FileName
    )

    $path = Join-Path $CursorDir $FileName
    if (-not (Test-Path -LiteralPath $path)) {
        Write-Host "Aviso: arquivo não encontrado -> $FileName"
        return
    }

    $cursorHandle = [CursorApplier]::LoadCursorFromFile($path)
    if ($cursorHandle -eq [IntPtr]::Zero) {
        Write-Host "Falha ao carregar cursor: $FileName"
        return
    }

    $cursorCopy = [CursorApplier]::CopyIcon($cursorHandle)
    if ($cursorCopy -eq [IntPtr]::Zero) {
        Write-Host "Falha ao duplicar cursor: $FileName"
        return
    }

    $ok = [CursorApplier]::SetSystemCursor($cursorCopy, $Id)
    if (-not $ok) {
        Write-Host "Falha ao aplicar cursor: $FileName (ID=$Id)"
    }
}

$cursorMap = [ordered]@{
    32512 = "Steve Normal.cur"
    32651 = "Pig Help.cur"
    32650 = "Steve Working.ani"
    32514 = "Block Busy.ani"
    32515 = "Creeper Precision.cur"
    32513 = "Enderman Text.ani"
    32643 = "Bow Diagonal 2.ani"
    32646 = "Skeleton Move.ani"
    32516 = "Herobrine Alternate.ani"
    32631 = "Bow Handwriting.cur"
    32648 = "Herobrine Unavaible.cur"
    32649 = "Steve Link.ani"
    32645 = "Chest Vertical.ani"
    32644 = "Ender-Dragon Horizontal.ani"
    32642 = "Bow Diagonal 1.ani"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

# Fallbacks extras para Person/Location/Pin
$linkPath = Join-Path $CursorDir "Steve Link.ani"
if (Test-Path -LiteralPath $linkPath) {
    & reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d "$linkPath" /f > $null
    & reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d "$linkPath" /f > $null
    & reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d "$linkPath" /f > $null
}

Write-Host "Cursores aplicados pelo PowerShell."

