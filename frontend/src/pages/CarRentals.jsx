// CarRentals.js
import React, { useState } from 'react';
import './CarRentals.css'; // Import the CSS file

function CarRentals() {
  const [pickUpDate, setPickUpDate] = useState('');
  const [dropOffDate, setDropOffDate] = useState('');
  const [carType, setCarType] = useState('Economy');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const handleBooking = () => {
    alert(`
      Booking Confirmed!
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Pickup Location: ${location}
      Pickup Date: ${pickUpDate}
      Drop-off Date: ${dropOffDate}
      Car Type: ${carType}
    `);
  };

  const carImages = [
    'https://luxecars.co.in/wp-content/uploads/2023/03/DSC06925-scaled.jpg',
    'https://5.imimg.com/data5/ANDROID/Default/2022/8/YT/JM/YP/135105608/product-jpeg-500x500.jpg',
    'https://imgd-ct.aeplcdn.com/320x200/n/cw/ec/139651/curvv-exterior-right-front-three-quarter.jpeg?isig=0&q=80',
    'https://cdni.autocarindia.com/utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Hyundai-Creta-180120241405.jpg&w=872&h=578&q=75&c=1',
    'https://imgd.aeplcdn.com/600x337/n/cw/ec/167017/creta-ev-exterior-right-front-three-quarter-14.jpeg?isig=0&q=80',
    'https://media.zigcdn.com/media/model/2024/Nov/maruti-dzire_360x240.jpg',
  ];

  return (
    <div className="container">
      {/* Scrolling Image Gallery */}
      <div className="gallery">
        <h2 className="title">Choose Your Ride</h2>
        <div className="images">
          {carImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Car ${index + 1}`}
              className="image"
            />
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="form-container">
        <h2 className="title">Book Your Car</h2>
        <form className="form">
          {/* Full Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Pickup Location */}
          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter pickup location"
            />
          </div>

          {/* Pickup Date */}
          <div className="form-group">
            <label>Pickup Date</label>
            <input
              type="date"
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
            />
          </div>

          {/* Drop-off Date */}
          <div className="form-group">
            <label>Drop-off Date</label>
            <input
              type="date"
              value={dropOffDate}
              onChange={(e) => setDropOffDate(e.target.value)}
            />
          </div>

          {/* Car Type */}
          <div className="form-group">
            <label>Car Type</label>
            <select value={carType} onChange={(e) => setCarType(e.target.value)}>
              <option value="Economy">Economy</option>
              <option value="Luxury">Luxury</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
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

export default CarRentals;
