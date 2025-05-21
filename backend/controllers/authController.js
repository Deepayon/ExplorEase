const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// SIGNUP: Hash password before saving
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Signup failed', error });
  }
};

// LOGIN: Compare hashed passwords
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Optional: add session creation or JWT here
    res.status(200).json({ message: 'Logged in successfully', user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

exports.logout = (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout failed', error: err });
    res.status(200).json({ message: 'Logged out successfully' });
  });
};