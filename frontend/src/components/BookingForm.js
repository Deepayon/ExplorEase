import React, { useState } from "react";
import api from "../utils/api.js";
import "./BookingForm.css";

const BookingForm = ({ hotelId }) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken"); // Retrieve the token from localStorage

    try {
      await api.post(
        `/hotels/${hotelId}/book`,
        {
          hotelId,
          roomNumber,
          checkInDate,
          checkOutDate,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Pass the token in the Authorization header
          },
        }
      );
      alert("Hotel booked successfully!");
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Error booking hotel. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label htmlFor="checkInDate">Check-in Date:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="checkOutDate">Check-out Date:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="roomNumber">Room Number:</label>
        <input
          type="text"
          id="roomNumber"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
