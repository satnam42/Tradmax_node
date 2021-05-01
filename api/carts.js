"use strict";
const service = require("../services/carts");
const response = require("../exchange/response");
const mapper = require("../mappers/carts");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:carts:create`);
    try {
        const cart = await service.create(req.body, req.context);
        const message = "Added to cart Successfully";
        log.end();
        return response.success(res, message, cart);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getCarts = async (req, res) => {
    const log = req.context.logger.start(`api:carts:getCarts`);
    try {
        const cart = await service.getCarts(req.query, req.context);
        let message = "Cart Fetched Successfully";
        log.end();
        return response.success(res, message, cart);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// const update = async (req, res) => {
//     const log = req.context.logger.start(`api:products:update:${req.params.id}`);
//     try {
//         const product = await service.update(req.params.id, req.body, req.context);
//         let message = 'product updated successfully'
//         log.end();
//         return response.success(res, message, product);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const deleteProduct = async (req, res) => {
//     const log = req.context.logger.start(`api:products:deleteProduct:${req.params.id}`);
//     try {
//         const task = await service.deleteProduct(req.params.id, req.context);
//         log.end();
//         let message = "product deleted Successfully";
//         log.end();
//         return response.success(res, message);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };


exports.create = create;
exports.getCarts = getCarts;
// exports.deleteProduct = deleteProduct