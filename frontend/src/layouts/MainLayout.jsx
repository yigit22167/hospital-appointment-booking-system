import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      // Show Navbar only if screen width is xl or larger
      setShowNavbar(window.innerWidth >= 1280);
    };

    // Check on initial load
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <Navbar />
      <div className={`w-full p-6 ${showNavbar ? "ml-96" : ""}`}>
        <div className="xl:m-8 xl:mt-24">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
