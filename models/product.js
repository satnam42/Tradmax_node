"use strict";
const mongoose = require("mongoose");
const product = mongoose.Schema({
    name: { type: String, default: "", required: true },
    units: { type: Number, required: true },
    variation: {
        key: { type: String }, //color,size
        items: [
            {
                value: { type: String }, //red,blue,white
                price:{type: String} //10,20,50
            },
        ], required: true
    },
    status: {
        type: String, default: "active",
        enum: ["active", "inactive", "out of stock"]
    },
    subCategory: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subCategories"
        },
        name: { type: String, default: "" },
         required: true
    },
    description: { type: String, required: true },
    price: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    isLiked: { type: Boolean, default: false },
    likeCount: { type: String, default: "0" },
    productFiles: [{
        url : {type: String, default: ""},
        type: {type: String, default: ""} 
    }],
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now }
});

mongoose.model("product", product);
module.exports = product;