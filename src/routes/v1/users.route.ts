import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controller/v1/users.controller'
import validate from '../../middleware/validate'
import { createUserValidation } from '../../validation/user.validation'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.get('/:id', getUser)
userRoute.post('/', validate(createUserValidation), createUser)
userRoute.delete('/:id', deleteUser)
userRoute.put('/:id', updateUser)

export default userRoute
