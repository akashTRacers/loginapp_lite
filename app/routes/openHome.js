const express = require("express");
const openHomeController = require("../controllers/openHome.js");
const openHome = () => {
    console.log("inside openHome.js Routes")
    const openRouter = express.Router();
    openRouter.get('/', openHomeController.getHome);
    return openRouter;
}
// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
//         console.log("authenticated");
// 		return next();
// 	} else {
// 		//req.flash('error_msg','You are not logged in');
// 		res.redirect('/users/login');
// 	}
//}
module.exports= openHome;
