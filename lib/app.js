const path= require('path');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const expressValidator= require('express-validator');
var exphbs = require('express-handlebars');
const flash= require('connect-flash');
const session= require('express-session');
const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const skyway=path.join(__dirname, './views');
const mongo= require('mongodb');
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/loginapp');
let db=mongoose.connection;

const routes= require('../app/routes/index');  
const users= require('../app/routes/users');

// Init App
const express = require('express');
const app = express();

// view engine
//app.set('view engine', 'pug');
//app.set('views',skyway);
// View Engine
app.set('views', path.join(__dirname, '../views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

//Body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//Set Static Folder
app.use(express.static(`${__dirname}/../public`));

//Express Session 
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());

//Express  Validator 
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

//Global Vars
app.use(function(req,res,next){
res.locals.success_msg=req.flash('success-msg');
res.locals.error_msg= req.flash('error_msg');
res.locals.error= req.flash('error');
next();
});

app.use('/', routes);
app.use('/users', users);

//Set Port
const port = process.env.PORT || 8002;
const server = require('http').Server(app);

// start server
server.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// // create application/json parser
// const jsonParser = bodyParser.json();

// // create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({extended: false});
// dbManager();
// initRoutes(app);

