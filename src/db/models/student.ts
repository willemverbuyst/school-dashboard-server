import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import Test from './test'

interface StudentAttributes {
	id: number
	email: string
	name: string
	password: string
	teacherId: number
}

interface StudentCreationAttributes extends Optional<StudentAttributes, 'id'> {}

interface StudentInstance
	extends Model<StudentAttributes, StudentCreationAttributes>,
		StudentAttributes {
	createdAt?: Date
	updatedAt?: Date
}

const Student = sequelize.define<StudentInstance>('student', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.UUID,
		unique: true,
	},
	name: { type: DataTypes.INTEGER, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false },
	teacherId: { type: DataTypes.INTEGER, allowNull: false },
})

Student.hasMany(Test, {
	sourceKey: 'id',
	foreignKey: 'studentId',
	as: 'tests',
})

Test.belongsTo(Student, {
	foreignKey: 'studentId',
	as: 'student',
})

export default Student
