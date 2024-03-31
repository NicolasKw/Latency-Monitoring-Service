const performanceMetricsHandler = require('./performanceMetricsHandler');

module.exports = async function getStatePercentages(req, res) {
    const state = req.params.state.toLowerCase();

    try {
        const performanceMetrics = await performanceMetricsHandler(req);
        const statePercentages = performanceMetrics.map(elem => {
            // If state provided is invalid
            if(isNaN(elem[`${state}Percentage`])) throw new Error(`${state} state is not valid. Valid states: UP, DOWN or DELAYED`);

            return {
                endpoint: elem.endpoint, 
                [`${state}Percentage`]: elem[`${state}Percentage`]
            }
        })
        res.status(200).json(statePercentages);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};
