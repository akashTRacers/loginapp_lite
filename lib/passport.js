//var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose=require("mongoose");
var User = require('../app/models/user');

const verifyUser = (passport) => {
	passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({ name: username }, function(err, user, error) {
      if (err){
        return done(err);
      }
      if (!user){
        return done(null, false, { messages: 'Incorrect username.' });
      }
         User.comparePassword(password, user.password, function (err, isMatch) {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } 
                        else {
                            return done(null, false, { message: 'Invalid password' });
                        }
        });
    });
  }));

  passport.serializeUser(function(user, done) {    
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id,function(err, user){      
      done(err, user);
    });
  });
}

exports.module=verifyUser;