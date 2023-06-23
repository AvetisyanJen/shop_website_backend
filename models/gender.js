'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
gender.hasMany(models.Product, { foreignKey: 'genderId' });
    }
  }
  gender.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'gender',
  });
  return gender;
};