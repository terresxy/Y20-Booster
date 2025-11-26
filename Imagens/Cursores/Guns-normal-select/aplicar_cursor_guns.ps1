param(
    [string]$CursorDir,
    [string]$Color = "Gray"
)

if (-not $CursorDir) {
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$CursorDir = $CursorDir.Trim('"')
# Remove aspas internas que possam ter vindo da linha de comando
$CursorDir = $CursorDir -replace '"',''
try {
    $CursorDir = [System.IO.Path]::GetFullPath($CursorDir)
} catch {
    Write-Host "Aviso: caminho de pasta invalido recebido: '$CursorDir'. Usando pasta do script." -ForegroundColor Yellow
    $CursorDir = Split-Path -Parent $MyInvocation.MyCommand.Path
}

$normalFile = "$Color Gun Normal Select.cur"
$leftFile = "$Color Gun Normal Select Left.cur"

if (-not (Test-Path -LiteralPath (Join-Path $CursorDir $normalFile))) {
    Write-Host "Aviso: arquivo do cursor '$normalFile' não encontrado. Ajuste a cor configurada." -ForegroundColor Yellow
}
if (-not (Test-Path -LiteralPath (Join-Path $CursorDir $leftFile))) {
    Write-Host "Aviso: arquivo do cursor esquerdo '$leftFile' não encontrado. Ajuste a cor configurada." -ForegroundColor Yellow
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
    32512 = $normalFile          # Arrow
    32650 = $normalFile          # AppStarting
    32514 = $normalFile          # Wait
    32513 = $normalFile          # IBeam
    32515 = $normalFile          # Crosshair / Precision
    32631 = $leftFile            # Handwriting
    32648 = $normalFile          # No
    32645 = $normalFile          # SizeNS
    32644 = $normalFile          # SizeWE
    32642 = $normalFile          # SizeNWSE
    32643 = $normalFile          # SizeNESW
    32646 = $normalFile          # SizeAll
    32516 = $normalFile          # UpArrow
    32649 = $leftFile            # Hand / Link
    32651 = $normalFile          # Help
}

foreach ($entry in $cursorMap.GetEnumerator()) {
    Apply-Cursor -Id $entry.Key -FileName $entry.Value
}

Write-Host "Cursores aplicados pelo PowerShell."

