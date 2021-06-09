module.exports = [
    {
        name: "cartCreate",
        properties: {
            userId: {
                type: "string"
            },
            productId: {
                type: "string"
            },
            quantity: {
                type: "string"
            },
            total: {
                type: "string",
            },
            variation: {
                type: "string"
            },
            status: {
                type: "string",
                enum: ["Cart", "Ordered", "Delivered"]
            },
        }
    }
];
