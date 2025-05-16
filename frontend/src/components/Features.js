import React from 'react';  
import Feature from './Feature';  

const Features = () => {  
    const featuresData = [  
        { title: "Hotels", description: "Find the perfect stay for your journey." },  
        { title: "Transport", description: "Book the most convenient travel options." },  
        { title: "Packages", description: "Explore curated travel packages for your destination." },  
        { title: "Flights", description: "Compare and book affordable flights with ease." },  
        { title: "Car Rentals", description: "Rent vehicles at competitive prices." },  
        { title: "Cruises", description: "Sail away on luxurious cruises tailored for you." },  
        { title: "24/7 Support", description: "We’re here to help anytime, anywhere." },  
        { title: "Travel Insurance", description: "Secure your trips with our comprehensive plans." },  
    ];  

    return (  
        <section className="features">  
            {featuresData.map((feature, index) => (  
                <Feature key={index} title={feature.title} description={feature.description} />  
            ))}  
        </section>  
    );  
};  

export default Features;