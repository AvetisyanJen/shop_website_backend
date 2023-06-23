const { Movement, Product } = require("../models");

///const { Product, Movement } = require('../models')
class MovementController {

  async createMovement(req, res) {
    const { name } = req.body;
    console.log(req.body, "fdgdrfdgdg")
    try {
      const movement = await Movement.create({ name });

      res.json(movement);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  updateMovement(req, res) {
    // const { id } = req.params
    const { name, id } = req.body
    Movement.update(
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

  getMovement(req, res) {
    Movement.findAll() 
    .then((Movement)=>{
     res.json(Movement)}).catch((err)=>{
         res.status(500).json({eror:err.message})
     })
  }


  async deleteMovement(req, res) {
    const { id } = req.body;

    try {
      const Movement = await Movement.findOne({
        where: { id },
        include: Product
      });

      if (Movement.Product.length > 0) {
        res.status(400).json({ error: 'Cannot delete Movement that has products' });
      } else {
        await Movement.destroy({ where: { id } });
        res.json({ message: 'Movement deleted' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


} module.exports = {
  MovementController: new MovementController(),
};