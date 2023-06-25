const { Category, Product } = require("../models");

///const { Product, Category } = require('../models')
class CategoryController {

  async createCategory(req, res) {
    const { name } = req.body;
    console.log(req.body, "fdgdrfdgdg")
    try {
      const category = await Category.create({ name });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  updateCategory(req, res) {
    // const { id } = req.params
    const { name, id } = req.body
    Category.update(
      { name },
      {
        where: { id }

      })
      .then((cat) => {
        res.json({ message: 'Updated' })
      }).catch((err) => {
        res.status(500).json({ eror: err.message })
      })

  }

  getCategory(req, res) {
    Category.findAll() 
    .then((category)=>{
     res.json(category)}).catch((err)=>{
         res.status(500).json({eror:err.message})
     })
     
  }


  async deleteCategory(req, res) {
    const { id } = req.body;

    try {
      const category = await Category.findOne({
        where: { id },
        include: Product
      });

      if (category.Product) {
        res.status(400).json({ error: 'Cannot delete category that has products' });
      } else {
        await Category.destroy({ where: { id } });
        res.json({ message: 'Category deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


} module.exports = {
  CategoryController: new CategoryController(),
};