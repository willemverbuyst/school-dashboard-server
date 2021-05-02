import { NextFunction, Request, Router, Response } from 'express';
import Teacher from '../db/models/teacher';

const router = Router();

// Get teacher for selector when students sign up
router.get(
  '/teachers',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await Teacher.findAll({ attributes: ['id', 'name'] });

      res.send(teachers);
    } catch (error) {
      next(error);
    }
  }
);

export { router };
