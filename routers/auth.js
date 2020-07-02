const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
const teacherAuthMiddleware = require('../auth/teacherAuthMiddleware');
const studentAuthMiddleware = require('../auth/studentAuthMiddleware');
const Teacher = require('../models').teacher;
const Student = require('../models').student;
const Subject = require('../models').subject;
const { SALT_ROUNDS } = require('../config/constants');

const router = new Router();

/*** LOGIN ***/
router.post('/login', async (req, res, next) => {
  try {
    const { email, password, isStudent } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: 'Please provide both email and password' });
    }
    // STUDENT
    if (isStudent === 1) {
      const student = await Student.findOne({
        where: { email },
      });
      if (!student || !bcrypt.compareSync(password, student.password)) {
        return res.status(400).send({
          message: 'Student with that email not found or password incorrect',
        });
      }
      delete student.dataValues['password']; // don't send back the password hash
      const token = toJWT({ studentId: student.id });
      const subjects = await Subject.findAll({ attributes: ['id', 'name'] });
      return res.status(200).send({ token, ...student.dataValues, subjects });
      // TEACHER
    } else {
      const teacher = await Teacher.findOne({ where: { email } });
      if (!teacher || !bcrypt.compareSync(password, teacher.password)) {
        return res.status(400).send({
          message: 'Teacher with that email not found or password incorrect',
        });
      }
      delete teacher.dataValues['password'];

      const token = toJWT({ teacherId: teacher.id });
      const subjects = await Subject.findAll({ attributes: ['id', 'name'] });
      const students = await Student.findAll({
        where: { teacherId: teacher.id },
        attributes: ['id', 'name'],
      });

      return res
        .status(200)
        .send({ token, ...teacher.dataValues, subjects, students });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** SIGNUP ***/
router.post('/signup', async (req, res) => {
  const { isStudent, name, email, password, teacherId } = req.body;
  if (!email || !password || !name || !isStudent) {
    return res
      .status(400)
      .send({ message: 'Please provide an email, password and a name' });
  }
  try {
    // STUDENT
    if (isStudent === 1) {
      const newStudent = await Student.create({
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        name,
        teacherId,
      });

      delete newStudent.dataValues['password']; // don't send back the password hash

      const token = toJWT({ studentId: newStudent.id });

      const subjects = await Subject.findAll({ attributes: ['id', 'name'] });
      const message = 'A new account is created for you';
      res
        .status(201)
        .json({ token, ...newStudent.dataValues, subjects, message });
      // TEACHER
    } else {
      const newTeacher = await Teacher.create({
        email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        name,
      });

      delete newTeacher.dataValues['password'];

      const token = toJWT({ teacherId: newTeacher.id });
      const message = 'A new account is created for you';
      res.status(201).json({ token, ...newTeacher.dataValues, message });
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .send({ message: 'There is an existing account with this email' });
    }

    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

/*** GET INFO USER IF THERE IS A JWT TOKEN ***/
// /teacher would be /me if there was only one 'user'
router.get('/teacher', teacherAuthMiddleware, async (req, res) => {
  try {
    const students = await Student.findAll({ attributes: ['id', 'name'] });
    const subjects = await Subject.findAll({ attributes: ['id', 'name'] });

    delete req.teacher.dataValues['password'];
    return res
      .status(200)
      .send({ ...req.teacher.dataValues, students, subjects });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

// /student would be /me if there was only one 'user'
router.get('/student', studentAuthMiddleware, async (req, res) => {
  try {
    const subjects = await Subject.findAll({ attributes: ['id', 'name'] });
    // console.log(subjects);
    delete req.student.dataValues['password'];
    return res.status(200).send({ ...req.student.dataValues, subjects });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
