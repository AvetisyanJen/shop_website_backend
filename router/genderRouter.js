const express = require('express');
const { GenderController } = require('../controllers/genderController');


const gender_router = express.Router();

gender_router.post("/create",GenderController.createGender)
gender_router.get("/get",GenderController.getGender)
gender_router.put("/update",GenderController. updateGender)
gender_router.delete("/delete",GenderController.deleteGender)
module.exports=gender_router