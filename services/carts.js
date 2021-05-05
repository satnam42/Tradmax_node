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
    const { userId, productId, quantity, total, variation, status } = model;
    const log = context.logger.start(`services:carts:build${model}`);
    let productModel = {
        user: userId,
        product: productId,
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
    const isProductExists = await db.product.findById(model.
        productId)
    if(!isProductExists){
        throw new Error("product not found");
    }else{
        const checkcart = await db.cart.findOne({ 
            user: { $eq: ObjectId(model.userId) }, 
            product: { $eq: ObjectId(model.productId) },
            variation: { $eq: model.variation } 
        });
        if(!checkcart){
            const cart = build(model, context);
            log.end();
            return cart;
        }else{
            throw new Error("product already in cart");
        }
    }
};

const getCarts = async (query, context) => {
    const log = context.logger.start(`services:getCarts:get`);
    const carts = await db.cart.find({ "user": ObjectId(query.userId) }).populate('user').populate('product');
    log.end();
    return carts;
};

const addToFav = async (model, context) => {
    const log = context.logger.start("services:carts:addToFav");
    const isProductExists = await db.favorite.findOne({ 
        user: { $eq: ObjectId(model.userId) }, 
        product: { $eq: ObjectId(model.productId) },
        variation: { $eq: model.variation } 
    });
    if(isProductExists){
        let removeProduct = await db.favorite.deleteOne({ 
            user: { $eq: ObjectId(model.userId) }, 
            product: { $eq: ObjectId(model.productId) },
            variation: { $eq: model.variation } 
        });
        log.end();
        return removeProduct
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


const getFav = async (query, context) => {
    const log = context.logger.start(`services:carts:getFav`);
    const favProducts = await db.favorite.find({ "user": ObjectId(query.userId) }).populate('user').populate('product');
    log.end();
    return favProducts;
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

const deleteItem = async (id, context) => {
    const log = context.logger.start(`services:carts:deleteItem`);
    let isCartExists = await db.cart.findById(id);
    if(isCartExists){
        const removeItem = await db.cart.remove({ '_id': id });
        log.end();
        return removeItem
    }else{
        log.end();
        throw new Error("Cart item not found");
    }
    
};


exports.create = create;
exports.getCarts = getCarts;
exports.deleteItem = deleteItem;
exports.addToFav = addToFav;
exports.getFav = getFav;