import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { subjectQueries } from '../../prisma/queries'
import { controller, get, post, use } from '../decorators'

const { addSubject, getAllSubjects } = subjectQueries

@controller('/subjects')
export class SubjectController {
	@get('/')
	async getAllSubjects(
		_req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const subjects = await getAllSubjects()

			if (!subjects) {
				res.send({ message: 'No subjects found' })
			}

			res.send({ results: subjects.length, data: subjects })
		} catch (error) {
			next(error)
		}
	}

	@post('/')
	@use(teacherAuthMiddleware)
	async addSubject(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { subjectName } = req.body

			if (!subjectName) {
				res.status(422).send({ message: 'Must provide name for subject' })
				return
			}

			const newSubject = await addSubject({ name: subjectName })

			if (!newSubject) {
				res.status(404).send({
					message: 'Something went wrong, subject not added',
				})
				return
			}

			res.send({ data: newSubject })
		} catch (error) {
			next(error)
		}
	}

	// TEACHER, data per subject
	@get('/:id')
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
