'use strict';
const {
  subjects: subjectSeed,
} = require('../../../build/db/dummyData/subjects');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('subjects', subjectSeed, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
