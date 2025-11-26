@echo off
title Otimizacao completa de limpeza (temporarios, lixeira, miniaturas, recentes, update)
echo.
echo Limpando arquivos temporarios do usuario...
call "Limpar_Arquivos_Temporarios_Usuario.bat"
echo.
echo Limpando arquivos temporarios do sistema...
call "Limpar_Arquivos_Temporarios_Sistema.bat"
echo.
echo Limpando pasta Prefetch...
call "Limpar_Pasta_Prefetch.bat"
echo.
echo Limpando lixeira de todos os discos...
call "Limpar_Lixeira_Todos_Discos.bat"
echo.
echo Limpando cache de miniaturas do Explorer...
call "Limpar_Cache_Miniaturas_Explorer.bat"
echo.
echo Limpando itens recentes do Explorer...
call "Limpar_Itens_Recentes_Explorer.bat"
echo.
echo Limpando downloads de atualizacoes do Windows Update...
call "Limpar_Atualizacoes_Windows_Download.bat"
echo.
echo Otimizacao de limpeza concluida.


