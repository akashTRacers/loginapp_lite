var express = require('express');
var router = express.Router();

//Get Home Page
router.get('/',function(req,res){
    console.log("inside index.js routes")
    res.render('index');

})
module.exports=router;  