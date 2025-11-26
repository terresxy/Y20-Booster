@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir_Animacoes_Janelas_Menus.reg"
exit
