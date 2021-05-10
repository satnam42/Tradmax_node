module.exports = [{
    url: "/placeOrder",
    post: {
        summary: "placeOrder",
        description: "placeOrder",
        parameters: [{
            in: "body",
            name: "body",
            description: "Model of placeOrder",
            required: true,
            schema: {
                $ref: "#/definitions/placeOrder"
            }
        }],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},{
    url: "/getOrder",
    get: {
        summary: "get orders API",
        description: "order by userId",
        parameters: [
            {
                in: "query",
                type: "string",
                name: "userId",
                description: "pass user ID here",
                required: true
            },
        ],
        responses: {
            default: {
                description: "Unexpected error",
                schema: {
                    $ref: "#/definitions/Error"
                }
            }
        }
    }
},
 ];
