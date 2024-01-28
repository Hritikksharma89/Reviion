import mongoose from "mongoose"
import factory from "../../factory"
import { Settings } from "./setting.model"
import { ISettings } from "./setting.interface"

export const settingModel = factory(Settings)

export const getAllSetting = (skip?: string, limit?: string, sort?: string):Promise<ISettings[]> => settingModel.find(skip, limit, sort)
export const getSettingById = (_id: mongoose.Types.ObjectId):Promise<ISettings> => settingModel.findById(_id)
export const createSetting = (payload: object): Promise<ISettings> => settingModel.create(payload)
export const deleteSettingById = (_id: mongoose.Types.ObjectId): Promise<ISettings> => settingModel.deleteById(_id)
export const updateSettingById = (_id: mongoose.Types.ObjectId, payload: object): Promise<ISettings> => settingModel.updateById(_id, payload)
