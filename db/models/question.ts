import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Answer from './answer';

interface QuestionAttributes {
  id: string;
  text: string;
}

interface QuestionCreationAttributes
  extends Optional<QuestionAttributes, 'id'> {}

interface QuestionInstance
  extends Model<QuestionAttributes, QuestionCreationAttributes>,
    QuestionAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Question = sequelize.define<QuestionInstance>('Question', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

Question.hasMany(Answer, {
  sourceKey: 'id',
  foreignKey: 'answerId',
  as: 'answers',
});

Answer.belongsTo(Question, {
  foreignKey: 'questionId',
  as: 'question',
});

export default Question;

// static associate(models) {
//   question.belongsTo(models.subject);
//   question.hasMany(models.answer);
// }
