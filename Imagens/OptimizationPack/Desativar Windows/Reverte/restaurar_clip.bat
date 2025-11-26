@echo off
echo Restaurando serviços e permissões do GeForce Experience...

:: Reinicia serviços da NVIDIA
net stop "NVIDIA Display Container LS"
net start "NVIDIA Display Container LS"

net stop "NVIDIA LocalSystem Container"
net start "NVIDIA LocalSystem Container"

net stop "NVIDIA Telemetry Container"
net start "NVIDIA Telemetry Container"

:: Reativa overlay e gravação no registro
reg add "HKCU\Software\NVIDIA Corporation\Global\ShadowPlay" /v Enable /t REG_DWORD /d 1 /f
reg add "HKCU\Software\NVIDIA Corporation\Global\ShadowPlay" /v AllowDesktopCapture /t REG_DWORD /d 1 /f
reg add "HKCU\Software\NVIDIA Corporation\Global\ShadowPlay" /v AllowGameCapture /t REG_DWORD /d 1 /f

:: Reativa o Share overlay
reg add "HKCU\Software\NVIDIA Corporation\NvNode\Share" /v Enabled /t REG_DWORD /d 1 /f

echo Concluído. Reinicie o PC e teste o clipping com Alt+F10.
pause
