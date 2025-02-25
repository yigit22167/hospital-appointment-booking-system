import React from "react";
import LoginForm from "../components/LoginForm";
const LoginPage = () => {

  return (
    <div className="min-h-screen overflow-y-auto flex md:flex-row">
      {/* Left Div with Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <LoginForm />
      </div>

      {/* Right Div with Image */}
      <div
        className="hidden md:block md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('public/96049f321bd3d60c580f5c9fdd66475e.jpg')",
        }}
      ></div>
    </div>
  );
};

export default LoginPage;
