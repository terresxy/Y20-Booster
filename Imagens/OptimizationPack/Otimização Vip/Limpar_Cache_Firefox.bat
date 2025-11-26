@echo off
title Limpar cache do Mozilla Firefox (perfil default-release)
echo.
echo Tentando localizar perfil default-release do Firefox...
for /d %%p in ("%APPDATA%\Mozilla\Firefox\Profiles\*.default-release") do (
  echo Limpando cache do perfil %%p...
  del /f /s /q "%%p\cache2\*.*" >nul 2>&1
  for /d %%i in ("%%p\cache2\*") do rd /s /q "%%i" 2>nul
)
echo.
echo Cache do Firefox limpo (se perfil default-release existir).


