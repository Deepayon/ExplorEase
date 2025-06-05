import React from 'react';
import FlightCard from './FlightCard';
import './styles/FlightResults.css';

const FlightResults = ({ flights, searchAttempted, onFlightSelect }) => {
  if (!searchAttempted || !flights) return null;

  if (flights.length === 0) {
    return (
      <div className="flight-results-empty">
        <img src="/no-flights.svg" alt="No flights" className="empty-illustration" />
        <p>No flights found matching your search</p>
        <p>Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="flight-results-container">
      <h2 className="results-title">Available Flights</h2>
      <div className="flight-results-grid">
        {flights.map(flight => (
          <FlightCard
            key={flight._id}
            flight={flight}
            onClick={() => onFlightSelect(flight._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightResults;