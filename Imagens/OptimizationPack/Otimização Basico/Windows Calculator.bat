@echo off
title Remover Windows Calculator
color 0C

echo Removendo Windows Calculator...
powershell -Command "Get-AppxPackage *windowscalculator* | Remove-AppxPackage"

echo Concluido. Reinicie o PC para aplicar a mudança.
pause
