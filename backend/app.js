const express = require('express');  
const session = require('express-session');  
const passport = require('passport');  
const connectDB = require('./config/db');  
const authRoutes = require('./routes/authRoutes');  
const itineraryRoutes = require('./routes/itineraryRoutes');  
const lodgingRoutes = require('./routes/lodgingRoutes');  
const transportRoutes = require('./routes/transportRoutes');  
const foodRoutes = require('./routes/foodRoutes');  
const feedbackRoutes = require('./routes/feedbackRoutes');  
const suggestionRoutes = require('./routes/suggestionRoutes');  
const assistanceRoutes = require('./routes/assistanceRoutes');  
const flightRoutes= require("./routes/flightRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const hotelRoutes = require("./routes/hotelRoutes")
const { errorHandler } = require('./middleware/errorMiddleware');  

require('dotenv').config();  

// Initialize app and connect to database  
const cors = require('cors');
const app = express();  
connectDB();  
app.use(cors({
    origin: [
      'http://localhost:3000', //dev
      // 'https://xplorez.netlify.app' // actual frontend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.options("*", cors());
  
  
// Middleware  
app.use(express.json());  
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));  
app.use(passport.initialize());  
app.use(passport.session());  

// Routes  
app.use('/api/auth', authRoutes);  
app.use('/api/itinerary', itineraryRoutes);  
app.use('/api/lodging', lodgingRoutes);  
app.use('/api/transport', transportRoutes);  
app.use('/api/food', foodRoutes);  
app.use('/api/feedback', feedbackRoutes);  
app.use('/api/suggestions', suggestionRoutes);  
app.use('/api/assistance', assistanceRoutes);  
app.use("/api/flights",flightRoutes)
app.use("/api/bookings",bookingRoutes)
app.use("/api/hotels",hotelRoutes)

// AI Routes
const aiRoutes = require('./routes/AiRoutes');
app.use('/api/ai', aiRoutes);

// Error handling middleware  
app.use(errorHandler);  

app.get('/', (req, res) => {
  res.send('API is running!');
});

module.exports = app;

