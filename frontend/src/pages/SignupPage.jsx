import React from "react";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen overflow-y-auto flex md:flex-row">
      {/* Left Div with Login Form */}
      <div className="w-full xl:w-1/2 flex items-center justify-center">
        <SignupForm />
      </div>

      {/* Right Div with Image */}
      <div
        className="hidden xl:block md:w-1/2 bg-cover bg-left"
        style={{
          backgroundImage: "url('public/969e5874039e60b30926bb3341dc9863.jpg')",
        }}
      ></div>
    </div>
  );
};

export default SignupPage;
