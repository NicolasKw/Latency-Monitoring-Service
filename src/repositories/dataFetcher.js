const { Op } = require('sequelize');
const { Monitoring } = require('../config/db');

module.exports = async function dataFetcher(startDate, endDate) {   
    try {
        // Get the data from de DB filtered by the date range provided
        const data = await Monitoring.findAll({
            where: {
                timestamp: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            },
        });

        const firstReading = await Monitoring.findOne()
        const firstReadingDate = firstReading.dataValues.timestamp;

        return {
            data,
            firstReadingDate
        };

    } catch (error) {
        throw new Error(error.message);  
    }
};
