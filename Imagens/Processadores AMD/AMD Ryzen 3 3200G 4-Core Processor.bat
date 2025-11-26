@echo off
REM Script convertido de jakd.reg
REM Requer privilégios de administrador

REM Opção 1: Importar diretamente o arquivo .REG (mais confiável)
if exist "jakd.reg" (
    echo Importando arquivo .REG diretamente...
    reg import "jakd.reg" >nul 2>&1
    if %errorlevel% equ 0 (
        echo Arquivo .REG importado com sucesso!
    ) else (
        echo Erro ao importar arquivo .REG. Tentando metodo alternativo...
        goto :metodo2
    )
    goto :fim
)

:metodo2
REM Opção 2: Usar comandos reg add individuais
REM Processador 0
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Component Information" /t REG_BINARY /d 00000000000000000000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 3 3200G 4-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Component Information" /t REG_BINARY /d 00000000000000000100000000000100 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\1" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 2
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Component Information" /t REG_BINARY /d 00000000000000000200000000000200 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\2" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 3
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Component Information" /t REG_BINARY /d 00000000000000000300000000000300 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\3" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 4
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Component Information" /t REG_BINARY /d 00000000000000000400000000000400 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\4" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 5
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Component Information" /t REG_BINARY /d 00000000000000000500000000000500 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\5" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 6
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Component Information" /t REG_BINARY /d 00000000000000000600000000000600 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\6" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 7
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Component Information" /t REG_BINARY /d 00000000000000000700000000000700 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\7" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 8
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Component Information" /t REG_BINARY /d 00000000000000000800000000000800 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\8" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 9
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Component Information" /t REG_BINARY /d 00000000000000000900000000000900 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\9" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 10
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Component Information" /t REG_BINARY /d 00000000000000000a00000000000a00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\10" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 11
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Component Information" /t REG_BINARY /d 00000000000000000b00000000000b00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\11" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 12
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Component Information" /t REG_BINARY /d 00000000000000000c00000000000c00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\12" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 13
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Component Information" /t REG_BINARY /d 00000000000000000d00000000000d00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\13" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 14
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Component Information" /t REG_BINARY /d 00000000000000000e00000000000e00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\14" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

REM Processador 15
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Component Information" /t REG_BINARY /d 00000000000000000f00000000000f00 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Identifier" /t REG_SZ /d "AMD64 Family 25 Model 33 Stepping 2" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Configuration Data" /t REG_BINARY /d ffffffffffffffff0000000000000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "ProcessorNameString" /t REG_SZ /d "AMD Ryzen 7 5800X3D 8-Core Processor           " /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "VendorIdentifier" /t REG_SZ /d "AuthenticAMD" /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "FeatureSet" /t REG_DWORD /d 0x3c3b3dff /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "~MHz" /t REG_DWORD /d 0x00000d42 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Update Status" /t REG_DWORD /d 0x00000001 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Previous Update Revision" /t REG_BINARY /d 0a12200a00000000 /f >nul 2>&1
reg add "HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\15" /v "Platform Specific Field1" /t REG_DWORD /d 0x0a20120a /f >nul 2>&1

echo.
echo Script executado com sucesso!

:fim
echo.
pause
