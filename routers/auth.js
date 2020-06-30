const bcrypt = require('bcrypt');
const { Router } = require('express');
const { toJWT } = require('../auth/jwt');
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
      const students = await Student.findAll({ attributes: ['id', 'name'] });

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

      res.status(201).json({ token, ...newTeacher.dataValues });
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

module.exports = router;
