@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar serviço de busca do windows.reg"
exit
