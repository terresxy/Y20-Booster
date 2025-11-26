@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Habilitar a otimização do sistema de arquivos.reg"
exit
