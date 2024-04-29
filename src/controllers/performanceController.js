const { endpoints } = require('../config/config');
const validateDates = require('../services/validateDates');
const { percentagesCalculator, percentilesCalculator } = require('../services/performanceMetricsCalculator');
const dataFetcher = require('../repositories/dataFetcher');


const getAllPerformanceMetrics = async (req, res) => {
    try {
        // Get dates from query
        const startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);

        // Dates validation
        validateDates(startDate, endDate);

        // startDate should begin at 00:00:00 and endDate finish at 23:59:59
        endDate.setUTCHours(23, 59, 59, 999);

        // Get data
        const { data, firstReadingDate } = await dataFetcher(startDate, endDate);
        if(!data.length) throw new Error(`There are no readings available for this date range. First reading on ${firstReadingDate}`);

        // Get performance metrics
        const performanceMetrics = endpoints.map(endpoint => {
            const endpointData = data.filter(elem => elem.dataValues.endpoint === endpoint);
            const percentageMetrics = percentagesCalculator(endpointData);
            const percentilesMetrics = percentilesCalculator(endpointData, [90, 99, 99.9])
            return { endpoint, ...percentageMetrics, ...percentilesMetrics };
        });

        res.status(200).json(performanceMetrics);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


const getLatencyPercentils = async (req, res) => {
    const { percentil } = req.params;
    
    try {
        if(!Number(percentil) || percentil < 0 || percentil > 100) throw new Error(`${percentil} is not a valid percentil. Enter a number between 0 and 100`)
        
        // Get dates from query
        const startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);

        // Dates validation
        validateDates(startDate, endDate);

        // startDate should begin at 00:00:00 and endDate finish at 23:59:59
        endDate.setUTCHours(23, 59, 59, 999);

        // Get data
        const { data, firstReadingDate } = await dataFetcher(startDate, endDate);
        if(!data.length) throw new Error(`There are no readings available for this date range. First reading on ${firstReadingDate}`);

        // Get latency percentils
        const latencyPercentils = endpoints.map(endpoint => {
            const endpointData = data.filter(elem => elem.dataValues.endpoint === endpoint);
            const percentilMetrics = percentilesCalculator(endpointData, [percentil])
            return { endpoint, ...percentilMetrics };
        });

        res.status(200).json(latencyPercentils);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};


const getStatePercentages = async (req, res) => {
    const state = req.params.state.toLowerCase();
    
    try {
        if(state !== 'up' && state !== 'down' && state !== 'delayed') throw new Error(`${state} state is not valid. Valid states: UP, DOWN or DELAYED`);
        
        // Get dates from query
        const startDate = new Date(req.query.startDate);
        let endDate = new Date(req.query.endDate);

        // Dates validation
        validateDates(startDate, endDate);

        // startDate should begin at 00:00:00 and endDate finish at 23:59:59
        endDate.setUTCHours(23, 59, 59, 999);

        // Get data
        const { data, firstReadingDate } = await dataFetcher(startDate, endDate);
        if(!data.length) throw new Error(`There are no readings available for this date range. First reading on ${firstReadingDate}`);

        // Get state percentages
        const statePercentages = endpoints.map(endpoint => {
            const endpointData = data.filter(elem => elem.dataValues.endpoint === endpoint);
            const { totalReadings, upPercentage, downPercentage, delayedPercentage } = percentagesCalculator(endpointData);

            if(state === 'up') return { endpoint, totalReadings, upPercentage };
            else if(state === 'down') return { endpoint, totalReadings, downPercentage };
            else return { endpoint, totalReadings, delayedPercentage };
        });

        res.status(200).json(statePercentages);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
};

module.exports = {
    getAllPerformanceMetrics,
    getLatencyPercentils,
    getStatePercentages
}
