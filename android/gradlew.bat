@echo off
setlocal
set "VERSION=8.13"
set "BASE=%USERPROFILE%\.gradle\sakhi-wrapper"
set "BIN=%BASE%\gradle-%VERSION%\bin\gradle.bat"
if not exist "%BIN%" (
  if not exist "%BASE%" mkdir "%BASE%"
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $z=Join-Path $env:USERPROFILE '.gradle\sakhi-wrapper\gradle-8.13-bin.zip'; Invoke-WebRequest 'https://services.gradle.org/distributions/gradle-8.13-bin.zip' -OutFile $z; Expand-Archive -Force $z (Join-Path $env:USERPROFILE '.gradle\sakhi-wrapper'); Remove-Item -Force $z"
  if errorlevel 1 exit /b 1
)
call "%BIN%" %*
exit /b %errorlevel%
