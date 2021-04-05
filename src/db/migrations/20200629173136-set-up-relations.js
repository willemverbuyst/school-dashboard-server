'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tests', 'subjectId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'subjects',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
    await queryInterface.addColumn('tests', 'studentId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'students',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tests', 'subjectId');
    await queryInterface.removeColumn('tests', 'studentId');
  },
};
