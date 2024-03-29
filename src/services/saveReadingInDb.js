const { Monitoring } = require('../config/db');
const { delayedLatencyThreshold } = require('../config/config');

module.exports = async function saveReadingInDb ({ endpoint, timestamp, latency }) {
    let uptimeState;

    if(!latency) uptimeState = 'DOWN';
    else if (latency > delayedLatencyThreshold) uptimeState = 'DELAYED';
    else uptimeState = 'UP';

    try {
        await Monitoring.create({
            timestamp,
            endpoint,
            latency,
            uptimeState
        });

    } catch (error) {
        console.log(error)
    }
}
