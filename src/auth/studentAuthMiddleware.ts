import { NextFunction, Response } from 'express';
import Student from '../db/models/student';
import { toData } from './jwt';
import { RequestWithBodyAndStudent } from '../interfaces/Requests';

async function auth(
  req: RequestWithBodyAndStudent,
  res: Response,
  next: NextFunction
) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(' ');

  if (!auth || !(auth[0] === 'Bearer') || !auth[1]) {
    return res.status(401).send({
      message:
        'This endpoint requires an Authorization header with a valid token',
    });
  }

  try {
    const data = toData(auth[1]);
    const student = await Student.findByPk(
      (<{ studentId: number }>data).studentId
    );

    if (!student) {
      return res.status(404).send({ message: 'Student does not exist' });
    }
    req.student = student;

    return next();
  } catch (error) {
    console.log('ERROR IN AUTH MIDDLEWARE', error);

    switch (error.name) {
      case 'TokenExpiredError':
        return res
          .status(401)
          .send({ error: error.name, message: error.message });

      case 'JsonWebTokenError':
        return res
          .status(400)
          .send({ error: error.name, message: error.message });

      default:
        return res.status(400).send({
          message: 'Something went wrong, sorry',
        });
    }
  }
}

module.exports = auth;
