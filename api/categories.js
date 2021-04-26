"use strict";
const service = require("../services/categories");
const response = require("../exchange/response");

const createCategory = async (req, res) => {
    const log = req.context.logger.start(`api:categories:createCategory`);
    try {
        const category = await service.createCategory(req.files, req.body, req.context);

        log.end();
        return response.data(res, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const createSubCategory = async (req, res) => {
    const log = req.context.logger.start(`api:categories:createSubCategory`);
    try {
        const category = await service.createSubCategory(req.files, req.body, req.context);

        log.end();
        return response.data(res, category);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// const update = async (req, res) => {
//     const log = req.context.logger.start(`api:categories:update`);
//     try {
//         const category = await service.update(req.params.id, req.body, req.context);
//         log.end();
//         return response.data(res, category);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const listByUserId = async (req, res) => {
//     const log = req.context.logger.start(`api:categories:list`);
//     try {
//         const categories = await service.categoriesByUserId(req.params.id, req.context);
//         log.end();
//         return response.data(res, categories);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const list = async (req, res) => {
//     const log = req.context.logger.start(`api:categories:list`);
//     try {
//         const categories = await service.allCategories(req.context);
//         log.end();
//         return response.data(res, categories);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

// const remove = async (req, res) => {
//     const log = req.context.logger.start(`api:remove:list`);
//     try {
//         const categories = await service.removeCategoriesById(req.params.id, req.context);
//         const message = "category deleted Successfully";
//         log.end();
//         return response.success(res, message, categories);
//     } catch (err) {
//         log.error(err);
//         log.end();
//         return response.failure(res, err.message);
//     }
// };

exports.createCategory = createCategory;
exports.createSubCategory = createSubCategory;
// exports.listByUserId = listByUserId;
// exports.update = update;
// exports.list = list;
// exports.remove = remove;
