@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir_Notificacoes_Toast.reg"
exit
