@echo off
title Otimizacao para notebook (economia de bateria)
echo.
echo Ativando plano de energia Economia de Energia (se disponivel)...
powercfg -setactive a1841308-3541-4fab-bc81-f71556f20b4a 2>nul
echo.
echo Reativando hibernacao para economizar bateria...
powercfg -h on
echo.
echo Desativando hibernacao hibrida (se ativo)...
powercfg -hibernate off 2>nul
echo.
echo Otimizacao de notebook focada em bateria concluida.


