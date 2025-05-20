import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://explorease-a7c6.onrender.com/api/auth/login',
        formData,
        { withCredentials: true } // Enable this only if you're using sessions or cookies
      );

      if (response && response.data) {
        setMessage('Login successful! Redirecting to home page...');
        setTimeout(() => navigate('/home'), 1000);
      } else {
        setMessage('Unexpected response format.');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage('Login failed. ' + error.response.data.message);
      } else {
        setMessage('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p className="login-message">{message}</p>}
        <p className="login-footer">
          New user?{' '}
          <Link to="/signup" className="login-link">
            Signup now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;