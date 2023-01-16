import { NextFunction, Response } from 'express'
import { RequestWithBody } from '../../interfaces/Requests'
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware'
import { subjectQueries } from '../../queries'
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
}
