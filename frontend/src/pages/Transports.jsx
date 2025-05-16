import React from 'react';

// Sample data for transports
const transportsData = [
  { 
    id: 1, 
    type: 'Bus', 
    name: 'Luxury Bus', 
    price: '$50', 
    image: 'https://via.placeholder.com/250x150?text=Luxury+Bus'
  },
  { 
    id: 2, 
    type: 'Train', 
    name: 'Express Train', 
    price: '$100', 
    image: 'https://via.placeholder.com/250x150?text=Express+Train'
  },
  { 
    id: 3, 
    type: 'Flight', 
    name: 'Flight A1', 
    price: '$300', 
    image: 'https://via.placeholder.com/250x150?text=Flight+A1'
  },
];

const Transports = () => {
  return (
    <div className="transports-container">
      <h2>Explore Our Transport Options</h2>
      <div className="transport-list">
        {transportsData.map((transport) => (
          <div key={transport.id} className="transport-card">
            <img src={transport.image} alt={transport.name} className="transport-image" />
            <div className="transport-details">
              <h3 className="transport-name">{transport.name}</h3>
              <p className="transport-type">{transport.type}</p>
              <p className="transport-price">{transport.price}</p>
              <button className="btn-book">Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transports;

// Adding styles here for the component
const styles = `
.transports-container {
  padding: 40px 20px;
  background-color: #f0f0f0;
  text-align: center;
}

.transports-container h2 {
  font-size: 2rem;
  margin-bottom: 30px;
  color: #333;
}

.transport-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.transport-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.transport-card:hover {
  transform: scale(1.05);
}

.transport-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.transport-details {
  padding: 20px;
  text-align: left;
}

.transport-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.transport-type {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.transport-price {
  font-size: 1.2rem;
  color: #e91e63;
  font-weight: bold;
}

.btn-book {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e91e63;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-book:hover {
  background-color: #c2185b;
}
`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`); // Adding styles to the head of the document

