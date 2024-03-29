process.env.TZ = 'America/Argentina/Buenos_Aires';
const express = require('express');
const morgan = require('morgan');
const getLatency = require('./services/getLatency');
const saveReadingInDb = require('./services/saveReadingInDb');
const { endpoints, readingsInterval } = require('./config/config');
const routes = require('./routes/index');

const app = express();

app.use(morgan('dev'));

const periodicMiddleWare = () => {
    const latenciesPromises = endpoints.map(endpoint => getLatency(endpoint));

    Promise.allSettled(latenciesPromises)
        .then(results => results.forEach(result => saveReadingInDb(result.value)))
        .catch(err => console.log(err))
        .finally(() => console.log(`${new Date(Date.now()).toLocaleString()}: New readings recorded`))
};

setInterval(periodicMiddleWare, readingsInterval);

app.use('/', routes);

module.exports = app;
