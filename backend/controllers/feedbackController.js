const Feedback = require('../models/feedbackModels.js');  

exports.submitFeedback = async (req, res) => {  
  const feedback = new Feedback(req.body);  
  try {  
    await feedback.save();  
    res.status(201).json(feedback);  
  } catch (error) {  
    res.status(400).json({ message: 'Error submitting feedback', error });  
  }  
};  

exports.getFeedbacks = async (req, res) => {  
  try {  
    const feedbacks = await Feedback.find();  
    res.status(200).json(feedbacks);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching feedbacks', error });  
  }  
};