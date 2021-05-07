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

const updateAddress = (model, address, context) => {
    const log = context.logger.start("services:carts:updateAddress");
    if (model.fullName !== "string" && model.fullName !== undefined) {
        address.fullName = model.fullName;
    }

    if (model.address !== "string" && model.address !== undefined) {
        address.address = model.address;
    }

    if (model.city !== "string" && model.city !== undefined) {
        address.city = model.city;
    }

    if (model.state !== "string" && model.state !== undefined) {
        address.state = model.state;
    }

    if (model.country !== "string" && model.country !== undefined) {
        address.country = model.country;
    }

    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        address.zipCode = model.zipCode;
    }

    if (model.country !== "string" && model.country !== undefined) {
        address.country = model.country;
    }

    log.end();
    address.save();
    return address;

};

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
    const log = context.logger.start(`services:carts:getCarts`);
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

const addAddress = async (model, context) => {
    const log = context.logger.start("services:carts:addAddress");
    if(!model.addressId){
        const { fullName, address, city, state, zipCode, country } = model;
        // const log = context.logger.start(`services:carts:build${model}`);
        let addressModel = {
            fullName: fullName,
            address: address,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            createdOn: new Date(),
            updatedOn: new Date()
        }
        const saveAddress = await new db.address(addressModel).save();
        log.end();
        return saveAddress;
    }else{
        const entity = await db.address.findById(model.addressId)
        if (!entity) {
            throw new Error("invalid ID");
        }
        const updated = await updateAddress(model, entity, context);
        log.end();
        return updated
    }
};

const getAddress = async (body,context) => {
    const log = context.logger.start(`services:carts:getAddress`);
    if(body.addressId){
        const address = await db.address.find({ _id: body.addressId });
        log.end();
        return address;
    }else{
        const address = await db.address.find();
        log.end();
        return address;
    }
};


exports.create = create;
exports.getCarts = getCarts;
exports.deleteItem = deleteItem;
exports.addToFav = addToFav;
exports.getFav = getFav;
exports.addAddress = addAddress;
exports.getAddress = getAddress;