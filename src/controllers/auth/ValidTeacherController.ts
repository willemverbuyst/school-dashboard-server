import { NextFunction, Response } from 'express';
import { controller, get, use } from '../decorators';
import Student from '../../db/models/student';
import Subject from '../../db/models/subject';
import { RequestWithBody } from '../../interfaces/Requests';
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware';

@controller('')
class ValidUserController {
  @get('/teacher')
  @use(teacherAuthMiddleware)
  async getValidTeacher(
    req: RequestWithBody,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const students = await Student.findAll({
        where: { teacherId: req.teacher.id },
        attributes: ['id', 'name'],
      });
      const subjects = await Subject.findAll({ attributes: ['id', 'name'] });
      const { password, ...teacher } = req.teacher;

      res.status(200).send({ data: { teacher, students, subjects } });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}
