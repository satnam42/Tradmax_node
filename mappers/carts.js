"use strict";

exports.toModel = entity => {

    const model = {
        id: entity.id,
        userId: entity.userId,
        productId: entity.productId,
        quantity: entity.quantity,
        variation: entity.variation,
        price: entity.price,
        updatedOn: entity.updatedOn,
        createdOn: entity.createdOn,
    };
    return model;
};

exports.toSearchModel = entities => {
    return entities.map(entity => {
        return exports.toModel(entity);
    });
};
