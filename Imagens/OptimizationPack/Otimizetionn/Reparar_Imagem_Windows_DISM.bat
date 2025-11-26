@echo off
title Reparar imagem do Windows (DISM)
echo.
echo Verificando saude da imagem do Windows (DISM /ScanHealth)...
DISM /Online /Cleanup-Image /ScanHealth
echo.
echo Reparando imagem do Windows (DISM /RestoreHealth)...
DISM /Online /Cleanup-Image /RestoreHealth
echo.
echo Processo DISM concluido.


