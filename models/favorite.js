"use strict";
const mongoose = require("mongoose");
const favorite = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    isFav: { type: String, default: true },
    // tax: { type: Number, default: 10 },
    variation: { type: String, required: true },
    status: {
        type: String, default: "favorite",
        enum: ["Cart", "Ordered", "Delivered","favorite"]
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("favorite", favorite);
module.exports = favorite;