@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar Download Maps Manager.reg"
exit
