const express = require("express");
const validationMiddleWare = require("../validations/validation");
const UserController = require("../controllers/users");
const initUsers=()=>{
  const userRouter=express.Router();
  userRouter.get('/register',UserController.showRegisterDetails);
  userRouter.get('/login',UserController.showLoginDetails);
  userRouter.get('/logout',UserController.logOutUser);
  userRouter.post('/register', validationMiddleWare.validateDetails, UserController.insertRegisterDetails);
  userRouter.post('/login',UserController.insertLoginDetails);
   return userRouter;
  }
 module.exports= initUsers; 
