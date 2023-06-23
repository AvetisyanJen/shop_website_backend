const { Brand, Product } = require("../models");

///const { Product, Category } = require('../models')
class BrandControllerr {

  async createBrand(req, res) {
    const { name } = req.body;
    console.log(req.body, "fdgdrfdgdg")
    try {
      const brand = await Brand.create({ name });

      res.json(brand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  updateBrand(req, res) {
    // const { id } = req.params
    const { name, id } = req.body
    Brand.update(
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

  getBrand(req, res) {
    Brand.findAll() 
    .then((brand)=>{
     res.json(brand)}).catch((err)=>{
         res.status(500).json({eror:err.message})
     })
     
  }


  async deleteBrand(req, res) {
    const { id } = req.body;

    try {
      const brand = await Brand.findOne({
        where: { id },
        include: Product
      });

      if (brand.Product.length > 0) {
        res.status(400).json({ error: 'Cannot delete brand that has products' });
      } else {
        await Brand.destroy({ where: { id } });
        res.json({ message: 'brand deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


} module.exports = {
 BrandControllerr: new BrandControllerr(),
};