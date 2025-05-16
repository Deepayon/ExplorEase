const mongoose = require('mongoose');  

const lodgingSchema = new mongoose.Schema({  
  name: { type: String, required: true },  
  location: { type: String, required: true },  
  price: { type: Number, required: true },  
});  

const Lodging = mongoose.model('Lodging', lodgingSchema);  
module.exports = Lodging;