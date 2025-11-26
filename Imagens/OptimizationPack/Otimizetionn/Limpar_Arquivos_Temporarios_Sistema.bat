@echo off
title Limpar arquivos temporarios do sistema (C:\Windows\Temp)
echo.
echo Este script apaga arquivos temporarios da pasta C:\Windows\Temp.
echo E recomendado executar como Administrador.
echo Feche programas antes de continuar.
echo.
echo Limpando C:\Windows\Temp ...
del /f /s /q "C:\Windows\Temp\*.*" >nul 2>&1
for /d %%i in ("C:\Windows\Temp\*") do rd /s /q "%%i" 2>nul
echo.
echo Concluido.


