'use strict';

const configService = require('./configService');
const jwt = require('jsonwebtoken');

const token = configService.get('JWT_TOKEN_SECRET');
const refresh = configService.get('JWT_TOKEN_REFRESH');

module.exports.jwtService = {
    login: (payload) => {
        const accessToken = jwt.sign(payload, token, {expiresIn: '5m'});
        const refreshToken = jwt.sign(payload, refresh, {expiresIn: '30m'});

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            type: 'Bearer',
            expiresIn: '5m'
        }
    },
    verifyToken: ($token) => {
        return jwt.verify($token, token);
    },
    verifyRefresh: (token) => {
        return jwt.verify(token, refresh);
    }
}
