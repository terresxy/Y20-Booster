@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar Power Throttling2.reg"
exit
