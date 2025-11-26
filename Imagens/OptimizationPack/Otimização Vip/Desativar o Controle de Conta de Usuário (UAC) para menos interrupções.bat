@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar o Controle de Conta de Usuário (UAC) para menos interrupções.reg"
exit
