const axios = require('axios');

module.exports = async function getLatency(endpoint) {
    const start = Date.now() - (3 * 60 * 60 * 1000);    // UTC-03:00
    
    try {
        await axios.get(endpoint);
        const end = Date.now() - (3 * 60 * 60 * 1000);  // UTC-03:00

        const latency = end - start;

        const result = {
            endpoint,
            timestamp: start,
            latency
        }

        return result;

    } catch (error) {
        const result = {
            endpoint,
            timestamp: start,
            latency: null
        }

        return result;
    }
}
