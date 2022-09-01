@echo off

rem java -Xmx128m -jar ./resource/service/Server.jar &
rem sleep 10

rmdir /S /Q built 1> nul

call npm run build 
cd ./built
call npm run js &
cd ..