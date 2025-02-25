import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ apiUrl, element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/verifyUser`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loading once the request finishes
      }
    };
    checkAuth();
  }, []);

  // Show a loading indicator while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or something else
  }

  // If the user is authenticated, render the page, else redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
