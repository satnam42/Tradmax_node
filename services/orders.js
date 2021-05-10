const ObjectId = require("mongodb").ObjectID;

const Orderbuild = async (model, context) => {
    const { userId, totalAmount, cart, addressId, status, tax } = model;
    const log = context.logger.start(`services:orders:build${model}`);
    let orderModel = {
        user: userId,
        totalAmount: totalAmount,
        tax: tax,
        status: status,
        cart: cart,
        address: addressId,
        createdOn: new Date(),
        updatedOn: new Date()
    }
    const order = await new db.order(orderModel).save();
    log.end();
    return order;
};

const placeOrder = async (model, context) => {
    const log = context.logger.start("services:orders:placeOrder");
    let user = await db.user.find({ _id: model.userId });
    if (!user) {
        throw new Error("user not found");
    }else{
        // const checkcart = await db.cart.findOne({ 
        //     user: { $eq: ObjectId(model.userId) }, 
        //     product: { $eq: ObjectId(model.productId) },
        //     variation: { $eq: model.variation } 
        // });
        // if(!checkcart){
            const order = Orderbuild(model, context);
            log.end();
            return order;
        // }else{
        //     throw new Error("product already in cart");
        // }
    }
};

const getOrder = async (query, context) => {
    const log = context.logger.start(`services:orders:getOrder`);
    const carts = await db.order.find({ "user": ObjectId(query.userId) })
    .populate('user')
    .populate('address')
    .populate({
        path: 'cart.cartId',
        model: 'cart',
        populate : {
            path : 'product'
        },
    })
    log.end();
    return carts;
};


exports.placeOrder = placeOrder;
exports.getOrder = getOrder;