const Booking = require("../models/bookingModel");
const Flight = require("../models/flightModel");
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { flightId, passengers } = req.body;

    // Validate input
    if (!flightId || !passengers || passengers.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid booking details"
      });
    }

    // Find flight with pessimistic locking
    const flight = await Flight.findById(flightId).session(session).setOptions({ lock: true });

    if (!flight) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        status: "error",
        message: "Flight not found"
      });
    }

    if (flight.availableSeats < passengers.length) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        status: "error",
        message: "Not enough seats available"
      });
    }

    // Validate passenger details
    const validPassengers = passengers.map(p => ({
      name: p.name.trim(),
      age: parseInt(p.age),
      seatNumber: `${Math.floor(Math.random() * 30) + 1}${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`
    }));

    const booking = new Booking({
      user: req.user._id,
      flight: flightId,
      passengers: validPassengers,
      totalPrice: flight.price * passengers.length,
      status: "confirmed",
      paymentStatus: "pending"
    });

    // Save booking within transaction
    await booking.save({ session });

    // Update flight seats within transaction
    flight.availableSeats -= passengers.length;
    await flight.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "success",
      data: booking
    });

  } catch (error) {
    // Rollback transaction if error occurs
    await session.abortTransaction();
    session.endSession();

    console.error("Booking error:", error);
    res.status(500).json({
      status: "error",
      message: "Booking failed. Please try again."
    });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: 'flight',
        select: 'airline flightNumber from to departureTime'
      })
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const booking = await Booking.findById(req.params.id).session(session);

    if (!booking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent cancellation close to departure
    const flight = await Flight.findById(booking.flight).session(session);
    const departureTime = new Date(flight.departureTime);
    const now = new Date();
    
    if ((departureTime - now) < 24 * 60 * 60 * 1000) { // Less than 24 hours before departure
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Cannot cancel within 24 hours of departure" });
    }

    booking.status = "cancelled";
    booking.paymentStatus = "refunded";
    await booking.save({ session });

    // Restore available seats
    flight.availableSeats += booking.passengers.length;
    await flight.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json(booking);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: 'flight',
        select: 'airline flightNumber from to departureTime price aircraft'
      });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};