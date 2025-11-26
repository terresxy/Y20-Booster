@echo off
title Otimizador Avançado Y20 BOOSTER
color 0C

echo Limpando arquivos temporários...
del /s /q "%temp%\*.*"
del /s /q "C:\Windows\Temp\*.*"
echo OK!

echo Liberando cache de DNS...
ipconfig /flushdns
echo OK!

echo Finalizando processos pesados...
:: Fecha OneDrive
taskkill /f /im OneDrive.exe

:: Fecha Cortana
taskkill /f /im SearchUI.exe

:: Fecha Xbox Game Bar
taskkill /f /im GameBar.exe
taskkill /f /im GameBarFTServer.exe

:: Fecha Edge em segundo plano
taskkill /f /im msedge.exe

:: Fecha Teams
taskkill /f /im Teams.exe

:: Fecha Spotify
taskkill /f /im Spotify.exe

echo OK!

echo Finalizando serviços desnecessários...
net stop DiagTrack
net stop MapsBroker
net stop SysMain
net stop Fax
net stop Spooler

echo OK!

echo Limpando cache de miniaturas...
del /f /s /q "%LocalAppData%\Microsoft\Windows\Explorer\thumbcache_*.db"
echo OK!

echo Otimização concluída. Recomendo reiniciar o PC para aplicar tudo.
pause
