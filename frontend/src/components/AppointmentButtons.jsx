import React from "react";

const AppointmentButtons = ({ selectedTab, onTabChange }) => {
  return (
    <div className="w-full h-1/3 flex my-4">
      <button
        onClick={() => onTabChange("upcoming")}
        className={`py-3 px-8 border border-1 text-gray-300 rounded-lg border-gray-300 ${
          selectedTab === "upcoming" ? "border-main-blue text-gray-900" : ""
        }`}
      >
        Upcoming Appointments
      </button>
      <button
        onClick={() => onTabChange("past")}
        className={`py-3 px-8 mx-4 border border-1 text-gray-300 rounded-lg border-gray-300 transition-all transition-duration-300 ${
          selectedTab === "past" ? "border-main-blue text-gray-900" : ""
        }`}
      >
        Past Appointments
      </button>
    </div>
  );
};

export default AppointmentButtons;
