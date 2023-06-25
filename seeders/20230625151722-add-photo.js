
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Photos', [
      {
        productId: 1,
        url: "Esprit2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {

        productId: 1,
        url: "Esprit3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),

      },
      {

        productId: 1,
        url: "Esprit2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        url: "buben1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        url: "chopard2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        url: "chopard3.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        url: "pati.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 6,
        url: "sexani.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        url: "vanna1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 7,
        url: "vanna2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        url: "tomi1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        url: "tomi2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 8,
        url: "tomi3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 9,
        url: "garmin (2).jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 9,
        url: "garmin1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        url: "hamilton1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 10,
        url: "hamilton2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId:11,
        url: "casio1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId:11,
        url: "casio2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },


    ], {});
  },
  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Photos', null, {});
  }
};

