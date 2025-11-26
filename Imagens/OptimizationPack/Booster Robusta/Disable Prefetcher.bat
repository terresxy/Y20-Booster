@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Disable Prefetcher.reg"
exit
