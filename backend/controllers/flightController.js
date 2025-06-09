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

// exports.createFlights = async (req, res) => {
//   try {
//     // Clear existing flights
//     await Flight.deleteMany({});
//     // Insert sample flights
//     const sampleFlights = [
//       {
//         airline: "Air India",
//         flightNumber: "AI101",
//         from: "Kolkata",
//         to: "Delhi",
//         price: 4500,
//         departureTime: new Date(Date.now() + 86400000),
//         arrivalTime: new Date(Date.now() + 90000000),
//         duration: "2h 30m",
//         stops: 0,
//         aircraft: "Airbus A320",
//         amenities: ["WiFi", "Snacks", "In-flight Entertainment"],
//         baggage: { carry_on: "7kg", checked: "15kg" },
//         availableSeats: 30
//       },
//       {
//         airline: "IndiGo",
//         flightNumber: "6E202",
//         from: "Mumbai",
//         to: "Bangalore",
//         price: 3200,
//         departureTime: new Date(Date.now() + 172800000),
//         arrivalTime: new Date(Date.now() + 175800000),
//         duration: "1h 45m",
//         stops: 0,
//         aircraft: "Airbus A320",
//         amenities: ["Snacks"],
//         baggage: { carry_on: "7kg", checked: "15kg" },
//         availableSeats: 25
//       }
//       // Add more sample flights as needed
//     ];
  
//     await Flight.insertMany(sampleFlights);
//     res.status(201).json({ message: "Sample flights created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating sample flights", error: error.message });
//   }
// };
