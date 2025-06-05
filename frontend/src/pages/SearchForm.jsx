import React, { useState } from 'react';
import './styles/SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
  });

  const validateInputs = () => {
    if (!searchParams.from.trim()) return 'Please enter departure location';
    if (!searchParams.to.trim()) return 'Please enter destination';
    if (!searchParams.date) return 'Please select a date';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateInputs();
    if (error) {
      alert(error);
      return;
    }
    onSearch(searchParams);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__group">
        <label htmlFor="from">From</label>
        <input
          id="from"
          type="text"
          value={searchParams.from}
          onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
          placeholder="Enter departure city"
        />
      </div>

      <div className="search-form__group">
        <label htmlFor="to">To</label>
        <input
          id="to"
          type="text"
          value={searchParams.to}
          onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
          placeholder="Enter destination city"
        />
      </div>

      <div className="search-form__group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={searchParams.date}
          onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
        />
      </div>

      <button type="submit" className="search-form__button">
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;