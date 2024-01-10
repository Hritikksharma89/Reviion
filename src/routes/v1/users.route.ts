import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controller/v1/users.controller'
import validate from '../../middleware/validate'
import { createUserValidation, updateUserValidation } from '../../validation/user.validation'

const userRoute = Router()

userRoute.get('/', getUsers)
userRoute.get('/:id', getUser)
userRoute.post('/', validate(createUserValidation), createUser)
userRoute.delete('/:id', deleteUser)
userRoute.put('/:id', validate(updateUserValidation), updateUser)

export default userRoute

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: john.doe@example.com
 *         phone:
 *           type: number
 *           description: The phone number of the user.
 *           example: 1234567890
 *         password:
 *           type: string
 *           description: The password for the user.
 *           example: password123
 *       required:
 *         - name
 *         - email
 *         - password
 *
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the user.
 *           example: 1234567890
 *         name:
 *           type: string
 *           description: The name of the user.
 *           example: John Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *           example: john.doe@example.com
 *         phone:
 *           type: number
 *           description: The phone number of the user.
 *           example: 1234567890
 *         emailVerified:
 *           type: boolean
 *           description: Indicates if the email is verified.
 *           example: false
 *         membership:
 *           type: string
 *           description: The membership level of the user.
 *           example: FREE
 *         role:
 *           type: string
 *           description: The role of the user.
 *           example: USER
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateRequest'
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               id: 1234567890
 *               name: John Doe
 *               email: john.doe@example.com
 *               phone: 1234567890
 *               emailVerified: false
 *               membership: FREE
 *               role: USER
 *       '400':
 *         description: Bad request, check request payload
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               id: 1234567890
 *               name: John Doe
 *               email: john.doe@example.com
 *               phone: 1234567890
 *               emailVerified: false
 *               membership: FREE
 *               role: USER
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users with optional pagination.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *     responses:
 *       '200':
 *         description: Users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersListResponse'
 *             example:
 *               message: User fetch successfully
 *               data:
 *                 - id: 1234567890
 *                   name: John Doe
 *                   email: john.doe@example.com
 *                   phone: 1234567890
 *                   emailVerified: false
 *                   membership: FREE
 *                   role: USER
 *                 - id: 2345678901
 *                   name: Jane Smith
 *                   email: jane.smith@example.com
 *                   phone: 9876543210
 *                   emailVerified: true
 *                   membership: PREMIUM
 *                   role: ADMIN
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               message: User deleted successfully
 *               data:
 *                 id: 1234567890
 *                 name: John Doe
 *                 email: john.doe@example.com
 *                 phone: 1234567890
 *                 emailVerified: false
 *                 membership: FREE
 *                 role: USER
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update a user based on the provided user ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *       - in: body
 *         name: body
 *         required: true
 *         description: User data to update
 *         schema:
 *           $ref: '#/components/schemas/UserUpdateRequest'
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *             example:
 *               message: User updated successfully
 *               data:
 *                 id: 1234567890
 *                 name: Updated Name
 *                 email: updated.email@example.com
 *                 phone: 9876543210
 *                 emailVerified: true
 *                 membership: PREMIUM
 *                 role: ADMIN
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 404
 *               message: User not found
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal Server Error
 */
