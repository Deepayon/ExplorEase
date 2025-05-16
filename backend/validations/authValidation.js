const { body, validationResult } = require('express-validator');  

exports.signupValidation = [  
  body('username').notEmpty().withMessage('Username is required'),  
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),  
];  

exports.loginValidation = [  
  body('username').notEmpty().withMessage('Username is required'),  
  body('password').notEmpty().withMessage('Password is required'),  
];  

exports.validate = (req, res, next) => {  
  const errors = validationResult(req);  
  if (!errors.isEmpty()) {  
    return res.status(400).json({ errors: errors.array() });  
  }  
  next();  
};