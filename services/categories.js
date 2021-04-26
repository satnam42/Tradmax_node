const imageUrl = require('config').get('image').url
const path = require("path");
"use strict";

const createCategory = async (files, body, context) => {
    const log = context.logger.start("services:categories:createCategory");
    if (!files) {
        throw new Error("image not found");
    }
    const fileRes = imageUrl + 'assets/images/' + files[0].filename
    let categoryModel = {}
    categoryModel.image = fileRes
    categoryModel.name = body.name
    const catRes = await new db.category(categoryModel).save();
    catRes.save();
    log.end();
    return catRes;
};

const createSubCategory = async (files, body, context) => {
    const log = context.logger.start("services:categories:createSubCategory");
    if (!files) {
        throw new Error("image not found");
    }
    const checkCategory = await db.category.findOne({ _id: { $eq: body.parent_id } });
    if (!checkCategory) {
        log.end();
        throw new Error("Category not found");
    }
    const fileRes = imageUrl + 'assets/images/' + files[0].filename
    let subcatModel = {}
    subcatModel.image = fileRes
    subcatModel.name = body.name
    subcatModel.parent_id = body.parent_id
    const subcatRes = await new db.category(subcatModel).save();
    subcatRes.save();
    log.end();
    return subcatRes;
};


const allCategories = async (context) => {
    const log = context.logger.start(`services:categories:allCategories`);
    const categories = await db.category.find().populate('user', 'firstName');
    log.end();
    return categories;
};

// const removeEventsById = async (id, context) => {
//     const log = context.logger.start(`services:events:removeEventsById`);
//     if (!id) throw new Error("event id is required");
//     let isDeleted = await db.event.deleteOne({ _id: id })
//     if (!isDeleted) {
//         throw new Error("something went wrong");
//     }
//     log.end();
//     return
// };

exports.createCategory = createCategory;
exports.createSubCategory = createSubCategory;
exports.allCategories = allCategories;
// exports.update = update;
// exports.allEvents = allEvents;
// exports.removeEventsById = removeEventsById;