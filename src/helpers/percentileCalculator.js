module.exports = function percentileCalculator(arrayOfNumbers, percentile) {
    // Sort values from highest to lowest
    const sortedValues = arrayOfNumbers.sort((a, b) => a - b);

    // Get percentile index
    const percentileIndex = Math.ceil(arrayOfNumbers.length * (percentile / 100) - 1);

    const result = sortedValues[percentileIndex];

    return result;
}
