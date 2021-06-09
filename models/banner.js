"use strict";
const mongoose = require("mongoose");
const banner = mongoose.Schema({
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
mongoose.model("banner", banner);
module.exports = banner;