const User = require('../models/userModel');  

exports.signup = async (req, res) => {  
  const { username, password } = req.body;  
  const newUser = new User({ username, password });  
  try {  
    await newUser.save();  
    res.status(201).json(newUser);  
  } catch (error) {  
    res.status(400).json({ message: 'Signup failed', error });  
  }  
};  

exports.login = (req, res) => {  
  res.status(200).json({ message: 'Logged in successfully' });  
};  

exports.logout = (req, res) => {  
  req.logout();  
  res.status(200).json({ message: 'Logged out successfully' });  
};