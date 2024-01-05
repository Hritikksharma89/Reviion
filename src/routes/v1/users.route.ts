// src/routes/v1/users.route.ts

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */
import { Router } from 'express'

import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../../controller/v1/users.controller'

const userRoute = Router()

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"message": "Users fetch successfully","data": [{"_id": "658c6bb1adfc1925457cec68","name": "Smith hoe","email": "Smith.doe@example.com","phone": 1234567890,"emailVerified": false,"membership": "FREE","role": "ADMIN","__v": 0}]}
 */
userRoute.get('/', getAllUsers)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: { _id: '123', name: 'John Doe', email: 'john@example.com', phone: 1234567890, emailVerified: true, membership: 'Gold', role: 'Admin' }
 */
userRoute.get('/:id', getUserById)

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           example: { _id: '123', name: 'John Doe', email: 'john@example.com', phone: 1234567890, emailVerified: true, membership: 'Gold', role: 'Admin' }
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example: { _id: '123', name: 'John Doe', email: 'john@example.com', phone: 1234567890, emailVerified: true, membership: 'Gold', role: 'Admin' }
 */
userRoute.post('/', createUser)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: User deleted successfully
 */

userRoute.delete('/:id', deleteUserById)

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update user by ID and body
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user data
 *       required: true
 *       content:
 *         application/json:
 *           example: { _id: '123', name: 'John Doe', email: 'john@example.com', phone: 1234567890, emailVerified: true, membership: 'Gold', role: 'Admin' }
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Users updated successfully","data": [{"_id": "658c6bb1adfc1925457cec68","name": "Smith hoe","email": "Smith.doe@example.com","phone": 1234567890,"emailVerified": false,"membership": "FREE","role": "ADMIN","__v": 0}]}
 */

userRoute.put('/:id', updateUserById)

export default userRoute
