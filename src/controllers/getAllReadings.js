const { Monitoring } = require('../config/db');

module.exports = async function getAllReadings(req, res) {
    try {
        const metrics = await Monitoring.findAll();
        console.log(metrics)
        res.status(200).json(metrics);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
