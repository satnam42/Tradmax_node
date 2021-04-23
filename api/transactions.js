"use strict";
const service = require("../services/transactions");
const response = require("../exchange/response");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:transactions:create`);
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
    const log = req.context.logger.start(`api:transactions:getTransactions`);
    try {
        const transactions = await service.getTransactions(req.params.id, req.context);
        log.end();
        return response.data(res, transactions);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const list = async (req, res) => {
    const log = req.context.logger.start(`api:transactions:getTransactions`);
    try {
        const transactions = await service.getTransactions(req.body, req.context);
        log.end();
        return response.data(res, transactions);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.list = list;
exports.listByUserId = listByUserId;
