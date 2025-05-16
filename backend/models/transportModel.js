const mongoose = require('mongoose');  

const transportSchema = new mongoose.Schema({  
  type: { type: String, required: true },  
  service: { type: String, required: true },  
  price: { type: Number, required: true },  
});  

const Transport = mongoose.model('Transport', transportSchema);  
module.exports = Transport;