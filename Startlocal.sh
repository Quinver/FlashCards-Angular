#!/bin/bash

# Start backend
echo "Starting backend..."
cd Backend
if [ -f package.json ]; then
    npm install
    npm start &
elif [ -f *.csproj ]; then
    dotnet restore
    dotnet run &
else
    echo "No valid backend start file found!"
    exit 1
fi
cd ..

# Start frontend
echo "Starting frontend..."
cd Frontend
if [ -f package.json ]; then
    npm install
    npm start &
else
    echo "No valid frontend start file found!"
    exit 1
fi

echo "Both backend and frontend are running."
