'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.Brand, { foreignKey: 'brandId' });
      Product.belongsTo(models.gender, { foreignKey: 'genderId' });
      Product.belongsTo(models.Movement, { foreignKey: 'movementId' });
      

      Product.hasMany(models.Photo, { foreignKey: 'ProductId' });
      Product.hasMany(models.CartProducts, { foreignKey: 'ProductId' });
      Product.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: 'product_id' });
      Product.hasMany(models.OrderProduct, { foreignKey: 'product_id' });
    }
    
    
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    count: DataTypes.DECIMAL,
    description: DataTypes.STRING,
  
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};