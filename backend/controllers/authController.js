// controllers/authController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
  console.log(`[INFO] Generating token for user: ${user.username} (ID: ${user._id})`);
  return jwt.sign(
    { userId: user._id, username: user.username }, // Changed 'id' to 'userId' to match middleware
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Signup
exports.signup = async (req, res) => {
  console.log(`[INFO] Signup request received: ${JSON.stringify(req.body)}`);
  const { username, password, email } = req.body;

  // Validate input
  if (!username || !password) {
    console.log('[ERROR] Username or password missing.');
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  if (password.length < 6) {
    console.log('[ERROR] Password length is less than 6 characters.');
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    console.log(`[INFO] Checking if username "${username}" already exists.`);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('[ERROR] Username is already taken.');
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    console.log('[INFO] Creating new user.');
    const newUser = new User({ username, password, email });
    await newUser.save();
    console.log(`[SUCCESS] User "${username}" created successfully.`);

    // Generate token
    const token = generateToken(newUser);
    console.log("back here")


    console.log('[INFO] Signup successful. Sending response.');
    res.status(201).json({
      status: 'success',
      data: {
        user: { id: newUser._id, username: newUser.username },
        token
      }
    });
  } catch (error) {
    console.log(`[ERROR] Signup failed: ${error.message}`);
    res.status(500).json({ 
      status: 'error',
      message: 'Signup failed.', 
      error: error.message 
    });
  }
};

// Login
exports.login = async (req, res) => {
  console.log(`[INFO] Login request received: ${JSON.stringify(req.body)}`);
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    console.log('[ERROR] Username or password missing.');
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    console.log(`[INFO] Checking if user "${username}" exists.`);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('[ERROR] User not found.');
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('[INFO] Comparing passwords.');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('[ERROR] Invalid credentials provided.');
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    console.log('[INFO] Password match successful. Generating token.');
    const token = generateToken(user);

    console.log('[INFO] Login successful. Sending response.');
    res.status(200).json({
      status: 'success',
      data: {
        user: { id: user._id, username: user.username },
        token
      }
    });
  } catch (error) {
    console.log(`[ERROR] Login failed: ${error.message}`);
    res.status(500).json({ 
      status: 'error',
      message: 'Login failed.', 
      error: error.message 
    });
  }
};

// Get current user profile
exports.getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    console.log("User in getCurrentUser:", user); // <-- Add this line
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      username: user.username,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  console.log('[INFO] Logout request received.');
  // Since JWT is stateless, we just send a success response
  // The client should remove the token
  res.status(200).json({ 
    status: 'success',
    message: 'Logged out successfully.' 
  });
};