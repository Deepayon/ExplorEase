// app.js

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
const { errorHandler } = require('./middleware/errorMiddleware');  

require('dotenv').config();  

const cors = require('cors');
const app = express();  
connectDB();  

// ✅ Replace this whole CORS block
const allowedOrigins = [
  'https://exploreaze.netlify.app',                    // production
  'https://682c4e729262b0c793d1c4aa--exploreaze.netlify.app', // preview (optional)
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

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

// Error handling middleware  
app.use(errorHandler);  

module.exports = app;