const express = require('express');  
const router = express.Router();  
const assistanceController = require('../controllers/assistanceController');  

router.get('/', assistanceController.getAssistance);  

module.exports = router;