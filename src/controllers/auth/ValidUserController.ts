import { NextFunction, Response } from 'express';
import Student from '../../db/models/student';
import { RequestWithBody } from '../../interfaces/Requests';
import { controller, get } from '../decorators';
import Subject from '../../db/models/subject';

@controller('')
class ValidUserController {
  @get('/teacher')
  async getValidTeacher(
    req: RequestWithBody,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    // /teacher would be /me if there was only one 'user'
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
