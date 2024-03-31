const { Router } = require('express');
const getAllPerformanceMetrics = require('../controllers/getAllPerformanceMetrics');
const getStatePercentages = require('../controllers/getStatePercentages');
const getLatencyPercentils = require('../controllers/getLatencyPercentils');

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Performance Metrics:
 *       type: object
 *       properties:
 *         endpoint:
 *           type: string
 *           description: Monitored endpoint
 *         totalReadings:
 *           type: integer
 *           description: Number of readings recorded within date range provided
 *         upPercentage:
 *           type: integer
 *           description: Percentage of time UP
 *         delayedPercentage:
 *           type: integer
 *           description: Percentage of time DELAYED
 *         downPercentage:
 *           type: integer
 *           description: Percentage of time DOWN
 *         p90:
 *           type: string
 *           nullable: true
 *           description: p90 latency percentile within date range provided
 *         p99:
 *           type: string
 *           nullable: true
 *           description: p99 latency percentile within date range provided
 *         p999:
 *           type: string
 *           nullable: true
 *           description: p99.9 latency percentile within date range provided
 *       example:
 *         endpoint: https://help.lemon.me/es/
 *         totalReadings: 28
 *         upPercentage: 96.43
 *         delayedPercentage: 3.57
 *         downPercentage: 0
 *         p90: 816
 *         p99: 1301
 *         p999: 1301
 *     State:
 *       type: object
 *       properties:
 *         endpoint:
 *           type: string
 *           description: Monitored endpoint
 *         statePercentage:
 *           type: integer
 *           description: Percentage of time {state}
 *       example:
 *         endpoint: https://help.lemon.me/es/
 *         upPercentage: 98
 *     Percentil:
 *       type: object
 *       properties:
 *         endpoint:
 *           type: string
 *           description: Monitored endpoint
 *         percentil:
 *           type: string
 *           nullable: true
 *           description: Custom latency percentil
 *       example:
 *         endpoint: https://www.lemon.me/tarjeta
 *         p80: 59
 */

/**
 * @swagger
 * /performance:
 *   get:
 *     summary: Get all performance metrics for each endpoint within a date range
 *     tags: [Performance Metrics]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-03-29
 *         required: true
 *         description: 
 *            Start date for date range (format: YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-04-05
 *         required: true
 *         description: 
 *            End date for date range (format: YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Get all performance metrics for each endpoint within the date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Performance Metrics'
 *       404:
 *         description: Error message
 *         content:
 *           application/json:
 *             example:
 *               message: There are no readings available for this date range. First reading on 2024/03/31
 */

router.get('/', getAllPerformanceMetrics);

/**
 * @swagger
 * /performance/state/{state}:
 *   get:
 *     summary: Get UP, DOWN or DELAYED percentage for each enpoint within a date range
 *     tags: [UP / DOWN / DELAYED Percentage]
 *     parameters:
 *       - in: path
 *         name: state
 *         schema:
 *           type: string
 *           example: up
 *         required: true
 *         description: 
 *            State: UP / DOWN / DELAYED
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-03-29
 *         required: true
 *         description: 
 *            Start date for date range (format: YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-04-05
 *         required: true
 *         description: 
 *            End date for date range (format: YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Get all performance metrics for each endpoint within the date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 *       404:
 *         description: Error message
 *         content:
 *           application/json:
 *             example:
 *               message:
 *                  CLOSED state is not valid. Valid states: UP, DOWN or DELAYED`
 */
router.get('/state/:state', getStatePercentages);

/**
 * @swagger
 * /performance/percentil/{percentil}:
 *   get:
 *     summary: Get custom latency percentil for each enpoint within a date range
 *     tags: [Custom latency percentil]
 *     parameters:
 *       - in: path
 *         name: percentil
 *         schema:
 *           type: string
 *           example: p80
 *         required: true
 *         description: 
 *            Latency percentil X: pX
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-03-29
 *         required: true
 *         description: 
 *            Start date for date range (format: YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *           example: 2024-04-05
 *         required: true
 *         description: 
 *            End date for date range (format: YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Get custom latency percentil for each endpoint within the date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Percentil'
 *       404:
 *         description: Error message
 *         content:
 *           application/json:
 *             example:
 *               message:
 *                  q80 is not a valid percentil. Enter percentil as 'p...'
 */
router.get('/percentil/:percentil', getLatencyPercentils);

module.exports = router;
