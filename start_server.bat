@echo off
title 🚀 تشغيل سيرفر Node.js
echo ===========================================
echo 🔍 التحقق من تثبيت Node.js...
echo ===========================================

:: التحقق مما إذا كان Node.js مثبتًا
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js غير مثبت على النظام!
    echo 🔹 يرجى تحميل Node.js من: https://nodejs.org/
    pause
    exit
)

echo ✅ Node.js مثبت! جاري تشغيل السيرفر...
echo ===========================================

:: الانتقال إلى مجلد السيرفر
cd /d "%~dp0"

:: التأكد من تثبيت الحزم المطلوبة
if not exist "node_modules" (
    echo ⚙️ تثبيت الحزم المطلوبة...
    npm install
)

:: تشغيل السيرفر في الخلفية
echo 🚀 تشغيل السيرفر...
start /B node server.js

echo ✅ السيرفر يعمل الآن في الخلفية!
echo ===========================================
pause
