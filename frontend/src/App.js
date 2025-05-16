import React from 'react';  
import Navbar from './components/Navbar';  
import Hero from './components/Hero';  
import Features from './components/Features';  
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Transports from './pages/Transports';
import Packages from './pages/Packages';
import Flights from './pages/Flights';
import Car from './pages/CarRentals';
import Cruises from './pages/Cruises';
import Contact from './pages/Contact';
const App = () => {  
    return (  
        
            

            <Router>
                <Navbar />  
                <Routes>
                <Route  path='/' element={<Home/>}></Route>

                <Route  path='/Home' element={<Home/>}></Route>
                    <Route  path='/Login' element={<Login/>}></Route>
                    <Route  path='/Signup' element={<Signup/>}></Route>
                    <Route path="/Hotels" element={<Hotels/>} />
          <Route path="/Transports" element={<Transports/>} />
          <Route path="/Packages" element={<Packages/>} />
          <Route path="/Flights" element={<Flights/>} />
          <Route path="/Car" element={<Car/>} />
          <Route path="/Cruises" element={<Cruises/>} />
          <Route path="/Contact" element={<Contact/>} />
                </Routes>
              
           
            </Router>
            
      
    );  
};  

export default App;