'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('districts', [{
       id: 1,
       district: 'Bahia'
     }, {
      id: 2,
      district: 'São Paulo'
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('districts', null, {});
    
  }
};
