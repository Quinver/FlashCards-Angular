using FlashcardBackend.Data;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

// Configure CORS to allow requests from your Angular app during development
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")  // Allow your Angular frontend
                                .AllowAnyMethod()                      // Allow any HTTP methods (GET, POST, etc.)
                                .AllowAnyHeader();                     // Allow any headers
                      });
});

// Add services to the container.
builder.Services.AddControllers();

// Register the DbContext with the SQLite connection string
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);  // Apply the CORS policy

// Configure the HTTP request pipeline.
app.UseAuthorization();

app.MapControllers();

app.Run();
