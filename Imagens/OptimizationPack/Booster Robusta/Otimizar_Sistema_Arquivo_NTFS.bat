@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Otimizar_Sistema_Arquivo_NTFS.reg"
exit
