@echo off
title Otimizacao maxima para PC fraco
echo.
echo Limpando arquivos temporarios do usuario...
call "Limpar_Arquivos_Temporarios_Usuario.bat"
echo.
echo Limpando arquivos temporarios do sistema...
call "Limpar_Arquivos_Temporarios_Sistema.bat"
echo.
echo Limpando lixeira...
call "Limpar_Lixeira_Todos_Discos.bat"
echo.
echo Ajustando efeitos visuais para melhor desempenho...
call "Ativar_Desempenho_Maquinas_Fracas.bat"
echo.
echo Desativando transparencias e efeitos acrilicos...
call "Desativar_Transparencias_e_Efeitos_AcRilicos.bat"
echo.
echo Desativando hibernacao (para liberar espaco)...
call "Desativar_Hibernacao.bat"
echo.
echo Otimizacao maxima para PC fraco concluida.


