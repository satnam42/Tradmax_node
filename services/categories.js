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


const getCategories = async (body,context) => {
    const log = context.logger.start(`services:categories:allCategories`);
    if(body.category_id){
        const categories = await db.category.find({ parent_id: body.category_id });
        log.end();
        return categories;
    }else{
        const categories = await db.category.find({ parent_id: '0'});
        log.end();
        return categories;
    }
};

const removeCategoriesById = async (id, context) => {
    const log = context.logger.start(`services:categories:removeCategoriesById`);
    if (!id) throw new Error("Category id is required");
    const checksubcat = await db.category.find({ parent_id: id }).count()
    if(checksubcat > 0){
        throw new Error("This category has subcategories");
    }
    let isDeleted = await db.category.deleteOne({ _id: id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return
};

exports.createCategory = createCategory;
exports.createSubCategory = createSubCategory;
exports.getCategories = getCategories;
exports.removeCategoriesById = removeCategoriesById;