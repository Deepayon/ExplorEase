import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./HotelDetails.css";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotels/${id}`);
        setHotel(response.data);
        setNotFound(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        }
        console.error('Error fetching hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (notFound) return <div className="hotel-details-error">Hotel not found.</div>;
  if (!hotel) return <div className="hotel-details-loading">Loading...</div>;

  const handleBookNow = () => {
    navigate('/payment', {
      state: {
        bookingType: 'hotel',
        bookingDetails: {
          name: hotel.name,
          location: hotel.location,
          price: hotel.price,
          amenities: hotel.amenities,
        }
      }
    });
  };

  const USD_TO_INR = 83; // Update this rate as needed

  return (
    <main className="hotel-details-wrapper">
      <article className="hotel-details-card">
        <div className="hotel-details-left">
          <header className="hotel-details-header">
            <h1 className="hotel-details-title">{hotel.name}</h1>
            <div className="hotel-details-location" tabIndex={0} title={hotel.location}>
              📍 {hotel.location}
            </div>
            <p className="hotel-details-description">{hotel.description}</p>
          </header>
          <section className="hotel-details-section">
            <div className="hotel-details-meta">
              <div className="hotel-details-price-block">
                {/* Optional: Show old price for discount */}
                {/* <span className="old-price">₹{(hotel.price * USD_TO_INR * 1.18).toLocaleString()}</span> */}
                <div className="hotel-details-price-row">
                  <span className="hotel-details-price">
                    ₹{(hotel.price * USD_TO_INR).toLocaleString()}
                    <span className="per-night">/ night</span>
                  </span>
                  <span className="discount-badge">15% OFF</span>
                </div>
                {/* Optional: Show savings */}
                {/* <div className="savings-info">You save ₹{(hotel.price * USD_TO_INR * 0.18).toLocaleString()}!</div> */}
              </div>
            </div>
            <div className="hotel-details-amenities">
              <h3>Amenities</h3>
              <ul>
                {hotel.amenities.map((amenity, idx) => (
                  <li key={idx}>{amenity}</li>
                ))}
              </ul>
            </div>
            <button className="hotel-details-book-btn" onClick={handleBookNow}>
              Book Now
            </button>
          </section>
        </div>
      </article>
    </main>
  );
};

export default HotelDetails;