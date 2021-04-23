var admin = require("firebase-admin");

const pushNotification = async (deviceTokens, title, body, model) => {
    // const log = logger.start(`services:pushNotification`);

    var payload = {
        notification: {
            title: title,
            body: body,
            sound: "default"
        }
    };

    return admin.messaging().sendToDevice(deviceTokens, payload)
        .then(async (response) => {
            const list = await new db.notification(model).save();
            console.log('Successfully sent message:', response);
            // log.end();
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            // log.end();
        })


}

exports.pushNotification = pushNotification