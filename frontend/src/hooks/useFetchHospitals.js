import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchHospitals = (apiUrl, selectedCity) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (!selectedCity) {
      // If no city is selected, don't make the API call
      return;
    }
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/hospitals/byCity/${selectedCity}`,
          {
            withCredentials: true,
          }
        );
        setHospitals(response.data);
      } catch (err) {}
    };

    fetchHospitals();
  }, [selectedCity]);

  return hospitals;
};
