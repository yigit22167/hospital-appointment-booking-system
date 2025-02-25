import React from "react";
import { LuCalendar } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa6";
import { PiHospital } from "react-icons/pi";
import { LuClipboardPlus } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { PiStethoscopeBold } from "react-icons/pi";

const AppointmentCard = ({ appointment }) => {
  const appointmentDate = new Date(appointment.appointmentTime);
  const isUpcoming = appointmentDate >= new Date(); // Check if appointment is upcoming
  const doctorName = `${appointment.title}. ${appointment.name} ${appointment.surname}`;

  const formattedTime = appointmentDate
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(":", "."); // Replace colon with a dot

  const formattedDate = appointmentDate
    .toLocaleDateString("en-GB")
    .replace(/\//g, ".");

  return (
    <div className="flex h-[124px] justify-between">
      <div className="flex flex-col justify-between w-1/2">
        <div className="flex">
          <div
            className={`rounded-lg px-3 py-2 flex items-center ${
              isUpcoming
                ? "text-white bg-second-green"
                : "bg-gray-50 text-gray-300"
            }`}
          >
            <LuCalendar
              className={`text-2xl mr-2 ${
                isUpcoming
                  ? "text-gray-50 bg-second-green"
                  : "bg-gray-50 text-gray-300"
              }`}
            />
            {formattedDate}
            <FaRegClock
              className={`text-2xl mx-2 ${
                isUpcoming
                  ? "text-gray-50 bg-second-green"
                  : "bg-gray-50 text-gray-300"
              }`}
            />
            {formattedTime}
          </div>
          <div
            className={`py-2 px-3 ${
              isUpcoming ? "text-main-green" : "text-gray-500"
            }`}
          >
            {isUpcoming ? "Upcoming Appointment" : "Past Appointment"}
          </div>
        </div>
        <div className="flex justify-between w-full xl:w-1/2">
          <div>
            <div className="text-gray-600 mb-2 flex items-center">
              <IoLocationOutline className="text-2xl mr-2" />
              {appointment.cityName}
            </div>
            <div className="text-gray-600 flex items-center">
              <PiHospital className="text-2xl mr-2" />
              {appointment.hospitalName}
            </div>
          </div>
          <div>
            <div className="text-gray-600 mb-2 flex items-center">
              <PiStethoscopeBold className="text-xl mr-2" />
              {doctorName}
            </div>
            <div className="text-gray-600 flex items-center">
              <LuClipboardPlus className="text-gray-600 text-xl mr-2" />
              {appointment.departmentName}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <a href="#" className="text-gray-400 underline">
          Click for appointment details
        </a>
      </div>
    </div>
  );
};

export default AppointmentCard;
