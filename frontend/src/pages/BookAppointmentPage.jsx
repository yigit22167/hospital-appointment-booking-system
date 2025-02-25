import React, { useState, useEffect } from "react";
import { useFetchCities } from "../hooks/useFetchCities";
import { useFetchHospitals } from "../hooks/useFetchHospitals";
import { useFetchDepartments } from "../hooks/useFetchDepartments";
import { useFetchDoctors } from "../hooks/useFetchDoctors";
import { useFetchAvailableTimes } from "../hooks/useFetchAvailableTimes";
import useFetchPatientId from "../hooks/useFetchPatientId";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BookAppointmentPage = ({ apiUrl }) => {
  const navigate = useNavigate();
  const cities = useFetchCities(apiUrl);
  const [selectedCity, setSelectedCity] = useState("");

  const hospitals = useFetchHospitals(apiUrl, selectedCity);
  const [selectedHospital, setSelectedHospital] = useState("");

  const departments = useFetchDepartments(apiUrl, selectedHospital);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const doctors = useFetchDoctors(apiUrl, selectedHospital, selectedDepartment);
  const [selectedDoctor, setSelectedDoctor] = useState(0);

  const patientId = useFetchPatientId(apiUrl);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // initial state is null

  const availableTimes = useFetchAvailableTimes(
    apiUrl,
    selectedDoctor,
    selectedDate
  );

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedDoctor || !selectedTime) {
      setError("Please select a date, doctor, and time.");
      return;
    }

    const doctorId = parseInt(selectedDoctor, 10);

    // Convert selectedTime to a Date object, accounting for time zone difference
    const timeParts = selectedTime.split(":");
    const appointmentTime = new Date(selectedDate);
    appointmentTime.setHours(parseInt(timeParts[0], 10) + 3);
    appointmentTime.setMinutes(parseInt(timeParts[1], 10));
    appointmentTime.setSeconds(0);
    appointmentTime.setMilliseconds(0);

    const isoAppointmentTime = appointmentTime.toISOString(); // ISO format

    const appointmentData = {
      PatientId: patientId,
      DoctorId: doctorId,
      AppointmentTime: isoAppointmentTime,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/appointments`,
        appointmentData
      );
      if (response.status === 200) {
        alert("Appointment booked successfully!");
      } else {
        setError("Failed to book the appointment.");
      }
    } catch (err) {
      setError(err.message);
    }

    navigate("/home");
  };

  const handleClear = () => {
    setSelectedCity(""); // Clear the selected city
    setSelectedHospital(""); // Clear the selected hospital
    setSelectedDepartment(""); // Clear the selected department
    setSelectedDoctor(""); // Clear the selected doctor
    setSelectedDate(null); // Clear the selected date
    setSelectedTime(""); // Clear the selected time
  };

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col">
      <h1 className="text-4xl my-4 font-bold">Book an Appointment</h1>
      <div className="border p-6 xl:p-8 my-4 border-2 border-gray-300 rounded-lg flex flex-col xl:flex-row">
        <div className="flex flex-col xl:w-1/2 items-center justify-center">
          {/* City dropdown */}
          <div className="flex w-2/3 flex-col mb-8">
            <label htmlFor="">
              City<span className="text-main-red">*</span>
            </label>
            <select
              className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option>Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hospital dropdown */}
          <div className="flex w-2/3 flex-col mb-8">
            <label htmlFor="">
              Hospital<span className="text-main-red">*</span>
            </label>
            <select
              className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={selectedHospital}
              onChange={(e) => setSelectedHospital(e.target.value)}
              disabled={!selectedCity} // Disable until a city is selected
            >
              <option value="">Select a hospital</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          {/* Department dropdown */}
          <div className="flex w-2/3 flex-col mb-8">
            <label htmlFor="">
              Department<span className="text-main-red">*</span>
            </label>
            <select
              className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              disabled={!selectedHospital} // Disable until a hospital is selected
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor dropdown */}
          <div className="flex w-2/3 flex-col mb-8">
            <label htmlFor="">
              Doctor<span className="text-main-red">*</span>
            </label>
            <select
              className="w-full mt-2 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              disabled={!selectedDepartment} // Disable until a department is selected
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.title}. {doctor.name} {doctor.surname}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col xl:w-1/2 items-center justify-center">
          {/* Date Picker */}
          <div className="flex w-2/3 flex-col items-center mb-8">
            <label className="self-start" htmlFor="">
              Select Date<span className="text-main-red">*</span>
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
              disabled={!selectedDoctor}
              dateFormat="yyyy/MM/dd"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Time Slot Picker */}
          <div className="flex w-2/3 flex-col mb-8">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={!selectedDate || !selectedDoctor}
            >
              <option value="">Select a time</option>
              {availableTimes.length > 0 ? (
                availableTimes.map((time, index) => (
                  <option key={index} value={time.toTimeString().slice(0, 5)}>
                    {time.toTimeString().slice(0, 5)}
                  </option>
                ))
              ) : (
                <option value="">No available times</option>
              )}
            </select>
          </div>
          <div className="w-2/3 flex justify-center">
            <button
              type="button"
              className="w-2/3 mr-2 px-6 py-3 text-white bg-main-green rounded-lg hover:bg-second-green disabled:bg-gray-400"
              onClick={handleBookAppointment}
              disabled={!selectedTime || !selectedDoctor || !selectedDate}
            >
              Book Appointment
            </button>
            <button
              type="button"
              className="w-1/3 ml-2 px-6 py-3 text-white bg-second-red rounded-lg hover:bg-main-red"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
