const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication required. No token provided.'
      });
    }
    
    // Extract token
    const token = authHeader.split(' ')[1];
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists
      const currentUser = await User.findById(decoded.userId);
      if (!currentUser) {
        return res.status(401).json({
          status: 'error',
          message: 'User no longer exists.'
        });
      }
      
      // Add user to request object - this is the key change
      req.user = currentUser;
      next();
    } catch (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token or token expired.'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error.'
    });
  }
};
