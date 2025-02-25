using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    // DbContext class to interact with the database
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        // DbSets for each entity in the database
        public required DbSet<Patient> Patients { get; set; }
        public required DbSet<Hospital> Hospitals { get; set; }
        public required DbSet<City> Cities { get; set; }
        public required DbSet<Department> Departments { get; set; }
        public required DbSet<Doctor> Doctors { get; set; }
        public required DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Call the base method to ensure default configurations are applied
    base.OnModelCreating(modelBuilder);

    // Create a unique index for the UserId field in the Patient entity
    modelBuilder.Entity<Patient>()
        .HasIndex(u => u.UserId) // Create a unique index for UserId
        .IsUnique(); // Ensure UserId is unique across the Patients table

    // Doctor -> Appointments relationship configuration
    modelBuilder.Entity<Doctor>()
        .HasMany(d => d.Appointments) // A doctor can have many appointments
        .WithOne(a => a.Doctor) // Each appointment is related to one doctor
        .HasForeignKey(a => a.DoctorId) // Define the foreign key in the Appointment table
        .OnDelete(DeleteBehavior.Restrict); // Disable cascading delete

    // Patient -> Appointments relationship configuration
    modelBuilder.Entity<Patient>()
        .HasMany(p => p.Appointments) // A patient can have many appointments
        .WithOne(a => a.Patient) // Each appointment is related to one patient
        .HasForeignKey(a => a.PatientId) // Define the foreign key in the Appointment table
        .OnDelete(DeleteBehavior.Restrict); // Disable cascading delete

    // Appointment -> Doctor and Patient relationships configuration
    modelBuilder.Entity<Appointment>()
        .HasOne(a => a.Doctor) // An appointment has one doctor
        .WithMany(d => d.Appointments) // A doctor can have many appointments
        .HasForeignKey(a => a.DoctorId) // Define the foreign key in the Appointment table
        .OnDelete(DeleteBehavior.Restrict); // Disable cascading delete

    modelBuilder.Entity<Appointment>()
        .HasOne(a => a.Patient) // An appointment has one patient
        .WithMany(p => p.Appointments) // A patient can have many appointments
        .HasForeignKey(a => a.PatientId) // Define the foreign key in the Appointment table
        .OnDelete(DeleteBehavior.Restrict); // Disable cascading delete
}

    }
}
