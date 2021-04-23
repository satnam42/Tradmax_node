"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    firstName: { type: String, required: true, trim: true, },
    lastName: { type: String, unique: false, required: true, trim: true, }, // set false unique if unique va;ue is not required
    accountName: { type: String, unique: true, required: true },
    companyName: { type: String, unique: true, required: true },
    firmName: { type: String, unique: true, required: true },
    email: { type: String, required: true, trim: true, },
    phoneNumber: { type: String, required: true, trim: true, },
    state: { type: String, required: true, trim: true, },
    city: { type: String, required: true, trim: true, },
    zipCode: { type: String, required: true, trim: true, },
    password: { type: String, required: true },
    efin: { type: Boolean, default: false, required: true },
    noOfeFiledReturnslastYear: { type: String, default: false, required: true },
    doYouOfferBankProducts: { type: String, default: false, required: true },
    token: { type: String, default: "" }, //access token
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    // image: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'image',
    // },
    /* correct method for saving coordinates in mongodb */
    // loc: {
    //     type: { type: String, default: "Point" , required: true,},
    //     coordinates: [Number]
    // },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    deviceToken: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
// user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;