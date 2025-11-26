@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Aumentar a taxa de atualização do Windows para desempenho em jogos.reg"
exit
