@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Melhorar a eficiência da CPU desabilitando a pausa automática.reg"
exit
