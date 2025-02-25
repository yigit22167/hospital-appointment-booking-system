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
    public class CitiesController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.

        public CitiesController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to retrieve all cities.
        // GET: api/cities
        [HttpGet]
        [Authorize] // Restricts access to authorized users only.
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            // Retrieve all cities from the database.
            var cities = await _context.Cities
                .ToListAsync();

            // Return the list of cities to the client.
            return Ok(cities);
        }
    }
}