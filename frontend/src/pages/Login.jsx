import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [feedback, setFeedback] = useState({ message: "", error: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", error: "" });

    try {
      const response = await axios.post(
        `${config.backendURL}/auth/login`,
        formData
      );

      if (response?.data?.data?.token) {
        // Save auth token
        const { token, user } = response.data.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("username", user.username);

        // Dispatch custom event for immediate navbar update
        window.dispatchEvent(new Event("loginSuccess"));

        setFeedback({
          message: "🎉 Login successful! Redirecting to home page...",
          error: "",
        });

        // Redirect to home after a delay
        setTimeout(() => navigate("/home"), 1000); // Ensure this is the correct route
      } else {
        throw new Error("Invalid response structure from server.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "❌ Login failed. Please try again later.";
      setFeedback({ message: "", error: errorMessage });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        {feedback.message && (
          <div className="success-message">{feedback.message}</div>
        )}
        {feedback.error && (
          <div className="error-message">{feedback.error}</div>
        )}

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
