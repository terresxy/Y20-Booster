@echo off
echo 💪 Criando plano PowerX Custom...
powercfg -duplicatescheme 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
powercfg -changename 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c "PowerX Custom"
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
echo ✅ PowerX Custom ativado!
pause
