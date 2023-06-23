'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
    static associate(models) {
      Movement.hasMany(models.Product, { foreignKey: 'movementId' });
    }
  }
  Movement.init({
    name: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Movement',
    tableName: 'Movements',

  });
  return Movement;
};