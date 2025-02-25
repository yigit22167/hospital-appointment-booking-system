using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for the database context.

        public HospitalsController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to retrieve hospitals by city.
        // GET: api/hospitals/byCity/{cityId}
        [Authorize] // Ensures this endpoint can only be accessed by authorized users.
        [HttpGet("byCity/{cityId}")]
        public async Task<ActionResult<IEnumerable<HospitalDto>>> GetHospitalsByCity(int cityId)
        {
            // Query the database to find all hospitals in the specified city.
            var hospitals = await _context.Hospitals
                .Where(h => h.CityId == cityId) // Filter hospitals by the city ID.
                .Include(h => h.Doctors) // Include the doctors associated with each hospital.
                .ThenInclude(d => d.Department) // Include the department details for each doctor.
                .Select(h => new HospitalDto // Project the result into HospitalDto objects.
                {
                    Id = h.Id, // Hospital ID.
                    Name = h.Name, // Hospital name.
                    CityName = h.City.Name, // Name of the city where the hospital is located.
                    Doctors = h.Doctors.Select(d => new DoctorDto // List of doctors in the hospital.
                    {
                        Id = d.Id, // Doctor ID.
                        Name = d.Name, // Doctor's first name.
                        Surname = d.Surname, // Doctor's last name.
                        DepartmentName = d.Department.Name // Name of the department the doctor belongs to.
                    }).ToList() // Convert the result to a list.
                })
                .ToListAsync(); // Execute the query asynchronously.

            // Check if no hospitals are found and return a 404 response if necessary.
            if (hospitals == null || !hospitals.Any())
            {
                return NotFound();
            }

            // Return the list of hospitals with an HTTP 200 status.
            return Ok(hospitals);
        }
    }
}
