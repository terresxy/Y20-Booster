@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Ajustar o tamanho do cache de memória para desempenho em jogos.reg"
exit
