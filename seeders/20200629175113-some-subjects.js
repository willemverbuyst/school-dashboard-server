'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'subjects',
      [
        {
          name: 'geography',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'history',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'math',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
