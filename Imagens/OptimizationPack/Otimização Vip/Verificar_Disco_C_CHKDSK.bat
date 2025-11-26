@echo off
title Verificar disco C com CHKDSK (pode pedir reboot)
echo.
echo Este script executa CHKDSK no disco C: com correcao de erros.
echo Pode ser necessario reiniciar o computador para concluir.
echo.
echo Executando CHKDSK automaticamente (responde Y se necessario)...
echo Y|chkdsk C: /F /R /X
echo.
echo Se o Windows agendou a verificacao, ela sera feita no proximo boot.


