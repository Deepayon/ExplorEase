const Food = require('../models/foodModel');  

exports.createFood = async (req, res) => {  
  const food = new Food(req.body);  
  try {  
    await food.save();  
    res.status(201).json(food);  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating food', error });  
  }  
};  

exports.getFoods = async (req, res) => {  
  try {  
    const foods = await Food.find();  
    res.status(200).json(foods);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching foods', error });  
  }  
};