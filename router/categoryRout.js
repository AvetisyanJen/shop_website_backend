const express = require('express');
const { CategoryController } = require('../controllers/categoryControllers');
const { AdminAuthenticate } = require('../jwt/admin_auth');
const category_router = express.Router();

category_router.post("/create",AdminAuthenticate,CategoryController.createCategory)
category_router.get("/get",CategoryController.getCategory)
category_router.put("/update",AdminAuthenticate,CategoryController. updateCategory)
category_router.delete("/delete",AdminAuthenticate,CategoryController.deleteCategory)
module.exports=category_router