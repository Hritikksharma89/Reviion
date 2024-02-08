import { Router } from 'express';

import {
  CreateSetting,
  DeleteSettingById,
  GetSettingById,
  GetSettings,
  UpdateSettingById,
} from './setting.controller';
import tokenValidate from '../../middleware/tokenValidate';

const settingRoute = Router();

settingRoute.get('/', tokenValidate, GetSettings);
settingRoute.post('/', tokenValidate, CreateSetting);
settingRoute.delete('/:id', tokenValidate, DeleteSettingById);
settingRoute.get('/:id', tokenValidate, GetSettingById);
settingRoute.put('/:id', tokenValidate, UpdateSettingById);

export default settingRoute;
