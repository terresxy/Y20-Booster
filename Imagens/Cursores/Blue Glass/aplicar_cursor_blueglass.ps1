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
    32512 = "BlueglassArrow.cur"            # Arrow
    32650 = "BlueglassWorking.ani"          # AppStarting
    32514 = "BlueglassBusy.ani"             # Wait
    32513 = "BlueglassTextSelect.cur"       # IBeam
    32515 = "BlueGlassPrecision.cur"        # Crosshair / Precision
    32631 = "BlueGlassPencil.cur"           # Handwriting
    32648 = "BlueGlassUnavailable.cur"      # No
    32645 = "BlueglassSizeNS.cur"           # SizeNS
    32644 = "BlueglassSizeWE.cur"           # SizeWE
    32642 = "BlueglassSizeNWSE.cur"         # SizeNWSE
    32643 = "BlueglassSizeNESW.cur"         # SizeNESW
    32646 = "BlueglassSizeAll.cur"          # SizeAll
    32516 = "BlueGlassAlternateSelect.cur"  # UpArrow
    32649 = "BlueGlassLink.cur"             # Hand / Link
    32651 = "BlueglassHelp.ani"             # Help
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

$extras = @{
    Person   = "BlueGlassPerson.ani"
    Location = "BlueGlassLocation.ani"
    Pin      = "BlueGlassLocation.ani"
}

if (-not (Test-Path -LiteralPath (Join-Path $CursorDir "BlueGlassPerson.ani"))) {
    $extras["Person"] = "BlueGlassBook.ani"
}
if (-not (Test-Path -LiteralPath (Join-Path $CursorDir "BlueGlassLocation.ani"))) {
    $extras["Location"] = "BlueGlassBook.ani"
    $extras["Pin"] = "BlueGlassBook.ani"
}

foreach ($kvp in $extras.GetEnumerator()) {
    $path = Join-Path $CursorDir $kvp.Value
    if (Test-Path -LiteralPath $path) {
        Set-ItemProperty -Path $regPath -Name $kvp.Key -Value $path -ErrorAction SilentlyContinue
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

