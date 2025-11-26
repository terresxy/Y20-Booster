@echo off
title Y20 BOOSTER - Painel Dev
color 0A
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo ========================================
echo   Y20 BOOSTER - PAINEL DEV
echo ========================================
echo.
echo Este script inicia o painel Electron
echo em modo desenvolvimento.
echo.
echo Para iniciar API e Bot, use: iniciar-tudo.bat
echo.
echo ========================================
echo.

REM Verificar Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js em https://nodejs.org/en/download
    echo.
    pause
    exit /b 1
)

REM Verificar npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERRO: npm nao encontrado!
    echo Instale o Node.js que inclui o npm.
    echo.
    pause
    exit /b 1
)

REM Verificar package.json
if not exist "package.json" (
    echo.
    echo ERRO: package.json nao encontrado nesta pasta.
    echo.
    pause
    exit /b 1
)

REM Instalar dependencias se necessario
if not exist "node_modules" (
    echo [1/2] Instalando dependencias...
    call npm install --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo.
        echo ERRO: Falha ao instalar dependencias.
        echo.
        pause
        exit /b 1
    )
    echo.
) else (
    echo [1/2] Dependencias ja instaladas.
    echo.
)

REM Verificar se electron esta instalado
echo Verificando instalacao do Electron...
call npm list electron >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo AVISO: Electron pode nao estar instalado corretamente.
    echo Tentando reinstalar dependencias...
    call npm install electron --save-dev --no-audit --no-fund
    if %errorlevel% neq 0 (
        echo.
        echo ERRO: Falha ao instalar Electron.
        echo.
        echo Tente executar manualmente: npm install
        echo.
        pause
        exit /b 1
    )
    echo Electron reinstalado com sucesso.
    echo.
) else (
    echo Electron encontrado.
    echo.
)

REM Iniciar o painel
echo [2/2] Iniciando painel em modo dev...
echo.
echo ========================================
echo   PAINEL RODANDO
echo ========================================
echo.
echo O painel sera aberto em uma janela separada.
echo Esta janela ficara aberta mostrando os logs.
echo.
echo Para parar, pressione Ctrl+C
echo ou feche esta janela.
echo.
echo ========================================
echo.

REM Verificar se ja existe uma instancia rodando
tasklist /FI "IMAGENAME eq electron.exe" 2>NUL | find /I /N "electron.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo AVISO: Parece que ja existe uma instancia do Electron rodando.
    echo Isso pode causar conflitos.
    echo.
    echo Se o painel nao abrir, feche todas as instancias do Electron
    echo e execute este script novamente.
    echo.
    timeout /t 3 >nul
)

REM Executar npm run dev diretamente (sem start)
REM Isso mantem o processo rodando e mostra os logs
REM Redirecionar stderr para stdout para capturar todos os erros
echo Executando: npm run dev
echo.
echo IMPORTANTE: Se o painel fechar imediatamente, verifique:
echo 1. Se todas as dependencias foram instaladas corretamente
echo 2. Se o Electron esta instalado (npm list electron)
echo 3. Os logs abaixo para identificar o erro
echo.
echo ========================================
echo   INICIANDO...
echo ========================================
echo.

REM Executar e capturar saida
REM Usar start /wait para garantir que o processo seja aguardado
call npm run dev 2>&1

REM Capturar o código de erro IMEDIATAMENTE após o comando
set EXIT_CODE=%errorlevel%

REM Se o processo terminou muito rapidamente (menos de 2 segundos), pode ser um erro
if %EXIT_CODE% neq 0 (
    echo.
    echo ========================================
    echo   ERRO DETECTADO
    echo ========================================
    echo.
    echo O processo terminou com erro. Verifique as mensagens acima.
    echo.
)

REM Se chegou aqui, o processo terminou
echo.
echo ========================================
echo   PROCESSO FINALIZADO
echo ========================================
echo.

if %EXIT_CODE% neq 0 (
    echo ERRO: O processo terminou com codigo de erro %EXIT_CODE%
    echo.
    echo Possiveis causas:
    echo - Electron nao instalado corretamente
    echo - Dependencias faltando
    echo - Erro no codigo do aplicativo
    echo.
    echo Verifique os logs acima para mais detalhes.
    echo.
) else (
    echo O processo Electron foi encerrado normalmente.
    echo.
)

echo Pressione qualquer tecla para fechar...
pause >nul

endlocal
