@echo off
title Otimizacao completa de rede (DNS, IP, TCP/IP, Winsock)
echo.
echo Limpando cache DNS...
call "Limpar_Cache_DNS.bat"
echo.
echo Renovando endereco IP...
call "Renovar_Endereco_IP.bat"
echo.
echo Resetando pilha TCP/IP e Winsock...
call "Resetar_Pilha_TCPIP_Winsock.bat"
echo.
echo Otimizacao de rede concluida.


