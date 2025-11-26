@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Boost FPS em jogos.reg"
exit
