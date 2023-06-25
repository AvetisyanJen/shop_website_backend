
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('genders', [
      {
        name:'MAN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'UNISEX',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:'WOMEN',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      
    ], {});
  },
async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('genders', null, {});
  }
};
