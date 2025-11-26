@echo off
title Desativar Game Bar e Xbox DVR (melhorar desempenho em jogos)
echo.
echo Desativando Game Bar (usuario atual)...
reg add "HKCU\Software\Microsoft\GameBar" /v "ShowGameBarNotifications" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\GameBar" /v "UseNexusForGameBarEnabled" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Desativando Game DVR (quando possivel)...
reg add "HKCU\System\GameConfigStore" /v "GameDVR_Enabled" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows\GameDVR" /v "AllowGameDVR" /t REG_DWORD /d 0 /f >nul 2>&1
echo.
echo Game Bar e Xbox DVR desativados (podem exigir reinicio da sessao ou do sistema).


