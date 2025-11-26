@echo off
title Desativar transparencias e efeitos acrilicos
echo.
echo Desativando transparencias do Windows...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" /v "EnableTransparency" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Transparencias e efeitos visuais pesados desativados (pode exigir logoff/reinicio).


