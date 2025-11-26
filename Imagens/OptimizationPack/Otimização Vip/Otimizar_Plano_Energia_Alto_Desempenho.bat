@echo off
title Otimizar plano de energia para Alto Desempenho
echo.
echo Listando planos de energia atuais...
powercfg -list
echo.
echo Definindo plano de energia Alto Desempenho (se disponivel)...
powercfg -setactive scheme_min 2>nul
echo.
echo Plano de energia ajustado (se o esquema existir).


