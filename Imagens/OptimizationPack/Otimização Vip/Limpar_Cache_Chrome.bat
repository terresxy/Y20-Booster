@echo off
title Limpar cache do Google Chrome (perfil padrao)
echo.
echo Limpando cache do Chrome (perfil Default, se existir)...
taskkill /f /im chrome.exe >nul 2>&1
del /f /s /q "%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache\*.*" >nul 2>&1
for /d %%i in ("%LOCALAPPDATA%\Google\Chrome\User Data\Default\Cache\*") do rd /s /q "%%i" 2>nul
echo.
echo Cache do Chrome limpo (perfil Default).


