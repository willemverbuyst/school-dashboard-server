import { Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'
import {
	getTestForStudentAndSubject,
	getTestsForStudent,
} from '../../prisma/queries/tests'
import { controller, get, use } from '../decorators'

@controller('/student')
export class StudentController {
	@get('/main')
	@use(studentAuthMiddleware)
	async getStudentMain(req: RequestWithBody, res: Response): Promise<void> {
		try {
			const { studentId } = req.body

			if (!studentId) {
				res.status(422).send({ message: 'Student id missing' })
				return
			}

			const tests = await getTestsForStudent(studentId)

			res.send({ results: tests.length, data: tests })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}

	@get('/subjects/:id')
	@use(studentAuthMiddleware)
	async getSubjectForStudent(
		req: RequestWithBody,
		res: Response
	): Promise<void> {
		try {
			const { id: subjectId } = req.params
			const { studentId } = req.body

			if (!subjectId) {
				res.status(422).send({ message: 'Subject id missing' })
				return
			}

			if (!studentId) {
				res.status(422).send({ message: 'Student id missing' })
				return
			}

			const tests = await getTestForStudentAndSubject(studentId, subjectId)

			res.send({ results: tests.length, data: tests })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}
}
