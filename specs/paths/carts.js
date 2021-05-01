module.exports = [{
        url: "/addToCart",
        post: {
            summary: "create",
            description: "create",
            parameters: [
                {
                    in: "body",
                    name: "body",
                    description: "Model of addToCart",
                    required: true,
                    schema: {
                        $ref: "#/definitions/cartCreate"
                    }
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
        url: "/getCarts",
        get: {
            summary: "get cart API",
            description: "cart  by userId",
            parameters: [
                {
                    in: "query",
                    type: "string",
                    name: "subCategoryId",
                    description: "pass subcat ID here",
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
    {
        url: "/addQuantity/{id}",
        put: {
            summary: "add Quantity ",
            description: "add cart Quantity",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "product id",
                    required: true,
                    type: "string"
                },
                {
                    in: "query",
                    name: "quantity",
                    description: "add product quantity",
                    required: true,
                    type: "string"
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
    {
        url: "/update/{id}",
        put: {
            summary: "cart update",
            description: "update cart by id",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    description: "cart id",
                    required: true,
                    type: "string"
                },
                {
                    in: "body",
                    name: "body",
                    description: "Model of cart",
                    required: true,
                    schema: {
                        $ref: "#/definitions/cartUpdate"
                    }
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
    {
        url: "/deleteCart/{id}",
        delete: {
            summary: "delete cart item",
            description: "delete cart item by Id",
            parameters: [{
                in: "path",
                name: "id",
                description: "cart Id",
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
    }

];
