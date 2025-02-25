import { useState, useEffect } from "react";
import useFetchPatientId from "./useFetchPatientId";
import axios from "axios";

const useFetchAppointments = (apiUrl, setLoading) => {
  const [appointments, setAppointments] = useState({ upcoming: [], past: [] });
  const patientId = useFetchPatientId(apiUrl);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientId) {
        return;
      }

      try {
        const response = await axios.get(
          `${apiUrl}/appointments/byPatient/${patientId}`,
          { withCredentials: true }
        );

        if (response.status !== 200) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = response.data;

        if (data.message === "No appointments found.") {
          setAppointments({ upcoming: [], past: [] });
          return;
        }

        const now = new Date();
        const upcoming = data.filter(
          (appointment) => new Date(appointment.appointmentTime) >= now
        );
        const past = data.filter(
          (appointment) => new Date(appointment.appointmentTime) < now
        );

        setAppointments({ upcoming, past });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [apiUrl, patientId, setLoading]);

  return appointments;
};

export default useFetchAppointments;
