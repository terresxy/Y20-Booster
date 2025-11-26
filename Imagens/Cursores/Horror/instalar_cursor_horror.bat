@echo off
setlocal

set "CURSOR_DIR=%~dp0"

echo Aplicando esquema de cursor Horror...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%CURSOR_DIR%aplicar_cursor_horror.ps1" "%CURSOR_DIR%"

rundll32.exe user32.dll,UpdatePerUserSystemParameters 1 1

echo.
echo Concluido. Abra as configuracoes de mouse se quiser ajustar algo manualmente.
pause

endlocal


