'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        
      },
      name: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      price: {
        type: Sequelize.DECIMAL,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      count: {
        type: Sequelize.DECIMAL,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      description: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:
        {model:'Categories', key:'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
   
      brandId: {
        type: Sequelize.INTEGER,
        references:
        {model:'Brands', key:'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      genderId: {
        type: Sequelize.INTEGER,
        references:
        {model:'genders', key:'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      movementId: {
        type: Sequelize.INTEGER,
        references: { model: 'Movements', key: 'id' },
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

    await queryInterface.dropTable('Products');
  }
};