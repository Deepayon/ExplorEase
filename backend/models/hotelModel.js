const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  amenities: [{ type: String }],
  rooms: [
    {
      roomNumber: { type: Number, required: true },
      roomType: { type: String, required: true },
      capacity: { type: Number, required: true },
      available: { type: Boolean, default: true }
    }
  ],
  bookings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      checkInDate: { type: Date, required: true },
      checkOutDate: { type: Date, required: true },
      roomNumber: { type: Number, required: true },
      totalPrice: { type: Number, required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hotel', hotelSchema);