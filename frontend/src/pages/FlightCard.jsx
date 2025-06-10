import React from 'react';
import './styles/FlightCard.css';

const FlightCard = ({ flight, onClick }) => {
  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <div className="airline-logo">
          {flight.airline.charAt(0)}
        </div>
        <div className="flight-details">
          <h3>{flight.airline}</h3>
          <span className="flight-number">{flight.flightNumber}</span>
        </div>
        <div className="flight-price">
          <span className="price-label">Price:</span>
          <span className="price-value">₹{flight.price.toLocaleString("en-IN")}</span>
        </div>
      </div>
      
      <div className="flight-route">
        <div className="route-info">
          <span className="departure-city">{flight.origin}</span>
          <span className="route-arrow">→</span>
          <span className="arrival-city">{flight.destination}</span>
        </div>
      </div>
      
      <div className="flight-meta">
        <div className="flight-time">
          <span>{new Date(flight.departureTime).toLocaleDateString("en-IN")}</span>
          <span className="flight-duration">{flight.duration}</span>
        </div>
        <div className="seats-availability">
          {flight.availableSeats} seats left
        </div>
      </div>
      <button className="book-now-btn" onClick={onClick}>
        Book Now
      </button>
    </div>
  );
};

export default FlightCard;