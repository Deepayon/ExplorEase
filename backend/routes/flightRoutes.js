const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/', authenticate, flightController.createFlight);
router.get('/', flightController.getAllFlights);
router.get('/search', flightController.searchFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
