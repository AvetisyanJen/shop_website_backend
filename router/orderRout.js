const express = require('express');
const { OrderController } = require('../controllers/orderControllers');
// const { AuthenticateUserToken } = require('../jwt/auth_user');
// const { UserController } = require('../controllers/userControllers');
const order_router = express.Router();
order_router.post("/payment",OrderController.payment)
order_router.get("/orderProducts/:id",OrderController.getOrderProducts)

module.exports=order_router