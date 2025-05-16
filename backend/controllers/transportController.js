const Transport = require('../models/transportModel');  

exports.createTransport = async (req, res) => {  
  const transport = new Transport(req.body);  
  try {  
    await transport.save();  
    res.status(201).json(transport);  
  } catch (error) {  
    res.status(400).json({ message: 'Error creating transport', error });  
  }  
};  

exports.getTransports = async (req, res) => {  
  try {  
    const transports = await Transport.find();  
    res.status(200).json(transports);  
  } catch (error) {  
    res.status(500).json({ message: 'Error fetching transports', error });  
  }  
};