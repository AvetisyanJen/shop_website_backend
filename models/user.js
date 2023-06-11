'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      User.hasOne(models.Cart, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Order,{
        foreignKey: 'user_id'})
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    is_verified:{
      type:DataTypes.INTEGER,
      defaultValue: 0

    } 
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};