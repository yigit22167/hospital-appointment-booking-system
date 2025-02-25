import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const loginEndpoint = `${apiUrl}/auth/login`;

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook to navigate to other pages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        loginEndpoint,
        {
          userId,
          password,
        },
        { withCredentials: true }
      ); // Send request with credentials (cookies)

      const data = await response.data; // response recieved from backend
      console.log(data); // Handle success
      alert(data.message);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded w-full max-w-lg"
    >
      <h2 className=" text-4xl font-bold mb-6 text-center">
        Log in to your account
      </h2>
      <div className="mb-6">
        <label className="text-md font-medium leading-tight text-gray-700">
          User ID
        </label>
        <input
          type="text"
          name="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your User ID"
          required
          className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
        />
      </div>
      <div className="mb-6">
        <label className="text-md font-medium leading-tight text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="w-full px-4 py-2 bg-white border mt-2 border-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 text-lg placeholder-gray-500 rounded-lg"
        />
      </div>
      <div className="w-full flex justify-between items-center px-1 py-2 my-6">
        <label className="flex items-center text-gray-700">
          <input type="checkbox" className="mr-2 border bg-gray-300" />
          Remember for 30 days
        </label>

        <a href="#" className="text-second-blue hover:underline">
          Forgot Password
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-main-blue text-lg text-white py-2 mb-5 rounded-lg hover:bg-second-blue hover:scale-105 transition duration-300 active:bg-indigo-500"
      >
        Login
      </button>
      <div className="flex items-center justify-center px-2 py-2">
        <span className="text-gray-500 mx-1">Don't have an account?</span>
        <a
          href="/signup"
          className="text-second-blue mx-1 font-bold hover:underline"
        >
          Sign up
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
