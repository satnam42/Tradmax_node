"use strict";
const service = require("../services/users");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");

//register api

const adminlogin = async (req, res) => {
    const log = req.context.logger.start("api:users:adminlogin");
    try {
        const user = await service.adminlogin(req.body, req.context);
        log.end();
        return response.authorized(res, userMapper.toModel(user), user.token);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const create = async (req, res) => {
    const log = req.context.logger.start(`api:users:create`);
    try {
        const user = await service.create(req.body, req.context);
        const message = "User Register Successfully";
        log.end();
        return response.success(res, message, userMapper.toModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//login api  
const login = async (req, res) => {
    const log = req.context.logger.start("api:users:login");
    try {
        const user = await service.login(req.body, req.context);
        const message = "User logged in successfully";
        log.end();
        return response.authorized(res, message,userMapper.toModel(user), user.token);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// current user
const currentUser = async (req, res) => {
    const log = req.context.logger.start(`api:users:currentUser`);
    try {
        const user = await service.currentUser(req.params.id, req.body, req.context);
        const message = "Current User";
        log.end();
        return response.success(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

// change password
const changePassword = async (req, res) => {
    const log = req.context.logger.start("api:users:changePassword");
    try {
        const message = await service.changePassword(req.params.id, req.body, req.context);
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//getUsers
const getUsers = async (req, res) => {
    const log = req.context.logger.start(`api:users:getUsers`);
    try {
        const user = await service.getUsers(req.query, req.context);
        const message = "Users get Successfully";
        log.end();
        return response.page(message,res, userMapper.toSearchModel(user), Number(req.query.pageNo) || 1, Number(req.query.pageSize) || 10, user.count)
        // return response.success(res, message, userMapper.toSearchModel(user));
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

//deleteUser
const deleteUser = async (req, res) => {
    const log = req.context.logger.start(`api:users:deleteUser`);
    try {
        const user = await service.deleteUser(req.params.id, req.context);
        const message = "User Deleted Successfully";
        log.end();
        return response.data(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};
//update user
const update = async (req, res) => {
    const log = req.context.logger.start(`api:users:update`);
    try {
        const user = await service.update(req.params.id, req.body, req.context);
        const message = "User Updated Successfully";
        log.end();
        return response.data(res, message, user);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};



const otpVerifyAndChangePassword = async (req, res) => {
    const log = req.context.logger.start("api:users:otpVerify");
    try {
        const data = await service.otpVerifyAndChangePassword(req.body, req.headers["x-access-token"], req.context);
        const message = "Otp verified"
        log.end()
        return response.success(res, message, data);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const newPassword = async (req, res) => {
    const log = req.context.logger.start("api:users:newPassword");
    try {
        const data = await service.newPassword(req.body, req.context);
        const message = "Password Updated"
        log.end();
        return response.success(res, message);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const forgotPassword = async (req, res) => {
    const log = req.context.logger.start("api:users:forgotPassword");
    try {
        const data = await service.forgotPassword(req.body, req.context);
        const message = "OTP successfully sent on register email";
        log.end();
        return response.success(res, message, data);

    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const search = async (req, res) => {
    const log = req.context.logger.start(`api:users:search:${req.query.name}`);
    try {
        const users = await service.search(req.query.name, req.context);
        log.end();
        return response.data(res, users);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

const uploadImage = async (req, res) => {
    const log = req.context.logger.start(`api:users:uploadImage`);
    try {
        const url = await service.uploadImage(req.files, req.body, req.context);
        log.end();
        return response.data(res, url);
    } catch (err) {
        log.error(err);
        log.end();
        return response.failure(res, err.message);
    }
};

exports.login = login;
exports.create = create;
exports.search = search;
exports.currentUser = currentUser;
exports.changePassword = changePassword;
exports.forgotPassword = forgotPassword;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.update = update;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
exports.newPassword = newPassword;
exports.adminlogin = adminlogin;
exports.uploadImage = uploadImage;
