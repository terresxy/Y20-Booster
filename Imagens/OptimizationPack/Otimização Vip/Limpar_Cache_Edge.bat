@echo off
title Limpar cache do Microsoft Edge (perfil padrao)
echo.
echo Limpando cache do Edge (perfil Default, se existir)...
taskkill /f /im msedge.exe >nul 2>&1
del /f /s /q "%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache\*.*" >nul 2>&1
for /d %%i in ("%LOCALAPPDATA%\Microsoft\Edge\User Data\Default\Cache\*") do rd /s /q "%%i" 2>nul
echo.
echo Cache do Edge limpo (perfil Default).


