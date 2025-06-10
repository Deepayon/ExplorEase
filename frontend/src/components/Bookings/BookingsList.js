import React, { useEffect, useState } from 'react';
import { flightAPI } from '../../services/api';
import './styles/BookingsList.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await flightAPI.getUserBookings();
        setBookings(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await flightAPI.cancelBooking(bookingId);
      // Refresh bookings list
      const updatedBookings = await flightAPI.getUserBookings();
      setBookings(updatedBookings);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="bookings-list__loading">Loading your bookings...</div>;
  }

  if (error) {
    return <div className="bookings-list__error">{error}</div>;
  }

  return (
    <div className="bookings-list">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="bookings-list__grid">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-card__header">
                <h3>{booking.flight.airline}</h3>
                <p>Flight {booking.flight.flightNumber}</p>
              </div>
              
              <div className="booking-card__details">
                <div className="booking-card__route">
                  <p>{booking.flight.origin} → {booking.flight.destination}</p>
                  <p>{new Date(booking.flight.departureTime).toLocaleDateString()}</p>
                </div>
                
                <div className="booking-card__passengers">
                  <h4>Passengers:</h4>
                  <ul>
                    {booking.passengers.map((passenger, index) => (
                      <li key={index}>
                        {passenger.name} - Seat {passenger.seatNumber}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="booking-card__status">
                  <p>Status: <span className={`status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span></p>
                  <p>Total Price: ${booking.totalPrice}</p>
                </div>
              </div>
              
              {booking.status === 'confirmed' && (
                <button 
                  className="booking-card__cancel"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsList;