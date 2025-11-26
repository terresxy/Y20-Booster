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
    32512 = "Pennywise .ico"
    32650 = "Pennywise 2.ico"
    32514 = "Pennywise 2.ico"
    32513 = "Pennwise Stephen King IT clown.ico"
    32515 = "Pennywise 2.ico"
    32631 = "Pennwise Stephen King IT clown.ico"
    32648 = "Pennywise 2.ico"
    32645 = "Pennywise .ico"
    32644 = "Pennywise .ico"
    32642 = "Pennywise .ico"
    32643 = "Pennywise .ico"
    32646 = "Pennywise .ico"
    32516 = "Pennywise .ico"
    32649 = "Pennwise Stephen King IT clown.ico"
    32651 = "Pennwise Stephen King IT clown.ico"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

$extras = @{
    Person   = "Pennwise Stephen King IT clown.ico"
    Location = "Pennwise Stephen King IT clown.ico"
    Pin      = "Pennwise Stephen King IT clown.ico"
}

foreach ($kvp in $extras.GetEnumerator()) {
    $path = Join-Path $CursorDir $kvp.Value
    if (Test-Path -LiteralPath $path) {
        Set-ItemProperty -Path $regPath -Name $kvp.Key -Value $path -ErrorAction SilentlyContinue
    }
}

Write-Host "Cursores aplicados pelo PowerShell."

