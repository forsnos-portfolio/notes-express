'use strict';

const joi = require('joi');

module.exports.validator = (schema) => {
    return async (req, res, next) => {
        if (!schema) next();

        req.validated = await (joi.object(schema)).validateAsync(Object.assign(
            req.body,
            req.params,
            req.query,
            req.files,
        ));

        next();
    }
}
