'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      question1: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      question2: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      question3: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      answer1: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      answer2: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      answer3: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      subjectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tests');
  },
};
