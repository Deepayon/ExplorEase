const mongoose = require('mongoose');  

const suggestionSchema = new mongoose.Schema({  
  user: { type: String, required: true },  
  suggestion: { type: String, required: true },  
});  

const Suggestion = mongoose.model('Suggestion', suggestionSchema);  
module.exports = Suggestion;