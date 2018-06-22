const express = require("express");
var router = express.Router()
//const verificationController = require("../controllers/verification.js");

const validateDetails = (req,res,next) => {
    console.log("inside validations");
    verificationRouter = express.Router(); 
    // Validation
	req.check('name', 'Name is required').notEmpty();
	req.check('email', 'Email is required').notEmpty();
	req.check('email', 'Email is not valid').isEmail();
	req.check('username', 'Username is required').notEmpty();
	req.check('password', 'Password is required').notEmpty();
	req.check('password2', 'Passwords do not match').equals(req.body.password);
    var errors=req.validationErrors();
  
    if (errors) {
		res.render('register', {
			errors: errors
        });
    }    
    else{
       next();
    }
}
module.exports = {validateDetails};