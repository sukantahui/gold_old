@echo off

REM Check if filename is provided
if "%~1"=="" (
    echo Usage:
    echo remigrate_file.bat migration_filename.php
    echo Example:
    echo remigrate_file.bat 2026_02_13_120000_create_closing_balances_table.php
    exit /b 1
)

set FILE=database/migrations/%~1

echo.
echo Rolling back migration (if exists)...
php artisan migrate:rollback --path=%FILE%

echo.
echo Running migration again...
php artisan migrate --path=%FILE%

echo.
echo Remigration completed.
pause
