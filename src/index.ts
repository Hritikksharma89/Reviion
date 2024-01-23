import express, { Application } from 'express';

import { DB } from './connect';
import { environment } from './env';
import docsRoute from './modules/docs/docs.route';
import userRoute from './modules/users/user.route';

const app: Application = express();
const port = environment.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users/', userRoute);
app.use('/docs/', docsRoute);

const start = async () => {
  try {
    await DB();
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err: any) {
    console.log(err);
  }
};

start();
