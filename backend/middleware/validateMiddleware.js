const { body, validationResult } = require('express-validator');  

exports.validateSignup = [  
  body('username').notEmpty().withMessage('Username is required'),  
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),  
  (req, res, next) => {  
    const errors = validationResult(req);  
    
    if (!errors.isEmpty()) {  
      return res.status(400).json({ errors: errors.array() });  
    }  
    next();  
  },  
];