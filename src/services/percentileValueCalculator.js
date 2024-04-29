module.exports = function percentileValueCalculator(arrayOfSortedNumbers, percentile) {

    // Get percentile index
    const percentileIndex = Math.ceil(arrayOfSortedNumbers.length * (percentile / 100) - 1);

    const result = arrayOfSortedNumbers[percentileIndex];

    return result;
}
