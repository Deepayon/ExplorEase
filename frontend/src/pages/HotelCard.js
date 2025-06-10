import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./HotelCard.css"

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div className="hotel-card">
      <div className="hotel-details-card">
        <div className="hotel-details-left">
          <h1 className="hotel-details-title">{hotel.name}</h1>
          <div className="hotel-details-location">📍 {hotel.location}</div>
          <p className="hotel-details-description">A cozy retreat nestled in the mountains</p>
          <div className="hotel-details-price-block">
            <span className="hotel-details-price">₹{hotel.price} <span className="per-night">/ night</span></span>
            <span className="discount-badge">15% OFF</span>
          </div>
        </div>
        <div className="hotel-details-right">
          <div className="hotel-details-amenities">
            <h3>Amenities</h3>
            <ul>
              <li>Hiking trails</li>
              <li>Restaurant</li>
              <li>Fireplace</li>
              <li>Free WiFi</li>
            </ul>
          </div>
          <button className="hotel-details-book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;