import { NextFunction, Response } from 'express'
import Test from '../../db/models/test'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'
import { controller, get, use } from '../decorators'

@controller('')
class StudentController {
	// STUDENT, info for main page
	@get('/data/student/main')
	@use(studentAuthMiddleware)
	async getStudentMain(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		const studentId = req.student.id

		try {
			const tests = await Test.findAll({ where: { studentId } })
			const results = tests.map(
				({ answer1, answer2, answer3, createdAt, subjectId }) => {
					return {
						result: answer1 + answer2 + answer3,
						at: createdAt,
						subject: subjectId,
					}
				}
			)
			res.send({ results: results.length, data: results })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}

	// STUDENT, info for one subject
	@get('/data/student/subjects/:id')
	@use(studentAuthMiddleware)
	async getSubjectForStudent(
		req: RequestWithBody,
		res: Response,
		_next: NextFunction
	): Promise<void> {
		const { id } = req.params
		const studentId = req.student.id

		try {
			const tests = await Test.findAll({
				where: { studentId, subjectId: id },
			})
			const results = tests.map(({ answer1, answer2, answer3, createdAt }) => {
				return { result: answer1 + answer2 + answer3, at: createdAt }
			})
			res.send({ results: results.length, data: results })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}
}
