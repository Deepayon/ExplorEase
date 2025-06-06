import React from 'react';
import { 
  Hotel, 
  Car, 
  Plane, 
  Ship, 
  MapPin, 
  Clock, 
  ShieldCheck,
  Package,
  Bot // Import Bot icon
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import
import './styles.css';


const iconMap = {
  "Hotels": Hotel,
  "Transport": Car,
  "Packages": Package,
  "Flights": Plane,
  "Car Rentals": Car,
  "Cruises": Ship,
  "24/7 Support": Clock,
  "Travel Insurance": ShieldCheck,
  "AI Assistant": Bot // Changed icon to Bot
};

// Add a map for routes
const routeMap = {
  "Hotels": "/hotels",
  "Flights": "/flights",
  "Packages": "/packages",
  "AI Assistant": "/assistant" // Add route for AI Assistant
};

const Feature = ({ title, description }) => {
  const IconComponent = iconMap[title] || MapPin;
  const route = routeMap[title];

  const cardContent = (
    <>
      <div className="feature-icon">
        <IconComponent size={32} strokeWidth={1.5} />
      </div>
      <div className="feature-title">{title}</div>
      <div className="feature-description">{description}</div>
    </>
  );

  // If the feature has a route, wrap it in a Link
  return route ? (
    <Link to={route} className="feature-card feature-link">
      {cardContent}
    </Link>
  ) : (
    <div className="feature-card">
      {cardContent}
    </div>
  );
};

const Features = () => {
  const featuresData = [
    { title: "Hotels", description: "Find the perfect stay for your journey." },
    { title: "Flights", description: "Compare and book affordable flights with ease." }, // Flights second
    { title: "Packages", description: "Explore curated travel packages for your destination." },
    { title: "Car Rentals", description: "Rent vehicles at competitive prices." },
    { title: "Cruises", description: "Sail away on luxurious cruises tailored for you." },
    { title: "24/7 Support", description: "We're here to help anytime, anywhere." },
    { title: "Travel Insurance", description: "Secure your trips with our comprehensive plans." },
    { title: "AI Assistant", description: "Chat with EaseBot for instant travel help." } // AI last
  ];

  return (
    <section className="features-section">
      <div className="features-title">
        <h2>Our Travel Services</h2>
        <p>Comprehensive solutions to make your travel experience seamless and enjoyable.</p>
      </div>
      <div className="features-grid">
        {featuresData.map((feature, index) => (
          <Feature 
            key={index} 
            title={feature.title} 
            description={feature.description} 
          />
        ))}
      </div>
    </section>
  );
};

export default Features;