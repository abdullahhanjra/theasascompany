@echo off
if exist "%~dp0..\..\node_modules\electron\dist\electron.exe" (
  set ELECTRON_RUN_AS_NODE=1
  "%~dp0..\..\node_modules\electron\dist\electron.exe" %*
) else (
  node %*
)
