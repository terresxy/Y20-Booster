@echo off
start taskmgr
timeout /t 2 /nobreak >nul
powershell -command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('^{TAB}')"
