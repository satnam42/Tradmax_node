"use strict";
const mongoose = require("mongoose");
const image = mongoose.Schema({
    image: { type: String },
    gallery: [{ image: { type: String } },],
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'imageFor'
    },
    imageFor: {
        type: String,
        required: true,
        enum: ['user']
    },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("image", image);
module.exports = image;