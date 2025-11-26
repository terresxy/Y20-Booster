@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar_Sugestoes_Menu_Iniciar.reg"
exit
