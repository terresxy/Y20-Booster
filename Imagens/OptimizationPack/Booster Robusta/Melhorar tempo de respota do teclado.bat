@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Melhorar tempo de respota do teclado.reg"
exit
