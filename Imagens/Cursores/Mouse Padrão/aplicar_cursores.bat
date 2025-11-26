@echo off
chcp 65001 >nul
cls
echo ========================================
echo   Aplicando Esquema de Cursores
echo ========================================
echo.

REM Obtém o caminho completo da pasta atual
set "CURSOR_PATH=%~dp0"
set "CURSOR_PATH=%CURSOR_PATH:~0,-1%"

REM Verifica se os arquivos de cursor existem
if not exist "%CURSOR_PATH%\arrow_d.cur" (
    echo ERRO: Arquivos de cursor não encontrados na pasta!
    echo Pasta esperada: %CURSOR_PATH%
    echo.
    pause
    exit /b 1
)

echo Caminho dos cursores: %CURSOR_PATH%
echo.

REM Configura cada cursor diretamente no registro
echo Configurando cursores no registro do Windows...

reg add "HKCU\Control Panel\Cursors" /v "(Default)" /t REG_SZ /d "Windows Default" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Arrow" /t REG_SZ /d "%CURSOR_PATH%\arrow_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Help" /t REG_SZ /d "%CURSOR_PATH%\help_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "AppStarting" /t REG_SZ /d "%CURSOR_PATH%\wait_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Wait" /t REG_SZ /d "%CURSOR_PATH%\busy_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Crosshair" /t REG_SZ /d "%CURSOR_PATH%\cross_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "IBeam" /t REG_SZ /d "%CURSOR_PATH%\beam_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "NWPen" /t REG_SZ /d "%CURSOR_PATH%\pen_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "SizeAll" /t REG_SZ /d "%CURSOR_PATH%\move_d.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "SizeNESW" /t REG_SZ /d "%CURSOR_PATH%\size1_r.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "SizeNWSE" /t REG_SZ /d "%CURSOR_PATH%\size2_r.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "SizeWE" /t REG_SZ /d "%CURSOR_PATH%\size3_r.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "SizeNS" /t REG_SZ /d "%CURSOR_PATH%\size4_r.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "UpArrow" /t REG_SZ /d "%CURSOR_PATH%\up_r.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Hand" /t REG_SZ /d "%CURSOR_PATH%\hand-m.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "No" /t REG_SZ /d "%CURSOR_PATH%\no_r.cur" /f >nul

echo Cursores configurados no registro!
echo.

REM Aplica as mudanças usando PowerShell com SystemParametersInfo
echo Aplicando alterações no sistema...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class Win32API { [DllImport(\"user32.dll\", CharSet=CharSet.Auto, SetLastError=true)] public static extern bool SystemParametersInfo(uint uiAction, uint uiParam, string pvParam, uint fWinIni); }'; [Win32API]::SystemParametersInfo(0x0057, 0, $null, 3)"

REM Força refresh adicional
timeout /t 1 /nobreak >nul
rundll32.exe user32.dll,UpdatePerUserSystemParameters 1, True

echo.
echo ========================================
echo   Cursores aplicados com sucesso!
echo ========================================
echo.
echo Se os cursores não mudaram, tente:
echo 1. Mover o mouse
echo 2. Abrir Configurações do Windows ^> Dispositivos ^> Mouse
echo 3. Reiniciar o Explorer (Ctrl+Shift+Esc, finalizar explorer.exe, depois executar novamente)
echo.
pause
