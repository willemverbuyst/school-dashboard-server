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

router.get('/students/:id', teacherAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const subjects = await Subject.findAll();

    const tests = await Test.findAll({
      where: { studentId: id },
      attributes: ['answer1', 'answer2', 'answer3', 'subjectId'],
    });

    const results = tests.map((test) => {
      return {
        subjectId: test.subjectId,
        result: test.answer1 + test.answer2 + test.answer3,
      };
    });

    const scores = subjects
      .map((subject) => {
        return {
          subjectId: subject.id,
          result: results
            .filter((result) => result.subjectId === subject.dataValues.id)
            .map((test) => test.result),
        };
      })
      .map(({ subjectId, result }) => {
        return {
          subjectId: subjectId,
          score: Math.round(
            (result.reduce((a, b) => a + b, 0) / (result.length * 3)) * 100
          ),
          tests: result.length,
        };
      });

    res.send(scores);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

router.get('/subjects/:id', teacherAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const students = await Student.findAll({
      where: { teacherId: req.teacher.id },
    });

    const tests = await Test.findAll({
      where: { subjectId: id },
      attributes: ['answer1', 'answer2', 'answer3', 'studentId'],
    });

    const results = tests.map((test) => {
      return {
        studentId: test.studentId,
        result: test.answer1 + test.answer2 + test.answer3,
      };
    });

    const scores = students
      .map((student) => {
        return {
          studentId: student.id,
          result: results
            .filter((result) => result.studentId === student.dataValues.id)
            .map((test) => test.result),
        };
      })
      .map(({ studentId, result }) => {
        return {
          studentId: studentId,
          score: Math.round(
            (result.reduce((a, b) => a + b, 0) / (result.length * 3)) * 100
          ),
          tests: result.length,
        };
      });

    res.send(scores);
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
      attributes: ['answer1', 'answer2', 'answer3', 'studentId', 'subjectId'],
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

    res.send({ subjects: scores });
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
