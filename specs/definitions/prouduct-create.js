module.exports = [
    {
        name: "productCreate",
        properties: {
            name: {
                type: "string"
            },
            units: {
                type: "string"
            },
            description: {
                type: "string"
            },
            image: {
                type: "string",
            },
            subCategory: {
                type: "string"
            },
            status: {
                type: "string",
                enum: ["active", "deactive", "out of stock"]
            },
            variation: {
                properties: {
                    key: { type: "string" },
                    items: {
                        type: 'array',
                        items: {
                            type: 'array',
                            properties: {
                                value: { type: "string", default: "" },
                                price: { type: "number", default: 0 },
                            }
                        }
                    }
                }
            },
        }
    }
];
