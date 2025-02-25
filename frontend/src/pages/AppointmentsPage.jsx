import React, { useState, useEffect } from "react";
import useFetchAppointments from "../hooks/useFetchAppointments";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentButtons from "../components/AppointmentButtons";
const AppointmentsPage = ({ apiUrl }) => {
  const [selectedTab, setSelectedTab] = useState("upcoming"); // State for the active tab
  const [loading, setLoading] = useState(true); // Loading state
  const appointments = useFetchAppointments(apiUrl, setLoading); // Custom hook for appointments
  const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered appointments

  useEffect(() => {
    if (!loading) {
      // filter appointments by selected tab
      setFilteredAppointments(appointments[selectedTab]);
    }
  }, [appointments, selectedTab, loading]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setFilteredAppointments(appointments[tab]); // Filter appointments based on selected tab
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col">
      <AppointmentButtons
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />
      {filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment) => (
          <div className="h-2/3 flex my-4 flex-col border border-1 shadow border-gray-300 rounded-lg max-h-screen">
            <div className="px-6">
              <div className="py-5 border-t-1">
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentsPage;
