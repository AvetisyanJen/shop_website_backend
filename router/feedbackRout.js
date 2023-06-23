const express = require('express');
const { FeedbackController } = require('../controllers/feedbackControllers');



const feedback_router = express.Router();

feedback_router.post("/create",FeedbackController.createFeedback)
feedback_router.get("/get",FeedbackController.getFeedbacks)

module.exports=feedback_router