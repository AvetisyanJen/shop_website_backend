'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    Order.belongsTo(models.User, {foreignKey:'user_id',key:'id'}),
    Order.belongsToMany(models.Product,{through:models.OrderProduct,foreignKey:'order_id', key:'id'})
    }
  }
  Order.init({
    total: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};