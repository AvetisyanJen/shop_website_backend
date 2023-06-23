'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userName: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      password: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      role: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      is_verified: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }
    });
   
  },
  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('Users');
  }
};