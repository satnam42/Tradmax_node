"use strict";
const mongoose = require("mongoose");
const transaction = mongoose.Schema({
    // paymentId: { type: String, required: false },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: false
    },
    receiptUrl: { type: String },
    amount: { type: Number, required: false },
    status: { type: String, required: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: false
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("transaction", transaction);
module.exports = transaction;