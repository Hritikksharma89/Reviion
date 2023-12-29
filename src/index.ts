import express, { Application } from 'express';

import { DB } from './lib/connect';
import v1Routes from './routes';
import { environment } from './validation/env.validation';

const app: Application = express();
const port = environment.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', v1Routes);

const start = async () => {
  try {
    await DB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err: any) {
    console.log(err);
  }
};

start();
