@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Remover Animação de janela(minimizar&maximizae).reg"
exit
