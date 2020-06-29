'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define relations later
    }
  }
  question.init(
    {
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'question',
    }
  );
  return question;
};
