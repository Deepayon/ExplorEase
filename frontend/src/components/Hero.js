import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { flightAPI } from '../services/api';
import SearchForm from '../pages/SearchForm';
import TravelModes from '../pages/TravelModes';
import FlightResults from '../pages/FlightResults';
import './styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async (searchParams) => {
    setSearchAttempted(true);
    setError(null);
    setIsLoading(true);

    try {
      const data = await flightAPI.searchFlights(searchParams);
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlightSelect = (flightId) => {
    navigate(`/flights/${flightId}`);
  };

  return (
    <div className="hero-container">
      <div className="hero-header">
        <h1>Discover Your Next Adventure</h1>
        <p>Seamless flight booking at your fingertips</p>
      </div>

      <div className="hero-content">
        <TravelModes />
        <SearchForm onSearch={handleSearch} />

        {error && <div className="hero-error">{error}</div>}

        {isLoading ? (
          <div className="hero-loading">
            <div className="loading-spinner"></div>
            <p>Searching for your perfect flight...</p>
          </div>
        ) : (
          <FlightResults
            flights={searchResults}
            searchAttempted={searchAttempted}
            onFlightSelect={handleFlightSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;