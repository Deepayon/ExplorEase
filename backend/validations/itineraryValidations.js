const { body, validationResult } = require('express-validator');  

exports.itineraryValidation = [  
  body('title').notEmpty().withMessage('Title is required'),  
  body('budget').isNumeric().withMessage('Budget must be a number'),  
];  

exports.validate = (req, res, next) => {  
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });  
  }  
  next();  
};