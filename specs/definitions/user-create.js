module.exports = [

    {
        name: "userCreate",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            accountName: {
                type: "string"
            },
            companyName: {
                type: "string"
            },
            firmName: {
                type: "string"
            },
            phoneNumber: {
                type: "string"
            },
            email: {
                type: "string"
            },
            state: {
                type: "string"
            },
            city: {
                type: "string"
            },
            zipCode: {
                type: "string"
            },
            efin: {
                type: "boolean",
                default: false
            },
            noOfeFiledReturnslastYear: {
                type: "boolean",
                default: false
            },
            doYouOfferBankProducts: {
                type: "boolean",
                default: false
            },
            status: {
                enum: ['active', 'inactive']
            },

            password: {
                type: "string"
            },

            // loc: {
            //     properties: {
            //         type: 'array',
            //         // items: {
            //         properties: {
            //             coordinates: { type: 'number' }
            //         },

            //     }
            // }
        },
        // roleId: {
        //     type: "string"
        // },
    }

];