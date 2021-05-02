import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { toJWT } from '../../auth/jwt';
import Student from '../../db/models/student';
import { RequestWithBody } from '../../interfaces/Requests';
import { bodyValidator, controller, get, post } from '../decorators';
import Teacher from '../../db/models/teacher';
import Subject from '../../db/models/subject';

@controller('')
class LoginController {
  @get('/test')
  getTest(_req: Request, res: Response): void {
    res.send('testing');
  }

  @post('/login')
  @bodyValidator('email', 'password')
  async postLogin(
    req: RequestWithBody,
    res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { email, password, isStudent } = req.body;

      // STUDENT
      if (Number(isStudent) === 1) {
        const student = await Student.findOne({
          where: { email },
        }).then((data) => data?.get({ plain: true }));

        if (!student || !bcrypt.compareSync(password, student.password)) {
          res.status(400).send({
            message: 'Student with that email not found or password incorrect',
          });
        }
        if (student) {
          const token = toJWT({ studentId: student.id });
          const subjects = await Subject.findAll({
            attributes: ['id', 'name'],
          });

          student.password = 'password'; // don't send back the password hash
          res.status(200).send({ token, ...student, subjects });
        }
        // TEACHER
      } else {
        const teacher = await Teacher.findOne({
          where: { email },
        }).then((data) => data?.get({ plain: true }));

        if (!teacher || !bcrypt.compareSync(password, teacher.password)) {
          res.status(400).send({
            message: 'Teacher with that email not found or password incorrect',
          });
        }

        if (teacher) {
          const token = toJWT({ teacherId: teacher.id });
          const subjects = await Subject.findAll({
            attributes: ['id', 'name'],
          });
          const students = await Student.findAll({
            where: { teacherId: teacher.id },
            attributes: ['id', 'name'],
          });

          teacher.password = 'password'; // don't send back the password hash
          res.status(200).send({ token, ...teacher, subjects, students });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: 'Something went wrong, sorry' });
    }
  }

  @get('/logout')
  getLogout(_req: Request, res: Response): void {
    res.send('You are logged out');
  }
}
