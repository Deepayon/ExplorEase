const mongoose = require('mongoose');  

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "pending"],
    default: "pending",
  },
  passengers: [
    {
      name: String,
      age: Number,
      seatNumber: String,
    },
  ],
  totalPrice: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "failed"],
    default: "pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
