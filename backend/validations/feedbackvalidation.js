const { body, validationResult } = require('express-validator');  

exports.feedbackValidation = [  
  body('username').notEmpty().withMessage('Username is required'),  
  body('comment').notEmpty().withMessage('Comment is required'),  
  body('rating').isNumeric().withMessage('Rating must be a number'),  
];  

exports.validate = (req, res, next) => {  
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });  
  }  
  next();  
};