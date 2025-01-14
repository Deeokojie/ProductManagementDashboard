# Use the official ASP.NET Core runtime as the base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 8080

# Use the SDK for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["ProductManagementDashboard.csproj", "./"]
RUN dotnet restore "ProductManagementDashboard.csproj"

# Install SQLite library
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev && apt-get clean

COPY . . # Copy everything for the build stage
RUN dotnet build -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish /p:SelfContained=false /p:PublishSingleFile=false

# Final image for runtime
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ProductManagementDashboard/products.db /app/products.db # Use the correct relative path
ENTRYPOINT ["dotnet", "ProductManagementDashboard.dll"]







