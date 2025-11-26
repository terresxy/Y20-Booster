@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Aumentar o desempenho da placa de vídeo desabilitando a redução de taxa de atualização.reg"
exit
