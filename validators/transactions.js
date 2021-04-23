"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:transactions:create");

    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.body.amount) {
        log.end();
        return response.failure(res, "amount is required");
    }
    if (!req.body.source) {
        log.end();
        return response.failure(res, "source is required");
    }
    if (!req.body.currency) {
        log.end();
        return response.failure(res, "currency is required");
    }
    log.end();
    return next();
};







exports.create = create;
