const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');

// Create a new booking
router.post('/', authenticate, bookingController.createBooking);

// Get user's bookings
router.get('/my-bookings', authenticate, bookingController.getUserBookings);

// Cancel a specific booking
router.patch('/:id/cancel', 
    authenticate, 
    bookingController.cancelBooking
);

// Get booking details
router.get('/:id', 
    authenticate, 
    bookingController.getBookingDetails
);

module.exports = router;