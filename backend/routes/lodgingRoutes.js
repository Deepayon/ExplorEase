const express = require('express');  
const router = express.Router();  
const lodgingController = require('../controllers/lodgingController');  

router.post('/', lodgingController.createLodging);  
router.get('/', lodgingController.getLodgings);  

module.exports = router;