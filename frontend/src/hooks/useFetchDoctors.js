import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchDoctors = (apiUrl, selectedHospital, selectedDepartment) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (!selectedDepartment) {
      // If no department is selected, don't make the API call
      return;
    }
    const fetchDoctors = async () => {
      try {
       const response = await axios.get(`${apiUrl}/doctors/${selectedHospital}/${selectedDepartment}`, {
          withCredentials: true, 
        });
        setDoctors(response.data);
      } catch (err) {
        console.log("error");
      }
    };

    fetchDoctors();
  }, [selectedHospital, selectedDepartment]);

  return doctors;
};