import React, { useState } from "react";

const RegistrationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration Data:", formData); // Replace with actual registration logic
    onClose?.();
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Register</h3>
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
          <button type="submit" className="btn submit-btn">Register</button>
          <div className="register-link">
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className="btn link-btn"
              onClick={onClose}
            >
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
