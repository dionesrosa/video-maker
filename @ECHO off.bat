@ECHO off

SET ROOT_KEY="HKEY_CURRENT_USER"


FOR /f "skip=2 tokens=3" %%i in ('reg query HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Nls\CodePage /v OEMCP') do set OEMCP=%%i

ECHO System default values:

ECHO.
ECHO ...............................................
ECHO Select Codepage 
ECHO ...............................................
ECHO.
ECHO 1 - CP1252
ECHO 2 - UTF-8
ECHO 3 - CP850
ECHO 4 - ISO-8859-1
ECHO 5 - ISO-8859-15
ECHO 6 - US-ASCII
ECHO.
ECHO 9 - Reset to System Default (CP%OEMCP%)
ECHO 0 - EXIT
ECHO.


SET /P  CP="Select a Codepage: "

if %CP%==1 (
    echo Set default Codepage to CP1252
    reg add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 1252>nul" /f
) else if %CP%==2 (
    echo Set default Codepage to UTF-8
    reg add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 65001>nul" /f
) else if %CP%==3 (
    echo Set default Codepage to CP850
    reg add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 850>nul" /f
) else if %CP%==4 (
    echo Set default Codepage to ISO-8859-1
    add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 28591>nul" /f
) else if %CP%==5 (
    echo Set default Codepage to ISO-8859-15
    add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 28605>nul" /f
) else if %CP%==6 (
    echo Set default Codepage to ASCII
    add "%ROOT_KEY%\Software\Microsoft\Command Processor" /v Autorun /t REG_SZ /d "@chcp 20127>nul" /f
) else if %CP%==9 (
    echo Reset Codepage to System Default
    reg delete "%ROOT_KEY%\Software\Microsoft\Command Processor" /v AutoRun /f
) else if %CP%==0 (
    echo Bye
) else (
    echo Invalid choice
    pause
)