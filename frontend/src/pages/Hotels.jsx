import React, { useState } from 'react';
import axios from 'axios';
import './Hotels.css';

function Hotels() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomPreference, setRoomPreference] = useState('Standard Room');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const hotelImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/517614950.jpg?k=03e36a57ca9358d6e5675705d0849a601ec24bcfed47586b226dcb06e086b90b&o=&hp=1',
    'https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_900,h_506,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/iris-hotel-brigade-road-bangalore/4_txenmk',
    'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
    'https://www.itchotels.com/content/dam/itchotels/in/umbrella/welcomHotel/hotels/welcomhoteldelhi/images/overview-landing-page/our-brands/d/lobby.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKN4wL0OVMx2QzZtO1-rrZO-Sn1o8-pK7H6A&s',
    'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg',
  ];

  // Validate form fields before booking
  const validateForm = () => {
    if (!name || !email || !phone || !checkIn || !checkOut) {
      setErrorMessage('Please fill out all required fields!');
      return false;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage('Check-Out date must be after Check-In date');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Razorpay payment integration and booking confirmation
  const handlePayment = async () => {
    if (!validateForm()) return;

    try {
      // Calculate amount (e.g., fixed or based on stay days * price per day)
      // Here fixed 500 for demo - replace with your logic
      const amountToPay = 500;

      // Create Razorpay order on backend
      const { data: order } = await axios.post(
        'https://explorease-kyrp.onrender.com/api/payment/create-order',
        { amount: amountToPay }
      );

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Paradise Hotels',
        description: `Room booking for ${name}`,
        order_id: order.id,
        handler: async function (response) {
          // Verify payment on backend
          try {
            const verifyRes = await axios.post(
              'https://explorease-kyrp.onrender.com/api/payment/verify',
              response
            );

            if (verifyRes.data.success) {
              // Show booking success message with details
              setSuccessMessage(`Booking Successful!
Thank you for booking with us, ${name}.
Details:
Check-In: ${checkIn}
Check-Out: ${checkOut}
Guests: ${guests}
Room Preference: ${roomPreference}.
Payment ID: ${response.razorpay_payment_id}`);
              setIsBookingConfirmed(true);
              clearForm();
            } else {
              setErrorMessage('Payment verification failed');
            }
          } catch {
            setErrorMessage('Payment verification error');
          }
        },
        prefill: {
          name,
          email,
          contact: phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment initiation error:', error);
      setErrorMessage('Something went wrong while initiating payment');
    }
  };

  // Reset form fields
  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCheckIn('');
    setCheckOut('');
    setGuests(1);
    setRoomPreference('Standard Room');
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Welcome to Paradise Hotels</h1>
        <p>Book your dream stay with us today!</p>
      </header>

      {/* Hotel Image Gallery */}
      <div className="gallery">
        <h2 className="title">Explore Our Hotels</h2>
        <div className="images">
          {hotelImages.map((src, index) => (
            <img key={index} src={src} alt={`Hotel ${index + 1}`} className="image" />
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="form-container">
        <h2 className="title">Book Your Stay</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
        >
          <div className="form-group">
            <label>Full Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Guests</label>
            <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1} {num + 1 === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Check-In Date*</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Check-Out Date*</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Room Preference</label>
            <select value={roomPreference} onChange={(e) => setRoomPreference(e.target.value)}>
              <option value="Standard Room">Standard Room</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Suite">Suite</option>
              <option value="Family Room">Family Room</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Book & Pay Now
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {/* Success Message */}
        {successMessage && (
          <div className="success-card">
            <div className="success-icon">✔️</div>
            <pre className="success-text" style={{ whiteSpace: 'pre-wrap' }}>
              {successMessage}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hotels;
