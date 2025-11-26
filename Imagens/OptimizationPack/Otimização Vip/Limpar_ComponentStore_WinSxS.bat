@echo off
title Limpar Component Store (WinSxS)
echo.
echo Limpando e otimizando o armazenamento de componentes (WinSxS)...
DISM /Online /Cleanup-Image /StartComponentCleanup /ResetBase
echo.
echo Limpeza do Component Store concluida.


