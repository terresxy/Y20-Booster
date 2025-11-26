@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar limpeza de disco automática.reg"
exit
