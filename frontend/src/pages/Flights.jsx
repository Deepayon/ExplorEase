import React, { useEffect, useState } from 'react';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sampleData = [
    { id: 1, airline: 'Airline A', from: 'New York', to: 'Los Angeles', price: '$200' },
    { id: 2, airline: 'Airline B', from: 'Chicago', to: 'Miami', price: '$150' },
    { id: 3, airline: 'Airline C', from: 'San Francisco', to: 'Las Vegas', price: '$180' }
  ];

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        // Simulating a real API request
        setTimeout(() => {
          setFlights(sampleData);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError('Failed to fetch flights.');
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="flights-container">
      <h2>Available Flights</h2>
      {loading ? (
        <p>Loading flights...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="flights-list">
          {flights.map((flight) => (
            <li key={flight.id} className="flight-item">
              <h3>{flight.airline}</h3>
              <p>{flight.from} to {flight.to}</p>
              <p>Price: {flight.price}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .flights-container {
          padding: 20px;
          background-color: #f4f4f9;
          text-align: center;
        }

        .flights-container h2 {
          font-size: 28px;
          color: #2a2a72;
        }

        .flights-list {
          list-style: none;
          padding: 0;
        }

        .flight-item {
          background: #fff;
          border: 1px solid #ddd;
          margin: 10px auto;
          padding: 15px;
          max-width: 600px;
          text-align: left;
        }

        .flight-item h3 {
          margin: 0 0 5px;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Flights;
