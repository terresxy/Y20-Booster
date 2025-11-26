@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir tempo de desligamento do pc.reg"
exit
