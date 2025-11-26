@echo off
setlocal

set "CURSOR_DIR=%~dp0"
set "SCHEME_NAME=Eletrick"

echo Aplicando esquema de cursor Eletrick...

reg add "HKCU\Control Panel\Cursors" /v Arrow /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Help /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v AppStarting /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Wait /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Crosshair /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Precision /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v IBeam /t REG_SZ /d "%CURSOR_DIR%Purple text electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v NWPen /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Handwriting /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v No /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNS /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeWE /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNWSE /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNESW /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeAll /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Alternate /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v UpArrow /t REG_SZ /d "%CURSOR_DIR%purple electric.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Hand /t REG_SZ /d "%CURSOR_DIR%Electric Link Select lila.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Link /t REG_SZ /d "%CURSOR_DIR%Electric Link Select lila.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d "%CURSOR_DIR%Electric Link Select lila.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d "%CURSOR_DIR%Electric Link Select lila.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d "%CURSOR_DIR%Electric Link Select lila.ani" /f >nul

reg add "HKCU\Control Panel\Cursors" /v "Scheme Source" /t REG_SZ /d "" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Scheme Name" /t REG_SZ /d "%SCHEME_NAME%" /f >nul

set "SCHEME_LINE=%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%Purple text electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%purple electric.ani,%CURSOR_DIR%Electric Link Select lila.ani"
reg add "HKCU\Control Panel\Cursors\Schemes" /v "%SCHEME_NAME%" /t REG_SZ /d "%SCHEME_LINE%" /f >nul

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_eletrick.ps1" "%CURSOR_DIR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal

