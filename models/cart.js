'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {foreignKey:'userId',key:'id',onDelete: 'CASCADE',});
      Cart.belongsToMany(models.Product,{through:models.CartProducts,foreignKey:'cartId', key:'id'});
      Cart.hasMany(models.CartProducts, {foreignKey:'cartId', key:'id'});
      // Cart.hasMany(models.Order, {foreignKey:'cartId', key:'id'});
    }
  }
  Cart.init({
   userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};