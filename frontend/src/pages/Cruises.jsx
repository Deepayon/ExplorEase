import React, { useEffect, useState } from 'react';

const Cruises = () => {
  const [cruises, setCruises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sampleData = [
    { id: 1, name: 'Caribbean Cruise', duration: '7 days', price: '$700' },
    { id: 2, name: 'Mediterranean Cruise', duration: '10 days', price: '$900' },
    { id: 3, name: 'Alaskan Cruise', duration: '14 days', price: '$1300' }
  ];

  useEffect(() => {
    const fetchCruises = async () => {
      try {
        // Simulating a real API request
        setTimeout(() => {
          setCruises(sampleData);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError('Failed to fetch cruises.');
        setLoading(false);
      }
    };

    fetchCruises();
  }, [sampleData]); // 

  return (
    <div className="cruises-container">
      <h2>Explore Our Cruises</h2>
      {loading ? (
        <p>Loading cruises...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="cruises-list">
          {cruises.map((cruise) => (
            <li key={cruise.id} className="cruise-item">
              <h3>{cruise.name}</h3>
              <p>Duration: {cruise.duration}</p>
              <p>Price: {cruise.price}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .cruises-container {
          padding: 20px;
          background-color: #f4f4f9;
          text-align: center;
        }

        .cruises-container h2 {
          font-size: 28px;
          color: #2a2a72;
        }

        .cruises-list {
          list-style: none;
          padding: 0;
        }

        .cruise-item {
          background: #fff;
          border: 1px solid #ddd;
          margin: 10px auto;
          padding: 15px;
          max-width: 600px;
          text-align: left;
        }

        .cruise-item h3 {
          margin: 0 0 5px;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Cruises;
