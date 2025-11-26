@echo off
title Desativar telemetria do Windows (nivel basico)
echo.
echo Ajustando politicas de coleta de dados para o minimo...
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\DataCollection" /v "AllowTelemetry" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Telemetria ajustada para o nivel mais baixo permitido (pode exigir reinicio).


