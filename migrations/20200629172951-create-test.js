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
        type: Sequelize.INTEGER,
      },
      question2: {
        type: Sequelize.INTEGER,
      },
      question3: {
        type: Sequelize.INTEGER,
      },
      answer1: {
        type: Sequelize.INTEGER,
      },
      answer2: {
        type: Sequelize.INTEGER,
      },
      answer3: {
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
