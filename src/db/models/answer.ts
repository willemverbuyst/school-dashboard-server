import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

interface AnswerAttributes {
  id: number;
  questionId: number;
  text: string;
  correct: boolean;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

interface AnswerInstance
  extends Model<AnswerAttributes, AnswerCreationAttributes>,
    AnswerAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Answer = sequelize.define<AnswerInstance>('answer', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  questionId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  text: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  correct: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
});

export default Answer;
