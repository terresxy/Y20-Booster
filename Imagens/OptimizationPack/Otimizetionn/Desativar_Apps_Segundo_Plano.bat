@echo off
title Desativar apps em segundo plano (quando possivel)
echo.
echo Configurando politica para impedir apps em segundo plano...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\BackgroundAccessApplications" /v "GlobalUserDisabled" /t REG_DWORD /d 1 /f >nul 2>&1
echo.
echo Apps em segundo plano desativados (quando suportado pela versao do Windows).


