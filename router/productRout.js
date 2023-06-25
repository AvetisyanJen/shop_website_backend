const express = require('express');
const {ProductController} = require('../controllers/productController');
const { upload } = require('../multer_config/multer');
const { AdminAuthenticate } = require('../jwt/admin_auth');
const product_router = express.Router();
 
product_router.post("/create",AdminAuthenticate,upload.array("photo"), ProductController.createProduct)
product_router.delete("/delete/:id",AdminAuthenticate,ProductController.deleteProduct)
product_router.put("/update/:id",AdminAuthenticate, upload.array("photo"), ProductController.updateProduct)
product_router.get("/products",ProductController.allProducts)
product_router.get("/one/:id",ProductController.getProduct)
product_router.get("/purchas",ProductController.allProductPurchas)
product_router.get("/search",ProductController.searchProduct)
product_router.delete ('/deletePhoto',AdminAuthenticate,ProductController.deletephoto)
module.exports=product_router
