using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Doctor
    {
        public int Id { get; set; } // Primary key

        [Required]
        [MaxLength(10)]
        public string Title { get; set; } = string.Empty; // Doctor's title (e.g., Dr., Prof.)

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty; // First name

        [Required]
        [MaxLength(100)]
        public string Surname { get; set; } = string.Empty; // Last name

        // Foreign key to the Hospital table
        [Required]
        public int HospitalId { get; set; }

        // Foreign key to the Department table
        [Required]
        public int DepartmentId { get; set; }

        // Navigation property to the related Department
        public required virtual Department Department { get; set; }

         public virtual Hospital? Hospital { get; set; }

        // Navigation property for appointments
        public virtual ICollection<Appointment>? Appointments { get; set; }
    }
}