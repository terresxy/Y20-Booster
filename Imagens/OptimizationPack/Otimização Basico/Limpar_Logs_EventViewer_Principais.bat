@echo off
title Limpar logs principais do Visualizador de Eventos
echo.
echo Limpando logs de Aplicativo, Sistema e Seguranca...
wevtutil cl Application 2>nul
wevtutil cl System 2>nul
wevtutil cl Security 2>nul
echo.
echo Logs principais limpos (quando permitido pelo sistema).


