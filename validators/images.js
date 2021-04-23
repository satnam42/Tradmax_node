"use strict";
const response = require("../exchange/response");

const upload = (req, res, next) => {
    const log = req.context.logger.start("validators:images:upload");
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
        log.end();
        return response.failure(res, "body is required");
    }

    if (!req.body.imageFor) {
        log.end();
        return response.failure(res, "imageFor  is required");
    }

    if (!req.body.id) {
        log.end();
        return response.failure(res, "id is required");
    }

    if (req.files.length === 0) {
        log.end();
        return response.failure(res, "file is requried");
    }
    log.end();
    return next();
};


exports.upload = upload;
