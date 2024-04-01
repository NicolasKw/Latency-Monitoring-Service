// Endpoints list to be monitored
const endpoints = [
    'https://www.lemon.me/',
    'https://www.lemon.me/tarjeta',
    'https://www.lemon.me/earn',
    'https://wiki.lemon.me/',
    'https://help.lemon.me/es/',
    'https://curso.lemon.me/',
    'https://report.lemon.me/',
    'https://lemoncash.notion.site/Job-Board-f297c50d579a440b9ff11268de8202e0',
    'https://open.spotify.com/show/3MYjMGrrN17i45X1C4pMsj',
    'intentionalWrongURL',
    'https://www.google.com/maps',
    'https://www.coindesk.com/',
];

// Frequency with which monitoring requests will be made (in milliseconds)
const readingsInterval = 2000;

// Threshold at which the uptime status is considered DELAYED (in milliseconds)
const delayedLatencyThreshold = 1000;

module.exports = { endpoints, readingsInterval, delayedLatencyThreshold };
