@echo off
title Limpar pasta Prefetch
echo.
echo Este script apaga arquivos da pasta C:\Windows\Prefetch.
echo E recomendado executar como Administrador.
echo.
echo Limpando C:\Windows\Prefetch ...
del /f /s /q "C:\Windows\Prefetch\*.*" >nul 2>&1
for /d %%i in ("C:\Windows\Prefetch\*") do rd /s /q "%%i" 2>nul
echo.
echo Concluido.


