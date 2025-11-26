@echo off
title Limpar cache/standby de memoria com EmptyStandbyList
echo.
echo ATENCAO:
echo  - Este script precisa do arquivo EmptyStandbyList.exe na mesma pasta.
echo  - Ele limpa listas de standby/trabalho da memoria (nao e oficial da Microsoft).
echo  - Use por sua conta e risco. Feche programas importantes antes.
echo.
if not exist "EmptyStandbyList.exe" (
  echo EmptyStandbyList.exe nao encontrado nesta pasta.
  echo Baixe-o e coloque aqui antes de rodar este .bat.
  goto :fim
)
echo Limpando StandbyList...
EmptyStandbyList.exe standbylist
echo Limpando ModifiedPageList...
EmptyStandbyList.exe modifiedpagelist
echo Limpando WorkingSets...
EmptyStandbyList.exe workingsets
echo.
echo Limpeza de cache/standby solicitada. Verifique o uso de memoria no Gerenciador de Tarefas.
:fim


