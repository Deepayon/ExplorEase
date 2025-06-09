import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./HotelDetails.css"

const HotelDetails = () => {
  const { id } = useParams();
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

  if (notFound) return <div>Hotel not found.</div>;
  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="hotel-details-container">
      <h1 className="hotel-details-title">{hotel.name}</h1>
      <div className="hotel-details-content">
        <div className="hotel-details-image">
          <img src={`/api/placeholder/800/600`} alt={hotel.name} />
        </div>
        <div className="hotel-details-info">
          <p className="hotel-details-description">{hotel.description}</p>
          <p className="hotel-details-location">Location: {hotel.location}</p>
          <p className="hotel-details-price">Price: ${hotel.price} per night</p>
          <p className="hotel-details-amenities">Amenities: {hotel.amenities.join(', ')}</p>
          <button className="hotel-details-book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;