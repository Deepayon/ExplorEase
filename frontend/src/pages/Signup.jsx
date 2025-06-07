import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [feedback, setFeedback] = useState({ message: '', error: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', error: '' });

    try {
      const response = await axios.post(`${config.backendURL}/api/auth/signup`, formData);
      
      if (response?.data) {
        setFeedback({
          message: '🎉 Signup successful! Redirecting to login page...',
          error: ''
        });
        
        // Clear form
        setFormData({ username: '', password: '' });
        
        // Redirect to login after 2 seconds
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed. Please try again later.';
      setFeedback({ message: '', error: `❌ ${errorMessage}` });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Your Account</h2>
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
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        
        {feedback.message && <div className="success-message">{feedback.message}</div>}
        {feedback.error && <div className="error-message">{feedback.error}</div>}
        
        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;