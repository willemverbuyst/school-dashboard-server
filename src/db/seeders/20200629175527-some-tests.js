'use strict';
const { tests: testSeed } = require('../../../build/park/tests');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tests', testSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tests', null, {});
  },
};
