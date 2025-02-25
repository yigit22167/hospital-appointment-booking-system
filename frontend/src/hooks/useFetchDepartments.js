import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchDepartments = (apiUrl, selectedHospital) => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (!selectedHospital) {
      // If no hospital is selected, don't make the API call
      return;
    }
    const fetchDepartments = async () => {
      try {
       const response = await axios.get(`${apiUrl}/departments/byHospital/${selectedHospital}`, {
          withCredentials: true, 
        });
        setDepartments(response.data);
      } catch (err) {
        console.log("error");
      }
    };

    fetchDepartments();
  }, [selectedHospital]);

  return departments;
};