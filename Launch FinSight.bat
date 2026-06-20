@echo off
title FinSight AI Desktop Launcher
echo ===================================================
echo   FinSight AI — Desktop App Launcher
echo ===================================================
echo.

:: Check if Python is in PATH
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not added to your system PATH.
    echo Please install Python and make sure to check the box:
    echo "[x] Add Python to PATH" during the setup wizard.
    echo.
    pause
    exit /b
)

:: Try to launch the application using pythonw (silent GUI mode)
pythonw desktop.pyw >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] pythonw failed. Launching with standard python console to diagnose...
    echo.
    python desktop.pyw
    
    if %errorlevel% neq 0 (
        echo.
        echo [INFO] Missing dependencies detected. Installing requirements...
        python -m pip install -r requirements.txt
        echo.
        echo [INFO] Re-attempting to launch application...
        pythonw desktop.pyw >nul 2>&1
        if %errorlevel% neq 0 (
            python desktop.pyw
        )
    )
    pause
)
