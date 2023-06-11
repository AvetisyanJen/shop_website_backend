const express = require('express');

const {CartProductController} = require('../controllers/cartProductControllers');
const { AuthenticateUserToken } = require('../jwt/auth_user');
// const { AuthenticateUserToken } = require('../jwt/auth_user');
const cartProduct_router = express.Router();

 cartProduct_router.post("/addcartProd",CartProductController.addCartProduct)
 cartProduct_router.get("/getCartProduct/:id",AuthenticateUserToken,CartProductController.getCartProducts)
 cartProduct_router.put("/increment",CartProductController.incrementQuantity)
 cartProduct_router.put("/decrement",CartProductController.decrementQuantity)
 cartProduct_router.delete("/delete",CartProductController.removeCartProduct)


module.exports=cartProduct_router