@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Otimizações de PC fraco.reg"
exit
