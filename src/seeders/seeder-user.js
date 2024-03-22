'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: "admin@email.com",
      password: "123456", //plain text askjnasnas -> hash password
      firstName: 'Phung Minh',
      lastName: 'Thu',
      address: 'Ba Vi',
      gender: "1",
      typeRole: "ROLE",
      keyRole: "R1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
