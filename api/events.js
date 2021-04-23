"use strict";
const service = require("../services/events");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:events:create`);
    try {
        const event = await service.create(req.body, req.context);

        log.end();
        return response.data(res, event);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:events:update`);
    try {
        const event = await service.update(req.params.id, req.body, req.context);
        log.end();
        return response.data(res, event);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const listByUserId = async (req, res) => {
    const log = req.context.logger.start(`api:event:list`);
    try {
        const events = await service.eventsByUserId(req.params.id, req.context);
        log.end();
        return response.data(res, events);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:event:list`);
    try {
        const events = await service.allEvents(req.context);
        log.end();
        return response.data(res, events);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:remove:list`);
    try {
        const event = await service.removeEventsById(req.params.id, req.context);
        const message = "event deleted Successfully";
        log.end();
        return response.success(res, message, event);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.listByUserId = listByUserId;
exports.update = update;
exports.list = list;
exports.remove = remove;
