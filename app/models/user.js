 let mongoose= require('mongoose');
 console.log("schema file");
 let articleSchema= mongoose.Schema({
  
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    }, 
    body:{
        type:String,
        required: true
    }

 });

 module.exports=mongoose.model('articles',articleSchema);
 








 