require('dotenv').config();
const { Sequelize } = require('sequelize');
const Monitoring = require('../repositories/Monitoring');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const database = new Sequelize(
    // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    `postgres://user:password@database:5432/monitoring`,
    {
        logging: false
    }
);

Monitoring(database);

module.exports = { database, ...database.models };
