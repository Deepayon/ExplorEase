const Lodging = require('../models/lodgingModel');  

exports.createLodging = async (req, res) => {  
  const lodging = new Lodging(req.body);  
  try {  
    await lodging.save();  
    res.status(201).json(lodging);  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating lodging', error });  
  }  
};  

exports.getLodgings = async (req, res) => {  
  try {  
    const lodgings = await Lodging.find();  
    res.status(200).json(lodgings);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching lodgings', error });  
  }  
};