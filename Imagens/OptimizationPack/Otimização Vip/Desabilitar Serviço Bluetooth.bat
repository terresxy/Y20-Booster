@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar Serviço Bluetooth.reg"
exit
