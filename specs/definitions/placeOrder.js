module.exports = [
    {
        name: "placeOrder",
        properties: {
            userId: {
                type: "string"
            },
            totalAmount: {
                type: "string"
            },
            tax: {
                type: "string"
            },
            addressId: {
                type: "string",
            },
            // status: {
            //     type: "string",
            //     enum: ["active", "deactive", "out of stock"]
            // },
            // cart: {
            //     properties: {
                    // key: { type: "string" },
                    cart: {
                        type: 'array',
                        items: {
                            type: 'array',
                            properties: {
                                cartId: { type: "string" }
                            }
                        }
                    }
            //     }
            // },
        }
    }
];
