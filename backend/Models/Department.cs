using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Department
    {
        public int Id { get; set; } // Primary key

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty; // City name
    }
}