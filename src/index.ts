import express, { Application } from 'express';

import { environment } from './env';
import authRout from './modules/auth/auth.route';
import docsRoute from './modules/docs/docs.route';
import projectRoute from './modules/projects/project.route';
import settingRoute from './modules/settings/setting.route';
import taskRoute from './modules/tasks/task.route';
import teamRoute from './modules/teams/team.route';
import userRoute from './modules/users/user.route';
import { DB } from './utils/connect';

const app: Application = express();
const port = environment.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRout);
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
