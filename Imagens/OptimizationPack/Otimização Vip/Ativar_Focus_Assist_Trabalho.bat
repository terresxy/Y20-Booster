@echo off
title Ativar Focus Assist para trabalho/estudo
echo.
echo Desativando notificacoes de toast globais (quando possivel)...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Notifications\Settings" /v "NOC_GLOBAL_SETTING_TOASTS_ENABLED" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Focus em trabalho/estudo ativado (menos notificacoes; pode exigir logoff).


