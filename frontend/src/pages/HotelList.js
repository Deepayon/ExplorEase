import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './HotelCard';

// Map hotel names to image URLs
const hotelImages = {
  "The Grand Palace": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  "Desert Mirage Resort": "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  "Forest Retreat": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80",
  "Island Paradise Resort": "https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=600&q=80",
};

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotels`);
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
          <HotelCard
            key={hotel._id}
            hotel={{
              ...hotel,
              imageUrl: hotel.imageUrl || hotelImages[hotel.name] || "https://via.placeholder.com/340x340?text=Hotel+Image"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelList;