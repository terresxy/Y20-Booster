@echo off
title Ajustar efeitos visuais para melhor desempenho (maquinas fracas)
echo.
echo Ajustando efeitos visuais para melhor desempenho...
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\VisualEffects" /v "VisualFXSetting" /t REG_DWORD /d 2 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "ListviewShadow" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced" /v "TaskbarAnimations" /t REG_DWORD /d 0 /f >nul 2>&1
reg add "HKCU\Control Panel\Desktop" /v "UserPreferencesMask" /t REG_BINARY /d 9012078010000000 /f >nul 2>&1
echo.
echo Efeitos visuais ajustados para melhor desempenho (pode exigir logoff/reinicio).


