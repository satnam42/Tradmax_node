"use strict";
const response = require("../exchange/response");

const create = (req, res, next) => {
    const log = req.context.logger.start("validators:admins:create");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.email) {
        log.end();
        return response.failure(res, "email is required");
    }
    if (!req.body.password) {
        log.end();
        return response.failure(res, "password is required");
    }
    if (!req.body.roleId) {
        log.end();
        return response.failure(res, "role id is required");
    }
    log.end();
    return next();
};



const login = (req, res, next) => {
    const log = req.context.logger.start("validators:admins:login");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is equired");
    }
    if (!req.body.email) {
        log.end();
        return response.failure(res, "email is required");
    }
    if (!req.body.password) {
        log.end();
        return response.failure(res, "password is required");
    }

    log.end();
    return next();
};

// change password
const changePassword = (req, res, next) => {
    const log = req.context.logger.start("validators:admins:changePassword");

    if (!req.body.newPassword) {
        log.end();
        return response.failure(res, "password is required");
    }

    log.end();
    return next();
};

const update = (req, res, next) => {
    const log = req.context.logger.start("validators:admins:update");

    if (!req.body) {
        log.end();
        return response.failure(res, "body is required");
    }
    if (!req.params.id) {
        log.end();
        return response.failure(res, "user id is required");
    }

    log.end();
    return next();
};

exports.login = login;
exports.create = create;
exports.update = update;
exports.changePassword = changePassword;