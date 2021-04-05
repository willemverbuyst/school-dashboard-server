import express from 'express';
import { PORT } from './config/constant';
import { schoolRouter } from './routers/general';

const app = express();

app.use('/school', schoolRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
