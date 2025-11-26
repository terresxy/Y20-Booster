@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar Diagnóstico e Telemetria.reg"
exit
