'use strict';

class NotFoundError extends Error {
    constructor(detail) {
        super();
        this.title = 'Not Found';
        this.detail = detail;
        this.status = 404;
    }
}

class ForbiddenError extends Error {
    constructor(detail) {
        super();
        this.title = 'Forbidden';
        this.detail = detail;
        this.status = 403;
    }
}

module.exports = {
    NotFoundError,
    ForbiddenError
}
