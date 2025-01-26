import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Check if the current path is the dashboard
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="header">
            <h1 className="header-title">Portfolio Tracker</h1>

      {isDashboard && (
        <button className="logout-button" onClick={() => handleLogout()}>
          Logout
        </button>
      )}
    </header>
  );

  function handleLogout() {
    // Add your logout logic here, such as clearing tokens or redirecting
    console.log("User logged out");
  }
};

export default Header;
