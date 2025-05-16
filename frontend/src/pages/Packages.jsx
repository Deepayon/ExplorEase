import React, { useEffect, useState } from 'react';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sampleData = [
    { id: 1, name: 'Beach Getaway', description: '5-day beach vacation package', price: '$499' },
    { id: 2, name: 'Mountain Adventure', description: '7-day trekking in the mountains', price: '$799' },
    { id: 3, name: 'City Escape', description: '3-day city tour with all-inclusive meals', price: '$299' }
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simulating a real API request
        setTimeout(() => {
          setPackages(sampleData);
          setLoading(false);
        }, 2000);
      } catch (err) {
        setError('Failed to fetch package details.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="packages-container">
      <h2>Explore Our Packages</h2>
      {loading ? (
        <p>Loading packages...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ul className="packages-list">
          {packages.map((pkg) => (
            <li key={pkg.id} className="package-item">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <p>Price: {pkg.price}</p>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .packages-container {
          padding: 20px;
          background-color: #fff;
          text-align: center;
        }

        .packages-container h2 {
          font-size: 28px;
          color: #2a2a72;
        }

        .packages-list {
          list-style: none;
          padding: 0;
        }

        .package-item {
          background: #f4f4f9;
          border: 1px solid #ddd;
          margin: 10px auto;
          padding: 15px;
          max-width: 600px;
          text-align: left;
        }

        .package-item h3 {
          margin: 0 0 5px;
        }

        .error {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default Packages;
