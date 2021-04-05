const { Router } = require('express');
const teacherAuthMiddleware = require('../auth/teacherAuthMiddleware');
const Subject = require('../models').subject;

const router = new Router();

// TEACHER post a new subject
router.post('/', teacherAuthMiddleware, async (req, res, next) => {
  const { subject } = req.body;

  if (!subject) {
    return res.status(400).send({ message: 'Please provide subject' });
  }
  try {
    const newSubject = await Subject.create({
      name: subject,
    });

    res
      .status(201)
      .send({ newSubject, message: 'You have added a new subject.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
