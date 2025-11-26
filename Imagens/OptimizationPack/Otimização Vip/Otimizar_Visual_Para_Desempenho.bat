@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Otimizar_Visual_Para_Desempenho.reg"
exit
