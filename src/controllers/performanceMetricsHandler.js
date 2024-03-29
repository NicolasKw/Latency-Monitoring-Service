const { endpoints } = require('../config/config');
const dataFetcher = require('../services/dataFetcher');
const performanceMetricsCalculator = require('../services/performanceMetricsCalculator');

module.exports = async function performanceMetricsHandler(req, customPercentil) {
    const startDate = new Date(req.query.startDate);
    let endDate = new Date(req.query.endDate);

    // Dates validation
    if(isNaN(startDate) || isNaN(endDate)) {
        throw new Error('Invalid date format. Enter dates in YYYYY-MM-DD format');
    };

    // startDate should begin at 00:00:00 and endDate finish at 23:59:59
    endDate.setUTCHours(23, 59, 59, 999);
    
    try {
        // Fetch data
        const dbData = await dataFetcher(startDate, endDate);

        // Get the performance metrics for each endpoint
        const performanceMetrics = endpoints.map(endpoint => {
            const endpointData = dbData.filter(elem => elem.dataValues.endpoint === endpoint);
            const metrics = performanceMetricsCalculator(endpointData, customPercentil);
            return { endpoint, ...metrics };
        });
        
    return performanceMetrics;
        
    } catch (error) {
        throw new Error(error.message);
    }
};
