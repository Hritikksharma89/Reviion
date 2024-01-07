import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controller/v1/users.controller'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.get('/:id', getUser)
userRoute.post('/', createUser)
userRoute.delete('/:id', deleteUser)
userRoute.put('/:id', updateUser)

export default userRoute
