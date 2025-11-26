@echo off
chcp 65001 >nul
setlocal

REM Script automático para aplicar o cursor padrão do Windows
REM (sem pausas nem janelas interativas)

set "CURSOR_PATH=%~dp0"
set "CURSOR_PATH=%CURSOR_PATH:~0,-1%"

REM Validar se alguns arquivos principais existem
if not exist "%CURSOR_PATH%\arrow_d.cur" exit /b 1

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

REM Aplicar alterações imediatamente
powershell -NoProfile -ExecutionPolicy Bypass -Command "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class Win32API { [DllImport(\"user32.dll\", CharSet=CharSet.Auto, SetLastError=true)] public static extern bool SystemParametersInfo(uint uiAction, uint uiParam, string pvParam, uint fWinIni); }'; [Win32API]::SystemParametersInfo(0x0057, 0, $null, 3)"
timeout /t 1 /nobreak >nul
rundll32.exe user32.dll,UpdatePerUserSystemParameters 1, True

endlocal
exit /b 0


