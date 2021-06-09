/* exported mapper */
"use strict";
const service = require("../services/orders");
const response = require("../exchange/response");

const placeOrder = async (req, res) => {
    const log = req.context.logger.start(`api:orders:placeOrder`);
    try {
        const orders = await service.placeOrder(req.body, req.context);
        const message = "Order Placed Successfully";
        log.end();
        return response.success(res, message, orders);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getOrder = async (req, res) => {
    const log = req.context.logger.start(`api:orders:getOrder`);
    try {
        const orders = await service.getOrder(req.query, req.context);
        let message = "Orders Fetched Successfully";
        log.end();
        return response.success(res, message, orders);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const updateStatus = async (req, res) => {
    const log = req.context.logger.start(`api:orders:updateStatus`);
    try {
        const orders = await service.updateStatus(req.body, req.context);
        const message = "Order Updated Successfully";
        log.end();
        return response.success(res, message, orders);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAllOrders = async (req, res) => {
    const log = req.context.logger.start(`api:orders:getAllOrders`);
    try {
        const orders = await service.getAllOrders(req.query, req.context);
        let message = "All Orders Fetched Successfully";
        log.end();
        return response.success(res, message, orders);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.placeOrder = placeOrder;
exports.getOrder = getOrder;
exports.updateStatus = updateStatus;
exports.getAllOrders = getAllOrders;