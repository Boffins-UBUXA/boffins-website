@echo off
echo ========================================
echo   Strapi Migration Script
echo ========================================
echo.

REM Check if Strapi is running
echo Checking Strapi connection...
curl -s http://localhost:1337 >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo WARNING: Strapi does not appear to be running at http://localhost:1337
    echo.
    echo Please start Strapi first:
    echo   cd path\to\my-strapi-project
    echo   npm run develop
    echo.
    pause
    exit /b 1
)

echo ✓ Strapi is running
echo.

REM Check if ts-node is installed
echo Checking ts-node installation...
npx ts-node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ts-node not found. Installing...
    call npm install -D ts-node
    if %errorlevel% neq 0 (
        echo.
        echo Failed to install ts-node. Please install manually:
        echo   npm install -D ts-node
        echo.
        pause
        exit /b 1
    )
    echo ✓ ts-node installed
) else (
    echo ✓ ts-node is installed
)

echo.
echo ========================================
echo   Starting Migration
echo ========================================
echo.

REM Run the migration
call npm run strapi:sync

echo.
echo ========================================
echo   Migration Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Open http://localhost:1337/admin
echo   2. Login and publish draft content
echo   3. Update Next.js to use Strapi API
echo.
pause
