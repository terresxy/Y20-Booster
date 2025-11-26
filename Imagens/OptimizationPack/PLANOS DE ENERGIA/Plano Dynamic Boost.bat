@echo off
echo ⚡ Criando plano Dynamic Boost...
powercfg -duplicatescheme 381b4222-f694-41f0-9685-ff5bb260df2e
powercfg -changename 381b4222-f694-41f0-9685-ff5bb260df2e "Dynamic Boost"
powercfg /setactive 381b4222-f694-41f0-9685-ff5bb260df2e
echo ✅ Dynamic Boost ativado!
pause
