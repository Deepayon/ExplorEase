import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hotel');
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="hotel-list-container">
      <h1 className="hotel-list-title">Hotels</h1>
      <div className="hotel-list">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelList;