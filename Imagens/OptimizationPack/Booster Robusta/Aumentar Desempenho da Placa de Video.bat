@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Aumentar Desempenho da Placa de Video.reg"
exit
