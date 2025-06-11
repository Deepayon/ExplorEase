import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (!hotel) return <div className="hotel-details-loading">Loading...</div>;

  const USD_TO_INR = 83;

  const handleBookNow = () => {
    window.location.href = "https://buy.stripe.com/test_14A00l1vI2a5bSA9dMaAw00";
  };

  return (
    <div className="hotel-details-card">
      <h1 className="hotel-details-title">{hotel.name}</h1>
      <div className="hotel-details-location" tabIndex={0} title={hotel.location}>
        📍 {hotel.location}
      </div>
      <p className="hotel-details-description">{hotel.description}</p>
      <div className="hotel-details-price-block">
        <span className="hotel-details-price">
          ₹{(hotel.price * USD_TO_INR).toLocaleString()}
          <span className="per-night">/ night</span>
        </span>
        <span className="discount-badge">🎉 15% OFF</span>
      </div>
      <div className="hotel-details-amenities">
        <h3>Amenities</h3>
        <ul>
          {hotel.amenities.map((amenity, idx) => (
            <li key={idx}>{amenity}</li>
          ))}
        </ul>
      </div>
      <button className="hotel-details-book-btn" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
};

export default HotelDetails;