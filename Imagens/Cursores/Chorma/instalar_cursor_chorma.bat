@echo off
setlocal

set "CURSOR_DIR=%~dp0"
set "SCHEME_NAME=Chorma Shadow"

echo Aplicando esquema de cursor Chorma Shadow...

reg add "HKCU\Control Panel\Cursors" /v Arrow /t REG_SZ /d "%CURSOR_DIR%Normal Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Help /t REG_SZ /d "%CURSOR_DIR%Help Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v AppStarting /t REG_SZ /d "%CURSOR_DIR%Working in Background.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Wait /t REG_SZ /d "%CURSOR_DIR%Busy.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Crosshair /t REG_SZ /d "%CURSOR_DIR%Precision Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Precision /t REG_SZ /d "%CURSOR_DIR%Precision Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v IBeam /t REG_SZ /d "%CURSOR_DIR%Text Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v NWPen /t REG_SZ /d "%CURSOR_DIR%Handwriting.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Handwriting /t REG_SZ /d "%CURSOR_DIR%Handwriting.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v No /t REG_SZ /d "%CURSOR_DIR%Unavailable.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNS /t REG_SZ /d "%CURSOR_DIR%Verticle Resize.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeWE /t REG_SZ /d "%CURSOR_DIR%Horizontal Resize.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNWSE /t REG_SZ /d "%CURSOR_DIR%Diagonal Resize 1.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNESW /t REG_SZ /d "%CURSOR_DIR%Diagonal Resize 2.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeAll /t REG_SZ /d "%CURSOR_DIR%Move.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Alternate /t REG_SZ /d "%CURSOR_DIR%Alternate Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v UpArrow /t REG_SZ /d "%CURSOR_DIR%Alternate Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Hand /t REG_SZ /d "%CURSOR_DIR%Link Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Link /t REG_SZ /d "%CURSOR_DIR%Link Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d "%CURSOR_DIR%Link Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d "%CURSOR_DIR%Link Select.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d "%CURSOR_DIR%Link Select.ani" /f >nul

reg add "HKCU\Control Panel\Cursors" /v "Scheme Source" /t REG_SZ /d "" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Scheme Name" /t REG_SZ /d "%SCHEME_NAME%" /f >nul

set "SCHEME_LINE=%CURSOR_DIR%Normal Select.ani,%CURSOR_DIR%Help Select.ani,%CURSOR_DIR%Working in Background.ani,%CURSOR_DIR%Busy.ani,%CURSOR_DIR%Precision Select.ani,%CURSOR_DIR%Text Select.ani,%CURSOR_DIR%Handwriting.cur,%CURSOR_DIR%Unavailable.ani,%CURSOR_DIR%Verticle Resize.ani,%CURSOR_DIR%Horizontal Resize.ani,%CURSOR_DIR%Diagonal Resize 1.ani,%CURSOR_DIR%Diagonal Resize 2.ani,%CURSOR_DIR%Move.ani,%CURSOR_DIR%Alternate Select.ani,%CURSOR_DIR%Link Select.ani"
reg add "HKCU\Control Panel\Cursors\Schemes" /v "%SCHEME_NAME%" /t REG_SZ /d "%SCHEME_LINE%" /f >nul

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_chorma.ps1" "%CURSOR_DIR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal

