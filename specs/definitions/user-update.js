module.exports = [{
    name: "updateUser",
    properties: {
        firstName: {
            type: "string"
        },
        lastName: {
            type: "string"
        },
        phoneNumber: {
            type: 'string'
        },
        sex: {
            type: 'string'
        },
        status: {
            enum: ['active', 'inactive']
        },
        roleId: {
            type: "string",
        },
        deviceToken: {
            type: "string",
        },
    }
}];