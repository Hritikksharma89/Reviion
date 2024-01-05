// src/routes/v1/profiles.route.ts
import { Router } from 'express'

/**
 * @swagger
 * tags:
 *   name: Profiles
 *   description: Operations related to Profiles
 */
import {
  createProfile,
  deleteProfileById,
  getAllProfiles,
  getProfileById,
  updateProfileById,
} from '../../controller/v1/profiles.controller'

const profilesRoute = Router()

/**
 * @swagger
 * /api/v1/profiles:
 *   get:
 *      summary: Get all profile
 *      description: Retrieve a list of all profiles
 *      tag: [Profiles]
 *      responses:
 *         '200' :
 *          description: Successful response
 *          content:
 *            application:/json:
 *              example: {"message":"Profiles fetch successfully", "data": []}
 */

profilesRoute.get('/', getAllProfiles)

/**
 * /api/v1/profiles/{id}:
 *    get:
 *       summary: Get profile by ID
 *       description: Retrieve profiles by ID
 *       tags: [Profiles]
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the profile
 *          schema:
 *            type: string
 *       response:
 *          '200':
 *          description: Successfully response
 *          content:
 *            application/json
 *              example: {}
 */
profilesRoute.get('/:id', getProfileById)

/**
 * @swagger
 * /api/v1/profiles:
 *   post:
 *     summary: Create a new user
 *     tags: [Profiles]
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
profilesRoute.post('/', createProfile)

/**
 * @swagger
 * /api/v1/profiles/{id}:
 *   put:
 *     summary: Update profile by ID
 *     description: Update profile by ID and body
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated profile data
 *       required: true
 *       content:
 *         application/json:
 *           example: { _id: '123', name: 'John Doe', email: 'john@example.com', phone: 1234567890, emailVerified: true, membership: 'Gold', role: 'Admin' }
 *     responses:
 *       '200':
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Profiles updated successfully","data": [{"_id": "658c6bb1adfc1925457cec68","name": "Smith hoe","email": "Smith.doe@example.com","phone": 1234567890,"emailVerified": false,"membership": "FREE","role": "ADMIN","__v": 0}]}
 */
profilesRoute.put('/:id', updateProfileById)

/**
 * @swagger
 * /api/v1/profiles/{id}:
 *   delete:
 *     summary: Delete profile by ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Profile deleted successfully
 */
profilesRoute.delete('/:id', deleteProfileById)

export default profilesRoute
