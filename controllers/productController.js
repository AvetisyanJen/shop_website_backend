const { Product, Photo, sequelize,Category,Movement,Brand,gender,OrderProduct } = require("../models/index");
const fs=require("fs")
const path=require("path")
class ProductController{

 
// async getProduct(req, res) {
//   const { id } = req.params;
//   try {
//     const product = await Product.findOne({
//       where: { id },
//       include: [{ model: Photo}, { model: Category },{model:Movement},{model:Brand},{model:gender}],
//     });
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
// async getProduct(req, res) {
//   const { id } = req.params;
//   try {
//     const product = await Product.findOne({
//       where: { id },
//       include: [{ model: Photo}, { model: Category },{model:Movement},{model:Brand},{model:gender}],
//     });

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     const totalPurchases = await OrderProduct.count({
//       where: { product_id: id }
//     });

//     // Add the totalPurchases count to the product object
//     product.dataValues.totalPurchases = totalPurchases;

//     res.status(201).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }
async getProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
      include: [{ model: Photo}, { model: Category },{model:Movement},{model:Brand},{model:gender}],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const totalPurchases = await OrderProduct.sum('quantity', {
      where: { product_id: id }
    });

    // Add the totalPurchases and totalQuantity to the product object
    product.dataValues.totalPurchases = totalPurchases;
   

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


  
  async allProducts(req, res) {
    try {
      const products = await Product.findAll({
        // include: { all: true, nested: true },
        include: [{ model: Photo}, { model: Category },{model:Movement},{model:Brand},{model:gender}]
      });
  
      if (products && products.length > 0) {
        res.json(products);
      } else {
        res.json([]); // Send an empty array if no products found
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  

  async createProduct(req, res) {
    try {
        const { name, price, count, description, categoryId,brandId, movementId,genderId } = req.body;
        await sequelize.authenticate();
      
        const newProduct = await Product.create({
          name,
          price,
          count,
          description,
          categoryId,
          brandId,
          movementId,
          genderId
        });
      console.log(req.body)
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