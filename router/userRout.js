const express = require('express');
const { UserController } = require('../controllers/userControllers');
const { registerValidationRules, loginValidationRules } = require('../validator');
const user_router = express.Router();

user_router.post("/register",registerValidationRules,UserController.registerUser)
user_router.post("/login",loginValidationRules,UserController.loginUser)
user_router.get("/verify",UserController.confirmEmail)

module.exports=user_router