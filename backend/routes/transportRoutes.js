const express = require('express');  
const router = express.Router();  
const transportController = require('../controllers/transportController');  

router.post('/', transportController.createTransport);  
router.get('/', transportController.getTransports);  

module.exports = router;