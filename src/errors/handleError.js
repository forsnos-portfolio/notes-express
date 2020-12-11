'use strict';

module.exports = (err, req, res, next) => {
    console.log(err)
    return res.status(err.status || 500).json({
        type: `https://httpstatuses.com/${err.status || 500}`,
        title: err.title || 'Internal Server Error',
        detail: err.detail,
        instance: req.url,
        status: err.status || 500,
        errors: err.errors || []
    }).end();
};
