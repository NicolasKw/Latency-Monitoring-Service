require('dotenv').config();
const { Sequelize } = require('sequelize');
const Monitoring = require('../models/Monitoring');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const database = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    // `postgres://${DB_USER}:${DB_PASSWORD}@database:5432/${DB_NAME}`,
    {
        logging: false
    }
);

Monitoring(database);

module.exports = { database, ...database.models };
