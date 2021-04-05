'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../../config/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'teachers',
      [
        {
          name: 'Fjodor Dostojewski',
          email: 'fjodor@dostojewski.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sebastian Bach',
          email: 'sebastian@bach.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teachers', null, {});
  },
};
