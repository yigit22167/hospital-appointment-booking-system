import { React, useState, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";
import AppointmentButtons from "../components/AppointmentButtons";
import useFetchAppointments from "../hooks/useFetchAppointments";

const HomePage = ({ apiUrl }) => {
  const [selectedTab, setSelectedTab] = useState("upcoming"); // State for the active tab
  const [loading, setLoading] = useState(true); // Loading state
  const appointments = useFetchAppointments(apiUrl, setLoading); // Custom hook for appointments
  const [filteredAppointments, setFilteredAppointments] = useState([]); // State for filtered appointments

  useEffect(() => {
    if (!loading) {
      setFilteredAppointments(appointments[selectedTab]);
    }
  }, [appointments, selectedTab, loading]);

  // Filter appointments based on the selected tab
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
      <div className="h-2/3 overflow-y-auto flex flex-col">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.slice(0, 2).map((appointment) => (
            <div
              key={appointment.id}
              className="h-2/3 flex my-4 flex-col border border-1 shadow border-gray-300 rounded-lg max-h-screen"
            >
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
      <div className="flex flex-col justify-end">
        <a href="/appointments" className="text-gray-400 px-6 underline">
          See all appointments
        </a>
      </div>
      <div className="w-full py-10 flex items-center">
        <div
          className="hidden md:block md:w-1/3 bg-cover h-[420px] rounded-xl bg-center"
          style={{
            backgroundImage:
              "url('public/96049f321bd3d60c580f5c9fdd66475e.jpg')",
          }}
        ></div>
        <div className="flex flex-col justify-center mx-12">
          <h1 className="text-3xl w-2/3">
            You can book appointments at the clinics available with
            <span className="font-bold"> OHBS</span>.
          </h1>
          <a
            href="/bookappointment"
            type="submit"
            className="bg-main-blue text-xl text-center w-2/3 text-white py-4 px-6 my-6 rounded-lg hover:bg-second-blue"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
