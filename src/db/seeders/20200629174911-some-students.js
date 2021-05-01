'use strict';
const { students: studentSeed } = require('../../../build/park/students');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subjects', studentSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('students', null, {});
  },
};
