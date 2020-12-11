'use strict';

const joi = require('joi');

module.exports = {
    credentials: {
        email: joi.string().trim().email().min(4).max(200).required(),
        password: joi.string().trim().min(2).max(32).required()
    },
    refreshToken: {
        refreshToken: joi.string().trim().min(2).max(4096).required()
    }
}
