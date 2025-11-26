@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Otimizar_Desligamento_Rapido.reg"
exit
