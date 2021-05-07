"use strict";
const mongoose = require("mongoose");
const order = mongoose.Schema({
    orderID: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cart: {
        cartIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'cart',
                required: true
            }
        ]
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'address',
        required: true
    },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
        type: String, default: "Ordered",
        enum: ["Cart", "Ordered", "Delivered"]
    },
    paymentStatus: {
        type: String, default: "Paid",
        enum: ["Paid", "Pending", "Failed"]
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("order", order);
module.exports = order;