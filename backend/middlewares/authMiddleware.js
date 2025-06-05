const passport = require('../config/passport');  

exports.isAuthenticated = (req, res, next) => {  
  passport.authenticate('local', (err, user, info) => {  
    if (err) return next(err);  
    if (!user) return res.status(401).json({ message: 'Unauthorized' });  
    req.user = user;  
    next();  
  })(req, res, next);  
};