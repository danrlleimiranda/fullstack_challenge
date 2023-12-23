'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('cities', [{
      id: 1,
      city: 'Los Santos',
      district_id: 1
    }, {
      id: 2, 
      city: 'San Fierro',
      district_id: 2
    }], {
      timestamps: false
    });
    
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('cities', null, {});
     
  }
};
