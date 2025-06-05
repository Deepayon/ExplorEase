import React, { useState, useEffect } from 'react';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const samplePackages = [
    {
      id: 1, 
      name: 'Tropical Paradise Retreat', 
      description: 'Luxury beachfront experience in Bali',
      price: 1299,
      duration: '7 Days',
      location: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop'
    },
    {
      id: 2, 
      name: 'Alpine Mountain Expedition', 
      description: 'Exclusive hiking and wellness journey',
      price: 1799,
      duration: '10 Days', 
      location: 'Swiss Alps, Switzerland',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop'
    },
    {
      id: 3, 
      name: 'Urban Culture Immersion', 
      description: 'Premium city tour with culinary experiences',
      price: 999,
      duration: '5 Days',
      location: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPackages(samplePackages);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="packages-container">
      <h1 className="packages-title">Exclusive Travel Experiences</h1>
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div key={pkg.id} className="package-card">
              <img src={pkg.image} alt={pkg.name} className="package-image" />
              <div className="package-content">
                <h2 className="package-name">{pkg.name}</h2>
                <p className="package-description">{pkg.description}</p>
                <div className="package-details">
                  <div className="package-detail">
                    <span className="detail-icon">📍</span>
                    {pkg.location}
                  </div>
                  <div className="package-detail">
                    <span className="detail-icon">⏰</span>
                    {pkg.duration}
                  </div>
                </div>
                <div className="package-footer">
                  <span className="package-price">${pkg.price}</span>
                  <button className="book-button">Book Now →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .packages-container {
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          background-color: #f4f7f6;
        }

        .packages-title {
          text-align: center;
          color: #2c3e50;
          font-size: 2.5rem;
          margin-bottom: 40px;
          font-weight: 700;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #3498db;
          border-top: 4px solid #2980b9;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 100px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .package-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .package-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .package-content {
          padding: 25px;
        }

        .package-name {
          color: #2c3e50;
          font-size: 1.5rem;
          margin-bottom: 15px;
        }

        .package-description {
          color: #7f8c8d;
          margin-bottom: 20px;
        }

        .package-details {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .package-detail {
          display: flex;
          align-items: center;
          color: #34495e;
        }

        .detail-icon {
          margin-right: 10px;
        }

        .package-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .package-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2980b9;
        }

        .book-button {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .book-button:hover {
          background-color: #2980b9;
        }
      `}</style>
    </div>
  );
};

export default Packages;