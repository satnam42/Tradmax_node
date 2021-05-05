const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
var nodemailer = require('nodemailer')
const imageUrl = require('config').get('image').url
const path = require("path");
//register user
const buildUser = async(model, context) => {
    const { status, fullname, country, address, otp, state, city, zipCode, phoneNumber, email, password, roleId, } = model;
    const log = context.logger.start(`services:users:build${model}`);
    const user = await new db.user({
        fullname: fullname,
        phoneNumber: phoneNumber,
        email: email,
        address: address,
        state: state,
        city: city,
        country: country,
        zipCode: zipCode,
        otp: otp,
        role: roleId,
        password: password,
        status: status,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};

const setUser = (model, user, context) => {
    const log = context.logger.start("services:users:set");
    if (model.fullname !== "string" && model.fullname !== undefined) {
        user.fullname = model.fullname;
    }

    if (model.phoneNumber !== "string" && model.phoneNumber !== undefined) {
        user.phoneNumber = model.phoneNumber;
    }

    if (model.deviceToken !== "string" && model.deviceToken !== undefined) {
        user.deviceToken = model.deviceToken;
    }

    if (model.address !== "string" && model.address !== undefined) {
        user.address = model.address;
    }

    if (model.state !== "string" && model.state !== undefined) {
        user.state = model.state;
    }

    if (model.sex !== "string" && model.sex !== undefined) {
        user.sex = model.sex;
    }
    if (model.city !== "string" && model.city !== undefined) {
        user.city = model.city;
    }
    if (model.country !== "string" && model.country !== undefined) {
        user.country = model.country;
    }
    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        user.zipCode = model.zipCode;
    }

    log.end();
    user.save();
    return user;

};

const adminlogin = async(model, context) => {
    const log = context.logger.start("services:users:login");

    const query = {};
    query.email = model.email;
    query.role = 'Admin';
    let user = await db.user.findOne(query)
    if (!user) {
        log.end();
        throw new Error("admin not found");
    }

    if (user.status === 'inactive') {
        throw new Error("admin Is inactive please contect with admin");
    }
    const isMatched = encrypt.compareHash(model.password, user.password, context);
    if (!isMatched) {
        log.end();
        throw new Error("password mismatch");
    }

    const token = auth.getToken(user.id, false, context);
    user.token = token;
    user.updatedOn = new Date();
    user.save();
    log.end();
    return user;
};


const create = async(model, context) => {
    const log = context.logger.start("services:users:create");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already exists");
    } else {
    model.password = encrypt.getHash(model.password, context);
    const user = buildUser(model, context);
    log.end();
    return user;
    }

};

// login 

const login = async(model, context) => {
    const log = context.logger.start("services:users:login");

    const query = {};
    query.email = model.email;
    let user = await db.user.findOne(query)
    if (!user) {
        log.end();
        throw new Error("user not found");
    }

    if (user.status === 'inactive') {
        throw new Error("user Is inactive please contect with admin");
    }
    const isMatched = encrypt.compareHash(model.password, user.password, context);
    if (!isMatched) {
        log.end();
        throw new Error("password mismatch");
    }

    const token = auth.getToken(user.id, false, context);
    user.token = token;
    user.updatedOn = new Date();
    user.save();
    log.end();
    return user;
};

// change password

const changePassword = async(id, model, context) => {
    const log = context.logger.start(`service/users/changePassword`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id).populate('image');
    if (!user) {
        log.end();
        throw new Error("user is not found");
    }
    const isMatched = encrypt.compareHash(
        model.oldPassword,
        user.password,
        context
    );
    if (isMatched) {
        const newPassword = encrypt.getHash(model.newPassword, context);
        user.password = newPassword;
        user.updatedOn = new Date();
        await user.save();
        log.end();
        return "Password Updated Successfully";
    } else {
        log.end();
        throw new Error("Old Password Not Match");
    }
};




// getUsers
const getUsers = async(query, context) => {
    const log = context.logger.start(`services:users:getUsers`);
    let allUsers = await db.user.find();
    allUsers.count = await db.user.find().count();
    log.end();
    return allUsers;
};

const currentUser = async(id, model, context) => {
    const log = context.logger.start(`services:users:currentUser`);
    if (!id) {
        throw new Error("user id is required");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    log.end();
    return user;
};


const deleteUser = async(id, context) => {
    const log = context.logger.start(`services:users:deleteUser`);

    if (!id) {
        throw new Error("id is requried");
    }

    let user = await db.user.deleteOne({ _id: id });

    if (!user) {
        throw new Error("user not found");
    }

    return 'User Deleted Successfully'
};

const update = async(id, model, context) => {
    const log = context.logger.start(`services:users:update`);
    let entity = await db.user.findById(id).populate('image');
    if (!entity) {
        throw new Error("invalid user");
    }
    const user = await setUser(model, entity, context);
    log.end();
    return user
};

const search = async(name, context) => {
    const log = context.logger.start(`services:users:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const users = await db.user.find({ firstName: { "$regex": '.*' + name + '.*', "$options": 'i' } }).limit(5);

    return users
};
const sendOtp = async(user, context) => {
    const log = context.logger.start('services/users/sendOtp')
        // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    let message = `hi ${user.firstName} Your 4 digit One Time Password: <br>${OTP}<br></br>
      otp valid only 4 minutes`
    let = subject = "One Time Password"
    const isEmailSent = await sendMail(user.email, message, subject)
    if (!isEmailSent) {
        throw new Error('something went wrong')
    }
    const otpToken = auth.getOtpToken(OTP, user.id, true, context)
    log.end()
    let data = {
        token: otpToken
    }
    log.end()
    return data

}

const otpVerifyAndChangePassword = async(model, context) => {
    const log = context.logger.start('services/users/otpVerified')
    const otpDetail = await auth.extractToken(token, context)

    if (otpDetail.otp !== undefined && otpDetail.otp != model.otp) {
        throw new Error("please enter valid otp");;
    }
    if (otpDetail.otp.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otpDetail.otp.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    let user = context.user;
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }

    // const newPassword = encrypt.getHash(model.newPassword, context);
    // user.password = newPassword;
    // user.updatedOn = new Date();
    // await user.save();
    log.end();

    return;
}

const newPassword = async(model, context) => {
    const log = context.logger.start('services/users/newPassword')
    let user = context.user;
    user = await db.user.findById(user.id);
    if (!user) {
        throw new Error("user not found");
    }

    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    await user.save();
    log.end();

    return;
}

// forgetPassword
const forgotPassword = async(model, context) => {
    const log = context.logger.start('services/users/forgotPassword')
    const user = await db.user.findOne({ email: { $eq: model.email } });
    if (!user) {
        throw new Error("The email address " + model.email + " is not associated with any account. Please check your email address and try again.");
    }
    const data = await sendOtp(user, context)
    if (!data) {
        throw new Error('something went wrong')
    }
    log.end();

    return data;
}

const sendMail = async(email, message, subject) => {
    var smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: `emmieandrewwork@gmail.com`,
            pass: `Notsure%1`
        }
    });
    // email send to registered email
    var mailOptions = {
        from: 'trademax',
        to: email,
        subject: subject,
        html: message
    };

    let mailSent = await smtpTrans.sendMail(mailOptions)
    if (mailSent) {

        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return true
    } else {
        throw new Error("Unable to send email try after sometime");
    }
}

const uploadImage = async (files, body, context) => {
    const log = context.logger.start(`services:users:uploadImage`);
    if (!files) {
        throw new Error("image not found");
    }
    let user = await db.user.findById(body.id);
    if (!user) {
        throw new Error("user not found");
    }
    if (user.image != "" && user.image !== undefined) {

        let picUrl = user.image.replace(`${imageUrl}`, '');
        try {
            await fs.unlinkSync(`${picUrl}`)
            console.log('File unlinked!');
        } catch (err) {
            console.log(err)
        }
    }
    const image = imageUrl + 'assets/images/' + files[0].filename
    user.image = image
    await user.save();
    log.end();
    return user
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
exports.sendOtp = sendOtp;
exports.otpVerifyAndChangePassword = otpVerifyAndChangePassword;
exports.newPassword = newPassword;
exports.adminlogin = adminlogin;
exports.uploadImage = uploadImage;