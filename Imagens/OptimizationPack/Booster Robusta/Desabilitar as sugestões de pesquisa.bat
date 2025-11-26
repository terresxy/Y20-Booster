@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar as sugestões de pesquisa.reg"
exit
