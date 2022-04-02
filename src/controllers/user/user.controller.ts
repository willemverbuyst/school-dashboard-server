import { Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware'
import { testQueries } from '../../prisma/queries'
import { controller, get, use } from '../decorators'

const { getTestsForStudent } = testQueries

@controller('/users')
export class UserController {
	@get('/')
	@use(studentAuthMiddleware)
	async getStudentMain(req: RequestWithBody, res: Response): Promise<void> {
		try {
			const { studentId } = req.body

			// check user

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

	// STUDENT, info for one subject
	@get('/subjects/:id')
	@use(studentAuthMiddleware)
	async getSubjectForStudent(
		_req: RequestWithBody,
		res: Response
	): Promise<void> {
		// const { id } = req.params
		// const studentId = req.student.id

		try {
			// const tests = await Test.findAll({
			// 	where: { studentId, subjectId: id },
			// })
			// const results = tests.map(({ answer1, answer2, answer3, createdAt }) => {
			// 	return { result: answer1 + answer2 + answer3, at: createdAt }
			// })
			const results = ['test']
			res.send({ results: results.length, data: results })
		} catch (error) {
			res.status(400).send({ message: 'Something went wrong, sorry' })
		}
	}
}
