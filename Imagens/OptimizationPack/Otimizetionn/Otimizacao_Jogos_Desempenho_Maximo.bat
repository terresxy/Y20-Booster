@echo off
title Otimizacao para jogos (desempenho maximo)
echo.
echo Ajustando plano de energia para Alto Desempenho...
call "Otimizar_Plano_Energia_Alto_Desempenho.bat"
echo.
echo Desativando Game Bar e Xbox DVR...
call "Desativar_GameBar_e_XboxDVR.bat"
echo.
echo Limpando cache DNS...
call "Limpar_Cache_DNS.bat"
echo.
echo Otimizando rede para jogos...
call "Otimizacao_Rede_Completa.bat"
echo.
echo Otimizacao para jogos concluida.


