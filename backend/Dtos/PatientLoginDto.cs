using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class PatientLoginDto
    {
        [Required]
        [StringLength(11, MinimumLength = 11)]
        public string UserId { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty; // Plaintext password
    }
}