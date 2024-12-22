@echo off
echo Starting backend...
cd Backend

if exist package.json (
    npm install
    start cmd /k "npm start"
) else if exist *.csproj (
    dotnet restore
    start cmd /k "dotnet run"
) else (
    echo No valid backend start file found!
    exit /b 1
)
cd ..

echo Starting frontend...
cd Frontend

if exist package.json (
    npm install
    start cmd /k "npm start"
) else (
    echo No valid frontend start file found!
    exit /b 1
)

echo Both backend and frontend are running.
pause
