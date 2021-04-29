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

// const addQuantity = async (req, res) => {
//     const log = req.context.logger.start(`api:products:create`);
//     try {
//         const product = await service.addQuantity(req.params.id, req.query.quantity, req.context);
//         const message = "Product Quantity added Successfully";
//         log.end();
//         return response.success(res, message, product);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const getById = async (req, res) => {
//     const log = req.context.logger.start(`api:products:getById:${req.params.id}`);
//     try {
//         const product = await service.getById(req.params.id, req.context);
//         log.end();
//         return response.data(res, mapper.toModel(product));
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

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

// const productsByVendor = async (req, res) => {
//     const log = req.context.logger.start(`api:products:productsByVendor`);
//     try {
//         const products = await service.productsByVendor(req.query, req.context);
//         let message = products.count ? products.count : 0;
//         log.end();
//         return response.page(
//             message + " " + "products Got",
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

// const productsBySubCategories = async (req, res) => {
//     const log = req.context.logger.start(`api:products:productsBySubCategories`);
//     try {
//         const products = await service.productsBySubCategories(req.query, req.context);
//         let message = products.count ? products.count : 0 + " " + "products Got";
//         log.end();
//         return response.page(
//             message,
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

// const search = async (req, res) => {
//     const log = req.context.logger.start(`api:products:productList`);
//     try {
//         const products = await service.search(req.query, req.context);
//         log.end();
//         return response.data(
//             res,
//             mapper.toSearchModel(products),
//         );
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

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

// const asignVendor = async (req, res) => {
//     const log = req.context.logger.start(`api:products:update:${req.params.id}`);
//     try {
//         const products = await service.asignVendor(req.body, req.params.id, req.context);
//         log.end();
//         return response.data(res, mapper.toModel(products));
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

const uploadProductImage = async (req, res) => {

    const log = req.context.logger.start(`api:product:ImageUplaod`);
    try {
        const product = await service.uploadProductImage(req.params.id, req.file, req.context);
        const message = " Picture Uploaded Successfully";
        log.end();
        return response.success(res, message, product);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
// const uploadPdf = async (req, res) => {

//     const log = req.context.logger.start(`api:product:uploadPdf`);
//     try {
//         const product = await service.uploadPdf(req.params.id, req.file, req.context);
//         const message = " Pdf Uploaded Successfully";
//         log.end();
//         return response.success(res, message, product);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

exports.create = create;
// exports.productList = productList;
// exports.update = update;
// exports.getById = getById;
// exports.productsBySubCategories = productsBySubCategories;
// exports.search = search
// exports.asignVendor = asignVendor
// exports.productsByVendor = productsByVendor
exports.uploadProductImage = uploadProductImage
// exports.addQuantity = addQuantity
// exports.uploadPdf = uploadPdf
// exports.deleteProduct = deleteProduct