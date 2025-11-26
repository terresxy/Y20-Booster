@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desativar Game DVR 2.reg"
exit
