import React, { useState } from "react";

const LoginForm = ({ onClose, onShowRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData); // Replace with actual login logic
    onClose?.();
  };

  const handleGuestLogin = () => {
    console.log("Logged in as Guest"); // Replace with actual guest login logic
    onClose?.();
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Login</h3>
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
          <button type="submit" className="btn submit-btn">Login</button>
          <button
            type="button"
            className="btn guest-btn"
            onClick={handleGuestLogin}
          >
            Login as Guest
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
