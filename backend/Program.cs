using backend.Data; // Your data context namespace
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), sqlOptions => sqlOptions.EnableRetryOnFailure()));

builder.Services.AddScoped<DataSeeder>();

// Add authentication with cookie-based authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme) // <-- Important to call this first
    .AddCookie(options =>
    {
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.LoginPath = "/api/auth/login";  // Path to redirect to when login is required
        options.ExpireTimeSpan = TimeSpan.FromHours(1);  // Session expiry
        options.SlidingExpiration = true;  // Sliding expiration for the session
        options.LogoutPath = "/api/auth/logout";  // Path to redirect to when the user logs out
        options.AccessDeniedPath = "/backend/auth/access-denied";  // Path for access denied
    });

// Add authorization (optional, depends on whether you need to restrict access)
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:5173") // specify your frontend origin here
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials());  // Allow credentials (cookies)
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");  // Apply the CORS policy

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var seeder = services.GetRequiredService<DataSeeder>();
    seeder.Seed(); // Tohumlama işlemi
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use authentication middleware
app.UseAuthentication();  // <-- Ensure this is called before UseAuthorization
app.UseAuthorization();   // <-- Ensure this comes after UseAuthentication

app.UseHttpsRedirection();

// Map controllers
app.MapControllers();

app.Run();
