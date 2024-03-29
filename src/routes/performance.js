const { Router } = require('express');
const getAllPerformanceMetrics = require('../controllers/getAllPerformanceMetrics');
const getStatePercentages = require('../controllers/getStatePercentages');
const getLatencyPercentils = require('../controllers/getLatencyPercentils');

const router = Router();

router.get('/', getAllPerformanceMetrics);
router.get('/state/:state', getStatePercentages);
router.get('/percentil/:percentil', getLatencyPercentils);

module.exports = router;
