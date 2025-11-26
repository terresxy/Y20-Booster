@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Disable Power Throttling.reg"
exit
