import { NextFunction, Response } from 'express';
import Student from '../../db/models/student';
import { RequestWithBody } from '../../interfaces/Requests';
import { controller, get, use } from '../decorators';
import Subject from '../../db/models/subject';
import { studentAuthMiddleware } from '../../middlewares/studentAuthMiddleware';
import { teacherAuthMiddleware } from '../../middlewares/teacherAuthMiddleware';

@controller('')
class ValidUserController {
  // /teacher would be /me if there was only one 'user'
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

      req.teacher.password = 'password';
      res.status(200).send({ ...req.teacher, students, subjects });
    } catch (error) {
      res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }

  // /student would be /me if there was only one 'user'
  @get('/student')
  @use(studentAuthMiddleware)
  async getValidStudent(
    req: RequestWithBody,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const subjects = await Subject.findAll({ attributes: ['id', 'name'] });

      req.student.password = 'password'; // don't send back the password hash
      res.status(200).send({ ...req.student, subjects });
    } catch (error) {
      res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
}
