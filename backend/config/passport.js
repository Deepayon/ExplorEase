const passport = require('passport');  
const LocalStrategy = require('passport-local').Strategy;  
const User = require('../models/userModel');  

passport.use(  
  new LocalStrategy(async (username, password, done) => {  
    try {  
      const user = await User.findOne({ username });  
      if (!user) return done(null, false, { message: 'Incorrect username.' });  
      if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });  
      return done(null, user);  
    } catch (error) {  
      return done(error);  
    }  
  })  
);  

passport.serializeUser((user, done) => {  
  done(null, user.id);  
});  

passport.deserializeUser(async (id, done) => {  
  const user = await User.findById(id);  
  done(null, user);  
});  

module.exports = passport;