"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'addresses',
      [
        {
          id: 1,
          address: 'Rua dos bobos, 0',
          city_id: 2,
        },
        {
          id: 2,
          address: 'Groove Street, 171',
          city_id: 1,
        },
      ],
      {
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('addresses', null, {});
  },
};
