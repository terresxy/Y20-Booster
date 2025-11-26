@echo off
title Desativar sugestoes e recomendacoes do Menu Iniciar
echo.
echo Desativando conteudos sugeridos no Menu Iniciar...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SubscribedContent-338389Enabled" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager" /v "SystemPaneSuggestionsEnabled" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Sugestoes do Menu Iniciar desativadas (pode exigir logoff).


