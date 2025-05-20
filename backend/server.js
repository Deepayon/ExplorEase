const express = require('express');  // if app.js exports an express app, good to import cors here
const cors = require('cors');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'https://exploreaze.netlify.app',  // frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
