const express = require('express');
const { CategoryController } = require('../controllers/categoryControllers');
const category_router = express.Router();

category_router.post("/create",CategoryController.createCategory)
category_router.get("/get",CategoryController.getCategory)
category_router.put("/update",CategoryController. updateCategory)
category_router.delete("/delete",CategoryController.deleteCategory)
module.exports=category_router