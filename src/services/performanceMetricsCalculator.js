const percentileValueCalculator = require('./percentileValueCalculator');


function percentagesCalculator(endpointData) {
    const uptimeStates = endpointData.map(reading => reading.uptimeState);

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
    const upPercentage = parseFloat((upCounter / totalReadings * 100).toFixed(2));
    const delayedPercentage = parseFloat((delayedCounter / totalReadings * 100).toFixed(2));
    const downPercentage = parseFloat((downCounter / totalReadings * 100).toFixed(2));

    return {
        totalReadings,
        upPercentage,
        delayedPercentage,
        downPercentage
    }
};


function percentilesCalculator(endpointData, percentilsArray) {
    const latencies = endpointData.map(reading => reading.latency);

    // Sort values from highest to lowest
    const sortedLatencies = latencies.sort((a, b) => a - b);

    const percentilsMetrics = {};
    
    percentilsArray.forEach(percentil => {
        percentilsMetrics[`p${percentil}`] = percentileValueCalculator(sortedLatencies, percentil)
    })

    return percentilsMetrics;
}


module.exports = { percentagesCalculator, percentilesCalculator }
