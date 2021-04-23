"use strict";
const service = require("../services/notifications");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:create`);
    try {
        const transaction = await service.create(req.body, req.context);
        log.end();
        return response.data(res, transaction);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const listByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:getnotifications`);
    try {
        const notifications = await service.getnotifications(req.params.id, req.context);
        log.end();
        return response.data(res, notifications);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:notifications:getnotifications`);
    try {
        const notifications = await service.getnotifications(req.body, req.context);
        log.end();
        return response.data(res, notifications);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.listByUserId = listByUserId;
