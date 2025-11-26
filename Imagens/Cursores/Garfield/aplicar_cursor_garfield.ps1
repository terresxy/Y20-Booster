param(
    [string]$CursorDir
)

if (-not $CursorDir) {
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$CursorDir = $CursorDir.Trim('"')
$CursorDir = [System.IO.Path]::GetFullPath($CursorDir)

$regPath = 'HKCU:\Control Panel\Cursors'

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
    32512 = "Garfield.cur"     # Arrow
    32650 = "Garfield .ani"    # AppStarting
    32514 = "Garfield .ani"    # Wait
    32513 = "John.cur"         # IBeam
    32515 = "Garfields.cur"    # Crosshair / Precision
    32631 = "Nermal.cur"       # Handwriting
    32648 = "Odie.cur"         # No
    32645 = "Garfields.cur"    # SizeNS
    32644 = "Garfields.cur"    # SizeWE
    32642 = "Garfields.cur"    # SizeNWSE
    32643 = "Garfields.cur"    # SizeNESW
    32646 = "Garfields.cur"    # SizeAll
    32516 = "Garfields.cur"    # UpArrow
    32649 = "Garfields.cur"    # Hand / Link
    32651 = "Arlene.cur"       # Help
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

$extras = @{
    Person   = "Garfield.cur"
    Location = "Garfield.cur"
    Pin      = "Garfield.cur"
}

foreach ($kvp in $extras.GetEnumerator()) {
    $path = Join-Path $CursorDir $kvp.Value
    if (Test-Path -LiteralPath $path) {
        Set-ItemProperty -Path $regPath -Name $kvp.Key -Value $path -ErrorAction SilentlyContinue
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

