const Suggestion = require('../models/suggestionModel');  

exports.createSuggestion = async (req, res) => {  
  const suggestion = new Suggestion(req.body);  
  try {  
    await suggestion.save();  
    res.status(201).json(suggestion);  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating suggestion', error });  
  }  
};  

exports.getSuggestions = async (req, res) => {  
  try {  
    const suggestions = await Suggestion.find();  
    res.status(200).json(suggestions);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching suggestions', error });  
  }  
};