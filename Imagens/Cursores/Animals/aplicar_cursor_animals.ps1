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
    32512 = "Dog-High Ears.ico"
    32650 = "Flying-Chicken.ico"
    32514 = "Chicken.ico"
    32513 = "Cow.ico"
    32515 = "Shark.ico"
    32631 = "Dog-Flat Ears.ico"
    32648 = "Skunk.ico"
    32645 = "Dog-High Ears.ico"
    32644 = "Dog-High Ears.ico"
    32642 = "Flying-Chicken.ico"
    32643 = "Flying-Chicken.ico"
    32646 = "Flying-Chicken.ico"
    32516 = "Dog-High Ears.ico"
    32649 = "Fish.ico"
    32651 = "Fish.ico"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

$extras = @{
    Person   = "Dog-High Ears.ico"
    Location = "Fish.ico"
    Pin      = "Fish.ico"
}

foreach ($kvp in $extras.GetEnumerator()) {
    $path = Join-Path $CursorDir $kvp.Value
    if (Test-Path -LiteralPath $path) {
        Set-ItemProperty -Path $regPath -Name $kvp.Key -Value $path -ErrorAction SilentlyContinue
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

