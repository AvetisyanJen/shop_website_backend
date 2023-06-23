'use strict';

const {

  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * 
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      feedback. belongsTo(models.OrderProduct, {
          foreignKey: 'orderproduct_Id',
          as: 'orderProduct',
          targetKey: 'id'
        });



      feedback.belongsTo(models.User, {
        foreignKey: 'user_Id',
        as: 'user'
      });
    }

  }
  feedback.init({
    message: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    orderproduct_Id: DataTypes.INTEGER,
    user_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feedback',
  });
  return feedback;
};