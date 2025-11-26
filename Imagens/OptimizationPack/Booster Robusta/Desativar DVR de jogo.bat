@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar DVR de jogo.reg"
exit
