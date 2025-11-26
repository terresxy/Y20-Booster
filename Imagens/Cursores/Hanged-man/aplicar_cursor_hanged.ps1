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
    32512 = "hm-normal.ani"        # Arrow
    32650 = "hm-busy-working.ani"  # AppStarting
    32514 = "hm-busy-working.ani"  # Wait
    32513 = "hm-text.ani"          # IBeam
    32515 = "hm-precision.ani"     # Crosshair / Precision
    32631 = "hm-pen.ani"           # Handwriting
    32648 = "hm-unavaible.ani"     # No
    32645 = "hm-move-size.ani"     # SizeNS
    32644 = "hm-move-size.ani"     # SizeWE
    32642 = "hm-move-size.ani"     # SizeNWSE
    32643 = "hm-move-size.ani"     # SizeNESW
    32646 = "hm-move-size.ani"     # SizeAll
    32516 = "hm-alternate.ani"     # UpArrow
    32649 = "hm-link.ani"          # Hand
    32651 = "hm-help.ani"          # Help
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

Write-Host "Cursores aplicados pelo PowerShell."

