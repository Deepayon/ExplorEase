const Itinerary = require('../models/itineraryModel');  

exports.createItinerary = async (req, res) => {  
  const itinerary = new Itinerary(req.body);  
  try {  
    await itinerary.save();  
    res.status(201).json(itinerary);  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating itinerary', error });  
  }  
};  

exports.getItineraries = async (req, res) => {  
  try {  
    const itineraries = await Itinerary.find();  
    res.status(200).json(itineraries);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching itineraries', error });  
  }  
};