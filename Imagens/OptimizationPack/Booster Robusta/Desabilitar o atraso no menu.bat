@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar o atraso no menu.reg"
exit
