'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Sifan Hassan',
          email: 'sifan@hassan.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          teacherId: 1,
        },
        {
          name: 'Jack Sparrow',
          email: 'jack@sparrow.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          teacherId: 1,
        },
        {
          name: 'John Doe',
          email: 'john@doe.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          teacherId: 1,
        },
        {
          name: 'Naomi Klein',
          email: 'naomi@klein.com',
          password: bcrypt.hashSync('123', SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
          teacherId: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});
  },
};
