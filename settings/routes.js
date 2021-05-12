"use strict";

const fs = require("fs");
const api = require("../api");
const specs = require("../specs");
const permit = require("../permit")
const validator = require("../validators");

const configure = (app, logger) => {
    const log = logger.start("settings:routes:configure");
    app.get("/specs", function(req, res) {
        fs.readFile("./public/specs.html", function(err, data) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    error: err.toString()
                });
            }
            res.contentType("text/html");
            res.send(data);
        });
    });


    app.get("/api/specs", function(req, res) {
        res.contentType("application/json");
        res.send(specs.get());
    });

    ////react js project setup////
    // const root = path.join(__dirname, '../../startupbundle_bin_reactjs/', 'build')

    // app.use(express.static(root));

    // app.get('/*', function(req, res, next) {
    //     if (!req.path.includes('api')) {

    //         res.sendFile('index.html', { root });
    //     } else next();
    // });


    //user api's //

    app.post(
        "/api/users/adminlogin",
        permit.context.builder,
        // validator.users.adminlogin,
        api.users.adminlogin
    );

    app.post(
        "/api/users/register",
        permit.context.builder,
        validator.users.create,
        api.users.create
    );

    app.post(
        "/api/users/login",
        permit.context.builder,
        validator.users.login,
        api.users.login
    );

    app.get(
        "/api/users/currentUser/:id",
        permit.context.builder,
        api.users.currentUser
    );

    app.put(
        "/api/users/changePassword/:id",
        permit.context.validateToken,
        api.users.changePassword,
        validator.users.changePassword,
    );
    app.get(
        "/api/users/search",
        permit.context.validateToken,
        api.users.search
    );

    app.post(
        "/api/users/forgotPassword",
        permit.context.builder,
        api.users.forgotPassword
    );

    app.get(
        "/api/users/getUsers",
        permit.context.builder,
        api.users.getUsers
    );

    app.delete(
        "/api/users/delete/:id",
        permit.context.validateToken,
        api.users.deleteUser
    );

    app.put(
        "/api/users/update/:id",
        permit.context.builder,
        validator.users.update,
        api.users.update
    );


    app.post(
        "/api/users/otpVerifyAndChangePassword",
        permit.context.validateToken,
        api.users.otpVerifyAndChangePassword
    );

    app.put(
        "/api/users/newPassword",
        permit.context.validateToken,
        api.users.newPassword
    );

    app.post(
        '/api/users/uploadImage',
        permit.context.builder,
        api.users.uploadImage
    );

    //role api's //

    app.post(
        "/api/roles/create",
        permit.context.builder,
        validator.roles.create,
        api.roles.create
    );

    app.get(
        "/api/roles/getAll",
        permit.context.builder,
        api.roles.getRoles
    );

    app.delete(
        "/api/roles/deleteRole/:id",
        permit.context.validateToken,
        api.roles.deleteRole
    );

    //// consversations api's ////

    app.get(
        '/api/conversations/getOldChat',
        permit.context.validateToken,
        api.conversations.getOldChat
    );

    //// images  ////

    // app.post(
    //     '/api/images/uploadSingle',
    //     permit.context.builder,
    //     validator.images.upload,
    //     api.images.uploadSingle
    // );

    // app.post(
    //     '/api/images/uploadMultiple',
    //     permit.context.builder,
    //     validator.images.upload,
    //     api.images.uploadMultiple
    // );

    // app.put(
    //     '/api/images/remove',
    //     permit.context.builder,
    //     api.images.remove
    // );
    
    /* Category Section */

    app.post(
        "/api/categories/createCategory",
        permit.context.builder,
        api.categories.createCategory
    );

    app.post(
        "/api/categories/createSubCategory",
        permit.context.builder,
        api.categories.createSubCategory
    );

    app.post(
        "/api/categories/getCategories",
        permit.context.builder,
        api.categories.getCategories
    );

    app.delete(
        "/api/categories/delete/:id",
        permit.context.builder,
        api.categories.remove
    );

    /* Products Section */
    
    app.post(
        "/api/products/addProduct",
        permit.context.builder,
        api.products.create
    );

    app.get(
        "/api/products/getAllProducts",
        permit.context.builder,
        // validator.users.create, 
        api.products.getAllProducts
    );

    app.get(
        "/api/products/productsBySubCategories",
        permit.context.builder,
        // validator.users.create, 
        api.products.productsBySubCategories
    );

    app.get(
        "/api/products/similarProducts",
        permit.context.builder,
        // validator.users.create, 
        api.products.similarProducts
    );

    app.put(
        '/api/products/uploadProductFiles/:id',
        permit.context.builder,
        // validator.products.upload,
        api.products.uploadProductFiles
    );

    app.post(
        "/api/products/filterProducts",
        permit.context.builder,
        api.products.filterProducts
    );

    /* Cart Section */
    
    app.post(
        "/api/carts/addToCart",
        permit.context.builder,
        api.carts.create
    );

    app.post(
        "/api/carts/addToFav",
        permit.context.builder,
        api.carts.addToFav
    );

    app.get(
        "/api/carts/getFav",
        permit.context.builder,
        api.carts.getFav
    );

    app.get(
        "/api/carts/getCarts",
        permit.context.builder,
        api.carts.getCarts
    );

    app.delete(
        "/api/carts/deleteItem/:id",
        permit.context.builder,
        api.carts.deleteItem
    );

    app.post(
        "/api/carts/addAddress",
        permit.context.builder,
        api.carts.addAddress
    );

    app.post(
        "/api/carts/getAddress",
        permit.context.builder,
        api.carts.getAddress
    );

    /* Orders Section */
    
    app.post(
        "/api/orders/placeOrder",
        permit.context.builder,
        api.orders.placeOrder
    );

    app.get(
        "/api/orders/getOrder",
        permit.context.builder,
        api.orders.getOrder
    );

    app.post(
        "/api/orders/updateStatus",
        permit.context.builder,
        api.orders.updateStatus
    );
    

    ///////////////notifications api's /////////////////
    // app.get(
    //     "/api/notifications/listByUserId/:id",
    //     permit.context.validateToken,
    //     api.notifications.listByUserId
    // );

    // app.get(
    //     "/api/notifications/list",
    //     permit.context.validateToken,
    //     api.notifications.list
    // );

    log.end();
};

exports.configure = configure;