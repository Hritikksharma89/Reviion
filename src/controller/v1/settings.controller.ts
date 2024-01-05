import { Request, Response } from 'express'

import { IUserSetting } from '../../interface/users.interfaces'
import { Settings } from '../../models/model'

export const getAllSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const setting = await Settings.find<IUserSetting[]>()
    if (setting.length < 0) {
      res.status(200).json({ message: 'No setting found', data: setting })
    } else {
      res.status(200).json({ message: 'Setting  fetch successfully', data: setting })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const getSettingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const setting = await Settings.findById<IUserSetting>(_id)
    if (!_id) {
      res.status(400).json({ message: 'Invalid setting ID', data: null })
    }

    if (setting) {
      res.status(200).json({ message: 'Setting  id found', data: setting })
    } else {
      res.status(404).json({ message: 'No setting found', data: setting })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const createSetting = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body
    console.log(payload)
    const setting = await Settings.create<IUserSetting>(payload)
    if (setting) {
      res.status(201).json({ message: 'Setting  created successfully', data: setting })
    } else {
      res.status(204).json({ message: 'Failed to create setting', data: setting })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const deleteSettingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const setting = await Settings.findByIdAndDelete<IUserSetting>(_id)
    if (setting) {
      res.status(201).json({ message: 'Setting  deleted successfully', data: setting })
    } else {
      res.status(204).json({ message: 'Failed to delete setting', data: setting })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const updateSettingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const payload: IUserSetting = req.body
    console.log(payload)
    const setting = await Settings.findByIdAndUpdate<IUserSetting>(_id, payload)
    if (setting) {
      res.status(201).json({ message: 'Setting  updated successfully', data: setting })
    } else {
      res.status(204).json({ message: 'Failed to update setting', data: setting })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}
