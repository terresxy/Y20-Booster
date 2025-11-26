@echo off
title Otimizador Y20 BOOSTER
color 0A

echo Limpando arquivos temporários...
del /s /q "%temp%\*.*"
del /s /q "C:\Windows\Temp\*.*"
echo OK!

echo Liberando cache de DNS...
ipconfig /flushdns
echo OK!

echo Finalizando serviços desnecessários...
:: Finaliza serviços de impressão e fax (se não usados)
net stop spooler
net stop Fax

:: Finaliza serviço de diagnóstico (se não usado)
net stop DiagTrack

:: Finaliza serviço de mapas offline
net stop MapsBroker

echo OK!

echo Otimizando inicialização...
:: Remove apps da inicialização (exemplo: Cortana, OneDrive)
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v OneDrive /f
reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v Cortana /f

echo OK!

echo Limpando cache de miniaturas...
del /f /s /q "%LocalAppData%\Microsoft\Windows\Explorer\thumbcache_*.db"
echo OK!

echo Otimização concluída. Recomendo reiniciar o PC.
pause
