module.exports = function validateDates(startDate, endDate) {
    if(isNaN(startDate) || isNaN(endDate)) {
        throw new Error('Invalid date format. Enter dates in YYYYY-MM-DD format');
    };

    if(startDate > endDate) {
        throw new Error ('Start date cannot be greater than end date');
    }
}