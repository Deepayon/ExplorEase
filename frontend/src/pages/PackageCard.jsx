import React from 'react';
import './styles/PackageCard.css';

const PackageCard = ({ pkg, onBookNow }) => (
  <div className="package-card">
    <h3>{pkg.title}</h3>
    <p>{pkg.description}</p>
    <p>Location: {pkg.location}</p>
    <p>Price: ₹{pkg.price}</p>
    <button className="book-now-btn" onClick={onBookNow}>
      Book Now
    </button>
  </div>
);

export default PackageCard;