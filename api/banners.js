"use strict";
const service = require("../services/banners");
const response = require("../exchange/response");

const createBanner = async (req, res) => {
    const log = req.context.logger.start(`api:banners:createBanner`);
    try {
        const banner = await service.createBanner(req.files, req.body, req.context);
        log.end();
        return response.data(res, banner);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};


const getBanners = async (req, res) => {
    const log = req.context.logger.start(`api:categories:getBanners`);
    try {
        const banners = await service.getBanners(req.body, req.context);
        const message = "banners feched Successfully";
        log.end();
        return response.data(res, message, banners);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const remove = async (req, res) => {
    const log = req.context.logger.start(`api:remove:list`);
    try {
        const categories = await service.removeCategoriesById(req.params.id, req.context);
        const message = "category deleted Successfully";
        log.end();
        return response.success(res, message, categories);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.createBanner = createBanner;
exports.getBanners = getBanners;
exports.remove = remove;
