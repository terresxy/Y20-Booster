@echo off
title Reiniciar servicos principais de rede
echo.
echo Reiniciando servicos de rede principais...
net stop Dhcp >nul 2>&1
net stop Dnscache >nul 2>&1
net stop NlaSvc >nul 2>&1
net start Dhcp >nul 2>&1
net start Dnscache >nul 2>&1
net start NlaSvc >nul 2>&1
echo.
echo Servicos principais de rede reiniciados.


