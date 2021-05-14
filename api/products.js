"use strict";
const service = require("../services/products");
const response = require("../exchange/response");
const mapper = require("../mappers/products");

const create = async (req, res) => {
    const log = req.context.logger.start(`api:products:create`);
    try {
        const product = await service.create(req.body, req.context);
        const message = "Product Added Successfully";
        log.end();
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


// const productList = async (req, res) => {
//     const log = req.context.logger.start(`api:products:productList`);
//     try {
//         const products = await service.productList(req.query, req.context);
//         let message = products.count ? products.count : 0;
//         log.end();
//         return response.page(
//             message + " " + "Products Got",
//             res,
//             mapper.toSearchModel(products),
//             Number(req.query.pageNo) || 1,
//             Number(req.query.pageSize) || 10,
//             products.count
//         );
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

const productsBySubCategories = async (req, res) => {
    const log = req.context.logger.start(`api:products:productsBySubCategories`);
    try {
        const products = await service.productsBySubCategories(req.query, req.context);
        let message = "Products Fetched Successfully";
        log.end();
        return response.page(message,res, products, Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, products.count)
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const similarProducts = async (req, res) => {
    const log = req.context.logger.start(`api:products:similarProducts`);
    try {
        const products = await service.similarProducts(req.query, req.context);
        let message = "Similar Products Fetched Successfully";
        log.end();
        return response.page(message,res, products, Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, products.count)
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const getAllProducts = async (req, res) => {
    const log = req.context.logger.start(`api:products:getAllProducts`);
    try {
        const products = await service.getAllProducts(req.query, req.context);
        let message = "Products Fetched Successfully";
        log.end();
        return response.page(message,res, products, Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, products.count)
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const filterProducts = async (req, res) => {
    const log = req.context.logger.start(`api:products:productList`);
    try {
        const products = await service.filterProducts(req.body, req.context);
        let message = "Products Fetched Successfully";
        log.end();
        return response.data( res,message, products);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const update = async (req, res) => {
    const log = req.context.logger.start(`api:products:update:${req.params.id}`);
    try {
        const product = await service.update(req.params.id, req.body, req.context);
        let message = 'product updated successfully'
        log.end();
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const deleteProduct = async (req, res) => {
    const log = req.context.logger.start(`api:products:deleteProduct:${req.params.id}`);
    try {
        const product = await service.deleteProduct(req.params.id, req.context);
        log.end();
        let message = "product deleted Successfully";
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const uploadProductFiles = async (req, res) => {
    const log = req.context.logger.start(`api:products:uploadProductFiles`);
    try {
        const url = await service.uploadProductFiles(req.params.id, req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.create = create;
exports.uploadProductFiles = uploadProductFiles;
exports.filterProducts = filterProducts;
exports.getAllProducts = getAllProducts;
exports.productsBySubCategories = productsBySubCategories;
exports.similarProducts = similarProducts
exports.deleteProduct = deleteProduct
exports.update = update;