import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchAvailableTimes = (apiUrl, doctorId, date) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedTimes, setBookedTimes] = useState([]);
  const dateObj = new Date(date);
  dateObj.setDate(dateObj.getDate() + 1); // Bir gün ekle
  const formattedDate = dateObj.toISOString().split("T")[0];
  useEffect(() => {
    if (!doctorId || !date) {
      return;
    }
    if (doctorId && date) {
      const fetchBookedAppointments = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}/appointments/byDoctor/${doctorId}/byDate/${formattedDate}
            `,
            { withCredentials: true } // if authentication is required
          );
          setBookedTimes(response.data);
        } catch (err) {
          console.error("Error fetching booked appointments:", err);
        }
      };

      fetchBookedAppointments();
    }
  }, [doctorId, date]);

  useEffect(() => {
    const generateAllTimeSlots = () => {
      const startHour = 9; // 09:00
      const endHour = 17; // 17:00
      const timeSlots = [];
      const excludedTimes = ["12:00", "12:20", "12:40"]; // exclude lunch break

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += 20) {
          const time = new Date(date);
          time.setHours(hour);
          time.setMinutes(minute);
          const formattedTime = time.toTimeString().slice(0, 5);

          // Çıkarmak istediğiniz saatleri atla
          if (!excludedTimes.includes(formattedTime)) {
            timeSlots.push(time);
          }
        }
      }

      // Dolu saatleri çıkar
      const available = timeSlots.filter(
        (time) => !bookedTimes.includes(time.toTimeString().slice(0, 5)) // Only available times
      );

      setAvailableTimes(available);
    };

    generateAllTimeSlots();
  }, [bookedTimes, date]);

  return availableTimes;
};
