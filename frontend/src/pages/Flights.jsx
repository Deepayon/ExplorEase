import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingModal from "./BookingModal";
import "./FlightStyles.css";

const FlightDetailModal = ({ flight, onClose }) => {
  if (!flight) return null;

  return (
    <div className="flight-detail-modal">
      <div className="flight-detail-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="flight-detail-header">
          <h2>
            {flight.airline} - {flight.flightNumber}
          </h2>
        </div>
        <div className="flight-detail-grid">
          <div className="flight-detail-section">
            <h3>Flight Route</h3>
            <p>
              <strong>From:</strong> {flight.from}
            </p>
            <p>
              <strong>To:</strong> {flight.to}
            </p>
          </div>
          <div className="flight-detail-section">
            <h3>Schedule</h3>
            <p>
              <strong>Departure:</strong>{" "}
              {new Date(flight.departureTime).toLocaleString()}
            </p>
            <p>
              <strong>Arrival:</strong>{" "}
              {new Date(flight.arrivalTime).toLocaleString()}
            </p>
            <p>
              <strong>Duration:</strong> {flight.duration}
            </p>
          </div>
          <div className="flight-detail-section">
            <h3>Pricing & Seats</h3>
            <p>
              <strong>Price:</strong> ${flight.price.toFixed(2)}
            </p>
            <p>
              <strong>Available Seats:</strong> {flight.availableSeats}
            </p>
          </div>
          <div className="flight-detail-section">
            <h3>Aircraft Details</h3>
            <p>
              <strong>Aircraft:</strong> {flight.aircraft}
            </p>
            <p>
              <strong>Baggage:</strong>
            </p>
            <ul>
              <li>Carry-on: {flight.baggage.carry_on}</li>
              <li>Checked: {flight.baggage.checked}</li>
            </ul>
          </div>
          <div className="flight-detail-section full-width">
            <h3>Amenities</h3>
            <div className="amenities-list">
              {flight.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="flight-detail-actions">
          <button className="book-now-button">Book Now</button>
        </div> */}
      </div>
    </div>
  );
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingFlight, setBookingFlight] = useState(null);

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:5000/api/flights");
        if (response.data && Array.isArray(response.data)) {
          setFlights(response.data);
        } else {
          setFlights([]);
        }
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Failed to fetch flights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookingComplete = (bookingData) => {
    // Update UI after successful booking
    const updatedFlights = flights.map((flight) =>
      flight._id === bookingData.data.flight
        ? {
            ...flight,
            availableSeats:
              flight.availableSeats - bookingData.data.passengers.length,
          }
        : flight
    );
    setFlights(updatedFlights);
    setBookingFlight(null);
  };

  return (
    <div className="flights-container">
      <header className="flights-header">
        <h1>Explore Your Next Journey</h1>
        <p>Discover amazing flights tailored to your travel needs</p>
      </header>

      {loading && <div className="loading-spinner"></div>}

      {error && <div className="error-message">{error}</div>}

      <div className="flights-grid">
        {!loading &&
          !error &&
          flights.map((flight) => (
            <div
              key={flight._id}
              className="flight-card"
              onClick={() => setSelectedFlight(flight)}
            >
              <div className="flight-card-header">
                <h3>{flight.airline}</h3>
                <span className="flight-number">{flight.flightNumber}</span>
              </div>
              <div className="flight-card-route">
                <span>{flight.from}</span>
                <span className="route-arrow">→</span>
                <span>{flight.to}</span>
              </div>
              <div className="flight-card-price">
                ${flight.price.toFixed(2)}
              </div>
              <div className="flight-card-details">
                <span>
                  {new Date(flight.departureTime).toLocaleDateString()}
                </span>
                <span className="seats-indicator">
                  {flight.availableSeats} seats left
                </span>
              </div>
              <button
                style={{
                  marginTop: "16px",
                  backgroundColor:
                    flight.availableSeats === 0 ? "#cccccc" : "#007bff", // Gray for disabled, blue for active
                  color: flight.availableSeats === 0 ? "#666666" : "#ffffff", // Adjust text color based on state
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "600",
                  borderRadius: "8px",
                  border: "none",
                  cursor:
                    flight.availableSeats === 0 ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  textTransform: "uppercase",
                }}
                onMouseEnter={(e) => {
                  if (flight.availableSeats > 0)
                    e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  if (flight.availableSeats > 0)
                    e.target.style.transform = "scale(1)";
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setBookingFlight(flight);
                }}
                disabled={flight.availableSeats === 0}
              >
                Book Now
              </button>
            </div>
          ))}
      </div>

      {selectedFlight && (
        <FlightDetailModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}

      {bookingFlight && (
        <BookingModal
          flight={bookingFlight}
          onClose={() => setBookingFlight(null)}
          onBookingComplete={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default Flights;
