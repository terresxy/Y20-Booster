@echo off
title Limpar arquivos temporarios do usuario
echo.
echo Este script apaga arquivos temporarios da pasta %%TEMP%% do usuario atual.
echo Feche programas antes de continuar.
echo.
echo Limpando %%TEMP%% do usuario...
del /f /s /q "%TEMP%\*.*" >nul 2>&1
for /d %%i in ("%TEMP%\*") do rd /s /q "%%i" 2>nul
echo.
echo Concluido.


