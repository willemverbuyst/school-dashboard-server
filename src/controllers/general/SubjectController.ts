import { NextFunction, Response } from 'express';
import Subject from '../../db/models/subject';
import { RequestWithBody } from '../../interfaces/Requests';
import { teacherAuthMiddleWare } from '../../middlewares/teacherAuthMiddleware';
import { bodyValidator, controller, post, use } from '../decorators';

@controller('')
class SubjectController {
  // TEACHER post a new subject
  @post('/general/subjects')
  @bodyValidator('subject')
  @use(teacherAuthMiddleWare)
  async postSubject(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { subject } = req.body;

    if (subject) {
      try {
        const newSubject = await Subject.create({
          name: subject,
        });

        res
          .status(201)
          .send({ newSubject, message: 'You have added a new subject.' });
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).send({ message: 'Please provide subject' });
    }
  }
}
