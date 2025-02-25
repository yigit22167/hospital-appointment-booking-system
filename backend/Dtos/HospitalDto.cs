using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos
{
public class HospitalDto
{
    public required int Id { get; set; }
    public required string Name { get; set; }
    public required string CityName { get; set; }
    public required List<DoctorDto> Doctors { get; set; }
}
}