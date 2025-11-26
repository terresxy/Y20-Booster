@echo off
setlocal

set "CURSOR_DIR=%~dp0"
set "SCHEME_NAME=Blue Glass"

echo Aplicando esquema de cursor Blue Glass...

reg add "HKCU\Control Panel\Cursors" /v Arrow /t REG_SZ /d "%CURSOR_DIR%BlueglassArrow.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Help /t REG_SZ /d "%CURSOR_DIR%BlueglassHelp.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v AppStarting /t REG_SZ /d "%CURSOR_DIR%BlueglassWorking.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Wait /t REG_SZ /d "%CURSOR_DIR%BlueglassBusy.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Crosshair /t REG_SZ /d "%CURSOR_DIR%BlueGlassPrecision.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Precision /t REG_SZ /d "%CURSOR_DIR%BlueGlassPrecision.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v IBeam /t REG_SZ /d "%CURSOR_DIR%BlueglassTextSelect.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v NWPen /t REG_SZ /d "%CURSOR_DIR%BlueGlassPencil.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Handwriting /t REG_SZ /d "%CURSOR_DIR%BlueGlassPencil.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v No /t REG_SZ /d "%CURSOR_DIR%BlueGlassUnavailable.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNS /t REG_SZ /d "%CURSOR_DIR%BlueglassSizeNS.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeWE /t REG_SZ /d "%CURSOR_DIR%BlueglassSizeWE.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNWSE /t REG_SZ /d "%CURSOR_DIR%BlueglassSizeNWSE.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeNESW /t REG_SZ /d "%CURSOR_DIR%BlueglassSizeNESW.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v SizeAll /t REG_SZ /d "%CURSOR_DIR%BlueglassSizeAll.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Alternate /t REG_SZ /d "%CURSOR_DIR%BlueGlassAlternateSelect.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v UpArrow /t REG_SZ /d "%CURSOR_DIR%BlueGlassAlternateSelect.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Hand /t REG_SZ /d "%CURSOR_DIR%BlueGlassLink.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Link /t REG_SZ /d "%CURSOR_DIR%BlueGlassLink.cur" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Person /t REG_SZ /d "%CURSOR_DIR%BlueGlassBook.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Location /t REG_SZ /d "%CURSOR_DIR%BlueGlassBook.ani" /f >nul
reg add "HKCU\Control Panel\Cursors" /v Pin /t REG_SZ /d "%CURSOR_DIR%BlueGlassBook.ani" /f >nul

reg add "HKCU\Control Panel\Cursors" /v "Scheme Source" /t REG_SZ /d "" /f >nul
reg add "HKCU\Control Panel\Cursors" /v "Scheme Name" /t REG_SZ /d "%SCHEME_NAME%" /f >nul

set "SCHEME_LINE=%CURSOR_DIR%BlueglassArrow.cur,%CURSOR_DIR%BlueglassHelp.ani,%CURSOR_DIR%BlueglassWorking.ani,%CURSOR_DIR%BlueglassBusy.ani,%CURSOR_DIR%BlueGlassPrecision.cur,%CURSOR_DIR%BlueglassTextSelect.cur,%CURSOR_DIR%BlueGlassPencil.cur,%CURSOR_DIR%BlueGlassUnavailable.cur,%CURSOR_DIR%BlueglassSizeNS.cur,%CURSOR_DIR%BlueglassSizeWE.cur,%CURSOR_DIR%BlueglassSizeNWSE.cur,%CURSOR_DIR%BlueglassSizeNESW.cur,%CURSOR_DIR%BlueglassSizeAll.cur,%CURSOR_DIR%BlueGlassAlternateSelect.cur,%CURSOR_DIR%BlueGlassLink.cur"
reg add "HKCU\Control Panel\Cursors\Schemes" /v "%SCHEME_NAME%" /t REG_SZ /d "%SCHEME_LINE%" /f >nul

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_blueglass.ps1" "%CURSOR_DIR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal

