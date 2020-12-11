'use strict';

const joi = require('joi');

module.exports = {
    query: {
        offset: joi.number().integer().min(0).optional().default(0),
        limit: joi.number().integer().max(50).optional().default(10)
    },
    guid: {
        guid: joi.string().trim().required()
    },
    updateNote: {
        guid: joi.string().trim().required(),
        note: joi.string().trim().min(4).max(1000).required(),
    },
    createNote: {
        note: joi.string().trim().min(4).max(1000).required(),
    },
}
