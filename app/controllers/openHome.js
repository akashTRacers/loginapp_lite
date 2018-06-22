var express = require('express');
var router = express.Router();
const path="../views/index"
class openHomeController{
    static getHome(req,res)
    {
        console.log("inside openHome Controller");
        res.render(path);


    }
}

module.exports=openHomeController;
/*var express = require('express');
var router = express.Router();

//Get Home Page
router.get('/',function(req,res){
    console.log("inside index.js routes")
    res.render('index');

})
module.exports=router;  */