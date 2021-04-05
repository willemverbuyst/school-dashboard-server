import { NextFunction, Request, Router, Response } from 'express';

import Teacher from '../db/models/teacher';

export const schoolRouter = Router();

// Get teacher for selector when students sign up
schoolRouter.get(
  '/teachers',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teachers = await Teacher.findAll();

      res.send(teachers);
    } catch (error) {
      next(error);
    }
  }
);
