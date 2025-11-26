@echo off
title Otimizacao de privacidade basica (telemetria e anuncios)
echo.
echo Desativando telemetria (nivel basico)...
call "Desativar_Telemetria_Windows_Basica.bat"
echo.
echo Desativando ID de publicidade de aplicativos...
call "Desativar_ID_Publicidade_Apps.bat"
echo.
echo Desativando sugestoes do Menu Iniciar...
call "Desativar_Sugestoes_Menu_Iniciar.bat"
echo.
echo Otimizacao de privacidade basica concluida.


