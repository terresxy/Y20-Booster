@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Monitore Tolerância a Latência.reg"
exit
