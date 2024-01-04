import { Router } from 'express';

/**
 * @swagger
 * tags:
 *   name: Onboardings
 *   description: Operations related to Onboarding
 */
import {
  createOnboarding,
  deleteOnboardingById,
  getAllOnboardings,
  getOnboardingById,
  updateOnboardingById,
} from '../../controller/v1/onboardings.controller';

const onboardingsRoute = Router();

/**
 * @swagger
 * /api/v1/onboardings:
 *    get:
 *      summary: Get all onboarding
 *      description: Retrieve a list of all onboardings
 *      tags: [Onboardings]
 *      responses:
 *        '200' :
 *         description: Successful response
 *         content:
 *          application:/json:
 *           example: {"message": "Onboardings fetch successfully", "data": [] }
 */

onboardingsRoute.get('/', getAllOnboardings);

/**
 * /api/v1/onboardings/{id}:
 *    get:
 *       summary: Get onboarding by ID
 *       description: Retrieve onboarding by ID
 *       tags: [Onboardings]
 *       parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the onboarding
 *       response:
 *         '200':
 *          description: Successfully response
 *          content:
 *            application/json:
 *              example: {}
 */

onboardingsRoute.get('/:id', getOnboardingById);
/**
 * @swagger
 * /api/v1/onboardings:
 *   post:
 *     summary: Create a new onboarding
 *     tags: [Onboardings]
 *     requestBody:
 *       description: User data
 *       required: true
 *       content:
 *         application/json:
 *           example: {}
 *     responses:
 *       '201':
 *         description: Onboarding created successfully
 *         content:
 *           application/json:
 *             example: { }
 */
onboardingsRoute.post('/', createOnboarding);

/**
 * @swagger
 * /api/v1/onboardings/{id}:
 *   put:
 *     summary: Update onboarding by ID
 *     description: Update onboarding by ID and body
 *     tags: [Onboardings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the onboarding to update
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated onboarding data
 *       required: true
 *       content:
 *         application/json:
 *           example: { }
 *     responses:
 *       '200':
 *         description: Onboarding updated successfully
 *         content:
 *           application/json:
 *             example: {"message": "Onboarding updated successfully","data": []}
 */

onboardingsRoute.put('/:id', updateOnboardingById);
/**
 * @swagger
 * /api/v1/onboardings/{id}:
 *   delete:
 *     summary: Delete onboarding by ID
 *     tags: [Onboardings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the onboarding to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Onboarding deleted successfully
 */
onboardingsRoute.delete('/:id', deleteOnboardingById);

export default onboardingsRoute;
