# Build stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80


# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the .csproj file first to take advantage of Docker's caching mechanism
COPY ["FlashcardBackend/FlashcardBackend.csproj", "FlashcardBackend/"]

# Restore the dependencies
RUN dotnet restore "FlashcardBackend/FlashcardBackend.csproj"

# Copy the rest of the application code
COPY . .

# Set the working directory to where the .csproj file is
WORKDIR /src/FlashcardBackend

# Build the app
RUN dotnet build "FlashcardBackend.csproj" -c Release -o /app/build

# Publish the app
RUN dotnet publish "FlashcardBackend.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80

# Copy the published app
COPY --from=build /app/publish .

# Set environment variable for SQLite database path
ENV ConnectionStrings__DefaultConnection="Data Source=/app/data/CardsApp.db"

ENTRYPOINT ["dotnet", "FlashcardBackend.dll"]

