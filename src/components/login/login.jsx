import React, { useState } from "react";
import axios from "axios";
import "./auth.css"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      setError("");
    } catch (err) {
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
    <div className="auth-container">
      <h1>Welcome Back</h1>
      <p>Sign in to your account</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Sign In</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don’t have an account? <a href="/register">Sign up</a>
      </p>
    </div>
    </div>
  );
};

export default Login;
