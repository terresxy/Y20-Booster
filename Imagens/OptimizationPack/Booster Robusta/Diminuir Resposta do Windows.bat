@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Diminuir Resposta do Windows.reg"
exit
