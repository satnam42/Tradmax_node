"use strict";
const buildNotification = async (model, context) => {
    const log = context.logger.start(`services:notifications:buildnotification${model}`);
    const notification = await new db.notification({
        paymentId: model.id,
        receiptUrl: model.receipt_url,
        amount: model.amount,
        user: model.userId,
    }).save();
    log.end();
    return notification;
};

const create = async (model, context) => {
    const log = context.logger.start("services:notifications.js:create");

    const notification = buildNotification(charge, context);
    log.end();
    return notification;

};

const getNotificationsByUserId = async (id, context) => {
    const log = context.logger.start(`services:notifications:getnotificationByUserId`);
    if (!id) throw new Error("user Id is requried");
    let notifications = await db.notification.findOne({ user: id });
    if (notification) throw new Error("no transtion found");
    log.end();
    return notifications
};

exports.create = create;
exports.getNotificationsByUserId = getNotificationsByUserId;