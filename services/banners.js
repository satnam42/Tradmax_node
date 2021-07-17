const imageUrl = require('config').get('image').url
const path = require("path");
"use strict";

// const build = async (model, context) => {
//     const { title } = model;
//     const log = context.logger.start(`services:products:build${model}`);
//     let bannerModel = {
//         title: title,
//         createdOn: new Date(),
//         updatedOn: new Date()
//     }
//     const banner = await new db.banner(bannerModel).save();
//     log.end();
//     return banner;
// };

const createBanner = async (files, body, context) => {
    const log = context.logger.start("services:banners:createBanner");
    if (!files) {
        throw new Error("image not found");
    }
    const fileRes = 'http://13.54.226.124/images/' + files[0].filename
    
    // const fileRes = imageUrl + 'assets/images/' + files[0].filename
    let bannerModel = {}
    bannerModel.image = fileRes
    bannerModel.title = body.title
    const banner = await new db.banner(bannerModel).save();
    log.end();
    return banner;
};

const getBanners = async (body,context) => {
    const log = context.logger.start(`services:banners:getBanners`);
    const banner = await db.banner.find();
    log.end();
    return banner;
};

exports.createBanner = createBanner;
exports.getBanners = getBanners;
// exports.remove = remove;