@echo off
setlocal

set "CURSOR_DIR=%~dp0"
set "COLOR=Gray"

echo Aplicando esquema de cursor Guns (%COLOR%)...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_guns.ps1" -Color "%COLOR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo.
echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal


