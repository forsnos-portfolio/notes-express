'use strict';

const {jwtService} = require('../lib/jwt');

module.exports.hasRole = (...roles) => {
    return async (req, res, next) => {
        const token = getAccessToken(req.header('authorization'));
        const isAnonymous = roles.includes('anonymous');
        if (token == null && isAnonymous) {
            return next();
        }

        const decoded = await jwtService.verifyToken(token);

        if (roles.includes('authorize')) {
            req.user = decoded;
            return next();
        }

        next();
    }
}


const getAccessToken = (header) => {
    return header && header.split(' ')[1];
}
