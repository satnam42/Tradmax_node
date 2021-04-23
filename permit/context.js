"use strict";
const auth = require("./auth");
const response = require("../exchange/response");
const role = require("../models/role");

const builder = (req, res, next) => {

    const context = {
        logger: require("@open-age/logger")("permit:context:builder")
    };

    req.context = context;

    if (next) {
        return next();
    }

    return null;

};

const validateToken = async (req, res, next) => {

    builder(req, res);

    const log = req.context.logger.start(`permit:auth:validateToken`);

    const token = req.headers["x-access-token"];

    if (!token) {
        return response.failure(res, "token is required");
    }

    const details = auth.extractToken(token, req.context);

    if (details.name === "TokenExpiredError") {
        return response.unAuthorized(res, "token expired");
    }

    if (details.name === "JsonWebTokenError") {
        return response.failure(res, "token is invalid");
    }

    const user = await db.user.findById(details._id).populate('role');;

    if (!user) {
        return response.failure(res, "invalid user");
    }

    req.context.user = user

    try {
        let isPermission = await checkPermission(req.context.user, req.method)

    } catch (error) {
        throw new Error(error.message)
    }
    log.end();
    return next();

};

const requiresToken = async (req, res, next) => {
    builder(req, res);
    const log = req.context.logger.start(`permit:auth:requiresToken`);
    const token = req.headers["x-access-token"];
    if (!token) {
        return response.failure(res, "token is required");
    }
    const decodedUser = auth.extractToken(token, req.context);
    const user = await db.user.findById(decodedUser.id);
    if (!user) {
        return response.failure(res, "invalid user");
    }
    req.context.user = user
    log.end();
    return next();
};

const checkPermission = async (user, method) => {
    if (user.role && user.role.type !== undefined && user.role.type !== 'string' && user.role.type !== "" && user.role.type !== 'user') {
        switch (method) {
            case "POST": return user.role.permission.all || user.role.permissions.add ? true : false
                break;
            case "GET": return user.role.permissions.all || user.role.permissions.view ? true : false
                break;
            case "PUT": return user.role.permissions.all || user.role.permissions.edit ? true : false
                break;
            case "DELETE": return user.role.permissions.all ? true : false
                break;
            default:
                break;
        }
    } else {
        throw new Error('user role not found')
    }
};




exports.builder = builder;
exports.requiresToken = requiresToken;
exports.validateToken = validateToken;