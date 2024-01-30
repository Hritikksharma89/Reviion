import express, { Application } from 'express';

import { DB } from './utils/connect';
import { environment } from './env';
import docsRoute from './modules/docs/docs.route';
import userRoute from './modules/users/user.route';
import teamRoute from './modules/teams/team.route';
import taskRoute from './modules/tasks/task.route';
import settingRoute from './modules/settings/setting.route';
import projectRoute from './modules/projects/project.route';
import authRout from './modules/auth/auth.route';

const app: Application = express();
const port = environment.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRout)
app.use('/projects/', projectRoute);
app.use('/settings/', settingRoute);
app.use('/tasks/', taskRoute);
app.use('/teams/', teamRoute);
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
