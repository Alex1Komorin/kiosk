REM Win + R
REM shell:startup
REM C:\Users\AL'tara\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup
REM ctr + c - ctr + v
@echo off
chcp 65001 >nul
title React Kiosk App Launcher
echo ========================================
echo    Запуск React приложения (Kiosk)
echo ========================================

REM Проверяем существование папки с приложением
if not exist "C:\WEB\IVITSH\WEBkiosk" (
    echo Ошибка: Папка C:\WEB\IVITSH\WEBkiosk не найдена!
    echo.
    pause
    exit /b 1
)

REM Переходим в папку с приложением
@REM cd /d "C:\kiosk"
cd /d "C:\WEB\IVITSH\WEBkiosk"
REM Проверяем наличие package.json
if not exist "package.json" (
    echo Ошибка: Файл package.json не найден в папке C:\WEB\IVITSH\WEBkiosk!
    echo Убедитесь, что это React приложение.
    echo.
    pause
    exit /b 1
)

echo Папка приложения найдена: C:\WEB\IVITSH\WEBkiosk
echo.

REM Проверяем установлен ли Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Ошибка: Node.js не установлен или не добавлен в PATH!
    echo Установите Node.js с официального сайта: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js обнаружен: 
node --version
echo.

REM Проверяем установлены ли зависимости
if not exist "node_modules\" (
    echo Установка зависимостей npm...
    echo.
    npm install
    if errorlevel 1 (
        echo.
        echo Ошибка при установке зависимостей!
        echo.
        pause
        exit /b 1
    )
    echo.
    echo Зависимости успешно установлены!
    echo.
)

echo Запуск React приложения...
echo Приложение будет доступно по адресу: http://localhost:3000
echo.
echo Для остановки нажмите Ctrl+C
echo ========================================
echo.

REM Запускаем приложение
npm start

REM Если скрипт дошел сюда, значит приложение было остановлено
echo.
echo ========================================
echo Приложение остановлено
echo ========================================
pause