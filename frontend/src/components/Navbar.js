import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, LogOut, ChevronDown, Settings, BookOpen } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced auth check function
  const checkAuthStatus = useCallback(() => {
    const token = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token && !!storedUsername);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Check auth status on mount and when location changes
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus, location]);

  // Listen for storage events to handle auth state across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [checkAuthStatus]);

  // Custom event listener for login success
  useEffect(() => {
    const handleLoginSuccess = () => {
      checkAuthStatus();
    };
    window.addEventListener('loginSuccess', handleLoginSuccess);
    return () => window.removeEventListener('loginSuccess', handleLoginSuccess);
  }, [checkAuthStatus]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        setShowDropdown(false);
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header class="navbar">
      <div class="navbar-container">
        <Link to="/" class="navbar-brand">
          <h1>ExploreEase</h1>
          <span class="brand-tagline">Discover • Experience • Journey</span>
        </Link>

        <nav class="navbar-nav">
          <ul class="nav-list">
            <li><Link to="/" class="nav-link">Home</Link></li>
            <li><Link to="/flights" class="nav-link">Flights</Link></li>
            <li><Link to="/hotels" class="nav-link">Hotels</Link></li>
            <li><Link to="/packages" class="nav-link">Packages</Link></li>
            <li><Link to="/assistant" class="nav-link">EaseBot</Link></li> {/* Add this line */}
          </ul>

          <div class="auth-section">
            {isLoggedIn ? (
              <div 
                class="user-profile-section" 
                onMouseEnter={() => setShowDropdown(true)} 
                onMouseLeave={() => setShowDropdown(false)}
              >
                <div class="user-info">
                  <div class="user-avatar">
                    {username.charAt(0).toUpperCase()}
                  </div>
                  <span class="username">Welcome, {username}</span>
                  <ChevronDown size={16} class={`dropdown-arrow ${showDropdown ? 'rotated' : ''}`} />
                </div>

                {showDropdown && (
                  <div class="profile-dropdown">
                    <Link to="/profile" class="dropdown-item">
                      <User size={16} />
                      <span>My Profile</span>
                    </Link>
                    <Link to="/bookings" class="dropdown-item">
                      <BookOpen size={16} />
                      <span>My Bookings</span>
                    </Link>
                    <Link to="/settings" class="dropdown-item">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                    <hr class="dropdown-divider" />
                    <button onClick={handleLogout} class="dropdown-item logout-btn">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div class="auth-buttons">
                <Link to="/login" class="login-btn">Login</Link>
                <Link to="/signup" class="signup-btn">Sign Up</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;