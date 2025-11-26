@echo off
chcp 65001 >nul
cls
echo ========================================
echo   Aplicando Mouse Fix - Extremo Direita, Rapido
echo ========================================
echo.

REM Obtém o caminho completo da pasta atual
set "REG_PATH=%~dp0Windows_10+8.x_MouseFix_ItemsSize=100%%_Scale=1-to-1_@7-of-11.reg"

REM Verifica se o arquivo .reg existe
if not exist "%REG_PATH%" (
    echo ERRO: Arquivo .reg não encontrado!
    echo Caminho esperado: %REG_PATH%
    echo.
    pause
    exit /b 1
)

echo Aplicando registro do Windows...
regedit /s "%REG_PATH%"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Mouse Fix aplicado com sucesso!
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

