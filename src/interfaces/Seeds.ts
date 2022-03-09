export interface User {
	name: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
}

export interface Student extends User {
	teacherId: number
}

export interface Subject {
	name: string
	createdAt: Date
	updatedAt: Date
}

export interface Question {
	text: string
	subjectId: number
	createdAt: Date
	updatedAt: Date
}

export interface Answer {
	text: string
	correct: boolean
	questionId: number
	createdAt: Date
	updatedAt: Date
}

export interface Test {
	question1: number
	question2: number
	question3: number
	answer1: number
	answer2: number
	answer3: number
	createdAt: Date
	updatedAt: Date
	subjectId: number
	studentId: number
}
