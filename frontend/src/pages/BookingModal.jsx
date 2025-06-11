import React, { useState } from 'react';
import './BookingModal.css'; // Create this CSS file

const BookingModal = ({ flight, onClose, onBookingComplete }) => {
  const [passengers, setPassengers] = useState([{ name: '', age: '' }]);
  
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
    window.location.href = "https://buy.stripe.com/test_14A00l1vI2a5bSA9dMaAw00";
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
            disabled={passengers.length === 0}
          >
            Book Now
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