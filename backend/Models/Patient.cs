using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Patient
    {
        public int Id { get; set; } // PK

        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = string.Empty;// NOT NULL, Max 100 characters

        [Required]
        [MaxLength(30)]
        public string Surname { get; set; } = string.Empty;// NOT NULL, Max 100 characters

        [Required]
        [StringLength(11, MinimumLength = 11)]
        public string UserId { get; set; } = string.Empty; // NOT NULL, Max 11 characters

        [Required]
        [MaxLength(255)]
        public string PasswordHash { get; set; } = string.Empty; // Hashed password

        [MaxLength(20)]
        public string? Phone { get; set; } // Optional, Max 20 characters

        [MaxLength(150)]
        public string? Address { get; set; } // Optional, Max 100 characters

        [Column(TypeName = "date")]
        public DateTime? BirthDate { get; set; } // Optional Date Field

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty;// ENUM: Male or Female

        // Navigation property for appointments
        public virtual ICollection<Appointment>? Appointments { get; set; } 
    }
}

