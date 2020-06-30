const { Router } = require('express');
const teacherAuthMiddleware = require('../auth/teacherAuthMiddleware');
const studentAuthMiddleware = require('../auth/studentAuthMiddleware');
const Question = require('../models').question;
const Answer = require('../models').answer;

const router = new Router();

// TEACHER get all the questions for one subject
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

// TEACHER post a new question for a subject
router.post('/', teacherAuthMiddleware, async (req, res, next) => {
  const { subjectId, question, answer1, answer2, answer3, answer4 } = req.body;

  if (!subjectId || !question || !answer1 || !answer2 || !answer3 || !answer4) {
    return res
      .status(400)
      .send({ message: 'Please provide question, 4 answers and subject' });
  }
  try {
    const newQuestion = await Question.create({
      text: question,
      subjectId,
    });
    const newCorrectAnswer = await Answer.create({
      text: answer1,
      correct: true,
      questionId: newQuestion.id,
    });
    const newWrongsAnswers = [answer2, answer3, answer4].forEach((answer) =>
      Answer.create({
        text: answer,
        correct: false,
        questionId: newQuestion.id,
      })
    );

    res.status(201).send({ message: 'You have added a new question.' });
  } catch (error) {
    next(error);
  }
});

// STUDENT get 3 random questions for a subject
router.get('/3qtest/:id', studentAuthMiddleware, async (req, res, next) => {
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
      // https://stackoverflow.com/questions/19269545/how-to-get-n-no-elements-randomly-from-an-array
      const shuffled = questions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      res.send(selected);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
