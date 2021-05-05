const ObjectId = require("mongodb").ObjectID;

// const set = async (model, carts, context) => {

//     const log = context.logger.start("services:carts:set");
//     if (model.name !== "string" && model.name !== undefined) {
//         products.name = model.name;
//     }
//     if (model.subCategory !== "string" && model.subCategory !== undefined) {
//         let isSubCategoryExists = await db.categories.findById(model.subCategory)
//         if (isSubCategoryExists) {
//             products.subCategory = { id: isSubCategoryExists.id, name: isSubCategoryExists.name }
//         } else {
//             throw new Error("subcategory not found");
//         }
//     }
//     if (model.status !== "string" && model.status !== undefined) {
//         products.status = model.status;
//     }
//     if (model.description !== "string" && model.description !== undefined) {
//         products.description = model.description;
//     }
//     log.end();
//     await products.save();
//     return products;
// };

const build = async (model, context) => {
    const { user, product, quantity, total, variation, status } = model;
    const log = context.logger.start(`services:carts:build${model}`);
    let productModel = {
        user: user,
        product: product,
        quantity: quantity,
        total: total,
        status: status,
        variation: variation,
        createdOn: new Date(),
        updatedOn: new Date()
    }
    const carts = await new db.cart(productModel).save();
    log.end();
    return carts;
};

const create = async (model, context) => {
    const log = context.logger.start("services:carts:create");
    isProductExists = await db.product.findById(model.product)
    if(!isProductExists){
        throw new Error("product not found");
    }else{
        const cart = build(model, context);
        log.end();
        return cart;
    }
};

const addToFav = async (model, context) => {
    const log = context.logger.start("services:carts:addToFav");
    isProductExists = await db.favorite.findById(model.product)
    if(isProductExists){
        let removeProduct = await db.favorite.deleteOne(model.product);
        log.end();
    }else{
        let favModel = {
            user: model.userId,
            product: model.productId,
            variation: model.variation,
            createdOn: new Date()
        }
        const favproduct = await new db.favorite(favModel).save();
        log.end();
        return favproduct;
    }
};


// const getById = async (id, context) => {
//     const log = context.logger.start(`services:products:getById:${id}`);
//     const products = await db.products.findById(id);
//     log.end();
//     return products;
// };


const getCarts = async (query, context) => {
    const log = context.logger.start(`services:getCarts:get`);
    const carts = await db.cart.find({ "subCategory.id": query.subCategoryId })
    log.end();
    return carts;
};


// const update = async (id, model, context) => {
//     const log = context.logger.start(`services:products:update`);
//     if (!id) {
//         throw new Error(" product id is required");
//     }
//     let product = await db.products.findById(id);
//     if (!product) {
//         throw new Error("invalid products");
//     }
//     const products = await set(model, product, context);
//     log.end();
//     return products

// };

const deleteProduct = async (id, context) => {
    const log = context.logger.start(`services:assignLeads:deletePotentialCustomer`);

    let isProductExists = await db.products.findById(id);
    await db.products.remove({ '_id': id });
    log.end();
    return isProductExists
};


exports.create = create;
exports.getCarts = getCarts;
exports.deleteProduct = deleteProduct;
exports.addToFav = addToFav;