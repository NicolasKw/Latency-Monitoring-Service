const { Router } = require('express');
const getAllReadings = require('../controllers/getAllReadings');
const performanceRouter = require('./performance');

const router = Router();

router.use('/readings', getAllReadings)
router.use('/performance', performanceRouter);

module.exports = router;
