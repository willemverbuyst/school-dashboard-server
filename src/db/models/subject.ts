import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Question from './question';
import Test from './test';

interface SubjectAttributes {
  id: number;
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

Subject.hasMany(Test, {
  sourceKey: 'id',
  foreignKey: 'subjectId',
  as: 'tests',
});

Test.belongsTo(Subject, {
  foreignKey: 'subjectId',
  as: 'subject',
});

Subject.hasMany(Question, {
  sourceKey: 'id',
  foreignKey: 'subjectId',
  as: 'questions',
});

Question.belongsTo(Subject, {
  foreignKey: 'subjectId',
  as: 'subject',
});

export default Subject;
