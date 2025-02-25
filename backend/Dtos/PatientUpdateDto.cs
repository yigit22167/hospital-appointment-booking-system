using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
    public class PatientUpdateDto
    {
        public required string Name { get; set; } 
        public required string Surname { get; set; } 
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public required DateTime Birthdate { get; set; } 
        public required string Gender { get; set; } 
    }
}