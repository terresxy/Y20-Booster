@echo off
title Desativar limitacao de largura de banda QoS
echo.
echo Configurando politica QoS para nao reservar largura de banda...
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\Psched" /v "NonBestEffortLimit" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Limitacao de largura de banda QoS desativada (pode exigir reinicio).


