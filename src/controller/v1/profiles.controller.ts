import { Request, Response } from 'express'
import httpStatus, { HttpStatus } from 'http-status'

import { IProfile } from '../../interface/users.interfaces'
import { Profiles } from '../../models/model'

export const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profiles.find<IProfile[]>()
    if (profile.length < 0) {
      res.status(httpStatus.CREATED).json({ message: 'No profile found', data: profile })
    } else {
      res
        .status(httpStatus.CREATED)
        .json({ message: 'Profiles  fetch successfully', data: profile })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const getProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const profile = await Profiles.findById<IProfile>(_id)
    if (!_id) {
      res.status(400).json({ message: 'Invalid profile ID', data: null })
    }

    if (profile) {
      res.status(httpStatus.CREATED).json({ message: 'Profiles  id found', data: profile })
    } else {
      res.status(404).json({ message: 'No profile found', data: profile })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body
    console.log(payload)
    const profile = await Profiles.create<IProfile>(payload)
    if (profile) {
      res.status(201).json({ message: 'Profiles  created successfully', data: profile })
    } else {
      res.status(204).json({ message: 'Failed to create profile', data: profile })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const deleteProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const profile = await Profiles.findByIdAndDelete<IProfile>(_id)
    if (profile) {
      res.status(201).json({ message: 'Profiles  deleted successfully', data: profile })
    } else {
      res.status(204).json({ message: 'Failed to delete profile', data: profile })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const updateProfileById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const payload: IProfile = req.body
    console.log(payload)
    const profile = await Profiles.findByIdAndUpdate<IProfile>(_id, payload)
    if (profile) {
      res.status(201).json({ message: 'Profiles  updated successfully', data: profile })
    } else {
      res.status(204).json({ message: 'Failed to update profile', data: profile })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}
