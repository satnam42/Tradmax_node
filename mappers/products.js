"use strict";

exports.toModel = entity => {

    const model = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        units: entity.units,
        status: entity.status,
        image: entity.image,
        subCategory: entity.subCategory,
        variation: entity.variation,
        updatedOn: entity.updatedOn,
        createdOn: entity.createdOn,
    };
    // if (entity.category) {
    //     let categoryModel = {
    //         id: entity.category.id,
    //         name: entity.category.name
    //     }
    //     model.category = categoryModel
    // }
    if (entity.subCategory) {
        let categories = {
            id: entity.subCategory.id,
            name: entity.subCategory.name
        }
        model.categories = categories
    }
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};
