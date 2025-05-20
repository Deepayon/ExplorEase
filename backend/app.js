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
const MongoStore = require('connect-mongo');

const app = express();
connectDB();

// ✅ Secure CORS setup
const allowedOrigins = [
  'https://exploreaze.netlify.app',
  'https://682c4e729262b0c793d1c4aa--exploreaze.netlify.app',
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

// ✅ Production-ready session store with Mongo
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Auth middleware
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

// ✅ Root route for Render health check
app.get('/', (req, res) => {
  res.send('ExploreEase backend is live!');
});

// Error handler
app.use(errorHandler);

module.exports = app;
