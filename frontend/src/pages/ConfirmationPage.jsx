import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  const location = useLocation();
  const { bookingType, bookingDetails } = location.state || {};

  return (
    <div className="confirmation-page">
      <div className="confirmation-card animate-pop">
        <div className="confirmation-icon">🎉</div>
        <h2>Booking Confirmed!</h2>
        <div className="confirmation-summary">
          <span className="summary-type">{bookingType?.toUpperCase()}</span>
          <span className="summary-detail">
            {bookingType === 'flight' && (
              <>
                {bookingDetails.from} → {bookingDetails.to} <br />
                {bookingDetails.airline} ({bookingDetails.flightNumber})
              </>
            )}
            {bookingType === 'hotel' && (
              <>
                {bookingDetails.name} <br />
                {bookingDetails.location}
              </>
            )}
            {bookingType === 'package' && (
              <>
                {bookingDetails.title} <br />
                {bookingDetails.description}
              </>
            )}
          </span>
          <span className="summary-price">
            ₹{bookingDetails?.price?.toLocaleString() || '0'}
          </span>
        </div>
        <Link to="/" className="confirmation-home-btn">Back to Home</Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;