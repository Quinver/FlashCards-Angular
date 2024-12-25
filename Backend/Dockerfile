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
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "FlashcardBackend.dll"]