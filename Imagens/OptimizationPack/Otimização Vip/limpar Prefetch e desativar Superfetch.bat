@echo off
title Limpeza Prefetch e Superfetch
color 0E

echo Limpando Prefetch...
del /f /s /q C:\Windows\Prefetch\*.*

echo OK!

echo Desativando Superfetch (SysMain)...
net stop SysMain
sc config SysMain start=disabled

echo OK!

echo Script concluido. Reinicie o PC para aplicar todas as mudanças.
pause
