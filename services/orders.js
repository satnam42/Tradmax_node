const ObjectId = require("mongodb").ObjectID;

const Orderbuild = async (model, context) => {
    const { userId, totalAmount, cart, addressId, status, tax } = model;
    const log = context.logger.start(`services:orders:build${model}`);
    let r = Math.floor(Math.random() * 10000000000) + 1;
    let orderModel = {
        orderID: r,
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
        const order = await Orderbuild(model, context);
        if(order){
            const getCart = await db.cart.find({ user: { $eq: model.userId } ,status: { $eq: "Cart" } });
            getCart.forEach(element => {
                db.cart.update({"_id": ObjectId(element.id)}, {$set:{"status": "Ordered"}}, function(err, result){
                    if (err) {
                        console.log('Error updating object: ' + err);
                        //res.send(user);
                    } else {
                        console.log('' + result + ' document(s) updated');
                    }
                });
            });
        }
        log.end();
        return order;
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

const updateStatus = async (model, context) => {
    const log = context.logger.start("services:orders:updateStatus");
    let order = await db.order.findOne({ orderID: model.orderID });
    if (!order) {
        throw new Error("Order not found");
    }else{
        if(model.type == 'S') {
            order.status = "Shipping"
            await order.save();
            log.end();
            return order;
        }else if(model.type == 'D'){
            order.status = "Delievered"
            await order.save();
            log.end();
            return order;
        }
    }
};

const getAllOrders = async (query, context) => {
    const log = context.logger.start(`services:orders:getAllOrders`);
    const carts = await db.order.find()
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
exports.updateStatus = updateStatus;
exports.getAllOrders = getAllOrders;