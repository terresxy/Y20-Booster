::[Bat To Exe Converter]
::
::fBE1pAF6MU+EWHreyHcjLQlHcByaJFeeCbYJ5e31+/m7g1gJW9IzeZab97GKKeFT2VHxcZ8iliJmqNkDBh5bagGXVk8EiEdsk0jFZYnMjyzFdXqG6V8MOnBgiFPcjTIHRNxrif8g3DCn7kT4l7FexWDrPg==
::YAwzoRdxOk+EWAjk
::fBw5plQjdCyDJGyX8VAjFANMVDiyNWiuE6cZ+9TVwNyo4n08fcwaVLP39ZOhbukQ5SU=
::YAwzuBVtJxjWCl3EqQJgSA==
::ZR4luwNxJguZRRnk
::Yhs/ulQjdF+5
::cxAkpRVqdFKZSDk=
::cBs/ulQjdF+5
::ZR41oxFsdFKZSDk=
::eBoioBt6dFKZSDk=
::cRo6pxp7LAbNWATEpCI=
::egkzugNsPRvcWATEpCI=
::dAsiuh18IRvcCxnZtBJQ
::cRYluBh/LU+EWAnk
::YxY4rhs+aU+IeA==
::cxY6rQJ7JhzQF1fEqQJhZksaHErSXA==
::ZQ05rAF9IBncCkqN+0xwdVsFAlTMbCXqZg==
::ZQ05rAF9IAHYFVzEqQJ7DitnLA==
::eg0/rx1wNQPfEVWB+kM9LVsJDE+kDFja
::fBEirQZwNQPfEVWB+kM9LVsJDGQ=
::cRolqwZ3JBvQF1fEqQJQ
::dhA7uBVwLU+EWFCq3WwaCT1kf2Q=
::YQ03rBFzNR3SWATElA==
::dhAmsQZ3MwfNWATE/WwZBjF1ajSxXA==
::ZQ0/vhVqMQ3MEVWAtB9wSA==
::Zg8zqx1/OA3MEVWAtB9wSA==
::dhA7pRFwIByZRRnk
::Zh4grVQjdCyDJGyX8VAjFANMVDimM2ivC7AS/PvHzv+TrX0RVft/VYrf07XOE/QG7kzrNc4R5mhVks4PGAhkRlKbTyYajEIC5CrVC+S4jD3uRVy1x14kFFV4hnrsqCQ4c+8jvPMwnSWm+S0=
::YB416Ek+ZG8=
::
::
::978f952a14a936cc963da21a135fa983
color A
cls
cmd...
:START
cls
%homedrive%
cd %USERPROFILE%
cd..
set profiles=%cd%

for /f "tokens=* delims= " %%u in ('dir /b/ad') do (

cls
title Deletando %%u COOKIES. . .
if exist "%profiles%%%u\cookies" echo Deletando....
if exist "%profiles%%%u\cookies" cd "%profiles%%%u\cookies"
if exist "%profiles%%%u\cookies" del . /F /S /Q /A: R /A: H /A: A

cls
title Deletando %%u Temp Files. . .
if exist "%profiles%%%u\Local Settings\Temp" echo Deletando....
if exist "%profiles%%%u\Local Settings\Temp" cd "%profiles%%%u\Local Settings\Temp"
if exist "%profiles%%%u\Local Settings\Temp" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\Local Settings\Temp" rmdir /s /q "%profiles%%%u\Local Settings\Temp"

cls
title Deletando %%u Temp Files. . .
if exist "%profiles%%%u\AppData\Local\Temp" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Temp" cd "%profiles%%%u\AppData\Local\Temp"
if exist "%profiles%%%u\AppData\Local\Temp" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Temp" rmdir /s /q "%profiles%%%u\AppData\Local\Temp"
cls
title Deletando %%u Temporary Internet Files. . .
if exist "%profiles%%%u\Local Settings\Temporary Internet Files" echo Deletando....
if exist "%profiles%%%u\Local Settings\Temporary Internet Files" cd "%profiles%%%u\Local Settings\Temporary Internet Files"
if exist "%profiles%%%u\Local Settings\Temporary Internet Files" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\Local Settings\Temporary Internet Files" rmdir /s /q "%profiles%%%u\Local Settings\Temporary Internet Files"

cls
title Deletando %%u Temporary Internet Files. . .
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files" cd "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files"
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files" rmdir /s /q "%profiles%%%u\AppData\Local\Microsoft\Windows\Temporary Internet Files"

cls
title Deletando %%u WER Files. . .
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive" cd "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive"
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive" rmdir /s /q "%profiles%%%u\AppData\Local\Microsoft\Windows\WER\ReportArchive"
cls
title Deletando %Systemroot%\Temp
if exist "%Systemroot%\Temp" echo Deletando....
if exist "%Systemroot%\Temp" cd "%Systemroot%\Temp"
if exist "%Systemroot%\Temp" del . /F /S /Q /A: R /A: H /A: A
if exist "%Systemroot%\Temp" rmdir /s /q "%Systemroot%\Temp"

cls
title Deletando %SYSTEMDRIVE%\Temp
if exist "%SYSTEMDRIVE%\Temp" echo Deletando....
if exist "%SYSTEMDRIVE%\Temp" cd "%SYSTEMDRIVE%\Temp"
if exist "%SYSTEMDRIVE%\Temp" del . /F /S /Q /A: R /A: H /A: A
if exist "%SYSTEMDRIVE%\Temp" rmdir /s /q "%Systemroot%\Temp"

cls
title Deletando %%u FIREFOX TEMP. . .
if exist "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles" cd "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles"
if exist "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles" rmdir /s /q "%profiles%%%u\AppData\Local\Mozilla\Firefox\Profiles"

cls
title Deletando %%u CHROME TEMP. . .
if exist "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache" cd "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache"
if exist "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache" rmdir /s /q "%profiles%%%u\AppData\Local\Google\Chrome\User Data\Default\Cache"
cls
title Deletando %%u EDGE TEMP. . .
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache" cd "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache"
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache" rmdir /s /q "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCache"

cls
title Deletando %%u EDGE COOKIES. . .
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies" cd "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies"
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies" rmdir /s /q "%profiles%%%u\AppData\Local\Microsoft\Windows\INetCookies"

cls
title Deletando %%u RDP TEMP. . .
if exist "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache" cd "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache"
if exist "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache" rmdir /s /q "%profiles%%%u\AppData\Local\Microsoft\Terminal Server Client\Cache"
cls
title Deletando %%u OPERA TEMP. . .
if exist "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Cache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Cache" cd "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Cache"
if exist "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Caches" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Cache" rmdir /s /q "%profiles%%%u\AppData\Local\Opera Software\Opera Next\Cache"


cls
title Deletando %%u VIVALDI TEMP. . .
if exist "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache" cd "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache"
if exist "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache" rmdir /s /q "%profiles%%%u\AppData\Local\Vivaldi\User Data\Default\Cache"

cls
title Deletando %%u VIVALDI TEMP. . .
if exist "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache" echo Deletando....
if exist "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache" cd "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache"
if exist "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache" del . /F /S /Q /A: R /A: H /A: A
if exist "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache" rmdir /s /q "%profiles%%%u\AppData\Local\BraveSoftware\Brave-Browser\User Data\Default\Cache"


title Limpeza Concluida. . .
)

cls
exit