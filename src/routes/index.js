const { Router } = require('express');
const getAllReadings = require('../controllers/getAllReadings');
const performanceRouter = require('./performance');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Reading unique identifier
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Reading timestamp in UTC -03:00
 *         endpoint:
 *           type: string
 *           description: Monitored endpoint
 *         latency:
 *           type: integer
 *           format: int32
 *           nullable: true
 *           description: Latency registered in milliseconds
 *         uptimeState:
 *           type: string
 *           enum: [UP, DELAYED, DOWN]
 *           description: Uptime state
 *       example:
 *         id: 74b1b520-fce3-4365-889b-4bee7de8d269
 *         timestamp: 2024-03-31T09:19:32.327Z
 *         endpoint: https://www.lemon.me/
 *         latency: 232
 *         uptimeState: UP
 */

/**
 * @swagger
 * /readings:
 *   get:
 *     summary: Get all readings, optionally filtered by start and end date.
 *     tags: [Readings]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-03-29
 *         required: false
 *         description: 
 *            Start date for filtering readings (format: YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-04-05
 *         required: false
 *         description: 
 *            End date for filtering readings (format: YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Get all readings from database, optionally filtered by start and end date.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reading'
 *       404:
 *         description: Error message
 *         content:
 *           application/json:
 *             example:
 *               message: There are no readings available for this date range. First reading on 2024/03/31
 */
router.get('/readings', getAllReadings);

router.use('/performance', performanceRouter);

module.exports = router;
