@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Reduzir_Processos_Inicio_Windows.reg"
exit
