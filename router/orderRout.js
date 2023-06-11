const express = require('express');
const { OrderController } = require('../controllers/orderControllers');
// const { UserController } = require('../controllers/userControllers');
const order_router = express.Router();
order_router.post("/payment",OrderController.payment)
order_router.get("/orderProducts",OrderController.getOrderProducts)

module.exports=order_router