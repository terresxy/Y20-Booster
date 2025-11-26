@echo off
title Otimizacao geral maxima (com ponto de restauracao)
echo.
echo Criando ponto de restauracao do sistema...
call "Criar_Ponto_Restauracao_Sistema.bat"
echo.
echo Executando otimizacao completa de limpeza...
call "Otimizacao_Limpeza_Completa.bat"
echo.
echo Executando otimizacao completa de rede...
call "Otimizacao_Rede_Completa.bat"
echo.
echo Executando otimizacao completa de disco...
call "Otimizacao_Disco_Completa.bat"
echo.
echo Verificando integridade de arquivos do sistema (SFC)...
call "Verificar_Integridade_Arquivos_SFC.bat"
echo.
echo Reparando imagem do Windows (DISM)...
call "Reparar_Imagem_Windows_DISM.bat"
echo.
echo Limpando Component Store (WinSxS)...
call "Limpar_ComponentStore_WinSxS.bat"
echo.
echo Otimizando plano de energia para Alto Desempenho...
call "Otimizar_Plano_Energia_Alto_Desempenho.bat"
echo.
echo Desativando hibernacao...
call "Desativar_Hibernacao.bat"
echo.
echo OTIMIZACAO GERAL MAXIMA CONCLUIDA.


