require('dotenv').config();
const { Sequelize } = require('sequelize');
const Monitoring = require('../models/Monitoring');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const database = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
    {
        logging: false,
        dialect: 'postgres',
        timezone:"-03:00"
    }
);

Monitoring(database);

module.exports = { database, ...database.models };
