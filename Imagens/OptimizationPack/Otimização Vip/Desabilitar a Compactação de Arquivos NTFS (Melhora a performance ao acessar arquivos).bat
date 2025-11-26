@echo off
chcp 65001 >nul
cd /d "%~dp0"
regedit /s "Desabilitar a Compactação de Arquivos NTFS (Melhora a performance ao acessar arquivos).reg"
exit
