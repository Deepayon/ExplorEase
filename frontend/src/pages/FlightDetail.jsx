import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FlightDetail = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passengers, setPassengers] = useState([{ name: '', age: '' }]);
  const [bookingError, setBookingError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        setFlight(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching flight details:', err);
        setError('Failed to fetch flight details');
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id]);

  const addPassenger = () => {
    if (passengers.length < flight.availableSeats) {
      setPassengers([...passengers, { name: '', age: '' }]);
    }
  };

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleBooking = async () => {
    setBookingError(null);

    const isValidPassengers = passengers.every(passenger =>
      passenger.name.trim() && passenger.age && parseInt(passenger.age) > 0
    );

    if (!isValidPassengers) {
      setBookingError('Please fill in valid passenger details');
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      
      const response = await axios.post('http://localhost:5000/api/bookings', 
        {
          flightId: flight._id,
          passengers
        },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );

      alert('Booking successful!');
      setIsBookingModalOpen(false);
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '20px'}}>Loading flight details...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center', padding: '20px'}}>{error}</div>;
  if (!flight) return <div style={{color: 'red', textAlign: 'center', padding: '20px'}}>No flight found</div>;

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    }}>
      {/* Flight Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        borderBottom: '1px solid #eee',
        paddingBottom: '20px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          marginRight: '20px'
        }}>
          {flight.airline.charAt(0)}
        </div>
        <div>
          <h1 style={{margin: '0', fontSize: '24px'}}>{flight.airline} Flight {flight.flightNumber}</h1>
          <p style={{margin: '5px 0 0', color: '#666'}}>Your journey awaits</p>
        </div>
      </div>

      {/* Flight Route Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px'
      }}>
        <div style={{textAlign: 'left'}}>
          <h3>Departure</h3>
          <p>{flight.from}</p>
          <span>{new Date(flight.departureTime).toLocaleString()}</span>
        </div>
        <div style={{
          width: '50px',
          height: '2px',
          backgroundColor: '#007bff',
          position: 'relative',
          top: '20px'
        }}>
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '-8px',
            fontSize: '20px',
            color: '#007bff'
          }}>
            →
          </div>
        </div>
        <div style={{textAlign: 'right'}}>
          <h3>Arrival</h3>
          <p>{flight.to}</p>
          <span>{new Date(flight.arrivalTime).toLocaleString()}</span>
        </div>
      </div>

      {/* Detailed Information */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px'
      }}>
        <div style={{
          border: '1px solid #eee',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Flight Information</h3>
          <p><strong>Aircraft:</strong> {flight.aircraft}</p>
          <p><strong>Duration:</strong> {flight.duration}</p>
          <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
        </div>
        <div style={{
          border: '1px solid #eee',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Pricing</h3>
          <p style={{
            fontSize: '24px',
            color: '#007bff',
            fontWeight: 'bold'
          }}>${flight.price.toFixed(2)}</p>
          <p>Includes all taxes and fees</p>
        </div>
      </div>

      {/* Booking Button */}
      <div style={{
        textAlign: 'center',
        marginTop: '30px'
      }}>
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Book This Flight
        </button>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%'
          }}>
            <h2>Book Flight: {flight.airline}</h2>
            {passengers.map((passenger, index) => (
              <div key={index} style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <input
                  placeholder="Passenger Name"
                  value={passenger.name}
                  onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                  style={{
                    width: '100px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
              </div>
            ))}
            {bookingError && <p style={{color: 'red'}}>{bookingError}</p>}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px'
            }}>
              <button 
                onClick={addPassenger}
                disabled={passengers.length >= flight.availableSeats}
                style={{
                  padding: '10px',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px'
                }}
              >
                Add Passenger
              </button>
              <div>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBooking}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetail;