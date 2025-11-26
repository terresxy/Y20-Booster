@echo off
title Resetar pilha TCP/IP e Winsock
echo.
echo Este script reseta configuracoes de rede (TCP/IP e Winsock).
echo E recomendado executar como Administrador e reiniciar o PC depois.
echo.
netsh int ip reset
netsh winsock reset
echo.
echo Concluido. Reinicie o computador para aplicar totalmente.


