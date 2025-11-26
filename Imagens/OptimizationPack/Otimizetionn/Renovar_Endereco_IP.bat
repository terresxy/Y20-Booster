@echo off
title Renovar endereco IP (release/renew)
echo.
echo Este script solta e renova o endereco IP da maquina.
echo Pode derrubar a conexao temporariamente.
echo.
ipconfig /release
ipconfig /renew
echo.
echo Concluido.


