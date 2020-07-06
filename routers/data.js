const { Router } = require('express');
const Test = require('../models').test;
const Subject = require('../models').subject;
const Student = require('../models').student;
const studentAuthMiddleware = require('../auth/studentAuthMiddleware');
const teacherAuthMiddleware = require('../auth/teacherAuthMiddleware');

const router = new Router();

router.get('/main', studentAuthMiddleware, async (req, res, next) => {
  const studentId = req.student.id;

  try {
    const tests = await Test.findAll({ where: { studentId } });
    const results = tests.map(
      ({ answer1, answer2, answer3, createdAt, subjectId }) => {
        return {
          result: answer1 + answer2 + answer3,
          at: createdAt,
          subject: subjectId,
        };
      }
    );
    res.send(results);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/:id', studentAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  const studentId = req.student.id;

  try {
    const tests = await Test.findAll({ where: { studentId, subjectId: id } });
    const results = tests.map(({ answer1, answer2, answer3, createdAt }) => {
      return { result: answer1 + answer2 + answer3, at: createdAt };
    });
    res.send(results);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

// DATA FOR TEACHER
router.get('/students/:id', teacherAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const subjects = await Subject.findAll({
      attributes: ['id'],
      include: [
        {
          model: Test,
          where: { studentId: id },
          attributes: ['answer1', 'answer2', 'answer3'],
        },
      ],
    });

    const results = subjects.map((subject) => {
      return {
        subjectId: subject.id,
        score: Math.round(
          (subject.tests
            .map((test) => test.answer1 + test.answer2 + test.answer3)
            .reduce((a, b) => a + b, 0) /
            (subject.tests.length * 3)) *
            100
        ),
        tests: subject.tests.length,
      };
    });
    res.send(results);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/subjects/:id', teacherAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const students = await Student.findAll({
      where: { teacherId: req.teacher.id },
      attributes: ['id'],
      include: [
        {
          model: Test,
          where: { subjectId: id },
          attributes: ['answer1', 'answer2', 'answer3'],
        },
      ],
    });

    const results = students.map((student) => {
      return {
        studentId: student.id,
        score: Math.round(
          (student.tests
            .map((test) => test.answer1 + test.answer2 + test.answer3)
            .reduce((a, b) => a + b, 0) /
            (student.tests.length * 3)) *
            100
        ),
        tests: student.tests.length,
      };
    });
    res.send(results);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/teacher/:id', teacherAuthMiddleware, async (req, res, next) => {
  try {
    const students = await Student.findAll({
      where: { teacherId: req.teacher.id },
    });
    const subjects = await Subject.findAll();

    const tests = await Test.findAll({
      attributes: [
        'answer1',
        'answer2',
        'answer3',
        'studentId',
        'subjectId',
        'createdAt',
      ],
    });

    const testsFiltered = tests
      .filter(
        (test) =>
          students.map((student) => student.id).indexOf(test.studentId) >= 0
      )
      .map((test) => {
        return {
          subjectId: test.subjectId,
          result: test.answer1 + test.answer2 + test.answer3,
          at: test.createdAt,
        };
      });

    const scores = subjects
      .map((subject) =>
        testsFiltered.filter((test) => test.subjectId === subject.id)
      )
      .map((subject) => {
        return {
          subjectId: subject.id,
          length: subject.length,
          result: Math.round(
            (subject.map((sub) => sub.result).reduce((a, b) => a + b, 0) /
              (subject.length * 3)) *
              100
          ),
        };
      });

    res.send({ tests: testsFiltered, scores });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
