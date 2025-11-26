@echo off
title Limpar cache de memoria (Standby) com RAMMap
cd /d "%~dp0"
echo Limpando cache de memoria (StandbyList)...
"RAMMap.exe" -E
echo Pronto. Verifique o uso de memoria no Gerenciador de Tarefas.