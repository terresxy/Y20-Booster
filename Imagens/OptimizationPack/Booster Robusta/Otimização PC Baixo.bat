@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Otimização PC Baixo.reg"
exit
