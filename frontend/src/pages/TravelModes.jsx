import React, { useState } from "react";
import "./styles/TravelModes.css";

const TravelModes = () => {
  const [activeMode, setActiveMode] = useState("flight");

  const modes = [
    { id: "flight", icon: "✈️", label: "Flights" },
    { id: "hotel", icon: "🏨", label: "Hotels" },
    // { id: 'car', icon: '🚗', label: 'Cars' },
  ];

  return (
    <div className="travel-modes">
      {modes.map((mode) => (
        <button
          key={mode.id}
          className={`travel-modes__button ${
            activeMode === mode.id ? "active" : ""
          }`}
          onClick={() => setActiveMode(mode.id)}
        >
          <span className="travel-modes__icon">{mode.icon}</span>
          <span className="travel-modes__label">{mode.label}</span>
        </button>
      ))}
    </div>
  );
};

export default TravelModes;
