const { Monitoring } = require('../config/db');
const dataFetcher = require('../repositories/dataFetcher');
const validateDates = require('../services/validateDates');

module.exports = async function getAllReadings(req, res) {
    let readings;

    try {
        // If the user wants to see the readings within a certain date range
        if(Object.keys(req.query).length) {
            // Get dates from query
            const startDate = new Date(req.query.startDate);
            let endDate = new Date(req.query.endDate);

            // Dates validation
            validateDates(startDate, endDate);

            // startDate should begin at 00:00:00 and endDate finish at 23:59:59
            endDate.setUTCHours(23, 59, 59, 999);
    
            // Fetch data
            const { data, firstReadingDate } = await dataFetcher(startDate, endDate);
            if(!data.length) throw new Error(`There are no readings available for this date range. First reading on ${firstReadingDate}`);

            readings = data;

        // If no date range is passed by query
        } else {
            readings = await Monitoring.findAll();
        }

        // Correct timestamp timezone to deliver
        readings = readings.map(reading => {
            let { timestamp } = reading.dataValues;
            const correctedTimestamp = new Date(timestamp - (1000 * 60 * 60 * 3));

            reading.dataValues.timestamp = correctedTimestamp;
            return reading;
        })

        res.status(200).json(readings);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
