import React, { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import api from '../utils/api.js';
import './HomePage.css';

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get('/hotels');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="home-page">
      <h1>Welcome to our Hotel Booking App</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      {hotels.map((hotel, index) => (
  <HotelCard key={hotel._id} hotel={hotel} index={index} />
))}
    </div>
    </div>
  );
};

export default HomePage;