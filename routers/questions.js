const { Router } = require('express');
const teacherAuthMiddleware = require('../auth/teacherAuthMiddleware');
const Question = require('../models').question;
const Answer = require('../models').answer;

const router = new Router();

// TEACHER
router.get('/:id', teacherAuthMiddleware, async (req, res, next) => {
  const { id } = req.params;
  try {
    const questions = await Question.findAll({
      where: { subjectId: id },
      include: [{ model: Answer }],
    });
    if (!questions) {
      return res.status(404).send({
        message: 'No questions for that subject found',
      });
    } else {
      res.send(questions);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
