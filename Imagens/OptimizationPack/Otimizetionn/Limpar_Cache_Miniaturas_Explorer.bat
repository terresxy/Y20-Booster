@echo off
title Limpar cache de miniaturas do Explorer
echo.
echo Encerrando o Explorer...
taskkill /f /im explorer.exe >nul 2>&1
echo Limpando arquivos de cache de miniaturas...
del /f /q "%LOCALAPPDATA%\Microsoft\Windows\Explorer\thumbcache_*.db" >nul 2>&1
echo Reiniciando o Explorer...
start explorer.exe
echo.
echo Cache de miniaturas limpo.


