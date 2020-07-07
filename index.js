require('dotenv').config();
const express = require('express');
const loggerMiddleWare = require('morgan');
const corsMiddleWare = require('cors');
const { PORT } = require('./config/constants');
const schoolRouter = require('./routers/general');
const authRouter = require('./routers/auth');
const questionsRouter = require('./routers/questions');
const dataRouter = require('./routers/data');
const subjectRouter = require('./routers/subject');

const app = express();
app.use(loggerMiddleWare('dev'));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use('/', authRouter);
app.use('/school', schoolRouter);
app.use('/questions', questionsRouter);
app.use('/data', dataRouter);
app.use('/subject', subjectRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
