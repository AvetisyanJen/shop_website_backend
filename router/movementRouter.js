const express = require('express');
const { GenderController } = require('../controllers/genderController');
const { MovementController } = require('../controllers/movementController');


const movement_router = express.Router();

movement_router.post("/create",MovementController.createMovement)
movement_router.get("/get",MovementController.getMovement)
movement_router.put("/update",MovementController. updateMovement)
movement_router.delete("/delete",MovementController.deleteMovement)
module.exports=movement_router