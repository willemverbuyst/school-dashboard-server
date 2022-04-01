import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { addSubject } from '../../prisma/queries/subjects'
import { controller, post, use } from '../decorators'

@controller('/admin')
export class TestController {
	@post('/subjects')
	@use(teacherAuthMiddleware)
	async getQuestionsForSubject(
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
}
