const express = require('express');  
const router = express.Router();  
const suggestionController = require('../controllers/suggestionController');  

router.post('/', suggestionController.createSuggestion);  
router.get('/', suggestionController.getSuggestions);  

module.exports = router;