using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using backend.Models;
using backend.Data;
using backend.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to handle user signup.
        // POST: api/auth/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] PatientSignupDto signupDto)
        {
            // Check if a patient with the same UserId already exists.
            var existingPatient = await _context.Patients
                .FirstOrDefaultAsync(p => p.UserId == signupDto.UserId);
            if (existingPatient != null)
            {
                return BadRequest("User ID already exists.");
            }

            // Hash the password and create a new patient entity.
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(signupDto.Password);
            var patient = new Patient
            {
                Name = signupDto.Name,
                Surname = signupDto.Surname,
                UserId = signupDto.UserId,
                PasswordHash = hashedPassword,
                Phone = signupDto.Phone,
                Address = signupDto.Address,
                BirthDate = signupDto.BirthDate,
                Gender = signupDto.Gender
            };

            // Add the new patient to the database and save changes.
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return Ok("Signup successful!");
        }

        // Endpoint to handle user login.
        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PatientLoginDto loginDto)
        {
            // Find the patient by UserId.
            var patient = await _context.Patients
                .FirstOrDefaultAsync(p => p.UserId == loginDto.UserId);
            
            // Check if the patient exists and verify the password.
            if (patient == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, patient.PasswordHash))
            {
                return Unauthorized("Invalid UserId or Password.");
            }

            // Create claims for the authenticated user.
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, $"{patient.Name} {patient.Surname}"),
                new Claim(ClaimTypes.NameIdentifier, patient.Id.ToString())
            };

            // Create a ClaimsIdentity and ClaimsPrincipal for cookie authentication.
            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);

            // Sign in the user and store the authentication cookie.
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal);

            return Ok(new { Message = "Login successful!" });
        }

        // Endpoint to handle user logout.
        // POST: api/auth/logout
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            // Sign out the user and remove the authentication cookie.
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { Message = "Logout successful!" });
        }

        // Endpoint to verify if a user is authenticated.
        [Authorize]
        [HttpGet("verifyUser")]
        public async Task<IActionResult> VerifyUser()
        {
            // Retrieve the authenticated user's ID from claims.
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User is not authenticated.");
            }

            // Find the patient by ID in the database.
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id.ToString() == userId);

            if (patient == null)
            {
                return Unauthorized("User not found.");
            }

            // Return a success message along with the user ID.
            return Ok(new { Message = "User is authenticated.", UserId = userId });
        }
    }
}
