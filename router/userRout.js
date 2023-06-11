const express = require('express');
const { UserController } = require('../controllers/userControllers');
const user_router = express.Router();

user_router.post("/register",UserController.registerUser)
user_router.post("/login",UserController.loginUser)
user_router.get("/verify",UserController.confirmEmail)

module.exports=user_router