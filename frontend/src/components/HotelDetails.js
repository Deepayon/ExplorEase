import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from './BookingForm';
import './HotelDetails.css';

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/${id}`);
        setHotel(response.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="hotel-details">
      <div className="hotel-header">
        <h2>{hotel.name}</h2>
        <p>{hotel.description}</p>
        <p>Price: ${hotel.price} per night</p>
        <p>Location: {hotel.location}</p>
      </div>
      <div className="hotel-amenities">
        <h3>Amenities</h3>
        <ul>
          {hotel.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>
      <div className="hotel-rooms">
        <h3>Rooms</h3>
        <table>
          <thead>
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Capacity</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {hotel.rooms.map((room, index) => (
              <tr key={index}>
                <td>{room.roomNumber}</td>
                <td>{room.roomType}</td>
                <td>{room.capacity}</td>
                <td>{room.available ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="hotel-booking">
        <h3>Book Your Stay</h3>
        <BookingForm hotelId={hotel._id} />
      </div>
    </div>
  );
};

export default HotelDetails;