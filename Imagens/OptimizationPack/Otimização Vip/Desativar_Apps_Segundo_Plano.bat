@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar_Apps_Segundo_Plano.reg"
exit
