import { Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { controller, get, use } from '../decorators'

@controller('')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TeacherController {
	// TEACHER, data for main page
	@get('/data/teacher/main')
	@use(teacherAuthMiddleware)
	async getTeacherMain(req: RequestWithBody, res: Response): Promise<void> {
		// const teacherId = req.teacher.id

		try {
			// const tests = await Test.findAll({
			// 	attributes: ['subjectId', 'answer1', 'answer2', 'answer3', 'createdAt'],
			// 	include: [
			// 		{
			// 			model: Student,
			// 			as: 'student',
			// 			where: { teacherId },
			// 			attributes: ['id', 'teacherId'],
			// 		},
			// 	],
			// })

			// const allTests = tests.map((test: any) => {
			// 	return {
			// 		subjectId: test.subjectId,
			// 		result: test.answer1 + test.answer2 + test.answer3,
			// 		at: test.createdAt,
			// 	}
			// })

			// // Query to get average per subject
			// const subjects = await Subject.findAll()

			// const scores = subjects
			// 	.map(subject => allTests.filter(test => test.subjectId === subject.id))
			// 	.map((subject: any) => {
			// 		return {
			// 			subjectId: subject.id,
			// 			length: subject.length,
			// 			result: Math.round(
			// 				(subject
			// 					.map((sub: any) => sub.result)
			// 					.reduce((a: number, b: number) => a + b, 0) /
			// 					(subject.length * 3)) *
			// 					100
			// 			),
			// 		}
			// 	})
			const allTests = {}
			const scores = {}

			res.send({ data: { tests: allTests, scores } })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}

	// TEACHER, data per student
	@get('/data/teacher/students/:id')
	@use(teacherAuthMiddleware)
	async getStudentForTeacher(
		req: RequestWithBody,
		res: Response
	): Promise<void> {
		// const { id } = req.params

		try {
			// const subjects = await Subject.findAll({
			// 	attributes: ['id', 'name'],
			// 	include: {
			// 		model: Test,
			// 		as: 'tests',
			// 		where: { studentId: id },
			// 		attributes: ['answer1', 'answer2', 'answer3'],
			// 	},
			// })

			// const results = subjects.map((subject: any) => {
			// 	return {
			// 		subjectId: subject.id,
			// 		name: subject.name,
			// 		score: Math.round(
			// 			(subject.tests
			// 				.map(
			// 					(test: { answer1: number; answer2: number; answer3: number }) =>
			// 						test.answer1 + test.answer2 + test.answer3
			// 				)
			// 				.reduce((a: number, b: number) => a + b, 0) /
			// 				(subject.tests.length * 3)) *
			// 				100
			// 		),
			// 		tests: subject.tests.length,
			// 	}
			// })

			const results = ['test']
			res.send({ results: results.length, data: results })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}

	// TEACHER, data per subject
	@get('/data/teacher/subjects/:id')
	@use(teacherAuthMiddleware)
	async getSubjectForTeacher(
		req: RequestWithBody,
		res: Response
	): Promise<void> {
		// const { id } = req.params
		// const teacherId = req.teacher.id

		try {
			// const students = await Student.findAll({
			// 	where: { teacherId },
			// 	attributes: ['id', 'name'],
			// 	include: [
			// 		{
			// 			model: Test,
			// 			as: 'tests',
			// 			where: { subjectId: id },
			// 			attributes: ['answer1', 'answer2', 'answer3'],
			// 		},
			// 	],
			// })

			// const results = students.map((student: any) => {
			// 	return {
			// 		studentId: student.id,
			// 		name: student.name,
			// 		score: Math.round(
			// 			(student.tests
			// 				.map(
			// 					(test: { answer1: number; answer2: number; answer3: number }) =>
			// 						test.answer1 + test.answer2 + test.answer3
			// 				)
			// 				.reduce((a: number, b: number) => a + b, 0) /
			// 				(student.tests.length * 3)) *
			// 				100
			// 		),
			// 		tests: student.tests.length,
			// 	}
			// })
			const results = ['test']
			res.send({ results: results.length, data: results })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}
}
