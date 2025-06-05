import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Hotels from './pages/Hotels';
import Transports from './pages/Transports';
import Packages from './pages/Packages';
import Flights from './pages/Flights';
import Car from './pages/CarRentals';
import Cruises from './pages/Cruises';
import Contact from './pages/Contact';
import FlightDetail from "./pages/FlightDetail"
import HotelList from './pages/HotelList';
import HotelPage from './pages/HotelPage';
import HomePage from './pages/HomePage';

const App = () => {
  // Create protected route wrapper component
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // Create authentication check wrapper component
  const AuthRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('authToken');
    return isAuthenticated ? <Navigate to="/" /> : children;
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/hotels" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/hotels/:id" element={<ProtectedRoute><HotelPage /></ProtectedRoute>} />
        <Route path="/transports" element={<ProtectedRoute><Transports /></ProtectedRoute>} />
        <Route path="/packages" element={<ProtectedRoute><Packages /></ProtectedRoute>} />
        <Route path="/flights" element={<ProtectedRoute><Flights /></ProtectedRoute>} />
        <Route path="/flights/:id" element={<FlightDetail />} />
        <Route path="/car-rentals" element={<ProtectedRoute><Car /></ProtectedRoute>} />
        <Route path="/cruises" element={<ProtectedRoute><Cruises /></ProtectedRoute>} />
        
        {/* Auth routes - redirect to home if already logged in */}
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        
        {/* Public routes */}
        <Route path="/contact" element={<Contact />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;