import { Request, Response } from 'express'

import { IUserOnboarding } from '../../interface/users.interfaces'
import { Onboardings } from '../../models/model'

export const getAllOnboardings = async (req: Request, res: Response): Promise<void> => {
  try {
    const onboarding = await Onboardings.find<IUserOnboarding[]>()
    if (onboarding.length < 0) {
      res.status(200).json({ message: 'No onboarding found', data: onboarding })
    } else {
      res.status(200).json({ message: 'Onboarding  fetch successfully', data: onboarding })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const getOnboardingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const onboarding = await Onboardings.findById<IUserOnboarding>(_id)
    if (!_id) {
      res.status(400).json({ message: 'Invalid onboarding ID', data: null })
    }

    if (onboarding) {
      res.status(200).json({ message: 'Onboarding  id found', data: onboarding })
    } else {
      res.status(404).json({ message: 'No onboarding found', data: onboarding })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: [], error: error?.message })
  }
}

export const createOnboarding = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body
    console.log(payload)
    const onboarding = await Onboardings.create<IUserOnboarding>(payload)
    if (onboarding) {
      res.status(201).json({ message: 'Onboarding  created successfully', data: onboarding })
    } else {
      res.status(204).json({ message: 'Failed to create onboarding', data: onboarding })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const deleteOnboardingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const onboarding = await Onboardings.findByIdAndDelete<IUserOnboarding>(_id)
    if (onboarding) {
      res.status(201).json({ message: 'Onboarding  deleted successfully', data: onboarding })
    } else {
      res.status(204).json({ message: 'Failed to delete onboarding', data: onboarding })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}

export const updateOnboardingById = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id: string = req.params.id
    const payload: IUserOnboarding = req.body
    console.log(payload)
    const onboarding = await Onboardings.findByIdAndUpdate<IUserOnboarding>(_id, payload)
    if (onboarding) {
      res.status(201).json({ message: 'Onboarding  updated successfully', data: onboarding })
    } else {
      res.status(204).json({ message: 'Failed to update onboarding', data: onboarding })
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong', data: {}, error: error?.message })
  }
}
