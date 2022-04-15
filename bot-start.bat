@echo off

echo       (0) TEST
echo       (1) Update your bot.
echo       (2) Restart
echo       (3) Logger
echo       (4) Exit
set /p input=Choose 0, 1 , 2 , 3 , 4? 
if (%input%) == () goto start
set input=%input:~0,1%
if (%input%) == (4) goto exit
if (%input%) == (0) goto test
if (%input%) == (1) goto update
if (%input%) == (2) goto restart
if (%input%) == (3) goto logger

:test
node ./discord.js
pause
exit


:update
git add .
git commit -m init
git push heroku master
exit

:restart
heroku restart
exit

:logger
heroku logs –t
exit


:exit
exit