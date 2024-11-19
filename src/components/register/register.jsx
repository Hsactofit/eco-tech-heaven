import React, { useState } from "react";
import axios from "axios";
import "./auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/register", {
        fullName,
        email,
        phone,
        password,
      });
      setSuccess("Registration successful");
      setError("");
    } catch (err) {
      setError("Error registering user");
      setSuccess("");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
    <div className="auth-container">
      <h1>Create Account</h1>
      <p>Join Technology Heaven today</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Account</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
      <p>
        Already have an account? <a href="/login">Sign in</a>
      </p>
    </div>
    </div>
  );
};

export default Register;
