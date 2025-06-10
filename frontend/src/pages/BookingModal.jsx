import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './BookingModal.css'; // Create this CSS file

const BookingModal = ({ flight, onClose, onBookingComplete }) => {
  const [passengers, setPassengers] = useState([{ name: '', age: '' }]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addPassenger = () => {
    if (passengers.length < flight.availableSeats) {
      setPassengers([...passengers, { name: '', age: '' }]);
    }
  };

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleBooking = () => {
    // Prepare the booking details for payment page
    navigate('/payment', {
      state: {
        bookingType: 'flight',
        bookingDetails: {
          airline: flight.airline,
          flightNumber: flight.flightNumber,
          origin: flight.origin,
          destination: flight.destination,
          price: flight.price,
          // add more fields if needed
        }
      }
    });
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-container">
        <div className="booking-modal-header">
          <h2>Book Flight: {flight.airline} - {flight.flightNumber}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="booking-modal-content">
          <p>Available Seats: {flight.availableSeats}</p>
          <p>Carry-on Baggage: {flight?.baggage?.carry_on || "Not specified"}</p>
          
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-input-row">
              <input
                placeholder="Passenger Name"
                value={passenger.name}
                onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                
              />
              <input
                type="number"
                placeholder="Age"
                value={passenger.age}
                onChange={(e) => updatePassenger(index, 'age', e.target.value)}
              />
            </div>
          ))}
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="booking-modal-actions">
          <button 
            onClick={addPassenger}
            disabled={passengers.length >= flight.availableSeats}
          >
            Add Passenger
          </button>
          <button 
            onClick={handleBooking}
            disabled={isLoading || passengers.length === 0}
          >
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
          <button 
            onClick={onClose}
            className="back-button"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;