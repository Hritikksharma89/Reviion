import { Router } from 'express';

import {
  CreateSetting,
  DeleteSettingById,
  GetSettingById,
  GetSettings,
  UpdateSettingById,
} from './setting.controller';

const settingRoute = Router();

settingRoute.get('/', GetSettings);
settingRoute.post('/', CreateSetting);
settingRoute.get('/id', DeleteSettingById);
settingRoute.get('/id', GetSettingById);
settingRoute.get('/id', UpdateSettingById);

export default settingRoute;
