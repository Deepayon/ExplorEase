import React from 'react';  
import { Link } from 'react-router-dom';

const Navbar = () => {  
    return (  
        <header>  
            <h1>ExplorEase</h1>  
            <nav>  
                <ul>  
                    <li><a href="/Home">Home</a></li>  
                    <li><a href="/Hotels">Hotels</a></li>  
                    <li><a href="/Transports">Transport</a></li>  
                    <li><a href="/Packages">Packages</a></li>  
                    <li><a href="/Flights">Flights</a></li>  
                    <li><a href="/Car">Car Rentals</a></li>  
                    <li><a href="/Cruises">Cruises</a></li>  
                    <li><a href="/Contact">Contact</a></li>  
                    <li><a href="/Login">Login</a></li>  
                  
        
                </ul>  
            </nav>  
        </header>  
    );  
};  

export default Navbar;