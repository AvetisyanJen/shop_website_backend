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
      Product.belongsTo(models.Category,{foreignKey:'categoryId'});
      Product.hasMany(models.Photo, {foreignKey:'ProductId'});
      // Product.belongsToMany(models.Cart, { through: models.CartProducts, foreignKey:'cartId', key:'id' });
      Product.hasMany(models.CartProducts, {foreignKey:'ProductId', key:'id'});
      Product.belongsToMany(models.Order,{through:models.OrderProduct,foreignKey:'order_id', key:'id'})
    }
    
    
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    count: DataTypes.DECIMAL,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};