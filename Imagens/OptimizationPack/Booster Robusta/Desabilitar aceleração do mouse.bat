@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar aceleração do mouse.reg"
exit
