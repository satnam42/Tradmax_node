"use strict";
const mongoose = require("mongoose");
const transaction = mongoose.Schema({
    paymentId: { type: String, required: true },
    receiptUrl: { type: String },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("transaction", transaction);
module.exports = transaction;