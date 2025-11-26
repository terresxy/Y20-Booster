@echo off
title Limpar lixeira de todos os discos
echo.
echo Este script limpa a lixeira de todas as unidades usando PowerShell.
echo.
echo Limpando lixeira de todas as unidades...
powershell -NoLogo -Command "Clear-RecycleBin -Force" 2>nul
echo.
echo Concluido.


