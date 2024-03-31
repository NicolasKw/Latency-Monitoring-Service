const axios = require('axios');

module.exports = async function getLatency(endpoint) {
    const start = Date.now()
    
    try {
        await axios.get(endpoint);
        const end = Date.now()

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
