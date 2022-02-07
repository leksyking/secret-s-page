const passport = require('passport')
const User = require('../models/secrets')

//Static strategy
passport.use(User.createStrategy());

//Static serialize
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});