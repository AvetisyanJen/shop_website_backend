const express = require('express');
const { OrderController } = require('../controllers/orderControllers');
const { AuthenticateUserToken } = require('../jwt/auth_user');

const order_router = express.Router();
order_router.post("/payment",AuthenticateUserToken,OrderController.payment)
order_router.get("/orderProducts/:id",AuthenticateUserToken,OrderController.getOrderProducts)

module.exports=order_router