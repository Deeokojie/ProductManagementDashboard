using Microsoft.EntityFrameworkCore;
using ProductManagementDashboard.Models;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:5244");

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://192.168.1.87:3000") // Allow both local and networked React app origins
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials(); 
    });
});

// Configure DbContext for SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Middleware pipeline
app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowReactApp");

// Handle preflight OPTIONS requests
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204; 
        await context.Response.CompleteAsync();
        return;
    }
    await next();
});

// Authorization middleware
app.UseAuthorization();

// Map controllers
app.MapControllers();

// Run the application
app.Run();
