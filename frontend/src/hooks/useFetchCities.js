import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchCities = (apiUrl) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/cities`, {
          withCredentials: true, // Include credentials (cookies, tokens, etc.)
        });
        setCities(response.data);
      } catch (err) {
        console.log("error");
      }
    };

    fetchCities();
  }, []);

  return cities;
};
