const{ feedback,OrderProduct,User} = require("../models/index");

class FeedbackController{

    async createFeedback(req, res) {
        try {
          const { message, rating, orderproduct_Id, user_Id } = req.body;
    
          
    
          // Create the feedback
          const Feedback = await feedback.create({
            message,
            rating,
            orderproduct_Id,
            user_Id,
            include: [
              { model: OrderProduct, as: 'orderProduct' }, // Use the correct alias 'OrderProduct'
              { model: User, as: 'user' }, // Use the correct alias 'user'
            ],
          });
    
          return res.status(201).json(Feedback);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      async getFeedbacks(req, res) {
        try {
          const feedbacks = await feedback.findAll({
           
            include: [
              { model: OrderProduct, as: 'orderProduct' }, // Use the correct alias 'OrderProduct'
               { model: User, as: 'user' }, // Use the correct alias 'user'
            ],
          });
      
          return res.status(200).json(feedbacks);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
      


}module.exports = {
    FeedbackController:new FeedbackController(),
};