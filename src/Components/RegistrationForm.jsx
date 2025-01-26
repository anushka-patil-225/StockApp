import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Assuming the response contains token and user ID
      const { token, id } = response.data;

      // Save the token in localStorage
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved to localStorage:", token);
      } else {
        console.warn("Token not found in the response.");
      }

      if (id) {
        console.log("User ID:", id);
        // Redirect to the dashboard with the user ID as a parameter
        navigate(`/dashboard/${id}`);
      } else {
        console.warn("User ID not found in the response.");
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError(""); // Clear any existing errors
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Register</h3>
        {error && <p className="error">{error}</p>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            Register
          </button>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <button type="button" className="btn link-btn" onClick={onClose}>
                Login
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
