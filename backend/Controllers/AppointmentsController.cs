using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Dtos;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context; // Dependency injection for database context.

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint to book an appointment.
        [HttpPost]
        public async Task<IActionResult> BookAppointment([FromBody] AppointmentDto appointmentDto)
        {
            // Validate the incoming data.
            if (appointmentDto == null)
            {
                return BadRequest("Invalid appointment data.");
            }

            var patient = await _context.Patients.FindAsync(appointmentDto.PatientId);
            var doctor = await _context.Doctors.FindAsync(appointmentDto.DoctorId);

            // Ensure that the appointment time can be parsed correctly.
            DateTime appointmentTime;
            if (DateTime.TryParse(appointmentDto.AppointmentTime.ToString(), out appointmentTime))
            {
                // Create a new appointment entity based on the incoming DTO.
                var appointment = new Appointment
                {
                    PatientId = appointmentDto.PatientId,
                    Patient = patient,
                    DoctorId = appointmentDto.DoctorId,
                    Doctor = doctor,
                    AppointmentTime = appointmentTime
                };

                // Add the appointment to the database and save changes.
                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();

                return Ok("Appointment booked successfully.");
            }
            else
            {
                // Return a bad request if the appointment time is invalid.
                return BadRequest("Invalid appointment time.");
            }
        }

        // Endpoint to retrieve booked appointments for a specific doctor on a specific date.
        [HttpGet("byDoctor/{doctorId}/byDate/{date}")]
        public async Task<IActionResult> GetBookedAppointments(int doctorId, DateTime date)
        {   
            // Query appointments for the specified doctor and date.
            var appointments = await _context.Appointments
                .Where(a => a.DoctorId == doctorId && a.AppointmentTime.Date == date)
                .Select(a => a.AppointmentTime.ToString("HH:mm")) // Format as hours and minutes.
                .ToListAsync();

            return Ok(appointments);
        }

        // Endpoint to retrieve appointments by a specific patient.
        [HttpGet("byPatient/{patientId}")]
        public async Task<IActionResult> GetAppointmentsByPatient(int patientId)
        {
            try
            {
                // Query appointments for the specified patient, including related data.
                var appointments = await _context.Appointments
                    .Where(a => a.PatientId == patientId)
                    .Include(a => a.Doctor) // Include doctor details.
                    .ThenInclude(d => d.Hospital)
                    .ThenInclude(h => h.City)
                    .Include(d => d.Doctor.Department) // Include department details.
                    .OrderBy(a => a.AppointmentTime) // Sort by appointment time.
                    .Select(a => new 
                    {
                        a.Id,
                        a.AppointmentTime,
                        a.Doctor.Title,
                        a.Doctor.Name,
                        a.Doctor.Surname,
                        HospitalName = a.Doctor.Hospital.Name,
                        CityName = a.Doctor.Hospital.City.Name,
                        DepartmentName = a.Doctor.Department.Name // Include department name.
                    })
                    .ToListAsync();

                // If no appointments are found, return a friendly message.
                if (appointments.Count == 0)
                {
                    return Ok(new { message = "No appointments found." });
                }

                // Return the list of appointments.
                return Ok(appointments);

            }
            catch (Exception ex)
            {
                // Handle exceptions and return a 500 status code with error details.
                return StatusCode(500, new { message = "An error occurred while retrieving appointments.", error = ex.Message });
            }
        }
    }
}
