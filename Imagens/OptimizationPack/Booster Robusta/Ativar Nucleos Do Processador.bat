@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Ativar Nucleos Do Processador.reg"
exit
