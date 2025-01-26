import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ onClose, onShowRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to login endpoint
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      // Assuming the response contains token and id
      const { token, userId } = response.data;

      // Save the token in localStorage
      if (token) {
        localStorage.setItem("authToken", token);
        console.log("Token saved to localStorage:", token);
      } else {
        console.warn("Token not found in the response.");
      }

      if (userId) {
        console.log("User ID:", userId);
        // Navigate to the dashboard with the user ID as a query parameter
        navigate(`/dashboard/${userId}`);
      } else {
        console.warn("User ID not found in the response.");
      }

      // Reset the form and error state
      setFormData({ email: "", password: "" });
      setError(""); // Clear any existing errors
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleGuestLogin = () => {
    // Set the email and password for the guest user
    setFormData({
      email: "john.doe@example.com",
      password: "password123"
    });

    // Optionally submit the form after setting the values
    setTimeout(() => {
      handleSubmit(new Event('submit')); // Trigger the form submission programmatically
    }, 0);

    console.log("Logged in as Guest");
    onClose?.();
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login</h3>
        {error && <p className="error">{error}</p>}
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
        <div className="form-actions">
          <button type="submit" className="btn submit-btn">
            Login
          </button>
          <button
            type="button"
            className="btn guest-btn"
            onClick={handleGuestLogin}
          >
            Get Demo Credentials
          </button>
        </div>
        <div className="register-link">
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className="btn link-btn"
              onClick={onShowRegister}
            >
              Register
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
