@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar o armazenamento em cache de miniatura.reg"
exit
