using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Hospital
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = string.Empty;// Optional, Max 100 characters

        [MaxLength(100)]
        public string? Phone { get; set; }

        [Required]
        public int CityId { get; set; }

        public required virtual City City { get; set; } // Navigation property

        // Navigation property to access all doctors in this hospital
        public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    }
}