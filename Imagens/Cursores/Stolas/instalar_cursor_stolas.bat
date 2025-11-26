@echo off
setlocal

set "CURSOR_DIR=%~dp0"
set "SCHEME_NAME=Stolas"

echo Aplicando esquema de cursor Stolas...

reg add "HKCU\Control Panel\Cursors" /v Arrow /t REG_SZ /d "%CURSOR_DIR%Stolas.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Help /t REG_SZ /d "%CURSOR_DIR%Stolas Help.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v AppStarting /t REG_SZ /d "%CURSOR_DIR%Stolas Working.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Wait /t REG_SZ /d "%CURSOR_DIR%Stolas Busy.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Crosshair /t REG_SZ /d "%CURSOR_DIR%Stolas Precision.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Precision /t REG_SZ /d "%CURSOR_DIR%Stolas Precision.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v IBeam /t REG_SZ /d "%CURSOR_DIR%Stolas Text.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v NWPen /t REG_SZ /d "%CURSOR_DIR%Stolas Handwriting.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Handwriting /t REG_SZ /d "%CURSOR_DIR%Stolas Handwriting.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v No /t REG_SZ /d "%CURSOR_DIR%Stolas Unavailable.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNS /t REG_SZ /d "%CURSOR_DIR%Stolas Vertical.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeWE /t REG_SZ /d "%CURSOR_DIR%Stolas Horizontal.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNWSE /t REG_SZ /d "%CURSOR_DIR%Stolas Diagonal 1.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNESW /t REG_SZ /d "%CURSOR_DIR%Stolas Diagonal 2.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeAll /t REG_SZ /d "%CURSOR_DIR%Stolas Move.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Alternate /t REG_SZ /d "%CURSOR_DIR%Stolas Alternate.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v UpArrow /t REG_SZ /d "%CURSOR_DIR%Stolas Alternate.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Hand /t REG_SZ /d "%CURSOR_DIR%Stolas Link.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Link /t REG_SZ /d "%CURSOR_DIR%Stolas Link.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d "%CURSOR_DIR%Stolas Person.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d "%CURSOR_DIR%Stolas Location.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d "%CURSOR_DIR%Stolas Location.ani" /f >nul

reg add "HKCU\Control Panel\Cursors" /v "Scheme Source" /t REG_SZ /d "" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Scheme Name" /t REG_SZ /d "%SCHEME_NAME%" /f >nul

set "SCHEME_LINE=%CURSOR_DIR%Stolas.ani,%CURSOR_DIR%Stolas Help.ani,%CURSOR_DIR%Stolas Working.ani,%CURSOR_DIR%Stolas Busy.ani,%CURSOR_DIR%Stolas Precision.ani,%CURSOR_DIR%Stolas Text.ani,%CURSOR_DIR%Stolas Handwriting.ani,%CURSOR_DIR%Stolas Unavailable.ani,%CURSOR_DIR%Stolas Vertical.ani,%CURSOR_DIR%Stolas Horizontal.ani,%CURSOR_DIR%Stolas Diagonal 1.ani,%CURSOR_DIR%Stolas Diagonal 2.ani,%CURSOR_DIR%Stolas Move.ani,%CURSOR_DIR%Stolas Alternate.ani,%CURSOR_DIR%Stolas Link.ani"
reg add "HKCU\Control Panel\Cursors\Schemes" /v "%SCHEME_NAME%" /t REG_SZ /d "%SCHEME_LINE%" /f >nul

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_stolas.ps1" "%CURSOR_DIR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal

