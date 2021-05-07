const ObjectId = require("mongodb").ObjectID;

const Orderbuild = async (model, context) => {
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

const placeOrder = async (model, context) => {
    const log = context.logger.start("services:orders:placeOrder");
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
            const cart = Orderbuild(model, context);
            log.end();
            return cart;
        }else{
            throw new Error("product already in cart");
        }
    }
};

const getOrder = async (query, context) => {
    const log = context.logger.start(`services:orders:getOrder`);
    const carts = await db.cart.find({ "user": ObjectId(query.userId) }).populate('user').populate('product');
    log.end();
    return carts;
};


exports.placeOrder = placeOrder;
exports.getOrder = getOrder;