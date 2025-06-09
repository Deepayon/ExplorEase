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
          ${flight.price.toFixed(2)}
        </div>
      </div>
      
      <div className="flight-route">
        <div className="route-info">
          <span className="departure-city">{flight.from}</span>
          <div className="route-connector">
            <div className="route-line"></div>
            <div className="route-dot"></div>
          </div>
          <span className="arrival-city">{flight.to}</span>
        </div>
      </div>
      
      <div className="flight-meta">
        <div className="flight-time">
          <span>{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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