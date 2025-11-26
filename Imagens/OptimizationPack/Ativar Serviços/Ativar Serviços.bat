@echo off
echo Ativando serviços do Windows...

sc config PCasSvc start= auto
sc start PCasSvc

sc config PlugPlay start= auto
sc start PlugPlay

sc config DPS start= auto
sc start DPS

sc config DiagTrack start= auto
sc start DiagTrack

sc config SysMain start= auto
sc start SysMain

sc config Sysmon start= auto
sc start Sysmon

echo Verificando USN Journal...
fsutil usn queryjournal C:
fsutil usn queryjournal E: >nul 2>&1
if errorlevel 1 (
    echo USN Journal não encontrado em E:, ativando...
    fsutil usn createjournal m=1000 a=100 E:
    echo USN Journal ativado em E:
) else (
    echo USN Journal já está ativo em E:
)

echo Finalizado com sucesso.
pause
