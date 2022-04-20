@echo off

echo       (1) Update your bot.
echo       (2) Restart
echo       (3) Logger
echo       (4) Exit
set /p input=Choose 1 , 2 , 3 , 4? 
if (%input%) == () goto start
set input=%input:~0,1%
if (%input%) == (4) goto exit
if (%input%) == (1) goto update
if (%input%) == (2) goto restart
if (%input%) == (3) goto logger



:update
git add .
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