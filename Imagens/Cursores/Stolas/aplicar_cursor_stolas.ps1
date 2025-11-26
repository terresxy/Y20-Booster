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
    32512 = "Stolas.ani"
    32649 = "Stolas Link.ani"
    32514 = "Stolas Busy.ani"
    32516 = "Stolas Alternate.ani"
    32631 = "Stolas Handwriting.ani"
    32513 = "Stolas Text.ani"
    32515 = "Stolas Precision.ani"
    32648 = "Stolas Unavailable.ani"
    32650 = "Stolas Working.ani"
    32646 = "Stolas Move.ani"
    32644 = "Stolas Horizontal.ani"
    32645 = "Stolas Vertical.ani"
    32643 = "Stolas Diagonal 2.ani"
    32642 = "Stolas Diagonal 1.ani"
    32651 = "Stolas Help.ani"
    32647 = "Stolas Location.ani"
}

# IDs não padrão (Location/Pin/Person) tratados manualmente
$extra = @{
    "Person" = "Stolas Person.ani"
    "Location" = "Stolas Location.ani"
    "Pin" = "Stolas Location.ani"
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

# Aplicar extras via registro (usam mesmos arquivos)
if (Test-Path -LiteralPath (Join-Path $CursorDir "Stolas Person.ani")) {
    reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d (Join-Path $CursorDir "Stolas Person.ani") /f > $null
}
if (Test-Path -LiteralPath (Join-Path $CursorDir "Stolas Location.ani")) {
    reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d (Join-Path $CursorDir "Stolas Location.ani") /f > $null
    reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d (Join-Path $CursorDir "Stolas Location.ani") /f > $null
}

Write-Host "Cursores aplicados pelo PowerShell."

