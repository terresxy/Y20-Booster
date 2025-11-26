@echo off
title Desativar ID de publicidade de aplicativos
echo.
echo Desativando ID de publicidade do usuario...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo" /v "Enabled" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo ID de publicidade desativado (pode exigir logoff).


