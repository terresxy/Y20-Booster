@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar SmartSceen e Downloads Blocks.reg"
exit
