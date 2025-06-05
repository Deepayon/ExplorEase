const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");
const { authenticate } = require("../middleware/authMiddleware");

// Create 10 sample hotels when server starts
router.post("/init", hotelController.createHotels);

// Fetch all hotels
router.get("/", hotelController.getAllHotels);

// Fetch hotel details
router.get("/:id", hotelController.getHotelDetails);

// Book a hotel (requires authentication)
router.post("/:id/book", authenticate, hotelController.bookHotel);

module.exports = router;
