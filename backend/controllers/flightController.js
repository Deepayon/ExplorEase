const  Flight  = require('../models/flightModel');

exports.createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchFlights = async (req, res) => {
    try {
      const { from, to, date } = req.query;
      const query = {};
      
      if (from) query.from = new RegExp(from, 'i');
      if (to) query.to = new RegExp(to, 'i');
      if (date) {
        // Parse the date string to UTC to avoid timezone issues
        const searchDate = new Date(date);
        const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
        
        query.departureTime = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      }
      
      const flights = await Flight.find(query);
      res.json(flights);
    } catch (error) {
      console.error('Flight search error:', error);
      res.status(500).json({ message: error.message });
    }
  };
  