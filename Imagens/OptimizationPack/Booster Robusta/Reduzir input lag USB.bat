@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir input lag USB.reg"
exit
