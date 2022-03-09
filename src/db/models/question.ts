import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '.'
import Answer from './answer'

interface QuestionAttributes {
	id: number
	subjectId: number
	text: string
}

interface QuestionCreationAttributes
	extends Optional<QuestionAttributes, 'id'> {}

interface QuestionInstance
	extends Model<QuestionAttributes, QuestionCreationAttributes>,
		QuestionAttributes {
	createdAt?: Date
	updatedAt?: Date
}

const Question = sequelize.define<QuestionInstance>('question', {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.UUID,
		unique: true,
	},
	subjectId: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	text: {
		allowNull: false,
		type: DataTypes.STRING,
	},
})

Question.hasMany(Answer, {
	sourceKey: 'id',
	foreignKey: 'questionId',
	as: 'answers',
})

Answer.belongsTo(Question, {
	foreignKey: 'questionId',
	as: 'question',
})

export default Question
