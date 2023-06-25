
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Brands', [
      {
        name:'CASIO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'BUBEN&ZORWEG',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'TOMMY HILFIGER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

       {
        name:'GARMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'CHOPARD',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'HAMILTON',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'VANNA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      
      
      

    ], {});
  },
async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Brands', null, {});
  }
};