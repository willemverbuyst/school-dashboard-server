import { Answer } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import {
	questionsGeography,
	questionsHistory,
	questionsMath,
} from './questions'

const answersGeography: Array<Answer> = [
	{
		id: uuidv4(),
		text: 'Brussels',
		correct: true,
		questionId: questionsGeography[0].id,
	},
	{
		id: uuidv4(),
		text: 'Amsterdam',
		correct: false,
		questionId: questionsGeography[0].id,
	},
	{
		id: uuidv4(),
		text: 'Liege',
		correct: false,
		questionId: questionsGeography[0].id,
	},
	{
		id: uuidv4(),
		text: 'Antwerp',
		correct: false,
		questionId: questionsGeography[0].id,
	},
	{
		id: uuidv4(),
		text: 'Mount Everest',
		correct: true,
		questionId: questionsGeography[1].id,
	},
	{
		id: uuidv4(),
		text: 'K2',
		correct: false,
		questionId: questionsGeography[1].id,
	},
	{
		id: uuidv4(),
		text: 'Mont Blanc',
		correct: false,
		questionId: questionsGeography[1].id,
	},
	{
		id: uuidv4(),
		text: 'El Capitan',
		correct: false,
		questionId: questionsGeography[1].id,
	},
	{
		id: uuidv4(),
		text: 'Spanish',
		correct: true,
		questionId: questionsGeography[2].id,
	},
	{
		id: uuidv4(),
		text: 'Colombian',
		correct: false,
		questionId: questionsGeography[2].id,
	},
	{
		id: uuidv4(),
		text: 'English',
		correct: false,
		questionId: questionsGeography[2].id,
	},
	{
		id: uuidv4(),
		text: 'Portugues',
		correct: false,
		questionId: questionsGeography[2].id,
	},
	{
		id: uuidv4(),
		text: '17 million',
		correct: true,
		questionId: questionsGeography[3].id,
	},
	{
		id: uuidv4(),
		text: '12 million',
		correct: false,
		questionId: questionsGeography[3].id,
	},
	{
		id: uuidv4(),
		text: '10 million',
		correct: false,
		questionId: questionsGeography[3].id,
	},
	{
		id: uuidv4(),
		text: '20 million',
		correct: false,
		questionId: questionsGeography[3].id,
	},
	{
		id: uuidv4(),
		text: '50 - 13',
		correct: true,
		questionId: questionsGeography[4].id,
	},
	{
		id: uuidv4(),
		text: '50 - 10',
		correct: false,
		questionId: questionsGeography[4].id,
	},
	{
		id: uuidv4(),
		text: '51 - 10',
		correct: false,
		questionId: questionsGeography[4].id,
	},
	{
		id: uuidv4(),
		text: '52 - 13',
		correct: false,
		questionId: questionsGeography[4].id,
	},
]

const answersHistory: Array<Answer> = [
	{
		id: uuidv4(),
		text: '1969',
		correct: true,
		questionId: questionsHistory[0].id,
	},
	{
		id: uuidv4(),
		text: '1976',
		correct: false,
		questionId: questionsHistory[0].id,
	},
	{
		id: uuidv4(),
		text: '1965',
		correct: false,
		questionId: questionsHistory[0].id,
	},
	{
		id: uuidv4(),
		text: '1964',
		correct: false,
		questionId: questionsHistory[0].id,
	},
	{
		id: uuidv4(),
		text: 'Winston Churchill',
		correct: true,
		questionId: questionsHistory[1].id,
	},
	{
		id: uuidv4(),
		text: 'Adolf Johnson',
		correct: false,
		questionId: questionsHistory[1].id,
	},
	{
		id: uuidv4(),
		text: 'Margaret Thatcher',
		correct: false,
		questionId: questionsHistory[1].id,
	},
	{
		id: uuidv4(),
		text: 'Alan Turing',
		correct: false,
		questionId: questionsHistory[1].id,
	},
	{
		id: uuidv4(),
		text: 'The Incas',
		correct: true,
		questionId: questionsHistory[2].id,
	},
	{
		id: uuidv4(),
		text: 'The Mayas',
		correct: false,
		questionId: questionsHistory[2].id,
	},
	{
		id: uuidv4(),
		text: 'The Egyptians',
		correct: false,
		questionId: questionsHistory[2].id,
	},
	{
		id: uuidv4(),
		text: 'The conquistadors',
		correct: false,
		questionId: questionsHistory[2].id,
	},
	{
		id: uuidv4(),
		text: '1512',
		correct: true,
		questionId: questionsHistory[3].id,
	},
	{
		id: uuidv4(),
		text: '1943',
		correct: false,
		questionId: questionsHistory[3].id,
	},
	{
		id: uuidv4(),
		text: '1610',
		correct: false,
		questionId: questionsHistory[3].id,
	},
	{
		id: uuidv4(),
		text: '1700',
		correct: false,
		questionId: questionsHistory[3].id,
	},
	{
		id: uuidv4(),
		text: 'North Africa',
		correct: true,
		questionId: questionsHistory[4].id,
	},
	{
		id: uuidv4(),
		text: 'Australia',
		correct: false,
		questionId: questionsHistory[4].id,
	},
	{
		id: uuidv4(),
		text: 'South America',
		correct: false,
		questionId: questionsHistory[4].id,
	},
	{
		id: uuidv4(),
		text: 'East Asia',
		correct: false,
		questionId: questionsHistory[4].id,
	},
]

const answersMath: Array<Answer> = [
	{
		id: uuidv4(),
		text: '136',
		correct: true,
		questionId: questionsMath[0].id,
	},
	{
		id: uuidv4(),
		text: '38',
		correct: false,
		questionId: questionsMath[0].id,
	},
	{
		id: uuidv4(),
		text: '138',
		correct: false,
		questionId: questionsMath[0].id,
	},
	{
		id: uuidv4(),
		text: '102',
		correct: false,
		questionId: questionsMath[0].id,
	},
	{
		id: uuidv4(),
		text: '16',
		correct: true,
		questionId: questionsMath[1].id,
	},
	{
		id: uuidv4(),
		text: '18',
		correct: false,
		questionId: questionsMath[1].id,
	},
	{
		id: uuidv4(),
		text: '12',
		correct: false,
		questionId: questionsMath[1].id,
	},
	{
		id: uuidv4(),
		text: '36',
		correct: false,
		questionId: questionsMath[1].id,
	},
	{
		id: uuidv4(),
		text: '25',
		correct: true,
		questionId: questionsMath[2].id,
	},
	{
		id: uuidv4(),
		text: '20',
		correct: false,
		questionId: questionsMath[2].id,
	},
	{
		id: uuidv4(),
		text: '8',
		correct: false,
		questionId: questionsMath[2].id,
	},
	{
		id: uuidv4(),
		text: '15',
		correct: false,
		questionId: questionsMath[2].id,
	},
	{
		id: uuidv4(),
		text: '14',
		correct: true,
		questionId: questionsMath[3].id,
	},
	{
		id: uuidv4(),
		text: '15',
		correct: false,
		questionId: questionsMath[3].id,
	},
	{
		id: uuidv4(),
		text: '8',
		correct: false,
		questionId: questionsMath[3].id,
	},
	{
		id: uuidv4(),
		text: '40',
		correct: false,
		questionId: questionsMath[3].id,
	},
	{
		id: uuidv4(),
		text: '7',
		correct: true,
		questionId: questionsMath[4].id,
	},
	{
		id: uuidv4(),
		text: '35',
		correct: false,
		questionId: questionsMath[4].id,
	},
	{
		id: uuidv4(),
		text: '5',
		correct: false,
		questionId: questionsMath[4].id,
	},
	{
		id: uuidv4(),
		text: '4',
		correct: false,
		questionId: questionsMath[4].id,
	},
]

const answers: Array<Answer> = [
	...answersGeography,
	...answersHistory,
	...answersMath,
]

export default answers
