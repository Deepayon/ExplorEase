import React from 'react';
import "./HotelCard.css"

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src={`/api/placeholder/400/320`} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-price">${hotel.price} per night</p>
        <a href={`http://localhost:3000/api/hotels/${hotel._id}`} className="hotel-link">
          View Details
        </a>
      </div>
    </div>
  );
};

export default HotelCard;