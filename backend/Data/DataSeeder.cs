using backend.Data;
using backend.Models;

namespace backend.Data
{
    public class DataSeeder
    {
        private readonly AppDbContext _context;

        public DataSeeder(AppDbContext context) // Dependency Injection ile context'i al
        {
            _context = context;
        }

        public void Seed()
        {
            SeedCities();
            SeedDepartments();
            SeedHospitals();
            SeedDoctors();
        }

        private void SeedDepartments()
        {
            if (!_context.Departments.Any()) // Eğer tablo boşsa ekle
            {
                var departments = new[]
                {
                    new Department { Name = "Kardiyoloji" },
                    new Department { Name = "Nöroloji" },
                    new Department { Name = "Ortopedi" },
                    new Department { Name = "Göz Hastalıkları" },
                    new Department { Name = "Genel Cerrahi" }
                };

                _context.Departments.AddRange(departments);
                _context.SaveChanges();
            }
        }

        private void SeedCities()
        {
            if (!_context.Cities.Any())
            {
                var cities = new[]
                {
                    new City { Name = "Adana" },
                    new City { Name = "Sakarya" },
                    new City { Name = "Ankara" },
                    new City { Name = "İzmir" },
                    new City { Name = "Amasya" }
                };

                _context.Cities.AddRange(cities);
                _context.SaveChanges();
            }
        }

        private void SeedHospitals()
{
    if (!_context.Hospitals.Any())
    {
        var hospitals = new[]
        {
            new Hospital { Name = "Adana Devlet Hastanesi", Address = "Adana Merkez", CityId = 1, City = _context.Cities.Find(1)! },
            new Hospital { Name = "Sakarya Eğitim ve Araştırma Hastanesi", Address = "Sakarya Merkez", CityId = 2, City = _context.Cities.Find(2)! },
            new Hospital { Name = "Ankara Şehir Hastanesi", Address = "Ankara Çankaya", CityId = 3, City = _context.Cities.Find(3)! },
            new Hospital { Name = "İzmir Atatürk Eğitim ve Araştırma Hastanesi", Address = "İzmir Karşıyaka", CityId = 4, City = _context.Cities.Find(4)! },
            new Hospital { Name = "Amasya Devlet Hastanesi", Address = "Amasya Merkez", CityId = 5, City = _context.Cities.Find(5)! }
        };

        _context.Hospitals.AddRange(hospitals);
        _context.SaveChanges();
    }
}


        private void SeedDoctors()
{
    if (!_context.Doctors.Any())
    {
        var doctors = new[]
        {
            new Doctor { 
                Title = "Prof", Name = "Ahmet", Surname = "Sevili", HospitalId = 1, 
                DepartmentId = 1, Department = _context.Departments.Find(1)!
            },
            new Doctor { 
                Title = "Dr.", Name = "Hacı", Surname = "Yetmez", HospitalId = 3, 
                DepartmentId = 2, Department = _context.Departments.Find(2)!
            },
            new Doctor { 
                Title = "Prof", Name = "Mehmet", Surname = "Güllü", HospitalId = 4, 
                DepartmentId = 1, Department = _context.Departments.Find(1)!
            },
            new Doctor { 
                Title = "Doç", Name = "Yakup", Surname = "Özveren", HospitalId = 5, 
                DepartmentId = 3, Department = _context.Departments.Find(3)!
            },
            new Doctor { 
                Title = "Doç", Name = "Hasip", Surname = "Oduncu", HospitalId = 3, 
                DepartmentId = 5, Department = _context.Departments.Find(5)!
            }
        };

        _context.Doctors.AddRange(doctors);
        _context.SaveChanges();
    }
}

    }
}
