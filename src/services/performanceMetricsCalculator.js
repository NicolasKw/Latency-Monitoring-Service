const percentileCalculator = require('../helpers/percentileCalculator');

module.exports = function performanceMetricsCalculator(endpointData, customPercentil) {
    const uptimeStates = endpointData.map(reading => reading.uptimeState);
    const latencies = endpointData.map(reading => reading.latency);

    // Performance metrics
    let upPercentage;
    let delayedPercentage;
    let downPercentage;
    const defaultPercentils = {
        p90: percentileCalculator(latencies, 90),
        p99: percentileCalculator(latencies, 99),
        p999: percentileCalculator(latencies, 99.9)
    }
    // If user wants to get a custom percentil
    let customPercentilResult;
    if(customPercentil && !defaultPercentils.hasOwnProperty(customPercentil)) {
        customPercentilResult = percentileCalculator(latencies, parseFloat(customPercentil.slice(1)));
    } else {
        customPercentilResult = defaultPercentils[customPercentil];
    }

    // Counters
    let upCounter = 0;
    let delayedCounter = 0;
    let downCounter = 0;
    const totalReadings = uptimeStates.length;

    uptimeStates.forEach(elem => {
        if(elem === 'UP') upCounter++;
        else if(elem === 'DELAYED') delayedCounter++;
        else downCounter++;
    })

    // Results delivered with 2 decimal places
    upPercentage = parseFloat((upCounter / totalReadings * 100).toFixed(2));
    delayedPercentage = parseFloat((delayedCounter / totalReadings * 100).toFixed(2));
    downPercentage = parseFloat((downCounter / totalReadings * 100).toFixed(2));

    return {
        totalReadings,
        upPercentage,
        delayedPercentage,
        downPercentage,
        p90: defaultPercentils.p90,
        p99: defaultPercentils.p99,
        p999: defaultPercentils.p999,
        [customPercentil]: customPercentilResult
    }
};
