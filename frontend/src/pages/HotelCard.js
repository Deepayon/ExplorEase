import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./HotelCard.css"

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  console.log("HotelCard hotel:", hotel);

  return (
    <div className="hotel-card">
      <img src={`/api/placeholder/400/320`} alt={hotel.name} className="hotel-image" />
      <div className="hotel-details">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-location">{hotel.location}</p>
        <p className="hotel-price">${hotel.price} per night</p>
        <button
          className="hotel-link"
          onClick={() => navigate(`/hotels/${hotel._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default HotelCard;