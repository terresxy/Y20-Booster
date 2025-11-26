@echo off
title Otimizacao para notebook na tomada (desempenho)
echo.
echo Ativando plano de energia Alto Desempenho (se disponivel)...
powercfg -setactive scheme_min 2>nul
echo.
echo Mantendo hibernacao ativa para emergencias de bateria...
powercfg -h on
echo.
echo Otimizacao de notebook na tomada focada em desempenho concluida.


