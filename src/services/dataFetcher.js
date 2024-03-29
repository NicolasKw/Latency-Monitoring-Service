const { Op } = require('sequelize');
const { Monitoring } = require('../config/db');

module.exports = async function dataFetcher(startDate, endDate) {   
    try {
        // Get the data from de DB filtered by the date range provided
        return await Monitoring.findAll({
            where: {
                timestamp: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            },
        });

    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
};
