const express = require('express');
const {ProductController} = require('../controllers/productController');
const { upload } = require('../multer_config/multer');
const { AdminAuthenticate } = require('../jwt/admin_auth');
const product_router = express.Router();
 
product_router.post("/create",upload.array("photo"), ProductController.createProduct)
product_router.delete("/delete/:id",ProductController.deleteProduct)
product_router.put("/update/:id", upload.array("photo"), ProductController.updateProduct)
product_router.get("/products",ProductController.getProducts)


module.exports=product_router
