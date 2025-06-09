import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/PaymentPage.css';

const paymentMethods = [
  {
    key: 'card',
    label: 'Credit/Debit Card',
    icon: '💳',
  },
  {
    key: 'upi',
    label: 'UPI',
    icon: '🔗',
  },
  {
    key: 'wallet',
    label: 'Wallet',
    icon: '👛',
  },
];

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingType, bookingDetails } = location.state || {};

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState('card');
  const [error, setError] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/confirmation', { state: { bookingType, bookingDetails } });
      }, 1800);
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-card animate-pop">
        <h2 className="payment-title">Complete Your Payment</h2>
        <div className="payment-summary">
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

        <div className="payment-methods">
          {paymentMethods.map((m) => (
            <button
              key={m.key}
              className={`payment-method-btn${method === m.key ? ' selected' : ''}`}
              onClick={() => setMethod(m.key)}
              type="button"
            >
              <span className="method-icon">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        <form className="payment-form" onSubmit={handlePayment} autoComplete="off">
          {method === 'card' && (
            <>
              <div className="form-row">
                <label>
                  Card Number
                  <input type="text" placeholder="1234 5678 9012 3456" required maxLength={19} pattern="\d{16}" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Expiry
                  <input type="text" placeholder="MM/YY" required maxLength={5} pattern="\d{2}/\d{2}" />
                </label>
                <label>
                  CVV
                  <input type="password" placeholder="123" required maxLength={4} pattern="\d{3,4}" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Name on Card
                  <input type="text" placeholder="Full Name" required />
                </label>
              </div>
            </>
          )}
          {method === 'upi' && (
            <div className="form-row">
              <label>
                UPI ID
                <input type="text" placeholder="yourname@bank" required />
              </label>
            </div>
          )}
          {method === 'wallet' && (
            <div className="form-row">
              <label>
                Wallet Number
                <input type="text" placeholder="Enter wallet/mobile number" required />
              </label>
            </div>
          )}
          <button
            className={`pay-btn ${processing ? 'processing' : ''}`}
            type="submit"
            disabled={processing}
          >
            {processing ? (
              <span className="loader"></span>
            ) : (
              <>Pay ₹{bookingDetails?.price?.toLocaleString() || '0'}</>
            )}
          </button>
          {error && <div className="payment-error">{error}</div>}
          {success && (
            <div className="payment-success animate-fadein">
              Payment Successful! Redirecting...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
