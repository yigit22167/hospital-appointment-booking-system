using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.

        public PatientsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/patients/{id}
        // Fetches patient details by their ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(Guid id)
        {
            var patient = await _context.Patients.FindAsync(id);

            // If patient not found, return 404 NotFound
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }

            return Ok(patient);  // Return the patient data as a response
        }

        // GET: api/patients/patient-data
        // Retrieves patient data for the logged-in user using JWT authentication
        [Authorize]
        [HttpGet("patient-data")]
        public async Task<IActionResult> GetPatientData()
        {
            // Extract userId from the claims in the authentication cookie
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // If userId is null or empty, the user is not authenticated
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated.");
            }

            // Fetch the patient using the extracted userId from the claims
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id.ToString() == userId);

            // If no patient found, return 404 NotFound
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }

            return Ok(patient);  // Return the patient data as a response
        }

        // PUT: api/patients/update/{id}
        // Updates the patient's information
        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdatePatient(int id, [FromBody] PatientUpdateDto patientUpdateDto)
        {
            // Find the patient by ID
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Id == id);

            // If patient is not found, return 404 NotFound
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }

            // Update patient details only if provided in the request body
            patient.Name = patientUpdateDto.Name ?? patient.Name;
            patient.Surname = patientUpdateDto.Surname ?? patient.Surname;
            patient.Phone = patientUpdateDto.Phone ?? patient.Phone;
            patient.Address = patientUpdateDto.Address ?? patient.Address;
            patient.BirthDate = patientUpdateDto.Birthdate != default ? patientUpdateDto.Birthdate : patient.BirthDate;
            patient.Gender = patientUpdateDto.Gender ?? patient.Gender;

            // Save changes to the database
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Patient updated successfully." });  // Return success message
        }
    }
}
