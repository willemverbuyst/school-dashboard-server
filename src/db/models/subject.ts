import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Question from './question';
import Test from './test';

interface SubjectAttributes {
  id: string;
  name: string;
}

interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'id'> {}

interface SubjectInstance
  extends Model<SubjectAttributes, SubjectCreationAttributes>,
    SubjectAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Subject = sequelize.define<SubjectInstance>('subject', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

Subject.hasMany(Question, {
  sourceKey: 'id',
  foreignKey: 'questionId',
  as: 'questions',
});

Subject.hasMany(Test, {
  sourceKey: 'id',
  foreignKey: 'testId',
  as: 'tests',
});

Question.belongsTo(Subject, {
  foreignKey: 'subjectId',
  as: 'subject',
});

Test.belongsTo(Subject, {
  foreignKey: 'subjectId',
  as: 'subject',
});

export default Subject;
