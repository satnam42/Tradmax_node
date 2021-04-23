"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:role:create");
    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.type) {
        log.end();
        return response.failure(res, "type is required, for super admin = supperAdmin,for admin = admin,for user = user ");
    }
    log.end();
    return next();
};


exports.create = create;
