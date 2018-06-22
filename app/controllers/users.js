var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const verifyUser=require('../../lib/passport')
var User = require('../models/user');

class UserController{

  static showRegisterDetails(req,res){
    res.render('register');
  }
  static showLoginDetails(req,res){
    res.render('login');
  }

  static insertRegisterDetails(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    User.findOne({ username: { 
			"$regex": "^" + username + "\\b", "$options": "i"
			}}, function (err, user) {
							User.findOne({ email: { 
								"$regex": "^" + email + "\\b", "$options": "i"}}, 
								function (err, mail) {
										if (user || mail) {
											res.render('register', {
											user: user,
											mail: mail
											});
										}
										else {
										var newUser = new User({
										name: name,
										email: email,
										username: username,
										password: password
									});
									User.createUser(newUser, function (err, user) {
									if (err) throw err;
									console.log(user);
								});
							req.flash('success_msg', 'You are registered and can now login');
							res.redirect('/users/login');
				}
			});
    });
  
  }
  
  static insertLoginDetails(req,res){
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function (req, res) {
      res.redirect('/');
    }
  }
  static logOutUser(req,res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  }
}  
module.exports=UserController;