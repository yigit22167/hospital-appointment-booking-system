import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import axios from "axios";

const PersonalInfoPage = ({ apiUrl }) => {
  const getPatientEndpoint = `${apiUrl}/patients/patient-data`;
  const updatePatientEndpoint = `${apiUrl}/patients/update`;

  // State to store patient data and edit mode
  const [patientData, setPatientData] = useState({
    name: "",
    surname: "",
    password: "",
    phone: "",
    address: "",
    birthdate: "",
    gender: "",
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(getPatientEndpoint, {
          withCredentials: true,
        });
        setPatientData(response.data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
      }
    };

    // Call the function when component mounts (after login)
    fetchPatientData();
  }, []); // Empty dependency array to run only once when the component mounts

  const [isEditMode, setIsEditMode] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save button
  const handleSave = async () => {
    setIsEditMode(false);
    // Send the updated data to your backend
    try {
      const patientId = patientData.id; // get patient ID

      // API call
      const response = await axios.put(
        `${updatePatientEndpoint}/${patientId}`,
        {
          name: patientData.name,
          surname: patientData.surname,
          phone: patientData.phone,
          address: patientData.address,
          birthdate: patientData.birthdate,
          gender: patientData.gender,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Data saved successfully!");
      } else {
        alert("Failed to save data.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto flex flex-col">
      <h1 className="text-4xl my-4 font-bold">Personal Info</h1>
      <div className="border p-6 xl:p-8 my-4 border-2 border-gray-300 rounded-lg flex flex-col xl:flex-row">
        <div className="flex flex-col xl:flex-row w-full">
          {/* Left Column */}
          <div className="xl:w-1/2 xl:mr-12">
            {[
              { label: "Name", name: "name", required: true },
              { label: "Surname", name: "surname", required: true },
              { label: "Password", name: "password", required: true },
              { label: "Phone Number", name: "phone" },
            ].map((field) => (
              <div className="mb-6" key={field.name}>
                <label className="text-md font-medium leading-tight text-gray-700">
                  {field.label}
                  {field.required && <span className="text-main-red">*</span>}
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={`Enter your ${field.name}`}
                  value={patientData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-2 bg-white border mt-2 border-2 ${
                    isEditMode
                      ? "focus:outline-none focus:ring-0"
                      : "bg-gray-100"
                  } border-gray-300 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg`}
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="xl:w-1/2 xl:mr-12">
            <div className="mb-6">
              <label className="text-md font-medium leading-tight text-gray-700">
                Address
              </label>
              <textarea
                type="text"
                name="address"
                value={patientData.address}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 h-[152px] bg-white border mt-2 border-2 ${
                  isEditMode ? "focus:outline-none focus:ring-0" : "bg-gray-100"
                } border-gray-300 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg`}
              />
            </div>
            <div className="mb-6">
              <label className="text-md font-medium leading-tight text-gray-700">
                Birthdate
              </label>
              <input
                type="date"
                name="birthdate"
                value={patientData.birthdate}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 bg-white border mt-2 border-2 ${
                  isEditMode ? "focus:outline-none focus:ring-0" : "bg-gray-100"
                } border-gray-300 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg`}
              />
            </div>
            <div className="mb-6">
              <label className="text-md font-medium leading-tight text-gray-700">
                Gender
              </label>
              <div className="flex items-center mt-2.5 py-2 space-x-6">
                {["male", "female"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={patientData.gender === gender}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="w-5 h-5 rounded focus:ring-0 focus:outline-none"
                    />
                    <span className="ml-2 text-gray-600 capitalize">
                      {gender}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="font-bold text-gray-500 text-second-green text-xl h-full xl:w-1/6 flex justify-end xl:mx-8">
          <button
            onClick={isEditMode ? handleSave : () => setIsEditMode(true)}
            className={`flex items-center align-right
              ${
                isEditMode
                  ? "text-main-green hover:text-second-green"
                  : "hover:text-main-green"
              }`}
          >
            <MdOutlineModeEditOutline className="text-2xl mr-2" />
            {isEditMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
