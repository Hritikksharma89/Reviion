import { Router } from "express";
import { GetSettings, CreateSetting, DeleteSettingById, GetSettingById, UpdateSettingById } from "./setting.controller";


const settingRoute = Router()

settingRoute.get('/', GetSettings)
settingRoute.post('/', CreateSetting)
settingRoute.get('/id', DeleteSettingById)
settingRoute.get('/id', GetSettingById)
settingRoute.get('/id', UpdateSettingById)


export default settingRoute