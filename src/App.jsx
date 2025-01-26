import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import Dashboard from './Components/Dashboard'; // Import the Dashboard component

function App() {
  const [showLogin, setShowLogin] = useState(true); // To toggle between LoginForm and RegistrationForm

  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowLogin(false);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            showLogin ? (
              <LoginForm onShowRegister={handleShowRegister} />
            ) : (
              <RegistrationForm onClose={handleShowLogin} />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
