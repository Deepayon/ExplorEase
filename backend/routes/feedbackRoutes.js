const express = require('express');  
const router = express.Router();  
const feedbackController = require('../controllers/feedbackController.js');  

router.post('/', feedbackController.submitFeedback);  
router.get('/', feedbackController.getFeedbacks);  

module.exports = router;  