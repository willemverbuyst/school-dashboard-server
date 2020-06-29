'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // to be defined
    }
  }
  test.init(
    {
      question1: DataTypes.INTEGER,
      question2: DataTypes.INTEGER,
      question3: DataTypes.INTEGER,
      answer1: DataTypes.INTEGER,
      answer2: DataTypes.INTEGER,
      answer3: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'test',
    }
  );
  return test;
};
