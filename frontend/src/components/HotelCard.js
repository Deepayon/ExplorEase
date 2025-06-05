import React from "react";
import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

// Pre-defined hotel images from public sources
const hotelImages = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427",
];

const HotelCard = ({ hotel, index }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/hotels/${hotel._id}`);
  };

  return (
    <div className="hotel-card-container">
      <div className="hotel-card">
        <div className="hotel-card-image">
          <img src={hotelImages[index % hotelImages.length]} alt={hotel.name} />
          <div className="hotel-card-overlay">
            <span className="hotel-card-price">${hotel.price}/night</span>
          </div>
        </div>
        <div className="hotel-card-content">
          <h3 className="hotel-card-title">{hotel.name}</h3>
          <p className="hotel-card-location">
            <i className="location-icon">📍</i> {hotel.location}
          </p>
          <p className="hotel-card-description">{hotel.description}</p>
          <button className="hotel-card-button" onClick={handleViewDetails}>
            Explore Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
