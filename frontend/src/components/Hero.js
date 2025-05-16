import React, { useState } from "react";

const Hero = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchParams, setSearchParams] = useState({
        from: "",
        to: "",
        travelMode: "",
    });

    const dummyData = [
        { id: 1, from: "Kolkata", to: "Asansol", travelMode: "train", price: "Rs.300" },
        { id: 2, from: "Asansol", to: "Durgapur", travelMode: "bus", price: "Rs.150" },
        { id: 3, from: "Durgapur", to: "Kolkata", travelMode: "train", price: "Rs.300" },
        { id: 4, from: "New York", to: "Los Angeles", travelMode: "flight", price: "Rs.70000" },
        { id: 5, from: "Italy", to: "London", travelMode: "flight", price: "90000" },
        
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = () => {
        const { from, to, travelMode } = searchParams;

        const filteredResults = dummyData.filter((option) => {
            const isFromMatch = from ? option.from.toLowerCase().includes(from.toLowerCase()) : true;
            const isToMatch = to ? option.to.toLowerCase().includes(to.toLowerCase()) : true;
            const isModeMatch = travelMode ? option.travelMode === travelMode : true;
            return isFromMatch && isToMatch && isModeMatch;
        });

        setSearchResults(filteredResults);
    };

    return (
        <section className="hero">
            <h2>Discover, Plan, and Book</h2>
            <p>Your one-stop solution for all travel needs</p>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="From"
                    name="from"
                    value={searchParams.from}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="To"
                    name="to"
                    value={searchParams.to}
                    onChange={handleInputChange}
                />
                <input type="date" />
                <input type="time" />
                <select
                    name="travelMode"
                    value={searchParams.travelMode}
                    onChange={handleInputChange}
                >
                    <option value="">Select Travel Mode</option>
                    <option value="flight">Flight</option>
                    <option value="train">Train</option>
                    <option value="bus">Bus</option>
                    <option value="car">Car</option>
                    <option value="cruise">Cruise</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            {searchResults.length > 0 ? (
                <div className="results">
                    <h3>Search Results:</h3>
                    <ul>
                        {searchResults.map((result) => (
                            <li key={result.id}>
                                {result.from} → {result.to} | {result.travelMode} | {result.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No results found. Try adjusting your search.</p>
            )}
        </section>
    );
};

export default Hero;