const mongoose = require('mongoose');  

const itinerarySchema = new mongoose.Schema({  
  title: { type: String, required: true },  
  budget: { type: Number, required: true },  
  activities: [{ type: String }],  
});  

const Itinerary = mongoose.model('Itinerary', itinerarySchema);  
module.exports = Itinerary;