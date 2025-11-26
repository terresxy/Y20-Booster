@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir o tempo de Resposta.reg"
exit
