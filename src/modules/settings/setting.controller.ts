import mongoose from "mongoose";
import { Request, Response } from "express";
import tryCatch from "../../trycatch";
import { createSetting, deleteSettingById, getAllSetting, getSettingById, updateSettingById } from "./setting.services";




export const GetSettings = tryCatch(async (req: Request, res: Response) => {
    const { skip, limit, sort } = req.query;
    const settings = await getAllSetting(skip as string, limit as string, sort as string)
    if (settings.length < 0) {
        res.status(200).json({ message: 'No setting found', data: settings });
    } else {
        res.status(200).json({ message: 'Setting fetch successfully', data: settings });
    }
})

export const GetSettingById = tryCatch(async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid setting ID', data: null });
    }
    const setting = await getSettingById(_id)
    if (setting) {
        return res.status(200).json({ message: 'Setting id found', data: setting });
    } else {
        return res.status(404).json({ message: 'No setting found', data: setting });
    }
})

export const CreateSetting = tryCatch(async (req: Request, res: Response) => {
    const setting = await createSetting(req.body);
  if (setting) {
    return res.status(201).json({ message: 'Setting created successfully', data: setting });
  } else {
    return res.status(204).json({ message: 'Failed to create setting', data: setting });
  }
})

export const DeleteSettingById = tryCatch (async (req: Request, res: Response) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    if (!_id) {
        return res.status(400).json({ message: 'Invalid setting ID', data: null });
    }
    const setting = await deleteSettingById(_id);
    if (setting) {
      return res.status(201).json({ message: 'Setting deleted successfully', data: setting });
    } else {
      return res.status(204).json({ message: 'Failed to delete setting', data: setting });
    }
  })

  export const UpdateSettingById = tryCatch(async (req: Request, res: Response): Promise<any> => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const payload = req.body;
    console.log(payload);
    const setting = await updateSettingById(_id, payload);
    if (setting) {
      return res.status(201).json({ message: 'Setting updated successfully', data: setting });
    } else {
      return res.status(204).json({ message: 'Failed to update setting', data: setting });
    }
  })


  // payload 
  