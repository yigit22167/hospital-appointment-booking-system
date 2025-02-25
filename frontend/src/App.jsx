import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PersonalInfoPage from "./pages/PersonalInfoPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import HomePage from "./pages/HomePage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes */}
        <Route
          path="/personalinfo"
          element={
            <ProtectedRoute
              apiUrl={apiUrl}
              element={
                <MainLayout>
                  <PersonalInfoPage apiUrl={apiUrl} />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute
              apiUrl={apiUrl}
              element={
                <MainLayout>
                  <AppointmentsPage apiUrl={apiUrl} />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute
              apiUrl={apiUrl}
              element={
                <MainLayout>
                  <HomePage apiUrl={apiUrl} />
                </MainLayout>
              }
            />
          }
        />
        <Route
          path="/bookappointment"
          element={
            <ProtectedRoute
              apiUrl={apiUrl}
              element={
                <MainLayout>
                  <BookAppointmentPage apiUrl={apiUrl} />
                </MainLayout>
              }
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
