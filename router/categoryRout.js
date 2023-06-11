const express = require('express');
const { CategoryController } = require('../controllers/categoryControllers');
const category_router = express.Router();

category_router.post("/create",CategoryController.createCategory)

module.exports=category_router