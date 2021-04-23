module.exports = [{
    name: "sigle-image",
    properties: {
        id: {
            type: "string"
        },
        imageFor: {
            type: 'string',
            enum: ['user']
        },
    }
}];