import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { bodyValidator, controller, post } from '../decorators';
import { toJWT } from '../../auth/jwt';
import { SALT_ROUNDS } from '../../config/constants';
import Student from '../../db/models/student';
import Subject from '../../db/models/subject';
import Teacher from '../../db/models/teacher';

@controller('')
class SignupController {
  @post('/signup')
  @bodyValidator('email', 'password', 'name', 'isStudent')
  async postSignup(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { isStudent, name, email, password, teacherId } = req.body;

      // STUDENT
      if (isStudent && Number(isStudent) === 1) {
        if (!teacherId) {
          res.status(400).send({
            message: 'Please provide teacher id!',
          });
        } else {
          const newStudent = await Student.create({
            email,
            password: bcrypt.hashSync(password, SALT_ROUNDS),
            name,
            teacherId: Number(teacherId),
          }).then((data) => data?.get({ plain: true }));

          newStudent.password = 'password'; // don't send back the password hash

          const token = toJWT({ studentId: newStudent.id });

          const subjects = await Subject.findAll({
            attributes: ['id', 'name'],
          });
          const message = 'A new account is created for you';
          res.status(201).json({ token, ...newStudent, subjects, message });
        }

        // TEACHER
      } else {
        const newTeacher = await Teacher.create({
          email,
          password: bcrypt.hashSync(password, SALT_ROUNDS),
          name,
        }).then((data) => data?.get({ plain: true }));

        newTeacher.password = 'password';

        const token = toJWT({ teacherId: newTeacher.id });
        const message = 'A new account is created for you';
        res.status(201).json({ token, ...newTeacher, message });
      }
    } catch (error) {
      let name;
      if (error instanceof Error) {
        name = error.name;
      } else {
        name = 'Error';
      }

      if (name === 'SequelizeUniqueConstraintError') {
        res
          .status(400)
          .send({ message: 'There is an existing account with this email' });
      }

      res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }
}
