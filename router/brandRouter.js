const express = require('express');
const { BrandControllerr } = require('../controllers/brandController');

const brand_router = express.Router();

brand_router.post("/create",BrandControllerr.createBrand)
brand_router.get("/get",BrandControllerr.getBrand)
brand_router.put("/update",BrandControllerr. updateBrand)
brand_router.delete("/delete",BrandControllerr.deleteBrand)
module.exports=brand_router