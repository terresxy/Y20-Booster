@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar_Historico_Itens_Recentes_Start_Taskbar.reg"
exit
