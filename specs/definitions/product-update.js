module.exports = [
    {
        name: "productUpdate",
        properties: {
            name: {
                type: "string"
            },
            description: {
                type: "string"
            },
            content: {
                type: "string"
            },
            units: {
                type: "number"
            },
            price: {
                type: "number"
            },
            // subCategory: {
            //     type: "string"
            // },
            status: {
                type: "string",
                enum: ["active", "inactive", "out of stock"]
            },
            variation: {
                properties: {
                    key: { type: "string" },
                    items: {
                        type: 'array',
                        items: {
                            type: 'array',
                            properties: {
                                value: { type: "string" },
                                price: { type: "number", default: 0 },
                            }
                        }
                    }
                }
            },

        }
    }
];
