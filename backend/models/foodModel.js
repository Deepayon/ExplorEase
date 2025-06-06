const mongoose = require('mongoose');  

const foodSchema = new mongoose.Schema({  
  name: { type: String, required: true },  
  cuisine: { type: String, required: true },  
  price: { type: Number, required: true },  
});  

const Food = mongoose.model('Food', foodSchema);  
module.exports = Food;