import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import loggerMiddleWare from 'morgan';
import corsMiddleWare from 'cors';
import { PORT } from './config/constant';
import { router as schoolRouter } from './routers/general';

dotenv.config({ path: __dirname + '/.env' });

const app = express();

app.use(loggerMiddleWare('dev'));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    if (process.env.DELAY)
      setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use('/school', schoolRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
