'use strict';

const express = require('express');
const configService = require('./lib/configService');
const logger = require('./lib/logger');
const handleError = require('./errors/handleError');

const app = express();
const port = configService.get('PORT', 3025);

const middlewares = [
    express.json(),
].forEach(m => app.use(m));

const routes = [
    {
        route: '/security',
        instance: require('./routes/security')
    },
    {
        route: '/notes',
        instance: require('./routes/notes')
    }
].forEach(r => app.use(r.route, r.instance));

app.use((err, req, res, next) => {
    handleError(err, req, res, next);
})

app.listen(port, () => {
    logger.system(`server is running on ${port}`);
})
