@echo off
title Limpar downloads de atualizacoes do Windows Update
echo.
echo Parando servicos do Windows Update...
net stop wuauserv /y >nul 2>&1
net stop bits /y >nul 2>&1
net stop cryptSvc /y >nul 2>&1
net stop msiserver /y >nul 2>&1
echo Limpando pasta SoftwareDistribution\Download...
del /f /s /q "%windir%\SoftwareDistribution\Download\*.*" >nul 2>&1
for /d %%i in ("%windir%\SoftwareDistribution\Download\*") do rd /s /q "%%i" 2>nul
echo Reiniciando servicos do Windows Update...
net start wuauserv >nul 2>&1
net start bits >nul 2>&1
net start cryptSvc >nul 2>&1
net start msiserver >nul 2>&1
echo.
echo Limpeza de downloads do Windows Update concluida.


