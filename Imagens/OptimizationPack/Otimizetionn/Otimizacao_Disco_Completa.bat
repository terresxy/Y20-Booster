@echo off
title Otimizacao completa de disco (limpeza + chkdsk + desfragmentacao)
echo.
echo Limpando temporarios do usuario...
call "Limpar_Arquivos_Temporarios_Usuario.bat"
echo.
echo Limpando temporarios do sistema...
call "Limpar_Arquivos_Temporarios_Sistema.bat"
echo.
echo Limpando pasta Prefetch...
call "Limpar_Pasta_Prefetch.bat"
echo.
echo Verificando disco C com CHKDSK...
call "Verificar_Disco_C_CHKDSK.bat"
echo.
echo Desfragmentando disco C...
call "Desfragmentar_Disco_C.bat"
echo.
echo Otimizacao de disco concluida.


