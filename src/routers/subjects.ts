import { NextFunction, Router, Response } from 'express';
import { auth as teacherAuthMiddleware } from '../auth/teacherAuthMiddleware';
import Subject from '../db/models/subject';
import { RequestWithBody } from '../interfaces/Requests';

const router = Router();

// TEACHER post a new subject
router.post(
  '/',
  teacherAuthMiddleware,
  async (req: RequestWithBody, res: Response, next: NextFunction) => {
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
      return res.status(400).send({ message: 'Please provide subject' });
    }
  }
);

export { router };