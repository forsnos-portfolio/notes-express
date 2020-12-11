'use strict';

const sequelize = require('sequelize');
const configService = require('../lib/configService');
const logger = require('../lib/logger');
const autoImport = require('../lib/autoImport');

const database = configService.get('PG_DATABASE');
const user = configService.get('PG_USER');
const password = configService.get('PG_PASSWORD');
const host = configService.get('PG_HOST');
const port = configService.get('PG_PORT');

const seq = new sequelize(database, user, password, {
    dialect: 'postgres',
    host: host,
    port: port
});

seq.authenticate()
    .then(() => logger.system('Connection has been established successfully.'))
    .catch(err => logger.system(`Unable to connect to the database:`, err));

seq.sync().then(() => logger.system(`Database & tables created!`));


module.exports = autoImport(seq, __dirname);
