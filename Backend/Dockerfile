# Build stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Publish stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FlashcardBackend.csproj", "."]
RUN dotnet restore "./FlashcardBackend.csproj"
COPY . .
WORKDIR "/src"
RUN dotnet build "FlashcardBackend.csproj" -c Release -o /app/build
RUN dotnet publish "FlashcardBackend.csproj" -c Release -o /app/publish

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 80

# Ensure database directory exists and has proper permissions
RUN mkdir -p /app/data && chmod -R 777 /app/data

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "FlashcardBackend.dll"]
