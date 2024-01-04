import { Router } from 'express';

import {
  createSetting,
  deleteSettingById,
  getAllSetting,
  getSettingById,
  updateSettingById,
} from '../../controller/v1/settings.controller';

const settingsRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: API operations for managing settings.
 */

/**
 * @swagger
 * /api/v1/settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     responses:
 *       200:
 *         description: Successful response with the list of all settings.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example: {"message": "Settings fetch successfully","data": []}
 */
settingsRoute.get('/', getAllSetting);

/**
 * @swagger
 * /api/v1/settings/{id}:
 *   get:
 *     summary: Get a setting by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the setting to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the specified setting.
 *       404:
 *         description: Setting not found.
 *       500:
 *         description: Internal server error.
 *       content:
 *           application/json:
 *             example: {"message": "Settings fetch successfully","data": []}
 */
settingsRoute.get('/:id', getSettingById);

/**
 * @swagger
 * /api/v1/settings:
 *   post:
 *     summary: Create a new setting
 *     tags: [Settings]
 *     requestBody:
 *       description: Setting data to be created.
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Setting created successfully.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
settingsRoute.post('/', createSetting);

/**
 * @swagger
 * /api/v1/settings/{id}:
 *   put:
 *     summary: Update a setting by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the setting to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated setting data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Setting updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Setting not found.
 *       500:
 *         description: Internal server error.
 */
settingsRoute.put('/:id', updateSettingById);

/**
 * @swagger
 * /api/v1/settings/{id}:
 *   delete:
 *     summary: Delete a setting by ID
 *     tags: [Settings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the setting to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Setting deleted successfully.
 *       404:
 *         description: Setting not found.
 *       500:
 *         description: Internal server error.
 */
settingsRoute.delete('/:id', deleteSettingById);

export default settingsRoute;
