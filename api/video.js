"use strict";
// const service = require("../services/videos");
// const response = require("../exchange/response");

const uploadSingle = async (req, res) => {
    const log = req.context.logger.start(`api:videos:uploadSingle`);
    try {
        const url = await service.uploadSingle(req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const uploadMultiple = async (req, res) => {
    const log = req.context.logger.start(`api:videos:uploadMultiple`);
    try {
        const url = await service.uploadMultiple(req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:videos:remove`);
    try {
        const data = await service.remove(req.query, req.context);
        log.end();
        return response.data(res, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


exports.uploadSingle = uploadSingle;
exports.uploadMultiple = uploadMultiple;
exports.remove = remove;

