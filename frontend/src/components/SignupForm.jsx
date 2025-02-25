import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const signupEndpoint = `${apiUrl}/auth/signup`;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    userId: "",
    password: "",
    phone: "",
    address: "",
    birthdate: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const response = await axios.post(
        signupEndpoint,
        formData,
        { withCredentials: true }
      ); // Send request with credentials (cookies)

      console.log(await response.data);

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded flex flex-col items-center w-full max-w-3xl"
    >
      <h2 className=" text-4xl font-bold mb-6 text-center">
        Create an account
      </h2>
      <div className="flex sm:flex-row flex-col w-full mb-3">
        <div className="sm:w-1/2 w-full mr-4">
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Name<span className="text-main-red">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Surname<span className="text-main-red">*</span>
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Enter your surname"
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              User ID<span className="text-main-red">*</span>
            </label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="Enter your User ID"
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Password<span className="text-main-red">*</span>
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(___) ___ __ __"
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-400 rounded-lg"
            />
          </div>
        </div>
        <div className="sm:w-1/2 w-full">
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Adress
            </label>
            <textarea
              type="textarea"
              name="address"
              value={formData.address}
              onChange={handleChange}
              maxLength={150} 
              className="w-full px-4 py-2 h-[152px] bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Birthdate
            </label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="text-md font-medium leading-tight text-gray-700">
              Gender
            </label>
            <div className="flex items-center mt-2.5 py-2 space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="w-5 h-5 rounded focus:ring-0 focus:outline-none"
                />
                <span className="ml-2 text-gray-600">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="w-5 h-5 rounded focus:ring-0 focus:outline-none"
                />
                <span className="ml-2 text-gray-600">Female</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-3/4 bg-main-blue text-lg text-white py-2 mb-5 rounded-lg hover:bg-second-blue hover:scale-105 transition duration-300 active:bg-indigo-500"
      >
        Sign up
      </button>
      <div className="flex items-center justify-center px-2 py-2">
        <span className="text-gray-500 mx-1">Already have an account?</span>
        <a
          href="/login"
          className="text-second-blue mx-1 font-bold hover:underline"
        >
          Log in
        </a>
      </div>
    </form>
  );
};

export default SignupForm;
