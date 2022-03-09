import bcrypt from 'bcrypt';
import { NextFunction, Response } from 'express';
import { bodyValidator, controller, post } from '../decorators';
import { toJWT } from '../../auth/jwt';
import Student from '../../db/models/student';
import Subject from '../../db/models/subject';
import Teacher from '../../db/models/teacher';
import { RequestWithBody } from '../../interfaces/Requests';

@controller('')
class LoginController {
  @post('/login')
  @bodyValidator('email', 'password')
  async postLogin(
    req: RequestWithBody,
    res: Response,
    next: NextFunction
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
        } else {
          const token = toJWT({ studentId: student.id });
          const subjects = await Subject.findAll({
            attributes: ['id', 'name'],
          });

          const { password, ...studentWithoutPassword } = student;
          res
            .status(200)
            .send({ token, student: studentWithoutPassword, subjects });
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
        } else {
          const token = toJWT({ teacherId: teacher.id });
          const subjects = await Subject.findAll({
            attributes: ['id', 'name'],
          });
          const students = await Student.findAll({
            where: { teacherId: teacher.id },
            attributes: ['id', 'name'],
          });

          const { password, ...teacherWithoutPassword } = teacher;
          res.status(200).send({
            token,
            teacher: teacherWithoutPassword,
            subjects,
            students,
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}
