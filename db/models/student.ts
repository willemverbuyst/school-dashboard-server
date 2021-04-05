import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Test from './test';

interface StudentAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id'> {}

interface StudentInstance
  extends Model<StudentAttributes, StudentCreationAttributes>,
    StudentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Student = sequelize.define<StudentInstance>('Student', {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

Student.hasMany(Test, {
  sourceKey: 'id',
  foreignKey: 'testId',
  as: 'tests',
});

Test.belongsTo(Student, {
  foreignKey: 'studentId',
  as: 'student',
});

export default Student;
