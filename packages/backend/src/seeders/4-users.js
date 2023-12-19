"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          full_name: 'Rodrigo Silva',
          email: 'rodrigosilva@gmail.com',
          username: 'rodrimaster',
          password: 'rodrigo123',
          admin: false,
          image: 'packages/backend/uploads/berserk.jpg',
          address_id: 1,
          registered_at: new Date('2011-08-01T19:58:00.000Z'),
          updated_at: new Date('2011-08-01T19:58:00.000Z'),
        },
        {
          id: 2,
          full_name: 'Carlos Costa',
          username: 'carlinhos123',
          email: 'carloscosta1@gmail.com',
          password: 'carlos123',
          admin: true,
          image: 'packages/backend/uploads/berserk.jpg',
          address_id: 2,
          registered_at: new Date('2011-08-01T19:58:00.000Z'),
          updated_at: new Date('2011-08-01T19:58:00.000Z'),
        },
      ],
      {
        underscored: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
