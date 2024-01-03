"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'addresses',
      [
        {
          id: 1,
          street: 'Rua dos bobos',
          number: 0,
          user_id: 1,
          city: 'San Fierro',
          district: 'São Paulo'
        },
        {
          id: 2,
          street: 'Groove Street',
          number: 171,
          user_id: 2,
          city: 'Los Santos',
          district: 'Bahia',
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
