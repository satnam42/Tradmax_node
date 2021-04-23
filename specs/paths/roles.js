module.exports = [{
    url: "/create",
    post: {
        summary: "create",
        description: "create",
        parameters: [
            {
                in: "body",
                name: "body",
                description: "Model of role creation",
                required: true,
                schema: {
                    $ref: "#/definitions/roleCreate"
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
},
{
    url: "/getAll",
    get: {
        summary: "getAll",
        description: "role list",
        parameters: [{
            in: "header",
            name: "x-access-token",
            description: "token to access api",
            required: false,
            type: "string"
        },],
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
{
    url: "/delete/{id}",
    delete: {
        summary: "delete",
        description: "delete",
        parameters: [
            {
                in: "header",
                name: "x-access-token",
                description: "token to access api",
                required: true,
                type: "string"
            },
            {
                in: "path",
                type: "string",
                name: "id",
                description: "role id",
                required: true
            },],
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