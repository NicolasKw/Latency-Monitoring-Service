const performanceMetricsHandler = require('./performanceMetricsHandler');

module.exports = async function getLatencyPercentils(req, res) {
    const { percentil } = req.params;

    try {
        if(percentil[0] !== 'p') throw new Error(`${percentil} is not a valid percentil. Enter percentil as 'p...'`)

        const performanceMetrics = await performanceMetricsHandler(req, percentil);
        const percentilResults = performanceMetrics.map(elem => {
            return {
                endpoint: elem.endpoint, 
                [percentil]: elem[percentil]
            }
        })
        res.status(200).json(percentilResults);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};
