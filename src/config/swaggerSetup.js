const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about the API
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Latency Monitoring Service',
            version: '1.0.0'
        },
    },
    apis: [
        './src/routes/index.js',
        './src/routes/performance.js'
    ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Setup docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.status(200).json(swaggerSpec);
    });

    console.log(`API Docs are available at http://localhost:${port}/api/docs`);
};

module.exports = { swaggerDocs };
