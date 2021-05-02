import { NextFunction, Response } from 'express';
import Teacher from '../../db/models/teacher';
import { RequestWithBody } from '../../interfaces/Requests';
import { controller, get } from '../decorators';

@controller('')
class TeachersController {
  @get('/general/teachers')
  async getTeachers(
    _req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Get teacher for selector when students sign up
    try {
      const teachers = await Teacher.findAll({ attributes: ['id', 'name'] });

      res.send(teachers);
    } catch (error) {
      next(error);
    }
  }
}
