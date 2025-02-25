using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public int PatientId { get; set; }  // Foreign Key to Patient
        public int DoctorId { get; set; }  // Foreign Key to Doctor
        public DateTime AppointmentTime { get; set; }

        public required virtual Patient Patient { get; set; }  // Navigation property to Patient
        public required virtual Doctor Doctor { get; set; }  // Navigation property to Doctor
    }
}