const { Product, Photo, sequelize,Category } = require("../models");
const fs=require("fs")
const path=require("path")
class ProductController{

  async getProducts(req, res) {
    let product = Product.findAll({
      include: [{ model: Photo}, { model: Category }]
  })
      .then((prod) => {
       
          res.json(prod)
      }).catch((err) => {
          res.status(500).json({ eror: err.message })
      })
  }
  


  async createProduct(req, res) {
    try {
        const { name, price, count, description, categoryId } = req.body;
        await sequelize.authenticate();
      
        const newProduct = await Product.create({
          name,
          price,
          count,
          description,
          categoryId,
        });
      
        const photos = req.files.map((file) => {
            return {
                url: file.filename,
                productId: newProduct.id,
            };
        });

        await Photo.bulkCreate(photos);
      
        res.status(201).json({ success: true, message: 'Product created' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Unable to create product' });
      }
      
}

async  deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const images = await Photo.findAll({ where: { productId: id } });
  
      for (const image of images) {
        const filePath = path.join(__dirname, '..', 'Static', 'images', image.url);
        fs.unlinkSync(filePath);
      }
  
      await Photo.destroy({ where: { productId: id } });
      await Product.destroy({ where: { id } });
  
      res.status(200).json({ message: 'Product and associated images deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }


  
  
  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, description, quantity, categoryId } = req.body;
  
    try {
  
      const images = await Photo.findAll({ where: { productId: id } });
 
      for (const image of images) {
        if (image.url) {
          const filePath = path.join(__dirname, '..', 'Static', 'images', image.url);
          fs.unlinkSync(filePath);
        }
      }

      await Photo.destroy({ where: { productId: id } });
  
    
      const photos = req.files?.map((file) => ({
        url: file.filename,
        productId: id,
      }));
      
      await Photo.bulkCreate(photos);
  
      await Product.update({ name, price, description, quantity, categoryId }, { where: { id } });
  
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }
  
  
  
}module.exports = {
    ProductController: new ProductController(),
};