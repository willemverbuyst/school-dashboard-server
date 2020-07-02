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
      .map((subject) => subject.dataValues.id)
      .map((el) =>
        results.filter((result) => result.subjectId === el).map((r) => r.result)
      )
      .map(
        (score) => (score.reduce((a, b) => a + b, 0) / (score.length * 3)) * 100
      )
      .map((number) => Math.round(number));
    res.send(scores);
  } catch (error) {
    return res.status(400).send({ message: 'Something went wrong, sorry' });
  }
});

module.exports = router;
