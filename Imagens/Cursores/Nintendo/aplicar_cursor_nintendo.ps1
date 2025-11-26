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
    32512 = "Wii Cursor.cur"
    32650 = "Wii Cursor 2 Loading...ani"
    32514 = "wii-loading-ring.ani"
    32513 = "wii-open.cur"
    32515 = "wii-pointer-blue.cur"
    32631 = "wii-open-ccw.cur"
    32648 = "wii-pointer-reverse.cur"
    32645 = "wii-move.cur"
    32644 = "wii-move-ccw.cur"
    32642 = "wii-grab.cur"
    32643 = "wii-grab-ccw.cur"
    32646 = "wii-move.cur"
    32516 = "wii-pointer.cur"
    32649 = "wii-pointer-blue.cur"
    32651 = "wii-help.cur"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

# Ajustes extras para ponteiros complementares
$linkExtras = @("wii-pointer-blue.cur", "wii-pointer.cur")
foreach ($extra in @("Person","Location","Pin")) {
    $path = Join-Path $CursorDir "wii-pointer-blue.cur"
    if (Test-Path -LiteralPath $path) {
        & reg add "HKCU\Control Panel\Cursors" /v $extra /t REG_SZ /d "$path" /f > $null
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

