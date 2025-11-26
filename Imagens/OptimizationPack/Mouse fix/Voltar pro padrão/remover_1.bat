@echo off
chcp 65001 >nul
cls
echo ========================================
echo   Removendo Mouse Fix - Voltando ao Padrão
echo ========================================
echo.

REM Obtém o caminho completo da pasta atual
set "REG_PATH=%~dp0removemousefix.reg"

REM Verifica se o arquivo .reg existe
if not exist "%REG_PATH%" (
    echo ERRO: Arquivo .reg não encontrado!
    echo Caminho esperado: %REG_PATH%
    echo.
    pause
    exit /b 1
)

echo Aplicando registro do Windows para remover Mouse Fix...
regedit /s "%REG_PATH%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Mouse Fix removido com sucesso!
    echo ========================================
    echo.
    echo Para sentir a diferença, é necessário reiniciar o PC.
    echo.
) else (
    echo.
    echo ERRO: Falha ao aplicar o registro.
    echo.
)

pause

