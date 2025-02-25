import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPatientId = (apiUrl) => {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${apiUrl}/patients/patient-data`, {
          withCredentials: true,
        });
        setPatientId(response.data.id);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPatient();
  }, [apiUrl]);

  return patientId;
};

export default useFetchPatientId;
