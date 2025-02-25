using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.

        public DoctorsController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to retrieve all doctors.
        // GET: api/doctors
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            // Retrieve all doctors, including their associated department details.
            var doctors = await _context.Doctors
                .Include(d => d.Department)
                .ToListAsync();

            // Return 404 if no doctors are found.
            if (doctors == null || !doctors.Any())
            {
                return NotFound();
            }

            // Return the list of doctors.
            return doctors;
        }

        // Endpoint to retrieve doctors by hospital and department.
        // GET: api/doctors/{hospitalId}/{departmentId}
        [Authorize]
        [HttpGet("{hospitalId}/{departmentId}")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctorsByHospitalAndDepartment(int hospitalId, int departmentId)
        {
            // Retrieve doctors based on the specified hospital and department.
            var doctors = await _context.Doctors
                .Where(d => d.HospitalId == hospitalId && d.DepartmentId == departmentId)
                .Include(d => d.Department)
                .ToListAsync();

            // Return 404 if no matching doctors are found.
            if (!doctors.Any())
            {
                return NotFound();
            }

            // Return the list of matching doctors.
            return Ok(doctors);
        }
    }
}
