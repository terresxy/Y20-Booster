@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir input lag (Prioridade do windows).reg"
exit
