import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { teacherQueries } from '../../queries'
import { getTestForTeacherAndSubject } from '../../queries/test/getTestsForTeacherAndSubject.query'
import { controller, get, use } from '../decorators'

const { getAllTeachers } = teacherQueries

@controller('/teachers')
export class TeacherController {
	@get('/')
	async getTeachers(
		_req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const teachers = await getAllTeachers()

			if (!teachers) {
				res.send({ message: 'No teachers found' })
			}

			res.send({ results: teachers.length, data: teachers })
		} catch (error) {
			next(error)
		}
	}

	@get('/:teacherId/subjects/:subjectId')
	@use(teacherAuthMiddleware)
	async getSubjectForTeacher(
		req: RequestWithBody,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const { subjectId, teacherId } = req.params
		try {
			const tests = await getTestForTeacherAndSubject(subjectId, teacherId)

			if (!tests) {
				res.send({ message: 'No teachers found' })
			}

			res.send({ results: tests.length, data: tests })
		} catch (error) {
			next(error)
		}
	}
}
