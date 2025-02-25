using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class PatientSignupDto
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string Surname { get; set; } = string.Empty;

        [Required]
        [StringLength(11, MinimumLength = 11)]
        public string UserId { get; set; } = string.Empty; // Unique identifier for login

        [Required]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty; // Plaintext password (hashed later)

        [MaxLength(20)]
        public string? Phone { get; set; } = string.Empty;

        [MaxLength(150)]
        public string? Address { get; set; } = string.Empty;

        public DateTime? BirthDate { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; } = string.Empty; // Enum-like: "Male", "Female"
    }
}