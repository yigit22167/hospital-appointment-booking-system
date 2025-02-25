import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHealthBookLine } from "react-icons/ri";
import { LuSquareUser } from "react-icons/lu";
import { BiAddToQueue } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { GiHospitalCross } from "react-icons/gi";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get the current path
  const apiUrl = import.meta.env.VITE_API_URL;
  const logoutEndpoint = `${apiUrl}/auth/logout`;
  const navigate = useNavigate();

  const getButtonClass = (path) => {
    const isActive = location.pathname === path;
    return `py-1 w-full block rounded-xl ${
      isActive
        ? "bg-gray-100 text-gray-500" // Active page styles
        : "hover:bg-gray-50 text-gray-700"
    }`;
  };

  const handleLogout = async () => {
    try {
      // Make a POST request to the backend logout endpoint
      const response = await axios.post(
        logoutEndpoint,
        {},
        { withCredentials: true }
      );

      // Log the response from the server
      console.log(response.data);

      navigate("/login"); // navigate the user back to the login page or homepage
    } catch (err) {
      console.error("Logout error:", err);
      alert("Something went wrong while logging out. Please try again.");
    }
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="xl:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        &#9776; {/* Hamburger Icon */}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-white border-r-2 border-gray-200 flex flex-col p-5 items-start z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } xl:translate-x-0 transition-transform duration-300 ease-in-out w-64 xl:w-96`}
      >
        <a
          href="/home"
          className="text-3xl text-blue-900 px-4 pt-6 pb-9 w-full font-bold flex items-center"
        >
          <GiHospitalCross className="text-5xl mr-3" />
          OHBS
        </a>
        <ul className="flex flex-col flex-grow px-6 w-full space-y-4">
          <li>
            <Link
              to="/personalinfo"
              className={getButtonClass("/personalinfo")}
            >
              <div className="p-3 text-lg flex items-center">
                <LuSquareUser className="text-3xl text-gray-600 mr-2" />
                Personal Info
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/appointments"
              className={getButtonClass("/appointments")}
            >
              <div className="p-3 text-lg flex items-center">
                <RiHealthBookLine className="text-3xl text-gray-600 mr-2" />
                Appointments
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="/bookappointment"
              className={getButtonClass("/bookappointment")}
            >
              <div className="p-3 text-lg flex items-center">
                <BiAddToQueue className="text-3xl text-gray-600 mr-2" />
                Book an Appointment
              </div>
            </Link>
          </li>
        </ul>

        <div className="w-full px-6">
          <button className="w-full border-t-2 hover:text-gray-400 border-gray-200 text-left px-3 my-3 text-gray-700 py-4 text-lg transition-all transition-duration-200">
            <Link onClick={handleLogout} className="my-3 flex items-center">
              {" "}
              <LuLogOut className="text-3xl mr-2" />
              Log Out
            </Link>
          </button>
        </div>
      </nav>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
