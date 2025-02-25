using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.
        
        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to retrieve all departments.
        // GET: api/departments
        [HttpGet]
        [Authorize] // Restricts access to authorized users only.
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            // Retrieve all departments from the database.
            var departments = await _context.Departments
                .ToListAsync();

            // Return 404 if no departments found.
            if (departments == null || !departments.Any())
            {
                return NotFound();
            }

            return departments;
        }

        // Endpoint to retrieve departments by hospital ID.
        // GET: api/departments/byHospital/{hospitalId}
        [Authorize] // Restricts access to authorized users only.
        [HttpGet("byHospital/{hospitalId}")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartmentsByHospital(int hospitalId)
        {
            // Retrieve doctors associated with the specified hospital.
            var doctors = await _context.Doctors
                .Where(d => d.HospitalId == hospitalId)
                .Include(d => d.Department)  // Include department details.
                .ToListAsync();

            // Return 404 if no doctors are found in the hospital.
            if (!doctors.Any())
            {
                return NotFound();
            }

            // Extract distinct departments from the list of doctors.
            var departments = doctors
                .Select(d => d.Department)
                .Distinct()  // Remove duplicate departments.
                .ToList();

            // Return the list of departments.
            return Ok(departments);
        }
    }
}
