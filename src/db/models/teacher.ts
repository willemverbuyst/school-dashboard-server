import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import Student from './student';

interface TeacherAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

interface TeacherInstance
  extends Model<TeacherAttributes, TeacherCreationAttributes>,
    TeacherAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Teacher = sequelize.define<TeacherInstance>('teacher', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

Teacher.hasMany(Student, {
  sourceKey: 'id',
  foreignKey: 'studentId',
  as: 'students',
});

Student.belongsTo(Teacher, {
  foreignKey: 'teacherId',
  as: 'teacher',
});

export default Teacher;
