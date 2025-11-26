@echo off
title Reiniciar Spooler de impressao e limpar fila
echo.
echo Parando servico de Spooler de impressao...
net stop spooler >nul 2>&1
echo Limpando fila de impressao...
del /f /q "%SystemRoot%\System32\spool\PRINTERS\*.*" >nul 2>&1
echo Iniciando novamente o Spooler de impressao...
net start spooler >nul 2>&1
echo.
echo Spooler reiniciado e fila de impressao limpa.


