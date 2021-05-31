"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, trim: true, },
    phoneNumber: { type: String, required: false, trim: true, },
    password: { type: String, required: false },
    otp: { type: Number, required: false, trim: true, },
    address: { type: String, required: false, trim: true, },
    state: { type: String, required: false, trim: true, },
    city: { type: String, required: false, trim: true, },
    country: { type: String, required: false, trim: true, },
    zipCode: { type: String, required: false, trim: true, },
    token: { type: String, default: "" }, //access token
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    },
    image: { type: String, default: "" },
    /* correct method for saving coordinates in mongodb */
    // loc: {
    //     type: { type: String, default: "Point" , required: true,},
    //     coordinates: [Number]
    // },
    socialLinkId: { type: String, default: "", required: false },
    socialType: { type: String, default: "", required: false },
    role: { type: String, required: false,default: "User" },
    deviceToken: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
// user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;