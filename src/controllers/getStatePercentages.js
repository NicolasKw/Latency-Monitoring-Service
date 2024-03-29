const performanceMetricsHandler = require('./performanceMetricsHandler');

module.exports = async function getStatePercentages(req, res) {
    const { state } = req.params;

    try {
        const performanceMetrics = await performanceMetricsHandler(req);
        const statePercentages = performanceMetrics.map(elem => {
            // If state provided is invalid
            if(isNaN(elem[`${state}Percentage`])) throw new Error(`${state} state is not valid`);

            return {
                endpoint: elem.endpoint, 
                [`${state}Percentage`]: elem[`${state}Percentage`]
            }
        })
        res.status(200).json(statePercentages);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};
