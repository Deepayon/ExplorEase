import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import api from '../utils/api.js';
import './HomePage.css';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/api/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Find Your Stay with Ease</h1>
        <h2 className="home-subheading">Book hotels effortlessly</h2>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {hotels.map((hotel, index) => (
          <HotelCard key={hotel._id} hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;