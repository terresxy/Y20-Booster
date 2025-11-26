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
    32512 = "Normal.cur"
    32650 = "Working.ani"
    32514 = "Busy.ani"
    32513 = "Text.cur"
    32515 = "Precision.cur"
    32631 = "Handwriting.cur"
    32648 = "Unavaliable.cur"
    32645 = "Vertical.cur"
    32644 = "Horizontal.cur"
    32642 = "Diagonal 1.cur"
    32643 = "Diagonal 2.cur"
    32646 = "Move.cur"
    32516 = "Alternate.cur"
    32649 = "Link.cur"
    32651 = "Help.cur"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

Write-Host "Cursores aplicados pelo PowerShell."

