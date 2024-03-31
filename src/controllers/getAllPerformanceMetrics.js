const performanceMetricsHandler = require('./performanceMetricsHandler');

module.exports = async function getAllPerformanceMetrics(req, res) {
    try {
        const performanceMetrics = await performanceMetricsHandler(req);
        res.status(200).json(performanceMetrics);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};
