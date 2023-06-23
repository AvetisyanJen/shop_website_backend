const { gender, Product } = require("../models");

///const { Product, Gender } = require('../models')
class GenderController {

  async createGender(req, res) {
    const { name } = req.body;
    console.log(req.body, "fdgdrfdgdg")
    try {
      const Gender = await gender.create({ name });

      res.json(Gender);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  updateGender(req, res) {
    // const { id } = req.params
    const { name, id } = req.body
    Gender.update(
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

  getGender(req, res) {
    gender.findAll() 
    .then((Gender)=>{
     res.json(Gender)}).catch((err)=>{
         res.status(500).json({eror:err.message})
     })
     
  }


  async deleteGender(req, res) {
    const { id } = req.body;

    try {
      const gender = await Gender.findOne({
        where: { id },
        include: Product
      });

      if (gender.Product.length > 0) {
        res.status(400).json({ error: 'Cannot delete Gender that has products' });
      } else {
        await Gender.destroy({ where: { id } });
        res.json({ message: 'Gender deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


} module.exports = {
  GenderController: new GenderController(),
};