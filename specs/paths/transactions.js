module.exports = [
    {
        url: "/create",
        post: {
            summary: "payment",
            description: "make payment",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of pay creation",
                    required: true,
                    schema: {
                        $ref: "#/definitions/payCreate"
                    }
                },
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }
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
    {
        url: "/listByUserId/{id}",
        get: {
            summary: "list by user Id",
            description: "event list by user id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "user id",
                    required: true,
                    type: "string"
                },
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }
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
    {
        url: "/list",
        get: {
            summary: "list",
            description: "event list",
            parameters: [
                {
                    in: "header",
                    name: "x-access-token",
                    description: "token to access api",
                    required: true,
                    type: "string"
                }
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
    // {
    //     url: "/update/{id}",
    //     put: {
    //         summary: "update",
    //         description: "update event",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "event id",
    //                 required: true,
    //                 type: "string"
    //             },
    //             // {
    //             //     in: "header",
    //             //     name: "x-access-token",
    //             //     description: "token to access api",
    //             //     required: true,
    //             //     type: "string"
    //             // }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // },
    // {
    //     url: "/remove/{id}",
    //     delete: {
    //         summary: "delete",
    //         description: "delete event by id",
    //         parameters: [
    //             {
    //                 in: "path",
    //                 name: "id",
    //                 description: "event id",
    //                 required: true,
    //                 type: "string"
    //             },
    //             // {
    //             //     in: "header",
    //             //     name: "x-access-token",
    //             //     description: "token to access api",
    //             //     required: true,
    //             //     type: "string"
    //             // }
    //         ],
    //         responses: {
    //             default: {
    //                 description: "Unexpected error",
    //                 schema: {
    //                     $ref: "#/definitions/Error"
    //                 }
    //             }
    //         }
    //     }
    // }
]