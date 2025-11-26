@echo off
title Otimizar ping para jogos online
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
echo Reiniciando servicos principais de rede...
call "Reiniciar_Servicos_Rede_Principais.bat"
echo.
echo Otimizacao de ping para jogos online concluida (reinicie o PC se necessario).


