const express = require('express');  
const router = express.Router();  
const authController = require('../controllers/authController');  
const { getCurrentUser } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/signup', authController.signup);  
router.post('/login', authController.login);  
router.get('/logout', authController.logout);  
router.get('/profile', authenticate, getCurrentUser);

module.exports = router;