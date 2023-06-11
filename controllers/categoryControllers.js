const {Category}= require("../models");

///const { Product, Category } = require('../models')
class CategoryController{

  async  createCategory(req, res) {
    const { name } = req.body;
  console.log(req.body,"fdgdrfdgdg")
    try {
      const category = await Category.create({ name });
  
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

}module.exports = {
  CategoryController: new CategoryController(),
};