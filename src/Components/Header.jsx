import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <header className="header">
      <h1 className="header-title">Portfolio Tracker</h1>
        
    </header>
  );
};

export default Header;
