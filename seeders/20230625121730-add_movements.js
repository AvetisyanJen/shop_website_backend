
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Movements', [
      {
        name:'SMART',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'AUTOMATIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'QUARTZ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

       {
        name:'MECHANICAL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'MANUAL',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
      
      

    ], {});
  },
async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Movements', null, {});
  }
};
