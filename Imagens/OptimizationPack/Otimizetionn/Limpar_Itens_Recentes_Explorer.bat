@echo off
title Limpar itens recentes do Explorer
echo.
echo Limpando lista de itens recentes do Windows Explorer...
del /f /q "%APPDATA%\Microsoft\Windows\Recent\*.*" >nul 2>&1
del /f /q "%APPDATA%\Microsoft\Windows\Recent\AutomaticDestinations\*.*" >nul 2>&1
del /f /q "%APPDATA%\Microsoft\Windows\Recent\CustomDestinations\*.*" >nul 2>&1
echo.
echo Itens recentes limpos.


