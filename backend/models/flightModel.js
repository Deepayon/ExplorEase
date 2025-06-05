const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  duration: String,
  stops: {
    type: Number,
    default: 0,
  },
  aircraft: String,
  amenities: [String],
  baggage: {
    carry_on: String,
    checked: String,
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight;
