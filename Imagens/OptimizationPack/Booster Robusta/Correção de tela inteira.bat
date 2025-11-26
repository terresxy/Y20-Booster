@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Correção de tela inteira.reg"
exit
