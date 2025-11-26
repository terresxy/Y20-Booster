@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Liberar uso de CPU.reg"
exit
