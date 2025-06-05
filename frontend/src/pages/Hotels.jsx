import React, { useState } from 'react';
import './Hotels.css'; // Import the CSS file

function Hotels() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomPreference, setRoomPreference] = useState('Standard Room');

  const handleBooking = () => {
    alert(`
      Booking Confirmed!
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Check-In: ${checkIn}
      Check-Out: ${checkOut}
      Guests: ${guests}
      Room Preference: ${roomPreference}
    `);
  };

  const hotelImages = [
    'https://cf.bstatic.com/xdata/images/hotel/max1024x768/517614950.jpg?k=03e36a57ca9358d6e5675705d0849a601ec24bcfed47586b226dcb06e086b90b&o=&hp=1',
    'https://res.cloudinary.com/simplotel/image/upload/x_0,y_0,w_900,h_506,r_0,c_crop,q_80,fl_progressive/w_900,f_auto,c_fit/iris-hotel-brigade-road-bangalore/4_txenmk',
    'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953245000-177513283.jpg',
    'https://www.itchotels.com/content/dam/itchotels/in/umbrella/welcomHotel/hotels/welcomhoteldelhi/images/overview-landing-page/our-brands/d/lobby.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKN4wL0OVMx2QzZtO1-rrZO-Sn1o8-pK7H6A&s',
    'https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg',
  ];

  return (
    <div className="container">
      <div className="gallery">
        <h2 className="title">Explore Our Hotels</h2>
        <div className="images">
          {hotelImages.map((src, index) => (
            <img key={index} src={src} alt={`Hotel ${index + 1}`} className="image" />
          ))}
        </div>
      </div>

      <div className="form-container">
        <h2 className="title">Book Your Stay</h2>
        <form className="form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Guests</label>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1} {num + 1 === 1 ? 'Guest' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Check-In Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Check-Out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
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
          <button type="button" onClick={handleBooking} className="btn">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hotels;
