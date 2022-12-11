echo %cd%
@echo off

rmdir /S /Q built 1> nul

call npm run build 